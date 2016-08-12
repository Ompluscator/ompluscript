Ompluscript.View.define({
    type: "Page",
    name: "/about",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Box",
            name: "about_box_1",
            layout: {
                type: "LinearLayout",
                direction: "vertical"
            },
            children: [
                {
                    type: "Header",
                    name: "about_title",
                    text: "text_about_title"
                },
                {
                    type: "Paragraph",
                    name: "about_message",
                    text: "text_about_message"
                }
            ]
        }
    ]
});