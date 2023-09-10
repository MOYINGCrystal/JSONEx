import A from "./A";
import {JSONEx} from "../JSONEx";
import B from "./B";
import "reflect-metadata";

it('json', function () {
    let a = new A();
    a.num = 10;

    a.bArr.push(new B(1));
    a.bArr.push(new B(3));

    a.boolArr.push(true);
    a.boolArr.push(false);

    a.set.add(new B(11));
    a.set.add(new B(11));
    a.set.add(new B(12));

    a.map.set("21", new B(21));
    a.map.set("22", new B(22));

    a.map2.set(new B(23), 23);
    a.map2.set(new B(23), 24);

    a.map3.set(new B(25), new B(25));
    a.map3.set(new B(26), new B(27));

    a.map4.set("1", 1);
    a.map4.set("2", 3);

    let s = JSONEx.stringify(a);
    console.log(s);
    let a1 = JSONEx.parse(s, A);
    expect(a1 instanceof A).toBe(true);
    expect(a1.b instanceof B).toBe(true);
    expect(a1.bArr[0] instanceof B).toBe(true);
    expect(a1.bArr[1] instanceof B).toBe(true);
    debugger;
});