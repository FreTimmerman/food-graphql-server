import "reflect-metadata";
import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { Store, StoreInput, Product, Reservation, ReservationProduct, ReservationInput } from "./typeDefs.js";
import { createStore, getStores, getStore, getStoreProducts, createReservation, getReservationProducts } from "./data.js";
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

const getStoreSchema = yup.object()
  .shape({
    id: yup.string().length(36).required()
  });

const createReservationSchema = yup.object()
  .shape({
    reservationProducts: yup.array(
      yup.object().shape({
        productId: yup.string().length(36),
        quantity: yup.number().required().positive().integer(),
      })
    ),
  });

@Resolver(() => Store)
export class StoreResolver {

  @Query(() => [Store], { description: "Get all the stores" })
  async stores(): Promise<Store[]> {
    return await getStores();
  }

  @Query(() => Store, { description: "Get a specific store" })
  async store(@Arg("id") id: String/* ,@Arg("withProducts", { nullable: true }) withProducts: boolean*/): Promise<Store> {
    // check validity
    return await getStoreSchema
      .validate({ id: id })
      .then(validData => {
        return getStore(validData.id);
      })
      .catch(err => {
        return new UserInputError('Invalid input', { validationErrors: err.errors });
      });
  }

  //Extend the Store type with a list of its products.
  @FieldResolver(() => [Product])
  async products(@Root() store: Store): Promise<[Product]> {
    return await getStoreProducts(store.id);
  }



  @Mutation(() => Store, { description: "Create a new store" })
  async createStore(@Arg("input") input: StoreInput): Promise<Store | UserInputError> {
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
@Resolver(() => Reservation)
export class ReservationResolver {

  @FieldResolver(() => [ReservationProduct])
  async reservationProducts(@Root() reservation: Reservation) {
    return await getReservationProducts(reservation.id);
  }

  @Mutation(() => Reservation, { description: "Create a new reservation" })
  async createReservation(@Arg("input") input: ReservationInput): Promise<Reservation | UserInputError> {
    return await createReservationSchema
      .validate(input)
      .then(validData => {
        return createReservation(validData);
      })
      .catch(err => {
        return new UserInputError('Invalid input', { validationErrors: err.errors });
      })
  }
}
