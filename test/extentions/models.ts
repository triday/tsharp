export class People {
    constructor(public name: string, public age: number) {
    }
}
export class Student extends People {
    constructor(name: string, age: number, public studentId: string) {
        super(name, age);
    }
}
