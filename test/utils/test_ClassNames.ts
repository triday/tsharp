import ClassNames from "../../src/utils/ClassNames"
import { describe, it, expect } from "vitest";

describe("ClassNames", () => {

    it(`ClassNames() == ""`, () => {
        expect(ClassNames()).toBe("");
    });
    it(`ClassNames(null,null) == ""`, () => {
        expect(ClassNames(null, null)).toBe("");
    });
    it(`ClassNames("") == ""`, () => {
        expect(ClassNames("")).toBe("");
    });
    it(`ClassNames("abc") == "abc"`, () => {
        expect(ClassNames("abc")).toBe("abc");
    });

    it(`ClassNames("abc","bcd") == "abc bcd"`, () => {
        expect(ClassNames("abc", "bcd")).toBe("abc bcd");
    });
    it(`ClassNames("abc","bcd","abc") == "abc bcd"`, () => {
        expect(ClassNames("abc", "bcd", "abc")).toBe("abc bcd");
    });

    it(`ClassNames({ abc: true, bcd: false }) == "abc"`, () => {
        expect(ClassNames({ abc: true, bcd: false })).toBe("abc");
    });
    it(`ClassNames({ abc: true, bcd: false }, { def: true }) == "abc def"`, () => {
        expect(ClassNames({ abc: true, bcd: false }, { def: true })).toBe("abc def");
    });
    it(`ClassNames({ abc: true, bcd: false }, { def: true }, "bcd") == "abc def"`, () => {
        expect(ClassNames({ abc: true, bcd: false }, { def: true }, "bcd")).toBe("abc def bcd");
    });

});