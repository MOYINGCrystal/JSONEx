import Serializable from "../Serializable";

@Serializable()
export class TypeClass {
    str = "TypeClass";

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }
}