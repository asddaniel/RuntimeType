export type ObjectType = {
    [key: string]: any;
};
export declare function getObjectTypes(obj: ObjectType): ObjectType;
export declare const getDataType: (data: any) => "number" | "string" | "boolean" | "function" | "undefined" | "symbol" | "bigint" | ObjectType;
