/// <reference path="Array.d.ts" />
if (!Array.prototype.where) {
    Array.prototype.where = Array.prototype.filter;
}
if (!Array.prototype.select) {
    Array.prototype.select = Array.prototype.map;
}
if (!Array.prototype.any) {
    Array.prototype.any = Array.prototype.some;
}
if (!Array.prototype.all) {
    Array.prototype.all = Array.prototype.every;
}
if (!Array.prototype.first) {
    Array.prototype.first = function <T, U>(selecter?: (value: T, index: number, array: T[]) => U): T | U {
        if (this.length == 0) {
            throw new Error('The array is empty.')
        }
        return selecter ? selecter(this[0], 0, this) : this[0];
    }
}
if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function <T, U>(selecter?: (value: T, index: number, array: T[]) => U): T | U {
        if (this.length > 0) {
            return selecter ? selecter(this[0], 0, this) : this[0];
        }
    }
}
if (!Array.prototype.last) {
    Array.prototype.last = function <T, U>(selecter?: (value: T, index: number, array: T[]) => U): T | U {
        if (this.length == 0) {
            throw new Error('The array is empty.')
        }
        let index = this.length - 1;
        return selecter ? selecter(this[index], index, this) : this[index];
    }
}
if (!Array.prototype.lastOrDefault) {
    Array.prototype.lastOrDefault = function <T, U>(selecter?: (value: T, index: number, array: T[]) => U): T | U {
        if (this.length > 0) {
            let index = this.length - 1;
            return selecter ? selecter(this[index], index, this) : this[index];
        }
    }
}
if (!Array.prototype.single) {
    Array.prototype.single = function <T, U>(selecter?: (value: T, index: number, array: T[]) => U): T | U {
        if (this.length > 1) {
            throw new Error('The array length is not equals 1.');
        } else if (this.length === 0) {
            throw new Error('The array is empty.')
        } else {
            return selecter ? selecter(this[0], 0, this) : this[0];
        }
    }
}
if (!Array.prototype.singleOrDefault) {
    Array.prototype.singleOrDefault = function <T, U>(selecter?: (value: T, index: number, array: T[]) => U): T | U {
        if (this.length > 1) {
            throw new Error('The array length is not equals 1.');
        } else if (this.length === 1) {
            return selecter ? selecter(this[0], 0, this) : this[0];
        }
    }
}
if (!Array.prototype.contains) {
    Array.prototype.contains = function <T>(value: T, comparer?: (a: T, b: T) => boolean) {
        if (comparer) {
            for (const item of this) {
                if (comparer(item, value)) {
                    return true;
                }
            }
            return false;
        } else {
            return this.indexOf(value) >= 0;
        }

    }
}
if (!Array.prototype.count) {
    Array.prototype.count = function <T>(predicate?: (value: T, index: number, array: T[]) => any) {
        return predicate ? this.where(predicate).length : this.length;
    }
}
if (!Array.prototype.min) {
    Array.prototype.min = function (selector) {
        if (selector) {
            let newArray = this.map(selector);
            return Math.min.apply(null, newArray);
        } else {
            return Math.min.apply(null, this);
        }
    }
}
if (!Array.prototype.max) {
    Array.prototype.max = function (selector) {
        if (selector) {
            let newArray = this.map(selector);
            return Math.max.apply(null, newArray);
        } else {
            return Math.max.apply(null, this);
        }
    }
}
if (!Array.prototype.sum) {
    Array.prototype.sum = function <T>(selector: (value: T, index: number, array: T[]) => number) {
        return this.reduce((prev: number, current: T, index: number) => {
            return prev + (selector ? selector(current, index, this) : Number(current));
        }, 0);
    }
}
if (!Array.prototype.average) {
    Array.prototype.average = function <T>(selector: (value: T, index: number, array: T[]) => number) {
        return this.sum(selector) / this.length;
    }
}
if (!Array.prototype.selectMany) {
    Array.prototype.selectMany = function <T, U>(selector: (value: T, index: number, array: T[]) => U[]): U[] {
        return this.reduce((prev: U[], current: T, index: number) => {
            if (current && selector) {
                let itemRes = selector(current, index, this);
                return itemRes ? prev.concat(itemRes) : prev;
            }
        }, new Array<U>())
    }
}
if (!Array.prototype.ignoreNullOrUndefined) {
    Array.prototype.ignoreNullOrUndefined = function <T>() {
        let res: T[] = []
        this.forEach((element: T) => {
            if (element !== null && element !== undefined) {
                res.push(element);
            }
        });
        return res;
    }
}
if (!Array.prototype.replaceNullOrUndefined) {
    Array.prototype.replaceNullOrUndefined = function <T>(itemOrFactory: T | ((index: number, array: T[]) => T)): T[] {
        let res: T[] = [];
        this.array.forEach((element: T, index: number) => {
            if (element === null || element === undefined) {
                if (typeof itemOrFactory == "function") {
                    res.push((itemOrFactory as (index: number, array: T[]) => T)(index, this));
                } else {
                    res.push(itemOrFactory);
                }
            } else {
                res.push(element);
            }
        });
        return res;
    }
}

