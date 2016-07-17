describe("OnUpdateInput class tests", function() {

    var event;
    var textInput;
    var value = 1;

    var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        textInput = new TextInput("input");
        event = new OnUpdateInput(textInput, value);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(textInput);
        expect(event.getValue()).toEqual(value);
        expect(event.getType()).toEqual(OnUpdateInput.ON_UPDATE_INPUT);
    });
});