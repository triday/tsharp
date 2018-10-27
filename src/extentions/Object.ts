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
Object.prototype.merge = function (deep: boolean = false, ...items: any[]): object {
    let array: any[] = [...items],
        target: any = this,
        clone: any[] | object = null
    for (let i = 0; i < array.length; i++) {
        let item = array[i]
        Object.keys(item).forEach(name=>{
            let src = target[name],
                copy = item[name]
            if (deep && (isPlainObject(copy) || isArray(copy))) {
                if (isPlainObject(copy)) {
                    clone = src && isPlainObject(src) ? src : {}
                }
                if (isArray(copy)) {
                    clone = src && isArray(src) ? src : []
                }
                target[name] = clone.merge(deep, copy)
            }
            else {
                target[name] = copy
            }
        })
    }
    return target
}

Object.prototype.clone = function (deep:boolean = false): object {
    let result: Json = {},
        obj = this
    Object.keys(obj).forEach(name=>{
        result[name] = {}.merge(deep, obj[name])
    })
    return result
}