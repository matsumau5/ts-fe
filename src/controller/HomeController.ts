import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import {
  controller,
  httpGet,
  request,
  response
} from "inversify-express-utils";
import { PageInfo } from "../domain/model/PageInfo";
import axios from "axios";
import { TestInfo } from "../domain/model/TestInfo";
import { string } from "@hapi/joi";

@controller("/home")
export class HomeController {
  resObj: PageInfo = {
    title: "Home",
    description: "Homeページです。",
    keywords: ["Home", "home"],
    author: ""
  };

  @httpGet("")
  public async index(
    @request() req: Request,
    @response() res: Response
  ): Promise<any> {
    const resApi: TestInfo[] = await axios.get(
      "http://192.168.0.23:8080/ils-web/api/test"
    );
    // const queryObj: [{ name: string, query: string }] = {};
    const queryObj: [{ name: string; query: string }] = [
      { name: "", query: "" }
    ];
    Object.keys(req.query).forEach(key => {
      queryObj.push({ name: key, query: req.query[key] });
    });
    console.log(queryObj);
    const corParams = ["a", "c"];
    res.render("home", {
      data: {
        page: new PageInfo(this.resObj),
        result: resApi,
        obj: queryObj.filter(obj => {
          return corParams.includes(obj.name);
        })
      }
    });
  }
}
