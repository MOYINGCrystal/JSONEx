import Serializable from "../Serializable";
import {SuperClass} from "./SuperClass";

@Serializable()
export class SubClass1 extends SuperClass {
    message: string = "SubClass1";

    // 可选的stringifyBefore()方法会在序列化之前运行
    stringifyBefore() {
        this.message += "/stringifyBefore";
        console.log("stringifyBefore");
    }

    // 可选的parseAfter()方法会在反序列化之后运行
    parseAfter() {
        this.message += "/parseAfter";
        console.log("parseAfter");
    }
}