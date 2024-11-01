// models/Route.definition.ts
export type RequestMethod = "get" | "post" | "delete" | "options" | "put";

export interface IRouteDefinition {
  // Path cho route
  path: string;
  // Phương thức http
  method: RequestMethod;
  // Tên phương thức của class controller để xử lý request
  methodName: string | symbol;
}
