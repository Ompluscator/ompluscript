Ompluscript.application({
    components: ["configuration", "homepage"],
    events: {
        onComponentLoad: function (event) {
            if (event.getComponent() === "configuration") {
                Ompluscript.Model.Creator.getInstance().getTranslation().getProxy("AjaxProxy").select();
            }
        }
    }
});