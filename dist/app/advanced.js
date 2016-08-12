Ompluscript.View.define({
    type: "Page",
    name: "/navigation",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Box",
            name: "navigation_box_1",
            layout: {
                type: "LinearLayout",
                direction: "vertical"
            },
            children: [
                {
                    type: "Header",
                    name: "navigation_title",
                    text: "text_navigation_title"
                },
                {
                    type: "Paragraph",
                    name: "navigation_message",
                    text: "text_navigation_message"
                },
                {
                    type: "Paragraph",
                    name: "navigation_explanation_message",
                    text: "text_navigation_explanation_message"
                }
            ]
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/translation",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Box",
            name: "translation_box_1",
            layout: {
                type: "LinearLayout",
                direction: "vertical"
            },
            children: [
                {
                    type: "Header",
                    name: "translation_title",
                    text: "text_translation_title"
                },
                {
                    type: "Paragraph",
                    name: "translation_message",
                    text: "text_translation_message"
                },
                {
                    type: "Paragraph",
                    name: "translation_explanation_message",
                    text: "text_translation_explanation_message"
                }
            ]
        }
    ]
});