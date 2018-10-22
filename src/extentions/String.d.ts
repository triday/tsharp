declare interface String {

    startsWithPattern(pattern: string): boolean;
    endsWithPattern(pattern: string): boolean;
    trimStart(): string;
    trimEnd(): string;
}
declare interface StringConstructor {
    isEmpty(val: string): boolean;
    isNullOrEmpty(val: string): boolean;
    isNullOrWhiteSpace(val: string): boolean;
}