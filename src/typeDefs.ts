// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";


@ObjectType()
export class Store {
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: "The name of the store" })
  name: string;
}