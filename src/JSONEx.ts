import type {SerializableObject} from "./Serializable";
import "reflect-metadata";
import {Constructor} from "./UtilType";
import {arrayTypeSymbol} from "./decorator/ArrayType";
import {assertSerializable} from "./Serializable";
import {transientSymbol} from "./decorator/Transient";
import {setTypeSymbol} from "./decorator/SetType";
import {mapTypeSymbol} from "./decorator/MapType";

export class JSONEx<T extends SerializableObject> {
    constructor(public type: Constructor<T>) {
        assertSerializable(this.type);
    }

    public parse(text: string, reviver?: (this: any, key: string, value: any) => any): T {
        let parse = JSON.parse(text, this.reviver);
        Object.setPrototypeOf(parse, this.type.prototype);
        this.setPrototype(parse, this.type.prototype);
        return parse;
    }

    public stringify(value: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;

    public stringify(value: T, replacer?: (number | string)[] | null, space?: string | number): string;

    public stringify(value: T, replacer?: ((this: any, key: string, value: any) => any) | (number | string)[] | null, space?: string | number): string {
        return JSON.stringify(value, this.replacer);
    }

    private setPrototype(obj: any, type: Object) {
        for (const key of Reflect.ownKeys(obj)) {
            let subObj = obj[key];
            let typeStr = Object.prototype.toString.call(subObj);
            if (typeStr === "[object Object]") {
                let proto = Reflect.getMetadata("design:type", type, key)?.prototype;
                if (!proto) continue;
                Object.setPrototypeOf(subObj, proto);
                this.setPrototype(subObj, proto);
                continue;
            }
            if (subObj instanceof Array) {
                let proto = Reflect.getMetadata(arrayTypeSymbol, type, key)?.prototype;
                if (!proto) continue;
                subObj.forEach(value => {
                    Object.setPrototypeOf(value, proto);
                    this.setPrototype(value, proto);
                });
                continue;
            }
            if (subObj instanceof Set) {
                let proto = Reflect.getMetadata(setTypeSymbol, type, key)?.prototype;
                if (!proto) continue;
                subObj.forEach(value => {
                    Object.setPrototypeOf(value, proto);
                    this.setPrototype(value, proto);
                });
                continue;
            }
            if (subObj instanceof Map) {
                let proto = <{
                    keyType: Constructor<SerializableObject>,
                    valueType: Constructor<SerializableObject>
                }>Reflect.getMetadata(mapTypeSymbol, type, key);
                if (!proto) continue;
                subObj.forEach((value, key) => {
                    if (proto.valueType) {
                        Object.setPrototypeOf(value, proto.valueType.prototype);
                        this.setPrototype(value, proto.valueType.prototype);
                    }
                    if (proto.keyType) {
                        Object.setPrototypeOf(key, proto.keyType.prototype);
                        this.setPrototype(key, proto.keyType.prototype);
                    }
                });
                // continue;
            }
        }
        return;
    }

    private reviver(key: string, value: any) {
        const type = Object.prototype.toString.call(value);
        if (type === "[object Object]" || type === "[object Array]") {
            if (value["@"] === 'Map') {
                return new Map(value.v);
            }
            if (value["@"] === 'Set') {
                return new Set(value.v);
            }
        }
        return value;
    }

    private replacer(key: string, value: any) {
        if (Reflect.getMetadata(transientSymbol, this, key)) {
            return;
        }
        if (value instanceof Map) {
            return {
                "@": "Map",
                v: Array.from(value.entries())
            };
        } else if (value instanceof Set) {
            return {
                "@": "Set",
                v: Array.from(value.values())
            }
        }
        return value;
    }
}

export default {
    JSONEx
}