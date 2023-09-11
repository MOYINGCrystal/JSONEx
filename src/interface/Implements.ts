import "reflect-metadata";
import {Constructor} from "../UtilType";
import Interface from "./Interface";

const ImplSymbol = Symbol("Implements");

const Implements: ((...args: any[]) => ClassDecorator) = (...interfaces: (string | symbol | Interface)[]) => (target) => {
    interfaces.forEach(interface1 => {
        if (interface1 instanceof Interface) {
            interface1.assertImplement(<Constructor<any>><any>target);
            interface1.execute(<Constructor<any>><any>target);
        }
    });
    Reflect.metadata(ImplSymbol, interfaces)(target);
}

export default Implements;

export function getImplements(target: Constructor<any>) {
    return <(string | symbol | Interface)[]>Reflect.getMetadata(ImplSymbol, target);
}