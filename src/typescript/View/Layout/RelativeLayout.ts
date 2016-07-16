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
     * @class RelativeLayout
     */
    export class RelativeLayout extends Layout {

        /**
         * @type {string} TYPE_RELATIVE_LAYOUT Type of relative layout class
         */
        public static TYPE_RELATIVE_LAYOUT: string = RelativeLayout["name"];

        /**
         * @type {string} CLASS_RELATIVE_LAYOUT Class of HTML div element for relative layout
         */
        public static CLASS_RELATIVE_LAYOUT: string = "relative-layout";
 
        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @constructs
         */
        constructor() {
            super(RelativeLayout.TYPE_RELATIVE_LAYOUT);
            this.addClass(RelativeLayout.CLASS_RELATIVE_LAYOUT);
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
