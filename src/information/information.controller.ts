/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { InformationService } from './information.service';

@Controller('information')
export class InformationController {

    constructor(private readonly informationService : InformationService) {}

    @Get()
    getInformation() : string {
        return 'Hola'
    }

}
