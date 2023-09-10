import A from "./A";
import {JSONEx} from "../JSONEx";
import B from "./B";
import "reflect-metadata";

it('json', function () {
    let jsonEx = new JSONEx(A);
    let a = new A();
    a.num = 10;
    a.bArr.push(new B(1));
    a.bArr.push(new B(3));
    a.boolArr.push(true);
    a.boolArr.push(false);
    let s = jsonEx.stringify(a);
    console.log(s);
    let a1 = jsonEx.parse(s);
    expect(a1 instanceof A).toBe(true);
    expect(a1.b instanceof B).toBe(true);
    expect(a1.bArr[0] instanceof B).toBe(true);
    expect(a1.bArr[1] instanceof B).toBe(true);
    debugger;
});

it('metadata', function () {
    let a = new A();
    let type = Reflect.getMetadata("design:type", a, "b");
    let keys = Reflect.getMetadataKeys(a, "getPrototype");
    debugger;
    console.log(B == type);
    console.log(type);
});