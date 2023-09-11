import "reflect-metadata";
import {Constructor} from "../../UtilType";

const AbstractSymbol = Symbol("Abstract");

function Abstract(returnType: Constructor<any>): MethodDecorator {
    return Reflect.metadata(AbstractSymbol, returnType);
}

export default Abstract;