Ompluscript.Model.define({
    type: "Translation",
    proxies: [
        {
            type: "AjaxProxy",
            selectLink: "json/translation.json"
        },
    ],
});

Ompluscript.View.define({
    type: "PageLink",
    name: "null_layout_link",
    text: "text_null_layout_title",
    page: "null-layout"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "relative_layout_link",
    text: "text_relative_layout_title",
    page: "relative-layout"
});

Ompluscript.View.define({
    type: "PageLink",
    name: "table_layout_link",
    text: "text_table_layout_title",
    page: "table-layout"
});

Ompluscript.View.define({
    type: "Navigation",
    children: [
        {
            type: "List",
            name: "firstLevel",
            children: [
                {
                    type: "PageLink",
                    name: "home",
                    text: "text_home_title",
                    page: "home"
                },
                {
                    type: "List",
                    name: "secondLevel",
                    children: [
                        {
                            type: "PageLink",
                            name: "layouts_title",
                            text: "text_layouts_title",
                            page: "layouts"
                        },
                        "null_layout_link",
                        "relative_layout_link",
                        "table_layout_link"
                    ]
                }
            ]
        }
    ]
});