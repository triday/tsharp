declare interface Date{
    /**
     * 格式化日期。
     * @param fmt 日期格式 。
     * @returns 返回格式化后的日期。
     */
    format(fmt?:string):string;
    /**
     * 对比与指定日期的毫秒差。
     * @param other 要对比的日期。
     * @returns 返回一个数字，该数字表示与对比日期的毫秒差，正数表示本时间晚于对比的日期，负数表示本时间早于对比的日期。
     */
    diffMilliseconds(other:Date):number;
    /**
     * 对比与指定日期的秒差。
     * @param other 要对比的日期
     * @returns 返回一个数字，该数字表示与对比日期的秒差，正数表示本时间晚于对比的日期，负数表示本时间早于对比的日期。
     */
    diffSeconds(other:Date):number;
    /**
     * 对比与指定日期的分钟差。
     * @param other 要对比的日期。
     * @returns 返回一个数字，该数字表示与对比日期的分钟差，正数表示本时间晚于对比的日期，负数表示本时间早于对比的日期。
     */
    diffMinutes(other:Date):number;
    /**
     * 对比与指定日期的小时差。
     * @param other 要对比的日期。
     * @returns 返回一个数字，该数字表示与对比日期的小时差，正数表示本时间晚于对比的日期，负数表示本时间早于对比的日期。
     */
    diffHours(other:Date):number;
    /**
     * 对比与指定日期的天数差。
     * @param other 要对比的日期。
     * @returns 返回一个数字，该数字表示与对比日期的天数差，正数表示本时间晚于对比的日期，负数表示本时间早于对比的日期。
     */
    diffDays(other:Date):number;
}