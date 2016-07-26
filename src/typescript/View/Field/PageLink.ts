/// <reference path="Link.ts" />
/// <reference path="../Event/FieldEvent.ts" />
/// <reference path="../Event/OnFieldClick.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";

    import FieldEvent = Ompluscript.View.Event.FieldEvent;
    import OnFieldClick = Ompluscript.View.Event.OnFieldClick;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines pages' link field
     *
     * @class Link
     */
    export class PageLink extends Link {

        /**
         * @type {string} TYPE_PAGE_LINK Type of page link
         */
        public static TYPE_PAGE_LINK: string = PageLink["name"];

        /**
         * @type {string} PARAMETER_PAGE Name of page parameter
         */
        public static PARAMETER_PAGE: string = "page";

        /**
         * @type {string} CLASS_LINK Class of HTML paragraph element
         */
        public static CLASS_LINK: string = "link";

        /**
         * @type {string} ELEMENT_LINK HTML link element
         */
        public static ELEMENT_LINK: string = "a";

        /**
         * @type {string} page Name of page
         */
        private page: string;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {string} text Text asset name
         * @param {string} page Name of page
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, text: string = undefined, page: string = undefined, styles: Object = {}) {
            super(name, text, page, styles);
            this.page = page;
            this.addClass(Link.CLASS_LINK);
            this.addObserverByType(this, FieldEvent.ON_FIELD_CLICK);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[PageLink.PARAMETER_PAGE] = this.page;
            return trace;
        }

        /**
         * Method that should be called when class object should be cloned.
         */
        public clone(): IBase {
            return new PageLink(this.name, this.text, this.page, this.styles);
        }

        /**
         * Method that handles linking for link field
         * 
         * @param {OEvent} event
         */
        protected handleLinking(event: OnFieldClick): void {
            event.preventDefault();
            window.history.pushState(false, this.page);
        }
    }
}
