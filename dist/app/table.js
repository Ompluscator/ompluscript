Ompluscript.Controller.define({
    type: "PageController",
    page: {
        type: "Page",
        name: "/table",
        layout: {
            type: "LinearLayout",
            direction: "vertical"
        },
        children: [
            {
                type: "Box",
                name: "table_box_1",
                layout: {
                    type: "LinearLayout",
                    direction: "vertical"
                },
                children: [
                    {
                        type: "Header",
                        name: "table_title",
                        text: "text_table_title"
                    },
                    {
                        type: "Paragraph",
                        name: "table_message",
                        text: "text_table_message"
                    },
                    {
                        type: "TableContainer",
                        name: "table",
                        table: {
                            type: "Table",
                            name: "table",
                            attributes: [
                                {
                                    type: "String",
                                    name: "user_name",
                                },
                                {
                                    type: "String",
                                    name: "first_name",
                                },
                                {
                                    type: "String",
                                    name: "last_name",
                                },
                                {
                                    type: "String",
                                    name: "birthday",
                                }
                            ],
                            proxies: [
                                {
                                    type: "AjaxProxy",
                                    selectLink: "/json/users.json"
                                },
                            ]
                        },
                        headers: [
                            {
                                type: "Label",
                                name: "user_name",
                                text: "text_user_name_title"
                            },
                            {
                                type: "Label",
                                name: "first_name",
                                text: "text_first_name_title"
                            },
                            {
                                type: "Label",
                                name: "last_name",
                                text: "text_last_name_title"
                            },
                            {
                                type: "Label",
                                name: "birthday",
                                text: "text_birthday_title"
                            },
                            {
                                type: "Label",
                                name: "user_name",
                                text: "text_user_name_title"
                            }
                        ],
                        cells: [
                            {
                                type: "LabelInput",
                                name: "user_name"
                            },
                            {
                                type: "LabelInput",
                                name: "first_name"
                            },
                            {
                                type: "LabelInput",
                                name: "last_name"
                            },
                            {
                                type: "LabelInput",
                                name: "birthday"
                            },
                            {
                                type: "TextInput",
                                name: "user_name"
                            }
                        ]
                    },
                    {
                        type: "PageLink",
                        name: "all_users",
                        text: "text_all_users_title",
                        page: "/table"
                    },
                    {
                        type: "PageLink",
                        name: "online_users",
                        text: "text_online_users_title",
                        page: "/table/users/type/online"
                    },
                    {
                        type: "PageLink",
                        name: "offline_users",
                        text: "text_offline_users_title",
                        page: "/table/users/type/offline"
                    }
                ]
            },
            {
                type: "Box",
                name: "translation_box_2",
                layout: {
                    type: "LinearLayout",
                    direction: "vertical"
                },
                children: [
                    {
                        type: "Paragraph",
                        name: "table_configuration",
                        text: "text_table_configuration"
                    }
                ]
            }
        ],
        events: {
            onPageLoad: function () {
                if (window.location.pathname.indexOf("/users") === -1) {
                    var tableContainer = this.findChildrenByName("table")[0];
                    tableContainer.getTable().getProxy("AjaxProxy").select();
                }
            }
        }
    },
    actions: {
        users: function(type) {
            var tableContainer = this.getPage().findChildrenByName("table")[0];
            tableContainer.getTable().getProxy("AjaxProxy").select({
                type: type
            });
        }
    }
});