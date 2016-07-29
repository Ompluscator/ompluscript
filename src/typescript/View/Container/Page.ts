/// <reference path="Container.ts" />
/// <reference path="../Layout/Layout.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Event/OnPageLoad.ts" />
/// <reference path="../Event/OnPageClose.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";
    
    import Layout = Ompluscript.View.Layout.Layout;
    import Component = Ompluscript.View.Component.Component;
    import OnPageLoad = Ompluscript.View.Event.OnPageLoad;
    import OnPageClose = Ompluscript.View.Event.OnPageClose;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    
    /**
     * Class that defines page
     *
     * @class Page
     */
     export class Page extends Container {

        /**
         * @type {string} TYPE_PAGE Type of page
         */
        public static TYPE_PAGE: string = "Page";

        /**
         * @type {string} PARAMETER_EVENTS Name of events parameter
         */
        public static PARAMETER_EVENTS: string = "events";

        /**
         * @type {string} PARAMETER_ON_PAGE_LOAD Defines event when page is loaded
         */
        public static PARAMETER_ON_PAGE_LOAD: string = "onPageLoad";

        /**
         * @type {string} PARAMETER_ON_PAGE_CLOSE Defines event when page is closed
         */
        public static PARAMETER_ON_PAGE_CLOSE: string = "onPageClose";

        /**
         * @type {string} NAME_404_PAGE Name for 404 page
         */
        public static NAME_404_PAGE: string = "Error-404";

        /**
         * @type {string} PARAMETER_DEFAULT_PAGE Name of default page parameter
         */
        public static PARAMETER_DEFAULT_PAGE: string = "defaultPage";

        /**
         * @type {string} CLASS_PAGE Class of HTML div element for page
         */
        public static CLASS_PAGE: string = "page";

        /**
         * @type {boolean} active Defines if page is currently visible
         */
        private active: boolean;

        /**
         * @type {boolean} defaultPage Defines if page is default
         */
        private defaultPage: boolean;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {string} name Name of container
         * @param {boolean} defaultPage Defines if page is default
         * @param {Layout} layout Layout for container
         * @param {Component[]} children List of children components
         * @param {Object} styles Styles for container
         * @constructs
         */
        constructor(name: string, defaultPage: boolean = false, layout: Layout = undefined,
                    children: Component[] = undefined, styles: Object = undefined) {
            super(name, layout, children, styles);
            this.addClass(Page.CLASS_PAGE);
            this.addClass(name);
            this.active = false;
            this.defaultPage = defaultPage;
        }

        /**
         * Method that returns value that defines if page is currently visible
         * 
         * @returns {boolean} Defines if page is currently visible
         */
        public isActive(): boolean {
            return this.active;
        }

        /**
         * Method that returns if page is related to path
         * 
         * @param {string} path Path to page
         * @returns {boolean} If page is related to path
         */
        public isRelated(path: string): boolean {
            return path.indexOf(this.name) === 0;
        }

        /**
         * Method that returns rest of path without page name.
         * 
         * @param {string} path Path to page
         * @returns {string} Rest of path
         */
        public trimPath(path: string): string {
            return path.replace(this.name, "");
        }

        /**
         * Method that returns value that defines if page is default
         *
         * @returns {boolean} Defines if page is default
         */
        public isDefaultPage(): boolean {
            return this.defaultPage;
        }

        /**
         * Method that sets value that defines if page is currently visible
         * 
         * @param {boolean} active Defines if page is currently visible
         */
        public setActive(active: boolean): void {
            let beforeChange: boolean = this.active;
            this.active = active;
            if (this.active === true && this.active !== beforeChange) {
                this.fireOnPageLoadEvent();
            } else if (this.active === false && this.active !== beforeChange) {
                this.fireOnPageCloseEvent();
            }
        }

        /**
         * Method that attach handler for page load event
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnPageLoadEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, OnPageLoad.ON_PAGE_LOAD, callback);
        }

        /**
         * Method that attach handler for page close event
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnPageCloseEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, OnPageClose.ON_PAGE_CLOSE, callback);
        }

        /**
         * Method that fires event when page is loaded
         */
        protected fireOnPageLoadEvent(): void {
            let event: OnPageLoad = new OnPageLoad(this);
            this.notifyObservers(event);
        }

        /**
         * Method that fires event when page is closed
         */
        protected fireOnPageCloseEvent(): void {
            let event: OnPageClose = new OnPageClose(this);
            this.notifyObservers(event);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["active"] = this.active;
            trace[Page.PARAMETER_DEFAULT_PAGE] = this.defaultPage;
            return trace;
        }
    }
}
