describe("RelativeLayoutConfiguration class tests - valid RelativeLayout", function() {

    var relativeLayoutConfiguration;

    var RelativeLayoutConfiguration = Ompluscript.View.Configuration.Layout.RelativeLayoutConfiguration;
    var RelativeLayout = Ompluscript.View.Layout.RelativeLayout;

    beforeAll(function() {
        relativeLayoutConfiguration = new RelativeLayoutConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "RelativeLayout"
        };
        expect(relativeLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(relativeLayoutConfiguration.getErrors(definition)).toEqual([]);
        var relativeLayout = relativeLayoutConfiguration.create(definition);
        expect(relativeLayout instanceof RelativeLayout).toBeTruthy();
        expect(relativeLayout.getName()).toBe("RelativeLayout");
        expect(relativeLayout.getStackTrace()).toEqual({
            html: '<div class="layout relative-layout"></div>',
            name: "RelativeLayout",
            children: []
        });
    });
});