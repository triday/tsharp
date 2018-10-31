declare interface Object {
    merge(...items:object[]):object,
    /**
     * 
     * @param obj 
     * @param deep 
     */
    clone(obj:object,deep?:boolean):object,
    compare(obj1:object,obj2:object):boolean
}