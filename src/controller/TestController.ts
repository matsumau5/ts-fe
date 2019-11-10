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

@controller("/api")
export class TestController {
  @httpGet("/test")
  public async test(): Promise<any> {
    const data = "a";
    return data;
  }
}
