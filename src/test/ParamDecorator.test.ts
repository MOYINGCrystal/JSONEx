export {}

const ParamDecorator: ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    console.log(`target`, target);
    console.log(`propertyKey`, propertyKey);
    console.log(`parameterIndex`, parameterIndex);
}

class Human {
    sum(@ParamDecorator a: number, @ParamDecorator b: number) {
        console.log(a + b);
    }
}

it('test', function () {
    new Human().sum(1, 2);
});