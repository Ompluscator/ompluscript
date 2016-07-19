describe("ButtonConfiguration class tests - valid Button", function() {

    var buttonConfiguration;

    var ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
    var Button = Ompluscript.View.Field.Button;

    beforeAll(function() {
        buttonConfiguration = new ButtonConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Button",
            name: "button"
        };
        expect(buttonConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(buttonConfiguration.getErrors(definition)).toEqual([]);
        var button = buttonConfiguration.create(definition);
        expect(button instanceof Button).toBeTruthy();
        expect(button.getName()).toBe("button");
        expect(button.isTranslated()).toBeFalsy();
        expect(button.getTextContent()).toBeUndefined();
        expect(button.render().outerHTML).toBe('<button class="button"></button>');
        expect(button.getStackTrace()).toEqual({
            html: '<button class="button"></button>',
            name: "button",
            text: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Button",
            name: "button",
            text: "message"
        };
        expect(buttonConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(buttonConfiguration.getErrors(definition)).toEqual([]);
        var button = buttonConfiguration.create(definition);
        expect(button instanceof Button).toBeTruthy();
        expect(button.getName()).toBe("button");
        expect(button.isTranslated()).toBeTruthy();
        expect(button.getTextContent()).toBe("message");
        expect(button.render().outerHTML).toBe('<button class="button">message</button>');
        expect(button.getStackTrace()).toEqual({
            html: '<button class="button"></button>',
            name: "button",
            text: "message"
        });
    });
});

describe("ButtonConfiguration class tests - invalid Button", function() {

    var buttonConfiguration;

    var ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
    var Button = Ompluscript.View.Field.Button;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        buttonConfiguration = new ButtonConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Button",
        };
        expect(buttonConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(buttonConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "Button",
            name: "button",
            text: 1
        };
        expect(buttonConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(buttonConfiguration.getErrors(definition)).toEqual([
            "button." + Button.PARAMETER_TEXT + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });
});