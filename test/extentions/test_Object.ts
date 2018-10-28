import "../../src/extentions/Object"
import "mocha"
import * as assert from "assert"

describe("Object", () => {
    interface Data {
        [s: string]: any
    }
    
    describe("clone", () => {
        it('deep clone data_a obj', () => {
            let o:Data = {m:10,n:20}
            let data_c = Object.clone({
                a:1,
                b:2,
                c:o
            },true)
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
        it('no deep data_a obj',()=>{
            let o:Data = {m:10,n:20}
            let data_c = Object.clone({
                a:1,
                b:2,
                c:o
            },false)
            o.m = 10000
            assert.deepEqual(data_c, {
                a: 1,
                b: 2,
                c: {
                    m:10000,
                    n:20
                }
            }, 'no deep not equal')
        })
        it('deep clone data_a array', () => {
            let o:Data = [{m:10,n:20}]
            let data_c = Object.clone({
                a:1,
                b:2,
                c:o
            },true)
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
                a:1,
                b:2,
                c:{
                    m:10,
                    n:20
                }
            },{
                a:1,
                b:500,
                c:{
                    m:7
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
});