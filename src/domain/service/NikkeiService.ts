import { inject, injectable } from "inversify";
import { Types } from "../../config/di/types";
import { NikkeiRepository } from "../../domain/repository/NikkeiRepository";

export default interface NikkeiService {
  getAllData: Promise<any>;
}

@injectable()
export class NikkeiServiceImpl {
  constructor(
    @inject(Types.NikkeiRepository)
    private repository: NikkeiRepository
  ) {}
  public getAllData() {
    return this.repository.findAllNikkei();
  }
}
