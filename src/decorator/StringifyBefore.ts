export const stringifyBeforeSymbol = Symbol("StringifyBefore");

const StringifyBefore: MethodDecorator = (target, propertyKey, descriptor) => {
    Reflect.metadata(stringifyBeforeSymbol, propertyKey)(target.constructor);
}

export default StringifyBefore;