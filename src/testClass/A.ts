import B from "./B";
import Serializable, {defaultImpl} from "../Serializable";
import {ReturnCacheStatic} from "../decorator/ReturnCache";
import PropertyType from "../decorator/PropertyType";
import Transient from "../decorator/Transient";
import ArrayType from "../decorator/ArrayType";

export default class A implements Serializable {
    num = 2;

    @Transient
    str = "临时变量";

    boolArr: boolean[] = [];

    @PropertyType(new B(0))
    b = new B(2);

    @ArrayType(new B(0))
    bArr: B[] = [];

    map = new Map<string, B>();

    set = new Set<B>();

    @ReturnCacheStatic
    getPrototype(): A {
        return defaultImpl(this);
    }

    getNum() {
        return this.num;
    }
}