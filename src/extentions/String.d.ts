declare interface StringConstructor {
    isNullOrEmpty(val: string): boolean;
    isNullOrWhiteSpace(val: string): boolean;
}
declare interface String {
    startsWithPattern(pattern: string): boolean;
    endsWithPattern(pattern: string): boolean;
    trimStart(): string;
    trimEnd(): string;
}
