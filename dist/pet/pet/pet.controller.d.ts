import { PetService } from './pet.service';
import { InformationService } from 'src/information/information.service';
export declare class PetController {
    private readonly petService;
    private readonly informationService;
    constructor(petService: PetService, informationService: InformationService);
    getCountElements(): number;
    getPets(param: string, pageNumber: number): any;
}
