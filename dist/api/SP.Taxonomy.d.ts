export default class TaxonomyAPI {
    static getTermSetCount(termSetGuid: string, termSetName: string): Promise<unknown>;
    static getAllTermsByTermSet(termSetGuid: string, termSetName: string, showOnlyAvailableForTag: boolean): Promise<unknown>;
    static getSearchTermsByText(termSetGuid: string, termSetName: string, keyword: string, resultCollectionSize?: number, showOnlyAvailableForTag?: boolean): Promise<unknown>;
}
