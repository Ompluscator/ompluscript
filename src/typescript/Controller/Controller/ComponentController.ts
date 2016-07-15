/// <reference path="Controller.ts" />
/// <reference path="../../Model/Container/Container.ts" />
/// <reference path="../../View/Container/Container.ts" />

module Ompluscript.Controller.Controller {
    "use strict";
    import ModelContainer = Ompluscript.Model.Container.Container;
    import ViewContainer = Ompluscript.View.Container.Container;

    export class ComponentController extends Controller {

        private models: Object;

        private views: Object;

        constructor(name: string, models: Object = {}, views: Object = {}) {
            super(name);
            this.models = models;
            this.views = views;
        }

        public getModel(name: string): ModelContainer {
            if (this.models.hasOwnProperty(name)) {
                return this.models[name];
            }
            return undefined;
        }

        public getView(name: string): ViewContainer {
            if (this.views.hasOwnProperty(name)) {
                return this.views[name];
            }
            return undefined;
        }
    }
}
