describe("RelativeLayout class tests", function() {

    var firstInput;
    var secondInput;
    var relativeLayout;

    var RelativeLayout = Ompluscript.View.Layout.RelativeLayout;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        firstInput = new TextInput("first");
        secondInput = new TextInput("second");
        relativeLayout = new RelativeLayout();
    });

    beforeEach(function() {
        relativeLayout.clearChildren();
    });

    it("get configuration", function() {
        expect(relativeLayout.hasClass(RelativeLayout.CLASS_RELATIVE_LAYOUT)).toBeTruthy();
        expect(relativeLayout.hasClass(RelativeLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(relativeLayout.getChildrenCount()).toBe(0);
        expect(relativeLayout.render().outerHTML).toBe('<div class="layout relative-layout"></div>');
        expect(relativeLayout.getStackTrace()).toEqual({
            html: '<div class="layout relative-layout"></div>',
            name: "RelativeLayout",
            children: []
        });
    });

    it("with children", function() {
        relativeLayout.addChild(firstInput);
        relativeLayout.addChild(secondInput);
        expect(relativeLayout.hasClass(RelativeLayout.CLASS_RELATIVE_LAYOUT)).toBeTruthy();
        expect(relativeLayout.hasClass(RelativeLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(relativeLayout.getChildrenCount()).toBe(2);
        expect(relativeLayout.render().outerHTML).toBe('<div class="layout relative-layout"><input type="text" name="first" class="input"><input type="text" name="second" class="input"></div>');
        expect(relativeLayout.getStackTrace()).toEqual({
            html: '<div class="layout relative-layout"></div>',
            name: "RelativeLayout",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace()
            ]
        });
    });
});