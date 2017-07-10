import * as React from "react";
import TaxonomyPicker from "../components/TaxonomyPicker/TaxonomyPicker";

export default class App extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="app-container">
                <TaxonomyPicker
                    name="Language"
                    displayName="Language"
                    termSetGuid="26ebf149-101a-4996-9df2-8179a537350d"
                    defaultOptions={[
                        { label: "English", value: "f50249b6-310d-43b6-aaa6-f0cb46d851bf" },
                        { label: "Spanish", value: "237ca323-1ed8-4199-a49b-a9f7ce4256bf" },
                        { label: "German", value: "44024c7e-f738-4755-90e1-15866327c806" },
                        { label: "Italian", value: "65f67491-bdca-491a-84fa-f6fd913f40fa" },
                    ]}
                    termSetName="Language"
                    multi={true}
                />
            </div>
        );
    }
}
