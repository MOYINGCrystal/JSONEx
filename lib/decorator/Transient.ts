import "reflect-metadata";

export const transientSymbol = Symbol("Transient");

const Transient: PropertyDecorator = Reflect.metadata(transientSymbol,true);

export default Transient;