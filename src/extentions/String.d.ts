declare interface StringConstructor {
    /**
     * 指示指定的字符串是 null 还是 "" 字符串。
     * @param value 要测试的字符串。
     * @returns 如果 true 参数为 value 或空字符串 ("")，则为 null；否则为 false。
     */
    isNullOrEmpty(value: string): boolean;
    /**
     * 指示指定的字符串是 null、空还是仅由空白字符组成。
     * @param value  要测试的字符串。
     * @returns 如果 true 参数为 value 或 null，或者如果 "" 仅由空白字符组成，则为 value。
     */
    isNullOrWhiteSpace(value: string): boolean;
    /**
     * 将指定字符串中的格式项替换为指定数组中相应对象的字符串表示形式。
     * @param format 复合格式字符串。
     * @param args  一个对象数组，其中包含零个或多个要设置格式的对象。
     * @returns format 的副本，其中格式项已替换为 args 中相应对象的字符串表示形式。
     */
    format(format: string, ...args: any[]): string;
}
declare interface String {
    /**
     * 判断字符串的开头是否以指定的正则表达式开始。
     * @param pattern 正则表达式字符串。
     * @returns 如果是以指定的模式开始，则为 true，否则为 false。
     */
    startsWithPattern(pattern: string): boolean;
    /**
     * 判断字符串的开头是否以指定的正则表达式结束。
     * @param pattern 正则表达式字符串。
     * @returns 如果是以指定的模式开始，则为 true，否则为 false。
     */
    endsWithPattern(pattern: string): boolean;
    /**
     * 从当前字符串中移除前导空白字符。
     * @returns 移除前导空白字符后的结果。
     */
    trimStart(): string;
    /**
     * 从当前字符串中移除后置空白字符。
     * @returns 移除后置空白字符后的结果。
     */
    trimEnd(): string;
    /**
     * 返回一个新字符串，其中当前实例中出现的所有指定字符串都替换为另一个指定的字符串。
     * @param substr 要替换的字符串。
     * @param newSubStr 要替换 substr 的所有匹配项的字符串。
     * @returns 等效于当前字符串（除了 substr 的所有实例都已替换为 newSubStr 外）的字符串。如果在当前实例中找不到 substr，此方法返回未更改的当前实例。
     */
    replaceAll(substr: string, newSubStr: string): string;
    /**
     * 确定此实例是否与另一个指定的字符串是否相等。
     * @param other 要进行比较的字符串。
     * @param ignoreCase 是否忽略大小写，默认为 false ，即区分大小写。
     * @returns 如果 true 参数的值与此实例的值相同，则为 value；否则为 false。
     */
    equals(other: string, ignoreCase?: boolean): boolean;
    /**
     * 返回一个值，该值指示指定的子串是否出现在此字符串中。
     * @param substr 要搜寻的子串。
     * @param ignoreCase 匹配时是否忽略大小写，默认为 false ，即区分大小写。
     * @returns 如果为 true 表示包含了子串，否则表示不包含子串。
     */
    contains(substr: string, ignoreCase?: boolean): boolean;
}
