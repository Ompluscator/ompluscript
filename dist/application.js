Ompluscript.application({
    components: ["configuration", "homepage", "getting-started", "layouts", "advanced", "form", "table", "about"],
    events: {
        onComponentLoad: function (event) {
            if (event.getComponent() === "configuration") {
                Ompluscript.Model.Creator.getInstance().getTranslation().getProxy("AjaxProxy").select({
                    id: 1
                });
            }
        }
    }
});