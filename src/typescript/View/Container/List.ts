/// <reference path="Container.ts" />
/// <reference path="../Component/Component.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";

    import Component = Ompluscript.View.Component.Component;

    /**
     * Class that defines list
     *
     * @class List
     */
    export class List extends Container {

        /**
         * @type {string} TYPE_LIST Type of list
         */
        public static TYPE_LIST: string = List["name"];

        /**
         * @type {string} PARAMETER_LIST Name of list parameter
         */
        public static PARAMETER_LIST: string = "list";

        /**
         * @type {string} LIST_ORDERED Defines ordered list
         */
        public static LIST_ORDERED: string = "ordered";

        /**
         * @type {string} LIST_UNORDERED Defines unordered list
         */
        public static LIST_UNORDERED: string = "unordered";

        /**
         * @type {string} LIST_NONE Defines list without special representation
         */
        public static LIST_NONE: string = "none";

        /**
         * @type {string} CLASS_LIST Class of HTML ul element
         */
        public static CLASS_LIST: string = "list";

        /**
         * @type {string} ELEMENT_LIST Element of HTML ul element
         */
        public static ELEMENT_LIST: string = "ul";

        /**
         * @type {string} ELEMENT_LIST_ITEM Element of HTML li element
         */
        public static ELEMENT_LIST_ITEM: string = "li";

        /**
         * @type {string} list Type of list
         */
        private list: string;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {string} name Name of container
         * @param {string} list Type of list
         * @param {Component[]} children List of children components
         * @param {Object} styles Styles for container
         * @constructs
         */
        constructor(name: string, list: string = List.LIST_UNORDERED, children: Component[] = undefined, styles: Object = undefined) {
            super(name, undefined, children, styles);
            this.list = list;
            this.addClass(List.CLASS_LIST);
            this.addClass(list);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            delete trace[List.PARAMETER_LAYOUT];
            trace[List.PARAMETER_LIST] = this.list;
            return trace;
        }

        /**
         * Method that returns HTML content of component
         *
         * @returns {HTMLElement} HTML content of component
         */
        public render(): HTMLElement {
            this.clear();
            for (let i: number = 0; i < this.children.length; i++) {
                this.appendChild(this.children[i]);
            }
            return this.htmlElement;
        }

        /**
         * Method that defines how component's HTML content should be added to DOM
         *
         * @param {Component} component That should be added
         */
        protected appendChild(component: Component): void {
            let element: HTMLElement = document.createElement(List.ELEMENT_LIST_ITEM);
            element.appendChild(component.render());
            this.htmlElement.appendChild(element);
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(List.ELEMENT_LIST);
        }
    }
}
