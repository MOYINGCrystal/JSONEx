import Serializable, {isSerializable} from "../Serializable";
import {getPropertyType} from "./DecoratorData";
import SerializableNotSupportError from "../SerializableNotSupportError";

/**
 * 属性类型
 *
 * @desc 可以设置可序列化对象中某一属性的类型
 * @param obj 需要传入一个可序列化对象
 * @constructor
 */
const PropertyType: {
    (obj: Serializable): PropertyDecorator
} = (obj: Serializable) => (target, propertyKey) => {
    if(!isSerializable(obj)) throw new SerializableNotSupportError();
    getPropertyType(target).set(propertyKey, obj.getPrototype());
}

export default PropertyType;