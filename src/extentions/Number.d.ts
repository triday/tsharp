declare interface Number {
    isBetween(val1: number, val2: number, includeEqual?: boolean): boolean;
    limitRange(min: number, max: number): number;
    format(fmt?: string): string;
}