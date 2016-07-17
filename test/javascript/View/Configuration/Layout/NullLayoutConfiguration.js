describe("NullLayoutConfiguration class tests - valid NullLayout", function() {

    var nullLayoutConfiguration;

    var NullLayoutConfiguration = Ompluscript.View.Configuration.Layout.NullLayoutConfiguration;
    var NullLayout = Ompluscript.View.Layout.NullLayout;

    beforeAll(function() {
        nullLayoutConfiguration = new NullLayoutConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "NullLayout"
        };
        expect(nullLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(nullLayoutConfiguration.getErrors(definition)).toEqual([]);
        var nullLayout = nullLayoutConfiguration.create(definition);
        expect(nullLayout instanceof NullLayout).toBeTruthy();
        expect(nullLayout.getName()).toBe("NullLayout");
        expect(nullLayout.getStackTrace()).toEqual({
            html: '<div class="layout null-layout"></div>',
            name: "NullLayout",
            children: []
        });
    });
});