import {JSONEx} from "../JSONEx";
import "reflect-metadata";
import Serializable from "../Serializable";
import Transient from "../decorator/Transient";

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
    message: string = "SubClass1";
}

@Serializable
export class SubClass2 extends SuperClass {
    message: string = "SubClass2";
}

// 必须使用序列化装饰器标记类，否则类将被反序列化为Object：
@Serializable
export class RootClass {
    num: number = 2;

    // 被@Transient修饰的属性，不会被序列化
    @Transient
    str: string = "临时变量";

    boolArr: boolean[] = [];

    b: SuperClass = new SuperClass(2);

    obj = {t: 1, t2: ""};

    bObj: SuperClass = new SuperClass(3);

    bObj2 = new SuperClass(4);

    // 即使是子类也可以被正常反序列化，请确保子类也被@Serializable修饰
    c: SuperClass = new SubClass1(3);

    d: SuperClass = new SubClass2(4);

    bArr: SuperClass[] = [];

    set: Set<SuperClass> = new Set<SuperClass>();

    map: Map<string, SuperClass> = new Map<string, SuperClass>();

    map2: Map<SuperClass, number> = new Map();

    map3: Map<SuperClass, SuperClass> = new Map();

    map4: Map<string, number> = new Map();

    getNum(): number {
        return this.num;
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

    let a1 = <RootClass>JSONEx.parse(s);
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