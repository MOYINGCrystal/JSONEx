import "reflect-metadata";
import {Constructor} from "../UtilType";

const ImplSymbol = Symbol("Implements");

function Implements(...interfaces: (string | symbol)[]) {
    return Reflect.metadata(ImplSymbol, interfaces);
}

export default Implements;

export function getImplements(target: Constructor<any>) {
    return <(string | symbol)[]>Reflect.getMetadata(ImplSymbol, target);
}