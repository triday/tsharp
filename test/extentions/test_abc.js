
const assert=require('assert');
describe("abc", () => {
    var data_array = [1, 2, 3, 4, 5];
  
    describe("contains", () => {
        it(`[${data_array}] not contains 6`, () => {
            assert.equal(data_array.length==6, false);
        });
      
    });
});