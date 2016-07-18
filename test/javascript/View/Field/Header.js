describe("Header class tests", function() {

    var header;

    var Header = Ompluscript.View.Field.Header;
    var Creator = Ompluscript.Model.Creator;

    it("get configuration", function() {
        header = new Header("header", "headerAsset");

        expect(header.hasClass(Header.CLASS_HEADER)).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeTruthy();
        expect(header.getTextContent()).toBe("headerAsset");
        expect(header.render().outerHTML).toBe('<h1 class="header">headerAsset</h1>');
        expect(header.getStackTrace()).toEqual({
            html: '<h1 class="header"></h1>',
            name: "header",
            text: "headerAsset",
            level: "1"
        });
    });

    it("get configuration - level 1", function() {
        header = new Header("header", "headerAsset", Header.LEVEL_FIRST);

        expect(header.hasClass(Header.CLASS_HEADER)).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeTruthy();
        expect(header.getTextContent()).toBe("headerAsset");
        expect(header.render().outerHTML).toBe('<h1 class="header">headerAsset</h1>');
        expect(header.getStackTrace()).toEqual({
            html: '<h1 class="header"></h1>',
            name: "header",
            text: "headerAsset",
            level: "1"
        });
    });

    it("get configuration - level 2", function() {
        header = new Header("header", "headerAsset", Header.LEVEL_SECOND);

        expect(header.hasClass(Header.CLASS_HEADER)).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeTruthy();
        expect(header.getTextContent()).toBe("headerAsset");
        expect(header.render().outerHTML).toBe('<h2 class="header">headerAsset</h2>');
        expect(header.getStackTrace()).toEqual({
            html: '<h2 class="header"></h2>',
            name: "header",
            text: "headerAsset",
            level: "2"
        });
    });

    it("get configuration - level 3", function() {
        header = new Header("header", "headerAsset", Header.LEVEL_THIRD);

        expect(header.hasClass(Header.CLASS_HEADER)).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeTruthy();
        expect(header.getTextContent()).toBe("headerAsset");
        expect(header.render().outerHTML).toBe('<h3 class="header">headerAsset</h3>');
        expect(header.getStackTrace()).toEqual({
            html: '<h3 class="header"></h3>',
            name: "header",
            text: "headerAsset",
            level: "3"
        });
    });

    it("get configuration - level 4", function() {
        header = new Header("header", "headerAsset", Header.LEVEL_FOURTH);

        expect(header.hasClass(Header.CLASS_HEADER)).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeTruthy();
        expect(header.getTextContent()).toBe("headerAsset");
        expect(header.render().outerHTML).toBe('<h4 class="header">headerAsset</h4>');
        expect(header.getStackTrace()).toEqual({
            html: '<h4 class="header"></h4>',
            name: "header",
            text: "headerAsset",
            level: "4"
        });
    });

    it("get configuration - level 5", function() {
        header = new Header("header", "headerAsset", Header.LEVEL_FIFTH);

        expect(header.hasClass(Header.CLASS_HEADER)).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeTruthy();
        expect(header.getTextContent()).toBe("headerAsset");
        expect(header.render().outerHTML).toBe('<h5 class="header">headerAsset</h5>');
        expect(header.getStackTrace()).toEqual({
            html: '<h5 class="header"></h5>',
            name: "header",
            text: "headerAsset",
            level: "5"
        });
    });

    it("get configuration - level 6", function() {
        header = new Header("header", "headerAsset", Header.LEVEL_SIXTH);

        expect(header.hasClass(Header.CLASS_HEADER)).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeTruthy();
        expect(header.getTextContent()).toBe("headerAsset");
        expect(header.render().outerHTML).toBe('<h6 class="header">headerAsset</h6>');
        expect(header.getStackTrace()).toEqual({
            html: '<h6 class="header"></h6>',
            name: "header",
            text: "headerAsset",
            level: "6"
        });
    });

    it("text - functional test", function() {
        header = new Header("header", "headerAsset");

        Creator.getInstance().getTranslation().setValues({
            headerAsset: "value"
        });
        expect(header.getTextContent()).toBe("value");
        expect(header.render().outerHTML).toBe('<h1 class="header">value</h1>');
        expect(header.getStackTrace()).toEqual({
            html: '<h1 class="header"></h1>',
            name: "header",
            text: "headerAsset",
            level: "1"
        });
    });

});