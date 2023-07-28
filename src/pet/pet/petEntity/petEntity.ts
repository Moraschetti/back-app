/* eslint-disable prettier/prettier */
export class PetEntity{
    setType: any;
    setBreed: any;
    setGender: any;
    setName: any;

    constructor(
        public id: number,
        public name: string,
        public type: string,
        public breed: string,
        public gender: string,
        public age: number,
        public description: string,
        public location: string,
        public urlImg: string,
        public state: string,
    ) {}
    getID(): number {
        return this.id;
    }
    getType(): string {
        return this.type;
    }
    getBreed(): string {
        return this.breed;
    }
    getName(): string {
        return this.name;
    }
    getGender(): string {
        return this.gender;
    }
    getAge(): number {
        return this.age;
    }
    getDescription(): string {
        return this.description;
    }
    getLocation() : string {
        return this.location;
    }
    getImg(): string {
        return this.urlImg;
    }
    getState(): string {
        return this.state;
    }
    setAge(newAge: number) : void {
        this.age = newAge;
    }
    setDescription(newDescription:string) : void {
        this.description = newDescription;
    }
    setLocation(newLocation:string) : void {
        this.location = newLocation;
    }
    setImg(newUrlImg: string) : void {
        this.urlImg = newUrlImg;
    }
    setState(newState: string) : void {
        this.state = newState;
    }
}

/*
export interface Pet {
    id?: number;
    name?: string;
    type?: string;
    breed?: string;
    gender?: string;
    age?: number;
    description?: string;
    location?:string;
    urlImg?: string;
    available?: boolean;
}
*/