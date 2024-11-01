import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import TestController from "./controllers/test.controller";
import { IRouteDefinition } from "./models/route.definition";

const app: Application = express();

const port: number = 8888;

app.get("/toto", (req: Request, res: Response) => {
  res.send("Hello toto");
});

[TestController].forEach((controller) => {
  // Khởi tạo đối tượng controller
  const instance = new controller();
  // Lấy thông tin của prefix, chúng ta đã lưu chúng trong metadata của class controller
  const prefix = Reflect.getMetadata("prefix", controller);
  // Tương tự, lất ra tất cả các `routes`
  const routes: IRouteDefinition[] = Reflect.getMetadata("routes", controller);
  // Duyệt qua tất cả các routes và đăng ký chúng với express

  routes.forEach((route) => {
    // Ở đây, tốt nhất là dùng `switch/case` để đảm bảo chúng ta sử dụng đúng phương thức của express(.get, .post(), ...)
    // Nhưng để đơn giản thì như thế này là đủ
    app[route.method](prefix + route.path, (req: Request, res: Response) => {
      // Thực thi phương thức xử lý request, truyền vào là request và response
      (instance as any)[route.methodName](req, res);
    });
  });
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
