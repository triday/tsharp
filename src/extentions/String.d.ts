declare interface StringConstructor {
    isNullOrEmpty(val: string): boolean;
    isNullOrWhiteSpace(val: string): boolean;
    format(fmt: string, ...args: any[]): string;

}
declare interface String {
    startsWithPattern(pattern: string): boolean;
    endsWithPattern(pattern: string): boolean;
    trimStart(): string;
    trimEnd(): string;
    replaceAll(substr: string, newSubStr: string): string;
    equals(other: string, ignoreCase?: boolean): boolean;
    contains(substr: string, ignoreCase?: boolean): boolean;
}
