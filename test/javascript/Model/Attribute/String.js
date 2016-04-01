module("Basic Tests");

test("truthy", function() {
    var string = new Ompluscript.Model.Attribute.String('param', 'test', false, 2, 5);
    equal('test', string.getValue());
});