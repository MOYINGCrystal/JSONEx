import type {SerializableObject} from "./Serializable";
import {getClassKey, getConstructor} from "./Serializable";
import "reflect-metadata";
import {transientSymbol} from "./decorator/Transient";
import StaticClass from "./decorator/StaticClass";
import {Constructor} from "./Type";
import {stringifyBeforeSymbol} from "./decorator/StringifyBefore";
import {parseAfterSymbol} from "./decorator/ParseAfter";

@StaticClass
export default class JSONExImpl {
    public static parse<T extends SerializableObject>(text: string, type: Constructor<T>): T {
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
                    const parseAfter: string | null = Reflect.getMetadata(parseAfterSymbol, value.constructor);
                    if (parseAfter) {
                        value[parseAfter]();
                    }
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
                const stringifyBefore: string | null = Reflect.getMetadata(stringifyBeforeSymbol, value.constructor);
                if (stringifyBefore) {
                    value[stringifyBefore]();
                }
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