interface Number {
    /**
     * 判断本数字是否在指定的两个数字之间，指定的两个数字可以不要求顺序。
     * @param val1 区间数字1。
     * @param val2 区间数字2。
     * @param includeEqual 是否包含区间的两个端点值。
     * @return 返回 true 表示在指定的数字之间，false 表示不在区间之内。
     */
    inRange(val1: number, val2: number, includeEqual?: boolean): boolean;
    /**
     * 将数字限定在指定的两个数字之间，指定的两个数字可以不要求顺序。
     * @param val1 区间数字1。
     * @param val2 区间数字2。
     * @returns 如果本数字小于两个区间数字的最小值，则取区间的最小值；如果本数字大于两个区间数字的最大值，则取区间的最大值，否则取本数字本身。
     */
    limitRange(val1: number, val2: number): number;
    /**
     * 格式化数字。
     * @param fmt 数字格式，由字母和数字组成，数字最大支持两位，支持的字母格式如下（d,e,f,g,n,p,r,x)\
     * d 表示格式化为正数；\
     * e 表示格式化为科学计数法（支持大写E,表示结果中的字符转为大写字符）；\
     * f 表示格式化为小数 ；\
     * g 表示格式化为紧凑的定点表示法或科学记数法（支持大写E,表示结果中的字符转为大写字符）；\
     * n 表示格式化为带千分位的数字表示法；\
     * p 表示格式化为百分数，其中数字部分使用千分位的数字表示法；\
     * r 表示格式化为可以往返至相同数字的字符串；\
     * x 表示格式化为十六进制的字符串，格式化前首先对数字取整（支持大写E,表示结果中的字符转为大写字符）；\
     * 
     * @returns 返回格式化后的数字。
     */
    format(fmt?: string): string;
}

if (!Number.prototype.inRange) {
    Number.prototype.inRange = function (val1: number, val2: number, includeEqual = true) {
        if (isNaN(val1) || isNaN(val2)) return false;
        return includeEqual ? ((val1 - this) * (val2 - this) <= 0) :
            ((val1 - this) * (val2 - this) < 0);
    }
}
if (!Number.prototype.limitRange) {
    Number.prototype.limitRange = function (val1: number, val2: number) {
        if (isNaN(this) || isNaN(val1) || isNaN(val2)) return this.valueOf();
        if (val1 === val2) return val1;
        let [min, max] = (val1 < val2) ? [val1, val2] : [val2, val1];
        if (this < min) return min;
        if (this > max) return max;
        return this.valueOf();
    }
}
if (!Number.prototype.format) {
    /*参考 https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/standard-numeric-format-strings*/
    Number.prototype.format = function (fmt:string="") {
        if (!fmt) return this.toString();
        let match = fmt.match(/^([DdEeFfGgNnPpRrXx])(\d{0,2})$/);
        if (!match) throw new Error(`Invalid format text "${fmt}"`);
        if (isNaN(this) || !isFinite(this)) return this.toString()
        let kind = match[1];
        let len = (match[2]) ? Number(match[2]) : NaN;
        if (kind === 'D' || kind === 'd') {
            return formatKindD(this, len);
        }
        if (kind === 'E' || kind === 'e') {
            return formatKindE(this, len, kind === 'E');
        }
        if (kind === 'F' || kind === 'f') {
            return formatKindF(this, len);
        }
        if (kind === 'G' || kind === 'g') {
            return formatKindG(this, len, kind === 'G');
        }
        if (kind === 'N' || kind === 'n') {
            return formatKindN(this, len);
        }
        if (kind === 'R' || kind === 'r') {
            return formatKindR(this, len);
        }
        if (kind === 'P' || kind === 'p') {
            return formatKindP(this, len);
        }
        if (kind === 'X' || kind === 'x') {
            return formatKindX(this, len, kind === 'X');
        }
        return this.toString();
        function formatKindD(value: number, len: number): string {
            let valueStr = value.toFixed(0);
            let numberLen = valueStr[0] === '-' ? valueStr.length - 1 : valueStr.length;
            if (isNaN(len) || numberLen >= len) return valueStr;
            if (valueStr[0] === '-') {
                return valueStr.slice(0, 1) + zeroString(len - numberLen) + valueStr.slice(1);
            } else {
                return zeroString(len - numberLen) + valueStr;
            }
        }
        function formatKindE(value: number, len: number, toUpper: boolean): string {
            let valueStr = isNaN(len) ? value.toExponential(6) : value.toExponential(len);
            return toUpper ? valueStr.toUpperCase() : valueStr;
        }
        function formatKindF(value: number, len: number): string {
            return isNaN(len) ? value.toFixed(2) : value.toFixed(len);
        }
        function formatKindG(value: number, len: number, toUpper: boolean): string {
            let valueStr = isNaN(len) ? value.toPrecision() : value.toPrecision(len);
            return toUpper ? valueStr.toUpperCase() : valueStr;
        }
        function formatKindN(value: number, len: number): string {
            return formatKindF(value, len).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
        }
        function formatKindR(value: number, len: number): string {
            return value.toString();
        }
        function formatKindP(value: number, len: number): string {
            return `${formatKindN(value * 100, len)}%`
        }
        function formatKindX(value: number, len: number, toUpper: boolean): string {
            let valueStr = Math.round(value).toString(16);
            let numberLen = valueStr[0] === '-' ? valueStr.length - 1 : valueStr.length;
            if (isNaN(len) || numberLen >= len) return toUpper ? valueStr.toUpperCase() : valueStr;
            if (valueStr[0] === '-') {
                valueStr = valueStr.slice(0, 1) + zeroString(len - numberLen) + valueStr.slice(1);
            } else {
                valueStr = zeroString(len - numberLen) + valueStr;
            }
            return toUpper ? valueStr.toUpperCase() : valueStr;
        }
        function zeroString(len: number) {
            return new Array(len + 1).join('0');
        }
    }

}