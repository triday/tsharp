/// <reference path="./String.d.ts" />

if (!String.isNullOrEmpty) {
    String.isNullOrEmpty = (val) => !val;
}
if (!String.isNullOrWhiteSpace) {
    String.isNullOrWhiteSpace = (val) => !val || !(val.trim())
}
if (!String.format) {
    String.format = (fmt, ...args) => {
        if (String.isNullOrEmpty(fmt)) return fmt;
        let result = fmt;
        if (args.length === 1 && typeof args[0] === "object") {
            for (let key in args[0]) {
                if (args[0][key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[0][key]);
                }
            }
        } else {
            for (var i = 0; i < args.length; i++) {
                if (args[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, args[i]);
                }
            }
        }

        return result;
    }
}

if (!String.prototype.startsWithPattern) {
    String.prototype.startsWithPattern = function (str) {
        var reg = new RegExp("^" + str);
        return reg.test(this);
    }
}
if (!String.prototype.endsWithPattern) {
    String.prototype.endsWithPattern = function (str) {
        var reg = new RegExp(str + "$");
        return reg.test(this);
    }
}
if (!String.prototype.trimStart) {
    String.prototype.trimStart = function () {
        return this.replace(/^\s*/g, '');
    }
}
if (!String.prototype.trimEnd) {
    String.prototype.trimEnd = function () {
        return this.replace(/\s*$/, '');
    }
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (substr, newSubStr) {
        return String.isNullOrEmpty(substr) ? this : this.replace(new RegExp(substr, "gm"), newSubStr);
    }
}

if (!String.prototype.equals) {
    String.prototype.equals = function (other, ignoreCase = false) {
        if (ignoreCase && other) {
            return String(this).toLowerCase() === other.toLowerCase();
        } else {
            return String(this) === other;
        }
    }
}
if (!String.prototype.contains) {
    String.prototype.contains = function (substr, ignoreCase = false) {
        if (!ignoreCase) {
            return String(this).indexOf(substr) >= 0;
        } else {
            if (substr === null || substr === undefined) {
                return false;
            }
            return String(this).toLowerCase().indexOf(substr.toLowerCase()) >= 0;
        }
    }
}
if (!String.prototype.reverse) {
    String.prototype.reverse = function () {
        return this.split('').reverse().join('');
    }
}
if (!String.prototype.toChars) {
    String.prototype.toChars = function () {
        return this.split('');
    }
}