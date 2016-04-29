describe("PasswordInput class tests", function() {

    var stringObject;
    var passwordInput;

    var Input = Ompluscript.View.Field.Input;
    var PasswordInput = Ompluscript.View.Field.PasswordInput;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        stringObject = new String("param");
        passwordInput = new PasswordInput("param", stringObject)
    });

    it("get configuration", function() {
        expect(passwordInput.hasClass(Input.FIELD_INPUT)).toBeTruthy();
        expect(passwordInput.isBound()).toBeTruthy();
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="param" class="input">',
            name: "param",
            attribute: stringObject.getStackTrace(),
        });
    });
});