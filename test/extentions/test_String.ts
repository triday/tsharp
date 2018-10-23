import "../../src/extentions/String"
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
    describe("trimStart",()=>{
        it("abc trim start equals 'abc'",function(){
            assert.equal("abc".trimStart(),"abc")
        });
        it("' abc' trim start equals 'abc'",function(){
            assert.equal(" abc".trimStart(),"abc")
        });
        it("'\\tabc' trim start equals 'abc'",function(){
            assert.equal("\tabc".trimStart(),"abc")
        });
        it("'\\nabc' trim start equals 'abc'",function(){
            assert.equal("\nabc".trimStart(),"abc")
        });
        it("'\\rabc' trim start equals 'abc'",function(){
            assert.equal("\rabc".trimStart(),"abc")
        });
        it("'  \\r\\n\\t abc' trim start equals 'abc'",function(){
            assert.equal("  \r\n\t abc".trimStart(),"abc")
        });
        it("'  \\r\\n\\t abc ' trim start equals 'abc '",function(){
            assert.equal("  \r\n\t abc ".trimStart(),"abc ")
        });

    });
    describe("trimEnd",()=>{
        it("'abc' trim end equals 'abc'",function(){
            assert.equal("abc".trimEnd(),"abc")
        });
        it("'abc ' trim end equals 'abc'",function(){
            assert.equal("abc ".trimEnd(),"abc")
        });
        it("'abc\\t' trim end equals 'abc'",function(){
            assert.equal("abc\t".trimEnd(),"abc")
        });
        it("'abc\\n' trim end equals 'abc'",function(){
            assert.equal("abc\n".trimEnd(),"abc")
        });
        it("'abc\\r' trim end equals abc",function(){
            assert.equal("abc\r".trimEnd(),"abc")
        });
        it("'abc  \\r\\n\\t ' trim end equals abc",function(){
            assert.equal("abc  \r\n\t ".trimEnd(),"abc")
        });
        it("'abc  \\r\\n\\t ' trim end equals ' abc'",function(){
            assert.equal(" abc  \r\n\t ".trimEnd()," abc")
        });

    });
});