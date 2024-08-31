export const parseAfterSymbol = Symbol("ParseAfter");

const ParseAfter: MethodDecorator = (target, propertyKey, descriptor) => {
    Reflect.metadata(parseAfterSymbol, propertyKey)(target.constructor);
}

export default ParseAfter;