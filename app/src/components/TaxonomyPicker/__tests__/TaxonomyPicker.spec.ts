import testComponentHelper from "../../../../../test/unit/helpers/ComponentHelper";
import TaxonomyPicker from "../TaxonomyPicker";

describe("<TaxonomyPicker />", () => {
    const renderComponent = testComponentHelper(TaxonomyPicker);

    describe("@renders", () => {
        it("in default state", () => {
            expect(renderComponent().getHtml())
                .toMatchSnapshot();
        });
    });
});
