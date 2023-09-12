import {RootClass, SuperClass, SubClass1, SubClass2} from "./TestClass";
import {JSONEx} from "../JSONEx";
import "reflect-metadata";

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