import "reflect-metadata";

class Point {
    constructor(public x: number, public y: number) {
    }
}

class Line {
    private _start: Point;

    get start() {
        return this._start;
    }

    @validate
    set start(value: Point) {
        this._start = value;
    }

    private _end: Point;

    get end() {
        return this._end;
    }

    @validate
    set end(value: Point) {
        this._end = value;
    }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    let set = descriptor.set!;

    descriptor.set = function (value: T) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);

        if (!(value instanceof type)) {
            throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
        }

        set.call(this, value);
    };
}

it('metadata', function () {
    const line = new Line();
    line.start = new Point(0, 0);
    debugger;
    // @ts-ignore
    line.end = {};
});


// Fails at runtime with:
// > Invalid type, got object not Point