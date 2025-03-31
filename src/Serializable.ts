import {Constructor, Supplier} from "./Type";

const map = new Map<string, Constructor<SerializableObject>>();
const antiMap = new Map<Constructor<SerializableObject>, string>();

/**
 * 可序列化
 *
 * @desc
 * 用该装饰器修饰类即可使用本包中的JSONEx类来进行序列化和反序列化。
 * <hr/>
 * 属性类型必须都为基本类型或可序列化的引用类型。
 * <hr/>
 * 修饰器只对类自身有效，有子类需要序列化的话也需要子类被装饰器装饰。
 *
 * @param subTypes 没有任何作用，只是为了提醒不要使用类型导入
 */
const Serializable: (...subTypes: Supplier<Constructor<SerializableObject>>[]) => ClassDecorator = (...subTypes) => (target) => {
    let key = target.name;
    while (map.has(key)) {
        key += "a";
    }
    map.set(key, <Constructor<SerializableObject>><unknown>target);
    antiMap.set(<Constructor<SerializableObject>><unknown>target, key);
};

/**
 * @internal
 */
export function getClassKey(clazz: Constructor<SerializableObject>) {
    return antiMap.get(clazz);
}

/**
 * @internal
 */
export function getConstructor(key: string) {
    return map.get(key);
}

export default Serializable;

/**
 * 可序列化
 *
 * @desc 标记接口
 *       要想真正实现可序列化
 *       需要对类添加修饰器：<code>@Serializable</code>
 * @see Serializable
 * @see Implements
 */
export interface SerializableObject {
}