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
     * 将指定字符串中的格式项替换为指定对象中的属性值。
     * @param format 复合格式字符串。
     * @param argObj 一个对象，包含要替换的属性值。
     * @returns format 的副本，其中格式项已替换为 argObj 中相应属性的字符串表示形式。
     */
    format(format: string, argObj: { [key: string]: any }): string;
    /**
     * 将指定字符串中的格式项替换为指定数组中相应对象的字符串表示形式。
     * @param format 复合格式字符串。
     * @param args  一个对象数组，其中包含零个或多个要设置格式的对象。
     * @returns format 的副本，其中格式项已替换为 args 中相应对象的字符串表示形式。
     */
    format(format: string, ...args: any[]): string;
    /**
     * 由指定的字符串和重复次数构成新字符串。
     * @param value 指定的字符串,如果该字符串为null或者undefined，则当空字符串处理。
     * @param repeatCount 重复次数。
     * @returns 指定的字符串按照指定次数重复后生成的新字符串。
     */
    from(value: string, repeatCount: number): string;

    /**
     * 判断指定的字符编码是否属于全角编码
     * @param code 字符编码
     * @see {@link https://github.com/sindresorhus/is-fullwidth-code-point }
     */
    isFullwidthCode(code: number): boolean;
}
type ForeColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';
type BackColor = 'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' | 'bgBlackBright' | 'bgRedBright' | 'bgGreenBright' | 'bgYellowBright' | 'bgBlueBright' | 'bgMagentaBright' | 'bgCyanBright' | 'bgWhiteBright';
type TextStyle = 'bold' | 'faint' | 'italic' | 'underline' | 'strikethrough' | 'inverse';
interface String {
    /**
     * 判断字符串的开头是否以指定的正则表达式开始。
     * @param pattern 正则表达式。
     * @returns 如果是以指定的模式开始，则为 true，否则为 false。
     */
    startsWithPattern(pattern: RegExp): boolean;
    /**
     * 判断字符串的开头是否以指定的正则表达式结束。
     * @param pattern 正则表达式字符串。
     * @returns 如果是以指定的模式开始，则为 true，否则为 false。
     */
    endsWithPattern(pattern: RegExp): boolean;
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
     * 从当前字符串中移除数组中指定的一组字符的所有前导匹配项和尾部匹配项。
     * @returns 从当前字符串的开头移除所出现的所有 chars 参数中的字符后剩余的字符串。 如果 chars 为 null 或空字符串，则改为移除空白字符。 如果从当前实例无法删除字符，此方法返回未更改的当前实例。
     */
    trimChars(chars: string): string;
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
    /**
     * 反序字符串中字符的顺序。
     * @returns 返回反序组成的字符串。
     **/
    reverse(): string;
    /**
     * 将字符串转换为包含单个字符的数组。 
     * @returns 返回包含单个字符的数组，数组的长度和源字符串的长度相等。
     */
    toCharArrays(): string[];
    /**
     * 判断字符串是否全部由成小写字母组,即所有的字符为[a-z]，如果字符串为空，则返回false。
     * @returns 返回一个值，该值表示该字符串全部由小写字母组成。
     */
    isLower(): boolean;
    /**
     * 判断字符串是否全部由大写字母组成，即所有的字符为[A-Z]，如果字符串为空，则返回false。
     * @returns 返回一个值，该值表示该字符串全部由大写字母组成。
     */
    isUpper(): boolean;
    /**
     * 判断字符串是否全部由空白字符(空格字符，制表字符和换行字符)组成，如果字符串为空，则返回false。
     * @returns 返回一个值，该值表示该字符串全部由空白字母组成。
     */
    isSpace(): boolean;
    /**
     * 判断字符串是否全部由数字组成,即所有的字符为[0-9]，如果字符串为空，则返回false。
     * @returns 返回一个值，该值表示该字符串全部由数字组成。
     */
    isDigit(): boolean;
    /**
     * 判断字符串是否全部由小写字母或数字组成,即所有的字符为[a-z0-9]，如果字符串为空，则返回false。
     * @returns 返回一个值，该值表示该字符串全部由小写字母或数字组成。
     */
    isLowerOrDigit(): boolean;
    /**
     * 判断字符串是否全部由大写字母或数字组成,即所有的字符为[A-Z0-9]，如果字符串为空，则返回false。
     * @returns 返回一个值，该值表示该字符串全部由大写字母或数字组成。
     */
    isUpperOrDigit(): boolean;
    /**
     * 判断字符串是否全部由英文字母组成,即所有的字符为[a-zA-Z]，如果字符串为空，则返回false。
     * @returns 返回一个值，该值表示该字符串全部由英文字母组成。
     */
    isAlpha(): boolean;
    /**
     * 判断字符串是否全部由数字或字母组成,即所有的字符为[a-zA-Z0-9]，如果字符串为空，则返回false。
     * @returns 返回一个值，该值表示该字符串全部由数字或字母组成。
     */
    isAlphaOrDigit(): boolean;
    /**
     * 判断字符串是否是合法的boolean类型格式（“true”,"false"),忽略大小写。
     * @returns 返回一个值，该值表示该字符串是否是合法的boolean格式
     */
    isBoolean(): boolean;
    /**
     * 判断字符串是否是合法的数字格式,不包括正负无穷大。
     * @returns 返回一个值，该值表示该字符串是否是合法的数字格式。
     */
    isNumber(): boolean;
    /**
     * 判断字符串是否符合指定的正则表达式。
     * @param pattern 要测试的正则表达式。
     * @returns 返回一个值，该值表示该字符串是否符合指定的正则表达式。
     */
    isPattern(pattern: RegExp): boolean;
    /**
     * 判断字符串是否是合法的电子邮箱格式。
     * @returns 返回一个值，该值表示该字符串是否是合法的电子邮箱格式。
     */
    isEmail(): boolean;
    /**
     * 判断字符串是否是合法的变量名。
     * @returns 返回一个值，该值表示该字符串是否是合法的变量名。
     */
    isVarName(): boolean;
    /**
     * 计算字符串的哈希值。
     * @returns 返回该字符串的哈希值。
     */
    hashCode(): number;
    /**
     * 将字符串按指定长度进行截断，如果超过最大长度，则末尾添加指定的后缀。
     * @param maxLength 字符串的最大长度。
     * @param endsText 超过最大长度后要添加的后缀，默认为 "..."。
     * @returns 返回截断后的字符串。
     */
    truncat(maxLength: number, endsText?: string): string;
    /**
     * 将字符串进行html编码
     */
    htmlEncode(): string;
    /**
     * 将字符串进行html解码
     */
    htmlDocode(): string;

