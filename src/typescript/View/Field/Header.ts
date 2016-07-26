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
     * Class that defines header field
     *
     * @class Header
     */
    export class Header extends TextContent {

        /**
         * @type {string} TYPE_HEADER Type of header
         */
        public static TYPE_HEADER: string = Header["name"];

        /**
         * @type {string} PARAMETER_LEVEL Name of level parameter
         */
        public static PARAMETER_LEVEL: string = "level";

        /**
         * @type {string} LEVEL_FIRST First level of header
         */
        public static LEVEL_FIRST: string = "1";

        /**
         * @type {string} LEVEL_SECOND Second level of header
         */
        public static LEVEL_SECOND: string = "2";

        /**
         * @type {string} LEVEL_THIRD Third level of header
         */
        public static LEVEL_THIRD: string = "3";

        /**
         * @type {string} LEVEL_FOURTH Fourth level of header
         */
        public static LEVEL_FOURTH: string = "4";

        /**
         * @type {string} LEVEL_FIFTH Fifth level of header
         */
        public static LEVEL_FIFTH: string = "5";

        /**
         * @type {string} LEVEL_SIXTH Sixth level of header
         */
        public static LEVEL_SIXTH: string = "6";

        /**
         * @type {string} CLASS_HEADER Class of HTML header element
         */
        public static CLASS_HEADER: string = "header";

        /**
         * @type {string} ELEMENT_HEADER HTML header element
         */
        public static ELEMENT_HEADER: string = "h";

        /**
         * @type {string} level Defines level of header
         */
        private level: string;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {string} text Text asset name
         * @param {string} level Level of header
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, text: string = undefined, level: string = Header.LEVEL_FIRST, styles: Object = {}) {
            super(Header.ELEMENT_HEADER + level, text, styles);
            this.name = name;
            this.level = level;
            this.addClass(Header.CLASS_HEADER);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[Header.PARAMETER_LEVEL] = this.level;
            return trace;
        }

        /**
         * Method that should be called when class object should be cloned.
         */
        public clone(): IBase {
            return new Header(this.name, this.text, this.level, this.styles);
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(this.name);
        }
    }
}
