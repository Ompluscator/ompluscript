describe("NumberInput class tests - events", function() {

    var numberObject;
    var numberInput;

    var Input = Ompluscript.View.Field.Input;
    var NumberInput = Ompluscript.View.Field.NumberInput;
    var Number = Ompluscript.Model.Attribute.Number;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    beforeAll(function() {
        numberObject = new Number("param");
        numberInput = new NumberInput("param", numberObject)
    });

    it("get configuration", function() {
        expect(numberInput.hasClass(Input.CLASS_INPUT)).toBeTruthy();
        expect(numberInput.isBound()).toBeTruthy();
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="param" class="input">',
            name: "param",
            attribute: numberObject.getStackTrace(),
        });
    });

    it("simulate keyup - unit test", function() {
        spyOn(numberInput, 'notifyObservers');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keyup", true, true, null, false, false, false, false, 65, 0);
        numberInput.render().dispatchEvent(event);

        var onUpdateInput = new OnUpdateInput(numberInput, numberInput.getValue());

        expect(numberInput.notifyObservers.calls.argsFor(0)).toEqual([onUpdateInput]);
        expect(numberInput.notifyObservers.calls.count()).toBe(1);
    });

    it("simulate update input - functional test with spy", function() {
        spyOn(numberObject, 'setValue');

        numberInput.setValue("1");

        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="param" class="input">',
            name: "param",
            attribute: numberObject.getStackTrace(),
        });
        expect(numberObject.setValue.calls.argsFor(0)).toEqual([1]);
        expect(numberObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update input - functional test without spy", function() {
        numberInput.setValue("1");

        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="param" class="input">',
            name: "param",
            attribute: numberObject.getStackTrace(),
        });
        expect(numberObject.getValue()).toBe(1);
    });

    it("simulate keyup - functional test", function() {
        spyOn(numberObject, 'setValue');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keyup", true, true, null, false, false, false, false, 65, 0);
        numberInput.render().dispatchEvent(event);

        expect(numberObject.setValue.calls.argsFor(0)).toEqual([numberInput.getValue()]);
        expect(numberObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update attribute - functional test", function() {
        spyOn(numberInput, 'updateValue');

        numberObject.setValue(1);

        expect(numberInput.updateValue.calls.argsFor(0)).toEqual([1]);
        expect(numberInput.updateValue.calls.count()).toBe(1);
    });

    it("set attributes", function() {
        numberInput.setId("id");
        numberInput.addClass("class");
        numberInput.removeClass("input");

        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="param" class="class" id="id">',
            name: "param",
            attribute: numberObject.getStackTrace(),
        });
        expect(numberInput.getId()).toBe("id");
        expect(numberInput.getAttribute(Input.ATTRIBUTE_CLASS)).toBe("class");
    });
});

describe("NumberInput class tests - placeholder", function() {

    var numberInput;

    var Input = Ompluscript.View.Field.Input;
    var NumberInput = Ompluscript.View.Field.NumberInput;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        numberInput = new NumberInput("param", void(0), "number")
    });

    it("get configuration", function() {
        expect(numberInput.hasClass(Input.CLASS_INPUT)).toBeTruthy();
        expect(numberInput.isBound()).toBeFalsy();
        expect(numberInput.isTranslated()).toBeTruthy();
        expect(numberInput.getPlaceholderContent()).toBe("number");
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="param" class="input" placeholder="number">',
            name: "param",
            attribute: void(0),
        });
    });

    it("placeholder - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            number: "value"
        });
        expect(numberInput.getPlaceholderContent()).toBe("value");
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="param" class="input" placeholder="value">',
            name: "param",
            attribute: void(0),
        });
    });

});