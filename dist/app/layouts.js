Ompluscript.View.define({
    type: "Page",
    name: "/layouts",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Box",
            name: "layouts_box_1",
            layout: {
                type: "LinearLayout",
                direction: "vertical"
            },
            children: [
                {
                    type: "Header",
                    name: "layouts_title",
                    text: "text_layouts_title"
                },
                {
                    type: "Paragraph",
                    name: "layouts_message",
                    text: "text_layouts_message"
                },
                {
                    type: "List",
                    name: "layouts_list",
                    children: [
                        "null_layout_link",
                        "relative_layout_link",
                        "linear_layout_link",
                        "table_layout_link"
                    ]
                }
            ]
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/layouts/null-layout",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Box",
            name: "relative_box_1",
            children: [
                {
                    type: "Header",
                    name: "null_layout_title",
                    text: "text_null_layout_title"
                },
                {
                    type: "Paragraph",
                    name: "relative_null_layout_message",
                    text: "text_null_layout_message"
                },
                {
                    type: "Paragraph",
                    name: "relative_null_layout_message_2",
                    text: "text_null_layout_message_2"
                }
            ]
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/layouts/relative-layout",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Box",
            name: "box_layout",
            layout: {
                type: "RelativeLayout"
            },
            children: [
                {
                    type: "Header",
                    name: "relative_layout_title",
                    text: "text_relative_layout_title"
                },
                {
                    type: "Paragraph",
                    name: "relative_layout_configuration",
                    text: "text_relative_layout_configuration",
                    styles: {
                        top: "20px",
                        left: "600px",
                        width: "200px"
                    }
                },
                {
                    type: "Paragraph",
                    name: "relative_layout_message",
                    text: "text_relative_layout_message",
                    styles: {
                        top: "50px",
                        left: "100px",
                        width: "200px"
                    }
                }
            ]
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/layouts/linear-layout",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Box",
            name: "box_layout",
            layout: {
                type: "LinearLayout",
                reverse: true
            },
            children: [
                {
                    type: "Header",
                    name: "linear_layout_title",
                    text: "text_linear_layout_title"
                },
                {
                    type: "Paragraph",
                    name: "linear_layout_message",
                    text: "text_linear_layout_message",
                    styles: {
                        "max-width": "200px"
                    }
                },
                {
                    type: "Paragraph",
                    name: "linear_layout_configuration",
                    text: "text_linear_layout_configuration"
                }
            ]
        },
        {
            type: "Box",
            name: "box_layout",
            layout: {
                type: "LinearLayout",
                direction: "vertical",
                align: "end"
            },
            children: [
                {
                    type: "Paragraph",
                    name: "linear_layout_message",
                    text: "text_linear_layout_message_2",
                    styles: {
                        "max-width": "400px"
                    }
                },
                {
                    type: "Paragraph",
                    name: "linear_layout_configuration",
                    text: "text_linear_layout_configuration_2"
                }
            ]
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/layouts/table-layout",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Box",
            name: "box_layout",
            layout: {
                type: "TableLayout",
                rows: 3,
                cells: 2
            },
            children: [
                {
                    type: "Header",
                    name: "table_layout_title",
                    text: "text_table_layout_title",
                },
                {
                    type: "Paragraph",
                    name: "table_layout_configuration",
                    text: "text_table_layout_configuration",
                },
                {
                    type: "Paragraph",
                    name: "table_layout_2_1_message",
                    text: "text_table_layout_2_1_message",
                },
                {
                    type: "Paragraph",
                    name: "table_layout_2_2_message",
                    text: "text_table_layout_2_2_message",
                },
                {
                    type: "Paragraph",
                    name: "table_layout_3_1_message",
                    text: "text_table_layout_3_1_message",
                },
                {
                    type: "Paragraph",
                    name: "table_layout_3_2_message",
                    text: "text_table_layout_3_2_message",
                }
            ]
        }
    ]
});