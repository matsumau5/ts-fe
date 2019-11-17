import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import http from "http";
import axios from "axios";
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
import { IControllerResponse } from "../helper/ControllerResponse";
import { OK } from "http-status-codes";

@controller("/api")
export class TestController {
  @httpGet("/test")
  public async test(): Promise<IControllerResponse> {
    const data = "a";
    const options = {
      host: "192.168.0.23",
      port: 8080,
      path: "/ils-web/api/test"
    };

    const res = await axios.get("http://192.168.0.23:8080/ils-web/api/test");
    console.log(res.data);
    // console.log(JSON.parse(res.data));
    return {
      success: true,
      statusCode: OK,
      body: res.data
    };
  }
}
