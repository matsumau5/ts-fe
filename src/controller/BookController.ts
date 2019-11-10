import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import { controller, httpGet } from "inversify-express-utils";

import BookService, {
  BookServiceImpl
} from "../domain/service/books/BookService";

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
export class BookController {
  @httpGet("")
  public async getBookList(req: Request, res: Response): Promise<any> {
    const service = new BookServiceImpl();
    const books = await service.getAll();

    return {
      success: true,
      statusCode: OK,
      body: books
    };
  }
}
