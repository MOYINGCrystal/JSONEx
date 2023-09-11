export {}

const ParamDecorator = (target: {
    [x: typeof propertyKey]: any
}, propertyKey: string | symbol, parameterIndex: number) => {
    console.log(`target`, target);
    console.log(`propertyKey`, propertyKey);
    console.log(`parameterIndex`, parameterIndex);
    return target[propertyKey];
}

class Human {
    sum(@ParamDecorator a: number, @ParamDecorator b: number) {
        console.log(a + b);
    }
}

it('test', function () {
    new Human().sum(1, 2);
});