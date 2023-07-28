/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
/*import { PetController } from './pet/pet/pet.controller';*/
import { PetService } from './pet/pet/pet.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { InformationController } from './information/information.controller';
import { InformationService } from './information/information.service';
@Module({
  imports: [
    
  ],
  controllers: [/*PetController,*/ UserController,InformationController],
  providers: [PetService, UserService, InformationService],
  
})
export class AppModule {}