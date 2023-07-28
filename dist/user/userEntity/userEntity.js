"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
class userEntity {
    constructor(id, fullname, address, phoneNumber, email, interestedIn) {
        this.id = id;
        this.fullname = fullname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.interestedIn = interestedIn;
    }
    getId() {
        return this.id;
    }
    getFullname() {
        return this.fullname;
    }
    getAddress() {
        return this.address;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getEmail() {
        return this.email;
    }
    getInterestedIn() {
        return this.interestedIn;
    }
}
exports.userEntity = userEntity;
//# sourceMappingURL=userEntity.js.map