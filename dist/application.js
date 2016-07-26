Ompluscript.application({
    components: ["configuration", "homepage", "layouts", "form", "table"],
    events: {
        onComponentLoad: function (event) {
            if (event.getComponent() === "configuration") {
                Ompluscript.Model.Creator.getInstance().getTranslation().getProxy("AjaxProxy").select();
            }
        }
    }
});