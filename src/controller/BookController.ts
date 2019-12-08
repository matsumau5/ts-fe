import { Request, Response } from "express";
import { OK } from "http-status-codes";
import { controller, httpGet } from "inversify-express-utils";

import BookService from "../domain/service/BookService";
import { IControllerResponse } from "../helper/ControllerResponse";
import { inject } from "inversify";
import { Types } from "../config/di/types";

/**
 * @swagger
 * /books:
 *   get:
 *     description: 書籍の一覧を取得するAPI
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 書籍の一覧を返す
 *         schema:
 *           $ref: '#/definitions/Book'
 */
@controller("/books")
export default class BookController {
  constructor(
    @inject(Types.BookService)
    private service: BookService
  ) {}
  @httpGet("")
  public async getBookList(
    req: Request,
    res: Response
  ): Promise<IControllerResponse> {
    const books = await this.service.getAll();

    return {
      success: true,
      statusCode: OK,
      body: books
    };
  }
}
