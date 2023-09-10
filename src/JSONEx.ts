import type Serializable from "./Serializable";
import "reflect-metadata";
import {Constructor} from "./UtilType";
import {arrayTypeSymbol} from "./decorator/ArrayType";
import {assertSerializable} from "./Serializable";

export class JSONEx<T extends Serializable> {// TODO 支持Map Set
    constructor(public type: Constructor<T>) {
        assertSerializable(this.type);
    }

    public parse(text: string, reviver?: (this: any, key: string, value: any) => any): T {
        let parse = JSON.parse(text);
        Object.setPrototypeOf(parse, this.type.prototype);
        this.setPrototype(parse, this.type.prototype);
        return parse;
    }

    public stringify(value: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;

    public stringify(value: T, replacer?: (number | string)[] | null, space?: string | number): string;

    public stringify(value: T, replacer?: ((this: any, key: string, value: any) => any) | (number | string)[] | null, space?: string | number): string {
        // TODO 删除临时变量
        // getTransient(this.type.constructor.prototype)
        return JSON.stringify(value, this.replacer);
    }

    private setPrototype(obj: any, type: Object) {
        let constructor = type.constructor;
        if (constructor == Map) {
            // TODO
        }
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
        }
        return;
    }

    private reviver(key: string, value: any) {
        const type = Object.prototype.toString.call(value);
        if (type === "[object Object]" || type === "[object Array]") {
            if (value["@"] === 'Map') {
                return new Map(value.value);
            }
            if (value["@"] === 'Set') {
                return new Set(value.value);
            }
        }
        return value;
    }

    private replacer(key: string, value: any) {
        if (value instanceof Map) {
            return Array.from(value.entries());
        } else if (value instanceof Set) {
            return Array.from(value.values());
        }
        return value;
    }
}

export default {
    JSONEx
}