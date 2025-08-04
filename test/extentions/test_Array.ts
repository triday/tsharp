import "../../src/extentions/Array"
import { describe, it, expect } from 'vitest';
import { Student, People } from "./models"

describe("Array", () => {
    let data_array = [1, 2, 3, 4, 5];
    let hex_array = ['ff', 'fe', 'f0', '01'];
    let empty_array: string[] = [];
    describe("contains", () => {
        it(`[${data_array}] not contains 6`, () => {
            expect(data_array.contains(6)).toBe(false);

        });
        it(`[${data_array}] not contains 0`, () => {
            expect(data_array.contains(0)).toBe(false);
        });
        it(`[${data_array}] contains 1`, () => {
            expect(data_array.contains(1)).toBe(true);
        });
        it(`[${empty_array}] not contains ""`, () => {
            expect(empty_array.contains("")).toBe(false);
        });
        it(`[${empty_array}] not contains null`, () => {
            expect(empty_array.contains(null)).toBe(false);
        });
        it(`[${hex_array}] not contains 'FF'`, () => {
            expect(hex_array.contains('FF')).toBe(false);
        });
        it(`[${hex_array}] contains 'FF' with ignorecase comparer`, () => {
            expect(hex_array.contains('FF', (a, b) => a.toLowerCase() === b.toLowerCase())).toBe(true);
        });
    });

    describe("all", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['abc', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] all has length 3 is true`, () => {
            expect(strArray.all(p => p.length == 3)).toBe(true);
        });
        it(`[${strArray2}] all has length 3 is false`, () => {
            expect(strArray2.all(p => p.length == 3)).toBe(false);
        });
        it(`[${emptyArray}] all has length 3 is true`, () => {
            expect(emptyArray.all(p => p.length == 3)).toBe(true);
        });
    });
    describe("any", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['abc', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] any has length 3 is true`, () => {
            expect(strArray.any(p => p.length == 3)).toBe(true);
        });
        it(`[${strArray}] any has length 4 is false`, () => {
            expect(strArray.any(p => p.length == 4)).toBe(false);
        });
        it(`[${strArray2}] any has length 4 is true`, () => {
            expect(strArray2.any(p => p.length == 4)).toBe(true);
        });
        it(`[${emptyArray}] any has length 3 is false`, () => {
            expect(emptyArray.any(p => p.length == 3)).toBe(false);
        });
    });
    describe("select", () => {
        let strArray = ['abc', 'bcd', 'cde'];
        let strArray2 = ['ab', 'bcd', 'cdef'];
        let emptyArray: string[] = [];
        it(`[${strArray}] map length get [3,3,3]`, () => {
            expect(strArray.select(p => p.length)).toEqual([3, 3, 3]);
        });
        it(`[${strArray2}] map length get [2,3,4]`, () => {
            expect(strArray2.select(p => p.length)).toEqual([2, 3, 4]);
        });
        it(`[${emptyArray}] map length get []`, () => {
            expect(emptyArray.select(p => p.length)).toEqual([]);
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
            expect(datas.selectMany(p => p.a)).toEqual([1, 2, 3, 4, 5, 6]);
            expect(datas.selectMany(p => p.a)).toEqual([1, 2, 3, 4, 5, 6]);
        })
    });
    describe("ignoreNullOrUndefined", () => {
        const datas = [1, null, 2, undefined];
        it(`ignoreNullOrUndefined  works ok`, () => {
            expect(datas.ignoreNullOrUndefined()).toEqual([1, 2]);
            expect(datas.length).toBe(4);
        })
    });
    describe("replaceNullOrUndefined", () => {
        const datas = [1, null, 2, undefined];
        it(`replaceNullOrUndefined to fixed value  works ok`, () => {
            expect(datas.replaceNullOrUndefined(3)).toEqual([1, 3, 2, 3]);
            expect(datas[1]).toBe(null);
        });
        it(`replaceNullOrUndefined to factory value  works ok`, () => {
            expect(datas.replaceNullOrUndefined((index, arr) => { return index * index + 2; })).toEqual([1, 3, 2, 11]);
            expect(datas[1]).toBe(null);
        })
    });
    describe("distinct", () => {
        const datas = [1, 3, 5, 1, '3', 5, 6];
        it('distinct works ok', () => {
            expect(datas.distinct()).toEqual([1, 3, 5, '3', 6]);
            expect(datas.distinct((a, b) => a.toString() == b.toString())).toEqual([1, 3, 5, 6]);
        });

    });
    describe("where", () => {
        let strArray = ['ab', 'bcd', 'cdef'];
        let str2Array = ['ab', 'bcd', null, undefined];
        let emptyArray: string[] = [];
        it(`[${strArray}] where length>2 get ['bcd','cdef']`, () => {
            expect(strArray.where(p => p.length > 2)).toEqual(['bcd', 'cdef']);
        });
        it(`[] where length>2 get ['bcd','cdef']`, () => {
            expect(emptyArray.where(p => p.length > 2)).toEqual([]);
        });
        it(`[${str2Array}] where item get ['ab','bcd']`, () => {
            expect(str2Array.where(p => p)).toEqual(['ab', 'bcd']);
        });
    });

    describe("first", () => {
        it("['abc','bcd','cde'] call first return abc", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            expect(strArray.first()).toBe("abc");
        });
        it("[] call first throw error", () => {
            let strArray: string[] = [];
            expect(() => { strArray.first() }).toThrow();
        });
        it("['ab','bcd','cded'] call first.length return 2", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            expect(strArray.first(p => p.length)).toBe(2);
        });
        it("[] call first.length throw error", () => {
            let strArray: string[] = [];
            expect(() => { strArray.first() }).toThrow();
        });
    });
    describe("firstOrDefault", () => {
        it("['abc','bcd','cde'] call firstOrDefault return abc", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            expect(strArray.firstOrDefault()).toBe("abc");
        });
        it("[] call firstOrDefault return undefined", () => {
            let strArray: string[] = [];
            expect(strArray.firstOrDefault()).toBe(undefined);
        });
        it("['ab','bcd','cded'] call first.length return 2", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            expect(strArray.firstOrDefault(p => p.length)).toBe(2);
        });
        it("[] call firstOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            expect(strArray.firstOrDefault(p => p.length)).toBe(undefined);
        });
    });
    describe("last", () => {
        it("['abc','bcd','cde'] call last return cde", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            expect(strArray.last()).toBe("cde");
        });
        it("[] call last throw error", () => {
            let strArray: string[] = [];
            expect(() => { strArray.last() }).toThrow();
        });
        it("['ab','bcd','cded'] call last.length return 4", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            expect(strArray.last(p => p.length)).toBe(4);
        });
        it("[] call last.length throw error", () => {
            let strArray: string[] = [];
            expect(() => { strArray.last() }).toThrow();
        });
    });
    describe("lastOrDefault", () => {
        it("['abc','bcd','cde'] call lastOrDefault return cde", () => {
            let strArray = ['abc', 'bcd', 'cde'];
            expect(strArray.lastOrDefault()).toBe("cde");
        });
        it("[] call firstOrDefault return undefined", () => {
            let strArray: string[] = [];
            expect(strArray.lastOrDefault()).toBe(undefined);
        });
        it("['ab','bcd','cded'] call first.length return 4", () => {
            let strArray = ['ab', 'bcd', 'cded'];
            expect(strArray.lastOrDefault(p => p.length)).toBe(4);
        });
        it("[] call firstOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            expect(strArray.lastOrDefault(p => p.length)).toBe(undefined);
        });
    });
    describe("single", () => {
        it("['abc','bcd'] call single throw error", () => {
            let strArray = ['abc', 'bcd'];
            expect(() => { strArray.single() }).toThrow();
        });
        it("[] call single throw error", () => {
            let strArray: string[] = [];
            expect(() => { strArray.single() }).toThrow();
        });
        it("['abc'] call single return abc", () => {
            let strArray = ['abc'];
            expect(strArray.single()).toBe('abc');
        });
        it("['abc'] call single.length return 3", () => {
            let strArray = ['abc'];
            expect(strArray.single(p => p.length)).toBe(3);
        });
    });
    describe("singleOrDefault", () => {
        it("['abc','bcd'] call singleOrDefault throw error", () => {
            let strArray = ['abc', 'bcd'];
            expect(() => { strArray.singleOrDefault() }).toThrow();
        });
        it("[] call singleOrDefault return undefined", () => {
            let strArray: string[] = [];
            expect(strArray.singleOrDefault()).toBeUndefined();
        });
        it("[] call singleOrDefault.length return undefined", () => {
            let strArray: string[] = [];
            expect(strArray.singleOrDefault(p => p.length)).toBeUndefined();
        });
        it("['abc'] call singleOrDefault return abc", () => {
            let strArray = ['abc'];
            expect(strArray.singleOrDefault()).toBe('abc');
        });
        it("['abc'] call singleOrDefault.length return 3", () => {
            let strArray = ['abc'];
            expect(strArray.singleOrDefault(p => p.length)).toBe(3);
        });
    });

    describe("count", () => {
        it("[] count is 0", () => {
            expect([].count()).toBe(0);
        });
        it("[1,3,5,7,9] count is 3", () => {
            expect([1, 3, 5, 7, 9].count()).toBe(5);
        });
        it("[1,3,5,7,9] count(p => p%3===0) is 2", () => {
            expect([1, 3, 5, 7, 9].count(p => p % 3 === 0)).toBe(2);
        });
    });
    describe("min", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        let emptyArray: number[] = [];
        let numArray = [1, 3, 5, 7, 9];
        it("[{a:100},{a:200},{a:300}] min is 100", () => {
            expect(objArray.min(p => p.a)).toBe(100);
        });
        it(`[${numArray}] min is 1`, () => {
            expect(numArray.min()).toBe(1);
        });
    });
    describe("max", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        let numArray = [1, 3, 5, 7, 9];
        it("[{a:100},{a:200},{a:300}] max is 300", () => {
            expect(objArray.max(p => p.a)).toBe(300);
        });
        it(`[${numArray}] max is 9`, () => {
            expect(numArray.max()).toBe(9);
        });
    });
    describe("sum", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];
        it("[{a:100},{a:200},{a:300}] sum is 600", () => {
            expect(objArray.sum(p => p.a)).toBe(600);
        });
        it("sum range(1,100) get 4950", () => {
            expect(Array.range(1, 100).sum()).toBe(4950);
        });
    });
    describe("average", () => {
        let objArray = [{ a: 100 }, { a: 200 }, { a: 300 }];

        it("[{a:100},{a:200},{a:300}] sum is 600", () => {
            expect(objArray.average(p => p.a)).toBe(200);
        });
    });
    describe("except", () => {
        const from = [1, 3, 5, 7, 9];
        it('[1,3,5,7,9] except [1,2,3,7] is [5,9]', () => {
            expect(from.except([1, 2, 3, 7])).toEqual([5, 9]);
        });
        it('[1,3,5,7,9] except null is [1,3,5,7,9]', () => {
            expect(from.except(null)).toEqual(from);
        });
    });
    describe("intersect ", () => {
        const from = [1, 3, 5, 7, 9];
        it('[1,3,5,7,9] intersect  [1,2,3,7] is [5,9]', () => {
            expect(from.intersect([1, 2, 3, 7])).toEqual([1, 3, 7]);
        });
        it('[1,3,5,7,9] intersect null is [1,3,5,7,9]', () => {
            expect(from.intersect(null)).toEqual([]);
        });
    });
    describe("union ", () => {
        const from = [1, 3, 5, 7, 9, 5];
        it('[1,3,5,7,9,5] union  [1,2,3,7] is [1,3,5,7,9,2]', () => {
            expect(from.union([1, 2, 3, 7])).toEqual([1, 3, 5, 7, 9, 2]);
        });
        it('[1,3,5,7,9,5] union null is [1,3,5,7,9]', () => {
            expect(from.union(null)).toEqual([1, 3, 5, 7, 9]);
        });
    });
    describe("skip", () => {

        it('[1,3,5,7,9] skip(2) is [5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.skip(2)).toEqual([5, 7, 9]);
        });
        it('[1,3,5,7,9] skip(10) is []', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.skip(10)).toEqual([]);
        });
        it('[1,3,5,7,9] skip(-2) is [1,3,5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.skip(-2)).toEqual(data);
        });
    });

    describe("skipWhere", () => {

        it('[1,3,5,7,9] skipWhere(p=>p<5) is [5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.skipWhere(p => p < 5)).toEqual([5, 7, 9]);
        });
        it('[1,3,5,7,9]  skipWhere(p=>p<0) is [1,3,5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.skipWhere(p => p < 0)).toEqual([1, 3, 5, 7, 9]);
        });
        it('[1,3,5,7,9]  skipWhere(p=>p<10) is []', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.skipWhere(p => p < 10)).toEqual([]);
        });
    });
    describe("take", () => {

        it('[1,3,5,7,9] take(2) is [1,3]', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.take(2)).toEqual([1, 3]);
        });
        it('[1,3,5,7,9] take(10) is []', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.take(10)).toEqual(data);
        });
        it('[1,3,5,7,9] take(-2) is []', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.take(-2)).toEqual([]);
        });
    });
    describe("takeWhere", () => {

        it('[1,3,5,7,9] takeWhere(p=>p<5) is [1,3]', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.takeWhere(p => p < 5)).toEqual([1, 3]);
        });
        it('[1,3,5,7,9]  takeWhere(p=>p<0) is []', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.takeWhere(p => p < 0)).toEqual([]);
        });
        it('[1,3,5,7,9]  takeWhere(p=>p<10) is [1,3,5,7,9]', () => {
            let data = [1, 3, 5, 7, 9];
            expect(data.takeWhere(p => p < 10)).toEqual([1, 3, 5, 7, 9]);
        });
    });
    describe("range", () => {
        it("range(5).toString() equals '0,1,2,3,4'", () => {
            expect(Array.range(5).toString()).toBe('0,1,2,3,4');
        });
        it("range(2,7).toString() equals '2,3,4,5,6'", () => {
            expect(Array.range(2, 7).toString()).toBe('2,3,4,5,6');
        });
        it("range(7,2).toString() equals ''", () => {
            expect(Array.range(7, 2).toString()).toBe('');
        });
        it("range(2,7,1.5).toString() equals '2,3.5,5,6.5'", () => {
            expect(Array.range(2, 7, 1.5).toString()).toBe('2,3.5,5,6.5');
        });
        it("range(7,2,-2).toString() equals '7,5,3'", () => {
            expect(Array.range(7, 2, -2).toString()).toBe('7,5,3');
        });
        it("step 0 throws error", () => {
            expect(() => { Array.range(0, 100, 0) }).toThrow();
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
            expect(res === allStudents).toBe(false);
            expect(allStudents.orderBy()).toEqual(allStudents);
        });
        it("order by id", () => {
            let res = allStudents.orderBy(p => p.id);
            expect(res[0].id).toBe('x001');
            expect(res[6].id).toBe('x007');
        });
        it("order by id desc", () => {
            let res = allStudents.orderBy([p => p.id, true]);
            expect(res[0].id).toBe('x007');
            expect(res[6].id).toBe('x001');
        });
        it("order by age", () => {
            let res = allStudents.orderBy(p => p.age);
            expect(res[0].id).toBe('x004');
            expect(res[6].id).toBe('x002');
        });
        it("order by age desc,id", () => {
            let res = allStudents.orderBy([p => p.age, true], p => p.id);

            expect(res[0]).toEqual({ id: "x002", name: '李四', age: 17 });
            expect(res[1]).toEqual({ id: "x005", name: '郑八', age: 15 });
            expect(res[2]).toEqual({ id: "x003", name: '王五', age: 14 });
            expect(res[3]).toEqual({ id: "x001", name: '张三', age: 13 });
            expect(res[4]).toEqual({ id: "x006", name: '赵七', age: 13 });
            expect(res[5]).toEqual({ id: "x007", name: '李七', age: 13 });
            expect(res[6]).toEqual({ id: "x004", name: '吴六', age: 11 });
        });
        it("order by age desc,id desc", () => {
            let res = allStudents.orderBy([p => p.age, true], [p => p.id, true]);

            expect(res[0]).toEqual({ id: "x002", name: '李四', age: 17 });
            expect(res[1]).toEqual({ id: "x005", name: '郑八', age: 15 });
            expect(res[2]).toEqual({ id: "x003", name: '王五', age: 14 });
            expect(res[3]).toEqual({ id: "x007", name: '李七', age: 13 });
            expect(res[4]).toEqual({ id: "x006", name: '赵七', age: 13 });
            expect(res[5]).toEqual({ id: "x001", name: '张三', age: 13 });
            expect(res[6]).toEqual({ id: "x004", name: '吴六', age: 11 });
        });
        it("order by id", () => {
            let res = allStudents.orderBy(p => p.id)
            expect(res === allStudents).toBe(false);
            expect(res[0].id).toBe('x001');
            expect(res[6].id).toBe('x007');
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
            expect(allStudents.toDictionary(p => p.id)).toEqual(expected);
        });
        it("to dictionary by age", () => {
            let expected = {
                17: { id: "x002", name: '李四', age: 17, state: true },
                14: { id: "x003", name: '王五', age: 14, state: true },
                11: { id: "x004", name: '吴六', age: 11, state: true },
                15: { id: "x005", name: '郑八', age: 15, state: true },
                13: { id: "x006", name: '赵七', age: 13, state: true },
            };
            expect(allStudents.toDictionary(p => p.age)).toEqual(expected);
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
            expect(allStudents.toDictionary(p => p.id, p => p.name)).toEqual(expected);
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
            let result = allStudents.toLookup(p => p.age);
            console.log(result);
            expect(result).toEqual(expected);
        });
        it("elementSelector works ok", () => {
            let expected = {
                13: ['张三', '李七', '赵七'],
                17: ['李四'],
                14: ['王五'],
                11: ['吴六'],
                15: ['郑八'],
            };
            expect(allStudents.toLookup(p => p.age, p => p.name)).toEqual(expected);
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
            expect(res.count()).toBe(6);
            expect(res.count(p => p.classId == 'c003' || p.classId == 'c004')).toBe(0);
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
            expect(res.length).toBe(0);
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
            expect(res.count()).toBe(6 - 1);
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
            expect(res.count()).toBe(8);
            expect(res.count(p => p.classId == 'c003')).toBe(1);
            expect(res.where(p => p.classId === 'c003').first().studentId).toBeUndefined();
            expect(res.count(p => p.studentId == 'x006')).toBe(1);
            expect(res.where(p => p.studentId === 'x006').first().classId).toBeUndefined();
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
            expect(res.length).toBe(allStudents.length);
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
            expect(res.count()).toBe(8 - 1);
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
            expect(res.count()).toBe(7);
            expect(res.count(p => p.classId == 'c003')).toBe(0);
            expect(res.count(p => p.studentId == 'x006')).toBe(1);
            expect(res.where(p => p.studentId === 'x006').first().classId).toBeUndefined();
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
            expect(res.length).toBe(allStudents.length);
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
            expect(res.count()).toBe(7 - 1);
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
            expect(res.count()).toBe(7);
            expect(res.count(p => p.classId == 'c003')).toBe(1);
            expect(res.where(p => p.classId === 'c003').first().studentId).toBeUndefined();
            expect(res.count(p => p.studentId == 'x006')).toBe(0);
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
            expect(res.length).toBe(0);
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
            expect(res.count()).toBe(7 - 1);

        });
    });

    describe("zip", () => {
        const main = [1, 2, 3, 4, 5, 6];
        const other1 = [6, 5, 4, 3, 2, 1]
        const other2 = ["a", "b", "c"]
        it("zip one array", () => {
            let res = main.zip(other1, (a, b) => `${a}_${b}`);
            expect(res).toEqual(["1_6", "2_5", "3_4", "4_3", "5_2", "6_1"]);
        });
        it("zip two array", () => {
            let res = main.zip(other1, other2, (a, b, c) => `${a}${b}${c}`);
            expect(res).toEqual(["16a", "25b", "34c"]);
        });
        it("zip three array", () => {
            let res = main.zip(other1, other2, other2, (a, b, c, d) => `${a}${b}${c}${d}`);
            expect(res).toEqual(["16aa", "25bb", "34cc"]);
        });
        it("zip four array", () => {
            let res = main.zip(other1, other2, other2, other1, (a, b, c, d, e) => `${a}${b}${c}${d}${e}`);
            expect(res).toEqual(["16aa6", "25bb5", "34cc4"]);
        });
    });
    describe("repeat", () => {
        it('[] repeat 10 is []', () => {
            expect([].repeat(10)).toEqual([]);
        });
        it('[2,3] repeat 3 is [2,3,2,3,2,3]', () => {
            expect([2, 3].repeat(3)).toEqual([2, 3, 2, 3, 2, 3]);
        });
        it('[2,3] repeat 0 is []', () => {
            expect([2, 3].repeat(0)).toEqual([]);
        });
        it('[2,3] repeat 1 is [2,3]', () => {
            expect([2, 3].repeat(1)).toEqual([2, 3]);
        });
    });
    describe("copy", () => {
        it('[1,2,3] copy returns [1,2,3]', () => {
            const data = [1, 2, 3];
            const result = data.copy();
            expect(data).not.toBe(result);
            expect(data).toEqual(result);
        });
    });
    describe("fromObject", () => {
        const data = {
            's001': { 'c1': 90, 'c2': 85 },
            's002': { 'c1': 99, 'c2': 100 },
            's003': { 'c1': 75, 'c2': 60 }
        }
        it("return tuple array", () => {
            const expected = [['s001', { 'c1': 90, 'c2': 85 }], ['s002', { 'c1': 99, 'c2': 100 }], ['s003', { 'c1': 75, 'c2': 60 }]];
            expect(Array.fromObject(data)).toEqual(expected);
        });
        it("return [] if from null", () => {
            expect(Array.fromObject(null)).toEqual([]);
        });
        it("return custom object array", () => {
            const expected = [{ id: 's001', total: 175 }, { id: 's002', total: 199 }, { id: 's003', total: 135 }];
            expect(Array.fromObject(data, (v, k) => {
                return {
                    id: v,
                    total: k.c1 + k.c2
                }
            })).toEqual(expected);
        });
    });

});
