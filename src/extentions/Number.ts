/// <reference path="Number.d.ts" />

if (!Number.prototype.isBetween) {
    Number.prototype.isBetween = function (val1, val2) {
        if (isNaN(val1) || isNaN(val2)) return false;
        return (val1 - this) * (val2 - this) <= 0;
    }
}
if (!Number.prototype.limitRange) {
    Number.prototype.limitRange = function (min, max) {
        if (this < min) return min;
        if (this > max) return max;
        return this;
    }
}
if (!Number.prototype.format) {
    Number.prototype.format = function (fmt?) {
        if (!fmt) return this.toString();
        // https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/standard-numeric-format-strings
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
            return formatKindG(this, len);
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
            if (isNaN(len) || valueStr.length >= len) return valueStr;
            if (valueStr[0] === '-') {
                return valueStr.slice(0, 1) + zeroString(len - valueStr.length) + valueStr.slice(1);
            }
            {
                return zeroString(len - valueStr.length) + valueStr;
            }
        }
        function formatKindE(value: number, len: number, toUpper: boolean): string {
            let valueStr = isNaN(len) ? value.toExponential(6) : value.toExponential(len);
            return toUpper ? valueStr.toUpperCase() : valueStr;
        }
        function formatKindF(value: number, len: number): string {
            return isNaN(len) ? value.toFixed(2) : value.toFixed(len);
        }
        function formatKindG(value: number, len: number): string {
            return isNaN(len) ? value.toPrecision() : value.toPrecision(len);
        }
        function formatKindN(value: number, len: number): string {
            return formatKindF(value, len).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
        function formatKindR(value: number, len: number): string {
            let valueStr = value.toString();
            if (isNaN(len) || valueStr.length >= len) return valueStr;
            if (valueStr[0] === '-') {
                return valueStr.slice(0, 1) + zeroString(len - valueStr.length) + valueStr.slice(1);
            }
            {
                return zeroString(len - valueStr.length) + valueStr;
            }
        }
        function formatKindP(value: number, len: number): string {
            return `{formatKindF(value*100,len)} %`
        }
        function formatKindX(value: number, len: number, toUpper: boolean): string {
            let valueStr = Math.round(value).toString(16);
            if (valueStr[0] === '-') {
                valueStr = valueStr.slice(0, 1) + zeroString(len - valueStr.length) + valueStr.slice(1);
            }
            {
                valueStr = zeroString(len - valueStr.length) + valueStr;
            }
            return toUpper ? valueStr.toUpperCase() : valueStr;
        }
        function zeroString(len: number) {
            let res = ''
            for (let i = 0; i < len; i++) {
                res += '0';
            }
            return res;
        }
    }

}