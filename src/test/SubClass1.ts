import Serializable from "../Serializable";
import {SuperClass} from "./SuperClass";
import StringifyBefore from "../decorator/StringifyBefore";
import ParseAfter from "../decorator/ParseAfter";

@Serializable()
export class SubClass1 extends SuperClass {
    message: string = "SubClass1";

    // 被@StringifyBefore装饰的方法会在序列化之前运行
    @StringifyBefore
    stringifyBefore() {
        this.message += "/stringifyBefore";
        console.log("stringifyBefore");
    }

    // 被@ParseAfter装饰的方法会在反序列化之后运行
    @ParseAfter
    parseAfter() {
        this.message += "/parseAfter";
        console.log("parseAfter");
    }
}