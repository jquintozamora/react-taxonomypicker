import TaxonomyAPI from "../SP.Taxonomy";

declare global {
    namespace NodeJS {
        interface Global {
            SP: any;
        }
    }
}
global.SP = {
    SOD: {
        executeFunc: (a, b, callback) => {
            Promise.resolve(callback(1));
        },
        registerSod: () => {}
    },
    ClientContext: {
        get_current: () => {
            return {
                load: () => {},
                executeQueryAsync: callback => {
                    return Promise.resolve(callback(1));
                }
            };
        }
    },
    Taxonomy: {
        TaxonomySession: {
            getTaxonomySession: () => {
                return {
                    getDefaultSiteCollectionTermStore: () => {
                        return {
                            getTermSet: () => {
                                return {
                                    getAllTerms: () => {
                                        return {
                                            get_count: () => {
                                                return 1;
                                            }
                                        };
                                    }
                                };
                            }
                        };
                    }
                };
            }
        }
    },
    Guid: () => {}
};

describe("TaxonomyAPI", () => {
    describe("getTermSetCount", () => {
        it("return count", async () => {
            const counter = await TaxonomyAPI.getTermSetCount("guid", "name");
            expect(counter).toBe(1);
        });
    });
});
