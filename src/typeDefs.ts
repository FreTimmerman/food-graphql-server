// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

import "reflect-metadata";
import { ObjectType, Field, ID, InputType, Int } from "type-graphql";
import { number } from "yup/lib/locale";


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