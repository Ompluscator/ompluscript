Ompluscript.Model.define({
    type: "Translation",
    proxies: [
        {
            type: "AjaxProxy",
            selectLink: "json/translation.json"
        },
    ],
});