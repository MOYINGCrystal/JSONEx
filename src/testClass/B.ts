import Transient from "../decorator/Transient";
import Implements from "../interface/Implements";
import "reflect-metadata";
import Serializable from "../Serializable";

@Implements(Serializable)
export default class B {
    @Transient
    bool = true;

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }
}