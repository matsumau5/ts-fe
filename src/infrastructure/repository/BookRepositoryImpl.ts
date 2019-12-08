import { inject, injectable } from "inversify";

import { IBookModelAttributes } from "../../domain/model/Book";
import { ModelInstance } from "../../domain/model/ModelInstance";
import { DB } from "../db";
import BookRepository from "../../domain/repository/BookRepository";

@injectable()
export class BookRepositoryImpl implements BookRepository {
  public dbObj = new DB();
  public async findAll(): Promise<ModelInstance[]> {
    const result = await this.dbObj.models.Book.findAll();
    return result;
  }

  public create(data: IBookModelAttributes): Promise<ModelInstance> {
    return this.dbObj.models.Book.create(data);
  }
}
