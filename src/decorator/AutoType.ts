import "reflect-metadata";

const autoTypeSymbol = Symbol("AutoType");

const AutoType: PropertyDecorator = Reflect.metadata(autoTypeSymbol, true);

export default AutoType;