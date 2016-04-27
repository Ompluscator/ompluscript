describe("OnInvalidAttribute class tests", function() {

    var event;
    var attribute;
    var value = true;
    var code = 100;

    var AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    beforeAll(function() {
        attribute = new SingleChoice("param");
        event = new OnInvalidAttribute(attribute, value, code);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(attribute);
        expect(event.getType()).toEqual(AttributeEvent.ON_INVALID_ATTRIBUTE);
        expect(event.getValue()).toEqual(value);
        expect(event.getValidationCode()).toEqual(code);
    });
});