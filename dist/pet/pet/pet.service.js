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
exports.PetService = void 0;
const common_1 = require("@nestjs/common");
const petEntity_1 = require("./petEntity/petEntity");
const fs = require("fs/promises");
let PetService = exports.PetService = class PetService {
    constructor() {
        this.loadPet();
    }
    async loadPet() {
        try {
            const archivo = await fs.readFile('./availablePet.csv', 'utf-8');
            const lineas = archivo.split('\n').map(linea => linea.replace('\r', '')).map(linea => linea.split(','));
            this.petList = lineas.map(([id, name, type, breed, gender, age, description, location, urlImg, state]) => {
                if (state.toLowerCase() === 'disponible' || state.toLowerCase() === 'reservado') {
                    return new petEntity_1.PetEntity(Number(id), name, type, breed, gender, Number(age), description, location, urlImg, state);
                }
            });
        }
        catch (error) {
            this.petList = [];
            console.error('Error al cargar las mascotas:', error);
        }
    }
    countElements() {
        return this.petList.length;
    }
    getPets(param, pageNumber) {
        const filters = param.split(',');
        const startIndex = (pageNumber - 1) * 10;
        const endIndex = startIndex + 10;
        console.log(param);
        let filteredPets = this.petList;
        if (param !== "$") {
            filters.slice(0, 1);
            for (const filter of filters) {
                filteredPets = filteredPets.filter((pet) => {
                    return (pet.getType().toLowerCase() === filter.toLowerCase() ||
                        pet.getGender().toLowerCase() === filter.toLowerCase() ||
                        pet.getLocation().toLowerCase() === filter.toLowerCase() ||
                        pet.getState().toLowerCase() === filter.toLowerCase());
                });
            }
            return filteredPets.slice(startIndex, endIndex);
        }
        else {
            return this.petList.slice(startIndex, endIndex);
        }
    }
    async addPet(body) {
        const newPet = new petEntity_1.PetEntity(Number(body.id), body.name, body.type, body.breed, body.gender, Number(body.age), body.description, body.location, body.urlImg, body.state);
        await fs.appendFile('./availablePet.csv', `\n${newPet.getID()},${newPet.getName()},${newPet.getType()},${newPet.getBreed()},${newPet.getGender()},${newPet.getAge()},${newPet.getDescription()},${newPet.getLocation()},${newPet.getImg()},${newPet.getState()}`);
        this.petList.push(newPet);
        return 'Ok';
    }
    adoptPet(id) {
        if (this.searchID(id)) {
            const petIndex = this.petList.findIndex(pet => pet.id == id);
            const pet = this.petList[petIndex];
            const currentState = pet.getState().toLowerCase();
            if (currentState === "disponible") {
                pet.setState("Reservado");
                this.updateList();
                return `Gracias por elegir a ${pet.getName()}. Nos comunicaremos para finalizar el proceso de adopción`;
            }
            else if (currentState === "reservado") {
                return `Lo sentimos, ${pet.getName()} ya se encuentra reservado/a.`;
            }
            else {
                return `No se encontró ninguna mascota con el identificador ${id}.`;
            }
            ;
        }
    }
    async wasAdopted(id) {
        if (this.searchID) {
            const petIndex = this.petList.findIndex(pet => pet.id === id);
            const pet = this.petList[petIndex];
            pet.setState("Adoptado");
            try {
                let petData = `${pet.getID()},${pet.getName()},${pet.getType()},${pet.getBreed()},${pet.getGender()},${pet.getAge()},${pet.getDescription()},${pet.getLocation()},${pet.getImg()},${pet.getState()}`;
                await fs.appendFile('./adoptedPet.csv', petData + '\n');
                this.petList.splice(petIndex, 1);
                await this.updateList();
                return `${pet.getName()} fue adoptado!`;
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    editPet(id, body) {
        if (this.searchID(id)) {
            const petIndex = this.petList.findIndex(pet => pet.id === id);
            const pet = this.petList[petIndex];
            if (body.id === undefined || body.id === pet.id) {
                body.name !== undefined ? pet.setName(body.name) : pet.name;
                body.type !== undefined ? pet.setType(body.type) : pet.type,
                    body.breed !== undefined ? pet.setBreed(body.breed) : pet.breed,
                    body.gender !== undefined ? pet.setGender(body.gender) : pet.gender,
                    body.age !== undefined ? pet.setAge(body.age) : pet.setAge,
                    body.description !== undefined ? pet.setDescription(body.description) : pet.description,
                    body.location !== undefined ? pet.setLocation(body.location) : pet.location,
                    body.urlImg !== undefined ? pet.setImg(body.urlImg) : pet.urlImg,
                    body.state !== undefined ? pet.setState(body.state) : pet.state,
                    this.updateList();
                return `Se actualizaron los datos`;
            }
            else {
                return "No se puede modificar el valor de un identificador unico";
            }
        }
        else {
            return `No se hay mascotas con el numero de identificacion ${id}`;
        }
    }
    async deletePet(id) {
        if (this.searchID) {
            const petIndex = this.petList.findIndex(pet => pet.id === id);
            const pet = this.petList[petIndex];
            this.petList.splice(petIndex, 1);
            await this.updateList();
            return `Se elimino a la mascota ${pet.getName()}`;
        }
        else {
            return `No hay mascota con el identificador ${id}`;
        }
    }
    searchID(id) {
        let exist = false;
        for (let i = 0; i < this.petList.length; i++) {
            if (this.petList[i].id === id) {
                exist = true;
            }
        }
        return exist;
    }
    async updateList() {
        const dtb = this.petList.map(pet => `${pet.getID()},${pet.getName()},${pet.getType()},${pet.getBreed()},${pet.getGender()},${pet.getAge()},${pet.getDescription()},${pet.getLocation()},${pet.getImg()},${pet.getState()}`).join('\n');
        await fs.writeFile('./availablePet.csv', dtb);
    }
};
exports.PetService = PetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PetService);
//# sourceMappingURL=pet.service.js.map