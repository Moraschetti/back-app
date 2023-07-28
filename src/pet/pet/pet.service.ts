/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import {Injectable} from '@nestjs/common';
import { PetEntity } from './petEntity/petEntity';
import * as fs from 'fs/promises';

@Injectable()
export class PetService {
    private petList: PetEntity[];

    constructor() {
        this.loadPet();
    }

    private async loadPet(): Promise<void> {
        try {
            const archivo = await fs.readFile('./availablePet.csv', 'utf-8');
            const lineas = archivo.split('\n').map(linea => linea.replace('\r', '')).map(linea => linea.split(','));
            this.petList = lineas.map(([id, name, type, breed, gender, age, description, location, urlImg, state]) => {  // El map itera sobre cada elemento dentro del arreglo lineas. Y "crea" cada variable (id, type, breed, name,gender, age, img,state) luego usa cada valor para crear las entidades mascotas pasando esos valores. 
                if (state.toLowerCase() === 'disponible' || state.toLowerCase() === 'reservado') {
                    return new PetEntity
                        (
                            Number(id),
                            name,
                            type,
                            breed,
                            gender,
                            Number(age),
                            description,
                            location,
                            urlImg,
                            state
                        );
                }
            });
        } catch (error) {
            this.petList = [];
            console.error('Error al cargar las mascotas:', error);
        }
    }

    countElements() {
        return this.petList.length;
    }

    getPets(param : string,pageNumber : number): PetEntity[] {
        // Se declara el numero de pagina con su index inicial y final. Tomando por valor limite de 8 card por pagina
        const filters = param.split(',')
        const startIndex = (pageNumber - 1) * 10;
        const endIndex = startIndex + 10;
        console.log(param)
        let filteredPets : PetEntity[] = this.petList;
        if(param !== "$"){
            filters.slice(0,1)
            for (const filter of filters) {

                filteredPets = filteredPets.filter((pet) => {
                    return(
                            pet.getType().toLowerCase() === filter.toLowerCase() ||
                            pet.getGender().toLowerCase() === filter.toLowerCase() ||
                            pet.getLocation().toLowerCase() === filter.toLowerCase() ||
                            pet.getState().toLowerCase() === filter.toLowerCase()
                    );
                })
            }
            return filteredPets.slice(startIndex, endIndex);
        } else {
            return this.petList.slice(startIndex,endIndex)
        }
    }

    async addPet(body: PetEntity): Promise<any> {
        const newPet = new PetEntity(Number(body.id), body.name, body.type, body.breed, body.gender, Number(body.age), body.description, body.location, body.urlImg, body.state);
        await fs.appendFile('./availablePet.csv', `\n${newPet.getID()},${newPet.getName()},${newPet.getType()},${newPet.getBreed()},${newPet.getGender()},${newPet.getAge()},${newPet.getDescription()},${newPet.getLocation()},${newPet.getImg()},${newPet.getState()}`);
        this.petList.push(newPet);
        return 'Ok';
    }

    adoptPet(id: number): string {
        if (this.searchID(id)) {
            const petIndex = this.petList.findIndex(pet => pet.id == id);
            const pet = this.petList[petIndex];
            const currentState = pet.getState().toLowerCase();
            if (currentState === "disponible") {
                pet.setState("Reservado");
                this.updateList();
                return `Gracias por elegir a ${pet.getName()}. Nos comunicaremos para finalizar el proceso de adopción`
            }
            else if (currentState === "reservado") {
                return `Lo sentimos, ${pet.getName()} ya se encuentra reservado/a.`;
            } else {
                return `No se encontró ninguna mascota con el identificador ${id}.`
            };
        }
    }

    async wasAdopted(id:number) : Promise<string> {
        if (this.searchID) {
            const petIndex = this.petList.findIndex(pet => pet.id === id);
            const pet = this.petList[petIndex]
            pet.setState("Adoptado");
            try {
                let petData =`${pet.getID()},${pet.getName()},${pet.getType()},${pet.getBreed()},${pet.getGender()},${pet.getAge()},${pet.getDescription()},${pet.getLocation()},${pet.getImg()},${pet.getState()}`
                await fs.appendFile('./adoptedPet.csv', petData + '\n');
                this.petList.splice(petIndex, 1);
                await this.updateList();
                return `${pet.getName()} fue adoptado!`
            } catch(error){
                console.error(error)
            }
        }
    }

    editPet(id: number, body: PetEntity) : any {
        if(this.searchID(id)){
            const petIndex = this.petList.findIndex(pet => pet.id === id);
            const pet = this.petList[petIndex];
                if(body.id === undefined || body.id === pet.id){
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
                    return `Se actualizaron los datos`
                }
                else {
                    return "No se puede modificar el valor de un identificador unico"
                }
        }
        else {
            return `No se hay mascotas con el numero de identificacion ${id}`
        }
    }

    async deletePet(id: number): Promise<string> {
        if (this.searchID) {
            const petIndex = this.petList.findIndex(pet => pet.id === id);
            const pet = this.petList[petIndex];
            this.petList.splice(petIndex, 1);
            await this.updateList();
            return `Se elimino a la mascota ${pet.getName()}`
        } else {
            return `No hay mascota con el identificador ${id}`
        }
    }

