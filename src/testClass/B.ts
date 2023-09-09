import Serializable, {defaultImpl} from "../Serializable";
import {ReturnCacheStatic} from "../decorator/ReturnCache";
import Transient from "../decorator/Transient";

export default class B implements Serializable {
    @Transient
    bool = true;

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }

    @ReturnCacheStatic
    getPrototype(): B {
        return defaultImpl(this);
    }
}