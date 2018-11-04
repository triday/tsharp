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
            assert.equal(empty_array.contains('FF'), false);
        });
        it(`[${hex_array}] contains 'FF' with ignorecase comparer`, () => {
            assert.equal(empty_array.contains('FF', (a, b) => a.toLowerCase() === b.toLowerCase()), false);
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
        it("[{a:100},{a:200},{a:300}] max is 300", () => {
            assert.equal(objArray.max(p => p.a), 300);
        });
    });
    describe("sum", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        it("[{a:100},{a:200},{a:300}] sum is 600", () => {
            assert.equal(objArray.sum(p => p.a), 600);
        });
    });
    describe("average", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];

        it("[{a:100},{a:200},{a:300}] sum is 600", () => {
            assert.equal(objArray.average(p => p.a), 200);
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

    describe("equals", () => {
        let data1 = [{ name: 'abc', age: 13 }, { name: 'bcd', age: 14 }];
        let data2 = [{ name: 'abc', age: 13 }, { name: 'bcd', age: 14 }]
        it("equals self", () => {
            assert.equal(data1.equals(data1), true);
        });
        it("equals the same data", () => {
            assert.equal(data1.equals(data2), true);
        });
    });
});
