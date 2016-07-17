describe("OnPageClose class tests", function() {

    var event;
    var page;

    var OnPageClose = Ompluscript.View.Event.OnPageClose;
    var Page = Ompluscript.View.Container.Page;

    beforeAll(function() {
        page = new Page("page");
        event = new OnPageClose(page);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(page);
        expect(event.getType()).toEqual(OnPageClose.ON_PAGE_CLOSE);
    });
});