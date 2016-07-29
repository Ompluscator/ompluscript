describe("ImageConfiguration class tests - valid Image", function() {

    var imageConfiguration;

    var ImageConfiguration = Ompluscript.View.Configuration.Field.ImageConfiguration;
    var Image = Ompluscript.View.Field.Image;

    beforeAll(function() {
        imageConfiguration = new ImageConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Image",
            name: "image",
            source: "src"
        };
        expect(imageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(imageConfiguration.getErrors(definition)).toEqual([]);
        var image = imageConfiguration.create(definition);
        expect(image instanceof Image).toBeTruthy();
        expect(image.getName()).toBe("image");
        expect(image.isTranslated()).toBeFalsy();
        expect(image.getTextContent()).toBeUndefined();
        expect(image.render().outerHTML).toBe('<img class="image" src="src">');
        expect(image.getStackTrace()).toEqual({
            html: '<img class="image" src="src">',
            name: "image",
            text: void(0),
            source: "src"
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Image",
            name: "image",
            source: "src",
            text: "message"
        };
        expect(imageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(imageConfiguration.getErrors(definition)).toEqual([]);
        var image = imageConfiguration.create(definition);
        expect(image instanceof Image).toBeTruthy();
        expect(image.getName()).toBe("image");
        expect(image.isTranslated()).toBeTruthy();
        expect(image.getTextContent()).toBe("message");
        expect(image.render().outerHTML).toBe('<img alt="message" title="message" class="image" src="src">');
        expect(image.getStackTrace()).toEqual({
            html: '<img alt="message" title="message" class="image" src="src">',
            name: "image",
            text: "message",
            source: "src"
        });
    });
});

describe("ImageConfiguration class tests - invalid Image", function() {

    var imageConfiguration;

    var ImageConfiguration = Ompluscript.View.Configuration.Field.ImageConfiguration;
    var Image = Ompluscript.View.Field.Image;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        imageConfiguration = new ImageConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Image",
        };
        expect(imageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(imageConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
            Image.PARAMETER_SOURCE + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "Image",
            name: "image",
            text: 1,
            source: 1
        };
        expect(imageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(imageConfiguration.getErrors(definition)).toEqual([
            "image." + Image.PARAMETER_TEXT + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "image." + Image.PARAMETER_SOURCE + Configuration.MUST_BE_STRING
        ]);
    });
});