import * as React from "react";
import { Async, Select } from "react-select/lib/Select";
import TaxonomyAPI from "../../utils/MockAPI/SP.Taxonomy";

/* tslint:disable:no-var-requires */
const styles: any = require("./TaxonomyPicker.module.css");
/* tslint:enable:no-var-requires */

import { ITaxonomyPickerProps } from "./ITaxonomyPickerProps";
import { ITaxonomyPickerState } from "./ITaxonomyPickerState";

class TaxonomyPicker extends React.Component<ITaxonomyPickerProps, ITaxonomyPickerState> {

    // Default Props values
    public static defaultProps: ITaxonomyPickerProps = {
        multi: false,
        name: "",
        termSetCountMax: 350,
        termSetGuid: "",
        termSetName: "",
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
            value: null
        };
    }

    // Initial Async Loading here. Only in Container Components
    public componentDidMount() {
        const { termSetGuid, termSetName, termSetCountMax } = this.props;
        TaxonomyAPI.getTermSetCount(termSetGuid, termSetName)
            .then((termSetCount: number) => {
                if (termSetCount > termSetCountMax) {
                    this.setState({ asyncLoad: true, termSetCount });
                } else {
                    this.getAllTerms()
                        .then((options: any) => {
                            this.setState({ options, termSetCount });
                        })
                        .catch((reason: any) => {
                            this.setState({ errors: [...this.state.errors, reason] });
                        });
                }
            })
            .catch((reason: any) => {
                this.setState({ errors: [...this.state.errors, reason] });
            });
    }

    public getSelectControl(async: boolean, loadOptions?: any, minimumInput?: number) {
        if (async) {
            return (<Select.Async
                isLoading={!this.state.options}
                backspaceRemoves={false}
                name={this.props.name}
                simpleValue={false}
                placeholder="Type here to search..."
                loadOptions={this._asyncLoadOptions}
                minimumInput={1}
                multi={this.props.multi}
                ref={this.props.name}
                onChange={this.handleSelectChange}
                options={this.state.options}
                value={this.state.value}
            />);
        } else {
            return (<Select
                isLoading={!this.state.options}
                backspaceRemoves={false}
                name={this.props.name}
                simpleValue={false}
                placeholder="Type here to search..."
                multi={this.props.multi}
                ref={this.props.name}
                onChange={this.handleSelectChange}
                options={this.state.options}
                value={this.state.value}
            />);
        }

    }

    public render() {
        const { asyncLoad } = this.state;
        return (
            <div key={this.props.name} className={styles.container} name={this.props.name}>
                <label className={styles.label} htmlFor={this.props.name}>{this.props.displayName}</label>
                {this.getSelectControl(asyncLoad, this._asyncLoadOptions, 1)}
                {this.state.errors.length > 0 ? this.renderErrorMessage() : null}
            </div>
        );
    }

    private _asyncLoadOptions = (input) => {
        return this.getSearchTerms(input)
            .then((options: any) => {
                this.setState({ options });
                return { options };
            })
            .catch((reason: any) => {
                this.setState({ errors: [...this.state.errors, reason] });
            });
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

    private handleSelectChange = (value: any) => {
        this.setState({ value });
    }
}

export default TaxonomyPicker;
