"use strict";

import { Client, ApiResponse, RequestParams } from "@elastic/elasticsearch";
const client = new Client({ node: "http://192.168.0.19:9200" });

export class NikkeiRepository {
  public async findAllNikkei(): Promise<any> {
    // const doc1: RequestParams.Index = {
    //   index: "nikkei225",
    //   body: {
    //     character: "Ned Stark",
    //     quote: "Winter is coming."
    //   }
    // };
    // await client.index(doc1);

    const params: RequestParams.Search = {
      index: "nikkei225"
      //   body: {
      //     query: {
      //       matchAll: {}
      //     }
      //   }
    };
    return client
      .search(params)
      .then((result: ApiResponse) => {
        console.log(result.body.hits.hits);
        return result.body.hits.hits;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
}
