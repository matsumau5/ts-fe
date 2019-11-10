import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  queryParam,
  request,
  requestParam,
  response
} from "inversify-express-utils";

@controller("/home")
export class HomeController {
  @httpGet("")
  public index(req: Request, res: Response): any {
    res.render("home", {
      title: "Home"
    });
  }
}
