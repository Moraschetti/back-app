import { InformationService } from './information.service';
export declare class InformationController {
    private readonly informationService;
    constructor(informationService: InformationService);
    getInformation(): string;
}
