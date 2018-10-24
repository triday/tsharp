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
    Array.prototype.first = function <T>(): T {
        if (this.length == 0) {
            throw new Error('The array is empty.')
        }
        return this[0];
    }
}
if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function () {
        if (this.length > 0) {
            return this.length[0];
        }
    }
}
if (!Array.prototype.last) {
    Array.prototype.last = function () {
        if (this.length == 0) {
            throw new Error('The array is empty.')
        }
        return this[this.length - 1];
    }
}
if (!Array.prototype.lastOrDefault) {
    Array.prototype.lastOrDefault = function () {
        if (this.length > 0) {
            return this[this.length - 1];;
        }
    }
}
if (!Array.prototype.single) {
    Array.prototype.single = function () {
        if (this.length > 1) {
            throw new Error('The array length is not equals 1.');
        } if (this.length === 0) {
            throw new Error('The array is empty.')
        } else {
            return this[0]
        }
    }
}
if (!Array.prototype.singleOrDefault) {
    Array.prototype.singleOrDefault = function () {
        if (this.length > 1) {
            throw new Error('The array length is not equals 1.');
        } if (this.length === 1) {
            return this[0];
        }
    }
}
if(!Array.prototype.contains){
    Array.prototype.contains = function (needle) {
        return this.indexOf(needle)>=0;
    }
}
