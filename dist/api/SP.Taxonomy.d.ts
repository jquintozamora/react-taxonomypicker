export default class TaxonomyAPI {
    static getTermSetCount(termSetGuid: string, termSetName: string): Promise<{}>;
    static getAllTermsByTermSet(termSetGuid: string, termSetName: string, showOnlyAdvailableForTag: boolean): Promise<{}>;
    static getSearchTermsByText(termSetGuid: string, termSetName: string, keyword: string, resultCollectionSize?: number, showOnlyAdvailableForTag?: boolean): Promise<{}>;
}
