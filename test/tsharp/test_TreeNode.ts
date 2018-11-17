import "../../src/tsharp/TreeNode";
import "../../src/extentions/String";
import "mocha"
import * as assert from "assert";
describe("TreeNode", () => {
    const datas = [
        { name: "node1", id: "X001", parent: "" },
        { name: "node7", id: "X007", parent: "X004" },
        { name: "node3", id: "X003", parent: "" },
        { name: "node4", id: "X004", parent: "X002" },
        { name: "node5", id: "X005", parent: "X001" },
        { name: "node8", id: "X008", parent: "X004" },
        { name: "node2", id: "X002", parent: "" },
        { name: "node6", id: "X006", parent: "X004" },
        { name: "node9", id: "X009", parent: "X007" },
    ];
    describe("toTree", () => {

        it("datas to tree has 3 root node", () => {
            let res = datas.toTree(p => p.id, p => p.parent);
            assert.equal(res.length, 3);

        });
        it("datas to tree and foreachBefore", () => {
            let res = datas.toTree(p => p.id, p => p.parent, (a, b) => {
                return a.name === b.name ? 0 : (a.name > b.name ? 1 : -1);
            });
            assert.equal(res.length, 3);
            const expected = [
                "├──node1",
                "   ├──node5",
                "├──node2",
                "   ├──node4",
                "      ├──node6",
                "      ├──node7",
                "         ├──node9",
                "      ├──node8",
                "├──node3",
            ];
            let lines: string[] = [];
            res.forEach(p => p.forEachBefore((v, n, depth) => {
                lines.push(`${String.from(' ', 3 * depth)}├──${v.name}`);
            }));
            console.log(lines);
            assert.deepEqual(lines, expected);
        });
        it("datas to tree and foreachAfter", () => {
            let res = datas.toTree(p => p.id, p => p.parent, (a, b) => {
                return a.name === b.name ? 0 : (a.name > b.name ? 1 : -1);
            });
            assert.equal(res.length, 3);
            const expected = [
                "   ├──node5",
                "├──node1",
                "      ├──node6",
                "         ├──node9",
                "      ├──node7",
                "      ├──node8",
                "   ├──node4",
                "├──node2",
                "├──node3",
            ];
            let lines: string[] = [];
            res.forEach(p => p.forEachAfter((v, n, depth) => {
                lines.push(`${String.from(' ', 3 * depth)}├──${v.name}`);
            }));
            console.log(lines);
            assert.deepEqual(lines, expected);
        });
    });


});