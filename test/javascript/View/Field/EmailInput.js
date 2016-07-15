describe("EmailInput class tests - events", function() {

    var stringObject;
    var emailInput;

    var Input = Ompluscript.View.Field.Input;
    var EmailInput = Ompluscript.View.Field.EmailInput;
    var String = Ompluscript.Model.Attribute.String;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    beforeAll(function() {
        stringObject = new String("param");
        emailInput = new EmailInput("param", stringObject)
    });

    it("get configuration", function() {
        expect(emailInput.hasClass(Input.FIELD_INPUT)).toBeTruthy();
        expect(emailInput.isBound()).toBeTruthy();
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="param" class="input">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
    });

    it("simulate keypress - unit test", function() {
        spyOn(emailInput, 'notifyObservers');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keypress", true, true, null, false, false, false, false, 65, 0);
        emailInput.render().dispatchEvent(event);

        var onUpdateInput = new OnUpdateInput(emailInput, emailInput.getValue());

        expect(emailInput.notifyObservers.calls.argsFor(0)).toEqual([onUpdateInput]);
        expect(emailInput.notifyObservers.calls.count()).toBe(1);
    });

    it("simulate update input - functional test with spy", function() {
        spyOn(stringObject, 'setValue');

        emailInput.setValue("value");

        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="param" class="input" value="value">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(stringObject.setValue.calls.argsFor(0)).toEqual(["value"]);
        expect(stringObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update input - functional test without spy", function() {
        emailInput.setValue("value");

        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="param" class="input" value="value">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(stringObject.getValue()).toBe("value");
    });

    it("simulate keypress - functional test", function() {
        spyOn(stringObject, 'setValue');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keypress", true, true, null, false, false, false, false, 65, 0);
        emailInput.render().dispatchEvent(event);

        expect(stringObject.setValue.calls.argsFor(0)).toEqual([emailInput.getValue()]);
        expect(stringObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update attribute - functional test", function() {
        spyOn(emailInput, 'updateValue');

        stringObject.setValue("value");

        expect(emailInput.updateValue.calls.argsFor(0)).toEqual(["value"]);
        expect(emailInput.updateValue.calls.count()).toBe(1);
    });

    it("set attributes", function() {
        emailInput.setAttribute(Input.ATTRIBUTE_VALUE, "value");
        emailInput.setId("id");
        emailInput.addClass("class");
        emailInput.removeClass("input");

        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="param" class="class" value="value" id="id">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(emailInput.getAttribute(Input.ATTRIBUTE_VALUE)).toBe("value");
        expect(emailInput.getId()).toBe("id");
        expect(emailInput.getAttribute(Input.ATTRIBUTE_CLASS)).toBe("class");
    });
});

describe("EmailInput class tests - placeholder", function() {

    var emailInput;

    var Input = Ompluscript.View.Field.Input;
    var EmailInput = Ompluscript.View.Field.EmailInput;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        emailInput = new EmailInput("param", void(0), "email")
    });

    it("get configuration", function() {
        expect(emailInput.hasClass(Input.FIELD_INPUT)).toBeTruthy();
        expect(emailInput.isBound()).toBeFalsy();
        expect(emailInput.isTranslated()).toBeTruthy();
        expect(emailInput.getPlaceholderContent()).toBe("email");
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="param" class="input" placeholder="email">',
            name: "param",
            attribute: void(0),
        });
    });

    it("placeholder - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            email: "value"
        });
        expect(emailInput.getPlaceholderContent()).toBe("value");
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="param" class="input" placeholder="value">',
            name: "param",
            attribute: void(0),
        });
    });

});