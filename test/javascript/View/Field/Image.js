describe("Image class tests", function() {

    var image;

    var Image = Ompluscript.View.Field.Image;
    var Creator = Ompluscript.Model.Creator;
    var OnFieldClick = Ompluscript.View.Event.OnFieldClick;

    beforeAll(function() {
        image = new Image("image", "src", "imageAsset")
    });

    it("get configuration", function() {
        expect(image.hasClass(Image.CLASS_IMAGE)).toBeTruthy();
        expect(image.getName()).toBe("image");
        expect(image.isTranslated()).toBeTruthy();
        expect(image.getTextContent()).toBe("imageAsset");
        expect(image.render().outerHTML).toBe('<img alt="imageAsset" title="imageAsset" class="image" src="src">');
        expect(image.getStackTrace()).toEqual({
            html: '<img alt="imageAsset" title="imageAsset" class="image" src="src">',
            name: "image",
            text: "imageAsset",
            source: "src"
        });
    });

    it("text - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            imageAsset: "value"
        });
        expect(image.getTextContent()).toBe("value");
        expect(image.render().outerHTML).toBe('<img alt="value" title="value" class="image" src="src">');
        expect(image.getStackTrace()).toEqual({
            html: '<img alt="value" title="value" class="image" src="src">',
            name: "image",
            text: "imageAsset",
            source: "src"
        });
    });

    it("simulate click - unit test", function() {
        spyOn(image, 'notifyObservers');

        var event = document.createEvent("MouseEvent");
        event.initMouseEvent("click");
        image.render().dispatchEvent(event);

        var onFieldClick = new OnFieldClick(image, event);

        expect(image.notifyObservers.calls.argsFor(0)).toEqual([onFieldClick]);
        expect(image.notifyObservers.calls.count()).toBe(1);
    });
});