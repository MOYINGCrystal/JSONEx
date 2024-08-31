import Serializable from "../../lib/Serializable";
import Transient from "../../lib/decorator/Transient";

@Serializable()
export class SuperClass {
    @Transient
    bool = true;

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }
}