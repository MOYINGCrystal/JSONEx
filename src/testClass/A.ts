import B from "./B";
import {serializable} from "../Serializable";
import Transient from "../decorator/Transient";
import ArrayType from "../decorator/ArrayType";
import Implements from "../decorator/Implements";
import AutoType from "../decorator/AutoType";

@Implements(serializable)
export default class A {
    num: number = 2;

    @Transient
    str: string = "临时变量";

    boolArr: boolean[] = [];

    // 引用类型需要使用@AutoType修饰来让JSONEx自动获取类型，此功能是ts提供的，所以使用时必须保证显式声明了变量类型
    @AutoType
    b: B = new B(2);

    // 没有使用@AutoType修饰的引用类型反序列化后类型会为Object
    obj = {t: 1, t2: ""};
    // 没有使用@AutoType修饰：反序列化后类型为Object
    bObj: B = new B(3);
    // 没有显式定义类型：反序列化后类型为Object
    @AutoType
    bObj2 = new B(4);

    @ArrayType(B)
    bArr: B[] = [];

    @AutoType
    map: Map<string, B> = new Map<string, B>();

    @AutoType
    set: Set<B> = new Set<B>();

    getNum(): number {
        return this.num;
    }
}