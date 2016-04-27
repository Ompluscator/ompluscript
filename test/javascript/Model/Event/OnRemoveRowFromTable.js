describe("OnRemoveRowFromTable class tests", function() {

    var event;
    var table;
    var index = 1;

    var TableEvent = Ompluscript.Model.Event.TableEvent;
    var OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;
    var Table = Ompluscript.Model.Container.Table;

    beforeAll(function() {
        table = new Table("table", []);
        event = new OnRemoveRowFromTable(table, index);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(table);
        expect(event.getType()).toEqual(TableEvent.ON_REMOVE_ROW_FROM_TABLE);
        expect(event.getIndex()).toEqual(index);
    });
});