/// <reference path="Controller.ts" />
/// <reference path="../../View/Container/Page.ts" />
/// <reference path="../Event/OnActionRun.ts" />

/**
 * Module that contains controllers
 *
 * @module Ompluscript.Controller.Controller
 */
module Ompluscript.Controller.Controller {
    "use strict";

    import Page = Ompluscript.View.Container.Page;
    import OnActionRun = Ompluscript.Controller.Event.OnActionRun;

    /**
     * Class that defines page controller
     *
     * @class PageController
     */
    export class PageController extends Controller {

        /**
         * @type {string} TYPE_PAGE_CONTROLLER Type of page controller class
         */
        public static TYPE_PAGE_CONTROLLER: string = "PageController";

        /**
         * @type {string} PARAMETER_PAGE Name of page parameter
         */
        public static PARAMETER_PAGE: string = "page";

        /**
         * @type {string} PARAMETER_ACTIONS Name of actions parameter
         */
        public static PARAMETER_ACTIONS: string = "actions";

        /**
         * @type {Page} page Contains page that it handles
         */
        private page: Page;

        /**
         * @type {Object} action Contains a list of actions
         */
        private actions: Object;

        /**
         * Class constructor.
         * 
         * Sets page and calls constructor of superclass.
         * 
         * @param {Page} page Contains page that it handles
         * @constructs
         */
        constructor(page: Page) {
            super(page.getName());
            this.page = page;
            this.actions = {};
        }

        /**
         * Method that returns handled page
         * 
         * @returns {Page} handled page
         */
        public getPage(): Page {
            return this.page;
        }

        /**
         * Method that returns if page is related to path
         *
         * @param {string} path Path to page
         * @returns {boolean} If page is related to path
         */
        public isRelated(path: string): boolean {
            let isRelated: boolean = this.page.isRelated(path);
            if (!isRelated) {
                return false;
            }
            let rest: string = this.page.trimPath(path);
            if (rest.charAt(0) === "/") {
                rest = rest.substring(1);
            }
            if (rest.length === 0) {
                return true;
            }
            let paths: any = rest.split("/");
            return this.actions.hasOwnProperty(paths[0]);
        }

        /**
         * Method that runs page by it's path
         * 
         * @param {string} path Path to page
         */
        public runPage(path: string): void {
            let rest: string = this.page.trimPath(path);
            if (rest.charAt(0) === "/") {
                rest = rest.substring(1);
            }
            if (rest.length > 0) {
                let paths: any = rest.split("/");
                if (paths.length > 0) {
                    let action: string = paths[0];
                    paths.splice(0, 1);
                    let parameters: Object = {};
                    for (let i: number = 0; i < paths.length; i += 2) {
                        parameters[paths[i]] = paths[i + 1];
                    }
                    this.runAction(action, parameters);
                }
            }
        }

        /**
         * Method that adds action to list
         * 
         * @param {string} action Name of action
         * @param {Function} method Handler for action
         */
        public addAction(action: string, method: Function): void {
            this.actions[action] = method;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[PageController.PARAMETER_ACTIONS] = [];
            for (let key in this.actions) {
                if (this.actions.hasOwnProperty(key)) {
                    trace[PageController.PARAMETER_ACTIONS].push(key);
                }
            }
            trace[PageController.PARAMETER_PAGE] = this.page.getStackTrace();
            return trace;
        }

        /**
         * Method that runs action with its parameters.
         * 
         * @param {string} action Name of action
         * @param {Object} parameters List with parameters
         */
        public runAction(action: string, parameters: Object = {}): void {
            if (this.actions.hasOwnProperty(action)) {
                let names: string[] = this.getActionParameterNames(this.actions[action]);
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

        /**
         * Method that fires event when action is run
         *
         * @param {string} action Name of action
         * @param {Object} parameters List with parameters
         */
        protected fireOnActionRunEvent(action: string, parameters: Object): void {
            let event: OnActionRun = new OnActionRun(this, action, parameters);
            this.notifyObservers(event);
        }

        /**
         * Method that extracts parameter names from function
         * 
         * @param {Function} action Function definition
         * @returns {string[]} List with parameter names
         */
        private getActionParameterNames(action: Function): string[] {
            let definition: string = action.toString();
            return definition.match(/\(.*?\)/)[0].replace(/[()]/gi, "").replace(/\s/gi, "").split(",");
        }
    }
}
