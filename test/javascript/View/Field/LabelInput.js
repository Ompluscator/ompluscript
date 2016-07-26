describe("LabelInput class tests - events", function() {

    var stringObject;
    var labelInput;

    var Input = Ompluscript.View.Field.Input;
    var LabelInput = Ompluscript.View.Field.LabelInput;
    var String = Ompluscript.Model.Attribute.String;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    beforeAll(function() {
        stringObject = new String("param");
        labelInput = new LabelInput("param", stringObject)
    });

    it("get configuration", function() {
        expect(labelInput.hasClass(Input.CLASS_INPUT)).toBeTruthy();
        expect(labelInput.isBound()).toBeTruthy();
        expect(labelInput.isTranslated()).toBeFalsy();
        expect(labelInput.getStackTrace()).toEqual({
            html: '<label class="input"></label>',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
    });

    it("set attributes", function() {
        labelInput.setId("id");
        labelInput.addClass("class");
        labelInput.removeClass("input");

        expect(labelInput.getStackTrace()).toEqual({
            html: '<label class="class" id="id"></label>',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(labelInput.getId()).toBe("id");
        expect(labelInput.getAttribute(Input.ATTRIBUTE_CLASS)).toBe("class");
    });
});