describe("HeaderConfiguration class tests - valid Header", function() {

    var headerConfiguration;

    var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
    var Header = Ompluscript.View.Field.Header;

    beforeAll(function() {
        headerConfiguration = new HeaderConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Header",
            name: "header"
        };
        expect(headerConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(headerConfiguration.getErrors(definition)).toEqual([]);
        var header = headerConfiguration.create(definition);
        expect(header instanceof Header).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeFalsy();
        expect(header.getTextContent()).toBeUndefined();
        expect(header.render().outerHTML).toBe('<h1 class="header"></h1>');
        expect(header.getStackTrace()).toEqual({
            html: '<h1 class="header"></h1>',
            name: "header",
            text: void(0),
            level: "1"
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Header",
            name: "header",
            text: "message",
            level: "3"
        };
        expect(headerConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(headerConfiguration.getErrors(definition)).toEqual([]);
        var header = headerConfiguration.create(definition);
        expect(header instanceof Header).toBeTruthy();
        expect(header.getName()).toBe("header");
        expect(header.isTranslated()).toBeTruthy();
        expect(header.getTextContent()).toBe("message");
        expect(header.render().outerHTML).toBe('<h3 class="header">message</h3>');
        expect(header.getStackTrace()).toEqual({
            html: '<h3 class="header"></h3>',
            name: "header",
            text: "message",
            level: "3"
        });
    });
});

describe("HeaderConfiguration class tests - invalid Header", function() {

    var headerConfiguration;

    var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
    var Header = Ompluscript.View.Field.Header;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        headerConfiguration = new HeaderConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Header",
        };
        expect(headerConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(headerConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid text and level", function() {
        var definition = {
            type: "Header",
            name: "header",
            text: 1,
            level: 3
        };
        expect(headerConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(headerConfiguration.getErrors(definition)).toEqual([
            "header." + Header.PARAMETER_TEXT + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "header." + Header.PARAMETER_LEVEL + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });

    it("invalid level has wrong value", function() {
        var definition = {
            type: "Header",
            name: "header",
            level: "not"
        };
        expect(headerConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(headerConfiguration.getErrors(definition)).toEqual([
            "header." + Header.PARAMETER_LEVEL + Configuration.HAS_WRONG_VALUE
        ]);
    });
});