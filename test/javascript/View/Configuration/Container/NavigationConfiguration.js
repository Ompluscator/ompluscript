describe("NavigationConfiguration class tests - valid Navigation", function() {

    var navigationConfiguration;

    var NavigationConfiguration = Ompluscript.View.Configuration.Container.NavigationConfiguration;
    var Navigation = Ompluscript.View.Container.Navigation;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        navigationConfiguration = new NavigationConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Navigation",
        };
        expect(navigationConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(navigationConfiguration.getErrors(definition)).toEqual([]);
        var navigation = navigationConfiguration.create(definition);
        expect(navigation instanceof Navigation).toBeTruthy();
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

    it("valid - first", function() {
        var definition = {
            type: "Navigation",
            children: [
                {
                    type: "List",
                    name: "firstLevel",
                    children: [
                        {
                            type: "PageLink",
                            name: "firstPage",
                            text: "firstPage",
                            page: "firstHref"
                        },
                        {
                            type: "PageLink",
                            name: "secondPage",
                            text: "secondPage",
                            page: "secondHref"
                        }
                    ]
                }
            ]
        };
        expect(navigationConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(navigationConfiguration.getErrors(definition)).toEqual([]);
        var navigation = navigationConfiguration.create(definition);
        expect(navigation instanceof Navigation).toBeTruthy();
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