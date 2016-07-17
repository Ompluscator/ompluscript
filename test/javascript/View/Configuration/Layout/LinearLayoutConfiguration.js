describe("LinearLayoutConfiguration class tests - valid LinearLayout", function() {

    var linearLayoutConfiguration;

    var LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
    var LinearLayout = Ompluscript.View.Layout.LinearLayout;

    beforeAll(function() {
        linearLayoutConfiguration = new LinearLayoutConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "LinearLayout"
        };
        expect(linearLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(linearLayoutConfiguration.getErrors(definition)).toEqual([]);
        var linearLayout = linearLayoutConfiguration.create(definition);
        expect(linearLayout instanceof LinearLayout).toBeTruthy();
        expect(linearLayout.getName()).toBe("LinearLayout");
        expect(linearLayout.getStackTrace()).toEqual({
            html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
            name: "LinearLayout",
            children: [],
            align: LinearLayout.ALIGN_START,
            direction: LinearLayout.DIRECTION_HORIZONTAL,
            reverse: false
        });
    });

    it("invalid - first", function() {
        var definition = {
            type: "LinearLayout",
            align: LinearLayout.ALIGN_END,
            direction: LinearLayout.DIRECTION_VERTICAL,
            reverse: true
        };
        expect(linearLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(linearLayoutConfiguration.getErrors(definition)).toEqual([]);
        var linearLayout = linearLayoutConfiguration.create(definition);
        expect(linearLayout instanceof LinearLayout).toBeTruthy();
        expect(linearLayout.getName()).toBe("LinearLayout");
        expect(linearLayout.getStackTrace()).toEqual({
            html: '<div class="layout linear-layout flex-vertical flex-end flex-reverse"></div>',
            name: "LinearLayout",
            children: [],
            align: LinearLayout.ALIGN_END,
            direction: LinearLayout.DIRECTION_VERTICAL,
            reverse: true
        });
    });
});

describe("LinearLayoutConfiguration class tests - invalid LinearLayout", function() {

    var linearLayoutConfiguration;

    var LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
    var LinearLayout = Ompluscript.View.Layout.LinearLayout;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        linearLayoutConfiguration = new LinearLayoutConfiguration();
    });

    it("invalid configuration - first", function() {
        var definition = {
            type: "LinearLayout",
            align: 1,
            direction: {},
            reverse: "not"
        };
        expect(linearLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(linearLayoutConfiguration.getErrors(definition)).toEqual([
            "LinearLayout." + LinearLayout.PARAMETER_DIRECTION + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "LinearLayout." + LinearLayout.PARAMETER_ALIGN + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "LinearLayout." + LinearLayout.PARAMETER_REVERSE + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid configuration - second", function() {
        var definition = {
            type: "LinearLayout",
            align: "not",
            direction: "not"
        };
        expect(linearLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(linearLayoutConfiguration.getErrors(definition)).toEqual([
            "LinearLayout." + LinearLayout.PARAMETER_DIRECTION + Configuration.HAS_WRONG_VALUE,
            "LinearLayout." + LinearLayout.PARAMETER_ALIGN + Configuration.HAS_WRONG_VALUE,
        ]);
    });
});