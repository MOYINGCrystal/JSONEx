import A from "./A";
import {JSONEx} from "../JSONEx";
import B from "./B";

it('test', function () {
    let prototype = new A().getPrototype();
    debugger;
});

it('json', function () {
    let jsonEx = new JSONEx(new A());
    let a = new A();
    a.num = 10;
    a.bArr.push(new B(1));
    a.bArr.push(new B(3));
    let s = jsonEx.stringify(a);
    console.log(s);
    let a1 = jsonEx.parse(s);
    debugger;
});