import "../../src/extentions/Array"
import "mocha"
import * as assert from "assert";
describe("Array", () => {
    let data_array = [1, 2, 3, 4, 5];
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
});