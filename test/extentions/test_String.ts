import "../../src/extentions/String"
import "../../src/extentions/Number"
import "../../src/extentions/Date"

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
        it("'{0}+{1}={2}' with args [2,3,5] format result is '2+3=5'", () => {
            assert.equal(String.format('{0}+{1}={2}', 2, 3, 5), '2+3=5');
        });
        it("'{0,-2}*{1,2} = {2:f2}' with args [8,9,72] format result is '8 * 9= 72.00'", () => {
            assert.equal(String.format('{0,-2}*{1,2} = {2:f2}', 8, 9, 72), '8 * 9 = 72.00');
        });
        
        it("format datetime is ok.", () => {
            assert.equal(String.format('北京时间:{time:YYYY年MM月DD日 HH:mm:ss}',{time:new Date('2018-11-10 23:58:40')}), '北京时间:2018年11月10日 23:58:40');
        });
        it("'[{name},{age}]' with args {name:'zhangsan',age:17} format result is '[zhangsan,17]'", () => {
            assert.equal(String.format('[{name},{age}]', { name: 'zhangsan', age: 17 }), '[zhangsan,17]');
        });
    });
    describe("startWithPattern", () => {
        it("abc start with pattern abc", () => {
            assert.equal('abc'.startsWithPattern('abc'), true);
        });
        it("abc start with pattern a", () => {
            assert.equal('abc'.startsWithPattern('a'), true);
        });
        it("abc not start with pattern b", () => {
            assert.equal('abc'.startsWithPattern('b'), false);
        });
        it("abc start with pattern \\w", () => {
            assert.equal('abc'.startsWithPattern('\\w'), true);
        });
        it("abc123 start with pattern \\w+", () => {
            assert.equal('abc123'.startsWithPattern('\\w+'), true);
        });
        it("abc123 not start with pattern \\d+", () => {
            assert.equal('abc123'.startsWithPattern('\\d+'), false);
        });
        it("123abc start with pattern \\d+", () => {
            assert.equal('123abc'.startsWithPattern('\\d+'), true);
        });
        it("'' not start with pattern \\d+", () => {
            assert.equal(''.startsWithPattern('\\d+'), false);
        });
        it("'' start with pattern \\d*", () => {
            assert.equal(''.startsWithPattern('\\d*'), true);
        });
    });
    describe("endsWithPattern", () => {
        it("abc end with pattern abc", () => {
            assert.equal('abc'.endsWithPattern('abc'), true);
        });
        it("abc end with pattern c", () => {
            assert.equal('abc'.endsWithPattern('c'), true);
        });
        it("abc end end with pattern b", () => {
            assert.equal('abc'.endsWithPattern('b'), false);
        });
        it("abc end with pattern \\w", () => {
            assert.equal('abc'.endsWithPattern('\\w'), true);
        });
        it("abc123 not end with pattern \\w+", () => {
            assert.equal('abc123'.endsWithPattern('\\w+'), true);
        });
        it("abc123 end with pattern \\d+", () => {
            assert.equal('abc123'.endsWithPattern('\\d+'), true);
        });
        it("123abc not end with pattern \\d+", () => {
            assert.equal('123abc'.endsWithPattern('\\d+'), false);
        });
        it("'' not end with pattern \\d+", () => {
            assert.equal(''.endsWithPattern('\\d+'), false);
        });
        it("'' end with pattern \\d*", () => {
            assert.equal(''.endsWithPattern('\\d*'), true);
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
});