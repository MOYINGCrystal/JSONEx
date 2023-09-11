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
    // {"num":10,"boolArr":[true,false],"b":{"n":2},
    // "obj":{"t":1,"t2":""},"bObj":{"n":3},"bObj2":{"n":4},
    // "bArr":[{"n":1},{"n":3}],
    // "set":{"@":"Set","v":[{"n":11},{"n":11},{"n":12}]},
    // "map":{"@":"Map","v":[["21",{"n":21}],["22",{"n":22}]]},
    // "map2":{"@":"Map","v":[[{"n":23},23],[{"n":23},24]]},
    // "map3":{"@":"Map","v":[[{"n":25},{"n":25}],[{"n":26},{"n":27}]]},
    // "map4":{"@":"Map","v":[["1",1],["2",3]]}}
    let a1 = JSONEx.parse(s, A);
    expect(a1 instanceof A).toBeTruthy();
    expect(a1.b instanceof B).toBeTruthy();
    expect(a1.bArr[0] instanceof B).toBeTruthy();
    expect(a1.bArr[1] instanceof B).toBeTruthy();
    expect(a1.map.get("21") instanceof B).toBeTruthy();
    expect(a1.map.get("22") instanceof B).toBeTruthy();
    debugger;
});