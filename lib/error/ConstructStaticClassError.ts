/**
 * 错误_构造静态类
 *
 * @author 末影_水晶
 */
export default class ConstructStaticClassError extends Error {
    constructor() {
        super("构造了一个静态类。");
        this.name = "ConstructStaticClassError";
    }
}