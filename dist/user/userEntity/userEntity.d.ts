export declare class userEntity {
    private id;
    private fullname;
    private address;
    private phoneNumber;
    private email;
    private interestedIn;
    constructor(id: number, fullname: string, address: string, phoneNumber: number, email: string, interestedIn: number);
    getId(): number;
    getFullname(): string;
    getAddress(): string;
    getPhoneNumber(): number;
    getEmail(): string;
    getInterestedIn(): number;
}
