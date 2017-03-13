import { Option } from "react-select";

export interface ITaxonomyPickerProps {

    /**
     * The internal name of the Taxonomy Picker (nothing to do with TermSet name).
     */
    name: string;

    /**
     * A Boolean value that specifies whether the Taxonomy Picker has multiple or single values to be selected.
     */
    multi: boolean;

    /**
     * The display name to be show as a control label.
     */
    displayName?: string;

    /**
     * The term set id to get the terms.
     * Is it's not specified, then will be used defaultOptions as a fallback
     */
    termSetGuid?: string;

    /**
     * The term set name.
     */
    termSetName?: string;

    /**
     * The maximun number of terms from which convert the control from Sync to Asycn.
     * Sync means all the terms will be gathered.
     * Async means no terms will be gotten until first user search.
     */
    termSetCountMaxSwapToAsync?: number;

    /**
     * The quantity of minutes to expire the Term Set Counters cache.
     * That is the cache used by TaxonomyAPI.getTermSetCount method to get the quantity of terms.
     * Default value is 10080 minutes / 1 week
     * @default 10080
     */
    termSetCountCacheExpiresMin?: number;

    /**
     * The quantity of minutes to expire the Get All Terms cache.
     * That is the cache used by TaxonomyAPI.getAllTermsByTermSet method to get the quantity of terms.
     * Default value is 1440 minutes / 1 day
     * @default 1440
     */
    termSetAllTermsCacheExpiresMin?: number;

    /**
     * The defaultOptions values to be used as a Mock values
     */
    defaultOptions?: ITaxonomyValue[] | Option[];

    /**
     * initial Taxonomy Picker value
     */
    defaultValue?: ITaxonomyValue | ITaxonomyValue[] | Option | Option[] | string | string[] | number | number[] | boolean;

    /**
     * field placeholder, displayed when there's no value
     * @default "Type here to search..."
     */
    placeholder?: string;

    /**
     * Function (event handler which triggers when the selected value/s change/s.
     */
    onPickerChange?: (taxonomyPickerName: string, newValue: ITaxonomyValue | ITaxonomyValue[] | Option | Option[] | string | string[] | number | number[] | boolean) => void;
};


/**
 * Defines basic taxonomy value data structure.
 */
export interface ITaxonomyValue {

    /**
     * The name for a Term.
     */
    label: string;

    /**
     * The GUID for a Term.
     */
    value: string;
}
