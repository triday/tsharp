import "../../src/extentions/Number"
import "mocha"
import * as assert from "assert";
describe("Number",()=>{
    describe("format",()=>{
        describe("format with 'f'",()=>{
            it("123 format f equals 123.00",()=>{
                let num=123;
                assert.equal(num.format('f'),"123.00")
            });
            it("123 format f3 equals 123.000",()=>{
                let num=123;
                assert.equal(num.format('f3'),"123.000")
            });
            it("-123 format f4 equals -123.0000",()=>{
                let num=-123;
                assert.equal(num.format('f4'),"-123.0000")
            });
            it("123.456 format f equals 123.46",()=>{
                let num=123.456;
                //assert.equal(num.format('f'),"123.46")
            });
            it("123.456 format f1 equals 123.5",()=>{
                let num=123.456;
                assert.equal(num.format('f1'),"123.5")
            });
        });

    });

})