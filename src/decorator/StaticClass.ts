import ConstructStaticClassError from "../ConstructStaticClassError";

/**
 * 静态类
 *
 * @desc 被其修饰的类不能被构造
 * @param constructor
 * @constructor
 */
function StaticClass<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super();
            throw new ConstructStaticClassError();
        }
    };
}

export default <ClassDecorator>StaticClass;