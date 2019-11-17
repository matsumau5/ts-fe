export class TestInfo {
  id: string;
  col1: string;

  constructor(init?: Partial<TestInfo>) {
    Object.assign(this, init);
  }
}
