import {Constructor} from "./UtilType";
import SerializableNotSupportError from "./SerializableNotSupportError";
import {ImplSymbol} from "./decorator/Implements";

/**
 * 可序列化
 *
 * @desc
 * 实现该接口即可使用本包中的JSONEx类来进行序列化和反序列化。
 * <hr/>
 * 属性类型必须都为基本类型或可序列化的引用类型。
 * <hr/>
 * 对于数组对象：
 * 数组元素类型无法为联合类型。
 */
export const serializable = Symbol("Serializable");

/**
 * 可序列化
 *
 * @desc 标记接口
 *       要想真正实现可序列化
 *       需要对类添加修饰器：<code>@Implements(serializable)</code>
 * @see serializable
 * @see Implements
 */
export default interface Serializable {
}

/**
 * 是否是可序列化对象
 * @param obj 对象
 */
export function isSerializable(obj: Constructor<any>) {
    return (<Array<symbol>>Reflect.getMetadata(ImplSymbol, obj)).includes(serializable);
}

/**
 * 断言可序列化
 *
 * @desc 如果对象没实现可序列化接口则会报错
 * @param obj 断言对象
 * @throws SerializableNotSupportError
 */
export function assertSerializable(obj: Constructor<any>) {
    if ((<Array<symbol>>Reflect.getMetadata(ImplSymbol, obj)).includes(serializable)) return;
    throw new SerializableNotSupportError(obj);
}