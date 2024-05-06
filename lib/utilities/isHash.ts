export function isHash(obj: any) {
    if (obj === null) return false;
    if (Array.isArray(obj)) return false;
    return typeof obj === "object";
}