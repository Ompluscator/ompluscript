Ompluscript.View.define({
    type: "Page",
    name: "form",
    children: [
        {
            type: "Header",
            name: "form_title",
            text: "text_form_title"
        },
        {
            type: "Form",
            name: "text_form_title",
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
                    },
                    {
                        type: "Boolean",
                        name: "third",
                    },
                    {
                        type: "Number",
                        name: "fourth",
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
                    placeholder: "text_input"
                },
                {
                    type: "PasswordInput",
                    name: "second",
                    placeholder: "password_input"
                },
                {
                    type: "CheckBoxInput",
                    name: "third",
                    placeholder: "checkbox_input"
                },
                {
                    type: "NumberInput",
                    name: "fourth",
                    placeholder: "number_input"
                }
            ]
        }
    ]
});
