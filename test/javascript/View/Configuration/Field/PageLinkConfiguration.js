describe("PageLinkConfiguration class tests - valid PageLink", function() {

    var pageLinkConfiguration;

    var PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
    var PageLink = Ompluscript.View.Field.PageLink;

    beforeAll(function() {
        pageLinkConfiguration = new PageLinkConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "PageLink",
            name: "pageLink",
            page: "pageHref"
        };
        expect(pageLinkConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageLinkConfiguration.getErrors(definition)).toEqual([]);
        var pageLink = pageLinkConfiguration.create(definition);
        expect(pageLink instanceof PageLink).toBeTruthy();
        expect(pageLink.getName()).toBe("pageLink");
        expect(pageLink.isTranslated()).toBeFalsy();
        expect(pageLink.getTextContent()).toBeUndefined();
        expect(pageLink.render().outerHTML).toBe('<a class="link" href="pageHref"></a>');
        expect(pageLink.getStackTrace()).toEqual({
            html: '<a class="link" href="pageHref"></a>',
            name: "pageLink",
            text: void(0),
            page: "pageHref"
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "PageLink",
            name: "pageLink",
            text: "message",
            page: "pageHref"
        };
        expect(pageLinkConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageLinkConfiguration.getErrors(definition)).toEqual([]);
        var pageLink = pageLinkConfiguration.create(definition);
        expect(pageLink instanceof PageLink).toBeTruthy();
        expect(pageLink.getName()).toBe("pageLink");
        expect(pageLink.isTranslated()).toBeTruthy();
        expect(pageLink.getTextContent()).toBe("message");
        expect(pageLink.render().outerHTML).toBe('<a class="link" href="pageHref">message</a>');
        expect(pageLink.getStackTrace()).toEqual({
            html: '<a class="link" href="pageHref"></a>',
            name: "pageLink",
            text: "message",
            page: "pageHref"
        });
    });
});

describe("PageLinkConfiguration class tests - invalid PageLink", function() {

    var pageLinkConfiguration;

    var PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
    var PageLink = Ompluscript.View.Field.PageLink;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        pageLinkConfiguration = new PageLinkConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "PageLink",
        };
        expect(pageLinkConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageLinkConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
            PageLink.PARAMETER_PAGE + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid text and page", function() {
        var definition = {
            type: "PageLink",
            name: "pageLink",
            text: 1,
            page: 3
        };
        expect(pageLinkConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageLinkConfiguration.getErrors(definition)).toEqual([
            "pageLink." + PageLink.PARAMETER_TEXT + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "pageLink." + PageLink.PARAMETER_PAGE + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid page has no value", function() {
        var definition = {
            type: "PageLink",
            name: "pageLink",
        };
        expect(pageLinkConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageLinkConfiguration.getErrors(definition)).toEqual([
            "pageLink." + PageLink.PARAMETER_PAGE + Configuration.MUST_BE_STRING
        ]);
    });
});