    /**
     * 将字符串转换为驼峰命名字符串
     * @param firstWordUpper 是否将第一个单词转为驼峰格式，默认为false。
     */
    toCamelCase(firstWordUpper?: boolean): string;
    /**
     * 将字符串转换为标题大写的字符串
     */
    toTitleCase(): string;
    /**
     * 将驼峰命名法的字符串转换为css属性格式的字符串。
     * @example backgroundColor => background-color
     */
    toCssName(): string;
    /**
     * 将字符串转换为带样式的字符串，用于控制台输出。
     * @param foreColor 前景色
     * @param backColor 背景色
     * @param styles 字符串的样式
     */
    toColorful(foreColor: ForeColor, backColor?: BackColor, ...styles: TextStyle[]): string;
    /**
     * 将字符串转换为带样式的字符串，用于控制台输出。
     * @param styles 要应用的前景色，背景色或样式集。
     */
    toColorful(...styles: (ForeColor | BackColor | TextStyle)[]): string
    /**
     * 移除字符串中的格式字符。
     */
    clearColurful(): string
    /**
     * 将字符串格式化为指定的格式
     * @param fmt 字符串的格式。
     */
    toFormat(fmt: "lower" | "upper" | "title" | "css" | "camel"): string
    /**
     * 将字符串格式化为指定的格式
     * @param fmt 字符串原型上定义的转换函数名称。该函数格式为 (fmt)=>string。
     */
    toFormat(fmt: string): string;
    /**
     * 获取字符串的显示宽度， 忽略字符串中应用的样式一个全角字符占2位，半角字符占1位。
     * @see {@link https://github.com/sindresorhus/string-width }
     */
    width(): number
}


