import "../../src/extentions/Object"
import "mocha"
import * as assert from "assert"

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
            }, true)
            o.m = 10000
            assert.deepEqual(data_c, {
                a: 1,
                b: 2,
                c: {
                    m: 10,
                    n: 20
                }
            }, 'deep not equal')
        })
        it('no deep data_a obj', () => {
            let o: Data = { m: 10, n: 20 }
            let data_c = Object.clone({
                a: 1,
                b: 2,
                c: o
            }, false)
            o.m = 10000
            assert.deepEqual(data_c, {
                a: 1,
                b: 2,
                c: {
                    m: 10000,
                    n: 20
                }
            }, 'no deep not equal')
        })
        it('deep clone data_a array', () => {
            let o: Data = [{ m: 10, n: 20 }]
            let data_c = Object.clone({
                a: 1,
                b: 2,
                c: o
            }, true)
            o.m = 10000
            o[0].m = 10000
            assert.deepEqual(data_c, {
                a: 1,
                b: 2,
                c: [
                    {
                        m: 10,
                        n: 20
                    }
                ]
            }, 'deep not equal')
        })
    })

    describe("merge", () => {
        it('deep merge data_a data_b', () => {
            let data_c = Object.merge({
                a: 1,
                b: 2,
                c: {
                    m: 10,
                    n: 20
                }
            }, {
                    a: 1,
                    b: 500,
                    c: {
                        m: 7
                    }
                })
            assert.deepEqual(data_c, {
                a: 1,
                b: 500,
                c: {
                    m: 7,
                    n: 20
                }
            }, 'deep not equal')
        })
    })

    describe('compare', () => {
        it('常规比较两个对象是否相等', () => {
            assert.deepEqual(Object.compare({
                a: 1,
                b: '2',
                c: {
                    x: 1,
                    y: 2
                }
            }, {
                    a: 1,
                    b: '2',
                    c: {
                        x: 1,
                        y: 2
                    }
                }), true, 'obj1 is not equal obj2')
        })
        it('对象中含有数字0与字符串0', () => {
            assert.deepEqual(Object.compare({
                a: 0,
                b: '2',
                c: {
                    x: 1,
                    y: 2
                }
            }, {
                a: '0',
                b: '2',
                c: {
                    x: 1,
                    y: 2
                }
            }), false)
        })
        it('对象中含有NaN', () => {
            assert.deepEqual(Object.compare({
                a: 0,
                b: '2',
                c: {
                    x: NaN,
                    y: 2
                }
            }, {
                a: 0,
                b: '2',
                c: {
                    x: NaN,
                    y: 2
                }
            }), true)
        })
        it('对象中含有两个不相同的数组', () => {
            assert.deepEqual(Object.compare({
                a: 0,
                b: '2',
                c: {
                    x: NaN,
                    y: [1,2,3]
                }
            }, {
                a: 0,
                b: '2',
                c: {
                    x: NaN,
                    y: ["1",2,3]
                }
            }), false)
        })
    })
});