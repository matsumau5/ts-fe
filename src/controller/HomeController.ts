import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { PageInfo } from "../domain/model/PageInfo";
import axios from "axios";
import { TestInfo } from "../domain/model/TestInfo";

@controller("/home")
export class HomeController {
  resObj: PageInfo = {
    title: "Home",
    description: "Homeページです。",
    keywords: ["Home", "home"],
    author: ""
  };
  @httpGet("")
  public async index(req: Request, res: Response): Promise<any> {
    const resApi: TestInfo[] = await axios.get(
      "http://192.168.0.23:8080/ils-web/api/test"
    );
    res.render("home", {
      data: {
        page: new PageInfo(this.resObj),
        result: resApi
      }
    });
  }
}
