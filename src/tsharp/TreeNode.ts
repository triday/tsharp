/// <reference path="../extentions/Array.ts" />

namespace tsharp {
    /**
     * 表示树状数据结构的节点。
     */
    export class TreeNode<T>
    {
        constructor(public value: T, public childrens: TreeNode<T>[] = []) {
        }
        /**
         * 前序遍历树状结构的节点以及子节点。
         * @param callback 遍历元素的回调函数。
         * @param depth 起始深度值。
         */
        public forEachBefore(callback: (value: T, node: TreeNode<T>, depth: number) => void, depth: number = 0): void {
            if(!callback) return;
            callback(this.value, this, depth);
            (this.childrens||[]).forEach(p => { p.forEachBefore(callback, depth + 1); })
        }
        /**
         * 后序遍历树状结构的节点以及子节点。
         * @param callback 遍历元素的回调函数。
         * @param depth 起始深度值。
         */
        public forEachAfter(callback: (value: T, node: TreeNode<T>, depth: number) => void, depth: number = 0): void {
            if(!callback) return;
            (this.childrens||[]).forEach(p => { p.forEachAfter(callback, depth + 1); })
            callback(this.value, this, depth);
        }
        /**
         * 将节点根据比较函数进行递归排序。
         * @param compareFn 比较当前Node值的函数。
         */
        public sort(compareFn: (a: T, b: T) => number): void {
            this.childrens.sort((a, b) => compareFn(a.value, b.value));
            this.childrens.forEach(p => p.sort(compareFn));
        }
    }

}
interface Array<T> {
    /**
     * 将数组转换为树状结构的节点集。
     * @param keySelector 选择当前元素的key的函数。
     * @param parentKeySelector 选择当前元素的父元素key的函数。
     * @param sortfn 排序数组结构的函数。
     * @returns 返回树状结构的节点集。
     */
    toTree<K>(keySelector: (item: T) => K, parentKeySelector: (item: T) => K, sortfn?: (a: T, b: T) => number): tsharp.TreeNode<T>[];
}
if (!Array.prototype.toTree) {
    Array.prototype.toTree = function <T, K>(keySelector: (item: T) => K, parentKeySelector: (item: T) => K, sortfn?: (a: T, b: T) => number): tsharp.TreeNode<T>[] {
        function toDictionaryInternal<T>(array: T[], keySelector: (value: T, index: number, array: T[]) => any): any {
            let res: any = {};
            array.forEach((current: T, index: number) => {
                let key = keySelector(current, index, this);
                res[key] = current;
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
        let res = entries.where(p => p.flag === false).select(p => p.node);
        if (sortfn) {
            res.sort((a, b) => sortfn(a.value, b.value));
            res.forEach(p => p.sort(sortfn));
        }
        return res;
    }
}