describe("OnUpdateAttribute class tests", function() {

    var event;
    var attribute;
    var newValue = 1;
    var oldValue = 2;

    var AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    beforeAll(function() {
        attribute = new SingleChoice("param");
        event = new OnUpdateAttribute(attribute, oldValue, newValue);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(attribute);
        expect(event.getType()).toEqual(AttributeEvent.ON_UPDATE_ATTRIBUTE);
        expect(event.getOldValue()).toEqual(oldValue);
        expect(event.getNewValue()).toEqual(newValue);
    });
});