
/**
 * 根据传入的参数构造class的名称
 * @param args 传入的参数
 */
export default function ClassNames(...args: (string | { [key: string]: boolean })[]): string {
    let classNames: string[] = [];
    args.forEach((item) => {
        if (typeof item === "string") {
            if (classNames.indexOf(item) < 0) {
                classNames.push(item);
            }
        } else {
            Object.keys(item || {}).forEach(key => {
                if (item[key] && classNames.indexOf(key) < 0) {
                    classNames.push(key);
                }
            });
        }
    });
    return classNames.join(' ');
}