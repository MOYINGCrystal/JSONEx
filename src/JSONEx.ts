import type {SerializableObject} from "./Serializable";
import {getClassKey, getConstructor} from "./Serializable";
import "reflect-metadata";
import {transientSymbol} from "./decorator/Transient";
import StaticClass from "./decorator/StaticClass";

@StaticClass
export class JSONEx {
    public static parse<T extends SerializableObject>(text: string): T {
        return JSON.parse(text, this.reviver);
    }

    public static stringify<T extends SerializableObject>(value: T): string {
        return JSON.stringify(value, this.replacer);
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
            if (value["@"]) {
                const constructor = getConstructor(value["@"]);
                if (constructor) {
                    Object.setPrototypeOf(value, constructor.prototype);
                }
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
            if (value.constructor.name !== "Object") {
                value["@"] = getClassKey(value.constructor);
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