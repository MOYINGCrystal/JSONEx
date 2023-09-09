import {ReturnCacheStatic} from "../decorator/ReturnCache";

class A {
    constructor(public n: number) {
    }

    @ReturnCacheStatic
    fun() {
        return this.n++;
    }
}

it('test', function () {
    let a = new A(1);
    expect(a.fun()).toBe(1);
    expect(a.fun()).toBe(1);
    let b = new A(3);
    expect(b.fun()).toBe(1);
    expect(b.fun()).toBe(1);
});