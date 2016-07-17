describe("RelativeLayout class tests", function() {

    var firstInput;
    var secondInput;
    var thirdInput;
    var relativeLayout;

    var RelativeLayout = Ompluscript.View.Layout.RelativeLayout;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        firstInput = new TextInput("first");
        secondInput = new TextInput("second");
        thirdInput = new TextInput("third");
    });

    it("get configuration", function() {
        relativeLayout = new RelativeLayout();
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

    it("with children - first", function() {
        relativeLayout = new RelativeLayout();
        relativeLayout.addChild(firstInput);
        relativeLayout.addChild(secondInput);
        relativeLayout.addChild(thirdInput);
        expect(relativeLayout.hasClass(RelativeLayout.CLASS_RELATIVE_LAYOUT)).toBeTruthy();
        expect(relativeLayout.hasClass(RelativeLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(relativeLayout.getChildrenCount()).toBe(3);
        expect(relativeLayout.render().outerHTML).toBe('<div class="layout relative-layout">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>');
        expect(relativeLayout.getStackTrace()).toEqual({
            html: '<div class="layout relative-layout"></div>',
            name: "RelativeLayout",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ]
        });
    });

    it("with children - second", function() {
        relativeLayout = new RelativeLayout();
        relativeLayout.addChild(firstInput);
        relativeLayout.addChild(secondInput);
        relativeLayout.addChild(thirdInput);
        relativeLayout.removeChild(secondInput);
        expect(relativeLayout.hasClass(RelativeLayout.CLASS_RELATIVE_LAYOUT)).toBeTruthy();
        expect(relativeLayout.hasClass(RelativeLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(relativeLayout.getChildrenCount()).toBe(2);
        expect(relativeLayout.render().outerHTML).toBe('<div class="layout relative-layout">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>');
        expect(relativeLayout.getStackTrace()).toEqual({
            html: '<div class="layout relative-layout"></div>',
            name: "RelativeLayout",
            children: [
                firstInput.getStackTrace(),
                thirdInput.getStackTrace()
            ]
        });
    });

    it("with children - second", function() {
        relativeLayout = new RelativeLayout();
        relativeLayout.addChild(firstInput);
        relativeLayout.addChild(secondInput);
        relativeLayout.addChild(thirdInput);
        relativeLayout.clearChildren();
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
});