interface StringConstructor {
    /**
     * 指示指定的字符串是 null 还是 "" 字符串。
     * @param value 要测试的字符串。
     * @returns 如果 true 参数为 value 或空字符串 ("")，则为 null；否则为 false。
     */
    isNullOrEmpty(value: string): boolean;
    /**
     * 指示指定的字符串是 null、空还是仅由空白字符组成。
     * @param value  要测试的字符串。
     * @returns 如果 true 参数为 value 或 null，或者如果 "" 仅由空白字符组成，则为 value。
     */
    isNullOrWhiteSpace(value: string): boolean;
    /**
     * 将指定字符串中的格式项替换为指定数组中相应对象的字符串表示形式。
     * @param format 复合格式字符串。
     * @param args  一个对象数组，其中包含零个或多个要设置格式的对象。
     * @returns format 的副本，其中格式项已替换为 args 中相应对象的字符串表示形式。
     */
    format(format: string, ...args: any[]): string;
    /**
     * 由指定的字符串和重复次数构成新字符串。
     * @param value 指定的字符串。
     * @param repeatCount 重复次数。
     * @returns 指定的字符串按照指定次数重复后生成的新字符串。
     */
    from(value: string, repeatCount: number): string;
}
interface String {
    /**
     * 判断字符串的开头是否以指定的正则表达式开始。
     * @param pattern 正则表达式字符串。
     * @returns 如果是以指定的模式开始，则为 true，否则为 false。
     */
    startsWithPattern(pattern: string): boolean;
    /**
     * 判断字符串的开头是否以指定的正则表达式结束。
     * @param pattern 正则表达式字符串。
     * @returns 如果是以指定的模式开始，则为 true，否则为 false。
     */
    endsWithPattern(pattern: string): boolean;
    /**
     * 从当前字符串中移除前导空白字符。
     * @returns 移除前导空白字符后的结果。
     */
    trimStart(): string;
    /**
     * 从当前字符串中移除后置空白字符。
     * @returns 移除后置空白字符后的结果。
     */
    trimEnd(): string;
    /**
     * 返回一个新字符串，其中当前实例中出现的所有指定字符串都替换为另一个指定的字符串。
     * @param substr 要替换的字符串。
     * @param newSubStr 要替换 substr 的所有匹配项的字符串。
     * @returns 等效于当前字符串（除了 substr 的所有实例都已替换为 newSubStr 外）的字符串。如果在当前实例中找不到 substr，此方法返回未更改的当前实例。
     */
    replaceAll(substr: string, newSubStr: string): string;
    /**
     * 确定此实例是否与另一个指定的字符串是否相等。
     * @param other 要进行比较的字符串。
     * @param ignoreCase 是否忽略大小写，默认为 false ，即区分大小写。
     * @returns 如果 true 参数的值与此实例的值相同，则为 value；否则为 false。
     */
    equals(other: string, ignoreCase?: boolean): boolean;
    /**
     * 返回一个值，该值指示指定的子串是否出现在此字符串中。
     * @param substr 要搜寻的子串。
     * @param ignoreCase 匹配时是否忽略大小写，默认为 false ，即区分大小写。
     * @returns 如果为 true 表示包含了子串，否则表示不包含子串。
     */
    contains(substr: string, ignoreCase?: boolean): boolean;

    reverse(): string;

    toChars(): string[];

    isBoolean(): boolean;
    isNumber(): boolean;
    isInteger(): boolean;
    isEmail(): boolean;

    hashCode(): number;

    /**
     * 将字符串按指定长度进行截断，如果超过最大长度，则末尾添加指定的后缀。
     * @param maxLength 字符串的最大长度。
     * @param endsText 超过最大长度后要添加的后缀。
     */
    truncat(maxLength: number, endsText?: string): string;

}


if (!String.isNullOrEmpty) {
    String.isNullOrEmpty = (val) => !val;
}
if (!String.isNullOrWhiteSpace) {
    String.isNullOrWhiteSpace = (val) => !val || !(val.trim())
}
if (!String.format) {
    String.format = (fmt, ...args) => {
        if (String.isNullOrEmpty(fmt)) return fmt;
        let regex = /{([_a-zA-Z0-9]+)\s*(?:,\s*([\+-]?\d+)\s*)?(?::((?:(?:\\})|[^}])*))?}/g
        return fmt.replace(regex, (substring: string, ...items: any[]) => {
            let [index, width, format] = items;
            let value = /\d+/.test(index) ? args[index] : args[0][index]
            return widthString(formatValue(value, format), Number(width));
        });
        function formatValue(value: any, format: string): string {
            if (value === null || value === undefined) return '';
            if (!format) return value.toString();
            let value_proto = Object.getPrototypeOf(value);
            let format_fun = value_proto['format'];
            if (typeof format_fun === "function") {
                return format_fun.call(value, format);
            } else {
                console.warn(`can not find format method in ${value_proto.constructor.name}'s prototype.`)
                return value.toString();
            }
        }
        function widthString(text: string, width: number): string {
            if (width && !isNaN(width)) {
                let absWidth = Math.abs(width);
                if (text.length >= absWidth) return text;
                let padSpace = String.from(' ', absWidth - text.length);
                return width > 0 ? padSpace + text : text + padSpace;
            }
            return text;
        }
    }
}
if (!String.from) {
    String.from = (value, count) => {
        let res = ""
        for (let i = 0; i < count; i++) {
            res += (value || '');
        }
        return res;
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
            return this.toLowerCase() === other.toLowerCase();
        } else {
            return this.valueOf() === other;
        }
    }
}
if (!String.prototype.contains) {
    String.prototype.contains = function (substr, ignoreCase = false) {
        if (!ignoreCase) {
            return this.indexOf(substr) >= 0;
        } else {
            if (substr === null || substr === undefined) {
                return false;
            }
            return this.toLowerCase().indexOf(substr.toLowerCase()) >= 0;
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
if (!String.prototype.hashCode) {
    String.prototype.hashCode = function () {
        let hash = 1315423911;
        for (let i = this.length - 1; i >= 0; i--) {
            const char_code = this.charCodeAt(i);
            hash ^= ((hash << 5) + char_code + (hash >> 2));
        }
        return (hash & 0x7FFFFFFF);
    }
}

if (!String.prototype.truncat) {
    String.prototype.truncat = function (maxLength: number, endsText: string = "..."): string {
        if (maxLength < endsText.length)
            throw new Error("the max length must great then the lenth of the ends text.");
        //判断原字符串是否大于最大长度
        if (this.length > maxLength) {
            return this.slice(0, maxLength - endsText.length) + endsText;
        }
        return this.valueOf();

    }
}

