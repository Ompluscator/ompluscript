/// <reference path="Layout.ts" />

/**
 * Module that contains layout components
 *
 * @module Ompluscript.View.Layout
 */
module Ompluscript.View.Layout {
    "use strict";

    /**
     * Class that defines null layout functionality
     *
     * @class NullLayout
     */
    export class NullLayout extends Layout {

        /**
         * @type {string} TYPE_NULL_LAYOUT Type of null layout class
         */
        public static TYPE_NULL_LAYOUT: string = NullLayout["name"];

        /**
         * @type {string} CLASS_NULL_LAYOUT Class of HTML div element for null layout
         */
        public static CLASS_NULL_LAYOUT: string = "null-layout";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         * 
         * @constructs
         */
        constructor() {
            super(NullLayout.TYPE_NULL_LAYOUT);
            this.addClass(NullLayout.CLASS_NULL_LAYOUT);
        }

        /**
         * Method that defines how component's HTML content should be added to DOM
         *
         * @param {Component} component That should be added
         */
        protected appendChild(component: Ompluscript.View.Component.Component): void {
            this.htmlElement.appendChild(component.render());
        }

        /**
         * Method that defines how component's HTML content should be cleared
         */
        protected clear(): void {
            while (this.htmlElement.firstChild) {
                this.htmlElement.removeChild(this.htmlElement.firstChild);
            }
        }
    }
}