if (!Array.prototype.distinct) {
    Array.prototype.distinct = function <T>(comparer: (a: T, b: T) => boolean): T[] {
        let res = new Array<T>();
        this.forEach((element: T) => {
            if (!res.contains(element, comparer)) {
                res.push(element);
            }
        });
        return res;
    }
}
if (!Array.prototype.except) {
    Array.prototype.except = function <T>(other: T[], comparer: (a: T, b: T) => boolean): T[] {
        other = (!other) ? [] : other.distinct();
        let res = new Array<T>();
        this.forEach((element: T) => {
            if (!res.contains(element, comparer) && !other.contains(element, comparer)) {
                res.push(element);
            }
        });
        return res;
    }
}
if (!Array.prototype.intersect) {
    Array.prototype.except = function <T>(other: T[], comparer: (a: T, b: T) => boolean): T[] {
        other = (!other) ? [] : other.distinct();
        let res = new Array<T>();
        this.forEach((element: T) => {
            if (!res.contains(element, comparer) && other.contains(element, comparer)) {
                res.push(element);
            }
        });
        return res;
    }
}

if (!Array.prototype.union) {
    Array.prototype.union = function <T>(other: T[], comparer: (a: T, b: T) => boolean): T[] {
        other = (!other) ? [] : other.distinct();
        let res = new Array<T>();
        this.forEach((element: T) => {
            if (!res.contains(element, comparer)) {
                res.push(element);
            }
        });
        other.forEach((element: T) => {
            if (!res.contains(element, comparer)) {
                res.push(element);
            }
        });
        return res;
    }
}

if (!Array.prototype.skip) {
    Array.prototype.skip = function (count) {
        return this.slice(count);
    }
}
if (!Array.prototype.skipWhere) {
    Array.prototype.skipWhere = function <T>(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
        for (let i = 0; i < this.length; i++) {
            if (!predicate(this[i], i, this)) {
                return this.slice(i);
            }
        }
        return new Array<T>();
    }
}

