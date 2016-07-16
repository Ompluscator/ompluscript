describe("NullLayout class tests", function() {

    var firstInput;
    var secondInput;
    var nullLayout;

    var NullLayout = Ompluscript.View.Layout.NullLayout;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        firstInput = new TextInput("first");
        secondInput = new TextInput("second");
        nullLayout = new NullLayout();
    });

    beforeEach(function() {
        nullLayout.clearChildren();
    });

    it("get configuration", function() {
        expect(nullLayout.hasClass(NullLayout.CLASS_NULL_LAYOUT)).toBeTruthy();
        expect(nullLayout.hasClass(NullLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(nullLayout.getChildrenCount()).toBe(0);
        expect(nullLayout.render().outerHTML).toBe('<div class="layout null-layout"></div>');
        expect(nullLayout.getStackTrace()).toEqual({
            html: '<div class="layout null-layout"></div>',
            name: "NullLayout",
            children: []
        });
    });

    it("with children", function() {
        nullLayout.addChild(firstInput);
        nullLayout.addChild(secondInput);
        expect(nullLayout.hasClass(NullLayout.CLASS_NULL_LAYOUT)).toBeTruthy();
        expect(nullLayout.hasClass(NullLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(nullLayout.getChildrenCount()).toBe(2);
        expect(nullLayout.render().outerHTML).toBe('<div class="layout null-layout"><input type="text" name="first" class="input"><input type="text" name="second" class="input"></div>');
        expect(nullLayout.getStackTrace()).toEqual({
            html: '<div class="layout null-layout"></div>',
            name: "NullLayout",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace()
            ]
        });
    });
});