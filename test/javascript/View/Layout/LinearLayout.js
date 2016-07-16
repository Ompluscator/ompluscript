describe("LinearLayout class tests", function() {

    var firstInput;
    var secondInput;
    var linearLayout;

    var LinearLayout = Ompluscript.View.Layout.LinearLayout;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        firstInput = new TextInput("first");
        secondInput = new TextInput("second");
    });

    it("get configuration", function() {
        linearLayout = new LinearLayout();
        expect(linearLayout.hasClass(LinearLayout.CLASS_LINEAR_LAYOUT)).toBeTruthy();
        expect(linearLayout.hasClass(LinearLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(linearLayout.getChildrenCount()).toBe(0);
        expect(linearLayout.render().outerHTML).toBe('<div class="layout linear-layout flex-horizontal flex-start"></div>');
        expect(linearLayout.getStackTrace()).toEqual({
            html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
            name: "LinearLayout",
            children: [],
            align: LinearLayout.ALIGN_START,
            direction: LinearLayout.DIRECTION_HORIZONTAL,
            reverse: false
        });
    });

    it("with children", function() {
        linearLayout = new LinearLayout(LinearLayout.DIRECTION_VERTICAL, true, LinearLayout.ALIGN_END);
        linearLayout.addChild(firstInput);
        linearLayout.addChild(secondInput);
        expect(linearLayout.hasClass(LinearLayout.CLASS_LINEAR_LAYOUT)).toBeTruthy();
        expect(linearLayout.hasClass(LinearLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(linearLayout.getChildrenCount()).toBe(2);
        expect(linearLayout.render().outerHTML).toBe('<div class="layout linear-layout flex-vertical flex-end flex-reverse"><input type="text" name="first" class="input"><input type="text" name="second" class="input"></div>');
        expect(linearLayout.getStackTrace()).toEqual({
            html: '<div class="layout linear-layout flex-vertical flex-end flex-reverse"></div>',
            name: "LinearLayout",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace()
            ],
            align: LinearLayout.ALIGN_END,
            direction: LinearLayout.DIRECTION_VERTICAL,
            reverse: true
        });
    });
});