/// <reference path="../extentions/Array.ts" />



namespace tsharp {
    export enum Traversal {
        Before,
        After
    }
    /**
     * 表示树状数据结构的节点。
     */
    export class TreeNode<T>
    {
        constructor(public value: T, public childrens: TreeNode<T>[] = []) {
        }
        public forEachNode(callback: (value: T, node: TreeNode<T>, depth: number) => void, traversal: Traversal = Traversal.Before, depth: number = 0): void {
            if (!callback) return;
            if (traversal == Traversal.Before) {
                callback(this.value, this, depth);
                (this.childrens || []).forEach(p => { p.forEachNode(callback, traversal, depth + 1); })
            } else {
                callback(this.value, this, depth);
                (this.childrens || []).forEach(p => { p.forEachNode(callback, traversal, depth + 1); })
            }
        }
    }
}

interface Array<T>
{
    toTree<K>(keySelector: (item: T) => K, parentKeySelector: (item: T) => K): tsharp.TreeNode<T>[];
}
if (!Array.prototype.toTree) {
    Array.prototype.toTree = function <T, K>(keySelector: (item: T) => K, parentKeySelector: (item: T) => K): tsharp.TreeNode<T>[] {
        function toDictionaryInternal<T>(array: T[], keySelector: (value: T, index: number, array: T[]) => any, elementSelector?: (value: T, index: number, array: T[]) => any): any {
            let res: any = {};
            array.forEach((current: T, index: number) => {
                let key = keySelector(current, index, this);
                let value = elementSelector ? elementSelector(current, index, this) : current;
                res[key] = value;
            }, {});
            return res;
        }
        let entries = (this as T[]).select(p => {
            let node: tsharp.TreeNode<T> = new tsharp.TreeNode<T>(p);
            return {
                key: keySelector(p),
                parentKey: parentKeySelector(p),
                node: node,
                flag: false
            }
        });
        let entry = toDictionaryInternal(entries, p => p.key);
        for (let key in entry) {
            let value = entry[key];
            if (value.parentKey in entry) {
                entry[value.parentKey].node.childrens.push(value.node);
                value.flag = true;
            }
        }
        return entries.where(p => p.flag === false).select(p => p.node);
    }
}