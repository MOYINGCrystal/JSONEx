import {assertSerializable, SerializableObject} from "../Serializable";
import "reflect-metadata"
import {Constructor} from "../Type";

/**
 * 类型
 *
 * @desc 当自动类型出现问题时，可以手动注册类型
 * @constructor
 */
function Type(obj: Constructor<SerializableObject>): PropertyDecorator {
    assertSerializable(obj);
    return Reflect.metadata("design:type", obj);
}

export default Type;