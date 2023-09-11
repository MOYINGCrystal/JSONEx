import {assertSerializable, SerializableObject} from "../Serializable";
import "reflect-metadata"
import {Constructor} from "../Type";

export const mapTypeSymbol = Symbol("MapType");

/**
 * Map类型
 *
 * @desc 对用引用类型的Map，需要使用该修饰器来指定类型
 * @param keyType 键类型
 * @param valueType 值类型
 * @constructor
 */
function MapType(valueType: Constructor<SerializableObject> | null, keyType?: Constructor<SerializableObject>): PropertyDecorator {
    if (keyType)
        assertSerializable(keyType);
    if (valueType)
        assertSerializable(valueType);
    return Reflect.metadata(mapTypeSymbol, {keyType, valueType});
}

export default MapType;