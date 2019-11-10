import {
  DataTypes,
  HasManyCreateAssociationMixin,
  Model,
  Sequelize
} from "sequelize";

import Joi from "@hapi/joi";

import { ClientError } from "../../error/ClientError";
import { handleValidationError } from "../../helper/ValidationErrorHandler";

/**
 * @swagger
 * definition:
 *   Book:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: Book ID
 *       name:
 *         type: string
 *         description: 書籍のタイトル
 *       createdAt:
 *         type: date
 *         description: 作成日
 *       updatedAt:
 *         type: date
 *         description: 更新日
 *     example:
 *       id: 1
 *       name: book-1
 *       createdAt: 2019-11-05T14:10:42.000Z
 *       updatedAt: 2019-11-05T14:10:42.000Z
 */
export interface IBookModelAttributes {
  name: string;
}

export default class Book extends Model {
  static buildBookModel(sequelize: Sequelize, name: string) {
    Book.init(
      {
        name: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize,
        modelName: name
      }
    );

    return Book;
  }
}

export const validateBook = (data: IBookModelAttributes) => {
  const schema = Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(1)
        .max(20)
        .label("")
    })
    .error(handleValidationError);

  const { error } = Joi.validate(data, schema);

  if (error) {
    throw new ClientError(error.message, 400);
  }

  return {
    getName: () => data.name
  };
};
