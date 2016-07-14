describe("OnUpdateAsset class tests", function() {

    var event;
    var attribute;
    var newValue = "first";
    var oldValue = "second";

    var OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
    var Translation = Ompluscript.Model.Container.Translation;

    beforeAll(function() {
        attribute = new Translation("param");
        event = new OnUpdateAsset(attribute, oldValue, newValue);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(attribute);
        expect(event.getType()).toBe(OnUpdateAsset.ON_UPDATE_ASSET);
        expect(event.getOldValue()).toBe(oldValue);
        expect(event.getNewValue()).toBe(newValue);
    });
});