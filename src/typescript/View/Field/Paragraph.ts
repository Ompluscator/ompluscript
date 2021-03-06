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
     * Class that defines paragraph field
     *
     * @class Paragraph
     */
    export class Paragraph extends TextContent {

        /**
         * @type {string} TYPE_PARAGRAPH Type of paragraph
         */
        public static TYPE_PARAGRAPH: string = "Paragraph";

        /**
         * @type {string} CLASS_PARAGRAPH Class of HTML paragraph element
         */
        public static CLASS_PARAGRAPH: string = "paragraph";

        /**
         * @type {string} ELEMENT_PARAGRAPH HTML paragraph element
         */
        public static ELEMENT_PARAGRAPH: string = "p";

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
            this.addClass(Paragraph.CLASS_PARAGRAPH);
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Paragraph.ELEMENT_PARAGRAPH);
        }

        /**
         * Method that should be called when class object should be cloned.
         */
        public clone(): IBase {
            return new Paragraph(this.name, this.text, this.styles);
        }
    }
}
