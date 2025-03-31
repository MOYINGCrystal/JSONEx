import {getCustomSerializerByConstructor, getCustomSerializerByKey} from "@/Custom";
import type {SerializableObject} from "./Serializable";
import {getClassKey, getConstructor} from "./Serializable";
import "reflect-metadata";
import {transientSymbol} from "./decorator/Transient";
import {Constructor} from "./Type";
import {stringifyBeforeSymbol} from "./decorator/StringifyBefore";
import {parseAfterSymbol} from "./decorator/ParseAfter";

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
            const customSerializer = getCustomSerializerByKey(value["@"]);
            if (customSerializer) {
                return customSerializer.reviver(value.value);
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
        const customSerializer = getCustomSerializerByConstructor(value.constructor);
        if (customSerializer) {
            return {
                "@": getClassKey(value.constructor),
                value: customSerializer.replacer(value)
            };
        }
        if (type === "[object Object]") {
            if (value.constructor.name !== "Object") {
                const stringifyBefore: string | null = Reflect.getMetadata(stringifyBeforeSymbol, value.constructor);
                if (stringifyBefore) {
                    value[stringifyBefore]();
                }
                value["@"] = getClassKey(value.constructor);
            }
            return value;
        }
        return value;
    }
}