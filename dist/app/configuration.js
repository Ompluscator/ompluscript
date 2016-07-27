Ompluscript.Model.define({
    type: "Translation",
    proxies: [
        {
            type: "AjaxProxy",
            selectLink: "/json/translation.json"
        },
    ],
});

Ompluscript.View.define({
    type: "PageLink",
    name: "null_layout_link",
    text: "text_null_layout_title",
    page: "/layouts/null-layout"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "relative_layout_link",
    text: "text_relative_layout_title",
    page: "/layouts/relative-layout"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "linear_layout_link",
    text: "text_linear_layout_title",
    page: "/layouts/linear-layout"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "table_layout_link",
    text: "text_table_layout_title",
    page: "/layouts/table-layout"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "model_link",
    text: "text_model_title",
    page: "/getting-started/model"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "view_link",
    text: "text_view_title",
    page: "/getting-started/view"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "controller_link",
    text: "text_controller_title",
    page: "/getting-started/controller"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "application_link",
    text: "text_application_title",
    page: "/getting-started/application"
});

Ompluscript.View.define({
    type: "Navigation",
    children: [
        {
            type: "List",
            name: "firstLevel",
            children: [
                {
                    type: "List",
                    name: "homeSecondLevel",
                    children: [
                        {
                            type: "PageLink",
                            name: "home",
                            text: "text_home_title",
                            page: "/home"
                        },
                        {
                            type: "Label",
                            name: "serbian_title",
                            text: "text_serbian_title",
                            events: {
                                onFieldClick: function() {
                                    Ompluscript.Model.Creator.getInstance().getTranslation().getProxy("AjaxProxy").select({
                                        id: 1
                                    });
                                }
                            }
                        },
                        {
                            type: "Label",
                            name: "english_title",
                            text: "text_english_title",
                            events: {
                                onFieldClick: function() {
                                    Ompluscript.Model.Creator.getInstance().getTranslation().getProxy("AjaxProxy").select({
                                        id: 2
                                    });
                                }
                            }
                        },
                    ]
                },
                {
                    type: "List",
                    name: "gettingStartedSecondLevel",
                    children: [
                        {
                            type: "PageLink",
                            name: "getting_started_title",
                            text: "text_getting_started_title",
                            page: "/getting-started"
                        },
                        "model_link",
                        "view_link",
                        "controller_link",
                        "application_link"
                    ]
                },
                {
                    type: "List",
                    name: "layoutsSecondLevel",
                    children: [
                        {
                            type: "PageLink",
                            name: "layouts_title",
                            text: "text_layouts_title",
                            page: "/layouts"
                        },
                        "null_layout_link",
                        "relative_layout_link",
                        "linear_layout_link",
                        "table_layout_link"
                    ]
                },
                {
                    type: "List",
                    name: "advancedTechniqueSecondLevel",
                    children: [
                        {
                            type: "Label",
                            name: "advanced_technique_title",
                            text: "text_advanced_technique_title",
                        },
                        {
                            type: "PageLink",
                            name: "navigation_title",
                            text: "text_navigation_title",
                            page: "/navigation"
                        },
                        {
                            type: "PageLink",
                            name: "translation_title",
                            text: "text_translation_title",
                            page: "/translation"
                        },
                        {
                            type: "PageLink",
                            name: "form",
                            text: "text_form_title",
                            page: "/form"
                        },
                        {
                            type: "PageLink",
                            name: "table",
                            text: "text_table_title",
                            page: "/table"
                        }
                    ]
                },
                {
                    type: "PageLink",
                    name: "about",
                    text: "text_about_title",
                    page: "/about"
                }
            ]
        }
    ]
});