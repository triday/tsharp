
interface ObjectConstructor {
    clone<T>(obj: T): T;
    merge(target: object, ...sources: object[]): object;
    equals<T>(obj1: T, obj2: T): boolean;
    isNullOrUndefined<T>(obj: T): boolean;
}

if (!Object.clone) {
    Object.clone = function (obj: any) {
        const isPlainObject: (obj: any) => boolean = (obj) => {
            return obj && obj instanceof Object && obj.toString() === '[object Object]';
        }
        const isArray: (obj: any) => boolean = (obj) => {
            return obj && obj instanceof Array
        }
        const hasCustomClone: (obj: any) => boolean = (obj) => {
            return typeof obj['clone'] === "function";
        }
        const cloneArray: (obj: []) => any = (obj) => {
            let res = new Array(obj.length);
            obj.forEach((value, index, arr) => {
                res[index] = Object.clone(value);
            });
            return res;
        }
        const clonePlainObject: (obj: any) => any = (obj) => {
            return Object.keys(obj).reduce((prev: any, current) => {
                prev[current] = Object.clone(obj[current]);
                return prev;
            }, {})
        }
        if (!obj) return obj;
        if (typeof obj === "object") {
            if (isArray(obj)) return cloneArray(obj);
            if (hasCustomClone(obj)) return obj.clone();
            if (isPlainObject(obj)) return clonePlainObject(obj)
        }
        return obj;
    }
}
if (!Object.merge) {
    Object.merge = function (target: any, ...sources: object[]): object {
        const isPlainObject: (obj: any) => boolean = (obj) => {
            return obj && obj instanceof Object && obj.toString() === '[object Object]';
        }
        const isArray: (obj: any) => boolean = (obj) => {
            return obj && obj instanceof Array
        }
        const isPlainObjectOrArray: (obj: any) => boolean = (obj) => isPlainObject(obj) || isArray(obj);
        target = target || {};
        sources.forEach((item: any) => {
            Object.keys(item || {}).forEach((key) => {
                let target_prop = target[key];
                let item_prop = item[key];
                if (isPlainObjectOrArray(target_prop) && isPlainObjectOrArray(item_prop)) {
                    Object.merge(target_prop, item_prop);
                } else {
                    target[key] = Object.clone(item[key]);
                }
            })
        });
        return target;
    }
}




if (!Object.equals) {
    Object.equals = function (obj1, obj2): boolean {
        const isPlainObject: (obj: any) => boolean = (obj) => {
            return obj && obj instanceof Object && obj.toString() === '[object Object]';
        }
        const cmpPlainObject: (obj: any, obj2: any) => boolean = (obj1, obj2) => {
            const [keys1, keys2] = [Object.keys(obj1), Object.keys(obj2)];
            if (keys1.length !== keys2.length) return false;
            for (let i = 0; i < keys1.length; i++) {
                const key = keys1[i];
                if (keys2.indexOf(key) < 0) return false;
                if (!Object.equals(obj1[key], obj2[key])) return false;
            }
            return true;
        }
        const cmpArray: (obj1: any[], obj2: any[]) => boolean = (obj1, obj2) => {
            if (obj1.length != obj2.length) return false;
            for (let i = 0; i < obj1.length; i++) {
                if (!Object.equals(obj1[i], obj2[i])) return false;
            }
            return true;
        }
        const isAllNaN: (obj: any, obj2: any) => boolean = (obj1, obj2) => {
            return typeof obj1 === "number" && typeof obj2 === "number" && isNaN(obj1) && isNaN(obj2);
        }
        const isSameObjectType: (obj1: any, obj2: any) => boolean = (obj1, obj2) => {
            return obj1 instanceof Object && obj2 instanceof Object &&
                Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
        }
        const hasCustomEquals: (obj: any) => boolean = (obj) => {
            return typeof obj['equals'] === "function";
        }
        const hasOverwriteValueOf: (obj: any) => boolean = (obj) => {
            return "valueOf" in obj && typeof obj.valueOf() !== obj;
        }
        const isArray: (obj: any) => boolean = (obj) => {
            return obj && obj instanceof Array
        }
        if (obj1 === obj2) return true;
        if (obj1 === null || obj1 === undefined || obj2 == null || obj2 == undefined) return false;
        if (isAllNaN(obj1, obj2)) return true;
        if (isSameObjectType(obj1, obj2)) {
            if (isArray(obj1)) return cmpArray(<any>obj1, <any>obj2);
            if (hasCustomEquals(obj1)) return (<any>obj1).equals(obj2);
            if (isPlainObject(obj1)) return cmpPlainObject(obj1, obj2);
            if (hasOverwriteValueOf(obj1) && hasOverwriteValueOf(obj2)) {
                return Object.equals(obj1.valueOf(), obj2.valueOf());
            }
        }
        return false;
    }
}
if (!Object.isNullOrUndefined) {
    Object.isNullOrUndefined = (val) => val === null || val === undefined;
}