import * as React from "react";
import * as Select from "react-select";
import TaxonomyAPI from "../../api/SP.Taxonomy";
import { ITaxonomyPickerProps, ITaxonomyValue } from "./ITaxonomyPickerProps";
import { ITaxonomyPickerState } from "./ITaxonomyPickerState";

/* tslint:disable:no-var-requires */
const styles: any = require("./TaxonomyPicker.module.css");
/* tslint:enable:no-var-requires */

class TaxonomyPicker extends React.Component<ITaxonomyPickerProps, ITaxonomyPickerState> {
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
        placeholder: "Type here to search...",
        showPath: false,
        logErrorsConsole: false,
        logErrorsDiv: false
    };

    constructor(props: any, context: any) {
        super(props, context);
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
        const {
            termSetGuid,
            termSetName,
            termSetCountMaxSwapToAsync,
            defaultOptions,
            logErrorsConsole
         } = this.props;

        termSetGuid !== null
            ? TaxonomyAPI.getTermSetCount(termSetGuid, termSetName)
                .then((termSetCount: number) => {
                    termSetCount > termSetCountMaxSwapToAsync
                        ? this.setState({
                            ...this.state,
                            asyncLoad: true,
                            termSetCount
                        })
                        : this.getAllTerms()
                            .then((options: any) => {
                                this.setState({
                                    ...this.state,
                                    options,
                                    termSetCount
                                });
                            })
                            .catch((reason: any) => {
                                if (logErrorsConsole) {
                                    console.error(reason);
                                }
                                this.setState({
                                    ...this.state,
                                    errors: [...this.state.errors, reason]
                                });
                            });
                })
                .catch((reason: any) => {
                    if (logErrorsConsole) {
                        console.error(reason);
                    }
                    this.setState({
                        ...this.state,
                        errors: [...this.state.errors, reason]
                    });
                })
            : defaultOptions !== null
                ? this.setState({
                    ...this.state,
                    options: defaultOptions,
                    termSetCount: defaultOptions.length
                })
                : this.setState({
                    ...this.state,
                    errors: [...this.state.errors, "Please choose termSetId or provide defaultOptions."]
                });

    }

    public render() {
        const { asyncLoad } = this.state;
        return (
            <div
                key={this.props.name}
                className={styles.container}
                title={this.props.name}
            >
                {this._getLabel()}
                {this._getSelectControl(asyncLoad, 1)}
                {this.state.errors.length > 0 ? this.renderErrorMessage() : null}
            </div>
        );
    }

    private _getLabel() {
        const { displayName, name } = this.props;
        // string.isNullOrUndefinedOrEmpty
        return !(typeof displayName === "string" && displayName.length > 0)
            ? null
            : <label className={styles.label} htmlFor={name}>{displayName}</label>;
    }

    private filterOption = (option, filter) => {
        let returned = false;
        const filterBy = this.props.showPath ? ["value", "label", "path"] : ["value", "label"]
        filterBy.forEach((p) => {
            if (option[p].toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                returned = true;
                return;
            }
        });
        return returned;
    }

    private renderOption = (option) => {
        const fullPath = option
            && option.path
            && typeof option.path === "string"
            && option.path.split(";").join(" > ") || undefined;
        return (
            <div
                title={option.label}
            >
                {this.props.showPath ? fullPath ? <span>{fullPath} > </span> : null : null}
                {option.label}
            </div>
        );
    }

    private _getSelectControl(async: boolean, minimumInput?: number) {
        const { placeholder, name, multi, showPath } = this.props;
        const { options, value } = this.state;
        return async
            ? (
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
                    optionRenderer={this.renderOption}
                    filterOption={this.filterOption}
                />
            )
            : (
                <Select.default
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
                    optionRenderer={this.renderOption}
                    filterOption={this.filterOption}
                />
            );
    }

    private _asyncLoadOptions = (input) => {
        return this.getSearchTerms(input)
            .then((options: any) => {
                this.setState({
                    ...this.state,
                    options
                });
                return { options };
            })
            .catch((reason: any) => {
                if (this.props.logErrorsConsole) {
                    console.error(reason);
                }
                this.setState({
                    ...this.state,
                    errors: [...this.state.errors, reason]
                });
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
        return this.props.logErrorsDiv
            ? (
                <div style={{ color: "red" }}>
                    {this.state.errors}
                </div>
            )
            : null;
    }
}

export default TaxonomyPicker;
