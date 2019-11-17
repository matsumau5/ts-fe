import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { PageInfo } from "../domain/model/PageInfo";

@controller("/home")
export class HomeController {
  resObj: PageInfo = {
    title: "Home",
    description: "Homeページです。",
    keywords: ["Home", "home"],
    author: ""
  };
  @httpGet("")
  public index(req: Request, res: Response): any {
    res.render("home", {
      data: { page: new PageInfo(this.resObj) }
    });
  }
}
