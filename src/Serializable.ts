import {getArrayType, getPropertyType, getTransient} from "./decorator/DecoratorData";

/**
 * 可序列化
 *
 * @desc
 * 实现该接口即可使用本包中的JSONEx类来进行序列化和反序列化。
 * <code>getPrototype()</code>方法，应该返回一个各属性都有值的原型。
 * 值的具体数值不重要，JSONEx会通过值的类型来进行反序列化
 * <hr/>
 * 同时对于不需要序列化的属性可以置空来实现。
 * <hr/>
 * 属性类型必须都为基本类型或可序列化的引用类型。
 * <hr/>
 * 对于数组对象：
 * 若元素类型为引用类型，则应设置唯一一个为元素类型的元素位于数组头部
 * 数组元素类型无法为联合类型。
 */
export default interface Serializable {
    /**
     * 获得原型
     *
     * @desc 返回类型应为自身
     *       如果可能我们希望实现类中该方法用@ReturnCacheStatic修饰
     */
    getPrototype(): Serializable;
}

/**
 * 是否是可序列化对象
 * @param obj 对象
 */
export function isSerializable(obj: any) {
    return "getPrototype" in obj;
}

/**
 * getPrototype方法的默认实现
 *
 * @desc 会利用AOP初步生成一个原型
 * @param obj 对象初始值
 */
export function defaultImpl<T extends Serializable>(obj: T): T {
    let proto = obj.constructor.prototype;
    getPropertyType(proto).forEach((value, key) => obj[key] = value);
    getTransient(proto).forEach(value => delete obj[value]);
    getArrayType(proto).forEach((value, key) => obj[key] = [value]);
    return obj;
}