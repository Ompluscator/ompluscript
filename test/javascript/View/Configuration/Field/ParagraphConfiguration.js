describe("ParagraphConfiguration class tests - valid Paragraph", function() {

    var paragraphConfiguration;

    var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
    var Paragraph = Ompluscript.View.Field.Paragraph;

    beforeAll(function() {
        paragraphConfiguration = new ParagraphConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Paragraph",
            name: "paragraph"
        };
        expect(paragraphConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(paragraphConfiguration.getErrors(definition)).toEqual([]);
        var paragraph = paragraphConfiguration.create(definition);
        expect(paragraph instanceof Paragraph).toBeTruthy();
        expect(paragraph.getName()).toBe("paragraph");
        expect(paragraph.isTranslated()).toBeFalsy();
        expect(paragraph.getTextContent()).toBeUndefined();
        expect(paragraph.render().outerHTML).toBe('<p class="paragraph"></p>');
        expect(paragraph.getStackTrace()).toEqual({
            html: '<p class="paragraph"></p>',
            name: "paragraph",
            text: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Paragraph",
            name: "paragraph",
            text: "message"
        };
        expect(paragraphConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(paragraphConfiguration.getErrors(definition)).toEqual([]);
        var paragraph = paragraphConfiguration.create(definition);
        expect(paragraph instanceof Paragraph).toBeTruthy();
        expect(paragraph.getName()).toBe("paragraph");
        expect(paragraph.isTranslated()).toBeTruthy();
        expect(paragraph.getTextContent()).toBe("message");
        expect(paragraph.render().outerHTML).toBe('<p class="paragraph">message</p>');
        expect(paragraph.getStackTrace()).toEqual({
            html: '<p class="paragraph"></p>',
            name: "paragraph",
            text: "message"
        });
    });
});

describe("ParagraphConfiguration class tests - invalid Paragraph", function() {

    var paragraphConfiguration;

    var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
    var Paragraph = Ompluscript.View.Field.Paragraph;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        paragraphConfiguration = new ParagraphConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Paragraph",
        };
        expect(paragraphConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(paragraphConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "Paragraph",
            name: "paragraph",
            text: 1
        };
        expect(paragraphConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(paragraphConfiguration.getErrors(definition)).toEqual([
            "paragraph." + Paragraph.PARAMETER_TEXT + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });
});