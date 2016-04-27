describe("OnUpdateChoices class tests", function() {

    var event;
    var attribute;
    var newChoices = [];
    var oldChoices = [1];

    var AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
    var OnUpdateChoices = Ompluscript.Model.Event.OnUpdateChoices;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    beforeAll(function() {
        attribute = new SingleChoice("param");
        event = new OnUpdateChoices(attribute, oldChoices, newChoices);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(attribute);
        expect(event.getType()).toEqual(AttributeEvent.ON_UPDATE_CHOICES);
        expect(event.getOldChoices()).toEqual(oldChoices);
        expect(event.getNewChoices()).toEqual(newChoices);
    });
});