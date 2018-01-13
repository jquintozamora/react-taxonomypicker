/// <reference types="react" />
import * as React from "react";
import { ITaxonomyPickerProps } from "./ITaxonomyPickerProps";
import { ITaxonomyPickerState } from "./ITaxonomyPickerState";
declare class TaxonomyPicker extends React.Component<ITaxonomyPickerProps, ITaxonomyPickerState> {
    static defaultProps: ITaxonomyPickerProps;
    constructor(props: any, context: any);
    componentDidMount(): void;
    render(): JSX.Element;
    private _getLabel();
    private _getSelectControl(async, minimumInput?);
    private _asyncLoadOptions;
    private _handleSelectChange;
    private getSearchTerms(input);
    private getAllTerms();
    private renderErrorMessage();
}
export default TaxonomyPicker;
