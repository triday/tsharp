/// <reference path="./Date.d.ts" />

Date.prototype.format = function (mask: string): string {
    const weeks:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          timeZone:number = this.getTimezoneOffset() / 60,
          timeZoneString:string = String(timeZone * -1).replace(/^(.)?(\d)/, '$10$200').padStart(5, '+'),
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
                return String(mYear)
            case 'MM':
                return String(mMonth + 1).padStart( 2, '0')
            case 'DD':
                return String(mDay).padStart( 2, '0')
            case 'HH':
                return String(mHour).padStart( 2, '0')
            case 'mm':
                return String(mMinute).padStart( 2, '0')
            case 'ss':
                return String(mSecond).padStart( 2, '0')
            case 'Z':
                return `${timeZoneString.slice(0, -2)}:00`
            default:{
                new Error('date format error')
                return match
            }
        }
    })
};