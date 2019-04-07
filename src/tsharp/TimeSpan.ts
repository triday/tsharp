/// <reference path="../extentions/Number.ts" />
namespace tsharp {
    export class TimeSpan {

        static DEFAULT_FORMAT: string = "d.HH:mm:ss.fff";
        constructor(totalMilliseconds: number = 0) {
            this._value = isNaN(totalMilliseconds) ? 0 : totalMilliseconds;
        }

        private _value: number;

        public get TotalMilliseconds(): number {
            return this._value;
        }
        public get TotalSeconds(): number {
            return this.TotalMilliseconds / 1000;
        }
        public get TotalMinutes(): number {
            return this.TotalSeconds / 60;
        }
        public get TotalHours(): number {
            return this.TotalMinutes / 60;
        }
        public get TotalDays(): number {
            return this.TotalHours / 24;
        }

        public get Milliseconds(): number {
            return Math.floor(this.TotalMilliseconds % 1000);
        }
        public get Seconds(): number {
            return Math.floor(this.TotalSeconds % 60);
        }
        public get Minutes(): number {
            return Math.floor(this.TotalMinutes % 60);
        }
        public get Hours(): number {
            return Math.floor(this.TotalHours % 24);
        }
        public get Days(): number {
            return Math.floor(this.TotalDays);
        }


        public addMilliseconds(milliseconds: number): TimeSpan {
            this._value = this._value + (isNaN(milliseconds) ? 0 : milliseconds);
            return this;
        }
        public addSeconds(seconds: number): TimeSpan {
            return this.addMilliseconds(seconds * 1000);
        }
        public addMinutes(minutes: number): TimeSpan {
            return this.addSeconds(minutes * 60);
        }
        public addHours(hours: number): TimeSpan {
            return this.addMinutes(hours * 60);
        }
        public addDays(days: number): TimeSpan {
            return this.addHours(days * 24);
        }

        public format(fmt: string = TimeSpan.DEFAULT_FORMAT) {
            return fmt.replace(/d{1,8}|h{1,2}|m{1,2}|s{1,2}|f{1,3}/ig, (match) => {
                let len = match.length;
                switch (match[0].toLowerCase()) {
                    case 'd':
                        return this.Days.toFormat(`d${len}`);
                    case 'h':
                        return this.Hours.toFormat(`d${len}`);
                    case 'm':
                        return this.Minutes.toFormat(`d${len}`);
                    case 's':
                        return this.Seconds.toFormat(`d${len}`);
                    case 'f':
                        return (this.Milliseconds / 1000).toFormat(`f${len}`).slice(2, 2 + len);

                }
            });
        }
        public toString(): string {
            return this.format(TimeSpan.DEFAULT_FORMAT);
        }
        public valueOf():number{
            return this._value;
        }
        public equals(other: TimeSpan): boolean {
            return other && this._value === other._value;
        }
    }
}

interface Date {
    /**
     * 对比与指定日期的天数差。
     * @param other 要对比的日期。
     * @returns 返回一个数字，该数字表示与对比日期的时间差。
     */
    diff(other: Date): tsharp.TimeSpan;
}
if (!Date.prototype.diff) {
    Date.prototype.diff = function (other: any): tsharp.TimeSpan {
        return new tsharp.TimeSpan((this - other) as number);
    }
}