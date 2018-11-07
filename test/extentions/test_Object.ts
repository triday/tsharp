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
            })
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
 
        it('deep clone data_a array', () => {
            let o: Data = [{ m: 10, n: 20 }]
            let data_c = Object.clone({
                a: 1,
                b: 2,
                c: o
            })
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
        it('deep clone  array', () => {
            let arraya=[1,2,3];
            let arrayb=[1,2,3];
            assert.deepEqual(Object.clone(arraya),arrayb);
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

    
    describe("equals", () => {
        let data1 = [{ name: 'abc', age: 13 }, { name: 'bcd', age: 14 }];
        let data2 = [{ name: 'abc', age: 13 }, { name: 'bcd', age: 14 }]
        it("equals self", () => {
            assert.equal(Object.equals(data1,data1), true);
        });
        it("equals the same data", () => {
            assert.equal(Object.equals(data1,data2), true);
        });
    });
    // describe('compare', () => {
    //     it('常规比较两个对象是否相等', () => {
    //         assert.deepEqual(Object.compare({
    //             a: 1,
    //             b: '2',
    //             c: {
    //                 x: 1,
    //                 y: 2
    //             }
    //         }, {
    //                 a: 1,
    //                 b: '2',
    //                 c: {
    //                     x: 1,
    //                     y: 2
    //                 }
    //             }), true, 'obj1 is not equal obj2')
    //     })
    //     it('对象中含有数字0与字符串0', () => {
    //         assert.deepEqual(Object.compare({
    //             a: 0,
    //             b: '2',
    //             c: {
    //                 x: 1,
    //                 y: 2
    //             }
    //         }, {
    //             a: '0',
    //             b: '2',
    //             c: {
    //                 x: 1,
    //                 y: 2
    //             }
    //         }), false)
    //     })
    //     it('对象中含有NaN', () => {
    //         assert.deepEqual(Object.compare({
    //             a: 0,
    //             b: '2',
    //             c: {
    //                 x: NaN,
    //                 y: 2
    //             }
    //         }, {
    //             a: 0,
    //             b: '2',
    //             c: {
    //                 x: NaN,
    //                 y: 2
    //             }
    //         }), true)
    //     })
    //     it('对象中含有两个不相同的数组', () => {
    //         assert.deepEqual(Object.compare({
    //             a: 0,
    //             b: '2',
    //             c: {
    //                 x: NaN,
    //                 y: [1,2,3]
    //             }
    //         }, {
    //             a: 0,
    //             b: '2',
    //             c: {
    //                 x: NaN,
    //                 y: ["1",2,3]
    //             }
    //         }), false)
    //     });

    //     it('对象中包含日期',()=>{
    //         let obj1={
    //             name:"abc",
    //             birthday:new Date('2017-10-1')
    //         };
    //         let obj2={
    //             name:"Abc",
    //             birthday:new Date('2017-10-1')
    //         };
    //         assert.equal(Object.equals(obj1,obj2),true);
    //         assert.equal(Object.compare(obj1,obj2),true);
    //     });
    // })
});