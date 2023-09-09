let decoratorDataSymbol = Symbol("decoratorData");

function getDecoratorData(obj: any): Map<symbol, any> {
    if (!obj[decoratorDataSymbol]) {
        obj[decoratorDataSymbol] = new Map();
        return obj[decoratorDataSymbol];
    }
    return obj[decoratorDataSymbol];
}

let propertyTypeSymbol = Symbol("propertyType");

export function getPropertyType(obj: any): Map<string | symbol, any> {
    let decoratorData = getDecoratorData(obj);
    if (!decoratorData.has(propertyTypeSymbol)) {
        let map = new Map();
        decoratorData.set(propertyTypeSymbol, map);
        return map;
    }
    return decoratorData.get(propertyTypeSymbol);
}

let transientSymbol = Symbol("transient");

export function getTransient(obj: any): Set<string | symbol> {
    let decoratorData = getDecoratorData(obj);
    if (!decoratorData.has(transientSymbol)) {
        let set: Set<string | symbol> = new Set();
        decoratorData.set(transientSymbol, set);
        return set;
    }
    return decoratorData.get(transientSymbol);
}

let arrayTypeSymbol = Symbol("arrayType");

export function getArrayType(obj: any): Map<string | symbol, any> {
    let decoratorData = getDecoratorData(obj);
    if (!decoratorData.has(arrayTypeSymbol)) {
        let map = new Map();
        decoratorData.set(arrayTypeSymbol, map);
        return map;
    }
    return decoratorData.get(arrayTypeSymbol);
}