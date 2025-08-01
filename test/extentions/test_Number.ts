import "../../src/extentions/Number"
import { describe, it, expect } from 'vitest';
describe("Number", () => {
    describe("inRange", () => {
        it("5 is between in [3,8]", () => {
            let num = 5;
            expect(num.inRange(3, 8)).toBe(true);
        });

        it("3 is between in [3,8]", () => {
            let num = 3;
            expect(num.inRange(3, 8)).toBe(true);
        });
        it("8 is between in [3,8]", () => {
            let num = 8;
            expect(num.inRange(3, 8)).toBe(true);
        });
        it("2 is not between in [3,8]", () => {
            let num = 2;
            expect(num.inRange(3, 8)).toBe(false);
        });
        it("9 is not between in [3,8]", () => {
            let num = 9;
            expect(num.inRange(3, 8)).toBe(false);
        });
        it("3 is not between in (3,8)", () => {
            let num = 3;
            expect(num.inRange(3, 8, false)).toBe(false);
        });
        it("8 is not between in (3,8)", () => {
            let num = 8;
            expect(num.inRange(3, 8, false)).toBe(false);
        });
        it("5 is between in [8,3]", () => {
            let num = 5;
            expect(num.inRange(8, 3)).toBe(true);
        });
        it("5 is between in [5,5]", () => {
            let num = 5;
            expect(num.inRange(5, 5)).toBe(true);
        });
        it("5 is not between in (5,5)", () => {
            let num = 5;
            expect(num.inRange(5, 5, false)).toBe(false);
        });
        it("5 is between in [3,Infinity]", () => {
            let num = 5;
            expect(num.inRange(3, Infinity)).toBe(true);
        });
        it("5 is between in [Infinity,3]", () => {
            let num = 5;
            expect(num.inRange(Infinity, 3)).toBe(true);
        });
        it("5 is not between in [3,-Infinity]", () => {
            let num = 5;
            expect(num.inRange(3, -Infinity)).toBe(false);
        });
        it("5 is between in [-Infinity,3]", () => {
            let num = 5;
            expect(num.inRange(-Infinity, 3)).toBe(false);
        });
        it("-5 is not between in [3,-Infinity]", () => {
            let num = -5;
            expect(num.inRange(3, -Infinity)).toBe(true);
        });
        it("-5 is between in [-Infinity,3]", () => {
            let num = -5;
            expect(num.inRange(-Infinity, 3)).toBe(true);
        });
        it("5 is not between in [3,NaN]", () => {
            let num = 5;
            expect(num.inRange(3, NaN)).toBe(false);
        });
        it("NaN is not between in [-Infinity, Infinity]", () => {
            let num = NaN;
            expect(num.inRange(-Infinity, Infinity)).toBe(false);
        });
        it("5 is between in (-Infinity, Infinity)", () => {
            let num = 5;
            expect(num.inRange(-Infinity, Infinity)).toBe(true);
        });
        it("Infinity is between in (-Infinity, Infinity)", () => {
            let num = Infinity;
            expect(num.inRange(-Infinity, Infinity)).toBe(false);
        });
        it("-Infinity is between in (-Infinity, Infinity)", () => {
            let num = -Infinity;
            expect(num.inRange(-Infinity, Infinity)).toBe(false);
        });
    });
    describe("limitRange", () => {
        it("5 limit range [3,8] equals 5", () => {
            let num = 5;
            expect(num.limitRange(3, 8)).toBe(5);
            expect(typeof num.limitRange(3, 8)).toBe("number");
        });
        it("5 limit range [8,3] equals 5", () => {
            let num = 5;
            expect(num.limitRange(8, 3)).toBe(5);
            expect(typeof num.limitRange(8, 3)).toBe("number");
        });
        it("2 limit range [3,8] equals 3", () => {
            let num = 2;
            expect(num.limitRange(3, 8)).toBe(3);
        });
        it("12 limit range [3,8] equals 8", () => {
            let num = 12;
            expect(num.limitRange(3, 8)).toBe(8);
        });
        it("12 limit range [8,8] equals 8", () => {
            let num = 12;
            expect(num.limitRange(8, 8)).toBe(8);
        });
        it("12 limit range [8,NaN] equals 8", () => {
            let num = 12;
            expect(num.limitRange(8, NaN)).toBe(num);
        });
        it("12 limit range [3,Infinity] equals 12", () => {
            let num = 12;
            expect(num.limitRange(3, Infinity)).toBe(12);
        });
        it("12 limit range [3,-Infinity] equals 3", () => {
            let num = 12;
            expect(num.limitRange(3, -Infinity)).toBe(3);
        });
    });
    describe("toFormat", () => {
        it("format with null or undefined", () => {
            let num = 123;
            expect(num.toFormat(null)).toBe("123");
            expect(num.toFormat(undefined)).toBe("123");
        });
        it("invalid format", () => {
            let num = 123;
            expect(() => { num.toFormat('ff') }).toThrow();
        });
        describe("format with 'f'", () => {
            it("123 format f equals 123.00", () => {
                let num = 123;
                expect(num.toFormat('f')).toBe("123.00");
                expect(num.toFormat('F')).toBe("123.00");
            });
            it("123 format f3 equals 123.000", () => {
                let num = 123;
                expect(num.toFormat('f3')).toBe("123.000");
                expect(num.toFormat('F3')).toBe("123.000");
            });
            it("-123 format f4 equals -123.0000", () => {
                let num = -123;
                expect(num.toFormat('f4')).toBe("-123.0000");
                expect(num.toFormat('F4')).toBe("-123.0000");
            });
            it("123.456 format f equals 123.46", () => {
                let num = 123.456;
                expect(num.toFormat('f')).toBe("123.46");
                expect(num.toFormat('F')).toBe("123.46");
            });
            it("123.456 format f1 equals 123.5", () => {
                let num = 123.456;
                expect(num.toFormat('f1')).toBe("123.5");
                expect(num.toFormat('F1')).toBe("123.5");
            });
            it("NaN or Infinity format f", () => {
                let num = NaN;
                let num2 = Infinity;
                expect(num.toFormat('f')).toBe("NaN");
                expect(num2.toFormat('f')).toBe("Infinity");
            });
        });
        describe("format with 'd'", () => {
            it("123 format d equals 123", () => {
                let num = 123;
                expect(num.toFormat('d')).toBe("123");
                expect(num.toFormat('D')).toBe("123");
            });
            it("123 format d1 equals 123", () => {
                let num = 123;
                expect(num.toFormat('d1')).toBe("123");
                expect(num.toFormat('D1')).toBe("123");
            });
            it("123 format d5 equals 00123", () => {
                let num = 123;
                expect(num.toFormat('d5')).toBe("00123");
                expect(num.toFormat('D5')).toBe("00123");
            });
            it("-123 format d equals -123", () => {
                let num = -123;
                expect(num.toFormat('d')).toBe("-123");
                expect(num.toFormat('D')).toBe("-123");
            });
            it("-123 format d1 equals -123", () => {
                let num = -123;
                expect(num.toFormat('d1')).toBe("-123");
                expect(num.toFormat('D1')).toBe("-123");
            });
            it("-123 format d5 equals -0123", () => {
                let num = -123;
                expect(num.toFormat('d5')).toBe("-00123");
                expect(num.toFormat('D5')).toBe("-00123");
            });
            it("123.456 format d equals 123", () => {
                let num = 123.456;
                expect(num.toFormat('d')).toBe("123");
                expect(num.toFormat('D')).toBe("123");
            });
            it("123.567 format d equals 124", () => {
                let num = 123.567;
                expect(num.toFormat('d')).toBe("124");
                expect(num.toFormat('D')).toBe("124");
            });
            it("123.567 format d1 equals 124", () => {
                let num = 123.567;
                expect(num.toFormat('d1')).toBe("124");
                expect(num.toFormat('D1')).toBe("124");
            });
            it("123.567 format d4 equals 0124", () => {
                let num = 123.567;
                expect(num.toFormat('d4')).toBe("0124");
                expect(num.toFormat('D4')).toBe("0124");
            });
            it("-123.567 format d4 equals -124", () => {
                let num = -123.567;
                expect(num.toFormat('d4')).toBe("-0124");
                expect(num.toFormat('D4')).toBe("-0124");
            });
            it("-123.567 format d6 equals -00124", () => {
                let num = -123.567;
                expect(num.toFormat('d6')).toBe("-000124");
                expect(num.toFormat('D6')).toBe("-000124");
            });
        });
        describe("format with 'e'", () => {
            it("123 format e equals 1.230000e+2", () => {
                let num = 123;
                expect(num.toFormat('e')).toBe("1.230000e+2");
                expect(num.toFormat('E')).toBe("1.230000E+2");
            });
            it("123456789 format e equals 1.234568e+8", () => {
                let num = 123456789;
                expect(num.toFormat('e')).toBe("1.234568e+8");
                expect(num.toFormat('E')).toBe("1.234568E+8");
            });

            it("123 format e2 equals 1.23e+2", () => {
                let num = 123;
                expect(num.toFormat('e2')).toBe("1.23e+2");
                expect(num.toFormat('E2')).toBe("1.23E+2");
            });
            it("123456789 format e2 equals 1.23e+8", () => {
                let num = 123456789;
                expect(num.toFormat('e2')).toBe("1.23e+8");
                expect(num.toFormat('E2')).toBe("1.23E+8");
            });

            it("123 format e5 equals 1.23000e+2", () => {
                let num = 123;
                expect(num.toFormat('e5')).toBe("1.23000e+2");
                expect(num.toFormat('E5')).toBe("1.23000E+2");
            });
            it("123456789 format e5 equals 1.23457e+8", () => {
                let num = 123456789;
                expect(num.toFormat('e5')).toBe("1.23457e+8");
                expect(num.toFormat('E5')).toBe("1.23457E+8");
            });
        });
        describe("format with 'g'", () => {
            it("123456 format g equals 123456", () => {
                let num = 123456;
                expect(num.toFormat('g')).toBe("123456");
                expect(num.toFormat('G')).toBe("123456");
            });
            it("123456 format g2 equals 1.2e5", () => {
                let num = 123456;
                expect(num.toFormat('g2')).toBe("1.2e+5");
                expect(num.toFormat('G2')).toBe("1.2E+5");
            });
            it("123456 format g8 equals 123456.00", () => {
                let num = 123456;
                expect(num.toFormat('g8')).toBe("123456.00");
                expect(num.toFormat('G8')).toBe("123456.00");
            });
            it("-123456 format g4 equals -1.235e+5", () => {
                let num = -123456;
                expect(num.toFormat('g4')).toBe("-1.235e+5");
                expect(num.toFormat('G4')).toBe("-1.235E+5");
            });
            it("-0.0123456 format g4 equals -0.01235", () => {
                let num = -0.0123456;
                expect(num.toFormat('g4')).toBe("-0.01235");
                expect(num.toFormat('G4')).toBe("-0.01235");
            });
            it("-0.0123456 format g6 equals -0.0123456", () => {
                let num = -0.0123456;
                expect(num.toFormat('g6')).toBe("-0.0123456");
                expect(num.toFormat('G6')).toBe("-0.0123456");
            });
            it("-0.0123456 format g10 equals -0.01234560000", () => {
                let num = -0.0123456;
                expect(num.toFormat('g10')).toBe("-0.01234560000");
                expect(num.toFormat('G10')).toBe("-0.01234560000");
            });
        });
        describe("format with 'n'", () => {
            it("123 format n equals 123.00", () => {
                let num = 123;
                expect(num.toFormat('n')).toBe("123.00");
                expect(num.toFormat('N')).toBe("123.00");
            });
            it("123 format n0 equals 123", () => {
                let num = 123;
                expect(num.toFormat('n0')).toBe("123");
                expect(num.toFormat('N0')).toBe("123");
            });
            it("123 format n3 equals 123.000", () => {
                let num = 123;
                expect(num.toFormat('n3')).toBe("123.000");
                expect(num.toFormat('N3')).toBe("123.000");
            });
            it("1234567 format n equals 1,234,567.00", () => {
                let num = 1234567;
                expect(num.toFormat('n')).toBe("1,234,567.00");
                expect(num.toFormat('N')).toBe("1,234,567.00");
            });
            it("1234567 format n0 equals 1,234,567", () => {
                let num = 1234567;
                expect(num.toFormat('n0')).toBe("1,234,567");
                expect(num.toFormat('N0')).toBe("1,234,567");
            });
            it("1234567 format n3 equals 1,234,567.000", () => {
                let num = 1234567;
                expect(num.toFormat('n3')).toBe("1,234,567.000");
                expect(num.toFormat('N3')).toBe("1,234,567.000");
            });
            it("1234567.89012 format n1 equals 1,234,567.9", () => {
                let num = 1234567.89012;
                expect(num.toFormat('n1')).toBe("1,234,567.9");
                expect(num.toFormat('N1')).toBe("1,234,567.9");
            });
        });
        describe("format with 'p'", () => {
            it("0 format p equals 0.00 %", () => {
                let num = 0;
                expect(num.toFormat('p')).toBe("0.00%");
                expect(num.toFormat('P')).toBe("0.00%");
            });
            it("0.12345 format p equals 12.35%", () => {
                let num = 0.123456;
                expect(num.toFormat('p')).toBe("12.35%");
                expect(num.toFormat('P')).toBe("12.35%");
            });
            it("0.12345 format p1 equals 12.3%", () => {
                let num = 0.123456;
                expect(num.toFormat('p1')).toBe("12.3%");
                expect(num.toFormat('P1')).toBe("12.3%");
            });
            it("-123456.789 format p1 equals -12,345,678.90%", () => {
                let num = -123456.789;
                expect(num.toFormat('p')).toBe("-12,345,678.90%");
                expect(num.toFormat('P')).toBe("-12,345,678.90%");
            });
        });
        describe("format with 'r'", () => {
            it("0 format r equals 0", () => {
                let num = 0;
                expect(num.toFormat('r')).toBe("0");
                expect(num.toFormat('R')).toBe("0");
            });
            it("123.123456789000 format r equals 1234567890.123456789", () => {
                let num = 123.123456789000;
                expect(num.toFormat('r')).toBe("123.123456789");
                expect(num.toFormat('R')).toBe("123.123456789");
            });
        });
        describe("format with 'x'", () => {
            it("0 format x equals 0", () => {
                let num = 0;
                expect(num.toFormat('x')).toBe("0");
                expect(num.toFormat('X')).toBe("0");
            });
            it("255 format x equals ff", () => {
                let num = 255;
                expect(num.toFormat('x')).toBe("ff");
                expect(num.toFormat('X')).toBe("FF");
            });
            it("0 format x4 equals 0", () => {
                let num = 0;
                expect(num.toFormat('x4')).toBe("0000");
                expect(num.toFormat('X4')).toBe("0000");
            });
            it("255 format x4 equals ff", () => {
                let num = 255;
                expect(num.toFormat('x4')).toBe("00ff");
                expect(num.toFormat('X4')).toBe("00FF");
            });
            it("-255.678 format x4 equals ff", () => {
                let num = -255.678;
                expect(num.toFormat('x4')).toBe("-0100");
                expect(num.toFormat('X4')).toBe("-0100");
            });
        });

        describe("format with 'S'", () => {
            const datas: [number, string, string][] = [
                [0, 's', '0b'],
                [0, 'S3', '0B'],
                [1024, 's0', '1kb'],
                [1024, 'S0', '1KB'],
                [1024, 's2', '1.00kb'],
                [1024, 'S2', '1.00KB'],
                [1048576, 's0', '1mb'],
                [1048576, 'S0', '1MB'],
            ]
            datas.forEach(([num, fmt, res]) => {
                it(`${num} format "${fmt}" get "${res}"`, function () {
                    expect(num.toFormat(fmt)).toBe(res);
                });
            });


        });
    });

})