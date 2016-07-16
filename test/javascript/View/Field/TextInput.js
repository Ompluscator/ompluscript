describe("TextInput class tests - events", function() {

    var stringObject;
    var textInput;

    var Input = Ompluscript.View.Field.Input;
    var TextInput = Ompluscript.View.Field.TextInput;
    var String = Ompluscript.Model.Attribute.String;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    beforeAll(function() {
        stringObject = new String("param");
        textInput = new TextInput("param", stringObject)
    });

    it("get configuration", function() {
        expect(textInput.hasClass(Input.CLASS_INPUT)).toBeTruthy();
        expect(textInput.isBound()).toBeTruthy();
        expect(textInput.isTranslated()).toBeFalsy();
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="param" class="input">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
    });

    it("simulate keypress - unit test", function() {
        spyOn(textInput, 'notifyObservers');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keypress", true, true, null, false, false, false, false, 65, 0);
        textInput.render().dispatchEvent(event);

        var onUpdateInput = new OnUpdateInput(textInput, textInput.getValue());

        expect(textInput.notifyObservers.calls.argsFor(0)).toEqual([onUpdateInput]);
        expect(textInput.notifyObservers.calls.count()).toBe(1);
    });

    it("simulate update input - functional test with spy", function() {
        spyOn(stringObject, 'setValue');

        textInput.setValue("value");

        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="param" class="input" value="value">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(stringObject.setValue.calls.argsFor(0)).toEqual(["value"]);
        expect(stringObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update input - functional test without spy", function() {
        textInput.setValue("value");

        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="param" class="input" value="value">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(stringObject.getValue()).toBe("value");
    });

    it("simulate keypress - functional test", function() {
        spyOn(stringObject, 'setValue');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keypress", true, true, null, false, false, false, false, 65, 0);
        textInput.render().dispatchEvent(event);

        expect(stringObject.setValue.calls.argsFor(0)).toEqual([textInput.getValue()]);
        expect(stringObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update attribute - functional test", function() {
        spyOn(textInput, 'updateValue');

        stringObject.setValue("value");

        expect(textInput.updateValue.calls.argsFor(0)).toEqual(["value"]);
        expect(textInput.updateValue.calls.count()).toBe(1);
    });

    it("set attributes", function() {
        textInput.setAttribute(Input.ATTRIBUTE_VALUE, "value");
        textInput.setId("id");
        textInput.addClass("class");
        textInput.removeClass("input");

        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="param" class="class" value="value" id="id">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(textInput.getAttribute(Input.ATTRIBUTE_VALUE)).toBe("value");
        expect(textInput.getId()).toBe("id");
        expect(textInput.getAttribute(Input.ATTRIBUTE_CLASS)).toBe("class");
    });
});

describe("TextInput class tests - placeholder", function() {

    var textInput;

    var Input = Ompluscript.View.Field.Input;
    var TextInput = Ompluscript.View.Field.TextInput;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        textInput = new TextInput("param", void(0), "text")
    });

    it("get configuration", function() {
        expect(textInput.hasClass(Input.CLASS_INPUT)).toBeTruthy();
        expect(textInput.isBound()).toBeFalsy();
        expect(textInput.isTranslated()).toBeTruthy();
        expect(textInput.getPlaceholderContent()).toBe("text");
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="param" class="input" placeholder="text">',
            name: "param",
            attribute: void(0),
        });
    });

    it("placeholder - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            text: "value"
        });
        expect(textInput.getPlaceholderContent()).toBe("value");
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="param" class="input" placeholder="value">',
            name: "param",
            attribute: void(0),
        });
    });

});