import "../../src/extentions/Number"
import "mocha"
import * as assert from "assert";
describe("Number", () => {
    describe("inRange", () => {
        it("5 is between in [3,8]", () => {
            let num = 5;
            assert.equal(num.inRange(3, 8), true);
        });

        it("3 is between in [3,8]", () => {
            let num = 3;
            assert.equal(num.inRange(3, 8), true);
        });
        it("8 is between in [3,8]", () => {
            let num = 8;
            assert.equal(num.inRange(3, 8), true);
        });
        it("2 is not between in [3,8]", () => {
            let num = 2;
            assert.equal(num.inRange(3, 8), false);
        });
        it("9 is not between in [3,8]", () => {
            let num = 9;
            assert.equal(num.inRange(3, 8), false);
        });
        it("3 is not between in (3,8)", () => {
            let num = 3;
            assert.equal(num.inRange(3, 8, false), false);
        });
        it("8 is not between in (3,8)", () => {
            let num = 8;
            assert.equal(num.inRange(3, 8, false), false);
        });
        it("5 is between in [8,3]", () => {
            let num = 5;
            assert.equal(num.inRange(8, 3), true);
        });
        it("5 is between in [5,5]", () => {
            let num = 5;
            assert.equal(num.inRange(5, 5), true);
        });
        it("5 is not between in (5,5)", () => {
            let num = 5;
            assert.equal(num.inRange(5, 5, false), false);
        });
        it("5 is between in [3,Infinity]", () => {
            let num = 5;
            assert.equal(num.inRange(3, Infinity), true);
        });
        it("5 is between in [Infinity,3]", () => {
            let num = 5;
            assert.equal(num.inRange(Infinity, 3), true);
        });
        it("5 is not between in [3,-Infinity]", () => {
            let num = 5;
            assert.equal(num.inRange(3, -Infinity), false);
        });
        it("5 is between in [-Infinity,3]", () => {
            let num = 5;
            assert.equal(num.inRange(-Infinity, 3), false);
        });
        it("-5 is not between in [3,-Infinity]", () => {
            let num = -5;
            assert.equal(num.inRange(3, -Infinity), true);
        });
        it("-5 is between in [-Infinity,3]", () => {
            let num = -5;
            assert.equal(num.inRange(-Infinity, 3), true);
        });
        it("5 is not between in [3,NaN]", () => {
            let num = 5;
            assert.equal(num.inRange(3, NaN), false);
        });
        it("NaN is not between in [-Infinity, Infinity]", () => {
            let num = NaN;
            assert.equal(num.inRange(-Infinity, Infinity), false);
        });
        it("5 is between in (-Infinity, Infinity)", () => {
            let num = 5;
            assert.equal(num.inRange(-Infinity, Infinity), true);
        });
        it("Infinity is between in (-Infinity, Infinity)", () => {
            let num = Infinity;
            assert.equal(num.inRange(-Infinity, Infinity), false);
        });
        it("-Infinity is between in (-Infinity, Infinity)", () => {
            let num = -Infinity;
            assert.equal(num.inRange(-Infinity, Infinity), false);
        });
    });
    describe("limitRange", () => {
        it("5 limit range [3,8] equals 5", () => {
            let num = 5;
            assert.equal(num.limitRange(3, 8), 5);
            assert.equal(typeof num.limitRange(3, 8), "number");
        });
        it("5 limit range [8,3] equals 5", () => {
            let num = 5;
            assert.equal(num.limitRange(8, 3), 5);
            assert.equal(typeof num.limitRange(8, 3), "number");
        });
        it("2 limit range [3,8] equals 3", () => {
            let num = 2;
            assert.equal(num.limitRange(3, 8), 3);
        });
        it("12 limit range [3,8] equals 8", () => {
            let num = 12;
            assert.equal(num.limitRange(3, 8), 8);
        });
        it("12 limit range [8,8] equals 8", () => {
            let num = 12;
            assert.equal(num.limitRange(8, 8), 8);
        });
        it("12 limit range [8,NaN] equals 8", () => {
            let num = 12;
            assert.equal(num.limitRange(8, NaN), num);
        });
        it("12 limit range [3,Infinity] equals 12", () => {
            let num = 12;
            assert.equal(num.limitRange(3, Infinity), 12);
        });
        it("12 limit range [3,-Infinity] equals 3", () => {
            let num = 12;
            assert.equal(num.limitRange(3, -Infinity), 3);
        });
    });
    describe("toFormat", () => {
        it("format with null or undefined", () => {
            let num = 123;
            assert.equal(num.toFormat(null), "123");
            assert.equal(num.toFormat(undefined), "123");
        });
        it("invalid format", () => {
            let num = 123;
            assert.throws(() => { num.toFormat('ff') });
        });
        describe("format with 'f'", () => {
            it("123 format f equals 123.00", () => {
                let num = 123;
                assert.equal(num.toFormat('f'), "123.00");
                assert.equal(num.toFormat('F'), "123.00");
            });
            it("123 format f3 equals 123.000", () => {
                let num = 123;
                assert.equal(num.toFormat('f3'), "123.000");
                assert.equal(num.toFormat('F3'), "123.000");
            });
            it("-123 format f4 equals -123.0000", () => {
                let num = -123;
                assert.equal(num.toFormat('f4'), "-123.0000");
                assert.equal(num.toFormat('F4'), "-123.0000");
            });
            it("123.456 format f equals 123.46", () => {
                let num = 123.456;
                assert.equal(num.toFormat('f'), "123.46");
                assert.equal(num.toFormat('F'), "123.46");
            });
            it("123.456 format f1 equals 123.5", () => {
                let num = 123.456;
                assert.equal(num.toFormat('f1'), "123.5");
                assert.equal(num.toFormat('F1'), "123.5");
            });
            it("NaN or Infinity format f", () => {
                let num = NaN;
                let num2 = Infinity;
                assert.equal(num.toFormat('f'), "NaN");
                assert.equal(num2.toFormat('f'), "Infinity");
            });
        });
        describe("format with 'd'", () => {
            it("123 format d equals 123", () => {
                let num = 123;
                assert.equal(num.toFormat('d'), "123");
                assert.equal(num.toFormat('D'), "123");
            });
            it("123 format d1 equals 123", () => {
                let num = 123;
                assert.equal(num.toFormat('d1'), "123");
                assert.equal(num.toFormat('D1'), "123");
            });
            it("123 format d5 equals 00123", () => {
                let num = 123;
                assert.equal(num.toFormat('d5'), "00123");
                assert.equal(num.toFormat('D5'), "00123");
            });
            it("-123 format d equals -123", () => {
                let num = -123;
                assert.equal(num.toFormat('d'), "-123");
                assert.equal(num.toFormat('D'), "-123");
            });
            it("-123 format d1 equals -123", () => {
                let num = -123;
                assert.equal(num.toFormat('d1'), "-123");
                assert.equal(num.toFormat('D1'), "-123");
            });
            it("-123 format d5 equals -0123", () => {
                let num = -123;
                assert.equal(num.toFormat('d5'), "-00123");
                assert.equal(num.toFormat('D5'), "-00123");
            });
            it("123.456 format d equals 123", () => {
                let num = 123.456;
                assert.equal(num.toFormat('d'), "123");
                assert.equal(num.toFormat('D'), "123");
            });
            it("123.567 format d equals 124", () => {
                let num = 123.567;
                assert.equal(num.toFormat('d'), "124");
                assert.equal(num.toFormat('D'), "124");
            });
            it("123.567 format d1 equals 124", () => {
                let num = 123.567;
                assert.equal(num.toFormat('d1'), "124");
                assert.equal(num.toFormat('D1'), "124");
            });
            it("123.567 format d4 equals 0124", () => {
                let num = 123.567;
                assert.equal(num.toFormat('d4'), "0124");
                assert.equal(num.toFormat('D4'), "0124");
            });
            it("-123.567 format d4 equals -124", () => {
                let num = -123.567;
                assert.equal(num.toFormat('d4'), "-0124");
                assert.equal(num.toFormat('D4'), "-0124");
            });
            it("-123.567 format d6 equals -00124", () => {
                let num = -123.567;
                assert.equal(num.toFormat('d6'), "-000124");
                assert.equal(num.toFormat('D6'), "-000124");
            });
        });
        describe("format with 'e'", () => {
            it("123 format e equals 1.230000e+2", () => {
                let num = 123;
                assert.equal(num.toFormat('e'), "1.230000e+2");
                assert.equal(num.toFormat('E'), "1.230000E+2");
            });
            it("123456789 format e equals 1.234568e+8", () => {
                let num = 123456789;
                assert.equal(num.toFormat('e'), "1.234568e+8");
                assert.equal(num.toFormat('E'), "1.234568E+8");
            });

            it("123 format e2 equals 1.23e+2", () => {
                let num = 123;
                assert.equal(num.toFormat('e2'), "1.23e+2");
                assert.equal(num.toFormat('E2'), "1.23E+2");
            });
            it("123456789 format e2 equals 1.23e+8", () => {
                let num = 123456789;
                assert.equal(num.toFormat('e2'), "1.23e+8");
                assert.equal(num.toFormat('E2'), "1.23E+8");
            });

            it("123 format e5 equals 1.23000e+2", () => {
                let num = 123;
                assert.equal(num.toFormat('e5'), "1.23000e+2");
                assert.equal(num.toFormat('E5'), "1.23000E+2");
            });
            it("123456789 format e5 equals 1.23457e+8", () => {
                let num = 123456789;
                assert.equal(num.toFormat('e5'), "1.23457e+8");
                assert.equal(num.toFormat('E5'), "1.23457E+8");
            });
        });
        describe("format with 'g'", () => {
            it("123456 format g equals 123456", () => {
                let num = 123456;
                assert.equal(num.toFormat('g'), "123456");
                assert.equal(num.toFormat('G'), "123456");
            });
            it("123456 format g2 equals 1.2e5", () => {
                let num = 123456;
                assert.equal(num.toFormat('g2'), "1.2e+5");
                assert.equal(num.toFormat('G2'), "1.2E+5");
            });
            it("123456 format g8 equals 123456.00", () => {
                let num = 123456;
                assert.equal(num.toFormat('g8'), "123456.00");
                assert.equal(num.toFormat('G8'), "123456.00");
            });
            it("-123456 format g4 equals -1.235e+5", () => {
                let num = -123456;
                assert.equal(num.toFormat('g4'), "-1.235e+5");
                assert.equal(num.toFormat('G4'), "-1.235E+5");
            });
            it("-0.0123456 format g4 equals -0.01235", () => {
                let num = -0.0123456;
                assert.equal(num.toFormat('g4'), "-0.01235");
                assert.equal(num.toFormat('G4'), "-0.01235");
            });
            it("-0.0123456 format g6 equals -0.0123456", () => {
                let num = -0.0123456;
                assert.equal(num.toFormat('g6'), "-0.0123456");
                assert.equal(num.toFormat('G6'), "-0.0123456");
            });
            it("-0.0123456 format g10 equals -0.01234560000", () => {
                let num = -0.0123456;
                assert.equal(num.toFormat('g10'), "-0.01234560000");
                assert.equal(num.toFormat('G10'), "-0.01234560000");
            });
        });
        describe("format with 'n'", () => {
            it("123 format n equals 123.00", () => {
                let num = 123;
                assert.equal(num.toFormat('n'), "123.00");
                assert.equal(num.toFormat('N'), "123.00");
            });
            it("123 format n0 equals 123", () => {
                let num = 123;
                assert.equal(num.toFormat('n0'), "123");
                assert.equal(num.toFormat('N0'), "123");
            });
            it("123 format n3 equals 123.000", () => {
                let num = 123;
                assert.equal(num.toFormat('n3'), "123.000");
                assert.equal(num.toFormat('N3'), "123.000");
            });
            it("1234567 format n equals 1,234,567.00", () => {
                let num = 1234567;
                assert.equal(num.toFormat('n'), "1,234,567.00");
                assert.equal(num.toFormat('N'), "1,234,567.00");
            });
            it("1234567 format n0 equals 1,234,567", () => {
                let num = 1234567;
                assert.equal(num.toFormat('n0'), "1,234,567");
                assert.equal(num.toFormat('N0'), "1,234,567");
            });
            it("1234567 format n3 equals 1,234,567.000", () => {
                let num = 1234567;
                assert.equal(num.toFormat('n3'), "1,234,567.000");
                assert.equal(num.toFormat('N3'), "1,234,567.000");
            });
            it("1234567.89012 format n1 equals 1,234,567.9", () => {
                let num = 1234567.89012;
                assert.equal(num.toFormat('n1'), "1,234,567.9");
                assert.equal(num.toFormat('N1'), "1,234,567.9");
            });
        });
        describe("format with 'p'", () => {
            it("0 format p equals 0.00 %", () => {
                let num = 0;
                assert.equal(num.toFormat('p'), "0.00%");
                assert.equal(num.toFormat('P'), "0.00%");
            });
            it("0.12345 format p equals 12.35%", () => {
                let num = 0.123456;
                assert.equal(num.toFormat('p'), "12.35%");
                assert.equal(num.toFormat('P'), "12.35%");
            });
            it("0.12345 format p1 equals 12.3%", () => {
                let num = 0.123456;
                assert.equal(num.toFormat('p1'), "12.3%");
                assert.equal(num.toFormat('P1'), "12.3%");
            });
            it("-123456.789 format p1 equals -12,345,678.90%", () => {
                let num = -123456.789;
                assert.equal(num.toFormat('p'), "-12,345,678.90%");
                assert.equal(num.toFormat('P'), "-12,345,678.90%");
            });
        });
        describe("format with 'r'", () => {
            it("0 format r equals 0", () => {
                let num = 0;
                assert.equal(num.toFormat('r'), "0");
                assert.equal(num.toFormat('R'), "0");
            });
            it("123.123456789000 format r equals 1234567890.123456789", () => {
                let num = 123.123456789000;
                assert.equal(num.toFormat('r'), "123.123456789");
                assert.equal(num.toFormat('R'), "123.123456789");
            });
        });
        describe("format with 'x'", () => {
            it("0 format x equals 0", () => {
                let num = 0;
                assert.equal(num.toFormat('x'), "0");
                assert.equal(num.toFormat('X'), "0");
            });
            it("255 format x equals ff", () => {
                let num = 255;
                assert.equal(num.toFormat('x'), "ff");
                assert.equal(num.toFormat('X'), "FF");
            });
            it("0 format x4 equals 0", () => {
                let num = 0;
                assert.equal(num.toFormat('x4'), "0000");
                assert.equal(num.toFormat('X4'), "0000");
            });
            it("255 format x4 equals ff", () => {
                let num = 255;
                assert.equal(num.toFormat('x4'), "00ff");
                assert.equal(num.toFormat('X4'), "00FF");
            });
            it("-255.678 format x4 equals ff", () => {
                let num = -255.678;
                assert.equal(num.toFormat('x4'), "-0100");
                assert.equal(num.toFormat('X4'), "-0100");
            });
        });
    });

})