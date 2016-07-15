describe("RadioInput class tests", function() {

    var singleChoiceObject;
    var radioBoxInput;
    var value = 1;

    var Input = Ompluscript.View.Field.Input;
    var RadioInput = Ompluscript.View.Field.RadioInput;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    beforeAll(function() {
        singleChoiceObject = new SingleChoice("param", void(0), false, [1, 2]);
        radioBoxInput = new RadioInput("param", singleChoiceObject, 1)
    });

    it("get configuration", function() {
        expect(radioBoxInput.hasClass(Input.FIELD_INPUT)).toBeTruthy();
        expect(radioBoxInput.isBound()).toBeTruthy();
        expect(radioBoxInput.getStackTrace()).toEqual({
            html: '<input type="radio" name="param" class="input" value="1">',
            name: "param",
            attribute: singleChoiceObject.getStackTrace(),
        });
    });

    it("simulate keypress - unit test", function() {
        spyOn(radioBoxInput, 'notifyObservers');

        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", false, true);
        radioBoxInput.render().dispatchEvent(event);

        var onUpdateInput = new OnUpdateInput(radioBoxInput, radioBoxInput.getValue());

        expect(radioBoxInput.notifyObservers.calls.argsFor(0)).toEqual([onUpdateInput]);
        expect(radioBoxInput.notifyObservers.calls.count()).toBe(1);
    });

    it("simulate update input - functional test with spy", function() {
        spyOn(singleChoiceObject, 'setValue');

        radioBoxInput.setValue(2);

        expect(radioBoxInput.getStackTrace()).toEqual({
            html: '<input type="radio" name="param" class="input" value="1">',
            name: "param",
            attribute: singleChoiceObject.getStackTrace(),
        });
        expect(singleChoiceObject.setValue.calls.argsFor(0)).toEqual([void(0)]);
        expect(singleChoiceObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update input - functional test without spy", function() {
        radioBoxInput.setValue(value);

        expect(radioBoxInput.getStackTrace()).toEqual({
            html: '<input type="radio" name="param" class="input" value="1">',
            name: "param",
            attribute: singleChoiceObject.getStackTrace(),
        });
        expect(singleChoiceObject.getValue()).toBe(value);
    });

    it("simulate change - functional test", function() {
        spyOn(singleChoiceObject, 'setValue');

        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", false, true);
        radioBoxInput.render().dispatchEvent(event);

        expect(singleChoiceObject.setValue.calls.argsFor(0)).toEqual([radioBoxInput.getValue()]);
        expect(singleChoiceObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update attribute - functional test", function() {
        spyOn(radioBoxInput, 'updateValue');

        singleChoiceObject.setValue(value);

        expect(radioBoxInput.updateValue.calls.argsFor(0)).toEqual([value]);
        expect(radioBoxInput.updateValue.calls.count()).toBe(1);
    });

    it("set attributes", function() {
        radioBoxInput.setValue(2);
        radioBoxInput.setId("id");
        radioBoxInput.addClass("class");
        radioBoxInput.removeClass("input");

        expect(radioBoxInput.getStackTrace()).toEqual({
            html: '<input type="radio" name="param" class="class" value="1" id="id">',
            name: "param",
            attribute: singleChoiceObject.getStackTrace(),
        });
        expect(radioBoxInput.getValue()).toBeUndefined();
        expect(radioBoxInput.getId()).toBe("id");
        expect(radioBoxInput.getAttribute(Input.ATTRIBUTE_CLASS)).toBe("class");
    });
});