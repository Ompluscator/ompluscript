Ompluscript.View.define({
    type: "Page",
    name: "/home",
    children: [
        {
            type: "Box",
            name: "home_box_1",
            layout: {
                type: "LinearLayout",
                direction: "vertical"
            },
            children: [
                {
                    type: "Header",
                    name: "welcome_title",
                    text: "text_welcome_title"
                },
                {
                    type: "Paragraph",
                    name: "welcome_message",
                    text: "text_welcome_message"
                }
            ]
        }
    ]
});