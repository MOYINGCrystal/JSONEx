import Transient from "../decorator/Transient";
import "reflect-metadata";
import Serializable from "../Serializable";

@Serializable()
export default class B {
    @Transient
    bool = true;

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }
}