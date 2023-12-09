import Serializable from "../Serializable";
import Transient from "../decorator/Transient";

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