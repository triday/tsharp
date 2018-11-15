import "../../src/extentions/Array"
import "mocha"
import * as assert from "assert";
import { Student, People } from "./models"

describe("Array", () => {
    let data_array = [1, 2, 3, 4, 5];
    let hex_array = ['ff', 'fe', 'f0', '01'];
    let empty_array: string[] = [];
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
        it(`[${hex_array}] not contains 'FF'`, () => {
            assert.equal(hex_array.contains('FF'), false);
        });
        it(`[${hex_array}] contains 'FF' with ignorecase comparer`, () => {
            assert.equal(hex_array.contains('FF', (a, b) => a.toLowerCase() === b.toLowerCase()), true);
        });
    });

    describe("all", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['abc', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] all has length 3 is true`, () => {
            assert.equal(strArray.all(p => p.length == 3), true);
        });
        it(`[${strArray2}] all has length 3 is false`, () => {
            assert.equal(strArray2.all(p => p.length == 3), false);
        });
        it(`[${emptyArray}] all has length 3 is true`, () => {
            assert.equal(emptyArray.all(p => p.length == 3), true);
        });
    });
    describe("any", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['abc', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] any has length 3 is true`, () => {
            assert.equal(strArray.any(p => p.length == 3), true);
        });
        it(`[${strArray}] any has length 4 is false`, () => {
            assert.equal(strArray.any(p => p.length == 4), false);
        });
        it(`[${strArray2}] any has length 4 is true`, () => {
            assert.equal(strArray2.any(p => p.length == 4), true);
        });
        it(`[${emptyArray}] any has length 3 is false`, () => {
            assert.equal(emptyArray.any(p => p.length == 3), false);
        });
    });
    describe("select", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['ab', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] map length get [3,3,3]`, () => {
            assert.deepEqual(strArray.select(p => p.length), [3, 3, 3]);
        });
        it(`[${strArray2}] map length get [2,3,4]`, () => {
            assert.deepEqual(strArray2.select(p => p.length), [2, 3, 4]);
        });
        it(`[${emptyArray}] map length get []`, () => {
            assert.deepEqual(emptyArray.select(p => p.length), []);
        });
    });
    describe("selectMany", () => {
        const datas = [
            { a: [1, 2, 3] },
            null,
            { a: null },
            { a: [4, 5, 6] }
        ]
        it(`select many works ok`, () => {
            assert.deepEqual(datas.selectMany(p => p.a), [1, 2, 3, 4, 5, 6]);
            assert.deepEqual(datas.selectMany(p => p.a), [1, 2, 3, 4, 5, 6]);
        })
    });
    describe("ignoreNullOrUndefined", () => {
        const datas = [1, null, 2, undefined];
        it(`ignoreNullOrUndefined  works ok`, () => {
            assert.deepEqual(datas.ignoreNullOrUndefined(), [1, 2]);
            assert.equal(datas.length, 4);
        })
    });
    describe("replaceNullOrUndefined", () => {
        const datas = [1, null, 2, undefined];
        it(`replaceNullOrUndefined to fixed value  works ok`, () => {
            assert.deepEqual(datas.replaceNullOrUndefined(3), [1, 3, 2, 3]);
            assert.equal(datas[1], null);
        });
        it(`replaceNullOrUndefined to factory value  works ok`, () => {
            assert.deepEqual(datas.replaceNullOrUndefined((index, arr) => { return index * index + 2; }), [1, 3, 2, 11]);
            assert.equal(datas[1], null);
        })
    });
    describe("distinct", () => {
        const datas = [1, 3, 5, 1, '3', 5, 6];
        it('distinct works ok', () => {
            assert.deepEqual(datas.distinct(), [1, 3, 5, '3', 6]);
            assert.deepEqual(datas.distinct((a, b) => a.toString() == b.toString()), [1, 3, 5, 6]);
        });

    });
    describe("where", () => {
        let strArray = ['ab', 'bcd', 'cdef'];
        let str2Array = ['ab', 'bcd', null, undefined];
        let emptyArray: string[] = [];
        it(`[${strArray}] where length>2 get ['bcd','cdef']`, () => {
            assert.deepEqual(strArray.where(p => p.length > 2), ['bcd', 'cdef']);
        });
        it(`[] where length>2 get ['bcd','cdef']`, () => {
            assert.deepEqual(emptyArray.where(p => p.length > 2), []);
        });
        it(`[${str2Array}] where item get ['ab','bcd']`, () => {
            assert.deepEqual(str2Array.where(p => p), ['ab', 'bcd']);
        });
    });

    describe("first", () => {
        it("['abc','bcd','cde'] call first return abc", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            assert.equal(strArray.first(), "abc")
        });
        it("[] call first throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.first() });
        });
        it("['ab','bcd','cded'] call first.length return 2", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            assert.equal(strArray.first(p => p.length), 2);
        });
        it("[] call first.length throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.first() });
        });
    });
    describe("firstOrDefault", () => {
        it("['abc','bcd','cde'] call firstOrDefault return abc", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            assert.equal(strArray.firstOrDefault(), "abc")
        });
        it("[] call firstOrDefault return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.firstOrDefault(), undefined);
        });
        it("['ab','bcd','cded'] call first.length return 2", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            assert.equal(strArray.firstOrDefault(p => p.length), 2);
        });
        it("[] call firstOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.firstOrDefault(p => p.length), undefined);
        });
    });
    describe("last", () => {
        it("['abc','bcd','cde'] call last return cde", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            assert.equal(strArray.last(), "cde")
        });
        it("[] call last throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.last() });
        });
        it("['ab','bcd','cded'] call last.length return 4", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            assert.equal(strArray.last(p => p.length), 4);
        });
        it("[] call last.length throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.last() });
        });
    });
    describe("lastOrDefault", () => {
        it("['abc','bcd','cde'] call lastOrDefault return cde", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            assert.equal(strArray.lastOrDefault(), "cde")
        });
        it("[] call firstOrDefault return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.lastOrDefault(), undefined);
        });
        it("['ab','bcd','cded'] call first.length return 4", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            assert.equal(strArray.lastOrDefault(p => p.length), 4);
        });
        it("[] call firstOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.lastOrDefault(p => p.length), undefined);
        });
    });
    describe("single", () => {
        it("['abc','bcd'] call single throw error", () => {
            let strArray = ['abc', 'bcd'];
            assert.throws(() => { strArray.single() });
        });
        it("[] call single throw error", () => {
            let strArray: string[] = [];
            assert.throws(() => { strArray.single() });
        });
        it("['abc'] call single return abc", () => {
            let strArray = ['abc'];
            assert.equal(strArray.single(), 'abc');
        });
        it("['abc'] call single.length return 3", () => {
            let strArray = ['abc'];
            assert.equal(strArray.single(p => p.length), 3);
        });
    });
    describe("singleOrDefault", () => {
        it("['abc','bcd'] call singleOrDefault throw error", () => {
            let strArray = ['abc', 'bcd'];
            assert.throws(() => { strArray.singleOrDefault() });
        });
        it("[] call singleOrDefault return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.singleOrDefault(), undefined);
        });
        it("[] call singleOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            assert.equal(strArray.singleOrDefault(p => p.length), undefined);
        });
        it("['abc'] call singleOrDefault return abc", () => {
            let strArray = ['abc'];
            assert.equal(strArray.singleOrDefault(), 'abc');
        });
        it("['abc'] call singleOrDefault.length return 3", () => {
            let strArray = ['abc'];
            assert.equal(strArray.singleOrDefault(p => p.length), 3);
        });
    });

    describe("count", () => {
        it("[] count is 0", () => {
            assert.equal([].count(), 0);
        });
        it("[1,3,5,7,9] count is 3", () => {
            assert.equal([1, 3, 5, 7, 9].count(), 5);
        });
        it("[1,3,5,7,9] count(p => p%3===0) is 2", () => {
            assert.equal([1, 3, 5, 7, 9].count(p => p % 3 === 0), 2);
        });
    });
    describe("min", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        let emptyArray: number[] = [];
        let numArray = [1, 3, 5, 7, 9];
        it("[{a:100},{a:200},{a:300}] min is 100", () => {
            assert.equal(objArray.min(p => p.a), 100);
        });
        it(`[${numArray}] min is 1`, () => {
            assert.equal(numArray.min(), 1);
        });
    });
    describe("max", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        let numArray = [1, 3, 5, 7, 9];
        it("[{a:100},{a:200},{a:300}] max is 300", () => {
            assert.equal(objArray.max(p => p.a), 300);
        });
        it(`[${numArray}] max is 9`, () => {
            assert.equal(numArray.max(), 9);
        });
    });
    describe("sum", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        it("[{a:100},{a:200},{a:300}] sum is 600", () => {
            assert.equal(objArray.sum(p => p.a), 600);
        });
        it("sum range(1,100) get 4950", () => {
            assert.equal(Array.range(1, 100).sum(), 4950);
        });
    });
    describe("average", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];

        it("[{a:100},{a:200},{a:300}] sum is 600", () => {
            assert.equal(objArray.average(p => p.a), 200);
        });
    });
    describe("except", () => {
        const from = [1, 3, 5, 7, 9];
        it('[1,3,5,7,9] except [1,2,3,7] is [5,9]', () => {
            assert.deepEqual(from.except([1, 2, 3, 7]), [5, 9]);
        });
        it('[1,3,5,7,9] except null is [1,3,5,7,9]', () => {
            assert.deepEqual(from.except(null), from);
        });
    });
    describe("intersect ", () => {
        const from = [1, 3, 5, 7, 9];
        it('[1,3,5,7,9] intersect  [1,2,3,7] is [5,9]', () => {
            assert.deepEqual(from.intersect([1, 2, 3, 7]), [1, 3, 7]);
        });
        it('[1,3,5,7,9] intersect null is [1,3,5,7,9]', () => {
            assert.deepEqual(from.intersect(null), []);
        });
    });
    describe("union ", () => {
        const from = [1, 3, 5, 7, 9, 5];
        it('[1,3,5,7,9,5] union  [1,2,3,7] is [1,3,5,7,9,2]', () => {
            assert.deepEqual(from.union([1, 2, 3, 7]), [1, 3, 5, 7, 9, 2]);
        });
        it('[1,3,5,7,9,5] union null is [1,3,5,7,9]', () => {
            assert.deepEqual(from.union(null), [1, 3, 5, 7, 9]);
        });
    });
    describe("skip", () => {

        it('[1,3,5,7,9] skip(2) is [5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.skip(2), [5, 7, 9]);
        });
        it('[1,3,5,7,9] skip(10) is []', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.skip(10), []);
        });
        it('[1,3,5,7,9] skip(-2) is [1,3,5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.skip(-2), data);
        });
    });

    describe("skipWhere", () => {

        it('[1,3,5,7,9] skipWhere(p=>p<5) is [5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.skipWhere(p => p < 5), [5, 7, 9]);
        });
        it('[1,3,5,7,9]  skipWhere(p=>p<0) is [1,3,5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.skipWhere(p => p < 0), [1, 3, 5, 7, 9]);
        });
        it('[1,3,5,7,9]  skipWhere(p=>p<10) is []', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.skipWhere(p => p < 10), []);
        });
    });
    describe("take", () => {

        it('[1,3,5,7,9] take(2) is [1,3]', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.take(2), [1, 3]);
        });
        it('[1,3,5,7,9] take(10) is []', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.take(10), data);
        });
        it('[1,3,5,7,9] take(-2) is []', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.take(-2), []);
        });
    });
    describe("takeWhere", () => {

        it('[1,3,5,7,9] takeWhere(p=>p<5) is [1,3]', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.takeWhere(p => p < 5), [1, 3]);
        });
        it('[1,3,5,7,9]  takeWhere(p=>p<0) is []', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.takeWhere(p => p < 0), []);
        });
        it('[1,3,5,7,9]  takeWhere(p=>p<10) is [1,3,5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            assert.deepEqual(data.takeWhere(p => p < 10), [1, 3, 5, 7, 9]);
        });
    });
    describe("range", () => {
        it("range(5).toString() equals '0,1,2,3,4'", () => {
            assert.equal(Array.range(5).toString(), '0,1,2,3,4');
        });
        it("range(2,7).toString() equals '2,3,4,5,6'", () => {
            assert.equal(Array.range(2, 7).toString(), '2,3,4,5,6');
        });
        it("range(7,2).toString() equals ''", () => {
            assert.equal(Array.range(7, 2).toString(), '');
        });
        it("range(2,7,1.5).toString() equals '2,3.5,5,6.5'", () => {
            assert.equal(Array.range(2, 7, 1.5).toString(), '2,3.5,5,6.5');
        });
        it("range(7,2,-2).toString() equals '7,5,3'", () => {
            assert.equal(Array.range(7, 2, -2).toString(), '7,5,3');
        });
        it("step 0 throws error", () => {
            assert.throws(() => { Array.range(0, 100, 0) });
        })
    });

    describe("orderby", () => {
        let allStudents = [
            { id: "x001", name: '张三', age: 13 },
            { id: "x002", name: '李四', age: 17 },
            { id: "x003", name: '王五', age: 14 },
            { id: "x004", name: '吴六', age: 11 },
            { id: "x007", name: '李七', age: 13 },
            { id: "x005", name: '郑八', age: 15 },
            { id: "x006", name: '赵七', age: 13 },
        ]
        it("order by null", () => {
            let res = allStudents.orderBy();
            assert.equal(res === allStudents, false);
            assert.deepEqual(allStudents.orderBy(), allStudents);
        });
        it("order by id", () => {
            let res = allStudents.orderBy(p => p.id);
            assert.equal(res[0].id, 'x001');
            assert.equal(res[6].id, 'x007');
        });
        it("order by id desc", () => {
            let res = allStudents.orderBy([p => p.id, true]);
            assert.equal(res[0].id, 'x007');
            assert.equal(res[6].id, 'x001');
        });
        it("order by age desc,id", () => {
            let res = allStudents.orderBy([p => p.age, true], p => p.id);

            assert.deepEqual(res[0], { id: "x002", name: '李四', age: 17 });
            assert.deepEqual(res[1], { id: "x005", name: '郑八', age: 15 });
            assert.deepEqual(res[2], { id: "x003", name: '王五', age: 14 });
            assert.deepEqual(res[3], { id: "x001", name: '张三', age: 13 });
            assert.deepEqual(res[4], { id: "x006", name: '赵七', age: 13 });
            assert.deepEqual(res[5], { id: "x007", name: '李七', age: 13 });
            assert.deepEqual(res[6], { id: "x004", name: '吴六', age: 11 });
        });
        it("order by age desc,id desc", () => {
            let res = allStudents.orderBy([p => p.age, true], [p => p.id, true]);

            assert.deepEqual(res[0], { id: "x002", name: '李四', age: 17 });
            assert.deepEqual(res[1], { id: "x005", name: '郑八', age: 15 });
            assert.deepEqual(res[2], { id: "x003", name: '王五', age: 14 });
            assert.deepEqual(res[3], { id: "x007", name: '李七', age: 13 });
            assert.deepEqual(res[4], { id: "x006", name: '赵七', age: 13 });
            assert.deepEqual(res[5], { id: "x001", name: '张三', age: 13 });
            assert.deepEqual(res[6], { id: "x004", name: '吴六', age: 11 });
        });
        it("order by object", () => {
            let res = allStudents.orderBy(p => p)
            assert.equal(res === allStudents, false);
            assert.deepEqual(res, allStudents);
        })
    });

    describe("toDictionary", () => {
        let allStudents = [
            { id: "x001", name: '张三', age: 13, state: true },
            { id: "x002", name: '李四', age: 17, state: true },
            { id: "x003", name: '王五', age: 14, state: true },
            { id: "x004", name: '吴六', age: 11, state: true },
            { id: "x007", name: '李七', age: 13, state: true },
            { id: "x005", name: '郑八', age: 15, state: true },
            { id: "x006", name: '赵七', age: 13, state: true },
        ]
        it("to dictionary by id", () => {
            let expected = {
                x001: { id: "x001", name: '张三', age: 13, state: true },
                x002: { id: "x002", name: '李四', age: 17, state: true },
                x003: { id: "x003", name: '王五', age: 14, state: true },
                x004: { id: "x004", name: '吴六', age: 11, state: true },
                x007: { id: "x007", name: '李七', age: 13, state: true },
                x005: { id: "x005", name: '郑八', age: 15, state: true },
                x006: { id: "x006", name: '赵七', age: 13, state: true },
            };
            assert.deepEqual(allStudents.toDictionary(p => p.id), expected);
        });
        it("to dictionary by age", () => {
            let expected = {
                17: { id: "x002", name: '李四', age: 17, state: true },
                14: { id: "x003", name: '王五', age: 14, state: true },
                11: { id: "x004", name: '吴六', age: 11, state: true },
                15: { id: "x005", name: '郑八', age: 15, state: true },
                13: { id: "x006", name: '赵七', age: 13, state: true },
            };
            assert.deepEqual(allStudents.toDictionary(p => p.age), expected);
        });
        it("elementSelector works ok", () => {
            let expected = {
                x001: '张三',
                x002: '李四',
                x003: '王五',
                x004: '吴六',
                x007: '李七',
                x005: '郑八',
                x006: '赵七'
            };
            assert.deepEqual(allStudents.toDictionary(p => p.id, p => p.name), expected);
        });
    });

    describe("toLookup", () => {
        let allStudents = [
            { id: "x001", name: '张三', age: 13, state: true },
            { id: "x002", name: '李四', age: 17, state: true },
            { id: "x003", name: '王五', age: 14, state: true },
            { id: "x004", name: '吴六', age: 11, state: true },
            { id: "x007", name: '李七', age: 13, state: true },
            { id: "x005", name: '郑八', age: 15, state: true },
            { id: "x006", name: '赵七', age: 13, state: true },
        ];
        it("to lookup by age", () => {
            let expected = {
                13: [{ id: "x001", name: '张三', age: 13, state: true },
                { id: "x007", name: '李七', age: 13, state: true },
                { id: "x006", name: '赵七', age: 13, state: true }
                ],
                17: [{ id: "x002", name: '李四', age: 17, state: true }],
                14: [{ id: "x003", name: '王五', age: 14, state: true }],
                11: [{ id: "x004", name: '吴六', age: 11, state: true }],
                15: [{ id: "x005", name: '郑八', age: 15, state: true }],
            };
            let result=allStudents.toLookup(p => p.age);
            console.log(result);
            assert.deepEqual(result, expected);
        });
        it("elementSelector works ok", () => {
            let expected = {
                13: ['张三', '李七', '赵七'],
                17: ['李四'],
                14: ['王五'],
                11: ['吴六'],
                15: ['郑八'],
            };
            assert.deepEqual(allStudents.toLookup(p => p.age, p => p.name), expected);
        });
    });
    describe("innerJoin", () => {
        let allStudents = [
            { id: "x001", name: "张三", class: "c001" },
            { id: "x002", name: "李四", class: "c001" },
            { id: "x003", name: "王五", class: "c001" },
            { id: "x004", name: "吴六", class: "c002" },
            { id: "x007", name: "李七", class: "c002" },
            { id: "x005", name: "郑八", class: "c002" },
            { id: "x006", name: "赵七", class: "c004" },
        ]
        let allClasses = [
            { id: "c001", name: "一班" },
            { id: "c002", name: '二班' },
            { id: "c003", name: '三班' },
        ]
        let nullDatas = allClasses;
        nullDatas = null;
        it("inner join will ignore 'c004' and 'c003' ", () => {
            let res = allStudents.innerJoin(allClasses, p => p.class, p => p.id, (l, r) => {
                return {
                    studentId: l.id,
                    studentName: l.name,
                    classId: r.id,
                    className: r.name
                }
            });
            // res.forEach(p=>console.log(JSON.stringify(p,null,0)));
            assert.equal(res.count(), 6);
            assert.equal(res.count(p => p.classId == 'c003' || p.classId == 'c004'), 0);
        });
        it("inner join null", () => {

            let res = allStudents.innerJoin(nullDatas, p => p.class, p => p.id, (l, r) => {
                return {
                    studentId: l.id,
                    studentName: l.name,
                    classId: r.id,
                    className: r.name
                }
            });
            assert.equal(res.length, 0);
        });
        it("ignore x003 because resultSelector returns null.", () => {
            let res = allStudents.innerJoin(allClasses, p => p.class, p => p.id, (l, r) => {
                if (l.id === 'x003') return null;
                return {
                    studentId: l.id,
                    studentName: l.name,
                    classId: r.id,
                    className: r.name
                }
            });
            // res.forEach(p=>console.log(JSON.stringify(p,null,0)));
            assert.equal(res.count(), 6 - 1);
        });
    });
    describe("outerJoin", () => {
        let allStudents = [
            { id: "x001", name: "张三", class: "c001" },
            { id: "x002", name: "李四", class: "c001" },
            { id: "x003", name: "王五", class: "c001" },
            { id: "x004", name: "吴六", class: "c002" },
            { id: "x007", name: "李七", class: "c002" },
            { id: "x005", name: "郑八", class: "c002" },
            { id: "x006", name: "赵七", class: "c004" },
        ]
        let allClasses = [
            { id: "c001", name: "一班" },
            { id: "c002", name: '二班' },
            { id: "c003", name: '三班' },
        ]
        let nullDatas = allClasses;
        nullDatas = null;
        it("outer join will select all class", () => {
            let res = allStudents.outerJoin(allClasses, p => p.class, p => p.id, (l, r) => {
                return {
                    studentId: l && l.id,
                    studentName: l && l.name,
                    classId: r && r.id,
                    className: r && r.name
                }
            });
            res.forEach(p => console.log(JSON.stringify(p, null, 0)));
            assert.equal(res.count(), 8);
            assert.equal(res.count(p => p.classId == 'c003'), 1);
            assert.equal(res.where(p => p.classId === 'c003').first().studentId, undefined);
            assert.equal(res.count(p => p.studentId == 'x006'), 1);
            assert.equal(res.where(p => p.studentId === 'x006').first().classId, undefined);
        });
        it("outer join null", () => {

            let res = allStudents.outerJoin(nullDatas, p => p.class, p => p.id, (l, r) => {
                return {
                    studentId: l && l.id,
                    studentName: l && l.name,
                    classId: r && r.id,
                    className: r && r.name
                }
            });
            assert.equal(res.length, allStudents.length);
        });
        it("ignore x003 because resultSelector returns null.", () => {
            let res = allStudents.outerJoin(allClasses, p => p.class, p => p.id, (l, r) => {
                if (l && l.id === 'x003') return null;
                return {
                    studentId: l && l.id,
                    studentName: l && l.name,
                    classId: r && r.id,
                    className: r && r.name
                }
            });
            res.forEach(p => console.log(JSON.stringify(p, null, 0)));
            assert.equal(res.count(), 8 - 1);
        });
    });
    describe("leftJoin", () => {

        let allStudents = [
            { id: "x001", name: "张三", class: "c001" },
            { id: "x002", name: "李四", class: "c001" },
            { id: "x003", name: "王五", class: "c001" },
            { id: "x004", name: "吴六", class: "c002" },
            { id: "x007", name: "李七", class: "c002" },
            { id: "x005", name: "郑八", class: "c002" },
            { id: "x006", name: "赵七", class: "c004" },
        ]
        let allClasses = [
            { id: "c001", name: "一班" },
            { id: "c002", name: '二班' },
            { id: "c003", name: '三班' },
        ]
        let nullDatas = allClasses;
        nullDatas = null;
        it("left join will ignore 'c003'", () => {
            let res = allStudents.leftJoin(allClasses, p => p.class, p => p.id, (l, r) => {
                return {
                    studentId: l.id,
                    studentName: l.name,
                    classId: r && r.id,
                    className: r && r.name
                }
            });
            res.forEach(p => console.log(JSON.stringify(p, null, 0)));
            assert.equal(res.count(), 7);
            assert.equal(res.count(p => p.classId == 'c003'), 0);
            assert.equal(res.count(p => p.studentId == 'x006'), 1);
            assert.equal(res.where(p => p.studentId === 'x006').first().classId, undefined);
        });
        it("left join null", () => {
            let res = allStudents.leftJoin(nullDatas, p => p.class, p => p.id, (l, r) => {
                return {
                    studentId: l.id,
                    studentName: l.name,
                    classId: r && r.id,
                    className: r && r.name
                }
            });
            assert.equal(res.length, allStudents.length);
        });
        it("ignore x003 because resultSelector returns null.", () => {
            let res = allStudents.leftJoin(allClasses, p => p.class, p => p.id, (l, r) => {
                if (l.id === 'x003') return null;
                return {
                    studentId: l.id,
                    studentName: l.name,
                    classId: r && r.id,
                    className: r && r.name
                }
            });
            assert.equal(res.count(), 7 - 1);
        });
    });
    describe("rightJoin", () => {
        let allStudents = [
            { id: "x001", name: "张三", class: "c001" },
            { id: "x002", name: "李四", class: "c001" },
            { id: "x003", name: "王五", class: "c001" },
            { id: "x004", name: "吴六", class: "c002" },
            { id: "x007", name: "李七", class: "c002" },
            { id: "x005", name: "郑八", class: "c002" },
            { id: "x006", name: "赵七", class: "c004" },
        ]
        let allClasses = [
            { id: "c001", name: "一班" },
            { id: "c002", name: '二班' },
            { id: "c003", name: '三班' },
        ]
        let nullDatas = allClasses;
        nullDatas = null;
        it("right join will ignore 'c004'", () => {
            let res = allStudents.rightJoin(allClasses, p => p.class, p => p.id, (l, r) => {
                return {
                    studentId: l && l.id,
                    studentName: l && l.name,
                    classId: r.id,
                    className: r.name
                }
            });
            res.forEach(p => console.log(JSON.stringify(p, null, 0)));
            assert.equal(res.count(), 7);
            assert.equal(res.count(p => p.classId == 'c003'), 1);
            assert.equal(res.where(p => p.classId === 'c003').first().studentId, undefined);
            assert.equal(res.count(p => p.studentId == 'x006'), 0);
        });
        it("right join null", () => {

            let res = allStudents.rightJoin(nullDatas, p => p.class, p => p.id, (l, r) => {
                return {
                    studentId: l && l.id,
                    studentName: l && l.name,
                    classId: r.id,
                    className: r.name
                }
            });
            assert.equal(res.length, 0);
        });
        it("ignore x003 because resultSelector returns null.", () => {
            let res = allStudents.rightJoin(allClasses, p => p.class, p => p.id, (l, r) => {
                if (l && l.id === 'x003') return null;
                return {
                    studentId: l && l.id,
                    studentName: l && l.name,
                    classId: r.id,
                    className: r.name
                }
            });
            assert.equal(res.count(), 7 - 1);

        });
    });

    describe("zip", () => {
        const main = [1, 2, 3, 4, 5, 6];
        const other1 = [6, 5, 4, 3, 2, 1]
        const other2 = ["a", "b", "c"]
        it("zip one array", () => {
            let res = main.zip(other1, (a, b) => `${a}_${b}`);
            assert.deepEqual(res, ["1_6", "2_5", "3_4", "4_3", "5_2", "6_1"]);
        });
        it("zip two array", () => {
            let res = main.zip(other1, other2, (a, b, c) => `${a}${b}${c}`);
            assert.deepEqual(res, ["16a", "25b", "34c"]);
        });
        it("zip three array", () => {
            let res = main.zip(other1, other2, other2, (a, b, c, d) => `${a}${b}${c}${d}`);
            assert.deepEqual(res, ["16aa", "25bb", "34cc"]);
        });
        it("zip four array", () => {
            let res = main.zip(other1, other2, other2, other1, (a, b, c, d, e) => `${a}${b}${c}${d}${e}`);
            assert.deepEqual(res, ["16aa6", "25bb5", "34cc4"]);
        });
    });
    describe("repeat", () => {
        it('[] repeat 10 is []', () => {
            assert.deepEqual([].repeat(10), []);
        });
        it('[2,3] repeat 3 is [2,3,2,3,2,3]', () => {
            assert.deepEqual([2, 3].repeat(3), [2, 3, 2, 3, 2, 3]);
        });
        it('[2,3] repeat 0 is []', () => {
            assert.deepEqual([2, 3].repeat(0), []);
        });
        it('[2,3] repeat 1 is [2,3]', () => {
            assert.deepEqual([2, 3].repeat(1), [2, 3]);
        });
    });
    describe("copy", () => {
        it('[1,2,3] copy returns [1,2,3]', () => {
            const data = [1, 2, 3];
            const result = data.copy();
            assert.notEqual(data, result);
            assert.deepEqual(data, result);
        });
    });
});
