import {JSONEx, Serializable} from "../JSONEx";
import "reflect-metadata";
import {RootClass} from "./RootClass";
import {expect, it} from 'vitest';

it('restartJson', function () {
    const s: string = "{\"num\":10,\"boolArr\":[true,false],\"b\":{\"n\":2,\"@\":\"SuperClass\"},\"obj\":{\"t\":1,\"t2\":\"\"},\"bObj\":{\"n\":3,\"@\":\"SuperClass\"},\"typeClass\":{\"n\":6,\"str\":\"TypeClass\",\"@\":\"TypeClass\"},\"c\":{\"n\":3,\"message\":\"SubClass1\",\"@\":\"SubClass1\"},\"d\":{\"n\":4,\"message\":\"SubClass2\",\"@\":\"SubClass2\"},\"bArr\":[{\"n\":1,\"@\":\"SuperClass\"},{\"n\":3,\"@\":\"SuperClass\"},{\"n\":3,\"message\":\"SubClass1\",\"@\":\"SubClass1\"},{\"n\":4,\"message\":\"SubClass2\",\"@\":\"SubClass2\"}],\"set\":{\"@\":\"Set\",\"v\":[{\"n\":11,\"@\":\"SuperClass\"},{\"n\":11,\"@\":\"SuperClass\"},{\"n\":12,\"@\":\"SuperClass\"},{\"n\":13,\"message\":\"SubClass1\",\"@\":\"SubClass1\"}]},\"map\":{\"@\":\"Map\",\"v\":[[\"21\",{\"n\":21,\"@\":\"SuperClass\"}],[\"22\",{\"n\":22,\"@\":\"SuperClass\"}],[\"sub1\",{\"n\":23,\"message\":\"SubClass1\",\"@\":\"SubClass1\"}],[\"sub2\",{\"n\":24,\"message\":\"SubClass2\",\"@\":\"SubClass2\"}]]},\"map2\":{\"@\":\"Map\",\"v\":[[{\"n\":23,\"@\":\"SuperClass\"},23],[{\"n\":23,\"@\":\"SuperClass\"},24]]},\"map3\":{\"@\":\"Map\",\"v\":[[{\"n\":25,\"@\":\"SuperClass\"},{\"n\":25,\"@\":\"SuperClass\"}],[{\"n\":26,\"@\":\"SuperClass\"},{\"n\":27,\"@\":\"SuperClass\"}]]},\"map4\":{\"@\":\"Map\",\"v\":[[\"1\",1],[\"2\",3]]},\"@\":\"RootClass\"}";
    let a1 = JSONEx.parse(s, RootClass);
    debugger;
});

namespace A {
    @Serializable()
    export class clazz {
        a() {
            return "A";
        }
    }
}

namespace B {
    @Serializable()
    export class clazz {
        b() {
            return "B";
        }
    }
}

@Serializable()
class O {
    a = new A.clazz();
    b = new B.clazz();
}

// 重名测试
it('name', () => {
    const o = new O();
    const n = JSONEx.parse(JSONEx.stringify(o), O);
    expect(n.a instanceof A.clazz).toBeTruthy();
    expect(n.b instanceof B.clazz).toBeTruthy();
    expect(n.a.a()).toBe("A");
    expect(n.b.b()).toBe("B");
    debugger;
});