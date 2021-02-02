// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

import "reflect-metadata";
import { ObjectType, Field, InputType, Int, Float } from "type-graphql";


@ObjectType()
export class Store {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  city: string;
  @Field(type => Int)
  number: number;
  @Field()
  postalCode: string
  @Field()
  street: string
  @Field(type => [Product])
  products?: [Product]
}
@InputType()
export class StoreInput {
  @Field()
  name: string;
  @Field()
  city: string;
  @Field(type => Int)
  number: number;
  @Field()
  postalCode: string
  @Field()
  street: string
}

@ObjectType()
export class Product {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field(type => Float)
  price: number;
}