import type {SerializableObject} from "./Serializable";
import "reflect-metadata";
import {Constructor} from "./UtilType";
import {arrayTypeSymbol} from "./decorator/ArrayType";
import {assertSerializable} from "./Serializable";
import {transientSymbol} from "./decorator/Transient";
import {setTypeSymbol} from "./decorator/SetType";
import {mapTypeSymbol} from "./decorator/MapType";
import StaticClass from "./decorator/StaticClass";

// TODO 联合类型数组

@StaticClass
export class JSONEx {
    public static parse<T extends SerializableObject>(text: string, type: Constructor<T>): T {
        assertSerializable(type);
        let parse = JSON.parse(text, this.reviver);
        Object.setPrototypeOf(parse, type.prototype);
        this.setPrototype(parse, type.prototype);
        return parse;
    }

    public static stringify<T extends SerializableObject>(value: T): string {
        return JSON.stringify(value, this.replacer);
    }

    private static setPrototype(obj: any, type: Object) {
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

    private static reviver(key: string, value: any) {
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

    private static replacer(key: string, value: any) {
        if (Reflect.getMetadata(transientSymbol, this, key)) {
            return;
        }
        const type = Object.prototype.toString.call(value);
        if (type === "[object Object]") {
            const constructorName = value.constructor.name;
            if (constructorName !== "Object") {
                value["@"] = constructorName;
            }
        } else if (value instanceof Map) {
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