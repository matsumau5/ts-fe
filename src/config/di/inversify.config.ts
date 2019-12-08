import { Container, interfaces } from "inversify";
import { NikkeiRepository } from "../../domain/repository/NikkeiRepository";
import BookRepository from "../../domain/repository/BookRepository";
import { BookRepositoryImpl } from "../../infrastructure/repository/BookRepositoryImpl";
import BookService, { BookServiceImpl } from "../../domain/service/BookService";
import { NikkeiRepositoryImpl } from "../../infrastructure/repository/NikkeiRepositoryImpl";
import { Types } from "./types";

const container = new Container();
// repository
container
  .bind<NikkeiRepository>(Types.NikkeiRepository)
  .to(NikkeiRepositoryImpl);
container.bind<BookRepository>(Types.BookRepository).to(BookRepositoryImpl);

// service
container.bind<BookService>(Types.BookService).to(BookServiceImpl);

export { container };
