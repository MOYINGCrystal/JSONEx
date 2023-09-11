import {assertSerializable, SerializableObject} from "../Serializable";
import "reflect-metadata"
import {Constructor} from "../Type";

export const arrayTypeSymbol = Symbol("ArrayType");

/**
 * 数组类型
 *
 * @desc 对用引用类型的数组，需要使用该修饰器来指定类型
 * @param obj 类型对象
 * @constructor
 */
function ArrayType(obj: Constructor<SerializableObject>): PropertyDecorator {
    assertSerializable(obj);
    return Reflect.metadata(arrayTypeSymbol, obj);
}

export default ArrayType;