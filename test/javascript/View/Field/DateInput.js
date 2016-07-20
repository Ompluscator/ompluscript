describe("DateInput class tests - events", function() {

    var datetimeObject;
    var dateInput;

    var Input = Ompluscript.View.Field.Input;
    var DateInput = Ompluscript.View.Field.DateInput;
    var Datetime = Ompluscript.Model.Attribute.Datetime;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    beforeAll(function() {
        datetimeObject = new Datetime("param");
        dateInput = new DateInput("param", datetimeObject)
    });

    it("get configuration", function() {
        expect(dateInput.hasClass(Input.CLASS_INPUT)).toBeTruthy();
        expect(dateInput.isBound()).toBeTruthy();
        expect(dateInput.isTranslated()).toBeFalsy();
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="param" class="input">',
            name: "param",
            attribute: datetimeObject.getStackTrace(),
        });
    });

    it("simulate keyup - unit test", function() {
        spyOn(dateInput, 'notifyObservers');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keyup", true, true, null, false, false, false, false, 65, 0);
        dateInput.render().dispatchEvent(event);

        var onUpdateInput = new OnUpdateInput(dateInput, dateInput.getValue());

        expect(dateInput.notifyObservers.calls.argsFor(0)).toEqual([onUpdateInput]);
        expect(dateInput.notifyObservers.calls.count()).toBe(1);
    });

    it("simulate update input - functional test with spy", function() {
        spyOn(datetimeObject, 'setValue');

        dateInput.setValue("value");

        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="param" class="input">',
            name: "param",
            attribute: datetimeObject.getStackTrace(),
        });
        expect(datetimeObject.setValue.calls.argsFor(0)).toEqual(["value"]);
        expect(datetimeObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update input - functional test without spy", function() {
        dateInput.setValue("value");

        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="param" class="input">',
            name: "param",
            attribute: datetimeObject.getStackTrace(),
        });
        expect(datetimeObject.getValue()).toBe("value");
    });

    it("simulate keyup - functional test", function() {
        spyOn(datetimeObject, 'setValue');

        var event = document.createEvent("KeyboardEvent");
        event.initKeyboardEvent("keyup", true, true, null, false, false, false, false, 65, 0);
        dateInput.render().dispatchEvent(event);

        expect(datetimeObject.setValue.calls.argsFor(0)).toEqual([dateInput.getValue()]);
        expect(datetimeObject.setValue.calls.count()).toBe(1);
    });

    it("simulate update attribute - functional test", function() {
        spyOn(dateInput, 'updateValue');

        datetimeObject.setValue("value");

        expect(dateInput.updateValue.calls.argsFor(0)).toEqual(["value"]);
        expect(dateInput.updateValue.calls.count()).toBe(1);
    });

    it("set attributes", function() {
        dateInput.setId("id");
        dateInput.addClass("class");
        dateInput.removeClass("input");

        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="param" class="class" id="id">',
            name: "param",
            attribute: datetimeObject.getStackTrace(),
        });
        expect(dateInput.getId()).toBe("id");
        expect(dateInput.getAttribute(Input.ATTRIBUTE_CLASS)).toBe("class");
    });
});

describe("DateInput class tests - placeholder", function() {

    var dateInput;

    var Input = Ompluscript.View.Field.Input;
    var DateInput = Ompluscript.View.Field.DateInput;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        dateInput = new DateInput("param", void(0), "date")
    });

    it("get configuration", function() {
        expect(dateInput.hasClass(Input.CLASS_INPUT)).toBeTruthy();
        expect(dateInput.isBound()).toBeFalsy();
        expect(dateInput.isTranslated()).toBeTruthy();
        expect(dateInput.getPlaceholderContent()).toBe("date");
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="param" class="input" placeholder="date">',
            name: "param",
            attribute: void(0),
        });
    });

    it("placeholder - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            date: "value"
        });
        expect(dateInput.getPlaceholderContent()).toBe("value");
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="param" class="input" placeholder="value">',
            name: "param",
            attribute: void(0),
        });
    });

});