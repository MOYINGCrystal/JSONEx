import {serializable} from "../Serializable";
import Transient from "../decorator/Transient";
import Implements from "../decorator/Implements";
import "reflect-metadata";

@Implements(serializable)
export default class B {
    @Transient
    bool = true;

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }

    // @ReturnCacheStatic
    // getPrototype(): B {
    //     return defaultImpl(this);
    // }
}