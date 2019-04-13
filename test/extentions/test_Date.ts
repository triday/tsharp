import "../../src/index";

import "mocha";
import * as assert from "assert"

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
                assert.equal(date.toFormat("Y"), year.slice(-1));
                assert.equal(date.toFormat("YY"), year.slice(-2));
                assert.equal(date.toFormat("YYY"), year.slice(-3));
                assert.equal(date.toFormat("YYYY"), year.slice(-4));
                assert.equal(date.toFormat("YYYYY"), year.slice(-4));

                assert.equal(date.toFormat("y"), year.slice(-1));
                assert.equal(date.toFormat("yy"), year.slice(-2));
                assert.equal(date.toFormat("yyy"), year.slice(-3));
                assert.equal(date.toFormat("yyyy"), year.slice(-4));
                assert.equal(date.toFormat("yyyyy"), year.slice(-4));

                assert.equal(date.toFormat("yYyYYyy"), year.slice(-4));
            });
            it("utc", () => {
                assert.equal(date.toFormat("[utc]Y"), utcyear.slice(-1));
                assert.equal(date.toFormat("[utc]YY"), utcyear.slice(-2));
                assert.equal(date.toFormat("[utc]YYY"), utcyear.slice(-3));
                assert.equal(date.toFormat("[utc]YYYY"), utcyear.slice(-4));
                assert.equal(date.toFormat("[utc]YYYYY"), utcyear.slice(-4));

                assert.equal(date.toFormat("[utc]y"), utcyear.slice(-1));
                assert.equal(date.toFormat("[utc]yy"), utcyear.slice(-2));
                assert.equal(date.toFormat("[utc]yyy"), utcyear.slice(-3));
                assert.equal(date.toFormat("[utc]yyyy"), utcyear.slice(-4));
                assert.equal(date.toFormat("[utc]yyyyy"), utcyear.slice(-4));

                assert.equal(date.toFormat("[utc]yYyYYyy"), utcyear.slice(-4));
            });

        })

        describe("month", () => {
            let date = new Date();
            let month = String(date.getMonth()+1);
            let utcmonth = String(date.getUTCMonth()+1);
            it("local", function () {
                assert.equal(date.toFormat("M"), month);
                assert.equal(date.toFormat("MM"), padZero(month, 2));
                assert.equal(date.toFormat("MMM"), padZero(month, 2));
                assert.equal(date.toFormat("MMMM"), padZero(month, 2));
            });
            it("utc", function () {
                assert.equal(date.toFormat("[utc]M"), utcmonth);
                assert.equal(date.toFormat("[utc]MM"), padZero(utcmonth, 2));
                assert.equal(date.toFormat("[utc]MMM"), padZero(utcmonth, 2));
                assert.equal(date.toFormat("[utc]MMMM"), padZero(utcmonth, 2));
            })

        })
        describe("day", () => {
            let date = new Date();
            let day = String(date.getDate());
            let utcday = String(date.getUTCDate());
            it("local", function () {
                assert.equal(date.toFormat("D"), day);
                assert.equal(date.toFormat("DD"), padZero(day, 2));
                assert.equal(date.toFormat("DDD"), padZero(day, 2));
                assert.equal(date.toFormat("DDDD"), padZero(day, 2));

                assert.equal(date.toFormat("d"), day);
                assert.equal(date.toFormat("dd"), padZero(day, 2));
                assert.equal(date.toFormat("ddd"), padZero(day, 2));
                assert.equal(date.toFormat("dddd"), padZero(day, 2));
                assert.equal(date.toFormat("dDdDd"), padZero(day, 2));
            });
            it("utc", function () {
                assert.equal(date.toFormat("[utc]D"), utcday);
                assert.equal(date.toFormat("[utc]DD"), padZero(utcday, 2));
                assert.equal(date.toFormat("[utc]DDD"), padZero(utcday, 2));
                assert.equal(date.toFormat("[utc]DDDD"), padZero(utcday, 2));

                assert.equal(date.toFormat("[utc]d"), utcday);
                assert.equal(date.toFormat("[utc]dd"), padZero(utcday, 2));
                assert.equal(date.toFormat("[utc]ddd"), padZero(utcday, 2));
                assert.equal(date.toFormat("[utc]dddd"), padZero(utcday, 2));
                assert.equal(date.toFormat("[utc]dDdDd"), padZero(utcday, 2));
            });

        })
        describe("hour", () => {
            let date = new Date();
            let hour = String(date.getHours());
            let hour12=String(date.getHours()%12);
            let utchour = String(date.getUTCHours());
            let utchour12=String(date.getUTCHours()%12);
            it("locale",function(){
                assert.equal(date.toFormat("H"), hour);
                assert.equal(date.toFormat("HH"), padZero(hour, 2));
                assert.equal(date.toFormat("HHH"), padZero(hour, 2));
                assert.equal(date.toFormat("HHH"), padZero(hour, 2));

                assert.equal(date.toFormat("h"), hour12);
                assert.equal(date.toFormat("hh"), padZero(hour12, 2));
                assert.equal(date.toFormat("hhh"), padZero(hour12, 2));
                assert.equal(date.toFormat("hhhh"), padZero(hour12, 2));
            });
            it("utc",function(){
                assert.equal(date.toFormat("[utc]H"), utchour);
                assert.equal(date.toFormat("[utc]HH"), padZero(utchour, 2));
                assert.equal(date.toFormat("[utc]HHH"), padZero(utchour, 2));
                assert.equal(date.toFormat("[utc]HHH"), padZero(utchour, 2));
                assert.equal(date.toFormat("[utc]h"), utchour12);
                assert.equal(date.toFormat("[utc]hh"), padZero(utchour12, 2));
                assert.equal(date.toFormat("[utc]hhh"), padZero(utchour12, 2));
                assert.equal(date.toFormat("[utc]hhhh"), padZero(utchour12, 2));
            });
        })
        describe("minute", () => {

            let date = new Date();
            let minute = String(date.getMinutes());
            let utcminute=String(date.getUTCMinutes());
            it("locale",function(){
                assert.equal(date.toFormat("m"), minute);
                assert.equal(date.toFormat("mm"), padZero(minute,2));
                assert.equal(date.toFormat("mmm"), padZero(minute,2));
            });
            it("utc",function(){

                assert.equal(date.toFormat("[utc]m"), utcminute);
                assert.equal(date.toFormat("[utc]mm"), padZero(utcminute,2));
                assert.equal(date.toFormat("[utc]mmm"), padZero(utcminute,2));
            })

        })
        describe("second", () => {
            let date = new Date();
            let second = String(date.getSeconds());
            let utcsecond = String(date.getUTCSeconds());
            it("locale", function () {
                assert.equal(date.toFormat("S"), second);
                assert.equal(date.toFormat("SS"), padZero(second, 2));
                assert.equal(date.toFormat("SSS"), padZero(second, 2));

                assert.equal(date.toFormat("s"), second);
                assert.equal(date.toFormat("ss"), padZero(second, 2));
                assert.equal(date.toFormat("sss"), padZero(second, 2));
                assert.equal(date.toFormat("sSsSs"), padZero(second, 2));
            });
            it("utc", function () {
                assert.equal(date.toFormat("[utc]S"), utcsecond);
                assert.equal(date.toFormat("[utc]SS"), padZero(utcsecond, 2));
                assert.equal(date.toFormat("[utc]SSS"), padZero(utcsecond, 2));
                assert.equal(date.toFormat("[utc]s"), utcsecond);
                assert.equal(date.toFormat("[utc]ss"), padZero(utcsecond, 2));
                assert.equal(date.toFormat("[utc]sss"), padZero(utcsecond, 2));
                assert.equal(date.toFormat("[utc]sSsSs"), padZero(utcsecond, 2));
            });
        })
        describe("milliseconds", function () {
            let date = new Date();
            let milliseconds = date.getMilliseconds() / 1000;
            let utcmilliseconds = date.getUTCMilliseconds() / 1000;
            it("locale", function () {
                assert.equal(date.toFormat("0.F"), milliseconds.toFixed(1));
                assert.equal(date.toFormat("0.FF"), milliseconds.toFixed(2));
                assert.equal(date.toFormat("0.FFF"), milliseconds.toFixed(3));
                assert.equal(date.toFormat("0.FFFF"), milliseconds.toFixed(3));
                assert.equal(date.toFormat("0.f"), milliseconds.toFixed(1));
                assert.equal(date.toFormat("0.ff"), milliseconds.toFixed(2));
                assert.equal(date.toFormat("0.fff"), milliseconds.toFixed(3));
                assert.equal(date.toFormat("0.fFfFfF"), milliseconds.toFixed(3));

            });
            it("utc", function () {
                assert.equal(date.toFormat("[UTC]0.F"), utcmilliseconds.toFixed(1));
                assert.equal(date.toFormat("[UTC]0.FF"), utcmilliseconds.toFixed(2));
                assert.equal(date.toFormat("[UTC]0.FFF"), utcmilliseconds.toFixed(3));
                assert.equal(date.toFormat("[UTC]0.FFFF"), utcmilliseconds.toFixed(3));
                assert.equal(date.toFormat("[UTC]0.f"), utcmilliseconds.toFixed(1));
                assert.equal(date.toFormat("[UTC]0.ff"), utcmilliseconds.toFixed(2));
                assert.equal(date.toFormat("[UTC]0.fff"), utcmilliseconds.toFixed(3));
                assert.equal(date.toFormat("[UTC]0.fFfFfF"), utcmilliseconds.toFixed(3));

            });

        })
        describe("timeZone", function () {
            let date = new Date();
            it("locale", function () {
                if (date.getTimezoneOffset() === -480) {
                    assert.equal(date.toFormat("Z"), "+8");
                    assert.equal(date.toFormat("ZZ"), "+08");
                    assert.equal(date.toFormat("ZZZ"), "+08:00");
                    assert.equal(date.toFormat("ZZZZ"), "+08:00");
                    assert.equal(date.toFormat("z"), "+8");
                    assert.equal(date.toFormat("zz"), "+08");
                    assert.equal(date.toFormat("zzz"), "+08:00");
                    assert.equal(date.toFormat("zZzZz"), "+08:00");
                }

            });

            it("utc", function () {
                assert.equal(date.toFormat("[UTC]Z"), "+0");
                assert.equal(date.toFormat("[UTC]ZZ"), "+00");
                assert.equal(date.toFormat("[UTC]ZZZ"), "+00:00");
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
                assert.equal(date.toFormat("yyyyMd H:m:s"),`${year}${month}${day} ${hour}:${min}:${sec}`);
            });
            it("utc",function(){
                let year=date.getUTCFullYear();
                let month=date.getUTCMonth()+1;
                let day=date.getUTCDate();
                let hour=date.getUTCHours();
                let min=date.getUTCMinutes();
                let sec=date.getUTCSeconds();
                assert.equal(date.toFormat("yyyyMd H:m:s[utc]"),`${year}${month}${day} ${hour}:${min}:${sec}`);
            });
        });

        it("escape",function(){
            let date = new Date("2019-04-03T12:23:45.119Z");
            assert.equal(date.toFormat("[utc]yyyy-MM-ddTHH:mm:ss.fffZ"),"2019-04-03T12:23:45.119+0");
            assert.equal(date.toFormat("[utc]yyyy-MM-ddTHH:mm:ss.fff%Z"),"2019-04-03T12:23:45.119Z");
        })
    });
    describe("equals", () => {
        it("equals works ok", () => {
            let date1 = new Date("2018-11-4");
            let date2 = new Date("2018-11-4");
            assert.equal(date1 === date2, false);
            assert.equal(date1 == date2, false);
            assert.equal(date1.equals(date2), true);
            assert.equal(date1.equals(new Date()), false);
        })
    });
    describe("clone", () => {
        it('clone works ok', () => {
            const time = new Date('2018-11-11 12:36:45');
            assert.equal(time === time.clone(), false);
            assert.equal(time.equals(time.clone()), true);
        })
    });
})