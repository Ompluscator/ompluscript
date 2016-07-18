describe("Creator class tests - valid creator", function() {

    var Creator = Ompluscript.View.Creator;
    var Page = Ompluscript.View.Container.Page;

    var definition = {
        type: "Page",
        name: "firstPage",
        layout: {
            type: "TableLayout",
            rows: 2,
            cells: 3
        },
        children: [
            {
                type: "TextInput",
                name: "first",
                attribute: true
            },
            {
                type: "PasswordInput",
                name: "second",
                attribute: true
            },
            {
                type: "CheckBoxInput",
                name: "third",
                attribute: true
            },
            {
                type: "DateInput",
                name: "fourth",
                attribute: true
            },
            {
                type: "EmailInput",
                name: "fifth",
                attribute: true
            },
            {
                type: "NumberInput",
                name: "sixth",
                attribute: true
            },
            {
                type: "Paragraph",
                name: "seventh",
                text: "seventh"
            },
            {
                type: "Header",
                name: "eighth",
                text: "eighth"
            }
        ]
    };

    beforeAll(function() {
        Creator.getInstance().reset();
    });

    it("get configuration", function() {
        expect(Creator.getInstance().hasErrors()).toBeFalsy();
        expect(Creator.getInstance().getErrors()).toEqual([]);
    });

    it("valid creation", function() {
        Creator.getInstance().define(definition);

        expect(Creator.getInstance().hasErrors()).toBeFalsy();
        expect(Creator.getInstance().getErrors()).toEqual([]);
        expect(Creator.getInstance().create("firstPage") instanceof Page).toBeTruthy();
    });
});