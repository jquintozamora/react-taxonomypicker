const delay: number = 500;
const numberOfItems = 1500;

let items: Array<{}> = [];
for (let i = 0; i <= numberOfItems; i++) {
    const tempLabel = "Word " + i;
    const termObj: any = {
        guid: newGuid(),
        label: tempLabel,
        name: tempLabel,
        path: tempLabel,
        value: tempLabel,
    };
    items = [...items, termObj];
}

function newGuid() {
    return "xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getTermsCount(termSetGuid: string): number {
    let termCount = 0;
    switch (termSetGuid) {
        case "7c16e180-d093-4709-8426-e7997acb4302":
            termCount = 314;
            break;
        case "dc85f60c-1a19-4be0-ad20-544bbca0b1b4":
            termCount = 1500;
            break;
        case "26ebf149-101a-4996-9df2-8179a537350d":
            termCount = 80;
        default:
            break;
    }
    return termCount;
}

export default class TaxonomyAPI {

    /*
     * Function to get the number of items of a given taxonomy Term Set
     * It will be used to decide if the TaxonomyPicker control renders as async or async
     * It will use Session Storage Cache to keep the results. Cache will expire in 1 week = 10080 minutes
     */
    public static getTermSetCount(termSetGuid: string, termSetName: string) {
        return new Promise((resolve: any, reject: any) => {
            setTimeout(() => {
                const termCount = getTermsCount(termSetGuid);
                resolve(termCount);
            }, delay);
        });
    }

    public static getAllTermsByTermSet(termSetGuid: string, termSetName: string, showOnlyAdvailableForTag: boolean) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(items.slice(0, getTermsCount(termSetGuid)));
            }, delay);
        });
    }


    /*
     * Function to search terms in a given taxonomy Term Set
     * It will be used to get all terms when a TaxonomyPicker is Async
     * NO Session Storage Cache ENABLED
     */
    public static getSearchTermsByText(termSetGuid: string, termSetName: string, keyword: string, resultCollectionSize: number = 10, showOnlyAdvailableForTag: boolean = true) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(items
                    .filter((item: any) => {
                        return (item.name.search(keyword) > -1);
                    })
                    .slice(0, resultCollectionSize)
                );
            }, delay);
        });
    }

}
