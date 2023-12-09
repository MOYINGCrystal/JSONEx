import {Constructor} from "./Type";

const constructorMap = new Map<string, Constructor<SerializableObject>>();
const keyMap = new Map<Constructor<SerializableObject>, string>();

/**
 * 可序列化
 *
 * @desc
 * 用该装饰器修饰类即可使用本包中的JSONEx类来进行序列化和反序列化。
 * <hr/>
 * 属性类型必须都为基本类型或可序列化的引用类型。
 * <hr/>
 * 修饰器只对类自身有效，有子类需要序列化的话也需要子类被装饰器装饰。
 */
const Serializable: ClassDecorator = (target) => {
    const key = target.name + "@" + constructorMap.size;
    constructorMap.set(key, <Constructor<SerializableObject>><any>target);
    keyMap.set(<Constructor<SerializableObject>><any>target, key);
}

export function getClassKey(clazz: Constructor<SerializableObject>) {
    return keyMap.get(clazz);
}

export function getConstructor(key: string) {
    return constructorMap.get(key);
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