import {getTransient} from "./DecoratorData";

const Transient: PropertyDecorator = (target, propertyKey) => {
    getTransient(target).add(propertyKey);
}

export default Transient;