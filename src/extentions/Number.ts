/// <reference path="Number.d.ts" />

if (!Number.prototype.isBetween) {
    Number.prototype.isBetween = function (val1, val2, includeEqual = true) {
        if (isNaN(val1) || isNaN(val2)) return false;
        return includeEqual ? ((val1 - this) * (val2 - this) <= 0) :
            ((val1 - this) * (val2 - this) < 0);
    }
}
if (!Number.prototype.limitRange) {
    Number.prototype.limitRange = function (val1, val2) {
        if (isNaN(this) || isNaN(val1) || isNaN(val2)) return this;
        if (val1 === val2) return val1;
        let [min, max] = (val1 < val2) ? [val1, val2] : [val2, val1];
        if (this < min) return min;
        if (this > max) return max;
        return this;
    }
}
if (!Number.prototype.format) {
    /*参考 https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/standard-numeric-format-strings*/
    Number.prototype.format = function (fmt?) {
        if (!fmt) return this.toString();
        let match = fmt.match(/^([DdEeFfGgNnPpRrXx])(\d{0,2})$/);
        if (!match) throw new Error('Invalid format text');
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