    private searchID(id: number): boolean {
        let exist = false;
        for (let i = 0; i < this.petList.length; i++) {
            if (this.petList[i].id === id) {
                exist = true;
            }
        }
        return exist;
    }

    private async updateList(): Promise<void> {
        const dtb = this.petList.map(pet => `${pet.getID()},${pet.getName()},${pet.getType()},${pet.getBreed()},${pet.getGender()},${pet.getAge()},${pet.getDescription()},${pet.getLocation()},${pet.getImg()},${pet.getState()}`).join('\n');
        await fs.writeFile('./availablePet.csv', dtb);
    }
}
/*
import { Injectable } from '@nestjs/common';
import { Pet } from './petEntity/petEntity';
import * as fs from 'fs/promises';

@Injectable()
export class PetService {

    constructor() {
        this.loadPet();
        }
    private petList: Pet[] = [];

    private async loadPet(): Promise<void> {
        try {
            const archivo = await fs.readFile('pet.csv', 'utf-8');
            const lineas = archivo.split('\n').map(linea => linea.replace('\r', '')).map(linea => linea.split(','));
            this.petList = lineas.map(([id,name,type,breed,gender,age,description,location,urlImg,available]) => {  // El map itera sobre cada elemento dentro del arreglo lineas. Y "crea" cada variable (id, type, breed, name,gender, age, img,state) luego usa cada valor para crear las entidades mascotas pasando esos valores.
                return {
                    id: Number(id),
                    name,
                    type, 
                    breed, 
                    gender, 
                    age: Number(age),
                    description,
                    location,
                    urlImg,
                    available: available==='1',
                };
            })
        } 
        catch (error) {
                    this.petList = [];
                    console.error('Error al cargar las mascotas:', error);
            }
    }
    getPets(): Pet[] {
    return this.petList;
    }
    async addPet(body: Pet): Promise<string> {
    const newPet : Pet = {
        id: Number(body.id),
        name: body.name,
        type: body.type,
        breed: body.breed, 
        gender: body.gender,
        age: Number(body.age),
        description: body.description,
        location: body.location,
        urlImg: body.urlImg,
        available: body.available
    };
    try {
        await fs.appendFile('pet.csv', `\n${newPet.id},${newPet.name},${newPet.type},${newPet.breed},${newPet.gender},${newPet.age},${newPet.description},${newPet.location},${newPet.urlImg}, ${newPet.available}`);
        this.petList.push(newPet);
        this.updateList();
        return 'Carga de datos exitosa.'
        }
    catch(error) {
        return 'Error en la carga de datos.'
    }
    }
    deletePet(id: number): string {
        if (this.searchID(id)) {
            const petIndex = this.petList.findIndex(pet => pet.id === id);
            this.petList.splice(petIndex, 1);
            this.updateList();
            return `Se elimino a la mascota con identificador: ${id}`;
        } else {
            return `No hay mascota con el identificador: ${id}`;
        }
    }
    filterPet(param: string) : Pet[] {
        return this.petList.filter( pet => pet.type.toLowerCase() === param.toLowerCase())
    }
    adoptPet(id: number): string {
        if (this.searchID(id)) {
            const petIndex = this.petList.findIndex(pet => pet.id == id);
            const pet = this.petList[petIndex];
            const currentState = pet.available;
            if (currentState) {
                pet.available = false;
                this.updateList();
                return `Gracias por interesarse en adoptar a ${pet.name}. Nos comunicaremos para finalizar el proceso de adopción.`
            } else {
                return `Le pedimos disculpas, ${pet.name} ya se encuentra reservado /a.`
            }
        } else {
            return `No se encontró ninguna mascota con el identificador ${id}.`
        };
    }
    editPet(id: number, body: Pet) : any {
        if(this.searchID(id)){
            const petIndex = this.petList.findIndex(pet => pet.id === id);
            const pet = this.petList[petIndex];
                if(body.id === undefined || id === pet.id){
                    pet.name = body.name !== undefined ? body.name : pet.name,
                    pet.type = body.type !== undefined ? body.type : pet.type,
                    pet.breed = body.breed !== undefined ? body.breed : pet.breed,
                    pet.gender = body.gender !== undefined ? body.gender : pet.gender,
                    pet.age = body.age !== undefined ? body.age : pet.age,
                    pet.description = body.description !== undefined ? body.description : pet.description,
                    pet.location = body.location !== undefined ? body.location : pet.location,
                    pet.urlImg = body.urlImg !== undefined ? body.urlImg : pet.urlImg,
                    pet.available = body.available !== undefined ? body.available : pet.available,
                this.updateList();
                }
                else {
                    return "No se puede modificar el valor de un identificador unico"
                }
        }
    }
    private searchID(id:number) : boolean {
        let exist = false;
        for(let i = 0; i < this.petList.length; i++ ) {
            if(this.petList[i].id === id){
                exist = true;
            }
        }
        return exist;
    }
    private async updateList(): Promise<void> {
        const dtb = this.petList.map(pet => `${pet.id},${pet.name},${pet.type},${pet.breed},${pet.gender},${pet.age},${pet.description},${pet.location},${pet.urlImg},${pet.available ? 1 : 0}`).join('\n');
        await fs.writeFile('pet.csv', dtb);
        this.loadPet();
    }
}
*/