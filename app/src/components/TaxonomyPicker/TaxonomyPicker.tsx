import * as React from "react";
import * as Select from "react-select";
import TaxonomyAPI from "../../utils/MockAPI/SP.Taxonomy";
import { ITaxonomyPickerProps } from "./ITaxonomyPickerProps";
import { ITaxonomyPickerState } from "./ITaxonomyPickerState";

/* tslint:disable:no-var-requires */
const styles: any = require("./TaxonomyPicker.module.css");
/* tslint:enable:no-var-requires */

class TaxonomyPicker extends React.Component<ITaxonomyPickerProps, ITaxonomyPickerState> {

    // Default Props values
    public static defaultProps: ITaxonomyPickerProps = {
        name: "Taxononomy_Picker_Name",
        multi: true,
        termSetGuid: null,
        termSetName: null,
        termSetCountMaxSwapToAsync: 300,
        termSetCountCacheExpiresMin: 10080,
        termSetAllTermsCacheExpiresMin: 1440,
        defaultOptions: null,
        defaultValue: null,
        onPickerChange: null,
        placeholder: "Type here to search..."
    };

    constructor(props: any, context: any) {
        super(props, context);

        // Default State values
        this.state = {
            asyncLoad: false,
            disabled: false,
            errors: [],
            options: [],
            termSetCount: 0,
            value: props.defaultValue
        };
    }

    // Initial Async Loading here. Only in Container Components
    public componentDidMount() {
        const { termSetGuid, termSetName, termSetCountMaxSwapToAsync, defaultOptions } = this.props;
        if (termSetGuid !== null) {
            TaxonomyAPI.getTermSetCount(termSetGuid, termSetName)
                .then((termSetCount: number) => {
                    if (termSetCount > termSetCountMaxSwapToAsync) {
                        this.setState({ ...this.state, asyncLoad: true, termSetCount });
                    } else {
                        this.getAllTerms()
                            .then((options: any) => {
                                this.setState({ ...this.state, options, termSetCount });
                            })
                            .catch((reason: any) => {
                                this.setState({ ...this.state, errors: [...this.state.errors, reason] });
                            });
                    }
                })
                .catch((reason: any) => {
                    this.setState({ ...this.state, errors: [...this.state.errors, reason] });
                });
        } else {
            if (defaultOptions !== null) {
                this.setState({ ...this.state, options: defaultOptions, termSetCount: defaultOptions.length });
            }
        }

    }

    public render() {
        const { asyncLoad } = this.state;
        return (
            <div key={this.props.name} className={styles.container} name={this.props.name}>
                {this._getLabel()}
                {this._getSelectControl(asyncLoad, this._asyncLoadOptions, 1)}
                {this.state.errors.length > 0 ? this.renderErrorMessage() : null}
            </div>
        );
    }

    private _getLabel() {
        const { displayName } = this.props;
        // string.isNullOrUndefinedOrEmpty
        if (!(typeof displayName === "string" && displayName.length > 0)) {
            return null;
        } else {
            return (<label className={styles.label} htmlFor={this.props.name}>{this.props.displayName}</label>);
        }
    }

    private _getSelectControl(async: boolean, loadOptions?: any, minimumInput?: number) {
        const { placeholder, name, multi } = this.props;
        const { options, value } = this.state;
        if (async) {
            return (
                <Select.Async
                    {...this.props}
                    isLoading={!options}
                    backspaceRemoves={false}
                    name={name}
                    simpleValue={false}
                    placeholder={placeholder}
                    loadOptions={this._asyncLoadOptions}
                    minimumInput={1}
                    multi={multi}
                    ref={name}
                    onChange={this._handleSelectChange}
                    options={options}
                    value={value}
                />
            );
        } else {
            return (
                <Select
                    {...this.props}
                    isLoading={!options}
                    backspaceRemoves={false}
                    name={name}
                    simpleValue={false}
                    placeholder={placeholder}
                    multi={multi}
                    ref={name}
                    onChange={this._handleSelectChange}
                    options={options}
                    value={value}
                />
            );
        }

    }

    private _asyncLoadOptions = (input) => {
        return this.getSearchTerms(input)
            .then((options: any) => {
                this.setState({ ...this.state, options });
                return { options };
            })
            .catch((reason: any) => {
                this.setState({ ...this.state, errors: [...this.state.errors, reason] });
            });
    }

    private _handleSelectChange = (value: any) => {
        this.setState({ ...this.state, value });
        if (typeof this.props.onPickerChange === "function") {
            this.props.onPickerChange(this.props.name, value);
        }
    }

    private getSearchTerms(input: string) {
        const termFetcher = TaxonomyAPI.getSearchTermsByText(this.props.termSetGuid, this.props.termSetName, input);
        return termFetcher;
    }

    private getAllTerms() {
        const termFetcher = TaxonomyAPI.getAllTermsByTermSet(this.props.termSetGuid, this.props.termSetName, false);
        return termFetcher;
    }

    private renderErrorMessage() {
        return (
            <div>
                {this.state.errors}
            </div>
        );
    }

}

export default TaxonomyPicker;
