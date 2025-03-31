import Serializable, {getClassKey, type SerializableObject} from "@/Serializable";
import type {Constructor} from "@/Type";

const mapByKey = new Map<string, CustomSerializer<SerializableObject, unknown>>();
const mapByConstructor = new Map<Constructor<SerializableObject>, CustomSerializer<SerializableObject, unknown>>();

/**
 * 注册自定义序列化器
 *
 * @typeParam B before 序列化之前
 * @typeParam L later 序列化之后
 */
export default function registerCustomSerializer<B extends SerializableObject, L>(customSerializer: CustomSerializer<B, L>) {
    Serializable()(customSerializer.constructor);
    const classKey = getClassKey(customSerializer.constructor)!;
    mapByKey.set(classKey, customSerializer);
    mapByConstructor.set(customSerializer.constructor, customSerializer);
}

export interface CustomSerializer<B extends SerializableObject, L> {
    /**
     * 构造器
     */
    constructor: Constructor<B>;

    /**
     * 替换器
     *
     * @param before 序列化之前
     * @return 序列化之后
     */
    replacer(before: B): L;

    /**
     * 恢复器
     *
     * @param later 序列化之后
     * @return 序列化之前
     */
    reviver(later: L): B;
}

export function getCustomSerializerByKey(key: string) {
    return mapByKey.get(key);
}

export function getCustomSerializerByConstructor(key: Constructor<SerializableObject>) {
    return mapByConstructor.get(key);
}

registerCustomSerializer({
        constructor: Map,
        replacer: map => Array.from(map.entries()),
        reviver: json => new Map(json)
    }
);

registerCustomSerializer({
    constructor: Set,
    replacer: before => Array.from(before.values()),
    reviver: later => new Set(later)
});