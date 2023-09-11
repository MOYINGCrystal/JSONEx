import Interface, {IsInterface} from "../../interface/Interface";
import Abstract from "../../interface/decorator/Abstract";
import {Constructor} from "../../UtilType";
import Default from "../../interface/decorator/Default";
import Implements from "../../interface/Implements";

@IsInterface
class IMyInterface extends Interface {
    // 对于接口的抽象方法，需要@Abstract([返回值类型])，并设置返回值
    @Abstract(Number)
    methodA(a: string, b: number): void {
    };

    // 默认方法需要@Default修饰，必须显式声明参数类型和返回类型
    @Default
    methodB(a: string, b: number): boolean {
        console.log(`默认方法，a:${a},b:${b}`);
        return true;
    }

    execute(target: Constructor<any>): void {
    }

    assertImplement(target: Constructor<any>): void {
    }
}

@Implements(IMyInterface)
class Instance implements IMyInterface{
    assertImplement(target: Constructor<any>): void {
    }

    execute(target: Constructor<any>): void {
    }

    methodA(a: string, b: number): void {
    }

    @Default
    methodB(a: string, b: number): boolean {
        return false;
    }
}

it('interface', function () {
    let keys = Reflect.getMetadataKeys(IMyInterface);
    debugger;
});