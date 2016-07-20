describe("Form class tests", function() {

    var textInput;
    var passwordInput;
    var form;
    var firstString;
    var secondString;
    var model;

    var Form = Ompluscript.View.Container.Form;
    var TextInput = Ompluscript.View.Field.TextInput;
    var PasswordInput = Ompluscript.View.Field.PasswordInput;
    var String = Ompluscript.Model.Attribute.String;
    var Model = Ompluscript.Model.Container.Model;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    var OnFieldClick = Ompluscript.View.Event.OnFieldClick;
    var OnFormFail = Ompluscript.View.Event.OnFormFail;
    var OnFormSubmit = Ompluscript.View.Event.OnFormSubmit;

    beforeEach(function() {
        firstString = new String("first");
        secondString = new String("second");
        model = new Model("model", [firstString, secondString], [new AjaxProxy("save", "update", "delete", "select")])
        textInput = new TextInput("first", firstString, "first");
        passwordInput = new PasswordInput("second", secondString, "first");
        form = new Form("form", void(0), "save", "submit", model, [textInput, passwordInput]);
        spyOn(form, 'notifyObservers');
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("get configuration", function() {
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
                        '<input type="password" name="second" class="input" placeholder="first">' +
                    '</div>' +
                '</div>' +
                '<button class="button">submit</button>' +
            '</div>' +
        '</div>');
        expect(form.getStackTrace()).toEqual({
            html: '<div class="form"></div>',
            name: "form",
            children: [
                {
                    html: '<label class="label"></label>',
                    name: "formStatus",
                    text: void(0),
                },
                {
                    html: '<div class="input-container"></div>',
                    name: "first",
                    children: [
                        {
                            html: '<label class="label"></label>',
                            name: "firstError",
                            text: void(0),
                        },
                        textInput.getStackTrace()
                    ],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "firstError",
                                text: void(0),
                            },
                            textInput.getStackTrace()
                        ]
                    },
                },
                {
                    html: '<div class="input-container"></div>',
                    name: "second",
                    children: [
                        {
                            html: '<label class="label"></label>',
                            name: "secondError",
                            text: void(0),
                        },
                        passwordInput.getStackTrace()
                    ],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "secondError",
                                text: void(0),
                            },
                            passwordInput.getStackTrace()
                        ]
                    },
                },
                {
                    html: '<button class="button"></button>',
                    name: "formSubmit",
                    text: "submit",
                }
            ],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: [
                    {
                        html: '<label class="label"></label>',
                        name: "formStatus",
                        text: void(0),
                    },
                    {
                        html: '<div class="input-container"></div>',
                        name: "first",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "firstError",
                                text: void(0),
                            },
                            textInput.getStackTrace()
                        ],
                        layout: {
                            html: '<div class="layout null-layout"></div>',
                            name: "NullLayout",
                            children: [
                                {
                                    html: '<label class="label"></label>',
                                    name: "firstError",
                                    text: void(0),
                                },
                                textInput.getStackTrace()
                            ]
                        },
                    },
                    {
                        html: '<div class="input-container"></div>',
                        name: "second",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "secondError",
                                text: void(0),
                            },
                            passwordInput.getStackTrace()
                        ],
                        layout: {
                            html: '<div class="layout null-layout"></div>',
                            name: "NullLayout",
                            children: [
                                {
                                    html: '<label class="label"></label>',
                                    name: "secondError",
                                    text: void(0),
                                },
                                passwordInput.getStackTrace()
                            ]
                        },
                    },
                    {
                        html: '<button class="button"></button>',
                        name: "formSubmit",
                        text: "submit",
                    }
                ]
            },
        });
    });

    it("success submit", function() {
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

        expect(form.hasClass(Form.CLASS_FORM)).toBeTruthy();
        expect(form.getChildrenCount()).toBe(4);
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
            '<input type="password" name="second" class="input" placeholder="first">' +
            '</div>' +
            '</div>' +
            '<button class="button">submit</button>' +
            '</div>' +
            '</div>');
        expect(form.getStackTrace()).toEqual({
            html: '<div class="form"></div>',
            name: "form",
            children: [
                {
                    html: '<label class="label status"></label>',
                    name: "formStatus",
                    text: "form.save",
                },
                {
                    html: '<div class="input-container"></div>',
                    name: "first",
                    children: [
                        {
                            html: '<label class="label"></label>',
                            name: "firstError",
                            text: void(0),
                        },
                        textInput.getStackTrace()
                    ],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "firstError",
                                text: void(0),
                            },
                            textInput.getStackTrace()
                        ]
                    },
                },
                {
                    html: '<div class="input-container"></div>',
                    name: "second",
                    children: [
                        {
                            html: '<label class="label"></label>',
                            name: "secondError",
                            text: void(0),
                        },
                        passwordInput.getStackTrace()
                    ],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "secondError",
                                text: void(0),
                            },
                            passwordInput.getStackTrace()
                        ]
                    },
                },
                {
                    html: '<button class="button"></button>',
                    name: "formSubmit",
                    text: "submit",
                }
            ],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: [
                    {
                        html: '<label class="label status"></label>',
                        name: "formStatus",
                        text: "form.save",
                    },
                    {
                        html: '<div class="input-container"></div>',
                        name: "first",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "firstError",
                                text: void(0),
                            },
                            textInput.getStackTrace()
                        ],
                        layout: {
                            html: '<div class="layout null-layout"></div>',
                            name: "NullLayout",
                            children: [
                                {
                                    html: '<label class="label"></label>',
                                    name: "firstError",
                                    text: void(0),
                                },
                                textInput.getStackTrace()
                            ]
                        },
                    },
                    {
                        html: '<div class="input-container"></div>',
                        name: "second",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "secondError",
                                text: void(0),
                            },
                            passwordInput.getStackTrace()
                        ],
                        layout: {
                            html: '<div class="layout null-layout"></div>',
                            name: "NullLayout",
                            children: [
                                {
                                    html: '<label class="label"></label>',
                                    name: "secondError",
                                    text: void(0),
                                },
                                passwordInput.getStackTrace()
                            ]
                        },
                    },
                    {
                        html: '<button class="button"></button>',
                        name: "formSubmit",
                        text: "submit",
                    }
                ]
            },
        });
    });

    it("failed submit", function() {
        var onFormFail = new OnFormFail(form, {a: "a"});

        form.update(new OnFieldClick(form, void(0)));

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("save");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
        expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({ first: [""], second: [""]});

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 400,
            "responseText": "{ \"a\": \"a\" }"
        });

        expect(form.notifyObservers.calls.argsFor(0)).toEqual([onFormFail]);
        expect(form.notifyObservers.calls.count()).toBe(1);

        expect(form.hasClass(Form.CLASS_FORM)).toBeTruthy();
        expect(form.getChildrenCount()).toBe(4);
        expect(form.render().outerHTML).toBe(
            '<div class="form">' +
            '<div class="layout null-layout">' +
            '<label class="label status">form.failed</label>' +
            '<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="text" name="first" class="input" placeholder="first">' +
            '</div>' +
            '</div>' +
            '<div class="input-container">' +
            '<div class="layout null-layout">' +
            '<label class="label"></label>' +
            '<input type="password" name="second" class="input" placeholder="first">' +
            '</div>' +
            '</div>' +
            '<button class="button">submit</button>' +
            '</div>' +
            '</div>');
        expect(form.getStackTrace()).toEqual({
            html: '<div class="form"></div>',
            name: "form",
            children: [
                {
                    html: '<label class="label status"></label>',
                    name: "formStatus",
                    text: "form.failed",
                },
                {
                    html: '<div class="input-container"></div>',
                    name: "first",
                    children: [
                        {
                            html: '<label class="label"></label>',
                            name: "firstError",
                            text: void(0),
                        },
                        textInput.getStackTrace()
                    ],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "firstError",
                                text: void(0),
                            },
                            textInput.getStackTrace()
                        ]
                    },
                },
                {
                    html: '<div class="input-container"></div>',
                    name: "second",
                    children: [
                        {
                            html: '<label class="label"></label>',
                            name: "secondError",
                            text: void(0),
                        },
                        passwordInput.getStackTrace()
                    ],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "secondError",
                                text: void(0),
                            },
                            passwordInput.getStackTrace()
                        ]
                    },
                },
                {
                    html: '<button class="button"></button>',
                    name: "formSubmit",
                    text: "submit",
                }
            ],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: [
                    {
                        html: '<label class="label status"></label>',
                        name: "formStatus",
                        text: "form.failed",
                    },
                    {
                        html: '<div class="input-container"></div>',
                        name: "first",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "firstError",
                                text: void(0),
                            },
                            textInput.getStackTrace()
                        ],
                        layout: {
                            html: '<div class="layout null-layout"></div>',
                            name: "NullLayout",
                            children: [
                                {
                                    html: '<label class="label"></label>',
                                    name: "firstError",
                                    text: void(0),
                                },
                                textInput.getStackTrace()
                            ]
                        },
                    },
                    {
                        html: '<div class="input-container"></div>',
                        name: "second",
                        children: [
                            {
                                html: '<label class="label"></label>',
                                name: "secondError",
                                text: void(0),
                            },
                            passwordInput.getStackTrace()
                        ],
                        layout: {
                            html: '<div class="layout null-layout"></div>',
                            name: "NullLayout",
                            children: [
                                {
                                    html: '<label class="label"></label>',
                                    name: "secondError",
                                    text: void(0),
                                },
                                passwordInput.getStackTrace()
                            ]
                        },
                    },
                    {
                        html: '<button class="button"></button>',
                        name: "formSubmit",
                        text: "submit",
                    }
                ]
            },
        });
    });
});