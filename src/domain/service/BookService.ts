import { IBookModelAttributes, validateBook } from "../model/Book";
import { ModelInstance } from "../model/ModelInstance";
import { injectable, inject } from "inversify";
import { Types } from "../../config/di/types";
import BookRepository from "../repository/BookRepository";

export default interface BookService {
  getAll: () => Promise<ModelInstance[]>;
  addBook(body: IBookModelAttributes): Promise<string>;
}

@injectable()
export class BookServiceImpl implements BookService {
  constructor(
    @inject(Types.BookRepository)
    private repository: BookRepository
  ) {}
  public async getAll() {
    const model = await this.repository.findAll();
    return model;
  }

  public async addBook(body: IBookModelAttributes) {
    await this.repository.create(body);
    return body.name;
  }
}

export type IAddBooks = (body: IBookModelAttributes) => Promise<any>;

export const buildAddBooks = ({
  bookRepository
}: {
  bookRepository: BookRepository;
}): IAddBooks => {
  return async body => {
    const bookData = validateBook(body);
    return bookRepository.create({
      name: bookData.getName()
    });
  };
};
