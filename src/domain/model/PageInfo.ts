export class PageInfo {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;

  constructor(init?: Partial<PageInfo>) {
    Object.assign(this, init);
  }
}
