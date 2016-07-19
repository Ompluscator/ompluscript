/// <reference path="TextContent.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";

    /**
     * Class that defines button field
     *
     * @class Button
     */
    export class Button extends TextContent {

        /**
         * @type {string} TYPE_BUTTON Type of button
         */
        public static TYPE_BUTTON: string = Button["name"];

        /**
         * @type {string} CLASS_BUTTON Class of HTML button element
         */
        public static CLASS_BUTTON: string = "button";

        /**
         * @type {string} ELEMENT_BUTTON HTML button element
         */
        public static ELEMENT_BUTTON: string = "button";

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
            this.addClass(Button.CLASS_BUTTON);
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Button.ELEMENT_BUTTON);
        }
    }
}
