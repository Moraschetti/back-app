import { userEntity } from './userEntity/userEntity';
export declare class UserService {
    private userList;
    constructor();
    private loadUser;
    usersList(): userEntity[];
    addUser(body: any): Promise<string>;
    private updateList;
}
