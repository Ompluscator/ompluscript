describe("LabelConfiguration class tests - valid Label", function() {

    var labelConfiguration;

    var LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;
    var Label = Ompluscript.View.Field.Label;

    beforeAll(function() {
        labelConfiguration = new LabelConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Label",
            name: "label"
        };
        expect(labelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(labelConfiguration.getErrors(definition)).toEqual([]);
        var label = labelConfiguration.create(definition);
        expect(label instanceof Label).toBeTruthy();
        expect(label.getName()).toBe("label");
        expect(label.isTranslated()).toBeFalsy();
        expect(label.getTextContent()).toBeUndefined();
        expect(label.render().outerHTML).toBe('<label class="label"></label>');
        expect(label.getStackTrace()).toEqual({
            html: '<label class="label"></label>',
            name: "label",
            text: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Label",
            name: "label",
            text: "message"
        };
        expect(labelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(labelConfiguration.getErrors(definition)).toEqual([]);
        var label = labelConfiguration.create(definition);
        expect(label instanceof Label).toBeTruthy();
        expect(label.getName()).toBe("label");
        expect(label.isTranslated()).toBeTruthy();
        expect(label.getTextContent()).toBe("message");
        expect(label.render().outerHTML).toBe('<label class="label">message</label>');
        expect(label.getStackTrace()).toEqual({
            html: '<label class="label"></label>',
            name: "label",
            text: "message"
        });
    });
});

describe("LabelConfiguration class tests - invalid Label", function() {

    var labelConfiguration;

    var LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;
    var Label = Ompluscript.View.Field.Label;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        labelConfiguration = new LabelConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Label",
        };
        expect(labelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(labelConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "Label",
            name: "label",
            text: 1
        };
        expect(labelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(labelConfiguration.getErrors(definition)).toEqual([
            "label." + Label.PARAMETER_TEXT + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });
});