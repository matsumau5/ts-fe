import { readdirSync } from "fs";

export class DirUtils {
  static getControllers(): string[] {
    return readdirSync("./src/controller").map(file => {
      return "./src/controller/" + file;
    });
  }

  static getModels(): string[] {
    return readdirSync("./src/domain/model").map(file => {
      return "./src/domain/model/" + file;
    });
  }
  private constructor() {}
}
