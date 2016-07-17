describe("OnPageLoad class tests", function() {

    var event;
    var page;

    var OnPageLoad = Ompluscript.View.Event.OnPageLoad;
    var Page = Ompluscript.View.Container.Page;

    beforeAll(function() {
        page = new Page("page");
        event = new OnPageLoad(page);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(page);
        expect(event.getType()).toEqual(OnPageLoad.ON_PAGE_LOAD);
    });
});