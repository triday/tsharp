import "../../src/tsharp/TreeNode"
import "mocha"
import * as assert from "assert";
describe("TreeNode", () => {
    describe("toTree", () => {
        const datas = [
            { name: "node1", id: "X001", parent: "" },
            { name: "node2", id: "X002", parent: "" },
            { name: "node3", id: "X003", parent: "" },
            { name: "node4", id: "X004", parent: "X002" },
            { name: "node5", id: "X005", parent: "X001" },
            { name: "node6", id: "X006", parent: "X004" },
            { name: "node7", id: "X007", parent: "X004" },
            { name: "node8", id: "X008", parent: "X004" },
            { name: "node9", id: "X009", parent: "X007" },
        ]
        it("datas to tree has 3 root node", () => {
            let res = datas.toTree(p => p.id, p => p.parent);
            assert.equal(res.length, 3);
        });
    });
});