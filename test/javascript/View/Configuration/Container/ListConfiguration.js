describe("ListConfiguration class tests - valid List", function() {

    var listConfiguration;

    var ListConfiguration = Ompluscript.View.Configuration.Container.ListConfiguration;
    var List = Ompluscript.View.Container.List;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        listConfiguration = new ListConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "List",
            name: "firstList"
        };
        expect(listConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(listConfiguration.getErrors(definition)).toEqual([]);
        var list = listConfiguration.create(definition);
        expect(list instanceof List).toBeTruthy();
        expect(list.getName()).toBe("firstList");
        expect(list.render().outerHTML).toBe('<ul class="list unordered"></ul>');
        expect(list.getStackTrace()).toEqual({
            html: '<ul class="list unordered"></ul>',
            name: "firstList",
            children: [],
            list: "unordered"
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "List",
            name: "firstList",
            list: "unordered"
        };
        expect(listConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(listConfiguration.getErrors(definition)).toEqual([]);
        var list = listConfiguration.create(definition);
        expect(list instanceof List).toBeTruthy();
        expect(list.getName()).toBe("firstList");
        expect(list.render().outerHTML).toBe('<ul class="list unordered"></ul>');
        expect(list.getStackTrace()).toEqual({
            html: '<ul class="list unordered"></ul>',
            name: "firstList",
            children: [],
            list: "unordered"
        });
    });

    it("valid - third", function() {
        var definition = {
            type: "List",
            name: "firstList",
            list: "ordered"
        };
        expect(listConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(listConfiguration.getErrors(definition)).toEqual([]);
        var list = listConfiguration.create(definition);
        expect(list instanceof List).toBeTruthy();
        expect(list.getName()).toBe("firstList");
        expect(list.render().outerHTML).toBe('<ul class="list ordered"></ul>');
        expect(list.getStackTrace()).toEqual({
            html: '<ul class="list ordered"></ul>',
            name: "firstList",
            children: [],
            list: "ordered"
        });
    });;

    it("valid - fourth", function() {
        var definition = {
            type: "List",
            name: "firstList",
            list: "none"
        };
        expect(listConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(listConfiguration.getErrors(definition)).toEqual([]);
        var list = listConfiguration.create(definition);
        expect(list instanceof List).toBeTruthy();
        expect(list.getName()).toBe("firstList");
        expect(list.render().outerHTML).toBe('<ul class="list none"></ul>');
        expect(list.getStackTrace()).toEqual({
            html: '<ul class="list none"></ul>',
            name: "firstList",
            children: [],
            list: "none"
        });
    });

    it("valid - fifth", function() {
        var definition = {
            type: "List",
            name: "firstList",
            children: [
                {
                    type: "TextInput",
                    name: "first"
                }
            ]
        };
        expect(listConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(listConfiguration.getErrors(definition)).toEqual([]);
        var list = listConfiguration.create(definition);
        expect(list instanceof List).toBeTruthy();
        expect(list.getName()).toBe("firstList");
        expect(list.render().outerHTML).toBe('<ul class="list unordered">' +
            '<li><input type="text" name="first" class="input"></li>' +
            '</ul>');
        expect(list.getStackTrace()).toEqual({
            html: '<ul class="list unordered"></ul>',
            name: "firstList",
            children: [
                {
                    html: '<input type="text" name="first" class="input">',
                    name: "first",
                    attribute: void(0),
                },
            ],
            list: "unordered"
        });
    });
});

describe("ListConfiguration class tests - invalid ListConfiguration", function() {

    var listConfiguration;

    var ListConfiguration = Ompluscript.View.Configuration.Container.ListConfiguration;
    var List = Ompluscript.View.Container.List;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        listConfiguration = new ListConfiguration();
    });

    it("invalid configuration - name", function() {
        var definition = {
            type: "List",
        };
        expect(listConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(listConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration - list", function() {
        var definition = {
            type: "List",
            name: "firstList",
            list: 1
        };
        expect(listConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(listConfiguration.getErrors(definition)).toEqual([
            "firstList." + List.PARAMETER_LIST + Configuration.MUST_BE_STRING_OR_UNDEFINED,
        ]);
    });

    it("invalid list configuration", function() {
        var definition = {
            type: "List",
            name: "firstList",
            list: "not"
        };
        expect(listConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(listConfiguration.getErrors(definition)).toEqual([
            "firstList." + List.PARAMETER_LIST + Configuration.HAS_WRONG_VALUE,
        ]);
    });
});