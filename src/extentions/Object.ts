/// <reference path="./Object.d.ts" />

interface Json {
    [key: string]: any
}
function isPlainObject(obj: object): boolean {
    return obj !== null && obj.toString() === '[object Object]'
}
function isArray(array: any[]): boolean {
    return array instanceof Array
}

Object.clone = function (obj: Json, deep?: boolean): object {
    var result: Json = {}
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
