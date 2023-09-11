import {Constructor} from "../Type";

export default class SerializableNotSupportError extends Error {
    constructor(obj: Constructor<any>) {
        super(`${obj}不是可序列化对象！`);
        this.name = "SerializableNotSupportError";
    }
}