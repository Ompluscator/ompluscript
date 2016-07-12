/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="Controller.ts" />
/// <reference path="NavigationController.ts" />

module Ompluscript.Contoller.Controller {
    "use strict";

    export class ApplicationController extends Controller {
        
        public static PARAMETER_COMPONENTS: string = "components";

        private static APPLICATION_CONTROLLER: string = "applicationController";

        private static APPLICATION_FOLDER: string = "app";

        private static FOLDER_SEPARATOR: string = "/";

        private static JAVASCRIPT_EXTENSION: string = ".js";

        private components: string[];

        constructor(components: string[]) {
            super(ApplicationController.APPLICATION_CONTROLLER);
            this.components = components;
            window.addEventListener("load", this.setup.bind(this));
        }

        private setup(): void {
            for (let i: number = 0; i < this.components.length; i++) {
                let xhrObj: XMLHttpRequest = new XMLHttpRequest();
                let source: string = ApplicationController.APPLICATION_FOLDER + ApplicationController.FOLDER_SEPARATOR;
                source += this.components + ApplicationController.JAVASCRIPT_EXTENSION;
                xhrObj.open("GET", source, false);
                xhrObj.send("");
                let script: HTMLScriptElement = document.createElement("script");
                script.type = "text/javascript";
                script.text = xhrObj.responseText;
                document.head.appendChild(script);
                document.head.removeChild(script);
            }
        }

    }
}
