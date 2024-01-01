//const primitiveType = ['number', 'string', 'boolean', 'function', 'undefined', 'symbol', 'bigint']
export function getObjectTypes(obj) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            result[key] = typeof value;
            if (typeof value === 'object' && value !== null) {
                result[key] = getObjectTypes(value);
            }
        }
    }
    return { ...result };
}
export const getDataType = (data) => {
    if (typeof (data) == 'string')
        return 'string';
    if (typeof (data) == 'number')
        return 'number';
    if (typeof (data) == 'boolean')
        return 'boolean';
    if (typeof (data) == 'function')
        return 'function';
    if (typeof (data) == 'undefined')
        return 'undefined';
    if (typeof (data) == 'symbol')
        return 'symbol';
    if (typeof (data) == 'bigint')
        return 'bigint';
    if (typeof (data) == 'object')
        return getObjectTypes(data);
};
const isEqual = (object1, object2) => {
    const first = JSON.stringify(object1);
    const two = JSON.stringify(object2);
    if (first.length != two.length)
        return false;
    let incr = 0;
    for (const l of first) {
        if (first.charAt(incr) != two.charAt(incr))
            return false;
        incr++;
    }
    return true;
};
export const Type = function createTypedProxy(initialValue, errorCallback) {
    let hasSetType = false;
    let initialdata = JSON.parse(JSON.stringify(initialValue));
    let data = {};
    if (typeof (initialValue) != 'object') {
        data = initialdata;
        //initialdata = val.value
    }
    else {
        const result = {};
        for (const key in initialValue) {
            if (initialValue.hasOwnProperty(key)) {
                const value = initialValue[key];
                if (typeof value === 'object' && value !== null) {
                    result[key] = Type(value);
                }
                else {
                    result[key] = value;
                }
            }
        }
        initialdata = result;
        data = initialdata;
    }
    const val = new Proxy(data, {
        set: (target, prop, value) => {
            if (typeof value === 'object' && value !== null) {
            }
            if (!hasSetType) {
                hasSetType = true;
                const typeofvalue = getDataType(value);
                const typeofInitialvalue = getDataType(initialdata[prop]);
                if (!isEqual(typeofInitialvalue, typeofvalue)) {
                    const expectedType = JSON.stringify(typeofInitialvalue);
                    const receivedType = JSON.stringify(typeofvalue);
                    if (errorCallback) {
                        errorCallback(expectedType, receivedType);
                    }
                    else {
                        const differences = expectedType.split('').map((char, i) => (receivedType[i] !== char) ? { position: i, char1: char, char2: receivedType[i] } : null).filter(Boolean);
                        throw new Error(`Type ${receivedType} is not assignable to type ${expectedType}`);
                    }
                }
            }
            else if (!isEqual(getDataType(value), getDataType(target[prop]))) {
                const expectedType = JSON.stringify(getDataType(target[prop]));
                const receivedType = JSON.stringify(getDataType(value));
                if (errorCallback) {
                    errorCallback(expectedType, receivedType);
                }
                else {
                    throw new Error(`Type ${receivedType} is not assignable to type ${expectedType}`);
                }
            }
            target[prop] = value;
            return true;
        }
    });
    return val;
};
//export default getDataType
