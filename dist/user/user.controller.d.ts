import { UserService } from './user.service';
import { userEntity } from './userEntity/userEntity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): any;
    getUser(id: number): any;
    getAddUser(body: userEntity): any;
}
