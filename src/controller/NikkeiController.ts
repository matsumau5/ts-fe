import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import { controller, httpGet } from "inversify-express-utils";

import { NikkeiRepository } from "../domain/repository/NikkeiRepository";
import { inject } from "inversify";
import { Types } from "../config/di/types";

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
  constructor(
    @inject(Types.NikkeiRepository)
    private repository: NikkeiRepository
  ) {}
  @httpGet("")
  public async getNikkeiList(req: Request, res: Response): Promise<any> {
    const nikkei = await this.repository.findAllNikkei();

    return {
      success: true,
      statusCode: OK,
      body: nikkei
    };
  }
}
