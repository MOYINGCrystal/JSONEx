export default class InterfaceNotImplementError extends Error {
    constructor() {
        super("类未实现接口");
    }
}