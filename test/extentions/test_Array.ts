import "../../src/extentions/Array"
import "mocha"
import * as assert from "assert";
describe("Array", () => {
    let data_array = [1, 2, 3, 4, 5];
    let hex_array = ['ff', 'fe', 'f0', '01'];
    let empty_array: string[] = [];
    describe("contains", () => {
        it(`[${data_array}] not contains 6`, () => {
            assert.equal(data_array.contains(6), false);

        });
        it(`[${data_array}] not contains 0`, () => {
            assert.equal(data_array.contains(0), false);
        });
        it(`[${data_array}] contains 1`, () => {
            assert.equal(data_array.contains(1), true);
        });
        it(`[${empty_array}] not contains ""`, () => {
            assert.equal(empty_array.contains(""), false);
        });
        it(`[${empty_array}] not contains null`, () => {
            assert.equal(empty_array.contains(null), false);
        });
        it(`[${hex_array}] not contains 'FF'`, () => {
            assert.equal(empty_array.contains('FF'), false);
        });
        it(`[${hex_array}] contains 'FF' with ignorecase comparer`, () => {
            assert.equal(empty_array.contains('FF', (a, b) => a.toLowerCase() === b.toLowerCase()), false);
        });
    });

    describe("all", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['abc', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] all has length 3 is true`, () => {
            assert.equal(strArray.all(p => p.length == 3), true);
        });
        it(`[${strArray2}] all has length 3 is false`, () => {
            assert.equal(strArray2.all(p => p.length == 3), false);
        });
        it(`[${emptyArray}] all has length 3 is true`, () => {
            assert.equal(emptyArray.all(p => p.length == 3), true);
        });
    });
    describe("any", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['abc', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] any has length 3 is true`, () => {
            assert.equal(strArray.any(p => p.length == 3), true);
        });
        it(`[${strArray}] any has length 4 is false`, () => {
            assert.equal(strArray.any(p => p.length == 4), false);
        });
        it(`[${strArray2}] any has length 4 is true`, () => {
            assert.equal(strArray2.any(p => p.length == 4), true);
        });
        it(`[${emptyArray}] any has length 3 is false`, () => {
            assert.equal(emptyArray.any(p => p.length == 3), false);
        });
    });
    describe("select", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['ab', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] map length get [3,3,3]`, () => {
            assert.deepEqual(strArray.select(p => p.length), [3, 3, 3]);
        });
        it(`[${strArray2}] map length get [2,3,4]`, () => {
            assert.deepEqual(strArray2.select(p => p.length), [2, 3, 4]);
        });
        it(`[${emptyArray}] map length get []`, () => {
            assert.deepEqual(emptyArray.select(p => p.length), []);
        });
    });
    describe("where", () => {
        let strArray = ['ab', 'bcd', 'cdef'];
        let str2Array = ['ab', 'bcd', null, undefined];
        let emptyArray: string[] = [];
        it(`[${strArray}] where length>2 get ['bcd','cdef']`, () => {
            assert.deepEqual(strArray.where(p => p.length > 2), ['bcd', 'cdef']);
        });
        it(`[] where length>2 get ['bcd','cdef']`, () => {
            assert.deepEqual(emptyArray.where(p => p.length > 2), []);
        });
        it(`[${str2Array}] where item get ['ab','bcd']`, () => {
            assert.deepEqual(str2Array.where(p => p), ['ab', 'bcd']);
        });
    });

    describe("first", () => {
        it("['abc','bcd','cde'] call first return abc", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            assert.equal(strArray.first(), "abc")
        });
        it("[] call first throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.first() });
        });
        it("['ab','bcd','cded'] call first.length return 2", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            assert.equal(strArray.first(p => p.length), 2);
        });
        it("[] call first.length throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.first() });
        });
    });
    describe("firstOrDefault", () => {
        it("['abc','bcd','cde'] call firstOrDefault return abc", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            assert.equal(strArray.firstOrDefault(), "abc")
        });
        it("[] call firstOrDefault return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.firstOrDefault(), undefined);
        });
        it("['ab','bcd','cded'] call first.length return 2", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            assert.equal(strArray.firstOrDefault(p => p.length), 2);
        });
        it("[] call firstOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.firstOrDefault(p => p.length), undefined);
        });
    });
    describe("last", () => {
        it("['abc','bcd','cde'] call last return cde", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            assert.equal(strArray.last(), "cde")
        });
        it("[] call last throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.last() });
        });
        it("['ab','bcd','cded'] call last.length return 4", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            assert.equal(strArray.last(p => p.length), 4);
        });
        it("[] call last.length throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.last() });
        });
    });
    describe("lastOrDefault", () => {
        it("['abc','bcd','cde'] call lastOrDefault return cde", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            assert.equal(strArray.lastOrDefault(), "cde")
        });
        it("[] call firstOrDefault return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.lastOrDefault(), undefined);
        });
        it("['ab','bcd','cded'] call first.length return 4", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            assert.equal(strArray.lastOrDefault(p => p.length), 4);
        });
        it("[] call firstOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.lastOrDefault(p => p.length), undefined);
        });
    });
    describe("single", () => {
        it("['abc','bcd'] call single throw error", () => {
            let strArray = ['abc', 'bcd'];
            assert.throws(() => { strArray.single() });
        });
        it("[] call single throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.single() });
        });
        it("['abc'] call single return abc", () => {
            let strArray = ['abc'];
            assert.equal(strArray.single(), 'abc');
        });
        it("['abc'] call single.length return 3", () => {
            let strArray = ['abc'];
            assert.equal(strArray.single(p => p.length), 3);
        });
    });
    describe("singleOrDefault", () => {
        it("['abc','bcd'] call singleOrDefault throw error", () => {
            let strArray = ['abc', 'bcd'];
            assert.throws(() => { strArray.singleOrDefault() });
        });
        it("[] call singleOrDefault return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.singleOrDefault(), undefined);
        });
        it("[] call singleOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.singleOrDefault(p => p.length), undefined);
        });
        it("['abc'] call singleOrDefault return abc", () => {
            let strArray = ['abc'];
            assert.equal(strArray.singleOrDefault(), 'abc');
        });
        it("['abc'] call singleOrDefault.length return 3", () => {
            let strArray = ['abc'];
            assert.equal(strArray.singleOrDefault(p => p.length), 3);
        });
    });

    describe("count", () => {
        it("[] count is 0", () => {
            assert.equal([].count(), 0);
        });
        it("[1,3,5,7,9] count is 3", () => {
            assert.equal([1, 3, 5, 7, 9].count(), 5);
        });
        it("[1,3,5,7,9] count(p => p%3===0) is 2", () => {
            assert.equal([1, 3, 5, 7, 9].count(p => p % 3 === 0), 2);
        });
    });
    describe("min", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        let emptyArray: number[] = [];
        let numArray = [1, 3, 5, 7, 9];
        it("[{a:100},{a:200},{a:300}] min is 100", () => {
            assert.equal(objArray.min(p => p.a), 100);
        });
        it(`[${numArray}] min is 1`, () => {
            assert.equal(numArray.min(), 1);
        });
        // it("[] min is NaN", () => {
        //     assert.equal(isNaN(emptyArray.min()), true);
        // });
    });
    describe("max", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        it("[{a:100},{a:200},{a:300}] max is 300", () => {
            assert.equal(objArray.max(p => p.a), 300);
        });
    });
    describe("sum", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        it("[{a:100},{a:200},{a:300}] sum is 600", () => {
            assert.equal(objArray.sum(p => p.a), 600);
        });
    });
    describe("average", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        it("[{a:100},{a:200},{a:300}] sum is 600", () => {
            assert.equal(objArray.average(p => p.a), 200);
        });
    });
});