import ClassNames from "../../src/utils/ClassNames"
import "mocha"
import assert = require("assert");

describe("ClassNames", () => {

    it(`ClassNames() == ""`, () => {
        assert.equal(ClassNames(), "");
    });
    it(`ClassNames(null,null) == ""`, () => {
        assert.equal(ClassNames(null, null), "");
    });
    it(`ClassNames("") == ""`, () => {
        assert.equal(ClassNames(""), "");
    });
    it(`ClassNames("abc") == "abc"`, () => {
        assert.equal(ClassNames("abc"), "abc");
    });

    it(`ClassNames("abc","bcd") == "abc bcd"`, () => {
        assert.equal(ClassNames("abc", "bcd"), "abc bcd");
    });
    it(`ClassNames("abc","bcd","abc") == "abc bcd"`, () => {
        assert.equal(ClassNames("abc", "bcd", "abc"), "abc bcd");
    });

    it(`ClassNames({ abc: true, bcd: false }) == "abc"`, () => {
        assert.equal(ClassNames({ abc: true, bcd: false }), "abc");
    });
    it(`ClassNames({ abc: true, bcd: false }, { def: true }) == "abc def"`, () => {
        assert.equal(ClassNames({ abc: true, bcd: false }, { def: true }), "abc def");
    });
    it(`ClassNames({ abc: true, bcd: false }, { def: true }, "bcd") == "abc def"`, () => {
        assert.equal(ClassNames({ abc: true, bcd: false }, { def: true }, "bcd"), "abc def bcd");
    });

});