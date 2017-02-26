export class Cache {

    public static buildStorageKey(key: string) {
        let prefix: string = "";
        if (window && window.hasOwnProperty("location") && window.location.hasOwnProperty("host") && window.location.hasOwnProperty("pathname")) {
            prefix = window.location.host + window.location.pathname;
        }
        return `${prefix}_${key}`.replace(/[^a-zA-Z0-9]/g, ".");
    }

    public static clearStoredDataByKey(key: string): void {
        if (window.sessionStorage) {
            const newKey: string = Cache.buildStorageKey(key);
            sessionStorage.removeItem(newKey);
        }
    }

    public static getStoredDataByKey(key: string): any {
        let returnData: any = null;
        if (window.sessionStorage) {

            const newKey: string = Cache.buildStorageKey(key);
            const sessionCache: any = window.sessionStorage.getItem(newKey);
            if (sessionCache !== null) {
                const nowDt = new Date();
                const cachedData = JSON.parse(sessionCache);
                if (cachedData.expiryTime > nowDt) {
                    returnData = cachedData.data;
                }
            }
        }
        return returnData;
    }

    public static setStoredDataByKey(key: string, dataToStore: any, expireMinutes: number) {
        if (window.sessionStorage) {
            const newKey: string = Cache.buildStorageKey(key);
            const nowDt = new Date();
            const expiryTime = nowDt.setMinutes(nowDt.getMinutes() + 2);
            const data: any = { data: dataToStore, expiryTime };
            window.sessionStorage.setItem(newKey, JSON.stringify(data));
        }
    }

}
