export function isDate(obj: any) {
    if (obj === null) return false;
    if (typeof obj !== "object") return false;
    return obj.constructor === Date;
}