if (!String.isNullOrEmpty) {
    String.isNullOrEmpty = (val: string) => !val;
}
if (!String.isNullOrWhiteSpace) {
    String.isNullOrWhiteSpace = (val: string) => !val || !(val.trim())
}
if (!String.format) {
    String.format = (fmt: string, ...args: any[]) => {
        if (String.isNullOrEmpty(fmt)) return fmt;
        let regex = /{([_a-zA-Z0-9]+)\s*(?:,\s*([\+-]?\d+)\s*)?((?:#\s*\w*\s*)+)?(?::((?:(?:\\})|[^}])*))?}/g
        return fmt.replace(regex, (substring: string, ...items: any[]) => {
            let [index, width, styles, format] = items;
            let value = /\d+/.test(index) ? args[index] : (args[0] ? args[0][index] : null);
            let formatText = formatValue(value, format);
            let styleText = styleString(formatText, styles);
            return widthString(styleText, Number(width));
        });
        function formatValue(value: any, format: string): string {
            if (value === null || value === undefined) return '';
            if (!format) return value.toString();
            let value_proto = Object.getPrototypeOf(value);
            let format_fun = value_proto['toFormat'];
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
                let length = text.width();
                if (length >= absWidth) return text;
                let padSpace = String.from(' ', absWidth - length);
                return width > 0 ? padSpace + text : text + padSpace;
            }
            return text;
        }
        function styleString(text: string, style: string): string {
            if (!style) return text;
            let styleItems = style.split('#').map(p => p.trim()).filter(p => p);
            return text.toColorful(...styleItems as any);
        }
    }
}
if (!String.from) {
    String.from = (value: string, count: number) => {
        let res = ""
        for (let i = 0; i < count; i++) {
            res += (value || '');
        }
        return res;
    }
}
if (!String.isFullwidthCode) {
    //https://github.com/sindresorhus/is-fullwidth-code-point/blob/master/index.js
    String.isFullwidthCode = function (codePoint: number): boolean {
        return (
            codePoint >= 0x1100 && (
                codePoint <= 0x115F || // Hangul Jamo
                codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
                codePoint === 0x232A || // RIGHT-POINTING ANGLE BRACKET
                // CJK Radicals Supplement .. Enclosed CJK Letters and Months
                (0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F) ||
                // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
                (0x3250 <= codePoint && codePoint <= 0x4DBF) ||
                // CJK Unified Ideographs .. Yi Radicals
                (0x4E00 <= codePoint && codePoint <= 0xA4C6) ||
                // Hangul Jamo Extended-A
                (0xA960 <= codePoint && codePoint <= 0xA97C) ||
                // Hangul Syllables
                (0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
                // CJK Compatibility Ideographs
                (0xF900 <= codePoint && codePoint <= 0xFAFF) ||
                // Vertical Forms
                (0xFE10 <= codePoint && codePoint <= 0xFE19) ||
                // CJK Compatibility Forms .. Small Form Variants
                (0xFE30 <= codePoint && codePoint <= 0xFE6B) ||
                // Halfwidth and Fullwidth Forms
                (0xFF01 <= codePoint && codePoint <= 0xFF60) ||
                (0xFFE0 <= codePoint && codePoint <= 0xFFE6) ||
                // Kana Supplement
                (0x1B000 <= codePoint && codePoint <= 0x1B001) ||
                // Enclosed Ideographic Supplement
                (0x1F200 <= codePoint && codePoint <= 0x1F251) ||
                // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
                (0x20000 <= codePoint && codePoint <= 0x3FFFD)
            )
        );
    }
}
if (!String.prototype.startsWithPattern) {
    String.prototype.startsWithPattern = function (pattern: RegExp) {
        if (!pattern) throw new Error('pattern can not be null.')
        if (pattern.source[0] === '^') {
            return pattern.test(this);
        } else {
            return new RegExp("^" + pattern.source).test(this);
        }
    }
}
if (!String.prototype.endsWithPattern) {
    String.prototype.endsWithPattern = function (pattern: RegExp) {
        if (!pattern) throw new Error('pattern can not be null.')
        if (pattern.source[pattern.source.length - 1] === '$') {
            return pattern.test(this);
        } else {
            return new RegExp(pattern.source + '$').test(this);
        }
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
if (!String.prototype.trimChars) {
    String.prototype.trimChars = function (chars: string): string {
        if (chars && chars.length > 0) {
            let charsSet = chars.split('').reduce((prev: { [key: string]: boolean }, curr) => {
                prev[curr] = true
                return prev;
            }, {});
            let [startIndex, endIndex] = [0, this.length - 1];
            while (startIndex <= endIndex && this[startIndex] in charsSet) startIndex++;
            while (endIndex >= startIndex && this[endIndex] in charsSet) endIndex--;
            return this.slice(startIndex, endIndex + 1);
        } else {
            return this.trim();
        }
    }
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (substr: string, newSubStr: string) {
        return String.isNullOrEmpty(substr) ? this : this.replace(new RegExp(substr, "gm"), newSubStr);
    }
}

if (!String.prototype.equals) {
    String.prototype.equals = function (other: string, ignoreCase = false) {
        if (ignoreCase && other) {
            return this.toLowerCase() === other.toLowerCase();
        } else {
            return this.valueOf() === other;
        }
    }
}
if (!String.prototype.contains) {
    String.prototype.contains = function (substr: string, ignoreCase = false) {
        if (substr === null || substr === undefined) return false;
        if (!ignoreCase) {
            return this.indexOf(substr) >= 0;
        } else {
            return this.toLowerCase().indexOf(substr.toLowerCase()) >= 0;
        }
    }
}
if (!String.prototype.reverse) {
    String.prototype.reverse = function () {
        return this.split('').reverse().join('');
    }
}
if (!String.prototype.toCharArrays) {
    String.prototype.toCharArrays = function () {
        return this.split('');
    }
}
if (!String.prototype.isLower) {
    String.prototype.isLower = function () {
        return /^[a-z]+$/.test(this);
    }
}
if (!String.prototype.isUpper) {
    String.prototype.isUpper = function () {
        return /^[A-Z]+$/g.test(this);
    }
}
if (!String.prototype.isSpace) {
    String.prototype.isSpace = function () {
        return /^\s+$/g.test(this);
    }
}
if (!String.prototype.isDigit) {
    String.prototype.isDigit = function () {
        return /^[0-9]+$/g.test(this);
    }
}
if (!String.prototype.isLowerOrDigit) {
    String.prototype.isLowerOrDigit = function () {
        return /^[a-z0-9]+$/g.test(this);
    }
}
if (!String.prototype.isUpperOrDigit) {
    String.prototype.isUpperOrDigit = function () {
        return /^[A-Z0-9]+$/g.test(this);
    }
}
if (!String.prototype.isAlpha) {
    String.prototype.isAlpha = function () {
        return /^[a-zA-Z]+$/g.test(this);
    }
}
if (!String.prototype.isAlphaOrDigit) {
    String.prototype.isAlphaOrDigit = function () {
        return /^[a-zA-Z0-9]+$/g.test(this);
    }
}
if (!String.prototype.isBoolean) {
    String.prototype.isBoolean = function () {
        let lower = this.toLowerCase();
        return lower === 'true' || lower === 'false';
    }
}
if (!String.prototype.isNumber) {
    String.prototype.isNumber = function () {
        let num = Number(this);
        return isFinite(num);
    }
}
if (!String.prototype.isPattern) {
    String.prototype.isPattern = function (pattern: RegExp): boolean {
        if (!pattern) throw new Error('pattern can not be null')
        return pattern.test(this);
    }
}

if (!String.prototype.isEmail) {
    String.prototype.isEmail = function () {
        const regTxt = "^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?$"
        return this.isPattern(new RegExp(regTxt));
    }
}
if (!String.prototype.isVarName) {
    String.prototype.isVarName = function () {
        const regTxt = "^[\$_a-zA-Z][\$_0-9a-zA-Z]*$"
        return this.isPattern(new RegExp(regTxt));
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
if (!String.prototype.htmlEncode) {
    (function () {
        const encode_map = {
            '\n': '<br>',
            '\r': '<br>',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            [String.fromCharCode(160)]: '&nbsp;'
        }
        String.prototype.htmlEncode = function (): string {
            return this.split('')
                .reduce((prev: string, ch: string) => prev + ((ch in encode_map) ? encode_map[ch] : ch)
                    , '');
        }
    })();
}
if (!String.prototype.htmlDocode) {

    (function () {
        const decode_map: { [key: string]: string } = {
            '<br>': '\n',
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&nbsp;': String.fromCharCode(160)
        }
        String.prototype.htmlDocode = function (): string {
            return Object.keys(decode_map).reduce((prev, key) => {
                return prev.replaceAll(key, decode_map[key]);
            }, this);
        }
    })()
}
if (!String.prototype.toCamelCase) {
    String.prototype.toCamelCase = function (firstWordUpper: boolean = false): string {
        return (this.match(/[a-zA-Z0-9]+/g) || []).map((value: string, index: number) => {
            let firstLetter = (index > 0 || firstWordUpper) ? value[0].toUpperCase() : value[0].toLowerCase();
            let leftLetters = value.slice(1);
            return firstLetter + leftLetters;
        }).join('');
    }
}
if (!String.prototype.toTitleCase) {
    String.prototype.toTitleCase = function (): string {
        return this.replace(/\w+/g, (word: string) => {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        });
    }
}
if (!String.prototype.toCssName) {
    String.prototype.toCssName = function (): string {
        let result: string = this.replace(/[A-Z]/g, (word: string) => {
            return '-' + word.toLowerCase();
        });
        return /^-/.test(result) ? result.slice(1) : result;
    }
}
if (!String.prototype.toColorful) {
    (function () {
        //参考 https://en.wikipedia.org/wiki/ANSI_escape_code
        const ALL_STYLES: { [key: string]: number[] } = {
            'bold': [1, 22],
            'faint': [2, 22],
            'italic': [3, 23],
            'underline': [4, 24],
            'inverse': [7, 27],
            'strikethrough': [9, 29],

            'black': [30, 39],
            'red': [31, 39],
            'green': [32, 39],
            'yellow': [33, 39],
            'blue': [34, 39],
            'magenta': [35, 39],
            'cyan': [36, 39],
            'white': [37, 39],

            'blackBright': [90, 39],
            'redBright': [91, 39],
            'greenBright': [92, 39],
            'yellowBright': [93, 39],
            'blueBright': [94, 39],
            'magentaBright': [95, 39],
            'cyanBright': [96, 39],
            'whiteBright': [97, 39],

            'bgBlack': [40, 49],
            'bgRed': [41, 49],
            'bgGreen': [42, 49],
            'bgYellow': [43, 49],
            'bgBlue': [44, 49],
            'bgMagenta': [45, 49],
            'bgCyan': [46, 49],
            'bgWhite': [47, 49],

            'bgBlackBright': [100, 49],
            'bgRedBright': [101, 49],
            'bgGreenBright': [102, 49],
            'bgYellowBright': [103, 49],
            'bgBlueBright': [104, 49],
            'bgMagentaBright': [105, 49],
            'bgCyanBright': [106, 49],
            'bgWhiteBright': [107, 49],
        }
        const AnsiCode = (code: number) => `\x1b[${code}m`;
        String.prototype.toColorful = function (...args: string[]) {
            let colorfulText = args.filter(p => p).reduce((prev, current) => {
                if (current in ALL_STYLES) {
                    let [before, after] = ALL_STYLES[current];
                    return `${AnsiCode(before)}${prev}${AnsiCode(after)}`;
                } else {
                    throw new Error(`invalid style name ${current}`)
                }
            }, this);
            return handleNestedStyles(colorfulText);
        }
        function handleNestedStyles(text: string) {
            let stackStyles: { [key: string]: string[] } = {
            }
            function push(key: string, value: string): void {
                if (key in stackStyles) {
                    stackStyles[key].push(value);
                } else {
                    stackStyles[key] = [value];
                }
            }
            function pop(key: string) {
                if (key in stackStyles) {
                    stackStyles[key].pop();
                }
            }
            function popThenLast(key: string): string {
                pop(key);
                if (key in stackStyles && stackStyles[key].length > 0) {
                    let len = stackStyles[key].length;
                    return stackStyles[key][len - 1];
                }
            }
            const beginHandlers: { [key: number]: () => void } = {
                1: () => push("weight", AnsiCode(1)),
                2: () => push("weight", AnsiCode(2)),
                3: () => push("italic", AnsiCode(3)),
                4: () => push("underline", AnsiCode(4)),
                7: () => push("inverse", AnsiCode(7)),
                9: () => push("strikethrough", AnsiCode(9)),

                30: () => push("forecolor", AnsiCode(30)),
                31: () => push("forecolor", AnsiCode(31)),
                32: () => push("forecolor", AnsiCode(32)),
                33: () => push("forecolor", AnsiCode(33)),
                34: () => push("forecolor", AnsiCode(34)),
                35: () => push("forecolor", AnsiCode(35)),
                36: () => push("forecolor", AnsiCode(36)),
                37: () => push("forecolor", AnsiCode(37)),

                90: () => push("forecolor", AnsiCode(90)),
                91: () => push("forecolor", AnsiCode(91)),
                92: () => push("forecolor", AnsiCode(92)),
                93: () => push("forecolor", AnsiCode(93)),
                94: () => push("forecolor", AnsiCode(94)),
                95: () => push("forecolor", AnsiCode(95)),
                96: () => push("forecolor", AnsiCode(96)),
                97: () => push("forecolor", AnsiCode(97)),
            }
            const endHandlers: { [key: number]: () => string } = {
                39: () => popThenLast("forecolor"),
                49: () => popThenLast("backcolor"),
                22: () => popThenLast("weight"),
                23: () => popThenLast("italic"),
                24: () => popThenLast("underline"),
                7: () => popThenLast("inverse"),
                29: () => popThenLast("strikethrough")
            }
            return text.replace(/\x1b\[(\d+)m/g, (sub, codeText) => {
                let code = parseInt(codeText);
                if (code in endHandlers) {
                    return endHandlers[code]() || sub;
                } else if (code in beginHandlers) {
                    beginHandlers[code]();
                    return sub;
                } else {
                    return sub;
                }
            });
        }
    })();
}
if (!String.prototype.clearColurful) {
    String.prototype.clearColurful = function (): string {
        return this.replace(/\x1b\[.+?m/g, '');
    }
}
if (!String.prototype.toFormat) {
    (function () {
        const funMaps: { [key: string]: string } = {
            lower: "toLowerCase",
            upper: "toUpperCase",
            title: "toTitleCase",
            css: "toCssName",
            camel: "toCamelCase",
        }
        String.prototype.toFormat = function (fmt?: string): string {
            if (!fmt) return this;
            let funName = fmt in funMaps ? funMaps[fmt] : fmt;
            let fun = this[funName];
            if (typeof fun === "function") {
                return String(fun.call(this));
            } else {
                throw new Error(`can not find function ${fmt} in String.prototype`);
            }
        }
    })();
}
if (!String.prototype.width) {
    (function () {
        String.prototype.width = function (): number {
            let replacedEmoji = replaceEmojiWithx(this);
            let ignoreEscape = clearAnsiEscape(replacedEmoji);
            //see https://github.com/sindresorhus/string-width/blob/master/index.js
            let width = 0;
            for (let i = 0; i < ignoreEscape.length; i++) {
                const code = getCodePoint(ignoreEscape, i);
                // Ignore control characters
                if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {
                    continue;
                }
                // Ignore combining characters
                if (code >= 0x300 && code <= 0x36F) {
                    continue;
                }
                // Surrogates
                if (code > 0xFFFF) {
                    i++;
                }
                width += String.isFullwidthCode(code) ? 2 : 1;
            }
            return width;
        }
        //https://github.com/chalk/ansi-regex/blob/master/index.js
        const AnsiPattern = [
            '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
            '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
        ].join('|');
        const AnsiReg = new RegExp(AnsiPattern, "g");
        function clearAnsiEscape(text: string): string {
            return text.replace(AnsiReg, '');
        }
        //https://github.com/mathiasbynens/emoji-regex/blob/master/index.js
        const EmojiReg = /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
        function replaceEmojiWithx(text: string): string {
            return text.replace(EmojiReg, "xx");
        }

        function getCodePoint(string: string, index: number): number {
            var size = string.length;
            // 第一个编码单元
            var first = string.charCodeAt(index);
            var second;
            if ( // 检查是否开始 surrogate pair
                first >= 0xD800 && first <= 0xDBFF && // high surrogate
                size > index + 1 // 下一个编码单元
            ) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
                    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
            }
            return first;
        };


    })();

}