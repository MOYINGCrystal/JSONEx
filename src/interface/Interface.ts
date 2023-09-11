import {Constructor} from "../UtilType";
import "reflect-metadata";

abstract class Interface {
    /**
     * 断言类实现了接口
     *
     * @desc 未实现时会报错
     * @param target
     * @throws InterfaceNotImplementError
     */
    abstract assertImplement(target: Constructor<any>): void;

    /**
     * 执行
     *
     * @desc 在类实现时执行一些代码
     * @param target
     */
    abstract execute(target: Constructor<any>): void;
}

export default Interface;

const InterfaceSymbol = Symbol("Interface");

export const IsInterface: ClassDecorator = Reflect.metadata(InterfaceSymbol, true);