if (!Array.prototype.take) {
    Array.prototype.take = function (count) {
        return this.slice(0, count);
    }
}
if (!Array.prototype.takeWhere) {
    Array.prototype.takeWhere = function <T>(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
        let res = new Array<T>();
        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i], i, this)) {
                res.push(this[i]);
            } else {
                break;
            }
        }
        return res;
    }
}
if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function <T>(...keySelectors: (((value: T) => any) | [(value: T) => any, boolean])[]): T[] {
        if (keySelectors.length == 0) {
            return this.clone().sort();
        } else {
            return this.clone().sort((a: T, b: T) => {
                for (let i = 0; i < keySelectors.length; i++) {
                    let item = keySelectors[i];
                    let keySelector: (value: T) => any;
                    let reversed: boolean;
                    if (typeof item === "function") {
                        [keySelector, reversed] = [item as (value: T) => any, false];
                    } else {
                        [keySelector, reversed] = item as [(value: T) => any, boolean];
                    }
                    let key_a = keySelector(a);
                    let key_b = keySelector(b);
                    if (key_a !== key_b) {
                        if (reversed) { return (key_a > key_b) ? -1 : 1; }
                        else { return (key_a > key_b) ? 1 : -1; }
                    }
                }
                return 0;
            });
        }

    }
}
if (!Array.prototype.clone) {
    Array.prototype.clone = function () {
        return this.slice(0);
    }
}
if (!Array.prototype.equals) {
    Array.prototype.equals = function <T>(other: T[], deep: boolean = true, ignoreNaN: boolean = true): boolean {
        if (!other || other.length != this.length) return false;
        return deep ? deepEquals(other) : simpleEquals(other);
        function deepEquals(second: T[]): boolean {
            for (let i = 0; i < this.length; i++) {
                let thisItem = this[i];
                let otherItem = second[i];
                if (thisItem !== otherItem &&
                    !isObjectEquals(thisItem, otherItem) &&
                    !isArrayEquals(thisItem, otherItem) &&
                    !isNaNEquals(thisItem, otherItem)) {
                    return false
                }
            }
            return true;
        }
        function isArrayEquals(a: T, b: T): boolean {
            if (a instanceof Array && b instanceof Array) {
                return a.equals(b, deep, ignoreNaN);
            }
            return false;
        }
        function isObjectEquals(a: T, b: T): boolean {
            //TODO ...
            return a === b;
        }
        function isNaNEquals(a: any, b: any): boolean {
            return ignoreNaN && isNaN(a) && isNaN(b);
        }
        function simpleEquals(second: any[], ): boolean {
            for (let i = 0; i < this.length; i++) {
                if (this[i] !== second[i] &&
                    !isNaNEquals(this[i], second[i])) {
                    return false;
                }
            }
            return true;
        }
    }

}
if (!Array.prototype.toDictionary) {
    Array.prototype.toDictionary = function <T, U>(keySelector: (value: T, index: number, array: T[]) => string | number, elementSelector?: (value: T, index: number, array: T[]) => U): { [key: string]: U | T } | { [key: number]: U | T } {
        let res: any = {};
        this.forEach((current: T, index: number) => {
            let key = keySelector(current, index, this);
            let value = elementSelector ? elementSelector(current, index, this) : current;
            res[key] = value;
        }, {});
        return res;
    }
}
if (!Array.prototype.toLookup) {
    Array.prototype.toLookup = function <T, U>(keySelector: (value: T, index: number, array: T[]) => string | number, elementSelector?: (value: T, index: number, array: T[]) => U): { [key: string]: U[] | T[] } | { [key: number]: U[] | T[] } {
        let res: any = {};
        this.forEach((current: T, index: number) => {
            let key = keySelector(current, index, this);
            let value = elementSelector ? elementSelector(current, index, this) : current;
            if (key in res) {
                res[key].push(value);
            } else {
                res[key] = [value];
            }
        }, {});
        return res;
    }
}

if (!Array.range) {
    Array.range = function () {
        let start: number, stop: number, step: number;
        if (arguments.length == 1) [start, stop, step] = [0, arguments[0], 1];
        else if (arguments.length == 2) [start, stop, step] = [arguments[0], arguments[1], 1];
        else[start, stop, step] = [arguments[0], arguments[1], arguments[2]];
        if (step === 0) throw new Error('range() step argument must not be zero');
        let res = [];
        if (step > 0) {
            for (let i = start; i < stop; i += step) {
                res.push(i);
            }
        } else {
            for (let i = start; i > stop; i += step) {
                res.push(i);
            }
        }
        return res;
    }
}
if (!Array.repeat) {
    Array.repeat = function <T>(item: T, count: number): T[] {
        let res = new Array<T>();
        for (let i = 0; i < count; i++) {
            res.push(item);
        }
        return res;
    }
}