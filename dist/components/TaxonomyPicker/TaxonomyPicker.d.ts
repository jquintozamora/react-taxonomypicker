/// <reference types="react" />
import * as React from "react";
import ITaxonomyPickerProps from "./ITaxonomyPickerProps";
import ITaxonomyPickerState from "./ITaxonomyPickerState";
declare class TaxonomyPicker extends React.Component<ITaxonomyPickerProps, ITaxonomyPickerState> {
    static defaultProps: ITaxonomyPickerProps;
    constructor(props: any, context: any);
    componentDidMount(): void;
    getSelectControl(async: boolean, loadOptions?: any, minimumInput?: number): JSX.Element;
    render(): JSX.Element;
    private _asyncLoadOptions;
    private getSearchTerms(input);
    private getAllTerms();
    private renderErrorMessage();
    private handleSelectChange;
}
export default TaxonomyPicker;
