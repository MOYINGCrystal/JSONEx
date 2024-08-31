import Serializable from "../../lib/Serializable";

@Serializable()
export class TypeClass {
    str = "TypeClass";

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }
}