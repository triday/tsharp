import "../../src/extentions/String";
import "../../src/extentions/Number";
import "../../src/extentions/Date";

import "mocha"
import * as assert from "assert";
describe("String", () => {
    describe("String.isNullOrEmpty", () => {
        it("null is nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty(null), true);
        });
        it("undefined is nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty(undefined), true);
        });
        it("'' is nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty(''), true);
        });
        it("'abc' is not nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty('abc'), false);
        });
        it("' ' is not nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty(' '), false);
        });
        it("'\\t' is not nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty('\t'), false);
        });
        it("'\\n' is not nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty('\n'), false);
        });
        it("'\\r' is not nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty('\r'), false);
        });
        it("'\\r\\n' is not nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty('\r\n'), false);
        });
        it("'0' is not nullOrEmpty", () => {
            assert.equal(String.isNullOrEmpty('0'), false);
        });
    });
    describe("String.isNullOrWhiteSpace", () => {
        it("null is nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace(null), true);
        });
        it("undefined is nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace(undefined), true);
        });
        it("'' is nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace(''), true);
        });
        it("'abc' is not nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace('abc'), false);
        });
        it("' ' is nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace(' '), true);
        });
        it("'\\t' is nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace('\t'), true);
        });
        it("'\\n' is nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace('\n'), true);
        });
        it("'\\r' is nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace('\r'), true);
        });
        it("'\\r\\n' is nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace('\r\n'), true);
        });
        it("'0' is not nullOrWhiteSpace", () => {
            assert.equal(String.isNullOrWhiteSpace('0'), false);
        });
    });
    describe("String.format", () => {
        it("null format result is null", () => {
            assert.equal(String.format(null), null);
        });
        it("'' format result is ''", () => {
            assert.equal(String.format(''), '');
        });
        it("format null or undefined value", () => {
            assert.equal(String.format('ab{0}c', null), "abc");
            assert.equal(String.format('ab{0}c', undefined), "abc");
        });
        it('no custom format', () => {
            assert.equal(String.format('{0:f2}', {}), '[object Object]');
        });
        it("format width is ok", () => {
            assert.equal(String.format("a{0,3}b", 12), "a 12b");
            assert.equal(String.format("a{0,-3}b", 12), "a12 b");
            assert.equal(String.format("a{0,3}b", 123), "a123b");
            assert.equal(String.format("a{0,-3}b", 123), "a123b");
            assert.equal(String.format("a{0,3}b", 1234), "a1234b");
            assert.equal(String.format("a{0,-3}b", 1234), "a1234b");
        });
        it("'{0}+{1}={2}' with args [2,3,5] format result is '2+3=5'", () => {
            assert.equal(String.format('{0}+{1}={2}', 2, 3, 5), '2+3=5');
        });
        it("'{0,-8#green:f2}+{1#red#bold}={2,10 # # blue #redBG ### :f3}' with args [2,3,5] format result is '...'", () => {
            let expected="\x1B[32m2.00\x1B[39m    +\x1B[1m\x1B[31m3\x1B[39m\x1B[22m=     \x1B[41m\x1B[34m5.000\x1B[39m\x1B[49m";
            let actual=String.format('{0,-8#green:f2}+{1#red#bold}={2,10 # # blue #redBG ### :f3}', 2, 3, 5);
            assert.equal(actual,expected);
        });

        it("'{0,-2}*{1,2} = {2:f2}' with args [8,9,72] format result is '8 * 9= 72.00'", () => {
            assert.equal(String.format('{0,-2}*{1,2} = {2:f2}', 8, 9, 72), '8 * 9 = 72.00');
        });

        it("format datetime is ok.", () => {
            assert.equal(String.format('北京时间:{time:YYYY年MM月DD日 HH:mm:ss}', { time: new Date('2018-11-10 23:58:40') }), '北京时间:2018年11月10日 23:58:40');
        });
        it("'[{name},{age}]' with args {name:'zhangsan',age:17} format result is '[zhangsan,17]'", () => {
            assert.equal(String.format('[{name},{age}]', { name: 'zhangsan', age: 17 }), '[zhangsan,17]');
        });
    });
    describe("String.from", () => {
        it("String.from(' ', 5) equals '     '", () => {
            assert.equal(String.from(' ', 5), '     ');
        });
        it("String.from('ab', 3) equals 'ababab'", () => {
            assert.equal(String.from('ab', 3), 'ababab');
        });

        it("String.from('', 10) equals ''", () => {
            assert.equal(String.from('', 10), '');
        });
        it("String.from(null, 10) equals null", () => {
            assert.equal(String.from(null, 10), "");
        });

        it("String.from(undefined, 10) equals undefined", () => {
            assert.equal(String.from(undefined, 10), "");
        });
    });
    describe("startWithPattern", () => {
        it("abc start with pattern abc", () => {
            assert.equal('abc'.startsWithPattern(/abc/), true);
        });
        it("abc start with pattern a", () => {
            assert.equal('abc'.startsWithPattern(/a/), true);
        });
        it("123abc start with pattern ^\\d", () => {
            assert.equal('123abc'.startsWithPattern(/^\d/), true);
        });
        it("abc not start with pattern b", () => {
            assert.equal('abc'.startsWithPattern(/b/), false);
        });
        it("abc start with pattern \\w", () => {
            assert.equal('abc'.startsWithPattern(/\w/), true);
        });
        it("abc123 start with pattern \\w+", () => {
            assert.equal('abc123'.startsWithPattern(/\w+/), true);
        });
        it("abc123 not start with pattern \\d+", () => {
            assert.equal('abc123'.startsWithPattern(/\d+/), false);
        });
        it("123abc start with pattern \\d+", () => {
            assert.equal('123abc'.startsWithPattern(/\d+/), true);
        });
        it("'' not start with pattern \\d+", () => {
            assert.equal(''.startsWithPattern(/\\d+/), false);
        });
        it("'' start with pattern \\d*", () => {
            assert.equal(''.startsWithPattern(/\d*/), true);
        });
        it(' start with null pattern throws error', () => {
            assert.throws(() => { ''.startsWithPattern(null) });
        });
    });
    describe("endsWithPattern", () => {
        it("abc end with pattern abc", () => {
            assert.equal('abc'.endsWithPattern(/abc/), true);
        });
        it("abc end with pattern c", () => {
            assert.equal('abc'.endsWithPattern(/c/), true);
        });
        it("abc123 end with pattern \\d+$", () => {
            assert.equal('abc123'.endsWithPattern(/\d+$/), true);
        });
        it("abc end end with pattern b", () => {
            assert.equal('abc'.endsWithPattern(/b/), false);
        });
        it("abc end with pattern \\w", () => {
            assert.equal('abc'.endsWithPattern(/\w/), true);
        });
        it("abc123 not end with pattern \\w+", () => {
            assert.equal('abc123'.endsWithPattern(/\w+/), true);
        });
        it("abc123 end with pattern \\d+", () => {
            assert.equal('abc123'.endsWithPattern(/\d+/), true);
        });
        it("123abc not end with pattern \\d+", () => {
            assert.equal('123abc'.endsWithPattern(/\d+/), false);
        });
        it("'' not end with pattern \\d+", () => {
            assert.equal(''.endsWithPattern(/\d+/), false);
        });
        it("'' end with pattern \\d*", () => {
            assert.equal(''.endsWithPattern(/\d*/), true);
        });
        it(' end with null pattern throws error', () => {
            assert.throws(() => { ''.endsWithPattern(null) });
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
            assert.equal("\tabc".trimStart(), "abc")
        });
        it("'\\nabc' trim start equals 'abc'", () => {
            assert.equal("\nabc".trimStart(), "abc")
        });
        it("'\\rabc' trim start equals 'abc'", () => {
            assert.equal("\rabc".trimStart(), "abc")
        });
        it("'  \\r\\n\\t abc' trim start equals 'abc'", () => {
            assert.equal("  \r\n\t abc".trimStart(), "abc")
        });
        it("'  \\r\\n\\t abc ' trim start equals 'abc '", () => {
            assert.equal("  \r\n\t abc ".trimStart(), "abc ")
        });

    });
    describe("trimEnd", () => {
        it("'abc' trim end equals 'abc'", () => {
            assert.equal("abc".trimEnd(), "abc");
        });
        it("'abc ' trim end equals 'abc'", () => {
            assert.equal("abc ".trimEnd(), "abc");
        });
        it("'abc\\t' trim end equals 'abc'", () => {
            assert.equal("abc\t".trimEnd(), "abc");
        });
        it("'abc\\n' trim end equals 'abc'", () => {
            assert.equal("abc\n".trimEnd(), "abc");
        });
        it("'abc\\r' trim end equals abc", () => {
            assert.equal("abc\r".trimEnd(), "abc");
        });
        it("'abc  \\r\\n\\t ' trim end equals abc", () => {
            assert.equal("abc  \r\n\t ".trimEnd(), "abc");
        });
        it("'abc  \\r\\n\\t ' trim end equals ' abc'", () => {
            assert.equal(" abc  \r\n\t ".trimEnd(), " abc");
        });

    });
    describe("trimChars", () => {
        it(`" abc " trimChars(null) get "abc"`, function () {
            assert.equal(" abc ".trimChars(null), "abc");
        })
        it(`" abc " trimChars() get "abc"`, function () {
            assert.equal(" abc ".trimChars(""), "abc");
        })
        it(`" abc d" trimChars() get "abc d"`, function () {
            assert.equal(" abc d".trimChars(""), "abc d");
        })
        it(`"      " trimChars() get ""`, function () {
            assert.equal("      ".trimChars(""), "");
        })
        it(`"aaaa" trimChars(a) get ""`, function () {
            assert.equal("aaaa".trimChars("a"), "");
        })
        it(`" aaaa" trimChars(a) get " "`, function () {
            assert.equal(" aaaa".trimChars("a"), " ");
        })
        it(`" aaaa " trimChars(a) get " aaaa "`, function () {
            assert.equal(" aaaa ".trimChars("a"), " aaaa ");
        })
        it(`"abaaab" trimChars(ab) get ""`, function () {
            assert.equal("abaaab".trimChars("ab"), "");
        })
        it(`"abcabcabc" trimChars(ab) get "cabcabc"`, function () {
            assert.equal("abcabcabc".trimChars("ab"), "cabcabc");
        })
    });
    describe("replaceAll", () => {
        it("'abc' replaceall 'b' to '#' get 'a#c'", () => {
            assert.equal("abc".replaceAll('b', '#'), "a#c");
        });
        it("'abcabcabc' replaceall 'b' to '#' get 'a#ca#ca#c'", () => {
            assert.equal("abcabcabc".replaceAll('b', '#'), "a#ca#ca#c");
        });
        it("'abcabcabc' replaceall 'b' to '' get 'acacac'", () => {
            assert.equal("abcabcabc".replaceAll('b', ''), "acacac");
        });
        it("'abcabcabc' replaceall '' to '##' get 'abcabcabc'", () => {
            assert.equal("abcabcabc".replaceAll('', '##'), "abcabcabc");
        });
        it("'abcabcabc' replaceall null to '##' get 'abcabcabc'", () => {
            assert.equal("abcabcabc".replaceAll(null, '##'), "abcabcabc");
        });
        it("'abcabcabc' replaceall ' ' to '##' get 'abcabcabc'", () => {
            assert.equal("abcabcabc".replaceAll(' ', '##'), "abcabcabc");
        });
    });
    describe("equals", () => {
        it("'abc' equals 'abc'", () => {
            assert.equal("abc".equals("abc"), true);
        });
        it("'abc' not equals null", () => {
            assert.equal("abc".equals(null), false);
        });
        it("'abc' not equals ''", () => {
            assert.equal("abc".equals(''), false);
        });
        it("'' equals ''", () => {
            assert.equal("".equals(''), true);
        });
        it("'' not equals null", () => {
            assert.equal("".equals(null), false);
        });
        it("'' not equals ' '", () => {
            assert.equal("".equals(" "), false);
        });
        it("'abc' not equals 'Abc'", () => {
            assert.equal("abc".equals("Abc"), false);
        });
        it("'abc' equals 'Abc' if ignore case", () => {
            assert.equal("abc".equals("Abc", true), true);
        });
        it("'abc' not equals 'ABCD' if ignore case", () => {
            assert.equal("abc".equals("ABCD", true), false);
        });
    });
    describe("contains", () => {
        it("'abcde' contains 'bcd'", () => {
            assert.equal("abcde".contains("bcd"), true);
        });
        it("'abcde' contains 'abcde'", () => {
            assert.equal("abcde".contains("abcde"), true);
        });
        it("'abcde' not contains 'abcdef'", () => {
            assert.equal("abcde".contains("abcdef"), false);
        });
        it("'abcde' contains ''", () => {
            assert.equal("abcde".contains(""), true);
        });
        it("'abcde' not contains null", () => {
            assert.equal("abcde".contains(null), false);
        });
        it("'abcde' not contains 'BCD'", () => {
            assert.equal("abcde".contains('BCD'), false);
        });
        it("'abcde' contains 'BCD' if ignore case", () => {
            assert.equal("abcde".contains('BCD', true), true);
        });
        it("'abcde' contains 'ABCDE' if ignore case", () => {
            assert.equal("abcde".contains('ABCDE', true), true);
        });
        it("'abcde' not contains 'ABCDEF' if ignore case", () => {
            assert.equal("abcde".contains('ABCDEF', true), false);
        });
    });
    describe("reverse", () => {
        it("'abc'reverse() equals 'cba'", () => {
            assert.equal("abc".reverse(), "cba");
        });
    });
    describe("toCharArray", () => {
        it("'abc'toCharArray() equals ['a','b','c']", () => {
            assert.deepEqual("abc".toCharArrays(), ['a', 'b', 'c']);
        })
    });
    describe("isLower", () => {
        it("'abc'isLower() is true", () => {
            assert.equal("abc".isLower(), true);
        });

        it("''isLower() is false", () => {
            assert.equal("".isLower(), false);
        });
        it("'abc123'isLower() is false", () => {
            assert.equal("abc123".isLower(), false);
        });
        it("'Abc'isLower() is false", () => {
            assert.equal("Abc".isLower(), false);
        })
    });
    describe("isUpper", () => {
        it("'ABC'isUpper() is true", () => {
            assert.equal("ABC".isUpper(), true);
        });
        it("''isUpper() is false", () => {
            assert.equal("".isUpper(), false);
        });
        it("'ABC123'isUpper() is true", () => {
            assert.equal("ABC123".isUpper(), false);
        });
        it("'Abc'isUpper() is false", () => {
            assert.equal("Abc".isUpper(), false);
        })
    });

    describe("isSpace", () => {
        it("' \\t\\n\\t\\r'isSpace() is true", () => {
            assert.equal(" \t\n\t\r".isSpace(), true);
        });
        it("''isSpace() is false", () => {
            assert.equal("".isSpace(), false);
        });
        it("' a 'isSpace() is false", () => {
            assert.equal(" a ".isSpace(), false);
        });

    });

    describe("isDigit", () => {
        it("'123'isDigit() is true", () => {
            assert.equal("123".isDigit(), true);
        });
        it("''isDigit() is false", () => {
            assert.equal("".isDigit(), false);
        });
        it("'123abc'isDigit() is false", () => {
            assert.equal("123abc".isDigit(), false);
        });
        it("'abc123'isDigit() is false", () => {
            assert.equal("abc123".isDigit(), false);
        })
    });
    describe("isLowerOrDigit", () => {
        it("'123'isLowerOrDigit() is true", () => {
            assert.equal("123".isLowerOrDigit(), true);
        });
        it("'abc'isLowerOrDigit() is true", () => {
            assert.equal("abc".isLowerOrDigit(), true);
        });
        it("''isLowerOrDigit() is false", () => {
            assert.equal("".isLowerOrDigit(), false);
        });
        it("'123abc123'isLowerOrDigit() is true", () => {
            assert.equal("123abc123".isLowerOrDigit(), true);
        });
        it("'123ABC123'isLowerOrDigit() is false", () => {
            assert.equal("123ABC123".isLowerOrDigit(), false);
        });
    });
    describe("isUpperOrDigit", () => {
        it("'123'isUpperOrDigit() is true", () => {
            assert.equal("123".isUpperOrDigit(), true);
        });
        it("'ABC'isUpperOrDigit() is true", () => {
            assert.equal("ABC".isUpperOrDigit(), true);
        });
        it("''isUpperOrDigit() is false", () => {
            assert.equal("".isUpperOrDigit(), false);
        });
        it("'123abc123'isUpperOrDigit() is false", () => {
            assert.equal("123abc123".isUpperOrDigit(), false);
        });
        it("'123ABC123'isUpperOrDigit() is true", () => {
            assert.equal("123ABC123".isUpperOrDigit(), true);
        });
    });
    describe("isAlpha", () => {
        it("'abc'isAlpha() is true", () => {
            assert.equal("abc".isAlpha(), true);
        });
        it("'ABC'isAlpha() is true", () => {
            assert.equal("ABC".isAlpha(), true);
        });
        it("'abcABC'isAlpha() is true", () => {
            assert.equal("abcABC".isAlpha(), true);
        });
        it("''isAlpha() is false", () => {
            assert.equal("".isAlpha(), false);
        });
        it("'123abcABC'isAlpha() is false", () => {
            assert.equal("123abcABC".isAlpha(), false);
        });
    });
    describe("isAlphaOrDigit", () => {
        it("'abc'isAlphaOrDigit() is true", () => {
            assert.equal("abc".isAlphaOrDigit(), true);
        });
        it("'ABC'isAlphaOrDigit() is true", () => {
            assert.equal("ABC".isAlphaOrDigit(), true);
        });
        it("'abcABC'isAlphaOrDigit() is true", () => {
            assert.equal("abcABC".isAlphaOrDigit(), true);
        });
        it("'123abcABC'isAlphaOrDigit() is true", () => {
            assert.equal("123abcABC".isAlphaOrDigit(), true);
        });
        it("''isAlphaOrDigit() is false", () => {
            assert.equal("".isAlphaOrDigit(), false);
        });
        it("'Hello,World'isAlphaOrDigit() is false", () => {
            assert.equal("Hello,World".isAlphaOrDigit(), false);
        });
    });
    describe("isBoolean", () => {
        it("'true' is boolean", () => {
            assert.equal('true'.isBoolean(), true);
        });
        it("'TRUE' is boolean", () => {
            assert.equal('TRUE'.isBoolean(), true);
        });
        it("'True' is boolean", () => {
            assert.equal('True'.isBoolean(), true);
        });
        it("'+True' is not boolean", () => {
            assert.equal('+True'.isBoolean(), false);
        });
        it("'false' is boolean", () => {
            assert.equal('false'.isBoolean(), true);
        });
        it("'FALSE' is boolean", () => {
            assert.equal('FALSE'.isBoolean(), true);
        });
        it("'False' is boolean", () => {
            assert.equal('False'.isBoolean(), true);
        });
        it("'-False' is not boolean", () => {
            assert.equal('-False'.isBoolean(), false);
        });
        it("'' is not boolean", () => {
            assert.equal(''.isBoolean(), false);
        });
        it("'abc' is not boolean", () => {
            assert.equal('abc'.isBoolean(), false);
        });
    });
    describe("isNumber", () => {
        it("'123' is number", () => {
            assert.equal('123'.isNumber(), true);
        });
        it("'.123' is number", () => {
            assert.equal('.123'.isNumber(), true);
        });
        it("'-.123' is number", () => {
            assert.equal('-.123'.isNumber(), true);
        });
        it("'+.123' is number", () => {
            assert.equal('+.123'.isNumber(), true);
        });
        it("'123a' is not number", () => {
            assert.equal('123a'.isNumber(), false);
        });
        it("'abc' is not number", () => {
            assert.equal('abc'.isNumber(), false);
        });

        it('Infinity is not number', () => {
            assert.equal((1 / 0).toString().isNumber(), false);
        });
    });
    describe("isPattern", () => {
        it("'123' is '\\d+' pattern ", () => {
            assert.equal('123'.isPattern(/\d+/), true);
        });
        it("'abc' is not '\\d+' pattern ", () => {
            assert.equal('abc'.isPattern(/\d+/), false);
        });
        it("throw error if pattern is null ", () => {
            assert.throws(() => { 'abc'.isPattern(null) });
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
                    assert.equal(text.isEmail(), true);
                });

            });
        });
        describe('invalid eamil address', () => {
            invalidEmails.forEach(text => {
                it(`'${text} is invalid email'`, () => {
                    assert.equal(text.isEmail(), false);
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
                    assert.equal(text.isVarName(), true);
                });

            });
        });
        describe('invalid var name', () => {
            invalidNames.forEach(text => {
                it(`'${text} is invalid var name'`, () => {
                    assert.equal(text.isVarName(), false);
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
                assert.equal(hashCode1, hashCode2);
            } else {
                assert.notEqual(hashCode1, hashCode2);
            }
        })
    });
    describe("truncat", () => {
        it("'abcde' truncat 10 is 'abcde'", () => {
            assert.equal('abcde'.truncat(10), 'abcde');
        });
        it("'abcde' truncat 5 is 'abcde'", () => {
            assert.equal('abcde'.truncat(5), 'abcde');
        });
        it("'abcdef' truncat 5 is 'abcde'", () => {
            assert.equal('abcdef'.truncat(5), 'ab...');
        });
        it("'abcdef' truncat(5,'##') is 'abcde'", () => {
            assert.equal('abcdef'.truncat(5, '##'), 'abc##');
        });
        it('throws error if the ends text too long', () => {
            assert.throws(() => { 'abc'.truncat(2) });
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
                assert.equal(encode, text.htmlEncode());
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
                assert.equal(text, encode.htmlDocode());
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
                assert.equal(from.toTitleCase(), to);
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
                assert.equal(from.toCamelCase(), to);
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
                assert.equal(from.toCamelCase(true), to);
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
                assert.equal(from.toCssName(), to);
            });
        })
    });
    describe("toColorful", () => {
        it(`abc toColorful("blue") == "\x1B[34mabc\x1B[39m"`, function () {
            let actual = "abc".toColorful("blue")
            assert.equal(actual, "\x1B[34mabc\x1B[39m");
        });
        it(`abc toColorful("blue","cyanBG") == "\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m"`, function () {
            let actual = "abc".toColorful("blue", "cyanBG")
            assert.equal(actual, "\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m");
        });
        it(`abc toColorful("blue","cyanBG","bold","italic") == "\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m"`, function () {
            let actual = "abc".toColorful("blue", "cyanBG", "bold", "italic")
            assert.equal(actual, "\x1B[3m\x1B[1m\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m\x1B[22m\x1B[23m");
        });

        it(`nested colorful works ok`,function(){
            let actual=`a${'b'.toColorful('red')}c`.toColorful('blue');
            let expected='\x1B[34ma\x1B[31mb\x1B[34mc\x1B[39m';
            assert.equal(actual,expected);
        })

    });
    describe("clearColorful", () => {
        it(`"abc" clearColorful() == "abc"`, function () {
            let actual = "abc".clearColurful();
            assert.equal(actual, "abc");
        });
        it(`"\x1B[34mabc\x1B[39m" clearColorful() == "abc"`, function () {
            let actual = "\x1B[34mabc\x1B[39m".clearColurful();
            assert.equal(actual, "abc");
        });
        it(`"\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m" clearColorful() == "abc"`, function () {
            let actual = "\x1B[46m\x1B[34mabc\x1B[39m\x1B[49m".clearColurful()
            assert.equal(actual, "abc");
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
                assert.equal(text.toFormat(fmt as any), res);
            })
        });
        
    });
});