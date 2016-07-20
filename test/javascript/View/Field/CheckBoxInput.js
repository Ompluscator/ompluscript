describe("CheckBoxInput class tests", function() {

    var booleanObject;
    var checkBoxInput;

    var Input = Ompluscript.View.Field.Input;
    var CheckBoxInput = Ompluscript.View.Field.CheckBoxInput;
    var Boolean = Ompluscript.Model.Attribute.Boolean;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    beforeAll(function() {
        booleanObject = new Boolean("param");
        checkBoxInput = new CheckBoxInput("param", booleanObject)
    });

    it("get configuration", function() {
        expect(checkBoxInput.hasClass(Input.CLASS_INPUT)).toBeTruthy();
        expect(checkBoxInput.isBound()).toBeTruthy();
        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="param" class="input">',
            name: "param",
            attribute: booleanObject.getStackTrace(),
        });
    });

    it("simulate keyup - unit test", function() {
        spyOn(checkBoxInput, 'notifyObservers');

        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", false, true);
        checkBoxInput.render().dispatchEvent(event);

        var onUpdateInput = new OnUpdateInput(checkBoxInput, checkBoxInput.getValue());

        expect(checkBoxInput.notifyObservers.calls.argsFor(0)).toEqual([onUpdateInput]);
        expect(checkBoxInput.notifyObservers.calls.count()).toBe(1);
    });

    it("simulate update input - functional test with spy", function() {
        spyOn(booleanObject, 'setValue');

        checkBoxInput.setValue(false);

        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="param" class="input">',
            name: "param",
            attribute: booleanObject.getStackTrace(),
        });
        expect(booleanObject.setValue.calls.argsFor(0)).toEqual([false]);
        expect(booleanObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update input - functional test without spy", function() {
        checkBoxInput.setValue(true);

        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="param" class="input">',
            name: "param",
            attribute: booleanObject.getStackTrace(),
        });
        expect(booleanObject.getValue()).toBe(true);
    });

    it("simulate change - functional test", function() {
        spyOn(booleanObject, 'setValue');

        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", false, true);
        checkBoxInput.render().dispatchEvent(event);

        expect(booleanObject.setValue.calls.argsFor(0)).toEqual([checkBoxInput.getValue()]);
        expect(booleanObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update attribute - functional test", function() {
        spyOn(checkBoxInput, 'updateValue');

        booleanObject.setValue(true);

        expect(checkBoxInput.updateValue.calls.argsFor(0)).toEqual([true]);
        expect(checkBoxInput.updateValue.calls.count()).toBe(1);
    });

    it("set attributes", function() {
        checkBoxInput.setValue(true);
        checkBoxInput.setId("id");
        checkBoxInput.addClass("class");
        checkBoxInput.removeClass("input");

        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="param" class="class" id="id">',
            name: "param",
            attribute: booleanObject.getStackTrace(),
        });
        expect(checkBoxInput.getValue(Input.ATTRIBUTE_VALUE)).toBe(true);
        expect(checkBoxInput.getId()).toBe("id");
        expect(checkBoxInput.getAttribute(Input.ATTRIBUTE_CLASS)).toBe("class");
    });
});