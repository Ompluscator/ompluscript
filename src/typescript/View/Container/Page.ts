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
    
    /**
     * Class that defines page
     *
     * @class Page
     */
        export class Page extends Container {

        /**
         * @type {string} TYPE_PAGE Type of page
         */
        public static TYPE_PAGE: string = Page["name"];

        /**
         * @type {string} CLASS_PAGE Class of HTML div element for page
         */
        public static CLASS_PAGE: string = "page";

        /**
         * @type {boolean} active Defines if page is currently visible
         */
        private active: boolean;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {string} name Name of container
         * @param {Layout} layout Layout for container
         * @param {Component[]} children List of children components
         * @param {Object} styles Styles for container
         * @constructs
         */
        constructor(name: string, layout: Layout = undefined, children: Component[] = undefined, styles: Object = undefined) {
            super(name, layout, children, styles);
            this.addClass(Page.CLASS_PAGE);
            this.addClass(name);
            this.active = false;
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
            return trace;
        }
    }
}
