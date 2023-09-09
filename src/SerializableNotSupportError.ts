export default class SerializableNotSupportError extends Error{
    constructor() {
        super("对象不是可序列化对象！");
    }
}