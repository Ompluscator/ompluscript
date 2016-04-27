describe("OnAddRowToTable class tests", function() {

    var event;
    var table;
    var model;
    var index = 1;

    var TableEvent = Ompluscript.Model.Event.TableEvent;
    var OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
    var Model = Ompluscript.Model.Container.Model;
    var Table = Ompluscript.Model.Container.Table;

    beforeAll(function() {
        model = new Model("model", []);
        table = new Table("table", []);
        event = new OnAddRowToTable(table, index, model);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(table);
        expect(event.getType()).toEqual(TableEvent.ON_ADD_ROW_TO_TABLE);
        expect(event.getModel()).toEqual(model);
        expect(event.getIndex()).toEqual(index);
    });
});