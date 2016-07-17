describe("NullLayout class tests", function() {

    var firstInput;
    var secondInput;
    var thirdInput;
    var nullLayout;

    var NullLayout = Ompluscript.View.Layout.NullLayout;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        firstInput = new TextInput("first");
        secondInput = new TextInput("second");
        thirdInput = new TextInput("third");
    });

    it("get configuration", function() {
        nullLayout = new NullLayout();
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

    it("with children - first", function() {
        nullLayout = new NullLayout();
        nullLayout.addChild(firstInput);
        nullLayout.addChild(secondInput);
        nullLayout.addChild(thirdInput);
        expect(nullLayout.hasClass(NullLayout.CLASS_NULL_LAYOUT)).toBeTruthy();
        expect(nullLayout.hasClass(NullLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(nullLayout.getChildrenCount()).toBe(3);
        expect(nullLayout.render().outerHTML).toBe('<div class="layout null-layout">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>');
        expect(nullLayout.getStackTrace()).toEqual({
            html: '<div class="layout null-layout"></div>',
            name: "NullLayout",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ]
        });
    });

    it("with children - second", function() {
        nullLayout = new NullLayout();
        nullLayout.addChild(firstInput);
        nullLayout.addChild(secondInput);
        nullLayout.addChild(thirdInput);
        nullLayout.removeChild(secondInput);
        expect(nullLayout.hasClass(NullLayout.CLASS_NULL_LAYOUT)).toBeTruthy();
        expect(nullLayout.hasClass(NullLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(nullLayout.getChildrenCount()).toBe(2);
        expect(nullLayout.render().outerHTML).toBe('<div class="layout null-layout">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>');
        expect(nullLayout.getStackTrace()).toEqual({
            html: '<div class="layout null-layout"></div>',
            name: "NullLayout",
            children: [
                firstInput.getStackTrace(),
                thirdInput.getStackTrace()
            ]
        });
    });

    it("with children - second", function() {
        nullLayout = new NullLayout();
        nullLayout.addChild(firstInput);
        nullLayout.addChild(secondInput);
        nullLayout.addChild(thirdInput);
        nullLayout.clearChildren();
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
});