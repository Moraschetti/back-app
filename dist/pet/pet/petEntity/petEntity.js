"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetEntity = void 0;
class PetEntity {
    constructor(id, name, type, breed, gender, age, description, location, urlImg, state) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.gender = gender;
        this.age = age;
        this.description = description;
        this.location = location;
        this.urlImg = urlImg;
        this.state = state;
    }
    getID() {
        return this.id;
    }
    getType() {
        return this.type;
    }
    getBreed() {
        return this.breed;
    }
    getName() {
        return this.name;
    }
    getGender() {
        return this.gender;
    }
    getAge() {
        return this.age;
    }
    getDescription() {
        return this.description;
    }
    getLocation() {
        return this.location;
    }
    getImg() {
        return this.urlImg;
    }
    getState() {
        return this.state;
    }
    setAge(newAge) {
        this.age = newAge;
    }
    setDescription(newDescription) {
        this.description = newDescription;
    }
    setLocation(newLocation) {
        this.location = newLocation;
    }
    setImg(newUrlImg) {
        this.urlImg = newUrlImg;
    }
    setState(newState) {
        this.state = newState;
    }
}
exports.PetEntity = PetEntity;
//# sourceMappingURL=petEntity.js.map