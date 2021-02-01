// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
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
import { ObjectType, Field, ID } from "type-graphql";
let Store = class Store {
};
__decorate([
    Field(() => ID),
    __metadata("design:type", String)
], Store.prototype, "id", void 0);
__decorate([
    Field(() => String, { description: "The name of the store" }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
Store = __decorate([
    ObjectType()
], Store);
export { Store };
