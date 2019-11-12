import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import { controller, httpGet } from "inversify-express-utils";

import BookService, {
  BookServiceImpl
} from "../domain/service/books/BookService";
import { NikkeiRepository } from "../infrastructure/repository/NikkeiRepository";

/**
 * @swagger
 * /nikkei:
 *   get:
 *     description: 日経情報の一覧を取得するAPI
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 日経情報を返す
 *         schema:
 *           $ref: '#/definitions/Nikkei'
 */
@controller("/nikkei")
export class NikkeiController {
  @httpGet("")
  public async getNikkeiList(req: Request, res: Response): Promise<any> {
    const repository = new NikkeiRepository();
    const nikkei = await repository.findAllNikkei();

    return {
      success: true,
      statusCode: OK,
      body: nikkei
    };
  }
}
