import {assertSerializable, SerializableObject} from "../Serializable";
import "reflect-metadata"
import {Constructor} from "../Type";

export const setTypeSymbol = Symbol("SetType");

/**
 * Set类型
 *
 * @desc 对用引用类型的Set，需要使用该修饰器来指定类型
 * @param obj 类型对象
 * @constructor
 */
function SetType(obj: Constructor<SerializableObject>): PropertyDecorator {
    assertSerializable(obj);
    return Reflect.metadata(setTypeSymbol, obj);
}

export default SetType;