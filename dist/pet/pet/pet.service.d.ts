import { PetEntity } from './petEntity/petEntity';
export declare class PetService {
    private petList;
    constructor();
    private loadPet;
    countElements(): number;
    getPets(param: string, pageNumber: number): PetEntity[];
    addPet(body: PetEntity): Promise<any>;
    adoptPet(id: number): string;
    wasAdopted(id: number): Promise<string>;
    editPet(id: number, body: PetEntity): any;
    deletePet(id: number): Promise<string>;
    private searchID;
    private updateList;
}
