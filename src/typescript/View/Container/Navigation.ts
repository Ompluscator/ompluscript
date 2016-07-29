/// <reference path="Container.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Field/Button.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";
    
    import Component = Ompluscript.View.Component.Component;
    import Button = Ompluscript.View.Field.Button;
    
    /**
     * Class that defines navigation
     *
     * @class Navigation
     */
        export class Navigation extends Container {

        /**
         * @type {string} TYPE_NAVIGATION Type of navigation
         */
        public static TYPE_NAVIGATION: string = "Navigation";

        /**
         * @type {string} ELEMENT_NAV HTML nav element
         */
        public static ELEMENT_NAV: string = "nav";

        /**
         * @type {string} CLASS_NAVIGATION Class of HTML nav element for navigation
         */
        public static CLASS_NAVIGATION: string = "navigation";

        /**
         * @type {string} CLASS_ACTIVE_NAVIGATION Class of HTML nav element for active mobile navigation
         */
        public static CLASS_ACTIVE_NAVIGATION: string = "active";

        /**
         * @type {string} CLASS_NAVIGATION_ELEMENT Class of HTML navigation element
         */
        public static CLASS_NAVIGATION_ELEMENT: string = "navigation-element";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {Component[]} children List of children components
         * @param {Object} styles Styles for container
         * @constructs
         */
        constructor(children: Component[] = [], styles: Object = undefined) {
            let button: Button = new Button(Navigation.CLASS_NAVIGATION);
            children.push(button);
            for (let i: number = 0; i < children.length; i++) {
                children[i].addClass(Navigation.CLASS_NAVIGATION_ELEMENT);
            }
            super(Navigation.TYPE_NAVIGATION, undefined, children, styles);
            this.addClass(Navigation.CLASS_NAVIGATION);
            this.addClass(name);
            button.attachOnFieldClickEvent(this, this.toggleMobileNavigation);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            delete trace[List.PARAMETER_LAYOUT];
            return trace;
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Navigation.ELEMENT_NAV);
        }

        private toggleMobileNavigation(): void {
            for (let i: number = 0; i < this.children.length - 1; i++) {
                this.getParent().toggleClass(Navigation.CLASS_ACTIVE_NAVIGATION);
            }
        }
    }
}
