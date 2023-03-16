export const conversions: Record<string, string> = {
    "PRIMARY_DARK": "_DARK",
    "PRIMARY_LIGHT": "_LIGHT",
    "BRAND_NEW": "_NEW",
    "STATUS": "STATUS_",
}

export const appendKey = (key: string) => (!key.endsWith("0") && !key.endsWith("5")) ? `${key}_500` : key;

export function without<T extends Record<string, any>>(object: T, ...keys: string[]) {
    const cloned = { ...object };
    keys.forEach((k) => delete cloned[k]);
    return cloned;
}