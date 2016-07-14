describe("Translation class tests", function() {

    var translationObject;
    var undefined;
    var firstTextInput;
    var secondTextInput;
    var thirdTextInput;

    var Translation = Ompluscript.Model.Container.Translation;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    var TextInput = Ompluscript.View.Field.TextInput;

    var OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;

    beforeAll(function() {
        translationObject = new Translation();
        firstTextInput = new TextInput("param");
        secondTextInput = new TextInput("param");
        thirdTextInput = new TextInput("param");
    });

    beforeEach(function() {
        spyOn(firstTextInput, 'update');
        spyOn(secondTextInput, 'update');
        spyOn(thirdTextInput, 'update');
    });

    it("get configuration", function() {
        expect(translationObject.getName()).toBe("Translation");
        expect(translationObject.hasAsset("not")).toBeFalsy();
        expect(translationObject.getAsset("not")).toBe("not");
        expect(translationObject.validate()).toBeTruthy();
        expect(translationObject.getValues()).toEqual({});
        expect(translationObject.hasProxy("AjaxProxy")).toBeTruthy();
        expect(translationObject.getProxy("AjaxProxy") instanceof AjaxProxy).toBeTruthy();
        expect(translationObject.getStackTrace()).toEqual({
            name: "Translation",
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: undefined,
                    updateLink: undefined,
                    deleteLink: undefined,
                    selectLink: undefined
                }
            ],
            assets: {},
            attribute: {
                name: "asset",
                required: false,
                type: "string",
                value: undefined,
                minimumLength: undefined,
                maximumLength: undefined,
                pattern: undefined
            },
        });
    });

    it("update asset", function() {
        var firstNot = new OnUpdateAsset(translationObject, "first", "first");
        var firstYes = new OnUpdateAsset(translationObject, "first", "value");
        var firstRemove = new OnUpdateAsset(translationObject, "value", "first");
        var secondNot = new OnUpdateAsset(translationObject, "second", "second");
        var secondYes = new OnUpdateAsset(translationObject, "second", "value");

        translationObject.attachToAsset("first", firstTextInput);

        expect(firstTextInput.update.calls.argsFor(0)).toEqual([firstNot]);
        expect(firstTextInput.update.calls.count()).toBe(1);
        expect(secondTextInput.update.calls.count()).toBe(0);
        expect(thirdTextInput.update.calls.count()).toBe(0);

        firstTextInput.update.calls.reset();
        secondTextInput.update.calls.reset();
        thirdTextInput.update.calls.reset();

        translationObject.attachToAsset("second", secondTextInput);

        expect(secondTextInput.update.calls.argsFor(0)).toEqual([secondNot]);
        expect(secondTextInput.update.calls.count()).toBe(1);
        expect(firstTextInput.update.calls.count()).toBe(0);
        expect(thirdTextInput.update.calls.count()).toBe(0);

        firstTextInput.update.calls.reset();
        secondTextInput.update.calls.reset();
        thirdTextInput.update.calls.reset();

        translationObject.attachToAsset("second", thirdTextInput);

        expect(thirdTextInput.update.calls.argsFor(0)).toEqual([secondNot]);
        expect(thirdTextInput.update.calls.count()).toBe(1);
        expect(firstTextInput.update.calls.count()).toBe(0);
        expect(secondTextInput.update.calls.count()).toBe(0);

        firstTextInput.update.calls.reset();
        secondTextInput.update.calls.reset();
        thirdTextInput.update.calls.reset();

        translationObject.setValues({
            first: "value"
        });

        expect(firstTextInput.update.calls.argsFor(0)).toEqual([firstYes]);
        expect(firstTextInput.update.calls.count()).toBe(1);
        expect(secondTextInput.update.calls.count()).toBe(0);
        expect(thirdTextInput.update.calls.count()).toBe(0);

        firstTextInput.update.calls.reset();
        secondTextInput.update.calls.reset();
        thirdTextInput.update.calls.reset();

        translationObject.setValues({
            second: "value"
        });

        expect(firstTextInput.update.calls.argsFor(0)).toEqual([firstRemove]);
        expect(firstTextInput.update.calls.count()).toBe(1);
        expect(secondTextInput.update.calls.argsFor(0)).toEqual([secondYes]);
        expect(secondTextInput.update.calls.count()).toBe(1);
        expect(thirdTextInput.update.calls.argsFor(0)).toEqual([secondYes]);
        expect(thirdTextInput.update.calls.count()).toBe(1);

        firstTextInput.update.calls.reset();
        secondTextInput.update.calls.reset();
        thirdTextInput.update.calls.reset();
    });

});