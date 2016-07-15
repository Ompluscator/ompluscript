describe("PasswordInput class tests - events", function() {

    var stringObject;
    var passwordInput;

    var Input = Ompluscript.View.Field.Input;
    var PasswordInput = Ompluscript.View.Field.PasswordInput;
    var String = Ompluscript.Model.Attribute.String;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    beforeAll(function() {
        stringObject = new String("param");
        passwordInput = new PasswordInput("param", stringObject)
    });

    it("get configuration", function() {
        expect(passwordInput.hasClass(Input.FIELD_INPUT)).toBeTruthy();
        expect(passwordInput.isBound()).toBeTruthy();
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="param" class="input">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
    });

    it("simulate keypress - unit test", function() {
        spyOn(passwordInput, 'notifyObservers');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keypress", true, true, null, false, false, false, false, 65, 0);
        passwordInput.render().dispatchEvent(event);

        var onUpdateInput = new OnUpdateInput(passwordInput, passwordInput.getValue());

        expect(passwordInput.notifyObservers.calls.argsFor(0)).toEqual([onUpdateInput]);
        expect(passwordInput.notifyObservers.calls.count()).toBe(1);
    });

    it("simulate update input - functional test with spy", function() {
        spyOn(stringObject, 'setValue');

        passwordInput.setValue("value");

        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="param" class="input" value="value">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(stringObject.setValue.calls.argsFor(0)).toEqual(["value"]);
        expect(stringObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update input - functional test without spy", function() {
        passwordInput.setValue("value");

        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="param" class="input" value="value">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(stringObject.getValue()).toBe("value");
    });

    it("simulate keypress - functional test", function() {
        spyOn(stringObject, 'setValue');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keypress", true, true, null, false, false, false, false, 65, 0);
        passwordInput.render().dispatchEvent(event);

        expect(stringObject.setValue.calls.argsFor(0)).toEqual([passwordInput.getValue()]);
        expect(stringObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update attribute - functional test", function() {
        spyOn(passwordInput, 'updateValue');

        stringObject.setValue("value");

        expect(passwordInput.updateValue.calls.argsFor(0)).toEqual(["value"]);
        expect(passwordInput.updateValue.calls.count()).toBe(1);
    });

    it("set attributes", function() {
        passwordInput.setAttribute(Input.ATTRIBUTE_VALUE, "value");
        passwordInput.setId("id");
        passwordInput.addClass("class");
        passwordInput.removeClass("input");

        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="param" class="class" value="value" id="id">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
        expect(passwordInput.getAttribute(Input.ATTRIBUTE_VALUE)).toBe("value");
        expect(passwordInput.getId()).toBe("id");
        expect(passwordInput.getAttribute(Input.ATTRIBUTE_CLASS)).toBe("class");
    });
});

describe("PasswordInput class tests - placeholder", function() {

    var passwordInput;

    var Input = Ompluscript.View.Field.Input;
    var PasswordInput = Ompluscript.View.Field.PasswordInput;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        passwordInput = new PasswordInput("param", void(0), "password")
    });

    it("get configuration", function() {
        expect(passwordInput.hasClass(Input.FIELD_INPUT)).toBeTruthy();
        expect(passwordInput.isBound()).toBeFalsy();
        expect(passwordInput.isTranslated()).toBeTruthy();
        expect(passwordInput.getPlaceholderContent()).toBe("password");
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="param" class="input" placeholder="password">',
            name: "param",
            attribute: void(0),
        });
    });

    it("placeholder - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            password: "value"
        });
        expect(passwordInput.getPlaceholderContent()).toBe("value");
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="param" class="input" placeholder="value">',
            name: "param",
            attribute: void(0),
        });
    });

});