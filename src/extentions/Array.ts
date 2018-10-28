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