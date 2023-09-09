export {}

const MethodDecorator: MethodDecorator = (target, name, descriptor) => {
    console.log({target, name, descriptor});
    debugger;
}

class Human {
    static species = 'Human';

    @MethodDecorator
    static method1() {
        console.log(Human.species);
    }

    @MethodDecorator
    method2() {
        console.log(123);
    }
}

it('test', function () {
    Human.method1();
    new Human().method2();
});