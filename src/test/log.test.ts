export {};

function logger(fn) {
    return function () {
        console.log(`Calling function ${fn.name} with arguments:`, arguments);
        const result = fn.apply(this, arguments);
        console.log(`Function ${fn.name} returned:`, result);
        return result;
    };
}

const log = (type: string) =>
    // 这是装饰符对应函数的标准接口函数。其中：target是作用的实例；name是作用的函数名；descriptor是一个标准装饰器对象，其中value是对应作用的函数。
    (target: any, name: any, descriptor: TypedPropertyDescriptor<any>) => {
        let oldValue = descriptor.value;
        descriptor.value = function () {
            // 打印日志
            console.log(descriptor);
            console.log(`打印日志：类型为 - ${type}`);
            // 执行原有方法
            return oldValue.apply(this, arguments);
        };

        return descriptor;

    }

class Sum {
    sum(a: number, b: number) {
        return a + b;
    }

    // @log("test")
    sum2(a: number, b: number) {
        return a + b;
    }
}

it("test1", () => {
    let sum1 = new Sum();
    console.log(sum1.sum(1, 2));
    // expect(1).toBe(1);
});

it("test2", () => {
    let sum1 = new Sum();
    console.log(sum1.sum2(1, 2));
});

it("test3", () => {
    let a = new A();
    a.testFunc(1, 2);
    a.testFunc(2, 3);
    // testFunc(5, 1);
});

// 使用方法
class A {
    @log("text")
    testFunc(a: number, b: number) {
        console.log("计算结果", a + b);
        // console.log("函数方法");
    }
}
