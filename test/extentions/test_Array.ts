import "../../src/extentions/Array"
import "mocha"
import * as assert from "assert";
describe("Array", () => {
    let data_array = [1, 2, 3, 4, 5];
    let empty_array:Array<string>=[];
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
});