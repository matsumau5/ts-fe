import { IBookModelAttributes } from "../../domain/model/Book";
import { DB } from "../../infrastructure/db";
import { ModelInstance } from "../model/ModelInstance";

export default interface BookRepository {
  findAll: () => Promise<ModelInstance[]>;
  create: (data: IBookModelAttributes) => Promise<ModelInstance>;
}
