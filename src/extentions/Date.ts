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
    Date.prototype.toFormat = function (fmt: string=""): string {
        function padStart(str: string, length: number, pad: string): string {
            if (!str || str.length >= length) return str;
            return `${Array((length + 1) - str.length).join(pad)}${str}`
        }
        const weeks: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            timeZone: number = this.getTimezoneOffset() / 60,
            timeZoneString: string = padStart(String(timeZone * -1).replace(/^(.)?(\d)/, '$10$200'), 5, '+'),
            mYear: number = this.getFullYear(),
            mMonth: number = this.getMonth(),
            mDay: number = this.getDate(),
            mWeek: number = this.getDay(),
            mHour: number = this.getHours(),
            mMinute: number = this.getMinutes(),
            mSecond: number = this.getSeconds()
        return fmt.replace(/Y{2,4}|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|Z{1}/ig, (match) => {
            switch (match) {
                case 'YYYY':
                case 'yyyy':
                    return String(mYear)
                case 'MM':
                    return padStart(String(mMonth + 1), 2, '0')
                case 'DD':
                case 'dd':
                    return padStart(String(mDay), 2, '0')
                case 'HH':
                case 'hh':
                    return padStart(String(mHour), 2, '0')
                case 'mm':
                    return padStart(String(mMinute), 2, '0')
                case 'ss':
                    return padStart(String(mSecond), 2, '0')
                case 'Z':
                    return `${timeZoneString.slice(0, -2)}:00`
                default: {
                    new Error(`${match} is not a valid format`)
                    return match
                }
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