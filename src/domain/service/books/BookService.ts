import {
  BookRepository,
  BookRepositoryImpl
} from "../../../infrastructure/repository/BookRepository";
import { IBookModelAttributes, validateBook } from "../../model/Book";
import { ModelInstance } from "../../model/ModelInstance";

export default interface BookService {
  getAll: () => Promise<ModelInstance[]>;
}

export class BookServiceImpl implements BookService {
  public repository: BookRepository;
  public async getAll() {
    const repository = new BookRepositoryImpl();
    const model = await repository.findAll();
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
