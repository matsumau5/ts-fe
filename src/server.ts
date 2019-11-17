import "reflect-metadata";
import "./controller/BookController";
import "./controller/HomeController";
import "./controller/TestController";
import "./controller/NikkeiController";

import * as bodyParser from "body-parser";
import * as express from "express";
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from "inversify-express-utils";

import { container } from "./inversify.config";
import { DirUtils } from "./util/DirUtils";

class Server {
  port = 3000;

  app: express.Application;

  constructor() {
    const server = new InversifyExpressServer(container);
    const swaggerUi = require("swagger-ui-express");
    const swaggerJSDoc = require("swagger-jsdoc");
    const apis: string[] = DirUtils.getControllers();
    const models: string[] = DirUtils.getModels();
    const options = {
      swaggerDefinition: {
        info: {
          title: "API",
          version: "1.0.0"
        }
      },
      apis: apis.concat(models)
    };

    server.setConfig(app => {
      app.set("views", "./src/view");
      app.set("view engine", "pug");
      // app.use(morgan("tiny"));
      // app.use(compression());
      app.use("/spec", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
      app.use(express.static("public"));
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      app.use(bodyParser.json());
    });
    this.app = server.build();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`listening on ${this.port}`);
    });
  }
}

export default Server;
