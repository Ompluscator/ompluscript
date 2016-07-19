describe("Button class tests", function() {

    var button;

    var Button = Ompluscript.View.Field.Button;
    var Creator = Ompluscript.Model.Creator;
    var OnFieldClick = Ompluscript.View.Event.OnFieldClick;

    beforeAll(function() {
        button = new Button("button", "buttonAsset")
    });

    it("get configuration", function() {
        expect(button.hasClass(Button.CLASS_BUTTON)).toBeTruthy();
        expect(button.getName()).toBe("button");
        expect(button.isTranslated()).toBeTruthy();
        expect(button.getTextContent()).toBe("buttonAsset");
        expect(button.render().outerHTML).toBe('<button class="button">buttonAsset</button>');
        expect(button.getStackTrace()).toEqual({
            html: '<button class="button"></button>',
            name: "button",
            text: "buttonAsset",
        });
    });

    it("text - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            buttonAsset: "value"
        });
        expect(button.getTextContent()).toBe("value");
        expect(button.render().outerHTML).toBe('<button class="button">value</button>');
        expect(button.getStackTrace()).toEqual({
            html: '<button class="button"></button>',
            name: "button",
            text: "buttonAsset",
        });
    });

    it("simulate click - unit test", function() {
        spyOn(button, 'notifyObservers');

        var event = document.createEvent("MouseEvent");
        event.initMouseEvent("click");
        button.render().dispatchEvent(event);

        var onFieldClick = new OnFieldClick(button, event);

        expect(button.notifyObservers.calls.argsFor(0)).toEqual([onFieldClick]);
        expect(button.notifyObservers.calls.count()).toBe(1);
    });
});