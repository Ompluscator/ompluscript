/// <reference path="TextContent.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines image field
     *
     * @class Image
     */
    export class Image extends TextContent {

        /**
         * @type {string} TYPE_IMAGE Type of image
         */
        public static TYPE_IMAGE: string = "Image";

        /**
         * @type {string} PARAMETER_SOURCE Name of source parameter
         */
        public static PARAMETER_SOURCE: string = "source";

        /**
         * @type {string} CLASS_IMAGE Class of HTML image element
         */
        public static CLASS_IMAGE: string = "image";

        /**
         * @type {string} ELEMENT_IMAGE HTML image element
         */
        public static ELEMENT_IMAGE: string = "img";

        /**
         * @type {string} ATTRIBUTE_SRC HTML attribute for image source
         */
        public static ATTRIBUTE_SRC: string = "src";

        /**
         * @type {string} ATTRIBUTE_TITLE HTML attribute for image title
         */
        public static ATTRIBUTE_TITLE: string = "title";

        /**
         * @type {string} ATTRIBUTE_ALT HTML attribute for image alt
         */
        public static ATTRIBUTE_ALT: string = "alt";

        /**
         * @type {string} source Source of image
         */
        private source: string;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {string} source Source of image
         * @param {string} text Text asset name
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, source: string, text: string = undefined, styles: Object = {}) {
            super(name, text, styles);
            this.addClass(Image.CLASS_IMAGE);
            this.source = source;
            this.setAttribute(Image.ATTRIBUTE_SRC, this.source);
        }

        /**
         * Method that should be called when class object should be cloned.
         */
        public clone(): IBase {
            return new Image(this.name, this.source, this.text, this.styles);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[Image.PARAMETER_SOURCE] = this.source;
            return trace;
        }

        /**
         * Method that sets value for text HTML content
         *
         * @param {string} value for text HTML content
         */
        protected updateText(value: string): void {
            this.textContent = value;
            this.setAttribute(Image.ATTRIBUTE_ALT, this.getTextContent());
            this.setAttribute(Image.ATTRIBUTE_TITLE, this.getTextContent());
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Image.ELEMENT_IMAGE);
        }
    }
}
