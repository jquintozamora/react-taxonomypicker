import { Option, ReactSelectProps } from "react-select";
export interface ITaxonomyPickerProps extends ReactSelectProps {
    name: string;
    multi: boolean;
    displayName?: string;
    termSetGuid?: string;
    termSetName?: string;
    termSetCountMaxSwapToAsync?: number;
    termSetCountCacheExpiresMin?: number;
    termSetAllTermsCacheExpiresMin?: number;
    defaultOptions?: ITaxonomyValue[] | Option[];
    defaultValue?: ITaxonomyValue | ITaxonomyValue[] | Option | Option[] | string | string[] | number | number[] | boolean;
    placeholder?: string;
    onPickerChange?: (taxonomyPickerName: string, newValue: ITaxonomyValue | ITaxonomyValue[] | Option | Option[] | string | string[] | number | number[] | boolean) => void;
}
export interface ITaxonomyValue {
    label: string;
    value: string;
}
