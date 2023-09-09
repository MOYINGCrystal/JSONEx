import {getArrayType} from "./DecoratorData";
import Serializable from "../Serializable";

/**
 * 数组类型
 *
 * @desc 对用引用类型的数组，需要使用该修饰器来指定类型
 * @param obj 类型对象
 * @constructor
 */
const ArrayType: {
    (obj: Serializable): PropertyDecorator
} = (obj: Serializable) => (target, propertyKey) => {
    getArrayType(target).set(propertyKey, obj.getPrototype());
}

export default ArrayType;