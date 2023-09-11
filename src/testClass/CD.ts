import B from "./B";
import Implements from "../interface/Implements";
import Serializable from "../Serializable";

@Implements(Serializable)
export class C extends B {
    message: string = "C";
}

@Implements(Serializable)
export class D extends B {
    message: string = "D";
}