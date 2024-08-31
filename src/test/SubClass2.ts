import Serializable from "../../lib/Serializable";
import {SuperClass} from "./SuperClass";

@Serializable()
export class SubClass2 extends SuperClass {
    message: string = "SubClass2";
}