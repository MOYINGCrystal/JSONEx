/**
 * 返回值缓存
 *
 * @desc 只能修饰无参数的方法
 *       不同类实例会维护不同的缓存值
 * @param target
 * @param propertyKey
 * @param descriptor
 * @constructor
 */
const ReturnCache: MethodDecorator = (target, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    let func = descriptor.value;
    let cache: Map<any, any> = new Map();
    descriptor.value = function () {
        if (cache.has(this)) return cache.get(this);
        let result = func.apply(this);
        cache.set(this, result);
        return result;
    }
}

/**
 * 返回值缓存静态
 *
 * @desc 只能修饰无参数的方法
 *       会静态的处理缓存
 *       给非静态变量修饰时，所有类实例会维护同一个缓存值
 * @param target
 * @param propertyKey
 * @param descriptor
 * @constructor
 */
const ReturnCacheStatic: MethodDecorator = (target, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    let func = descriptor.value;
    let cache: any | null = null;
    descriptor.value = function () {
        if (cache != null) return cache;
        cache = func.apply(this);
        return cache;
    }
}

export {ReturnCache, ReturnCacheStatic};