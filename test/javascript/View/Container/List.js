describe("List class tests - initialization", function() {

    var firstInput;
    var secondInput;
    var thirdInput;
    var page;

    var List = Ompluscript.View.Container.List;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        firstInput = new TextInput("first");
        secondInput = new TextInput("second");
        thirdInput = new TextInput("third");
    });

    it("empty unordered list", function() {
        page = new List("firstList");
        expect(page.hasClass(List.CLASS_LIST)).toBeTruthy();
        expect(page.hasClass(List.LIST_UNORDERED)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.render().outerHTML).toBe('<ul class="list unordered"></ul>');
        expect(page.getStackTrace()).toEqual({
            html: '<ul class="list unordered"></ul>',
            name: "firstList",
            children: [],
            list: "unordered"
        });
    });

    it("full unordered list", function() {
        page = new List("firstList", void(0), [firstInput, secondInput, thirdInput]);
        expect(page.hasClass(List.CLASS_LIST)).toBeTruthy();
        expect(page.hasClass(List.LIST_UNORDERED)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.render().outerHTML).toBe('<ul class="list unordered">' +
            '<li><input type="text" name="first" class="input"></li>' +
            '<li><input type="text" name="second" class="input"></li>' +
            '<li><input type="text" name="third" class="input"></li>' +
            '</ul>');
        expect(page.getStackTrace()).toEqual({
            html: '<ul class="list unordered"></ul>',
            name: "firstList",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            list: "unordered"
        });
    });

    it("empty ordered list", function() {
        page = new List("firstList", List.LIST_ORDERED);
        expect(page.hasClass(List.CLASS_LIST)).toBeTruthy();
        expect(page.hasClass(List.LIST_ORDERED)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.render().outerHTML).toBe('<ul class="list ordered"></ul>');
        expect(page.getStackTrace()).toEqual({
            html: '<ul class="list ordered"></ul>',
            name: "firstList",
            children: [],
            list: "ordered"
        });
    });

    it("full ordered list", function() {
        page = new List("firstList", List.LIST_ORDERED, [firstInput, secondInput, thirdInput]);
        expect(page.hasClass(List.CLASS_LIST)).toBeTruthy();
        expect(page.hasClass(List.LIST_ORDERED)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.render().outerHTML).toBe('<ul class="list ordered">' +
            '<li><input type="text" name="first" class="input"></li>' +
            '<li><input type="text" name="second" class="input"></li>' +
            '<li><input type="text" name="third" class="input"></li>' +
            '</ul>');
        expect(page.getStackTrace()).toEqual({
            html: '<ul class="list ordered"></ul>',
            name: "firstList",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            list: "ordered"
        });
    });

    it("empty none list", function() {
        page = new List("firstList", List.LIST_NONE);
        expect(page.hasClass(List.CLASS_LIST)).toBeTruthy();
        expect(page.hasClass(List.LIST_NONE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.render().outerHTML).toBe('<ul class="list none"></ul>');
        expect(page.getStackTrace()).toEqual({
            html: '<ul class="list none"></ul>',
            name: "firstList",
            children: [],
            list: "none"
        });
    });

    it("full ordered list", function() {
        page = new List("firstList", List.LIST_NONE, [firstInput, secondInput, thirdInput]);
        expect(page.hasClass(List.CLASS_LIST)).toBeTruthy();
        expect(page.hasClass(List.LIST_NONE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.render().outerHTML).toBe('<ul class="list none">' +
            '<li><input type="text" name="first" class="input"></li>' +
            '<li><input type="text" name="second" class="input"></li>' +
            '<li><input type="text" name="third" class="input"></li>' +
            '</ul>');
        expect(page.getStackTrace()).toEqual({
            html: '<ul class="list none"></ul>',
            name: "firstList",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            list: "none"
        });
    });
});