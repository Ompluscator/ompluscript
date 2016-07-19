/// <reference path="TextContent.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";

    /**
     * Class that defines paragraph field
     *
     * @class Label
     */
    export class Label extends TextContent {

        /**
         * @type {string} TYPE_LABEL Type of label
         */
        public static TYPE_LABEL: string = Label["name"];

        /**
         * @type {string} CLASS_LABEL Class of HTML label element
         */
        public static CLASS_LABEL: string = "label";

        /**
         * @type {string} ELEMENT_LABEL HTML label element
         */
        public static ELEMENT_LABEL: string = "label";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {string} text Text asset name
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, text: string = undefined, styles: Object = {}) {
            super(name, text, styles);
            this.addClass(Label.CLASS_LABEL);
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Label.ELEMENT_LABEL);
        }
    }
}
