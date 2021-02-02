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
import { ObjectType, Field, InputType, Int, Float } from "type-graphql";
let Store = class Store {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], Store.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Store.prototype, "city", void 0);
__decorate([
    Field(type => Int),
    __metadata("design:type", Number)
], Store.prototype, "number", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Store.prototype, "postalCode", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Store.prototype, "street", void 0);
__decorate([
    Field(type => [Product]),
    __metadata("design:type", Array)
], Store.prototype, "products", void 0);
Store = __decorate([
    ObjectType()
], Store);
export { Store };
let StoreInput = class StoreInput {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], StoreInput.prototype, "name", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], StoreInput.prototype, "city", void 0);
__decorate([
    Field(type => Int),
    __metadata("design:type", Number)
], StoreInput.prototype, "number", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], StoreInput.prototype, "postalCode", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], StoreInput.prototype, "street", void 0);
StoreInput = __decorate([
    InputType()
], StoreInput);
export { StoreInput };
let Product = class Product {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Field(type => Float),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
Product = __decorate([
    ObjectType()
], Product);
export { Product };
