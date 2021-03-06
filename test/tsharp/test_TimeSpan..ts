import "../../src/tsharp/TimeSpan"
import "mocha"
import * as assert from "assert";
describe("TimeSpan", () => {
    describe("diff", () => {

        it("check time span with other", () => {
            let date1 = new Date('2017-1-1');
            let date2 = new Date('2017-1-5 07:13:35.346');
            let timespan1 = date2.diff(date1);
            assert.equal(timespan1.Days, 4);
            assert.equal(timespan1.Hours, 7);
            assert.equal(timespan1.Minutes, 13);
            assert.equal(timespan1.Seconds, 35);
            assert.equal(timespan1.Milliseconds, 346);
        });
        it("check negative time span with other", () => {
            let date1 = new Date('2017-1-1');
            let date2 = new Date('2018-1-1 07:35:20');

            let timespan1 = date2.diff(date1);
            let timespan2 = date1.diff(date2);
            assert.equal(timespan1.TotalMilliseconds, -timespan2.TotalMilliseconds);
            assert.equal(timespan1.TotalSeconds, -timespan2.TotalSeconds);
            assert.equal(timespan1.TotalMinutes, -timespan2.TotalMinutes);
            assert.equal(timespan1.TotalHours, -timespan2.TotalHours);
            assert.equal(timespan1.TotalDays, -timespan2.TotalDays);
        });
    });
    describe("format", () => {
        it("format with default", () => {
            let date1 = new Date('2017-1-1');
            let date2 = new Date('2018-1-1 07:35:20');
            let timespan1 = date2.diff(date1);
            assert.equal(timespan1.format(), "365.07:35:20.000");
        });
        it("format with custom", () => {
            let date1 = new Date('2017-1-1');
            let date2 = new Date('2017-2-1 07:35:20.165');
            let timespan1 = date2.diff(date1);
            assert.equal(timespan1.format("hh:mm:ss"), "07:35:20");
            assert.equal(timespan1.format("ddd hh:mm:ss.f"), "031 07:35:20.2");
            assert.equal(timespan1.format("d.HH:MM:SS.FF"), "31.07:35:20.17");
        });
    });
    describe("others", () => {

        it("tostring", () => {
            let timespan1 = new Date('2018-11-17').diff(new Date('2018-11-11'));
            let timespan2 = new Date('2018-11-18').diff(new Date('2018-11-11')); assert.equal(timespan1.toString(), '6.00:00:00.000');
            assert.equal(timespan2.toString(), '7.00:00:00.000');
        });
        it("valueof", () => {
            let timespan1 = new Date('2018-11-17').diff(new Date('2018-11-11'));
            let timespan2 = new Date('2018-11-18').diff(new Date('2018-11-11'));
            assert.equal(timespan1.valueOf(), 6 * 24 * 60 * 60 * 1000);
            assert.equal(timespan2.valueOf(), 7 * 24 * 60 * 60 * 1000);
        });
        it("add", () => {
            let timespan1 = new Date('2018-11-17').diff(new Date('2018-11-11'));
            assert.equal(timespan1.addDays(1).toString(), '7.00:00:00.000');
            assert.equal(timespan1.addHours(1).toString(), '7.01:00:00.000');
            assert.equal(timespan1.addHours(25).toString(), '8.02:00:00.000');
            assert.equal(timespan1.addMinutes(1).toString(), '8.02:01:00.000');
            assert.equal(timespan1.addMinutes(60).toString(), '8.03:01:00.000');
            assert.equal(timespan1.addSeconds(1).toString(), '8.03:01:01.000');
            assert.equal(timespan1.addSeconds(3601).toString(), '8.04:01:02.000');
            assert.equal(timespan1.addMilliseconds(1).toString(), '8.04:01:02.001');
            assert.equal(timespan1.addMilliseconds(1999).toString(), '8.04:01:04.000')
        });
        it("equals", () => {
            let timespan1 = new Date('2018-11-17').diff(new Date('2018-11-11'));
            let timespan2 = new Date('2018-11-18').diff(new Date('2018-11-11'));
            assert.equal(timespan1.equals(timespan2), false);
            assert.equal(timespan1.addDays(1).equals(timespan2), true);
            assert.equal(timespan1.addDays(2).equals(timespan2), false);
        })

    });
});