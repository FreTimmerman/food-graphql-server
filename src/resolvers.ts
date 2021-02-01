import "reflect-metadata";
import { Resolver, Query } from "type-graphql";
import { Store } from "./typeDefs.js";
import { getStores } from "./data.js";

@Resolver()
export class StoreResolver {
  private storeCollection: Store[] = getStores();

  @Query(returns => [Store], { description: "Get all the stores " })
  async stores(): Promise<Store[]> {
    return await this.storeCollection;
  }
}
