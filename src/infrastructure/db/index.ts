"use strict";
import config from "config";
import { Sequelize } from "sequelize";
import sequelizeFixtures from "sequelize-fixtures";

import Book from "../../domain/model/Book";
import { ModelInstance } from "../../domain/model/ModelInstance";
import { logger } from "../../helper/Logger";

type modelNames = "Book";

interface IModelBuilder<T> {
  name: modelNames;
  prototype?: T;
}

export class DB {
  models: Partial<{ [name in modelNames]: typeof ModelInstance }> = {};
  dbConfig = config.get("sequelize");
  sequelize = new Sequelize(this.dbConfig);

  modelBuilders: Array<IModelBuilder<any>> = [
    {
      name: "Book",
      prototype: Book
    }
  ];

  constructor() {
    this.addModels();
  }

  addModels() {
    this.modelBuilders.forEach(({ name, prototype }) => {
      const model = prototype.buildBookModel(this.sequelize, name);
      this.models[name] = model;
    });
  }

  loadData() {
    sequelizeFixtures.loadFile(
      "src/infrastructure/db/data/books.json",
      this.models
    );
  }

  async clearTable({ name }: { name: modelNames }) {
    if (!this.models[name]) {
      throw new Error("no such table!");
    }

    await this.models[name]!.destroy({
      where: {},
      truncate: true
    });
  }

  async stop() {
    return this.sequelize.close();
  }

  async init({ willLoadData = true }: { willLoadData: boolean }) {
    const isDev = process.env.NODE_ENV === "development";

    try {
      await this.sequelize.sync({
        force: isDev
      });

      if (willLoadData) {
        this.loadData();
      }

      if (isDev) {
        logger.log("db is connected");
      }
    } catch (error) {
      if (isDev) {
        logger.log(error);
      }
    }
  }
}

export const db = new DB();
