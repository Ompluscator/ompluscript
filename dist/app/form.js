Ompluscript.View.define({
    type: "Page",
    name: "/form",
    children: [
        {
            type: "Header",
            name: "form_title",
            text: "text_form_title"
        },
        {
            type: "Paragraph",
            name: "form_message",
            text: "text_form_message"
        },
        {
            type: "Form",
            name: "text_form_title",
            proxy: "save",
            buttonAsset: "text_register_title",
            styles: {
                "max-width": "400px"
            },
            model: {
                type: "Model",
                name: "model",
                attributes: [
                    {
                        type: "String",
                        name: "first_name",
                        required: true
                    },
                    {
                        type: "String",
                        name: "last_name",
                        required: true
                    },
                    {
                        type: "String",
                        name: "user_name",
                        required: true,
                        minimumLength: 8
                    },
                    {
                        type: "String",
                        name: "email",
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    },
                    {
                        type: "String",
                        name: "password",
                        required: true,
                        minimumLength: 8
                    },
                    {
                        type: "Datetime",
                        name: "birthday",
                        required: true,
                        maximum: new Date().toISOString()
                    },
                    {
                        type: "Number",
                        name: "height",
                        minimum: 0,
                        maximum: 250
                    },
                    {
                        type: "Number",
                        name: "weight",
                        minimum: 0,
                        maximum: 250
                    }
                ],
                proxies: [
                    {
                        type: "AjaxProxy",
                        saveLink: "/json/success.json"
                    }
                ],
            },
            children: [
                {
                    type: "TextInput",
                    name: "first_name",
                    placeholder: "text_first_name_title"
                },
                {
                    type: "TextInput",
                    name: "last_name",
                    placeholder: "text_last_name_title"
                },
                {
                    type: "TextInput",
                    name: "user_name",
                    placeholder: "text_user_name_title"
                },
                {
                    type: "EmailInput",
                    name: "email",
                    placeholder: "text_email_title"
                },
                {
                    type: "PasswordInput",
                    name: "password",
                    placeholder: "text_password_title"
                },
                {
                    type: "DateInput",
                    name: "birthday",
                    placeholder: "text_birthday_title"
                },
                {
                    type: "NumberInput",
                    name: "height",
                    placeholder: "text_height_title"
                },
                {
                    type: "NumberInput",
                    name: "weight",
                    placeholder: "text_weight_title"
                }
            ]
        },
        {
            type: "Paragraph",
            name: "form_configuration",
            text: "text_form_configuration"
        }
    ]
});
