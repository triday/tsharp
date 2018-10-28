declare interface Array<T>{
    /**
     * 判断数组中是否包含特定的元素。
     * @param value 要判定的元素。
     * @returns 如果包含判定的元素，则返回 true ，否则返回 false 。
     */
    contains(value:T):boolean;
    /**
     * 确定序列中的所有元素是否满足条件。
     * @param predicate 用于测试每个元素是否满足条件的函数。
     * @param thisArg this关键字可以在 predicate 函数中引用的对象。 如果省略thisArg，则将undefined用作此值。
     * @returns 如果本数组中的每个元素都通过指定的测试函数，或者序列为空，则为 true；否则为 false。
     */
    all(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    /**
     * 确定序列中存在满足测试函数的元素。
     * @param predicate 用于测试每个元素是否满足条件的函数。
     * @param thisArg this关键字可以在 predicate 函数中引用的对象。 如果省略thisArg，则将undefined用作此值。
     * @returns 如果本数组中在满足测试函数的元素，则为 true；否则为 false。
     */
    any(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    /**
     * 将序列中的每个元素投影到新表中。
     * @param selector 应用于每个元素的转换函数。 
     * @param thisArg this关键字可以在 selector 函数中引用的对象。 如果省略thisArg，则将undefined用作此值。
     * @returns 一个 新数组，其元素为对 数组 的每个元素调用转换函数的结果。
     */
    select<U>(selector: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    
    /**
     * 基于过滤函数选择符合条件的元素。
     * @param predicate 用于测试每个源元素是否满足条件的函数。
     * @param thisArg this关键字可以在 predicate 函数中引用的对象。 如果省略thisArg，则将undefined用作此值。
     * @returns 符合条件的元素组成的新数组。
     */
    where(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    /**
     * 选择数组中的第一个元素，如果数组为空，则抛出异常。
     * @returns 返回数组中的第一个元素，如果数组长度为 0，则抛出异常。
     */
    first():T;
    /**
     * 选择数组中的第一个元素并应用转换函数，如果数组为空，则抛出异常。
     * @param selector 应用于首元素的转换函数。
     * @returns 返回数组中的第一个元素应用转换函数后的结果，如果数组长度为 0，则抛出异常。
     */
    first<U>(selector: (value: T, index: number, array: T[]) => U):U;
    /**
     * 选择数组中的第一个元素，如果数组为空，则返回 undefined。
     * @returns 返回数组中的第一个元素，如果数组长度为 0，则返回 undefined。
     */
    firstOrDefault():T;
    /**
     * 选择数组中的第一个元素并应用转换函数，如果数组为空，则返回 undefined。
     * @param selector 应用于首元素的转换函数。
     * @returns 返回数组中的第一个元素应用转换函数后的结果，如果数组长度为 0，则返回 undefined。
     */
    firstOrDefault<U>(selector: (value: T, index: number, array: T[]) => U):U;
    
    /**
     * 选择数组中的最后一个元素，如果数组为空，则抛出异常。
     * @returns 返回数组中的最后一个元素，如果数组长度为 0，则抛出异常。
     */
    last():T;
    /**
     * 选择数组中的第一个元素，如果数组为空，则返回 undefined。
     * @returns 返回数组中的第一个元素，如果数组长度为 0，则返回 undefined。
     */
    lastOrDefault():T;



    single():T;
    singleOrDefault():T;

}