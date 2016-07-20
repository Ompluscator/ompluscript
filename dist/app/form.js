Ompluscript.View.define({
    type: "Page",
    name: "form",
    defaultPage: true,
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
                        name: "first_name_title",
                    },
                    {
                        type: "String",
                        name: "last_name_title",
                    },
                    {
                        type: "String",
                        name: "user_name_title",
                    },
                    {
                        type: "String",
                        name: "email_title",
                    },
                    {
                        type: "String",
                        name: "password_title",
                    },
                    {
                        type: "Datetime",
                        name: "birthday_title",
                    },
                    {
                        type: "Number",
                        name: "card_number_title",
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
                    name: "first_name_title",
                    placeholder: "text_first_name_title"
                },
                {
                    type: "TextInput",
                    name: "last_name_title",
                    placeholder: "text_last_name_title"
                },
                {
                    type: "TextInput",
                    name: "user_name_title",
                    placeholder: "text_user_name_title"
                },
                {
                    type: "EmailInput",
                    name: "email_title",
                    placeholder: "text_email_title"
                },
                {
                    type: "PasswordInput",
                    name: "password_title",
                    placeholder: "text_password_title"
                },
                {
                    type: "DateInput",
                    name: "birthday_title",
                    placeholder: "text_birthday_title"
                },
                {
                    type: "NumberInput",
                    name: "card_number_title",
                    placeholder: "text_card_number_title"
                }
            ]
        }
    ]
});
