declare interface Object {
    merge(...items:object[]):object,
    clone(obj:object,deep?:boolean):object
}