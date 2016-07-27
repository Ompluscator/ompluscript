Ompluscript.View.define({
    type: "Page",
    name: "/getting-started",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Header",
            name: "getting_started_title",
            text: "text_getting_started_title"
        },
        {
            type: "Paragraph",
            name: "getting_started_message",
            text: "text_getting_started_message"
        },
        {
            type: "List",
            name: "gettingStartedList",
            children: [
                "model_link",
                "view_link",
                "controller_link",
                "application_link"
            ]
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/getting-started/model",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Header",
            name: "model_title",
            text: "text_model_title"
        },
        {
            type: "Paragraph",
            name: "model_message",
            text: "text_model_message"
        },
        {
            type: "Paragraph",
            name: "model_explanation_message",
            text: "text_model_explanation_message"
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/getting-started/view",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Header",
            name: "view_title",
            text: "text_view_title"
        },
        {
            type: "Paragraph",
            name: "view_message",
            text: "text_view_message"
        },
        {
            type: "Paragraph",
            name: "view_explanation_message",
            text: "text_view_explanation_message"
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/getting-started/controller",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Header",
            name: "controller_title",
            text: "text_controller_title"
        },
        {
            type: "Paragraph",
            name: "controller_message",
            text: "text_controller_message"
        },
        {
            type: "Paragraph",
            name: "controller_explanation_message",
            text: "text_controller_explanation_message"
        }
    ]
});

Ompluscript.View.define({
    type: "Page",
    name: "/getting-started/application",
    layout: {
        type: "LinearLayout",
        direction: "vertical"
    },
    children: [
        {
            type: "Header",
            name: "application_title",
            text: "text_application_title"
        },
        {
            type: "Paragraph",
            name: "application_message",
            text: "text_application_message"
        },
        {
            type: "Paragraph",
            name: "application_explanation_message",
            text: "text_application_explanation_message"
        }
    ]
});