describe("InputContainer class tests", function() {

    var input;
    var inputContainer;
    var stringObject;

    var InputContainer = Ompluscript.View.Container.InputContainer;
    var TextInput = Ompluscript.View.Field.TextInput;
    var String = Ompluscript.Model.Attribute.String;

    beforeEach(function() {
        stringObject = new String("string");
        input = new TextInput("first", stringObject, "first");
    });

    it("get configuration", function() {
        inputContainer = new InputContainer(input);
        expect(inputContainer.hasClass(InputContainer.CLASS_INPUT_CONTAINER)).toBeTruthy();
        expect(inputContainer.getChildrenCount()).toBe(2);
        expect(inputContainer.render().outerHTML).toBe('<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="text" name="first" class="input" placeholder="first">' +
            '</div>' +
            '</div>');
        expect(inputContainer.getStackTrace()).toEqual({
            html: '<div class="input-container"></div>',
            name: "first",
            children: [
                {
                    html: '<label class="label"></label>',
                    name: "firstError",
                    text: void(0),
                },
                {
                    html: '<input type="text" name="first" class="input" placeholder="first">',
                    name: "first",
                    attribute: stringObject.getStackTrace(),
                }
            ],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: [
                    {
                        html: '<label class="label"></label>',
                        name: "firstError",
                        text: void(0),
                    },
                    {
                        html: '<input type="text" name="first" class="input" placeholder="first">',
                        name: "first",
                        attribute: stringObject.getStackTrace(),
                    }
                ]
            },
        });
    });

    it("check validation", function() {
        inputContainer = new InputContainer(input);
        stringObject.setValue(1);
        stringObject.validate();
        expect(inputContainer.hasClass(InputContainer.CLASS_INPUT_CONTAINER)).toBeTruthy();
        expect(inputContainer.getChildrenCount()).toBe(2);
        expect(inputContainer.render().outerHTML).toBe('<div class="input-container error">' +
            '<div class="layout null-layout">' +
            '<label class="label">first.101</label>' +
            '<input type="text" name="first" class="input" placeholder="first">' +
            '</div>' +
            '</div>');
        expect(inputContainer.getStackTrace()).toEqual({
            html: '<div class="input-container error"></div>',
            name: "first",
            children: [
                {
                    html: '<label class="label"></label>',
                    name: "firstError",
                    text: "first.101",
                },
                {
                    html: '<input type="text" name="first" class="input" placeholder="first">',
                    name: "first",
                    attribute: stringObject.getStackTrace(),
                }
            ],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: [
                    {
                        html: '<label class="label"></label>',
                        name: "firstError",
                        text: "first.101",
                    },
                    {
                        html: '<input type="text" name="first" class="input" placeholder="first">',
                        name: "first",
                        attribute: stringObject.getStackTrace(),
                    }
                ]
            },
        });
    });
});