import {Constructor} from "./Type";
import SerializableNotSupportError from "./error/SerializableNotSupportError";

const serializableSymbol = Symbol("Serializable");
export const serializableSubClassSymbol = Symbol("SerializableSubClass");

/**
 * 可序列化
 *
 * @desc
 * 用该装饰器修饰类即可使用本包中的JSONEx类来进行序列化和反序列化。
 * <hr/>
 * 属性类型必须都为基本类型或可序列化的引用类型。
 * <hr/>
 * 对于数组对象：
 * 数组元素类型无法为联合类型。
 * <hr/>
 * 修饰器只对类自身有效，有子类需要序列化的话也需要子类被装饰器装饰。
 */
const Serializable: ClassDecorator = (target) => {
    let superClass = Object.getPrototypeOf(target);
    while (Reflect.getMetadata(serializableSymbol, superClass) == superClass) {
        const subClassData: (typeof target)[] = Reflect.getMetadata(serializableSubClassSymbol, superClass) ?? [];
        subClassData.push(target);
        Reflect.metadata(serializableSubClassSymbol, subClassData)(superClass);
        superClass = Object.getPrototypeOf(superClass);
    }
    Reflect.metadata(serializableSymbol, target)(target);
}

export default Serializable;

/**
 * 可序列化
 *
 * @desc 标记接口
 *       要想真正实现可序列化
 *       需要对类添加修饰器：<code>@Serializable()</code>
 * @see Serializable
 * @see Implements
 */
export interface SerializableObject {
}

/**
 * 是否是可序列化对象
 * @param obj 对象
 */
export function isSerializable(obj: Constructor<any>) {
    return Reflect.getMetadata(serializableSymbol, obj) == obj;
}

/**
 * 断言可序列化
 *
 * @desc 如果对象没实现可序列化接口则会报错
 * @param obj 断言对象
 * @throws SerializableNotSupportError
 */
export function assertSerializable(obj: Constructor<any>) {
    if (isSerializable(obj)) return;
    throw new SerializableNotSupportError(obj);
}