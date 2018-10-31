interface Array<T> {
    /**
     * 判断数组中是否包含特定的元素。
     * @param value 要判定的元素。
     * @param comparer 比较函数。
     * @returns 如果包含判定的元素，则返回 true ，否则返回 false 。
     */
    contains(value: T, comparer?: (a: T, b: T) => boolean): boolean;
    /**
     * 确定序列中的所有元素是否满足条件。
     * @param predicate 用于测试每个元素是否满足条件的函数。
     * @returns 如果本数组中的每个元素都通过指定的测试函数，或者序列为空，则为 true；否则为 false。
     */
    all(predicate: (value: T, index: number, array: T[]) => boolean): boolean;
    /**
     * 确定序列中存在满足测试函数的元素。
     * @param predicate 用于测试每个元素是否满足条件的函数。
     * @returns 如果本数组中在满足测试函数的元素，则为 true；否则为 false。
     */
    any(callbackfn: (value: T, index: number, array: T[]) => boolean): boolean;
    /**
     * 将序列中的每个元素投影到新表中。
     * @param selector 应用于每个元素的转换函数。 
     * @returns 一个 新数组，其元素为对 数组 的每个元素调用转换函数的结果。
     */
    select<U>(selector: (value: T, index: number, array: T[]) => U): U[];

    /**
     * 基于过滤函数选择符合条件的元素。
     * @param predicate 用于测试每个源元素是否满足条件的函数。
     * @returns 符合条件的元素组成的新数组。
     */
    where(predicate: (value: T, index: number, array: T[]) => any): T[];
    /**
     * 选择数组中的第一个元素，如果数组为空，则抛出异常。
     * @returns 返回数组中的第一个元素，如果数组长度为 0，则抛出异常。
     */
    first(): T;
    /**
     * 选择数组中的第一个元素并应用转换函数，如果数组为空，则抛出异常。
     * @param selector 应用于首元素的转换函数。
     * @returns 返回数组中的第一个元素应用转换函数后的结果，如果数组长度为 0，则抛出异常。
     */
    first<U>(selector: (value: T, index: number, array: T[]) => U): U;
    /**
     * 选择数组中的第一个元素，如果数组为空，则返回 undefined。
     * @returns 返回数组中的第一个元素，如果数组长度为 0，则返回 undefined。
     */
    firstOrDefault(): T;
    /**
     * 选择数组中的第一个元素并应用转换函数，如果数组为空，则返回 undefined。
     * @param selector 应用于首元素的转换函数。
     * @returns 返回数组中的第一个元素应用转换函数后的结果，如果数组长度为 0，则返回 undefined。
     */
    firstOrDefault<U>(selector: (value: T, index: number, array: T[]) => U): U;

    /**
     * 选择数组中的最后一个元素，如果数组为空，则抛出异常。
     * @returns 返回数组中的最后一个元素，如果数组长度为 0，则抛出异常。
     */
    last(): T;
    /**
     * 选择数组中的最后一个元素并应用转换函数，如果数组为空，则抛出异常。
     * @param selector 应用于最后一个元素的转换函数。
     * @returns 返回数组中的最后一个元素应用转换函数后的结果，如果数组长度为 0，则抛出异常。
     */
    last<U>(selector: (value: T, index: number, array: T[]) => U): U;
    /**
     * 选择数组中的第一个元素，如果数组为空，则返回 undefined。
     * @returns 返回数组中的第一个元素，如果数组长度为 0，则返回 undefined。
     */
    lastOrDefault(): T;
    /**
     * 选择数组中的最后一个元素并应用转换函数，如果数组为空，则返回 undefined。
     * @param selector 应用于最后一个元素的转换函数。
     * @returns 返回数组中的最后一个元素应用转换函数后的结果，如果数组长度为 0，则返回 undefined。
     */
    lastOrDefault<U>(selector: (value: T, index: number, array: T[]) => U): U;

    /**
     * 选择数组中的唯一元素，如果数组为空或者数量大于 1，则抛出异常。
     * @returns 返回数组中的最后一个元素，如果数组长度为 0 或者数量大于 1，则抛出异常。
     */
    single(): T;

    /**
     * 选择数组中的唯一元素并应用转换函数，如果数组为空或者数量大于 1，则抛出异常。
     * @param selector 应用于唯一元素的转换函数。
     * @returns 返回数组中的唯一元素应用转换函数后的结果，如果数组长度为 0 或者数量大于 1，则抛出异常。
     */
    single<U>(selector: (value: T, index: number, array: T[]) => U): U;
    /**
     * 选择数组中的唯一元素，如果数组为空，则返回 undefined，如果数量大于1，则抛出异常。
     * @returns 返回数组中的唯一元素，如果数组长度为 0，则返回 undefined，如果数量大于1，则抛出异常。
     */
    singleOrDefault(): T;
    /**
     * 选择数组中的唯一元素并应用转换函数，如果数组为空，则返回 undefined，如果数量大于1，则抛出异常。。
     * @param selector 应用于唯一元素的转换函数。
     * @returns 返回数组中的唯一元素应用转换函数后的结果，如果数组长度为 0，则返回 undefined，如果数量大于1，则抛出异常。。
     */
    singleOrDefault<U>(selector: (value: T, index: number, array: T[]) => U): U;
    /**
     * 基于过滤函数统计符合条件的元素，如果过滤函数为空，则返回本数组的长度。
     * @param predicate 用于测试每个源元素是否满足条件的函数。
     * @returns 返回符合条件的个数，如果过滤函数为空，则返回数组的原始长度。
     */
    count(predicate?: (value: T, index: number, array: T[]) => any): number;

    /**
    * 将序列的每个元素投影到新的数组，并将结果数组合并为一个数组。
    * @param selector 应用于每个元素的转换函数。 
    * @returns 一个 新数组，其元素为对 数组 的每个元素调用转换函数的结果。
    */
    selectMany<U>(selector: (value: T, index: number, array: T[]) => U[]): U[];

    min(selector?: (value: T, index: number, array: T[]) => number): number;
    max(selector?: (value: T, index: number, array: T[]) => number): number;
    sum(selector?: (value: T, index: number, array: T[]) => number): number;
    average(selector?: (value: T, index: number, array: T[]) => number): number;

    replaceNullOrUndefined(item: T): T[];
    replaceNullOrUndefined(factory: (index: number, array: T[]) => T): T[];
    ignoreNullOrUndefined(): T[];

    distinct(comparer?: (a: T, b: T) => boolean): T[];
    except(other: T[], comparer?: (a: T, b: T) => boolean): T[];
    intersect(other: T[], comparer?: (a: T, b: T) => boolean): T[];
    union(other: T[], comparer?: (a: T, b: T) => boolean): T[];
    skip(count: number): T[];
    skipWhere(predicate: (value: T, index: number, array: T[]) => boolean): T[];

    take(count: number): T[];
    takeWhere(predicate: (value: T, index: number, array: T[]) => boolean): T[];

    orderBy(...keySelectors: (((value: T) => any) | [(value: T) => any, boolean])[]): T[];

    clone(): T[];

    equals(other: T[], deep?: boolean, ignoreNaN?: boolean): boolean;

    toDictionary(keySelector: (value: T, index: number, array: T[]) => string): { [key: string]: T }
    toDictionary<U>(keySelector: (value: T, index: number, array: T[]) => string, elementSelector: (value: T, index: number, array: T[]) => U): { [key: string]: U }
    toDictionary(keySelector: (value: T, index: number, array: T[]) => number): { [key: number]: T }
    toDictionary<U>(keySelector: (value: T, index: number, array: T[]) => number, elementSelector: (value: T, index: number, array: T[]) => U): { [key: number]: U }

    toLookup(keySelector: (value: T, index: number, array: T[]) => string): { [key: string]: T[] }
    toLookup<U>(keySelector: (value: T, index: number, array: T[]) => string, elementSelector: (value: T, index: number, array: T[]) => U): { [key: string]: U[] }
    toLookup(keySelector: (value: T, index: number, array: T[]) => number): { [key: number]: T[] }
    toLookup<U>(keySelector: (value: T, index: number, array: T[]) => number, elementSelector: (value: T, index: number, array: T[]) => U): { [key: number]: U[] }
}
interface ArrayConstructor {
    range(stop: number): number[];
    range(start: number, stop: number, step?: number): number[];
    repeat<T>(item: T, count: number): T[]
}

/**
GroupBy
GroupJoin
Join

toTree

Zip
 * */

