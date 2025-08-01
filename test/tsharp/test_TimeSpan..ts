import "../../src/tsharp/TimeSpan"
import { describe, it, expect } from "vitest";
describe("TimeSpan", () => {
    describe("diff", () => {

        it("check time span with other", () => {
            let date1 = new Date('2017-1-1');
            let date2 = new Date('2017-1-5 07:13:35.346');
            let timespan1 = date2.diff(date1);
            expect(timespan1.Days).toBe(4);
            expect(timespan1.Hours).toBe(7);
            expect(timespan1.Minutes).toBe(13);
            expect(timespan1.Seconds).toBe(35);
            expect(timespan1.Milliseconds).toBe(346);
        });
        it("check negative time span with other", () => {
            let date1 = new Date('2017-1-1');
            let date2 = new Date('2018-1-1 07:35:20');

            let timespan1 = date2.diff(date1);
            let timespan2 = date1.diff(date2);
            expect(timespan1.TotalMilliseconds).toBe(-timespan2.TotalMilliseconds);
            expect(timespan1.TotalSeconds).toBe(-timespan2.TotalSeconds);
            expect(timespan1.TotalMinutes).toBe(-timespan2.TotalMinutes);
            expect(timespan1.TotalHours).toBe(-timespan2.TotalHours);
            expect(timespan1.TotalDays).toBe(-timespan2.TotalDays);
        });
    });
    describe("format", () => {
        it("format with default", () => {
            let date1 = new Date('2017-1-1');
            let date2 = new Date('2018-1-1 07:35:20');
            let timespan1 = date2.diff(date1);
            expect(timespan1.format()).toBe("365.07:35:20.000");
        });
        it("format with custom", () => {
            let date1 = new Date('2017-1-1');
            let date2 = new Date('2017-2-1 07:35:20.165');
            let timespan1 = date2.diff(date1);
            expect(timespan1.format("hh:mm:ss")).toBe("07:35:20");
            expect(timespan1.format("ddd hh:mm:ss.f")).toBe("031 07:35:20.2");
            expect(timespan1.format("d.HH:MM:SS.FF")).toBe("31.07:35:20.17");
        });
    });
    describe("others", () => {

        it("tostring", () => {
            let timespan1 = new Date('2018-11-17').diff(new Date('2018-11-11'));
            let timespan2 = new Date('2018-11-18').diff(new Date('2018-11-11')); expect(timespan1.toString()).toBe('6.00:00:00.000');
            expect(timespan2.toString()).toBe('7.00:00:00.000');
        });
        it("valueof", () => {
            let timespan1 = new Date('2018-11-17').diff(new Date('2018-11-11'));
            let timespan2 = new Date('2018-11-18').diff(new Date('2018-11-11'));
            expect(timespan1.valueOf()).toBe(6 * 24 * 60 * 60 * 1000);
            expect(timespan2.valueOf()).toBe(7 * 24 * 60 * 60 * 1000);
        });
        it("add", () => {
            let timespan1 = new Date('2018-11-17').diff(new Date('2018-11-11'));
            expect(timespan1.addDays(1).toString()).toBe('7.00:00:00.000');
            expect(timespan1.addHours(1).toString()).toBe('7.01:00:00.000');
            expect(timespan1.addHours(25).toString()).toBe('8.02:00:00.000');
            expect(timespan1.addMinutes(1).toString()).toBe('8.02:01:00.000');
            expect(timespan1.addMinutes(60).toString()).toBe('8.03:01:00.000');
            expect(timespan1.addSeconds(1).toString()).toBe('8.03:01:01.000');
            expect(timespan1.addSeconds(3601).toString()).toBe('8.04:01:02.000');
            expect(timespan1.addMilliseconds(1).toString()).toBe('8.04:01:02.001');
            expect(timespan1.addMilliseconds(1999).toString()).toBe('8.04:01:04.000');
        });
        it("equals", () => {
            let timespan1 = new Date('2018-11-17').diff(new Date('2018-11-11'));
            let timespan2 = new Date('2018-11-18').diff(new Date('2018-11-11'));
            expect(timespan1.equals(timespan2)).toBe(false);
            expect(timespan1.addDays(1).equals(timespan2)).toBe(true);
            expect(timespan1.addDays(2).equals(timespan2)).toBe(false);
        })

    });
});