import Transient from "../decorator/Transient";
import ArrayType from "../decorator/ArrayType";
import AutoType from "../decorator/AutoType";
import SetType from "../decorator/SetType";
import Serializable from "../Serializable";
import MapType from "../decorator/MapType";

@Serializable
export class SuperClass {
    @Transient
    bool = true;

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }
}

@Serializable
export class SubClass1 extends SuperClass {
    @AutoType
    message: string = "SubClass1";
}

@Serializable
export class SubClass2 extends SuperClass {
    message: string = "SubClass2";
}

// 必须使用序列化装饰器标记类，来表明类已实现可序列化：
// 可序列化的所有非临时属性类型必须也为可序列化类：
// 而SerializableObject接口实现与否都无所谓，毕竟在typescript中接口都是虚拟的，只有元数据才是真实的
@Serializable
export class RootClass {
    num: number = 2;

    // 被@Transient修饰的属性，不会被序列化
    @Transient
    str: string = "临时变量";

    boolArr: boolean[] = [];

    // 引用类型需要使用@AutoType修饰来让JSONEx自动获取类型，此功能是ts提供的，所以使用时必须保证显式声明了变量类型
    @AutoType
    b: SuperClass = new SuperClass(2);

    // 没有使用@AutoType修饰的引用类型反序列化后类型会为Object
    obj = {t: 1, t2: ""};
    // 没有使用@AutoType修饰：反序列化后类型为Object
    bObj: SuperClass = new SuperClass(3);
    // 没有显式定义类型：反序列化后类型为Object
    @AutoType
    bObj2 = new SuperClass(4);

    // 即使是子类也可以被正常反序列化，请确保子类也被@Serializable修饰
    @AutoType
    c: SuperClass = new SubClass1(3);

    @AutoType
    d: SuperClass = new SubClass2(4);

    // 使用@ArrayType([类型构造器])来设置引用变量数组的类型，不修饰的引用变量数组会被反序列化为Object[]
    @ArrayType(SuperClass)
    bArr: SuperClass[] = [];

    // 使用@SetType([类型构造器])来设置引用变量Set的类型，不修饰的引用变量Set会被反序列化为Set<Object>
    @SetType(SuperClass)
    set: Set<SuperClass> = new Set<SuperClass>();

    // 使用@MapType([键类型],[值类型])来设置引用变量Map的类型，不修饰的引用变量Map会被反序列化为Map<Object, Object>
    // 键类型为基本数据类型时可用：
    @MapType(SuperClass)
    map: Map<string, SuperClass> = new Map<string, SuperClass>();

    // 值类型为基本数据类型时：
    @MapType(null, SuperClass)
    map2: Map<SuperClass, number> = new Map();

    @MapType(SuperClass, SuperClass)
    map3: Map<SuperClass, SuperClass> = new Map();

    map4: Map<string, number> = new Map();

    getNum(): number {
        return this.num;
    }
}

@Serializable
export class NumClass {
    constructor(public n: number) {
    }
}