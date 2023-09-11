# JSONEx-end

### 用前须知

请确保tsconfig.json中已开启以下项目：

```json5
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
    }
}
```

### 使用用例：

类A定义：
```ts
import B from "./B";
import Transient from "../decorator/Transient";
import ArrayType from "../decorator/ArrayType";
import Implements from "../decorator/Implements";
import AutoType from "../decorator/AutoType";
import SetType from "../decorator/SetType";
import Serializable from "../Serializable";
import MapType from "../decorator/MapType";

// 必须使用装饰器实现(Implements)序列化(Serializable)：
// 而SerializableObject接口实现与否都无所谓，毕竟在typescript中接口都是虚拟的，只有元数据才是真实的
@Implements(Serializable)
export default class A {
    num: number = 2;

    // 被@Transient修饰的属性，不会被序列化
    @Transient
    str: string = "临时变量";

    boolArr: boolean[] = [];

    // 引用类型需要使用@AutoType修饰来让JSONEx自动获取类型，此功能是ts提供的，所以使用时必须保证显式声明了变量类型
    @AutoType
    b: B = new B(2);

    // 没有使用@AutoType修饰的引用类型反序列化后类型会为Object
    obj = {t: 1, t2: ""};
    // 没有使用@AutoType修饰：反序列化后类型为Object
    bObj: B = new B(3);
    // 没有显式定义类型：反序列化后类型为Object
    @AutoType
    bObj2 = new B(4);

    // 使用@ArrayType([类型构造器])来设置引用变量数组的类型，不修饰的引用变量数组会被反序列化为Object[]
    @ArrayType(B)
    bArr: B[] = [];

    // 使用@SetType([类型构造器])来设置引用变量Set的类型，不修饰的引用变量Set会被反序列化为Set<Object>
    @SetType(B)
    set: Set<B> = new Set<B>();

    // 使用@MapType([键类型],[值类型])来设置引用变量Map的类型，不修饰的引用变量Map会被反序列化为Map<Object, Object>
    // 键类型为基本数据类型时可用：
    @MapType(B)
    map: Map<string, B> = new Map<string, B>();

    // 值类型为基本数据类型时：
    @MapType(null, B)
    map2: Map<B, number> = new Map();

    @MapType(B, B)
    map3: Map<B, B> = new Map();

    map4: Map<string, number> = new Map();

    getNum(): number {
        return this.num;
    }
}
```
类B定义:
```ts
import Transient from "../decorator/Transient";
import Implements from "../decorator/Implements";
import "reflect-metadata";
import Serializable from "../Serializable";

@Implements(Serializable)
export default class B {
    @Transient
    bool = true;

    constructor(public n: number) {
    }

    getN() {
        return this.n;
    }
}
```
序列化与反序列化：
```ts
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
```