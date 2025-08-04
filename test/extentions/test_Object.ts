import "../../src/extentions/Object";
import "../../src/extentions/Date";
import "../../src/extentions/Number"
import { describe, it, expect } from 'vitest';

describe("Object", () => {
    interface Data {
        [s: string]: any
    }

    describe("clone", () => {
        it('deep clone data_a obj', () => {
            let o: Data = { m: 10, n: 20 }
            let data_c = Object.clone({
                a: 1,
                b: 2,
                c: o
            })
            o.m = 10000
            expect(data_c).toEqual({
                a: 1,
                b: 2,
                c: {
                    m: 10,
                    n: 20
                }
            });
        });

        it('deep clone data_a array', () => {
            let o: Data = [{ m: 10, n: 20 }]
            let data_c = Object.clone({
                a: 1,
                b: 2,
                c: o
            })
            o.m = 10000
            o[0].m = 10000
            expect(data_c).toEqual({
                a: 1,
                b: 2,
                c: [
                    {
                        m: 10,
                        n: 20
                    }
                ]
            });
        })
        it('deep clone  array', () => {
            let arraya = [1, 2, 3];
            let arrayb = [1, 2, 3];
            expect(Object.clone(arraya)).toEqual(arrayb);
        });
        it('clone null return null', () => {
            expect(Object.clone(null)).toBe(null);
        });
        it('clone custom clone', () => {
            let date = new Date('2018-11-11');
            let cloneDate = Object.clone(date);
            expect(date).not.toBe(cloneDate);
            expect(date.valueOf()).toBe(cloneDate.valueOf());
        });
        it('clone no plain obj', () => {
            let reg = /\d+/;
            let cloneReg = Object.clone(reg);
            expect(reg).toBe(cloneReg);
        });
    })

    describe("extend", () => {
        const datas: [string, any, any[], any][] = [
            ['extend to null', null, [{ a: 1 }, { b: 2 }], { a: 1, b: 2 }],
            ['extend from null', {}, [null, { b: 2 }], { b: 2 }],
            ['extend array', [2, 3, 4], [[4], [5, 6]], [5, 6, 4]],
            ['deep extend objects', { a: 1, b: 2, c: { m: 10, n: 20 } }, [{ a: 1, b: 500, c: { m: 7 } }], { a: 1, b: 500, c: { m: 7, n: 20 } }]
        ];
        datas.forEach((item, index) => {
            it(`case ${index.toFormat('d2')} : ${item[0]}`, () => {
                expect(Object.extend(item[1], ...item[2])).toEqual(item[3]);
            });
        });
    })


    describe("equals", () => {
        class People {
            constructor(public name: string) {

            }
            public toString(): string {
                return this.name;
            }
        }
        class Student extends People {
            constructor(public id: string, name: string = '') {
                super(name);
            }
            public valueOf(): any {
                return this.id;
            }

        }
        const datas: [boolean, string, any, any][] = [
            [true, 'null equals null', null, null],
            [true, 'undefined equals undefined', undefined, undefined],
            [true, 'NaN equals NaN', NaN, NaN],
            [false, 'null not equals undefined', null, undefined],
            [true, '{name:"abc"} equals {name:"abc"}', { name: 'abc' }, { name: 'abc' }],
            [false, '{name:123} not equals {name:"123"}', { name: 123 }, { name: '123' }],
            [true, 'Date equals be Date.prototype has custom equals method', new Date('2018-11-11'), new Date('2018-11-11')],
            [true, '[1,2,3] equals [1,2,3]', [1, 2, 3], [1, 2, 3]],
            [false, "[1,2,'3'] not equals [1,2,3]", [1, 2, '3'], [1, 2, 3]],
            [true, "复杂对象相等", { a: 1, b: '2', c: { x: 1, y: 2, z: [{ t: 12 }] } },
                { a: 1, b: '2', c: { x: 1, y: 2, z: [{ t: 12 }] } }],
            [false, "复杂对象不等", { a: 0, b: '2', c: { x: 1, y: 2 } },
                { a: '0', b: '2', c: { x: 1, y: 2 } }],
            [true, "复杂对象包含NaN", { a: 1, b: '2', c: { x: NaN, y: 2 } },
                { a: 1, b: '2', c: { x: NaN, y: 2 } }],
            [false, "对象中含有两个不相同的数组", { a: 1, b: '2', c: { x: NaN, y: [1, 2, 3] } },
                { a: 1, b: '2', c: { x: NaN, y: ['1', 2, 3] } }],
            [true, "对象中包含时间", { a: 1, b: '2', c: { x: NaN, y: [1, 2, new Date('2018-11-11')] } },
                { a: 1, b: '2', c: { x: NaN, y: [1, 2, new Date('2018-11-11')] } }],
            [false, "对象的属性个数不相等", { a: 1, b: 2 }, { a: 1 }],
            [false, "对象的属性名称不相等", { a: 1, b: 2 }, { a: 1, c: 2 }],
            [false, "数组的元素个数不相等", [1, 2], [1]],
            [false, "自定义的对象", new People('abc'), new People('abc')],
            [false, "包含特定的valueOf", new Student('y001'), new Student('y002')]
        ]
        datas.forEach((item, index) => {
            it(`case ${index.toFormat('d2')} : ${item[1]}`, () => {
                expect(Object.equals(item[2], item[3])).toBe(item[0]);

                expect(Object.equals(item[3], item[2])).toBe(item[0]);
            });
        });

    });

    describe("isNullOrUndefined", () => {
        it('Object.isNullOrUndefined(null) returns true', () => {
            expect(Object.isNullOrUndefined(null)).toBe(true);
        });
        it('Object.isNullOrUndefined(undefined) returns true', () => {
            expect(Object.isNullOrUndefined(undefined)).toBe(true);
        });
        it('Object.isNullOrUndefined("null") returns true', () => {
            expect(Object.isNullOrUndefined('null')).toBe(false);
        });
        it('Object.isNullOrUndefined("") returns true', () => {
            expect(Object.isNullOrUndefined('')).toBe(false);
        });
        it('Object.isNullOrUndefined("0") returns true', () => {
            expect(Object.isNullOrUndefined('0')).toBe(false);
        });
        it('Object.isNullOrUndefined({}) returns true', () => {
            expect(Object.isNullOrUndefined({})).toBe(false);
        });
    });
});