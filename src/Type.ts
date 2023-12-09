export type Constructor<T> = {
    new(...args: any[]): T;
    prototype: T;
};

export type Supplier<T> = () => T;