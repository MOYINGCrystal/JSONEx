import B from "./B";
import Serializable from "../Serializable";

@Serializable()
export class C extends B {
    message: string = "C";
}

@Serializable()
export class D extends B {
    message: string = "D";
}