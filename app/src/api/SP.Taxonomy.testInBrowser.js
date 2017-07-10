// Get Default Term Store
(function () {
    var ctx = SP.ClientContext.get_current();
    var session = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
    var termStore = session.getDefaultSiteCollectionTermStore();
    ctx.load(session);
    ctx.load(termStore);
    ctx.executeQueryAsync(
        function () {
            console.log('TermStore is here!');
            console.log(termStore);
        },
        function (sender, args) {
            console.log('Error: ' + args.get_message());
        }
    );
})();

// Get Specific TermSet items count
(function () {
    var termSetGuid = "7c16e180-d093-4709-8426-e7997acb4302"; //Locations TermSet GUID
    var ctx = SP.ClientContext.get_current();
    var session = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
    var termStore = session.getDefaultSiteCollectionTermStore();
    var termSet = termStore.getTermSet(new SP.Guid(termSetGuid));
    var terms = termSet.getAllTerms();
    ctx.load(terms, 'Include()');
    ctx.executeQueryAsync(
        function () {
            console.log('TermSet count: ');
            var termCount = terms.get_count();
            console.log(termCount);
        },
        function (sender, args) {
            console.log('Error: ' + args.get_message());
        }
    );
})();

// Search taxonomy Terms using LabelMatchInformation
(function () {
    var termSetGuid = "7c16e180-d093-4709-8426-e7997acb4302"; //Locations TermSet GUID
    var ctx = SP.ClientContext.get_current();
    var session = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
    var termStore = session.getDefaultSiteCollectionTermStore();
    var termSet = termStore.getTermSet(new SP.Guid(termSetGuid));
    var lmi = new SP.Taxonomy.LabelMatchInformation(ctx);
    //Populate the various properties
    lmi.set_termLabel("s"); //search terms.
    lmi.set_defaultLabelOnly(true);
    lmi.set_stringMatchOption(SP.Taxonomy.StringMatchOption.startsWith);
    lmi.set_resultCollectionSize(10); //terms to bring back
    lmi.set_trimUnavailable(true);
    var terms = termSet.getTerms(lmi);
    ctx.load(terms, "Include(IsRoot, TermsCount, Id, Name, PathOfTerm, IsAvailableForTagging)");
    ctx.executeQueryAsync(
        function () {
            console.log('Terms: ');
            var termEnumerator = terms.getEnumerator();
            while (termEnumerator.moveNext()) {
                var currentTerm = termEnumerator.get_current();
                var termObj = {
                    label: currentTerm.get_name(),
                    value: currentTerm.get_name(),
                    path: currentTerm.get_pathOfTerm(),
                    name: currentTerm.get_name(),
                    guid: currentTerm.get_id().toString(),
                };
                console.log(termObj);
            }
            var termCount = terms.get_count();
            console.log(termCount);
        },
        function (sender, args) {
            console.log('Error: ' + args.get_message());
        }
    );
})();

