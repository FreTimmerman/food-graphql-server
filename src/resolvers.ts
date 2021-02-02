import "reflect-metadata";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Store, StoreInput } from "./typeDefs.js";
import { createStore, getStores } from "./data.js";
import * as yup from 'yup';
import { UserInputError } from "apollo-server";

// define input validations
const createStoreSchema = yup.object()
  .shape({
    city: yup.string().max(255).required(),
    name: yup.string().max(255).required(),
    number: yup.number().required().positive().integer(),
    postalCode: yup.string().required().max(10),
    street: yup.string().required().max(255),
  });


@Resolver()
export class StoreResolver {
  private storeCollection: Store[] = getStores();

  @Query(returns => [Store], { description: "Get all the stores" })
  async stores(): Promise<Store[]> {
    return await this.storeCollection;
  }

  @Mutation(() => Store, { description: "Create a new store" })
  async createStore(@Arg("input") input: StoreInput) {
    // check validity
    return await createStoreSchema
      .validate(input)
      .then(validData => {
        // put in db with data.js and return the value to grapqhl
        return createStore(validData);
      })
      .catch(err => {
        return new UserInputError('Invalid input', { validationErrors: err.errors });
      });

  }

}
