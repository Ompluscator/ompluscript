describe("Datetime class tests - initialization", function() {
    
    var undefined;

    it("validate invalid minimum configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Datetime("param", undefined, true, "wrong");
        }).toThrowError(SyntaxError);
    });

    it("validate valid minimum configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Datetime("param", undefined, true, "1/11/1985");
        }).not.toThrow();
    });

    it("validate invalid maximum configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Datetime("param", undefined, true, "1/11/1985", "wrong");
        }).toThrowError(SyntaxError);
    });

    it("validate valid maximum configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Datetime("param", undefined, true, "1/11/1985", "1/10/1985");
        }).toThrowError(SyntaxError);
    });
});