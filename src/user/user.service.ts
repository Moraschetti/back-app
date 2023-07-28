/* eslint-disable prettier/prettier */
import { userEntity } from './userEntity/userEntity';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class UserService {

    private userList: userEntity[] = [];

    constructor() {
        this.loadUser();
    }

    private async loadUser(): Promise<void> {
        try {
            const archivo = await fs.readFile('./user.csv', 'utf-8');
            const lineas = archivo.split('\n').map(linea => linea.replace('\r', '')).map(linea => linea.split(','));
            this.userList = lineas.map(([id, fullname, address, phoneNumber, email, interestedIn]) => {
                const idInt = parseInt(id);
                const phone = parseInt(phoneNumber);
                const interest = parseInt(interestedIn);
                return new userEntity(
                    idInt,
                    fullname,
                    address,
                    phone,
                    email,
                    interest
                )
            });
        } catch (error) {
            this.userList = [];
            console.error('Error al cargar los usuarios', error);
        }
    }
    usersList(): userEntity[] {
        return this.userList;
    }
    async addUser(body: any): Promise<string> {
        const id = parseInt(body.id);
        const phone = parseInt(body.phoneNumber);
        const intered = parseInt(body.interestedIn);
        const newUser = new userEntity(
            id,
            body.fullname,
            body.address,
            phone,
            body.email,
            intered
        );
        try {
            await fs.appendFile('./user.csv', `\n${newUser.getId()},${newUser.getFullname()},${newUser.getAddress()},${newUser.getPhoneNumber()},${newUser.getEmail()},${newUser.getInterestedIn()}`);
            this.userList.push(newUser);
            this.updateList();
            return 'Carga de datos exitosa.'
        }
        catch (error) {
            return 'Error en la carga de datos.'
        }
    }
    private async updateList(): Promise<void> {
        const dtb = this.userList.map(user => `${user.getId()},${user.getFullname()},${user.getAddress()},${user.getPhoneNumber()},${user.getEmail()},${user.getInterestedIn()}`).join('\n');
        await fs.writeFile('./user.csv', dtb);
        this.loadUser();
    }
}























/*
import { User } from './userEntity/userInterface';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class UserService {

    private userList : User[] = [];

    constructor() {
        this.loadUser();
    }

    private async loadUser(): Promise <void>{
        try {
            const archivo = await fs.readFile('user.csv', 'utf-8');
            const lineas = archivo.split('\n').map(linea => linea.replace('\r', '')).map(linea => linea.split(','));
            this.userList = lineas.map(([id,fullname,address,phone,email,interestedIn]) => {  
                return {
                    id: Number(id),
                    fullname,
                    address, 
                    phone: Number(phone), 
                    email,
                    interestedIn:Number(interestedIn),
                };
            })
        } catch(error) {
            this.userList = [];
            console.error('Error al cargar los usuarios', error);
        }
    }
    usersList(): User[] {
        return this.userList;
    }
    async addUser(body: User): Promise<string> {
        const newUser : User = {
            id: Number(body.id),
            fullname: body.fullname,
            address: body.address, 
            phone: Number(body.phone),
            email: body.email,
            interestedIn: Number(body.interestedIn),
        };
        try {
            await fs.appendFile('user.csv', `\n${newUser.id},${newUser.fullname},${newUser.address},${newUser.phone},${newUser.email},${newUser.interestedIn}`);
            this.userList.push(newUser);
            this.updateList();
            return 'Carga de datos exitosa.'
            }
        catch(error) {
            return 'Error en la carga de datos.'
        }
        }
    private async updateList(): Promise<void> {
        const dtb = this.userList.map(user => `${user.id},${user.fullname},${user.address},${user.phone},${user.email},${user.interestedIn}`).join('\n');
        await fs.writeFile('user.csv', dtb);
        this.loadUser();
    }
}
*/