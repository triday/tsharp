import "../../src/index";

import { describe, it, expect } from 'vitest';

function padZero(text: string, length: number): string {
    if (text.length < length) {
        let padText = new Array(length - text.length + 1).join('0');
        return `${padText}${text}`;
    } else {
        return text;
    }
}
describe('Date', () => {

    describe('toFormat', () => {
        //const date = new Date("2019-04-02T09:03:04.089Z");
        describe("year", () => {
            let date = new Date();
            let year = String(date.getFullYear());
            let utcyear = String(date.getUTCFullYear());
            it("local", () => {
                expect(date.toFormat("Y")).toBe(year.slice(-1));
                expect(date.toFormat("YY")).toBe(year.slice(-2));
                expect(date.toFormat("YYY")).toBe(year.slice(-3));
                expect(date.toFormat("YYYY")).toBe(year.slice(-4));
                expect(date.toFormat("YYYYY")).toBe(year.slice(-4));

                expect(date.toFormat("y")).toBe(year.slice(-1));
                expect(date.toFormat("yy")).toBe(year.slice(-2));
                expect(date.toFormat("yyy")).toBe(year.slice(-3));
                expect(date.toFormat("yyyy")).toBe(year.slice(-4));
                expect(date.toFormat("yyyyy")).toBe(year.slice(-4));

                expect(date.toFormat("yYyYYyy")).toBe(year.slice(-4));
            });
            it("utc", () => {
                expect(date.toFormat("[utc]Y")).toBe(utcyear.slice(-1));
                expect(date.toFormat("[utc]YY")).toBe(utcyear.slice(-2));
                expect(date.toFormat("[utc]YYY")).toBe(utcyear.slice(-3));
                expect(date.toFormat("[utc]YYYY")).toBe(utcyear.slice(-4));
                expect(date.toFormat("[utc]YYYYY")).toBe(utcyear.slice(-4));

                expect(date.toFormat("[utc]y")).toBe(utcyear.slice(-1));
                expect(date.toFormat("[utc]yy")).toBe(utcyear.slice(-2));
                expect(date.toFormat("[utc]yyy")).toBe(utcyear.slice(-3));
                expect(date.toFormat("[utc]yyyy")).toBe(utcyear.slice(-4));
                expect(date.toFormat("[utc]yyyyy")).toBe(utcyear.slice(-4));

                expect(date.toFormat("[utc]yYyYYyy")).toBe(utcyear.slice(-4));
            });

        })

        describe("month", () => {
            let date = new Date();
            let month = String(date.getMonth()+1);
            let utcmonth = String(date.getUTCMonth()+1);
            it("local", function () {
                expect(date.toFormat("M")).toBe(month);
                expect(date.toFormat("MM")).toBe(padZero(month, 2));
                expect(date.toFormat("MMM")).toBe(padZero(month, 2));
                expect(date.toFormat("MMMM")).toBe(padZero(month, 2));
            });
            it("utc", function () {
                expect(date.toFormat("[utc]M")).toBe(utcmonth);
                expect(date.toFormat("[utc]MM")).toBe(padZero(utcmonth, 2));
                expect(date.toFormat("[utc]MMM")).toBe(padZero(utcmonth, 2));
                expect(date.toFormat("[utc]MMMM")).toBe(padZero(utcmonth, 2));
            })

        })
        describe("day", () => {
            let date = new Date();
            let day = String(date.getDate());
            let utcday = String(date.getUTCDate());
            it("local", function () {
                expect(date.toFormat("D")).toBe(day);
                expect(date.toFormat("DD")).toBe(padZero(day, 2));
                expect(date.toFormat("DDD")).toBe(padZero(day, 2));
                expect(date.toFormat("DDDD")).toBe(padZero(day, 2));

                expect(date.toFormat("d")).toBe(day);
                expect(date.toFormat("dd")).toBe(padZero(day, 2));
                expect(date.toFormat("ddd")).toBe(padZero(day, 2));
                expect(date.toFormat("dddd")).toBe(padZero(day, 2));
                expect(date.toFormat("dDdDd")).toBe(padZero(day, 2));
            });
            it("utc", function () {
                expect(date.toFormat("[utc]D")).toBe(utcday);
                expect(date.toFormat("[utc]DD")).toBe(padZero(utcday, 2));
                expect(date.toFormat("[utc]DDD")).toBe(padZero(utcday, 2));
                expect(date.toFormat("[utc]DDDD")).toBe(padZero(utcday, 2));

                expect(date.toFormat("[utc]d")).toBe(utcday);
                expect(date.toFormat("[utc]dd")).toBe(padZero(utcday, 2));
                expect(date.toFormat("[utc]ddd")).toBe(padZero(utcday, 2));
                expect(date.toFormat("[utc]dddd")).toBe(padZero(utcday, 2));
                expect(date.toFormat("[utc]dDdDd")).toBe(padZero(utcday, 2));
            });

        })
        describe("hour", () => {
            let date = new Date();
            let hour = String(date.getHours());
            let hour12=String(date.getHours()%12);
            let utchour = String(date.getUTCHours());
            let utchour12=String(date.getUTCHours()%12);
            it("locale",function(){
                expect(date.toFormat("H")).toBe(hour);
                expect(date.toFormat("HH")).toBe(padZero(hour, 2));
                expect(date.toFormat("HHH")).toBe(padZero(hour, 2));
                expect(date.toFormat("HHH")).toBe(padZero(hour, 2));

                expect(date.toFormat("h")).toBe(hour12);
                expect(date.toFormat("hh")).toBe(padZero(hour12, 2));
                expect(date.toFormat("hhh")).toBe(padZero(hour12, 2));
                expect(date.toFormat("hhhh")).toBe(padZero(hour12, 2));
            });
            it("utc",function(){
                expect(date.toFormat("[utc]H")).toBe(utchour);
                expect(date.toFormat("[utc]HH")).toBe(padZero(utchour, 2));
                expect(date.toFormat("[utc]HHH")).toBe(padZero(utchour, 2));
                expect(date.toFormat("[utc]HHH")).toBe(padZero(utchour, 2));
                expect(date.toFormat("[utc]h")).toBe(utchour12);
                expect(date.toFormat("[utc]hh")).toBe(padZero(utchour12, 2));
                expect(date.toFormat("[utc]hhh")).toBe(padZero(utchour12, 2));
                expect(date.toFormat("[utc]hhhh")).toBe(padZero(utchour12, 2));
            });
        })
        describe("minute", () => {

            let date = new Date();
            let minute = String(date.getMinutes());
            let utcminute=String(date.getUTCMinutes());
            it("locale",function(){
                expect(date.toFormat("m")).toBe(minute);
                expect(date.toFormat("mm")).toBe(padZero(minute,2));
                expect(date.toFormat("mmm")).toBe(padZero(minute,2));
            });
            it("utc",function(){

                expect(date.toFormat("[utc]m")).toBe(utcminute);
                expect(date.toFormat("[utc]mm")).toBe(padZero(utcminute,2));
                expect(date.toFormat("[utc]mmm")).toBe(padZero(utcminute,2));
            })

        })
        describe("second", () => {
            let date = new Date();
            let second = String(date.getSeconds());
            let utcsecond = String(date.getUTCSeconds());
            it("locale", function () {
                expect(date.toFormat("S")).toBe(second);
                expect(date.toFormat("SS")).toBe(padZero(second, 2));
                expect(date.toFormat("SSS")).toBe(padZero(second, 2));

                expect(date.toFormat("s")).toBe(second);
                expect(date.toFormat("ss")).toBe(padZero(second, 2));
                expect(date.toFormat("sss")).toBe(padZero(second, 2));
                expect(date.toFormat("sSsSs")).toBe(padZero(second, 2));
            });
            it("utc", function () {
                expect(date.toFormat("[utc]S")).toBe(utcsecond);
                expect(date.toFormat("[utc]SS")).toBe(padZero(utcsecond, 2));
                expect(date.toFormat("[utc]SSS")).toBe(padZero(utcsecond, 2));
                expect(date.toFormat("[utc]s")).toBe(utcsecond);
                expect(date.toFormat("[utc]ss")).toBe(padZero(utcsecond, 2));
                expect(date.toFormat("[utc]sss")).toBe(padZero(utcsecond, 2));
                expect(date.toFormat("[utc]sSsSs")).toBe(padZero(utcsecond, 2));
            });
        })
        describe("milliseconds", function () {
            let date = new Date();
            let milliseconds = date.getMilliseconds() / 1000;
            let utcmilliseconds = date.getUTCMilliseconds() / 1000;
            it("locale", function () {
                expect(date.toFormat("0.F")).toBe(milliseconds.toFixed(1));
                expect(date.toFormat("0.FF")).toBe(milliseconds.toFixed(2));
                expect(date.toFormat("0.FFF")).toBe(milliseconds.toFixed(3));
                expect(date.toFormat("0.FFFF")).toBe(milliseconds.toFixed(3));
                expect(date.toFormat("0.f")).toBe(milliseconds.toFixed(1));
                expect(date.toFormat("0.ff")).toBe(milliseconds.toFixed(2));
                expect(date.toFormat("0.fff")).toBe(milliseconds.toFixed(3));
                expect(date.toFormat("0.fFfFfF")).toBe(milliseconds.toFixed(3));

            });
            it("utc", function () {
                expect(date.toFormat("[UTC]0.F")).toBe(utcmilliseconds.toFixed(1));
                expect(date.toFormat("[UTC]0.FF")).toBe(utcmilliseconds.toFixed(2));
                expect(date.toFormat("[UTC]0.FFF")).toBe(utcmilliseconds.toFixed(3));
                expect(date.toFormat("[UTC]0.FFFF")).toBe(utcmilliseconds.toFixed(3));
                expect(date.toFormat("[UTC]0.f")).toBe(utcmilliseconds.toFixed(1));
                expect(date.toFormat("[UTC]0.ff")).toBe(utcmilliseconds.toFixed(2));
                expect(date.toFormat("[UTC]0.fff")).toBe(utcmilliseconds.toFixed(3));
                expect(date.toFormat("[UTC]0.fFfFfF")).toBe(utcmilliseconds.toFixed(3));

            });

        })
        describe("timeZone", function () {
            let date = new Date();
            it("locale", function () {
                if (date.getTimezoneOffset() === -480) {
                    expect(date.toFormat("Z")).toBe("+8");
                    expect(date.toFormat("ZZ")).toBe("+08");
                    expect(date.toFormat("ZZZ")).toBe("+08:00");
                    expect(date.toFormat("ZZZZ")).toBe("+08:00");
                    expect(date.toFormat("z")).toBe("+8");
                    expect(date.toFormat("zz")).toBe("+08");
                    expect(date.toFormat("zzz")).toBe("+08:00");
                    expect(date.toFormat("zZzZz")).toBe("+08:00");
                }

            });

            it("utc", function () {
                expect(date.toFormat("[UTC]Z")).toBe("+0");
                expect(date.toFormat("[UTC]ZZ")).toBe("+00");
                expect(date.toFormat("[UTC]ZZZ")).toBe("+00:00");
            })


        });
        describe("all", function(){
            let date = new Date();
            it("locale",function(){
                let year=date.getFullYear();
                let month=date.getMonth()+1;
                let day=date.getDate();
                let hour=date.getHours();
                let min=date.getMinutes();
                let sec=date.getSeconds();
                expect(date.toFormat("yyyyMd H:m:s")).toBe(`${year}${month}${day} ${hour}:${min}:${sec}`);
            });
            it("utc",function(){
                let year=date.getUTCFullYear();
                let month=date.getUTCMonth()+1;
                let day=date.getUTCDate();
                let hour=date.getUTCHours();
                let min=date.getUTCMinutes();
                let sec=date.getUTCSeconds();
                expect(date.toFormat("yyyyMd H:m:s[utc]").replace('[utc]', '')).toBe(`${year}${month}${day} ${hour}:${min}:${sec}`);
            });
        });

        it("escape",function(){
            let date = new Date("2019-04-03T12:23:45.119Z");
            expect(date.toFormat("[utc]yyyy-MM-ddTHH:mm:ss.fffZ")).toBe("2019-04-03T12:23:45.119+0");
            expect(date.toFormat("[utc]yyyy-MM-ddTHH:mm:ss.fff%Z")).toBe("2019-04-03T12:23:45.119Z");
        })
    });
    describe("equals", () => {
        it("equals works ok", () => {
            let date1 = new Date("2018-11-4");
            let date2 = new Date("2018-11-4");
            expect(date1 === date2).toBe(false);
            expect(date1 == date2).toBe(false);
            expect(date1.equals(date2)).toBe(true);
            expect(date1.equals(new Date())).toBe(false);
        })
    });
    describe("clone", () => {
        it('clone works ok', () => {
            const time = new Date('2018-11-11 12:36:45');
            expect(time === time.clone()).toBe(false);
            expect(time.equals(time.clone())).toBe(true);
        })
    });
})