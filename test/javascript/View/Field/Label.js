describe("Label class tests", function() {

    var label;

    var Label = Ompluscript.View.Field.Label;
    var Creator = Ompluscript.Model.Creator;
    var OnFieldClick = Ompluscript.View.Event.OnFieldClick;

    beforeAll(function() {
        label = new Label("label", "labelAsset")
    });

    it("get configuration", function() {
        expect(label.hasClass(Label.CLASS_LABEL)).toBeTruthy();
        expect(label.getName()).toBe("label");
        expect(label.isTranslated()).toBeTruthy();
        expect(label.getTextContent()).toBe("labelAsset");
        expect(label.render().outerHTML).toBe('<label class="label">labelAsset</label>');
        expect(label.getStackTrace()).toEqual({
            html: '<label class="label"></label>',
            name: "label",
            text: "labelAsset",
        });
    });

    it("text - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            labelAsset: "value"
        });
        expect(label.getTextContent()).toBe("value");
        expect(label.render().outerHTML).toBe('<label class="label">value</label>');
        expect(label.getStackTrace()).toEqual({
            html: '<label class="label"></label>',
            name: "label",
            text: "labelAsset",
        });
    });

    it("simulate click - unit test", function() {
        spyOn(label, 'notifyObservers');

        var event = document.createEvent("MouseEvent");
        event.initMouseEvent("click");
        label.render().dispatchEvent(event);

        var onFieldClick = new OnFieldClick(label, event);

        expect(label.notifyObservers.calls.argsFor(0)).toEqual([onFieldClick]);
        expect(label.notifyObservers.calls.count()).toBe(1);
    });
});