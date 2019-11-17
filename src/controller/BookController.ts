import { Request, Response } from "express";
import { OK } from "http-status-codes";
import { controller, httpGet } from "inversify-express-utils";

import { BookServiceImpl } from "../domain/service/books/BookService";
import { IControllerResponse } from "../helper/ControllerResponse";

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
  @httpGet("")
  public async getBookList(
    req: Request,
    res: Response
  ): Promise<IControllerResponse> {
    const service = new BookServiceImpl();
    const books = await service.getAll();

    return {
      success: true,
      statusCode: OK,
      body: books
    };
  }
}
