
export enum Traversal {
    Before,
    After
}
export class TreeNode<T>
{
    public value: T;
    public childrens: TreeNode<T>[];
    public forEach(callback: (value: T, node: TreeNode<T>, depth: number) => {}, traversal: Traversal = Traversal.Before, depth: number = 0): void {
        if (!callback) return;
        if (traversal == Traversal.Before) {
            callback(this.value, this, depth);
            (this.childrens || []).forEach(p => { p.forEach(callback, traversal, depth + 1); })
        } else {
            callback(this.value, this, depth);
            (this.childrens || []).forEach(p => { p.forEach(callback, traversal, depth + 1); })
        }
    }
}
