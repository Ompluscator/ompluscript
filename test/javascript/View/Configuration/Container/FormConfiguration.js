describe("FormConfiguration class tests - valid Form", function() {

    var formConfiguration;

    var FormConfiguration = Ompluscript.View.Configuration.Container.FormConfiguration;
    var Form = Ompluscript.View.Container.Form;
    var TextInput = Ompluscript.View.Field.TextInput;
    var Creator = Ompluscript.Model.Creator;
    var OnFieldClick = Ompluscript.View.Event.OnFieldClick;
    var OnFormSubmit = Ompluscript.View.Event.OnFormSubmit;

    beforeAll(function() {
        formConfiguration = new FormConfiguration();
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("valid - first", function() {
        var definition = {
            type: "Form",
            name: "form",
            proxy: "save",
            buttonAsset: "submit",
            model: {
                type: "Model",
                name: "model",
                attributes: [
                    {
                        type: "String",
                        name: "first",
                    },
                    {
                        type: "String",
                        name: "second",
                    }
                ],
                proxies: [
                    {
                        type: "AjaxProxy",
                        saveLink: "save",
                        updateLink: "update",
                        deleteLink: "delete",
                        selectLink: "select"
                    }
                ],
            },
            children: [
                {
                    type: "TextInput",
                    name: "first",
                    placeholder: "first"
                },
                {
                    type: "PasswordInput",
                    name: "second",
                    placeholder: "second"
                }
            ]
        };
        expect(formConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(formConfiguration.getErrors(definition)).toEqual([]);
        var form = formConfiguration.create(definition);
        expect(form.hasClass(Form.CLASS_FORM)).toBeTruthy();
        expect(form.getChildrenCount()).toBe(4);
        expect(form.render().outerHTML).toBe(
            '<div class="form">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="text" name="first" class="input" placeholder="first">' +
            '</div>' +
            '</div>' +
            '<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="password" name="second" class="input" placeholder="second">' +
            '</div>' +
            '</div>' +
            '<button class="button">submit</button>' +
            '</div>' +
            '</div>');

        spyOn(form, 'notifyObservers');

        var onFormSubmit = new OnFormSubmit(form, {a: "a"});

        form.update(new OnFieldClick(form, void(0)));

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("save");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
        expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({ first: [""], second: [""]});

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "responseText": "{ \"a\": \"a\" }"
        });

        expect(form.notifyObservers.calls.argsFor(0)).toEqual([onFormSubmit]);
        expect(form.notifyObservers.calls.count()).toBe(1);

        expect(form.render().outerHTML).toBe(
            '<div class="form">' +
            '<div class="layout null-layout">' +
            '<label class="label status">form.save</label>' +
            '<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="text" name="first" class="input" placeholder="first">' +
            '</div>' +
            '</div>' +
            '<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="password" name="second" class="input" placeholder="second">' +
            '</div>' +
            '</div>' +
            '<button class="button">submit</button>' +
            '</div>' +
            '</div>');
    });



    it("valid - second", function() {
        Creator.getInstance().define({
            type: "Model",
            name: "model",
            attributes: [
                {
                    type: "String",
                    name: "first",
                },
                {
                    type: "String",
                    name: "second",
                }
            ],
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: "save",
                    updateLink: "update",
                    deleteLink: "delete",
                    selectLink: "select"
                }
            ],
        });
        var definition = {
            type: "Form",
            name: "form",
            proxy: "save",
            buttonAsset: "submit",
            model: "model",
            children: [
                {
                    type: "TextInput",
                    name: "first",
                    placeholder: "first"
                },
                {
                    type: "PasswordInput",
                    name: "second",
                    placeholder: "second"
                }
            ]
        };
        expect(formConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(formConfiguration.getErrors(definition)).toEqual([]);
        var form = formConfiguration.create(definition);
        expect(form.hasClass(Form.CLASS_FORM)).toBeTruthy();
        expect(form.getChildrenCount()).toBe(4);
        expect(form.render().outerHTML).toBe(
            '<div class="form">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="text" name="first" class="input" placeholder="first">' +
            '</div>' +
            '</div>' +
            '<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="password" name="second" class="input" placeholder="second">' +
            '</div>' +
            '</div>' +
            '<button class="button">submit</button>' +
            '</div>' +
            '</div>');
    });
});

describe("FormConfiguration class tests - invalid FormConfiguration", function() {

    var formConfiguration;

    var FormConfiguration = Ompluscript.View.Configuration.Container.FormConfiguration;
    var Form = Ompluscript.View.Container.Form;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        formConfiguration = new FormConfiguration();
    });

    it("invalid configuration - name", function() {
        var definition = {
            type: "Form",
        };
        expect(formConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(formConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
            Form.PARAMETER_PROXY + Configuration.MUST_BE_STRING,
            Form.PARAMETER_BUTTON_ASSET + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Form",
            name: "firstForm",
            layout: false,
            children: "not",
            model: 1
        };
        expect(formConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(formConfiguration.getErrors(definition)).toEqual([
            "firstForm." + Form.PARAMETER_CHILDREN + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
            "firstForm." + Form.PARAMETER_LAYOUT + Configuration.MUST_BE_OBJECT_OR_UNDEFINED,
            "firstForm." + Form.PARAMETER_MODEL + Configuration.MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED,
            "firstForm." + Form.PARAMETER_PROXY + Configuration.MUST_BE_STRING,
            "firstForm." + Form.PARAMETER_BUTTON_ASSET + Configuration.MUST_BE_STRING
        ]);
    });
});