describe("OnFormSubmit class tests", function() {

    var event;
    var form;

    var OnFormSubmit = Ompluscript.View.Event.OnFormSubmit;
    var Form = Ompluscript.View.Container.Form;
    var Model = Ompluscript.Model.Container.Model;

    beforeAll(function() {
        form = new Form("name", void(0), void(0), void(0), new Model("model"));
        event = new OnFormSubmit(form, {a: "a"});
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(form);
        expect(event.getType()).toEqual(OnFormSubmit.ON_FORM_SUBMIT);
        expect(event.getResponse()).toEqual({a: "a"});
    });
});