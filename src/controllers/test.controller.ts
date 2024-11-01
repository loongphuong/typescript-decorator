import { Request, Response } from "express";
import { Controller } from "../decorators/controller.decorators";
import { Get } from "../decorators/get.decorators";

@Controller("/test")
class TestController {
  @Get("")
  async get(req: Request, res: Response) {
    return res.send("Hahahahahahaha");
  }
}

export default TestController;
