import B from "./B";
import Transient from "../decorator/Transient";
import ArrayType from "../decorator/ArrayType";
import Implements from "../decorator/Implements";
import AutoType from "../decorator/AutoType";
import SetType from "../decorator/SetType";
import Serializable from "../Serializable";
import MapType from "../decorator/MapType";

// SerializableObject接口实现与否都无所谓，毕竟在typescript中接口都是虚拟的，只有元数据才是真实的
@Implements(Serializable)
export default class A {
    num: number = 2;

    // 被@Transient修饰的属性，不会被序列化
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

    // 使用@ArrayType([类型构造器])来设置引用变量数组的类型，不修饰的引用变量数组会被反序列化为Object[]
    @ArrayType(B)
    bArr: B[] = [];

    // 使用@SetType([类型构造器])来设置引用变量Set的类型，不修饰的引用变量Set会被反序列化为Set<Object>
    @SetType(B)
    set: Set<B> = new Set<B>();

    // 使用@MapType([键类型],[值类型])来设置引用变量Map的类型，不修饰的引用变量Map会被反序列化为Map<Object, Object>
    // 键类型为基本数据类型时可用：
    @MapType(B)
    map: Map<string, B> = new Map<string, B>();

    // 值类型为基本数据类型时：
    @MapType(null, B)
    map2: Map<B, number> = new Map();

    @MapType(B, B)
    map3: Map<B, B> = new Map();

    map4: Map<string, number> = new Map();

    getNum(): number {
        return this.num;
    }
}