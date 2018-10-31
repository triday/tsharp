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

Object.compare = function (obj1: Json, obj2: Json): boolean {
    var status = true,
        keys = Object.keys(obj2)
    for (var i = 0; i < keys.length; i++) {
        var name = keys[i],
            src = obj1[name],
            copy = obj2[name]
        if ((isPlainObject(copy) && isPlainObject(src)) || (isArray(copy) && isArray(src))) {
            status = Object.compare(src,copy)
            if(!status) break
        }
        else {
            if(isNaN(copy) && isNaN(src)) status = true
            else  status = copy === src
        }
        if(!status) break
    }

    return status
}