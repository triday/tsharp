import "../../src/extentions/String";
import "../../src/extentions/Number";
import "../../src/extentions/Date";

import { describe, it, expect } from 'vitest';
describe("String", () => {
    describe("String.isNullOrEmpty", () => {
        it("null is nullOrEmpty", () => {
            expect(String.isNullOrEmpty(null)).toBe(true);
        });
        it("undefined is nullOrEmpty", () => {
            expect(String.isNullOrEmpty(undefined)).toBe(true);
        });
        it("'' is nullOrEmpty", () => {
            expect(String.isNullOrEmpty('')).toBe(true);
        });
        it("'abc' is not nullOrEmpty", () => {
            expect(String.isNullOrEmpty('abc')).toBe(false);
        });
        it("' ' is not nullOrEmpty", () => {
            expect(String.isNullOrEmpty(' ')).toBe(false);
        });
        it("'\\t' is not nullOrEmpty", () => {
            expect(String.isNullOrEmpty('\t')).toBe(false);
        });
        it("'\\n' is not nullOrEmpty", () => {
            expect(String.isNullOrEmpty('\n')).toBe(false);
        });
        it("'\\r' is not nullOrEmpty", () => {
            expect(String.isNullOrEmpty('\r')).toBe(false);
        });
        it("'\\r\\n' is not nullOrEmpty", () => {
            expect(String.isNullOrEmpty('\r\n')).toBe(false);
        });
        it("'0' is not nullOrEmpty", () => {
            expect(String.isNullOrEmpty('0')).toBe(false);
        });
    });
    describe("String.isNullOrWhiteSpace", () => {
        it("null is nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace(null)).toBe(true);
        });
        it("undefined is nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace(undefined)).toBe(true);
        });
        it("'' is nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace('')).toBe(true);
        });
        it("'abc' is not nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace('abc')).toBe(false);
        });
        it("' ' is nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace(' ')).toBe(true);
        });
        it("'\\t' is nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace('\t')).toBe(true);
        });
        it("'\\n' is nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace('\n')).toBe(true);
        });
        it("'\\r' is nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace('\r')).toBe(true);
        });
        it("'\\r\\n' is nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace('\r\n')).toBe(true);
        });
        it("'0' is not nullOrWhiteSpace", () => {
            expect(String.isNullOrWhiteSpace('0')).toBe(false);
        });
    });
    describe("String.format", () => {
        it("null format result is null", () => {
            expect(String.format(null)).toBe(null);
        });
        it("'' format result is ''", () => {
            expect(String.format('')).toBe('');
        });
        it("format null or undefined value", () => {
            expect(String.format('ab{0}c', null)).toBe("abc");
            expect(String.format('ab{0}c', undefined)).toBe("abc");
        });
        it('no custom format', () => {
            expect(String.format('{0:f2}', {})).toBe('[object Object]');
        });
        it("format width is ok", () => {
            expect(String.format("a{0,3}b", 12)).toBe("a 12b");
            expect(String.format("a{0,-3}b", 12)).toBe("a12 b");
            expect(String.format("a{0,3}b", 123)).toBe("a123b");
            expect(String.format("a{0,-3}b", 123)).toBe("a123b");
            expect(String.format("a{0,3}b", 1234)).toBe("a1234b");
            expect(String.format("a{0,-3}b", 1234)).toBe("a1234b");
        });
        it("'{0}+{1}={2}' with args [2,3,5] format result is '2+3=5'", () => {
            expect(String.format('{0}+{1}={2}', 2, 3, 5)).toBe('2+3=5');
        });
        it("'{0,-8#green:f2}+{1#red#bold}={2,10 # # blue #bgRed ### :f3}' with args [2,3,5] format result is '...'", () => {
            let expected="\x1B[32m2.00\x1B[39m    +\x1B[1m\x1B[31m3\x1B[39m\x1B[22m=     \x1B[41m\x1B[34m5.000\x1B[39m\x1B[49m";
            let actual=String.format('{0,-8#green:f2}+{1#red#bold}={2,10 # # blue #bgRed ### :f3}', 2, 3, 5);
            expect(actual).toBe(expected);
        });
        it("format styled text",function(){
            let expected='  \x1B[32mABC\x1B[39m';
            let actual= String.format("{0,5:upper}","abc".toColorful('green'))
            expect(actual).toBe(expected);
        });
        it("'{0,-2}*{1,2} = {2:f2}' with args [8,9,72] format result is '8 * 9= 72.00'", () => {
            expect(String.format('{0,-2}*{1,2} = {2:f2}', 8, 9, 72)).toBe('8 * 9 = 72.00');
        });

        it("format datetime is ok.", () => {
            expect(String.format('北京时间:{time:YYYY年MM月DD日 HH:mm:ss}', { time: new Date('2018-11-10 23:58:40') })).toBe('北京时间:2018年11月10日 23:58:40');
        });
        it("'[{name},{age}]' with args {name:'zhangsan',age:17} format result is '[zhangsan,17]'", () => {
            expect(String.format('[{name},{age}]', { name: 'zhangsan', age: 17 })).toBe('[zhangsan,17]');
        });
    });
    describe("String.from", () => {
        it("String.from(' ', 5) equals '     '", () => {
            expect(String.from(' ', 5)).toBe('     ');
        });
        it("String.from('ab', 3) equals 'ababab'", () => {
            expect(String.from('ab', 3)).toBe('ababab');
        });

        it("String.from('', 10) equals ''", () => {
            expect(String.from('', 10)).toBe('');
        });
        it("String.from(null, 10) equals null", () => {
            expect(String.from(null, 10)).toBe("");
        });

        it("String.from(undefined, 10) equals undefined", () => {
            expect(String.from(undefined, 10)).toBe("");
        });
    });
    describe("startWithPattern", () => {
        it("abc start with pattern abc", () => {
            expect('abc'.startsWithPattern(/abc/)).toBe(true);
        });
        it("abc start with pattern a", () => {
            expect('abc'.startsWithPattern(/a/)).toBe(true);
        });
        it("123abc start with pattern ^\\d", () => {
            expect('123abc'.startsWithPattern(/^\d/)).toBe(true);
        });
        it("abc not start with pattern b", () => {
            expect('abc'.startsWithPattern(/b/)).toBe(false);
        });
        it("abc start with pattern \\w", () => {
            expect('abc'.startsWithPattern(/\w/)).toBe(true);
        });
        it("abc123 start with pattern \\w+", () => {
            expect('abc123'.startsWithPattern(/\w+/)).toBe(true);
        });
        it("abc123 not start with pattern \\d+", () => {
            expect('abc123'.startsWithPattern(/\d+/)).toBe(false);
        });
        it("123abc start with pattern \\d+", () => {
            expect('123abc'.startsWithPattern(/\d+/)).toBe(true);
        });
        it("'' not start with pattern \\d+", () => {
            expect(''.startsWithPattern(/\\d+/)).toBe(false);
        });
        it("'' start with pattern \\d*", () => {
            expect(''.startsWithPattern(/\d*/)).toBe(true);
        });
        it(' start with null pattern throws error', () => {
            expect(() => { ''.startsWithPattern(null) }).toThrow();
        });
    });
    describe("endsWithPattern", () => {
        it("abc end with pattern abc", () => {
            expect('abc'.endsWithPattern(/abc/)).toBe(true);
        });
        it("abc end with pattern c", () => {
            expect('abc'.endsWithPattern(/c/)).toBe(true);
        });
        it("abc123 end with pattern \\d+$", () => {
            expect('abc123'.endsWithPattern(/\d+$/)).toBe(true);
        });
        it("abc end end with pattern b", () => {
            expect('abc'.endsWithPattern(/b/)).toBe(false);
        });
        it("abc end with pattern \\w", () => {
            expect('abc'.endsWithPattern(/\w/)).toBe(true);
        });
        it("abc123 not end with pattern \\w+", () => {
            expect('abc123'.endsWithPattern(/\w+/)).toBe(true);
        });
        it("abc123 end with pattern \\d+", () => {
            expect('abc123'.endsWithPattern(/\d+/)).toBe(true);
        });
        it("123abc not end with pattern \\d+", () => {
            expect('123abc'.endsWithPattern(/\d+/)).toBe(false);
        });
        it("'' not end with pattern \\d+", () => {
            expect(''.endsWithPattern(/\d+/)).toBe(false);
        });
        it("'' end with pattern \\d*", () => {
            expect(''.endsWithPattern(/\d*/)).toBe(true);
        });
        it(' end with null pattern throws error', () => {
            expect(() => { ''.endsWithPattern(null) }).toThrow();
        });
    });
    describe("trimStart", () => {
        it("abc trim start equals 'abc'", () => {
            assert.equal("abc".trimStart(), "abc")
        });
        it("' abc' trim start equals 'abc'", () => {
            assert.equal(" abc".trimStart(), "abc")
        });
        it("'\\tabc' trim start equals 'abc'", () => {
            expect("\tabc".trimStart()).toBe("abc")
        });
        it("'\\nabc' trim start equals 'abc'", () => {
            expect("\nabc".trimStart()).toBe("abc")
        });
        it("'\\rabc' trim start equals 'abc'", () => {
            expect("\rabc".trimStart()).toBe("abc")
        });
        it("'  \\r\\n\\t abc' trim start equals 'abc'", () => {
            expect("  \r\n\t abc".trimStart()).toBe("abc");
        });
        it("'  \\r\\n\\t abc ' trim start equals 'abc '", () => {
            expect("  \r\n\t abc ".trimStart()).toBe("abc ");
        });

    });
    describe("trimEnd", () => {
        it("'abc' trim end equals 'abc'", () => {
            expect("abc".trimEnd()).toBe("abc");
        });
        it("'abc ' trim end equals 'abc'", () => {
            expect("abc ".trimEnd()).toBe("abc");
        });
        it("'abc\\t' trim end equals 'abc'", () => {
            expect("abc\t".trimEnd()).toBe("abc");
        });
        it("'abc\\n' trim end equals 'abc'", () => {
            expect("abc\n".trimEnd()).toBe("abc");
        });
        it("'abc\\r' trim end equals abc", () => {
            expect("abc\r".trimEnd()).toBe("abc");
        });
        it("'abc  \\r\\n\\t ' trim end equals abc", () => {
            expect("abc  \r\n\t ".trimEnd()).toBe("abc");
        });
        it("'abc  \r\n\t ' trim end equals ' abc'", () => {
            expect(" abc\r\n\t".trimEnd()).toBe(" abc");
        });

    });
    describe("trimChars", () => {
        it(`" abc " trimChars(null) get "abc"`, function () {
            expect(" abc ".trimChars(null)).toBe("abc");
        })
        it(`" abc " trimChars() get "abc"`, function () {
            expect(" abc ".trimChars("")).toBe("abc");
        })
        it(`" abc d" trimChars() get "abc d"`, function () {
            expect(" abc d".trimChars("")).toBe("abc d");
        })
        it(`"      " trimChars() get ""`, function () {
            expect("      ".trimChars("")).toBe("");
        })
        it(`"aaaa" trimChars(a) get ""`, function () {
            expect("aaaa".trimChars("a")).toBe("");
        })
        it(`" aaaa" trimChars(a) get " "`, function () {
            expect(" aaaa".trimChars("a")).toBe(" ");
        })
        it(`" aaaa " trimChars(a) get " aaaa "`, function () {
            expect(" aaaa ".trimChars("a")).toBe(" aaaa ");
        })
        it(`"abaaab" trimChars(ab) get ""`, function () {
            expect("abaaab".trimChars("ab")).toBe("");
        })
        it(`"abcabcabc" trimChars(ab) get "cabcabc"`, function () {
            expect("abcabcabc".trimChars("ab")).toBe("cabcabc");
        })
    });
    describe("replaceAll", () => {
        it("'abc' replaceall 'b' to '#' get 'a#c'", () => {
            expect("abc".replaceAll('b', '#')).toBe("a#c");
        });
        it("'abcabcabc' replaceall 'b' to '#' get 'a#ca#ca#c'", () => {
            expect("abcabcabc".replaceAll('b', '#')).toBe("a#ca#ca#c");
        });
        it("'abcabcabc' replaceall 'b' to '' get 'acacac'", () => {
            expect("abcabcabc".replaceAll('b', '')).toBe("acacac");
        });
        it("'abcabcabc' replaceall '' to '##' get 'abcabcabc'", () => {
            expect("abcabcabc".replaceAll('', '##')).toBe("abcabcabc");
        });
        it("'abcabcabc' replaceall null to '##' get 'abcabcabc'", () => {
            expect("abcabcabc".replaceAll(null, '##')).toBe("abcabcabc");
        });
        it("'abcabcabc' replaceall ' ' to '##' get 'abcabcabc'", () => {
            expect("abcabcabc".replaceAll(' ', '##')).toBe("abcabcabc");
        });
    });
    describe("equals", () => {
        it("'abc' equals 'abc'", () => {
            expect("abc".equals("abc")).toBe(true);
        });
        it("'abc' not equals null", () => {
            expect("abc".equals(null)).toBe(false);
        });
        it("'abc' not equals ''", () => {
            expect("abc".equals('')).toBe(false);
        });
        it("'' equals ''", () => {
            expect("".equals('')).toBe(true);
        });
        it("'' not equals null", () => {
            expect("".equals(null)).toBe(false);
        });
        it("'' not equals ' '", () => {
            expect("".equals(" ")).toBe(false);
        });
        it("'abc' not equals 'Abc'", () => {
            expect("abc".equals("Abc")).toBe(false);
        });
        it("'abc' equals 'Abc' if ignore case", () => {
            expect("abc".equals("Abc", true)).toBe(true);
        });
        it("'abc' not equals 'ABCD' if ignore case", () => {
            expect("abc".equals("ABCD", true)).toBe(false);
        });
    });
    describe("contains", () => {
        it("'abcde' contains 'bcd'", () => {
            expect("abcde".contains("bcd")).toBe(true);
        });
        it("'abcde' contains 'abcde'", () => {
            expect("abcde".contains("abcde")).toBe(true);
        });
        it("'abcde' not contains 'abcdef'", () => {
            expect("abcde".contains("abcdef")).toBe(false);
        });
        it("'abcde' contains ''", () => {
            expect("abcde".contains("")).toBe(true);
        });
        it("'abcde' not contains null", () => {
            expect("abcde".contains(null)).toBe(false);
        });
        it("'abcde' not contains 'BCD'", () => {
            expect("abcde".contains('BCD')).toBe(false);
        });
        it("'abcde' contains 'BCD' if ignore case", () => {
            expect("abcde".contains('BCD', true)).toBe(true);
        });
        it("'abcde' contains 'ABCDE' if ignore case", () => {
            expect("abcde".contains('ABCDE', true)).toBe(true);
        });
        it("'abcde' not contains 'ABCDEF' if ignore case", () => {
            expect("abcde".contains('ABCDEF', true)).toBe(false);
        });
    });
    describe("reverse", () => {
        it("'abc'reverse() equals 'cba'", () => {
            expect("abc".reverse()).toBe("cba");
        });
    });
    describe("toCharArray", () => {
        it("'abc'toCharArray() equals ['a','b','c']", () => {
            expect("abc".toCharArrays()).toEqual(['a', 'b', 'c']);
        })
    });
    describe("isLower", () => {
        it("'abc'isLower() is true", () => {
            expect("abc".isLower()).toBe(true);
        });

        it("''isLower() is false", () => {
            expect("".isLower()).toBe(false);
        });
        it("'abc123'isLower() is false", () => {
            expect("abc123".isLower()).toBe(false);
        });
        it("'Abc'isLower() is false", () => {
            expect("Abc".isLower()).toBe(false);
        })
    });
    describe("isUpper", () => {
        it("'ABC'isUpper() is true", () => {
            expect("ABC".isUpper()).toBe(true);
        });
        it("''isUpper() is false", () => {
            expect("".isUpper()).toBe(false);
        });
        it("'ABC123'isUpper() is true", () => {
            expect("ABC123".isUpper()).toBe(false);
        });
        it("'Abc'isUpper() is false", () => {
            expect("Abc".isUpper()).toBe(false);
        })
    });

    describe("isSpace", () => {
        it("' \\t\\n\\t\\r'isSpace() is true", () => {
            expect(" \t\n\t\r".isSpace()).toBe(true);
        });
        it("''isSpace() is false", () => {
            expect("".isSpace()).toBe(false);
        });
        it("' a 'isSpace() is false", () => {
            expect(" a ".isSpace()).toBe(false);
        });

    });

    describe("isDigit", () => {
        it("'123'isDigit() is true", () => {
            expect("123".isDigit()).toBe(true);
        });
        it("''isDigit() is false", () => {
            expect("".isDigit()).toBe(false);
        });
        it("'123abc'isDigit() is false", () => {
            expect("123abc".isDigit()).toBe(false);
        });
        it("'abc123'isDigit() is false", () => {
            expect("abc123".isDigit()).toBe(false);
        })
    });
    describe("isLowerOrDigit", () => {
        it("'123'isLowerOrDigit() is true", () => {
            expect("123".isLowerOrDigit()).toBe(true);
        });
        it("'abc'isLowerOrDigit() is true", () => {
            expect("abc".isLowerOrDigit()).toBe(true);
        });
        it("''isLowerOrDigit() is false", () => {
            expect("".isLowerOrDigit()).toBe(false);
        });
        it("'123abc123'isLowerOrDigit() is true", () => {
            expect("123abc123".isLowerOrDigit()).toBe(true);
        });
        it("'123ABC123'isLowerOrDigit() is false", () => {
            expect("123ABC123".isLowerOrDigit()).toBe(false);
        });
    });
    describe("isUpperOrDigit", () => {
        it("'123'isUpperOrDigit() is true", () => {
            expect("123".isUpperOrDigit()).toBe(true);
        });
        it("'ABC'isUpperOrDigit() is true", () => {
            expect("ABC".isUpperOrDigit()).toBe(true);
        });
        it("''isUpperOrDigit() is false", () => {
            expect("".isUpperOrDigit()).toBe(false);
        });
        it("'123abc123'isUpperOrDigit() is false", () => {
            expect("123abc123".isUpperOrDigit()).toBe(false);
        });
        it("'123ABC123'isUpperOrDigit() is true", () => {
            expect("123ABC123".isUpperOrDigit()).toBe(true);
        });
    });
    describe("isAlpha", () => {
        it("'abc'isAlpha() is true", () => {
            expect("abc".isAlpha()).toBe(true);
        });
        it("'ABC'isAlpha() is true", () => {
            expect("ABC".isAlpha()).toBe(true);
        });
        it("'abcABC'isAlpha() is true", () => {
            expect("abcABC".isAlpha()).toBe(true);
        });
        it("''isAlpha() is false", () => {
            expect("".isAlpha()).toBe(false);
        });
        it("'123abcABC'isAlpha() is false", () => {
            expect("123abcABC".isAlpha()).toBe(false);
        });
    });
    describe("isAlphaOrDigit", () => {
        it("'abc'isAlphaOrDigit() is true", () => {
            expect("abc".isAlphaOrDigit()).toBe(true);
        });
        it("'ABC'isAlphaOrDigit() is true", () => {
            expect("ABC".isAlphaOrDigit()).toBe(true);
        });
        it("'abcABC'isAlphaOrDigit() is true", () => {
            expect("abcABC".isAlphaOrDigit()).toBe(true);
        });
        it("'123abcABC'isAlphaOrDigit() is true", () => {
            expect("123abcABC".isAlphaOrDigit()).toBe(true);
        });
        it("''isAlphaOrDigit() is false", () => {
            expect("".isAlphaOrDigit()).toBe(false);
        });
        it("'Hello,World'isAlphaOrDigit() is false", () => {
            expect("Hello,World".isAlphaOrDigit()).toBe(false);
        });
    });
    describe("isBoolean", () => {
        it("'true' is boolean", () => {
            expect('true'.isBoolean()).toBe(true);
        });
        it("'TRUE' is boolean", () => {
            expect('TRUE'.isBoolean()).toBe(true);
        });
        it("'True' is boolean", () => {
            expect('True'.isBoolean()).toBe(true);
        });
        it("'+True' is not boolean", () => {
            expect('+True'.isBoolean()).toBe(false);
        });
        it("'false' is boolean", () => {
            expect('false'.isBoolean()).toBe(true);
        });
        it("'FALSE' is boolean", () => {
            expect('FALSE'.isBoolean()).toBe(true);
        });
        it("'False' is boolean", () => {
            expect('False'.isBoolean()).toBe(true);
        });
        it("'-False' is not boolean", () => {
            expect('-False'.isBoolean()).toBe(false);
        });
        it("'' is not boolean", () => {
            expect(''.isBoolean()).toBe(false);
        });
        it("'abc' is not boolean", () => {
            expect('abc'.isBoolean()).toBe(false);
        });
    });
    describe("isNumber", () => {
        it("'123' is number", () => {
            expect('123'.isNumber()).toBe(true);
        });
        it("'.123' is number", () => {
            expect('.123'.isNumber()).toBe(true);
        });
        it("'-.123' is number", () => {
            expect('-.123'.isNumber()).toBe(true);
        });
        it("'+.123' is number", () => {
            expect('+.123'.isNumber()).toBe(true);
        });
        it("'123a' is not number", () => {
            expect('123a'.isNumber()).toBe(false);
        });
        it("'abc' is not number", () => {
            expect('abc'.isNumber()).toBe(false);
        });

        it('Infinity is not number', () => {
            expect((1 / 0).toString().isNumber()).toBe(false);
        });
    });
    describe("isPattern", () => {
        it("'123' is '\\d+' pattern ", () => {
            expect('123'.isPattern(/\d+/)).toBe(true);
        });
        it("'abc' is not '\\d+' pattern ", () => {
            expect('abc'.isPattern(/\d+/)).toBe(false);
        });
        it("throw error if pattern is null ", () => {
            expect(() => { 'abc'.isPattern(null) }).toThrow();
        });
    });
    describe("isEmail", () => {
        const validEmails = [
            "ma@hostname.com",
            "ma@hostname.comcom",
            "m.a@hostname.co",
            "m_a1a@hostname.com",
            "ma-a@hostname.com",
            "ma-a@hostname.com.edu",
            "ma-a.aa@hostname.com.edu",
            "ma.h.saraf.onemore@hostname.com.edu",
            "ma12@hostname.com",
            "12@hostname.com",
        ];
        const invalidEmails = [
            "Abc.example.com",     // No `@`
            "A@b@c@example.com",   // multiple `@`
            "ma...ma@jjf.co",      // continuous multiple dots in name
            "ma@jjf..com",         // continuous multiple dots in domain
            "ma@@jjf.com",         // continuous multiple `@`
            "@majjf.com",          // nothing before `@`
            "ma.@jjf.com",         // nothing after `.`
            "ma_@jjf",             // no domain extension 
            "ma_@jjf.",            // nothing after `_` and .
            "ma@jjf.",             // nothing after `.`
        ];


        describe('valid email address', () => {
            validEmails.forEach(text => {
                it(`'${text} is valid email'`, () => {
                    expect(text.isEmail()).toBe(true);
                });

            });
        });
        describe('invalid eamil address', () => {
            invalidEmails.forEach(text => {
                it(`'${text} is invalid email'`, () => {
                    expect(text.isEmail()).toBe(false);
                });
            });
        });
    });
    describe("isVarName", () => {
        const validNames = [
            '_',
            '$',
            '__',
            '$$',
            '$a$',
            '_a_',
            'name',
            'name100',
            'name_100'
        ];
        const invalidNames = [
            '123',
            'abc.efg',
            'abc\nefg',
            ''
        ]
        describe('valid var name', () => {
            validNames.forEach(text => {
                it(`'${text} is valid var name'`, () => {
                    expect(text.isVarName()).toBe(true);
                });

            });
        });
        describe('invalid var name', () => {
            invalidNames.forEach(text => {
                it(`'${text} is invalid var name'`, () => {
                    expect(text.isVarName()).toBe(false);
                });
            });
        });

    });

    describe("hashCode", () => {
        it("the hash code is unique and fixed", () => {
            let text1 = Math.round((Math.random() * 1000)).toString();
            let text2 = Math.round((Math.random() * 1000)).toString();
            let hashCode1 = text1.hashCode();
            let hashCode2 = text2.hashCode();
            if (text1 === text2) {
                expect(hashCode1).toBe(hashCode2);
            } else {
                expect(hashCode1).not.toBe(hashCode2);
            }
        })
    });
    describe("truncat", () => {
        it("'abcde' truncat 10 is 'abcde'", () => {
            expect('abcde'.truncat(10)).toBe('abcde');
        });
        it("'abcde' truncat 5 is 'abcde'", () => {
            expect('abcde'.truncat(5)).toBe('abcde');
        });
        it("'abcdef' truncat 5 is 'abcde'", () => {
            expect('abcdef'.truncat(5)).toBe('ab...');
        });
        it("'abcdef' truncat(5,'##') is 'abcde'", () => {
            expect('abcdef'.truncat(5, '##')).toBe('abc##');
        });
        it('throws error if the ends text too long', () => {
            expect(() => { 'abc'.truncat(2) }).toThrow();
        });
    });

    describe("htmlEncode", () => {
        const datas = [
            ["", ""],
            ["\n", "<br>"],
            ["<", "&lt;"],
            [">", "&gt;"],
            ["&", "&amp;"],
            ["<>", "&lt;&gt;"],
            ["<>\"abc&", "&lt;&gt;\"abc&amp;"],
            ["<p>test！</p>", "&lt;p&gt;test！&lt;/p&gt;"]
        ]
        datas.forEach(([text, encode]) => {
            it(`htmlencode "${text}" get "${encode}"`, () => {
                expect(encode).toBe(text.htmlEncode());
            })
        })
    });
    describe("htmlDecode", () => {
        const datas = [
            ["", ""],
            ["\n", "<br>"],
            ["<", "&lt;"],
            [">", "&gt;"],
            ["&", "&amp;"],
            ["<>", "&lt;&gt;"],
            ["<>\"abc&", "&lt;&gt;\"abc&amp;"],
            ["<p>test！</p>", "&lt;p&gt;test！&lt;/p&gt;"]
        ]
        datas.forEach(([text, encode]) => {
            it(`htmldecode "${encode}" get "${text}"`, () => {
                expect(text).toBe(encode.htmlDocode());
            })
        })
    });
    describe("toTitleCase", () => {
        const data = [
            ["", ""],
            ["abc", "Abc"],
            ["Hello world", "Hello World"],
            ["wAr aNd pEaCe", "War And Peace"],
            ["ABC", "Abc"],
            ["Abc", "Abc"],
        ];
        data.forEach(([from, to]) => {
            it(`"${from}" toTileCase get "${to}"`, function () {
                expect(from.toTitleCase()).toBe(to);
            });
        });
    });
    describe("toCamelCase", () => {
        const data = [
            ["", ""],
            ["abc", "abc"],
            ["Hello world", "helloWorld"],
            ["background-color", "backgroundColor"],
            ["background_color", "backgroundColor"],
            ["backgroundColor", "backgroundColor"],
            ["ab-cd-ef", "abCdEf"],
            ["ab-cd-ef-", "abCdEf"],
            ["ab-cd-ef--", "abCdEf"],
            ["ab-cd--ef--", "abCdEf"],
            ["--ab-cd--ef--", "abCdEf"],
            ["--ab-cd-__-ef--", "abCdEf"]
        ];
        data.forEach(([from, to]) => {
            it(`"${from}" toCamelCase get "${to}"`, function () {
                expect(from.toCamelCase()).toBe(to);
            });
        });
        const data2 = [
            ["", ""],
            ["abc", "Abc"],
            ["Hello world", "HelloWorld"],
            ["background-color", "BackgroundColor"],
            ["background_color", "BackgroundColor"],
            ["backgroundColor", "BackgroundColor"],
            ["ab-cd-ef", "AbCdEf"],
            ["ab-cd-ef-", "AbCdEf"],
            ["ab-cd-ef--", "AbCdEf"],
            ["ab-cd--ef--", "AbCdEf"],
            ["--ab-cd--ef--", "AbCdEf"],
            ["--ab-cd-__-ef--", "AbCdEf"]
        ];
        data2.forEach(([from, to]) => {
            it(`"${from}" toCamelCase with firstWorldUpper get "${to}"`, function () {
                expect(from.toCamelCase(true)).toBe(to);
            });
        });
    });
    describe("toCssName", () => {
        const data = [
            ["", ""],
            ["border", "border"],
            ["borderBottom", "border-bottom"],
            ["borderBottomColor", "border-bottom-color"],
            ["border-bottom", "border-bottom"],
            ["border-bottom-color", "border-bottom-color"],
        ];
        data.forEach(([from, to]) => {
            it(`"${from}" toCssName  get "${to}"`, function () {
                expect(from.toCssName()).toBe(to);
            });
        })
    });
    describe("toColorful", () => {
        it(`abc toColorful("blue") == "\x1B[34mabc\x1B[39m"`, function () {
            let actual = "abc".toColorful("blue")
            expect(actual).toBe("\x1B[34mabc\x1B[39m");
        });
        it('redBright',function(){
            let actual = "abc".toColorful("redBright");
            expect(actual).toBe("\x1B[91mabc\x1B[39m");
        }
        )
        it(`abc toColorful("blue","cyanBG") == "\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m"`, function () {
            let actual = "abc".toColorful("blue", "bgCyan")
            expect(actual).toBe("\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m");
        });
        it(`abc toColorful("blue","cyanBG","bold","italic") == "\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m"`, function () {
            let actual = "abc".toColorful("blue", "bgCyan", "bold", "italic")
            expect(actual).toBe("\x1B[3m\x1B[1m\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m\x1B[22m\x1B[23m");
        });

        it(`nested colorful works ok`,function(){
            let actual=`a${'b'.toColorful('red')}c`.toColorful('blue');
            let expected='\x1B[34ma\x1B[31mb\x1B[34mc\x1B[39m';
            expect(actual).toBe(expected);
        })

    });
    describe("clearColorful", () => {
        it(`"abc" clearColorful() == "abc"`, function () {
            let actual = "abc".clearColurful();
            expect(actual).toBe("abc");
        });
        it(`"\x1B[34mabc\x1B[39m" clearColorful() == "abc"`, function () {
            let actual = "\x1B[34mabc\x1B[39m".clearColurful();
            expect(actual).toBe("abc");
        });
        it(`"\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m" clearColorful() == "abc"`, function () {
            let actual = "\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m".clearColurful()
            expect(actual).toBe("abc");
        });



    });
    describe("toFormat", () => {
        const data = [["abc", "lower", "abc"],
        ["abc", "upper", "ABC"],
        ["abc", "title", "Abc"],
        ["abcBcd", "css", "abc-bcd"],
        ["abc-bcd", "camel", "abcBcd"]
        ]
        data.forEach(([text, fmt, res]) => {
            it(`"${text}".toFormat(${fmt})=="${res}"`, function () {
                expect(text.toFormat(fmt as any)).toBe(res);
            })
        });
        
    });
});