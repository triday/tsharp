/// <reference path="./Date.d.ts" />

function padStart(string: string, length: number, pad: string): string {
    if (!string || string.length >= length) return string
    return `${Array((length + 1) - string.length).join(pad)}${string}`
}
Date.prototype.format = function (mask: string): string {
    const weeks:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          timeZone:number = this.date.getTimezoneOffset() / 60,
          timeZoneString:string = padStart(String(timeZone * -1).replace(/^(.)?(\d)/, '$10$200'), 5, '+'),
          mYear: number = this.getFullYear(),
          mMonth: number = this.getMonth(),
          mDay: number = this.getDate(),
          mWeek: number = this.getDay(),
          mHour: number = this.getHours(),
          mMinute: number = this.getMinutes(),
          mSecond: number = this.getSeconds()
    return mask.replace(/Y{2,4}|M{1,2}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}|Z{1,2}/g, (match) => {
        switch (match) {
            case 'YY':
                return String(mYear).slice(-2)
            case 'YYYY':
                return String(mYear)
            case 'M':
                return String(mMonth + 1)
            case 'MM':
                return padStart(String(mMonth + 1), 2, '0')
            case 'D':
                return String(mDay)
            case 'DD':
                return padStart(String(mDay), 2, '0')
            case 'd':
                return String(mWeek)
            case 'dddd':
                return weeks[mWeek]
            case 'H':
                return String(mHour)
            case 'HH':
                return padStart(String(mHour), 2, '0')
            case 'm':
                return String(mMinute)
            case 'mm':
                return padStart(String(mMinute), 2, '0')
            case 's':
                return String(mSecond)
            case 'ss':
                return padStart(String(mSecond), 2, '0')
            case 'Z':
                return `${timeZoneString.slice(0, -2)}:00`
            case 'ZZ':
                return timeZoneString
            default:
                return match
        }
    })
};