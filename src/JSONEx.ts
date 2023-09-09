import type Serializable from "./Serializable";

export class JSONEx<T extends Serializable> {// TODO 支持Map Set
    type: T;

    constructor(type: T) {
        this.type = <T>type.getPrototype();
    }

    public parse(text: string, reviver?: (this: any, key: string, value: any) => any): T {
        let parse = JSON.parse(text);
        this.setPrototype(parse, this.type);
        return parse;
    }

    public stringify(value: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;

    public stringify(value: T, replacer?: (number | string)[] | null, space?: string | number): string;

    public stringify(value: T, replacer?: ((this: any, key: string, value: any) => any) | (number | string)[] | null, space?: string | number): string {
        // TODO 删除临时变量
        // getTransient(this.type.constructor.prototype)
        return JSON.stringify(value, this.replacer);
    }

    private setPrototype(obj: any, type: any) {
        let typeStr = Object.prototype.toString.call(type);
        if (typeStr === "[object Object]") {
            let constructor = type.constructor;
            if(constructor == Map){
                // TODO
            }
            Object.setPrototypeOf(obj, constructor.prototype);
            for (const key of Reflect.ownKeys(obj)) {
                this.setPrototype(obj[key], type[key]);
            }
            return;
        }
        if (typeStr === "[object Array]") {
            if (!type[0]) return;
            let constructor = type[0].constructor;
            (<Array<any>>obj).forEach(value => {
                Object.setPrototypeOf(value, constructor.prototype);
                for (const key of Reflect.ownKeys(value)) {
                    this.setPrototype(value[key], type[0][key]);
                }
            });
            return;
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