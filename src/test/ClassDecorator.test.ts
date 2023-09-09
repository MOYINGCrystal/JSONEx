export {}

const ClassDecorator: ClassDecorator = (target) => {
    // console.log(`species is ${target.species}`); // species is human
    debugger;
}

// 使用装饰器
@ClassDecorator
class Human {
    static species = 'human';

    constructor(public name: string) {
        console.log(0);
    }

    test() {
        console.log(this.name);
    }
}

it("test", () => {
    new Human("A").test();
})