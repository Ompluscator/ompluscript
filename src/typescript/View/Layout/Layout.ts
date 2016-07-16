/// <reference path="../Component/Component.ts" />

/**
 * Module that contains layout classes
 *
 * @module Ompluscript.View.Layout
 */
module Ompluscript.View.Layout {
    "use strict";
    
    import Component = Ompluscript.View.Component.Component;

    /**
     * Abstract class that defines basic layout functionality
     *
     * @class Layout
     */
    export abstract class Layout extends Component {

        /**
         * @type {string} PARAMETER_CHILDREN HTML div element
         */
        public static PARAMETER_CHILDREN: string = "children";

        /**
         * @type {string} ELEMENT_DIV HTML div element
         */
        public static ELEMENT_DIV: string = "div";

        /**
         * @type {string} CLASS_LAYOUT Class of HTML div element for layout
         */
        public static CLASS_LAYOUT: string = "layout";

        /**
         * @type {Component[]} children List of all containing components
         */
        protected children: Component[];

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name
         * @param {Object} styles
         * @constructs
         */
        constructor(name: string, styles: Object = undefined) {
            super(name, styles);
            this.children = [];
            this.addClass(Layout.CLASS_LAYOUT);
        }

        /**
         * Method that add new componenet into the list.
         *
         * @param {Component} component
         */
        public addChild(component: Component): void {
            this.children.push(component);
        }

        /**
         * Method that removes component from the list.
         *
         * @param {Component} component
         */
        public removeChild(component: Component): void {
            let index: number = this.children.indexOf(component);
            if (index > -1) {
                this.children.splice(index, 1);
            }
        }

        /**
         * Method that returns number of components in list
         *
         * @returns {number} number of components in list
         */
        public getChildrenCount(): number {
            return this.children.length;
        }

        /**
         * Method that clears the list of components
         */
        public clearChildren(): void {
            this.children = [];
        }

        /**
         * Method that returns HTML content of component
         *
         * @returns {HTMLElement} HTML content of component
         */
        public render(): HTMLElement {
            this.clear();
            for (let i: number = 0; i < this.children.length; i++) {
                if (this.children[i] !== undefined) {
                    this.appendChild(this.children[i]);
                }
            }
            return this.htmlElement;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[Layout.PARAMETER_CHILDREN] = [];
            for (let i: number = 0; i < this.children.length; i++) {
                trace[Layout.PARAMETER_CHILDREN].push(this.children[i].getStackTrace());
            }
            return trace;
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Layout.ELEMENT_DIV);
        }

        /**
         * Method that defines how component's HTML content should be added to DOM
         *
         * @param {Component} component That should be added
         */
        protected abstract appendChild(component: Component): void;

        /**
         * Method that defines how component's HTML content should be cleared
         */
        protected abstract clear(): void;
    }
}
