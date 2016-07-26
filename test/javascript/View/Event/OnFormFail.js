describe("OnFormFail class tests", function() {

    var event;
    var form;

    var OnFormFail = Ompluscript.View.Event.OnFormFail;
    var Form = Ompluscript.View.Container.Form;
    var Model = Ompluscript.Model.Container.Model;

    beforeAll(function() {
        form = new Form("name", void(0), void(0), void(0), new Model("model"));
        event = new OnFormFail(form, {a: "a"});
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(form);
        expect(event.getType()).toEqual(OnFormFail.ON_FORM_FAIL);
        expect(event.getResponse()).toEqual({a: "a"});
    });
});