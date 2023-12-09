import Serializable from "../Serializable";
import {SuperClass} from "./SuperClass";

@Serializable()
export class SubClass1 extends SuperClass {
    message: string = "SubClass1";
}