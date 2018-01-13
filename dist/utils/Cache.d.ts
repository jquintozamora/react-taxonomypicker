export declare class Cache {
    static buildStorageKey(key: string): string;
    static clearStoredDataByKey(key: string): void;
    static getStoredDataByKey(key: string): any;
    static setStoredDataByKey(key: string, dataToStore: any, expireMinutes: number): void;
}
