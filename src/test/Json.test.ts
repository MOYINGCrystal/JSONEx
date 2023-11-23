import {JSONEx} from "../JSONEx";
import "reflect-metadata";
import Serializable from "../Serializable";
import Transient from "../decorator/Transient";
import AutoType from "../decorator/AutoType";
import ArrayType from "../decorator/ArrayType";
import SetType from "../decorator/SetType";
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
    // 当自动推断有问题时，可以使用@Type来手动指定类型, (如类型是: SuperClass | null 时，@AutoType不能正常工作)
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

    // 使用@MapType([值类型], ?[键类型])来设置引用变量Map的类型，不修饰的引用变量Map会被反序列化为Map<Object, Object>
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

it('json', function () {
    let a = new RootClass();
    a.num = 10;

    a.bArr.push(new SuperClass(1));
    a.bArr.push(new SuperClass(3));
    a.bArr.push(new SubClass1(3));
    a.bArr.push(new SubClass2(4));

    a.boolArr.push(true);
    a.boolArr.push(false);

    a.set.add(new SuperClass(11));
    a.set.add(new SuperClass(11));
    a.set.add(new SuperClass(12));
    a.set.add(new SubClass1(13));

    a.map.set("21", new SuperClass(21));
    a.map.set("22", new SuperClass(22));
    a.map.set("sub1", new SubClass1(23));
    a.map.set("sub2", new SubClass2(24));

    a.map2.set(new SuperClass(23), 23);
    a.map2.set(new SuperClass(23), 24);

    a.map3.set(new SuperClass(25), new SuperClass(25));
    a.map3.set(new SuperClass(26), new SuperClass(27));

    a.map4.set("1", 1);
    a.map4.set("2", 3);

    let s = JSONEx.stringify(a);
    console.log(s);
    // {"num":10,"boolArr":[true,false],"b":{"n":2,"@":"SuperClass"},
    // "obj":{"t":1,"t2":""},"bObj":{"n":3,"@":"SuperClass"},
    // "bObj2":{"n":4,"@":"SuperClass"},
    // "c":{"n":3,"message":"SubClass1","@":"SubClass1"},
    // "d":{"n":4,"message":"SubClass2","@":"SubClass2"},
    // "bArr":[{"n":1,"@":"SuperClass"},{"n":3,"@":"SuperClass"},{"n":3,"message":"SubClass1","@":"SubClass1"},{"n":4,"message":"SubClass2","@":"SubClass2"}],
    // "set":{"@":"Set","v":[{"n":11,"@":"SuperClass"},{"n":11,"@":"SuperClass"},{"n":12,"@":"SuperClass"},{"n":13,"message":"SubClass1","@":"SubClass1"}]},
    // "map":{"@":"Map","v":[["21",{"n":21,"@":"SuperClass"}],["22",{"n":22,"@":"SuperClass"}],["sub1",{"n":23,"message":"SubClass1","@":"SubClass1"}],["sub2",{"n":24,"message":"SubClass2","@":"SubClass2"}]]},
    // "map2":{"@":"Map","v":[[{"n":23,"@":"SuperClass"},23],[{"n":23,"@":"SuperClass"},24]]},
    // "map3":{"@":"Map","v":[[{"n":25,"@":"SuperClass"},{"n":25,"@":"SuperClass"}],[{"n":26,"@":"SuperClass"},{"n":27,"@":"SuperClass"}]]},
    // "map4":{"@":"Map","v":[["1",1],["2",3]]},"@":"RootClass"}
    let a1 = JSONEx.parse(s, RootClass);
    expect(a1 instanceof RootClass).toBeTruthy();
    expect(a1.b instanceof SuperClass).toBeTruthy();
    expect(a1.c instanceof SubClass1).toBeTruthy();
    expect(a1.d instanceof SubClass2).toBeTruthy();
    expect(a1.bArr[0] instanceof SuperClass).toBeTruthy();
    expect(a1.bArr[1] instanceof SuperClass).toBeTruthy();
    expect(a1.bArr[2] instanceof SubClass1).toBeTruthy();
    expect(a1.bArr[3] instanceof SubClass2).toBeTruthy();
    expect(a1.map.get("21") instanceof SuperClass).toBeTruthy();
    expect(a1.map.get("22") instanceof SuperClass).toBeTruthy();
    expect(a1.map.get("sub1") instanceof SubClass1).toBeTruthy();
    expect(a1.map.get("sub2") instanceof SubClass2).toBeTruthy();
    debugger;
});