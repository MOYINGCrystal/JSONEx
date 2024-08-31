import {SuperClass} from "./SuperClass";
import {Serializable, Transient} from "../../lib";
import {SubClass1} from "./SubClass1";
import {SubClass2} from "./SubClass2";
import {TypeClass} from "./TypeClass";

// 必须使用序列化装饰器标记类，否则类将被反序列化为Object：
// 修饰器的参数没有任何作用，也可以不提供，参数只是为了提醒不要使用类型导入子类型
// 例如没有提供SubClass2
@Serializable(() => SuperClass, () => SubClass1, () => TypeClass)
export class RootClass {
    num: number = 2;

    // 被@Transient修饰的属性，不会被序列化
    @Transient
    str: string = "临时变量";

    boolArr: boolean[] = [];

    b: SuperClass = new SuperClass(2);

    obj = {t: 1, t2: ""};

    bObj: SuperClass = new SuperClass(3);

    // 此时可能会使用类型导入导入TypeClass，这样的话会导致反序列化失败，可以使用@Serializable可选的参数提醒
    typeClass: TypeClass | null = null;

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