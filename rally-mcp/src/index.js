import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const RALLY_BASE_URL = process.env.RALLY_BASE_URL || "https://rally1.rallydev.com/slm/webservice/v2.0";
const RALLY_API_KEY = process.env.RALLY_API_KEY || "";

async function rallyFetch(endpoint, options = {}) {
  const url = `${RALLY_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "zsessionid": RALLY_API_KEY,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!response.ok) {
    throw new Error(`Rally API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

const server = new Server(
  { name: "rally-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "rally_query_stories",
      description: "查询Rally中的用户故事（User Stories）。支持按项目、迭代、状态筛选。",
      inputSchema: {
        type: "object",
        properties: {
          project: { type: "string", description: "项目名称" },
          iteration: { type: "string", description: "迭代名称（可选）" },
          state: { type: "string", description: "状态筛选：Defined, In-Progress, Completed, Accepted（可选）" },
          pageSize: { type: "number", description: "每页数量，默认20", default: 20 }
        },
        required: []
      }
    },
    {
      name: "rally_get_story",
      description: "通过FormattedID获取Rally用户故事的详细信息",
      inputSchema: {
        type: "object",
        properties: {
          formattedId: { type: "string", description: "故事编号，如 US12345" }
        },
        required: ["formattedId"]
      }
    },
    {
      name: "rally_create_story",
      description: "在Rally中创建新的用户故事",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "故事名称" },
          description: { type: "string", description: "故事描述（HTML格式）" },
          project: { type: "string", description: "目标项目名称" },
          iteration: { type: "string", description: "目标迭代名称（可选）" },
          planEstimate: { type: "number", description: "故事点数（可选）" },
          priority: { type: "string", description: "优先级: High, Medium, Low（可选）" }
        },
        required: ["name", "project"]
      }
    },
    {
      name: "rally_update_story",
      description: "更新Rally中已有的用户故事",
      inputSchema: {
        type: "object",
        properties: {
          formattedId: { type: "string", description: "故事编号，如 US12345" },
          name: { type: "string", description: "新名称（可选）" },
          description: { type: "string", description: "新描述（可选）" },
          state: { type: "string", description: "新状态（可选）" },
          planEstimate: { type: "number", description: "新故事点数（可选）" }
        },
        required: ["formattedId"]
      }
    },
    {
      name: "rally_query_defects",
      description: "查询Rally中的缺陷（Defects）",
      inputSchema: {
        type: "object",
        properties: {
          project: { type: "string", description: "项目名称" },
          state: { type: "string", description: "状态筛选：Submitted, Open, Fixed, Closed（可选）" },
          priority: { type: "string", description: "优先级筛选（可选）" },
          pageSize: { type: "number", description: "每页数量，默认20", default: 20 }
        },
        required: []
      }
    },
    {
      name: "rally_query_iterations",
      description: "查询Rally项目的迭代（Iterations）信息",
      inputSchema: {
        type: "object",
        properties: {
          project: { type: "string", description: "项目名称" },
          state: { type: "string", description: "状态：Planning, Committed, Accepted（可选）" }
        },
        required: []
      }
    },
    {
      name: "rally_query_tasks",
      description: "查询Rally用户故事下的任务（Tasks）",
      inputSchema: {
        type: "object",
        properties: {
          storyFormattedId: { type: "string", description: "父故事编号，如 US12345" },
          state: { type: "string", description: "状态筛选：Defined, In-Progress, Completed（可选）" }
        },
        required: ["storyFormattedId"]
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "rally_query_stories": {
        let query = "";
        const conditions = [];
        if (args.project) conditions.push(`(Project.Name = "${args.project}")`);
        if (args.iteration) conditions.push(`(Iteration.Name = "${args.iteration}")`);
        if (args.state) conditions.push(`(ScheduleState = "${args.state}")`);
        if (conditions.length > 0) query = `&query=(${conditions.join(" AND ")})`;
        
        const pageSize = args.pageSize || 20;
        const result = await rallyFetch(
          `/hierarchicalrequirement?fetch=FormattedID,Name,ScheduleState,PlanEstimate,Priority,Owner,Iteration,Project&pagesize=${pageSize}${query}`
        );
        
        const stories = result.QueryResult.Results.map(s => ({
          id: s.FormattedID,
          name: s.Name,
          state: s.ScheduleState,
          points: s.PlanEstimate,
          priority: s.Priority,
          owner: s.Owner?._refObjectName || "未分配",
          iteration: s.Iteration?._refObjectName || "未规划",
          project: s.Project?._refObjectName
        }));
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ total: result.QueryResult.TotalResultCount, stories }, null, 2)
          }]
        };
      }

      case "rally_get_story": {
        const result = await rallyFetch(
          `/hierarchicalrequirement?fetch=FormattedID,Name,Description,ScheduleState,PlanEstimate,Priority,Owner,Iteration,Project,Tasks,AcceptedDate,CreationDate&query=(FormattedID = "${args.formattedId}")`
        );
        
        if (result.QueryResult.TotalResultCount === 0) {
          return { content: [{ type: "text", text: `未找到故事: ${args.formattedId}` }] };
        }
        
        const story = result.QueryResult.Results[0];
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              id: story.FormattedID,
              name: story.Name,
              description: story.Description,
              state: story.ScheduleState,
              points: story.PlanEstimate,
              priority: story.Priority,
              owner: story.Owner?._refObjectName || "未分配",
              iteration: story.Iteration?._refObjectName || "未规划",
              project: story.Project?._refObjectName,
              createdAt: story.CreationDate,
              acceptedAt: story.AcceptedDate,
              tasksCount: story.Tasks?.Count || 0
            }, null, 2)
          }]
        };
      }

      case "rally_create_story": {
        // Find project ref
        const projectResult = await rallyFetch(
          `/project?fetch=ObjectID,Name&query=(Name = "${args.project}")`
        );
        if (projectResult.QueryResult.TotalResultCount === 0) {
          return { content: [{ type: "text", text: `未找到项目: ${args.project}` }] };
        }
        const projectRef = projectResult.QueryResult.Results[0]._ref;

        const storyData = {
          HierarchicalRequirement: {
            Name: args.name,
            Project: { _ref: projectRef },
          }
        };
        if (args.description) storyData.HierarchicalRequirement.Description = args.description;
        if (args.planEstimate) storyData.HierarchicalRequirement.PlanEstimate = args.planEstimate;
        if (args.priority) storyData.HierarchicalRequirement.Priority = args.priority;

        // Find iteration ref if specified
        if (args.iteration) {
          const iterResult = await rallyFetch(
            `/iteration?fetch=ObjectID,Name&query=((Name = "${args.iteration}") AND (Project.Name = "${args.project}"))`
          );
          if (iterResult.QueryResult.TotalResultCount > 0) {
            storyData.HierarchicalRequirement.Iteration = { _ref: iterResult.QueryResult.Results[0]._ref };
          }
        }

        const createResult = await rallyFetch("/hierarchicalrequirement/create", {
          method: "POST",
          body: JSON.stringify(storyData)
        });

        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              id: createResult.CreateResult.Object.FormattedID,
              name: createResult.CreateResult.Object.Name,
              message: `故事 ${createResult.CreateResult.Object.FormattedID} 创建成功`
            }, null, 2)
          }]
        };
      }

      case "rally_update_story": {
        // Find story ObjectID
        const findResult = await rallyFetch(
          `/hierarchicalrequirement?fetch=ObjectID&query=(FormattedID = "${args.formattedId}")`
        );
        if (findResult.QueryResult.TotalResultCount === 0) {
          return { content: [{ type: "text", text: `未找到故事: ${args.formattedId}` }] };
        }
        const objectId = findResult.QueryResult.Results[0].ObjectID;

        const updateData = { HierarchicalRequirement: {} };
        if (args.name) updateData.HierarchicalRequirement.Name = args.name;
        if (args.description) updateData.HierarchicalRequirement.Description = args.description;
        if (args.state) updateData.HierarchicalRequirement.ScheduleState = args.state;
        if (args.planEstimate !== undefined) updateData.HierarchicalRequirement.PlanEstimate = args.planEstimate;

        const updateResult = await rallyFetch(`/hierarchicalrequirement/${objectId}`, {
          method: "POST",
          body: JSON.stringify(updateData)
        });

        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              id: args.formattedId,
              message: `故事 ${args.formattedId} 更新成功`
            }, null, 2)
          }]
        };
      }

      case "rally_query_defects": {
        let query = "";
        const conditions = [];
        if (args.project) conditions.push(`(Project.Name = "${args.project}")`);
        if (args.state) conditions.push(`(State = "${args.state}")`);
        if (args.priority) conditions.push(`(Priority = "${args.priority}")`);
        if (conditions.length > 0) query = `&query=(${conditions.join(" AND ")})`;
        
        const pageSize = args.pageSize || 20;
        const result = await rallyFetch(
          `/defect?fetch=FormattedID,Name,State,Priority,Severity,Owner,Project&pagesize=${pageSize}${query}`
        );
        
        const defects = result.QueryResult.Results.map(d => ({
          id: d.FormattedID,
          name: d.Name,
          state: d.State,
          priority: d.Priority,
          severity: d.Severity,
          owner: d.Owner?._refObjectName || "未分配",
          project: d.Project?._refObjectName
        }));
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ total: result.QueryResult.TotalResultCount, defects }, null, 2)
          }]
        };
      }

      case "rally_query_iterations": {
        let query = "";
        const conditions = [];
        if (args.project) conditions.push(`(Project.Name = "${args.project}")`);
        if (args.state) conditions.push(`(State = "${args.state}")`);
        if (conditions.length > 0) query = `&query=(${conditions.join(" AND ")})`;

        const result = await rallyFetch(
          `/iteration?fetch=Name,StartDate,EndDate,State,PlannedVelocity,Project&order=StartDate desc${query}`
        );
        
        const iterations = result.QueryResult.Results.map(i => ({
          name: i.Name,
          startDate: i.StartDate,
          endDate: i.EndDate,
          state: i.State,
          plannedVelocity: i.PlannedVelocity,
          project: i.Project?._refObjectName
        }));
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ total: result.QueryResult.TotalResultCount, iterations }, null, 2)
          }]
        };
      }

      case "rally_query_tasks": {
        let query = `(WorkProduct.FormattedID = "${args.storyFormattedId}")`;
        if (args.state) query = `((WorkProduct.FormattedID = "${args.storyFormattedId}") AND (State = "${args.state}"))`;

        const result = await rallyFetch(
          `/task?fetch=FormattedID,Name,State,Estimate,ToDo,Actuals,Owner&query=(${query})`
        );
        
        const tasks = result.QueryResult.Results.map(t => ({
          id: t.FormattedID,
          name: t.Name,
          state: t.State,
          estimate: t.Estimate,
          todo: t.ToDo,
          actuals: t.Actuals,
          owner: t.Owner?._refObjectName || "未分配"
        }));
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ total: result.QueryResult.TotalResultCount, tasks }, null, 2)
          }]
        };
      }

      default:
        return { content: [{ type: "text", text: `未知工具: ${name}` }] };
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `Rally API 错误: ${error.message}` }],
      isError: true
    };
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
