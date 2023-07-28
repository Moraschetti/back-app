/* eslint-disable prettier/prettier */
export class userEntity {

    private id:number;
    private fullname:string;
    private address: string;
    private phoneNumber: number;
    private email: string;
    private interestedIn: number;

    constructor(id:number,fullname:string,address: string,phoneNumber: number,email: string,interestedIn: number) {
        this.id = id;
        this.fullname = fullname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.interestedIn = interestedIn;
    }
    
    getId() : number {
        return this.id;
    }
    getFullname() : string {
        return this.fullname;
    }
    getAddress() : string {
        return this.address;
    }
    getPhoneNumber() : number {
        return this.phoneNumber;
    }
    getEmail() : string {
        return this.email;
    }
    getInterestedIn() : number {
        return this.interestedIn;
    }
}
/*
    interface User {

    id:number;
    fullname:string;
    address: string;
    phoneNumber: number;
    email:string;
    interestedIn: number;
}*/