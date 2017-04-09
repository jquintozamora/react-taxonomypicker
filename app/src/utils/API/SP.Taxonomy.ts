import { Cache } from "./../Cache";
import { Utils } from "./../Utils";

export default class TaxonomyAPI {

    /*
     * Function to get the number of terms of a given taxonomy Term Set
     * It will be used to decide if the TaxonomyPicker control renders as async or async
     * It will use Session Storage Cache to keep the results. Cache will expire in 1 week = 10080 minutes
     */
    public static getTermSetCount(termSetGuid: string, termSetName: string) {
        return new Promise((resolve: any, reject: any) => {
            const termSetCountCacheExpiresMin: number = 10080;
            const termSetCountCacheKey: string = "TermSetCount_" + termSetName + termSetGuid;
            const termSetCountCache: any = Cache.getStoredDataByKey(termSetCountCacheKey);
            // Try get Term Set count from the cache
            if (termSetCountCache) {
                resolve(termSetCountCache);
                return;
            }
            // If Term Set count is not in the cache, do the query using JSOM
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                // Utils.getLayoutsPageUrl replaces SP.Utilities.Utility.getLayoutsPageUrl
                SP.SOD.registerSod("sp.taxonomy.js", Utils.getLayoutsPageUrl("sp.taxonomy.js"));
                SP.SOD.executeFunc("sp.taxonomy.js", "SP.Taxonomy.TaxonomySession", () => {
                    const ctx = SP.ClientContext.get_current();
                    const session = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
                    const termStore = session.getDefaultSiteCollectionTermStore();
                    const termSet = termStore.getTermSet(new SP.Guid(termSetGuid));
                    const terms = termSet.getAllTerms();
                    ctx.load(terms, "Include()");
                    ctx.executeQueryAsync(
                        () => {
                            const termCount = terms.get_count();
                            Cache.setStoredDataByKey(termSetCountCacheKey, termCount, termSetCountCacheExpiresMin);
                            resolve(termCount);
                        },
                        (sender, args) => {
                            reject("Error in getTermSetCount. Message: " + args.get_message());
                        }
                    );
                });
            });
        });
    }

    /*
     * Function to get all terms of a given taxonomy Term Set
     * It will be used to get all terms when a TaxonomyPicker is Sync
     * Session Storage Cache will expire in 1 day = 1440 minutes
     */
    public static getAllTermsByTermSet(termSetGuid: string, termSetName: string, showOnlyAdvailableForTag: boolean) {
        return new Promise((resolve, reject) => {
            const termSetDataCacheExpiresMin: number = 1440;
            const termSetDataCacheKey: string = "TermSetData_" + termSetName + termSetGuid;
            const termSetDataCache: any = Cache.getStoredDataByKey(termSetDataCacheKey);
            // Try get Term Set data from the cache
            if (termSetDataCache) {
                resolve(termSetDataCache);
                return;
            }
            // If Term Set data is not in the cache, do the query using JSOM
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                // Utils.getLayoutsPageUrl replaces SP.Utilities.Utility.getLayoutsPageUrl
                SP.SOD.registerSod("sp.taxonomy.js", Utils.getLayoutsPageUrl("sp.taxonomy.js"));
                SP.SOD.executeFunc("sp.taxonomy.js", "SP.Taxonomy.TaxonomySession", () => {
                    const ctx = SP.ClientContext.get_current();
                    const taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
                    const termStore = taxSession.getDefaultSiteCollectionTermStore();
                    const termSet = termStore.getTermSet(new SP.Guid(termSetGuid));
                    const terms = termSet.getAllTerms();
                    ctx.load(terms, "Include(IsRoot, TermsCount, Id, Name, PathOfTerm, IsAvailableForTagging)");
                    ctx.executeQueryAsync(
                        () => {
                            let items: Array<{}> = [];
                            const termEnumerator = terms.getEnumerator();
                            while (termEnumerator.moveNext()) {
                                const currentTerm: any = termEnumerator.get_current();
                                const isAvailableForTagging: boolean = showOnlyAdvailableForTag ? currentTerm.get_isAvailableForTagging() : true;
                                if (isAvailableForTagging) {
                                    const termObj: any = {
                                        label: currentTerm.get_name(),
                                        value: currentTerm.get_id().toString()
                                    };
                                    items = [...items, termObj];
                                }
                            }
                            Cache.setStoredDataByKey(termSetDataCacheKey, items, termSetDataCacheExpiresMin);
                            resolve(items);
                        },
                        (sender, args) => {
                            reject(args.get_message());
                        });
                });
            });
        });
    }

    /*
     * Function to search terms in a given taxonomy Term Set
     * It will be used to get all terms when a TaxonomyPicker is Async
     * NO Session Storage Cache ENABLED
     */
    public static getSearchTermsByText(termSetGuid: string, termSetName: string, keyword: string, resultCollectionSize: number = 10, showOnlyAdvailableForTag: boolean = true) {
        return new Promise((resolve, reject) => {
            if (keyword === "") {
                resolve([]);
                return;
            }
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
                // Utils.getLayoutsPageUrl replaces SP.Utilities.Utility.getLayoutsPageUrl
                SP.SOD.registerSod("sp.taxonomy.js", Utils.getLayoutsPageUrl("sp.taxonomy.js"));
                SP.SOD.executeFunc("sp.taxonomy.js", "SP.Taxonomy.TaxonomySession", () => {
                    const ctx = SP.ClientContext.get_current();
                    const taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
                    const termStore = taxSession.getDefaultSiteCollectionTermStore();
                    const termSet = termStore.getTermSet(new SP.Guid(termSetGuid));
                    const lmi = new SP.Taxonomy.LabelMatchInformation(ctx);
                    lmi.set_termLabel(keyword);
                    lmi.set_defaultLabelOnly(true);
                    lmi.set_stringMatchOption(SP.Taxonomy.StringMatchOption.startsWith);
                    lmi.set_resultCollectionSize(resultCollectionSize);
                    lmi.set_trimUnavailable(true);
                    const terms = termSet.getTerms(lmi);
                    ctx.load(terms, "Include(IsRoot, TermsCount, Id, Name, PathOfTerm, IsAvailableForTagging)");
                    ctx.executeQueryAsync(
                        () => {
                            let items: Array<{}> = [];
                            const termEnumerator = terms.getEnumerator();
                            while (termEnumerator.moveNext()) {
                                const currentTerm: any = termEnumerator.get_current();
                                const isAvailableForTagging: boolean = showOnlyAdvailableForTag ? currentTerm.get_isAvailableForTagging() : true;
                                if (isAvailableForTagging) {
                                    const termObj: any = {
                                        label: currentTerm.get_name(),
                                        value: currentTerm.get_id().toString()
                                    };
                                    items = [...items, termObj];
                                }
                            }
                            resolve(items);
                        },
                        (sender, args) => {
                            reject(args.get_message());
                        });
                });
            });
        });
    }
}
