import { OptionProps } from "react-select/lib/types";
import { Props as SelectProps } from "react-select/lib/Select";
import { AsyncProps } from "react-select/lib/Async";
declare type OptionValue = ITaxonomyValue | ITaxonomyValue[] | OptionProps | OptionProps[] | string | string[] | number | number[] | boolean;
export interface ITaxonomyPickerProps extends SelectProps<OptionValue>, AsyncProps<OptionValue> {
    name: string;
    multi: boolean;
    displayName?: string;
    termSetGuid?: string;
    termSetName?: string;
    termSetCountMaxSwapToAsync?: number;
    termSetCountCacheExpiresMin?: number;
    termSetAllTermsCacheExpiresMin?: number;
    defaultOptions: ITaxonomyValue[] | OptionProps[];
    defaultValue?: OptionValue;
    placeholder?: string;
    onPickerChange?: (taxonomyPickerName: string, newValue: OptionValue) => void;
    showPath?: boolean;
    logErrorsConsole?: boolean;
    logErrorsDiv?: boolean;
}
export interface ITaxonomyValue {
    label: string;
    value: string;
    path: string;
}
export {};
