/// <reference path="Controller.ts" />
/// <reference path="../../View/Container/Page.ts" />
/// <reference path="../Event/OnActionRun.ts" />

module Ompluscript.Controller.Controller {
    "use strict";

    import Page = Ompluscript.View.Container.Page;
    import OnActionRun = Ompluscript.Controller.Event.OnActionRun;

    export class PageController extends Controller {

        private page: Page;

        private actions: Object;

        constructor(name: string, page: Page) {
            super(name);
            this.page = page;
            this.actions = {};
        }

        public getPage(): Page {
            return this.page;
        }

        public addAction(action: string, method: Function): void {
            this.actions[action] = method;
        }

        public runAction(action: string, parameters: Object = {}): void {
            if (this.actions.hasOwnProperty(action)) {
                let names: string[] = this.getActionParamameterNames(this.actions[action]);
                let values: any[] = [];
                for (let i: number = 0; i < names.length; i++) {
                    if (parameters.hasOwnProperty(names[i])) {
                        values.push(parameters[names[i]]);
                    } else {
                        values.push(undefined);
                    }
                }
                this.actions[action].apply(this, values);
                this.fireOnActionRunEvent(action, parameters);
            }
        }

        protected fireOnActionRunEvent(action: string, parameters: Object): void {
            let event: OnActionRun = new OnActionRun(this, action, parameters);
            this.notifyObservers(event);
        }

        private getActionParamameterNames(action: Function): string[] {
            let definition: string = action.toString();
            return definition.match(/\(.*?\)/)[0].replace(/[()]/gi, "").replace(/\s/gi, "").split(",");
        }
    }
}
