/// <reference path="./String.d.ts" />

if (!String.isNullOrEmpty) {
    String.isNullOrEmpty = (val) => !val;
}
if (!String.isNullOrWhiteSpace) {
    String.isNullOrWhiteSpace = (val) => !val || !(val.trim())
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


// //格式化字符串函数
// String.prototype.format = function (args) {
//     var result = this;
//     if (arguments.length > 0) {
//         if (arguments.length == 1 && typeof (args) == "object") {
//             for (var key in args) {
//                 if (args[key] != undefined) {
//                     var reg = new RegExp("({" + key + "})", "g");
//                     result = result.replace(reg, args[key]);
//                 }
//             }
//         }
//         else {
//             for (var i = 0; i < arguments.length; i++) {
//                 if (arguments[i] != undefined) {
//                     //var reg = new RegExp("({[" + i + "]})", "g");
//                     var reg = new RegExp("({)" + i + "(})", "g");
//                     result = result.replace(reg, arguments[i]);
//                 }
//             }
//         }
//     }
//     return result;
// }
// //格式化字符串函数
// String.format = function (fmt, args) {
//     var newargs = Array.prototype.slice.call(arguments, 1)
//     return String.prototype.format.apply(fmt, newargs);
// }




// String.prototype.replaceAll = function (s1, s2) {
//     return this.replace(new RegExp(s1, "gm"), s2);
// }

// function equals(str1, str2) {
//     if (str1 == str2) {
//         return true;
//     }
//     return false;
// }

// //忽略大小写比较字符串
// function equalsIgnoreCase(str1, str2) {

//     if (str1.toUpperCase() == str2.toUpperCase()) {
//         return true;
//     }
//     return false;
// }
