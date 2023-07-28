"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetController = void 0;
const pet_service_1 = require("./pet.service");
const common_1 = require("@nestjs/common");
const information_service_1 = require("../../information/information.service");
let PetController = exports.PetController = class PetController {
    constructor(petService, informationService) {
        this.petService = petService;
        this.informationService = informationService;
    }
    getCountElements() {
        return this.petService.countElements();
    }
    getPets(param, pageNumber) {
        return this.petService.getPets(param, pageNumber);
    }
};
__decorate([
    (0, common_1.Get)('/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], PetController.prototype, "getCountElements", null);
__decorate([
    (0, common_1.Get)('filter__:param/:pageNumber'),
    __param(0, (0, common_1.Param)('param')),
    __param(1, (0, common_1.Param)('pageNumber', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Object)
], PetController.prototype, "getPets", null);
exports.PetController = PetController = __decorate([
    (0, common_1.Controller)('/pets'),
    __metadata("design:paramtypes", [pet_service_1.PetService, information_service_1.InformationService])
], PetController);
//# sourceMappingURL=pet.controller.js.map