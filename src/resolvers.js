var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
    reservationProducts: yup.array(yup.object().shape({
        productId: yup.string().length(36),
        quantity: yup.number().required().positive().integer(),
    })),
});
let StoreResolver = class StoreResolver {
    async stores() {
        return await getStores();
    }
    async store(id /* ,@Arg("withProducts", { nullable: true }) withProducts: boolean*/) {
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
    async products(store) {
        return await getStoreProducts(store.id);
    }
    async createStore(input) {
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
};
__decorate([
    Query(() => [Store], { description: "Get all the stores" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "stores", null);
__decorate([
    Query(() => Store, { description: "Get a specific store" }),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String /* ,@Arg("withProducts", { nullable: true }) withProducts: boolean*/]),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "store", null);
__decorate([
    FieldResolver(() => [Product]),
    __param(0, Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Store]),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "products", null);
__decorate([
    Mutation(() => Store, { description: "Create a new store" }),
    __param(0, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StoreInput]),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "createStore", null);
StoreResolver = __decorate([
    Resolver(() => Store)
], StoreResolver);
export { StoreResolver };
let ReservationResolver = class ReservationResolver {
    async reservationProducts(reservation) {
        return await getReservationProducts(reservation.id);
    }
    async createReservation(input) {
        return await createReservationSchema
            .validate(input)
            .then(validData => {
            return createReservation(validData);
        })
            .catch(err => {
            return new UserInputError('Invalid input', { validationErrors: err.errors });
        });
    }
};
__decorate([
    FieldResolver(() => [ReservationProduct]),
    __param(0, Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Reservation]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "reservationProducts", null);
__decorate([
    Mutation(() => Reservation, { description: "Create a new reservation" }),
    __param(0, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReservationInput]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "createReservation", null);
ReservationResolver = __decorate([
    Resolver(() => Reservation)
], ReservationResolver);
export { ReservationResolver };
