describe("EmailInput class tests", function() {

    var stringObject;
    var emailInput;

    var Input = Ompluscript.View.Field.Input;
    var EmailInput = Ompluscript.View.Field.EmailInput;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        stringObject = new String("param");
        emailInput = new EmailInput("param", stringObject)
    });

    it("get configuration", function() {
        expect(emailInput.hasClass(Input.FIELD_INPUT)).toBeTruthy();
        expect(emailInput.isBound()).toBeTruthy();
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="param" class="input">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
    });
});