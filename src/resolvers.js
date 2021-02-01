var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "reflect-metadata";
import { Resolver, Query } from "type-graphql";
import { Store } from "./typeDefs.js";
import { getStores } from "./data.js";
let StoreResolver = class StoreResolver {
    constructor() {
        this.storeCollection = getStores();
    }
    async stores() {
        return await this.storeCollection;
    }
};
__decorate([
    Query(returns => [Store], { description: "Get all the stores " }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "stores", null);
StoreResolver = __decorate([
    Resolver()
], StoreResolver);
export { StoreResolver };
