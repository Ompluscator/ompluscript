describe("Paragraph class tests", function() {

    var paragraph;

    var Paragraph = Ompluscript.View.Field.Paragraph;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        paragraph = new Paragraph("paragraph", "paragraphAsset")
    });

    it("get configuration", function() {
        expect(paragraph.hasClass(Paragraph.CLASS_PARAGRAPH)).toBeTruthy();
        expect(paragraph.getName()).toBe("paragraph");
        expect(paragraph.isTranslated()).toBeTruthy();
        expect(paragraph.getTextContent()).toBe("paragraphAsset");
        expect(paragraph.render().outerHTML).toBe('<p class="paragraph">paragraphAsset</p>');
        expect(paragraph.getStackTrace()).toEqual({
            html: '<p class="paragraph"></p>',
            name: "paragraph",
            text: "paragraphAsset",
        });
    });

    it("text - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            paragraphAsset: "value"
        });
        expect(paragraph.getTextContent()).toBe("value");
        expect(paragraph.render().outerHTML).toBe('<p class="paragraph">value</p>');
        expect(paragraph.getStackTrace()).toEqual({
            html: '<p class="paragraph"></p>',
            name: "paragraph",
            text: "paragraphAsset",
        });
    });

});