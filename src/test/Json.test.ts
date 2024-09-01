import {JSONEx} from "@/JSONEx";
import {RootClass} from "./RootClass";
import {SuperClass} from "./SuperClass";
import {SubClass1} from "./SubClass1";
import {SubClass2} from "./SubClass2";
import {TypeClass} from "./TypeClass";
import { it, expect } from 'vitest';

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

    a.typeClass = new TypeClass(6)

    let s = JSONEx.stringify(a);
    console.log(s);

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
    expect(a1.typeClass instanceof TypeClass).toBeTruthy();
    debugger;
});