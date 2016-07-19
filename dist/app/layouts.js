Ompluscript.View.define({
    type: "Page",
    name: "layouts",
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
                "table_layout_link"
            ]
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "null-layout",
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
});

Ompluscript.View.define({
    type: "Page",
    name: "relative-layout",
    layout: {
        type: "RelativeLayout"
    },
    children: [
        {
            type: "Header",
            name: "relative_layout_title",
            text: "text_relative_layout_title",
            styles: {
                top: "10px",
                left: "200px",
                width: "250px"
            }
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
});

Ompluscript.View.define({
    type: "Page",
    name: "table-layout",
    layout: {
        type: "TableLayout",
        rows: 2,
        cells: 2
    },
    children: [
        {
            type: "Header",
            name: "table_layout_title",
            text: "text_table_layout_title",
            styles: {
                width: "50%"
            }
        },
        {
            type: "Paragraph",
            name: "relative_layout_configuration",
            text: "text_relative_layout_configuration",
            styles: {
                width: "50%"
            }
        },
        {
            type: "Paragraph",
            name: "relative_layout_message",
            text: "text_relative_layout_message",
            styles: {
                width: "50%"
            }
        },
        {
            type: "Paragraph",
            name: "relative_layout_message",
            text: "text_relative_layout_message",
            styles: {
                width: "50%"
            }
        }
    ]
});