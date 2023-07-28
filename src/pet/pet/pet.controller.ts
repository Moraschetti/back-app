/* eslint-disable prettier/prettier */
import { PetService } from './pet.service';
/*import { Body, Controller , Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res} from '@nestjs/common';
import { PetEntity } from './petEntity/petEntity';*/
import {Controller,Param, ParseIntPipe, Get } from '@nestjs/common';
import { InformationService } from 'src/information/information.service';
/*import { InformationController } from 'src/information/information.controller';*/
@Controller('/pets')
export class PetController {

    constructor(private readonly petService : PetService, private readonly informationService : InformationService) {}

    @Get('/count')
    getCountElements(): number {
        return this.petService.countElements()
    }
    @Get('filter__:param/:pageNumber')
    getPets(@Param('param',) param : string, @Param('pageNumber', ParseIntPipe) pageNumber : number) : any {
        return this.petService.getPets(param, pageNumber);
    }
/*    @Post('/addPet')
    getAdd(@Body() body : PetEntity) : any {
        this.informationService.newPet(body)
        return this.petService.addPet(body)
    }
    @Delete('/deletePet/:id')
    getDelete(@Param('id', ParseIntPipe) id: number) : any {
        return this.petService.deletePet(id);
    }
    @Put('/adoptPet/:id')
    async getAdoptPet(@Param('id', ParseIntPipe) id: number, @Res() res: any) : Promise<any> {
        try {
            const mensaje = this.petService.adoptPet(id);
        if(mensaje.startsWith('Gracias')) {
                const adoptedPet = this.petService.getPetById(id);
                this.informationService.reservedPet(adoptedPet);
            res.status(HttpStatus.OK).json({
                mensaje: mensaje,
            });
        } else if ( mensaje.startsWith('Le pedimos')) {
            res.status(HttpStatus.OK).json({
                mensaje: mensaje
            })
        }
        }
        catch(error){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                mensaje: `Error en el servidor`
            })
        }
    }
    @Put('/changeState/:id')
        getchangeState(@Param('id', ParseIntPipe) id: number) : any {
            const adoptedPet = this.petService.getPetById(id);
            this.informationService.wasAdopted(adoptedPet);
            return this.petService.wasAdopted(id);
        }
    @Put('/editPet/:id')
    getEditPet(@Param('id', ParseIntPipe) id: number, @Body() body : PetEntity) : any {
        return this.petService.editPet(id, body);
    }*/
}