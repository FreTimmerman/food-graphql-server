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
let StoreResolver = class StoreResolver {
    constructor() {
        this.storeCollection = getStores();
    }
    async stores() {
        return await this.storeCollection;
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
    Query(returns => [Store], { description: "Get all the stores" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "stores", null);
__decorate([
    Mutation(() => Store, { description: "Create a new store" }),
    __param(0, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StoreInput]),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "createStore", null);
StoreResolver = __decorate([
    Resolver()
], StoreResolver);
export { StoreResolver };
