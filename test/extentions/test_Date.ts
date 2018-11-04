import "../../src/extentions/Date"
import "mocha"
import * as assert from "assert"

describe('Date',()=>{
    describe('format',()=>{
        it("YYYY",()=>{
            assert.equal(new Date("2014-04-02").format("YYYY"),"2014")
        })
        
        it("MM",()=>{
            assert.equal(new Date("2014-04-02").format("MM"),"04")
        })
        it("DD",()=>{
            assert.equal(new Date("2014-04-02").format("DD"),"02")
        })
        it("HH",()=>{
            assert.equal(new Date("2014-04-02T07:00").format("HH"),"07")
        })
        it("mm",()=>{
            assert.equal(new Date("2014-04-02T07:32:56").format("mm"),"32")
        })
        it("ss",()=>{
            assert.equal(new Date("2014-04-02T07:32:56").format("ss"),"56")
        })
        it("YYYY-MM-DDTHH:mm:ss",()=>{
            assert.equal(new Date("2014-04-02T07:32:56").format("YYYY-MM-DDTHH:mm:ss"),"2014-04-02T07:32:56")
        })
    });
    describe("equals",()=>{
        it("equals works ok",()=>{
            let date1=new Date("2018-11-4");
            let date2=new Date("2018-11-4");
            assert.equal(date1===date2,false);
            assert.equal(date1==date2,false);
            assert.equal(date1.equals(date2),true);
            assert.equal(date1.equals(new Date()),false);

        })

    });
})