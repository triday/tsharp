interface Object {
    merge(...items: object[]): object;
    clone(obj: object, deep?: boolean): object;
    compare(obj1: object, obj2: object): boolean;
    equals(other: object): boolean;
}
// interface ObjectConstructor {
//     clone(obj: object, deep?: boolean): object;
//     merge(target:object,...items:object[]):object;
//     equals(deep?: boolean, ignoreNaN?: boolean): boolean;
// }


function isPlainObject(obj: object): boolean {
    return obj !== null && obj.toString() === '[object Object]'
}
function isArray(array: any[]): boolean {
    return array instanceof Array
}

Object.clone = function (obj: { [key: string]: any }, deep?: boolean): object {
    var result: { [key: string]: any } = {}
    Object.keys(obj).forEach(name => {
        if (deep && (isPlainObject(obj[name])) || isArray(obj[name])) {
            result[name] = Object.clone(obj[name], deep)
        }
        else {
            result[name] = obj[name]
        }
    })
    return result
}

Object.merge = function (...items: any[]): object {
    let array: any[] = [...items],
        target: any = Object.clone(array[0], true),
        clone: any[] | object = null
    for (let i = 1; i < array.length; i++) {
        let item = array[i]
        Object.keys(item).forEach(name => {
            let src = target[name],
                copy = item[name]
            if ((isPlainObject(copy) || isArray(copy))) {
                if (isPlainObject(copy)) {
                    clone = src && isPlainObject(src) ? src : {}
                }
                if (isArray(copy)) {
                    clone = src && isArray(src) ? src : []
                }
                target[name] = Object.merge(clone, copy)
            }
            else {
                target[name] = copy
            }
        })
    }
    return target
}

Object.compare = function (obj1: { [key: string]: any }, obj2: { [key: string]: any }): boolean {
    var status = true,
        keys = Object.keys(obj2)
    for (var i = 0; i < keys.length; i++) {
        var name = keys[i],
            src = obj1[name],
            copy = obj2[name]
        if ((isPlainObject(copy) && isPlainObject(src)) || (isArray(copy) && isArray(src))) {
            status = Object.compare(src, copy)
            if (!status) break
        }
        else {
            if (isNaN(copy) && isNaN(src)) status = true
            else status = copy === src
        }
        if (!status) break
    }

    return status
}

if (!Object.prototype.equals) {
    Object.prototype.equals = function (other): boolean {

        const isObjectEquals = (a: any, b: any): boolean => (a instanceof Object) && (b instanceof Object) && (a.equals(b));
        const isNaNEquals = (a: any, b: any): boolean => isNaN(a) && isNaN(b);

        if (this === other) return true;
        if (other === null || other === undefined) return false;
        if (Object.getPrototypeOf(this) !== Object.getPrototypeOf(other)) return false;
        const [keys1, keys2] = [Object.keys(this), Object.keys(other)];
        if (keys1.length !== keys2.length) return false;

        for (let i = 0; i < keys1.length; i++) {
            const key = keys1[i];
            if (!(key in keys2)) return false;
            const [val1, val2] = [this[key], (<any>other)[key]];
            if (val1 !== val2 &&
                !isNaNEquals(val1, val2) &&
                !isObjectEquals(val1, val2)) {
                return false;
            }
        }
        return true;


    }
}