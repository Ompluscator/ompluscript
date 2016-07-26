describe("OnFieldFocus class tests", function() {

    var event;
    var pageLink;
    var clickEvent;

    var OnFieldFocus = Ompluscript.View.Event.OnFieldFocus;
    var PageLink = Ompluscript.View.Field.PageLink;

    beforeAll(function() {
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click");
        spyOn(clickEvent, 'preventDefault');

        pageLink = new PageLink("pageLink", "pageLinkAsset", "pageHref");
        event = new OnFieldFocus(pageLink, clickEvent);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(pageLink);
        expect(event.getType()).toEqual(OnFieldFocus.ON_FIELD_FOCUS);

        event.preventDefault();

        expect(clickEvent.preventDefault.calls.argsFor(0)).toEqual([]);
        expect(clickEvent.preventDefault.calls.count()).toBe(1);
    });
});