interface Date {
    /**
     * 格式化日期。
     * @param fmt 日期格式 。
     * @returns 返回格式化后的日期。
     */
    toFormat(fmt: string): string;

    /**
     * 将该时间日期和特定的时间日期对象做比较，如果所表示的时间日期相同则返回true，否则返回false。
     * @param other 要进行比较的日期。
     * @returns 如果两个时间日期的所表示的值相同则返回true，否则返回false。 
     */
    equals(other: Date): boolean;
    /**
     * 克隆当前日期。
     * @returns 返回当前日期的副本。
     */
    clone(): Date;
}

if (!Date.prototype.toFormat) {
    Date.prototype.toFormat = function (fmt: string = ""): string {
        function padStart(str: string, length: number, pad: string): string {
            if (!str || str.length >= length) return str;
            return `${Array((length + 1) - str.length).join(pad)}${str}`
        }
        function padStartZero(str: string, length: number): string {
            return padStart(str, length, '0');
        }
        let isUTC = false,
            me: Date = this;
        //https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.7.2


        function formatYear(len: number, maxLength = 4): string {
            let year = isUTC ? me.getUTCFullYear() : me.getFullYear();
            return padStartZero(year.toString(), Math.min(len, maxLength)).slice(-len);
        }
        function formatMonth(len: number, maxLength = 2): string {
            let month = isUTC ? me.getUTCMonth() + 1 : me.getMonth() + 1;
            return padStartZero(String(month), Math.min(len, maxLength));
        }
        function formatDay(len: number, maxLength = 2): string {
            let day = isUTC ? me.getUTCDate() : me.getDate();
            return padStartZero(String(day), Math.min(len, maxLength));
        }
        function formatHour12(len: number, maxLength = 2): string {
            let hour = isUTC ? me.getUTCHours() % 12 : me.getHours() % 12;
            return padStartZero(String(hour), Math.min(len, maxLength));
        }
        function formatHour24(len: number, maxLength = 2): string {
            let hour = isUTC ? me.getUTCHours() : me.getHours();
            return padStartZero(String(hour), Math.min(len, maxLength));
        }
        function formatMinute(len: number, maxLength = 2): string {
            let minute = isUTC ? me.getUTCMinutes() : me.getMinutes();
            return padStartZero(String(minute), Math.min(len, maxLength));
        }
        function formatSecond(len: number, maxLength = 2): string {
            let second = isUTC ? me.getUTCSeconds() : me.getSeconds();
            return padStartZero(String(second), Math.min(len, maxLength));
        }
        function formatMiliSecond(len: number, maxLength = 3): string {
            let miniSecond = isUTC ? me.getUTCMilliseconds() : me.getMilliseconds();
            let resultLen = Math.min(len, maxLength);
            let partValue = Math.round(miniSecond / 1000 * Math.pow(10, resultLen))
            return padStartZero(String(partValue), resultLen);
        }
        function formatTimeZone(len: number, maxLength = 3): string {
            let resultLen = Math.min(len, maxLength);
            let timeZoneOffset = isUTC ? 0 : me.getTimezoneOffset();
            let sign = timeZoneOffset > 0 ? '-' : '+'
            let hour = Math.floor(Math.abs(timeZoneOffset) / 60);
            let min = Math.abs(timeZoneOffset) % 60;
            switch (resultLen) {
                case 1:
                    return `${sign}${hour}`;
                case 2:
                    return `${sign}${padStartZero(String(hour), 2)}`;
                default:
                    return `${sign}${padStartZero(String(hour), 2)}:${padStartZero(String(min), 2)}`
            }

        }
        let trimfmt = fmt.replace(/\[utc\]/ig, (match) => {
            isUTC = match.toLowerCase() === "[utc]";
            return ''
        });

        return trimfmt.replace(/%?([Yy]+|M+|[Dd]+|H+|h+|m+|[Ss]+|[Ff]+|[Zz]+)/g, (match) => {
            if (match[0] === '%') return match.slice(1);
            const code = match[0];
            const len = match.length;
            switch (code) {
                case 'y':
                case 'Y':
                    return formatYear(len);
                case 'M':
                    return formatMonth(len);
                case 'd':
                case 'D':
                    return formatDay(len);
                case 'H':
                    return formatHour24(len);
                case 'h':
                    return formatHour12(len);
                case 'm':
                    return formatMinute(len);
                case 's':
                case 'S':
                    return formatSecond(len);
                case 'f':
                case 'F':
                    return formatMiliSecond(len);
                case 'z':
                case 'Z':
                    return formatTimeZone(len)
            }
        })
    };
}
if (!Date.prototype.equals) {
    Date.prototype.equals = function (other: any): boolean {
        return other && this.valueOf() === other.valueOf();
    }
}
if (!Date.prototype.clone) {
    Date.prototype.clone = function () {
        return new Date(this.valueOf());
    }
}