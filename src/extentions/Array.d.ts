declare interface Array<T>{
    any(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    select<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    where<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    where(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    all(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    first():T;
    firstOrDefault():T;
    last():T;
    lastOrDefault():T;
    single():T;
    singleOrDefault():T;
    contains(value:T):boolean;
}