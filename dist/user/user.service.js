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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userEntity_1 = require("./userEntity/userEntity");
const common_1 = require("@nestjs/common");
const fs = require("fs/promises");
let UserService = exports.UserService = class UserService {
    constructor() {
        this.userList = [];
        this.loadUser();
    }
    async loadUser() {
        try {
            const archivo = await fs.readFile('./user.csv', 'utf-8');
            const lineas = archivo.split('\n').map(linea => linea.replace('\r', '')).map(linea => linea.split(','));
            this.userList = lineas.map(([id, fullname, address, phoneNumber, email, interestedIn]) => {
                const idInt = parseInt(id);
                const phone = parseInt(phoneNumber);
                const interest = parseInt(interestedIn);
                return new userEntity_1.userEntity(idInt, fullname, address, phone, email, interest);
            });
        }
        catch (error) {
            this.userList = [];
            console.error('Error al cargar los usuarios', error);
        }
    }
    usersList() {
        return this.userList;
    }
    async addUser(body) {
        const id = parseInt(body.id);
        const phone = parseInt(body.phoneNumber);
        const intered = parseInt(body.interestedIn);
        const newUser = new userEntity_1.userEntity(id, body.fullname, body.address, phone, body.email, intered);
        try {
            await fs.appendFile('./user.csv', `\n${newUser.getId()},${newUser.getFullname()},${newUser.getAddress()},${newUser.getPhoneNumber()},${newUser.getEmail()},${newUser.getInterestedIn()}`);
            this.userList.push(newUser);
            this.updateList();
            return 'Carga de datos exitosa.';
        }
        catch (error) {
            return 'Error en la carga de datos.';
        }
    }
    async updateList() {
        const dtb = this.userList.map(user => `${user.getId()},${user.getFullname()},${user.getAddress()},${user.getPhoneNumber()},${user.getEmail()},${user.getInterestedIn()}`).join('\n');
        await fs.writeFile('./user.csv', dtb);
        this.loadUser();
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
//# sourceMappingURL=user.service.js.map