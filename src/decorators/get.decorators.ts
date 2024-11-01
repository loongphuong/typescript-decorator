// decorators/Get.decorator.ts
import { IRouteDefinition } from "../models/route.definition";

export const Get = (path: string): MethodDecorator => {
  // `target` là class của chúng ta - Controller, `propertyKey` tương ứng với tên phương thức - để xử lý request
  return (target, propertyKey) => {
    console.log("Target: ", target.constructor);
    console.log("propertyKey: ", propertyKey);

    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const routes: IRouteDefinition[] = Reflect.getMetadata(
      "routes",
      target.constructor
    );

    routes.push({
      method: "get",
      path: path,
      methodName: propertyKey,
    });

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};
