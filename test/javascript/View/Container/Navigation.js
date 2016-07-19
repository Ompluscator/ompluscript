describe("Navigation class tests - initialization", function() {

    var navigation;

    var Navigation = Ompluscript.View.Container.Navigation;
    var List = Ompluscript.View.Container.List;
    var PageLink = Ompluscript.View.Field.PageLink;

    it("empty navigation", function() {
        navigation = new Navigation();
        expect(navigation.hasClass(Navigation.CLASS_NAVIGATION)).toBeTruthy();
        expect(navigation.getChildrenCount()).toBe(1);
        expect(navigation.getName()).toBe("Navigation");
        expect(navigation.render().outerHTML).toBe('<nav class="navigation">' +
            '<div class="layout null-layout">' +
            '<button class="button navigation-element"></button>' +
            '</div>' +
            '</nav>');
        expect(navigation.getStackTrace()).toEqual({
            html: '<nav class="navigation"></nav>',
            name: "Navigation",
            children: [
                {
                    html: '<button class="button navigation-element"></button>',
                    name: "navigation",
                    text: void(0),
                }
            ],
        });
    });

    it("full navigation", function() {
        var children = [new PageLink("firstPage", "firstPage", "firstHref"), new PageLink("secondPage", "secondPage", "secondHref")];
        var list = new List("firstLevel", void(0), children);
        navigation = new Navigation([list]);
        expect(navigation.hasClass(Navigation.CLASS_NAVIGATION)).toBeTruthy();
        expect(navigation.getChildrenCount()).toBe(2);
        expect(navigation.getName()).toBe("Navigation");
        expect(navigation.render().outerHTML).toBe('<nav class="navigation">' +
            '<div class="layout null-layout">' +
            '<ul class="list unordered navigation-element">' +
            '<li><a class="link" href="firstHref">firstPage</a></li>' +
            '<li><a class="link" href="secondHref">secondPage</a></li>' +
            '</ul>' +
            '<button class="button navigation-element"></button>' +
            '</div>' +
            '</nav>');
        expect(navigation.getStackTrace()).toEqual({
            html: '<nav class="navigation"></nav>',
            name: "Navigation",
            children: [
                {
                    html: '<ul class="list unordered navigation-element"></ul>',
                    name: "firstLevel",
                    children: [
                        {
                            html: '<a class="link" href="firstHref"></a>',
                            name: "firstPage",
                            text: "firstPage",
                            page: "firstHref"
                        },
                        {
                            html: '<a class="link" href="secondHref"></a>',
                            name: "secondPage",
                            text: "secondPage",
                            page: "secondHref"
                        }
                    ],
                    list: "unordered"
                },
                {
                    html: '<button class="button navigation-element"></button>',
                    name: "navigation",
                    text: void(0),
                }
            ],
        });
    });
});