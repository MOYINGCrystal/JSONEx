export const parseAfterSymbol = Symbol("StringifyBefore");

const ParseAfter: MethodDecorator = (target, propertyKey, descriptor) => {
    Reflect.metadata(parseAfterSymbol, propertyKey)(target.constructor);
}

export default ParseAfter;