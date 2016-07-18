Ompluscript.View.define({
    type: "Page",
    name: "homepage",
    layout: {
        type: "LinearLayout",
        align: "center"
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
        },
        {
            type: "PageLink",
            name: "welcome_message",
            text: "text_welcome_message",
            page: "layouts",
        },
    ]
});