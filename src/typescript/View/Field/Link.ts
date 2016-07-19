/// <reference path="TextContent.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />
/// <reference path="../Event/OnFieldClick.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    import OnFieldClick = Ompluscript.View.Event.OnFieldClick;
    import OEvent = Ompluscript.Core.Observer.OEvent;

    /**
     * Class that defines link field
     *
     * @class Link
     */
    export abstract class Link extends TextContent {

        /**
         * @type {string} CLASS_LINK Class of HTML paragraph element
         */
        public static CLASS_LINK: string = "link";

        /**
         * @type {string} ELEMENT_LINK HTML link element
         */
        public static ELEMENT_LINK: string = "a";

        /**
         * @type {string} ATTRIBUTE_HREF HTML href attribute
         */
        public static ATTRIBUTE_HREF: string = "href";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {string} text Text asset name
         * @param {string} href Value for link
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, text: string = undefined, href: string, styles: Object = {}) {
            super(name, text, styles);
            this.addClass(Link.CLASS_LINK);
            this.setAttribute(Link.ATTRIBUTE_HREF, href);
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {OEvent} event
         */
        public update(event: OEvent): void {
            super.update(event);
            if (event instanceof OnFieldClick) {
                this.handleLinking(<OnFieldClick>event);
            }
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Link.ELEMENT_LINK);
        }

        /**
         * Method that handles linking for link field
         * 
         * @param {OEvent} event
         */
        protected abstract handleLinking(event: OnFieldClick): void;
    }
}
