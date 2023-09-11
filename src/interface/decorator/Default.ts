import "reflect-metadata";
import {Constructor} from "../../UtilType";

const defaultSymbol = Symbol("Default");

const Default: PropertyDecorator = Reflect.metadata(defaultSymbol, true);

export default Default;

export function isDefaultMethod(target: Constructor<any>, method: string | symbol) {
    return Reflect.getMetadataKeys(target.prototype, method).includes(defaultSymbol);
}