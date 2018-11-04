interface Date {
    /**
     * 格式化日期。
     * @param fmt 日期格式 。
     * @returns 返回格式化后的日期。
     */
    format(fmt?: string): string;

    equals(other: Date): boolean;
}

if (!Date.prototype.format) {
    Date.prototype.format = function (mask: string): string {
        function padStart(str: string, length: number, pad: string): string {
            if (!str || str.length >= length) return str
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
        return mask.replace(/Y{4}|M{2}|D{2}|T|H{2}|m{2}|s{2}|Z{1}/g, (match) => {
            switch (match) {
                case 'YYYY':
                case 'yyyy':
                    return String(mYear)
                case 'MM':
                    return padStart(String(mMonth + 1), 2, '0')
                case 'DD':
                    return padStart(String(mDay), 2, '0')
                case 'HH':
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
        return (this - other) === 0
    }
}