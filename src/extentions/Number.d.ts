declare interface Number {
    /**
     * 判断本数字是否在指定的两个数字之间，指定的两个数字可以不要求顺序。
     * @param val1 区间数字1。
     * @param val2 区间数字2。
     * @param includeEqual 是否包含区间的两个端点值。
     * @return 返回 true 表示在指定的数字之间，false 表示不在区间之内。
     */
    isBetween(val1: number, val2: number, includeEqual?: boolean): boolean;
    /**
     * 将数字限定在指定的两个数字之间，指定的两个数字可以不要求顺序。
     * @param val1 区间数字1。
     * @param val2 区间数字2。
     * @returns 如果本数字小于两个区间数字的最小值，则取区间的最小值；如果本数字大于两个区间数字的最大值，则取区间的最大值，否则取本数字本身。
     */
    limitRange(val1: number, val2: number): number;
    /**
     * 格式化数字。
     * @param fmt 数字格式。 支持的字母格式如下（d,e,f,g,n,p,r,x)\
     * d 表示格式化为正数；\
     * e 表示格式化为科学计数法（支持大写E,表示结果中的字符转为大写字符）；\
     * f 表示格式化为小数 ；\
     * g 表示格式化为紧凑的定点表示法或科学记数法（支持大写E,表示结果中的字符转为大写字符）；\
     * n 表示格式化为带千分位的数字表示法；\
     * p 表示格式化为百分数，其中数字部分使用千分位的数字表示法；\
     * r 表示格式化为可以往返至相同数字的字符串；\
     * x 表示格式化为十六进制的字符串，格式化前首先对数字取整（支持大写E,表示结果中的字符转为大写字符）；\
     * 
     * @returns 返回格式化后的数字。
     */
    format(fmt?: string): string;
}