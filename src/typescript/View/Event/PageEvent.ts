/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/Event.ts" />

/**
 * Module that contains view's events
 * 
 * @module Ompluscript.View.Event
 */
module Ompluscript.View.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Event = Ompluscript.Core.Observer.Event;

    /**
     * Abstract class that defines page's events
     * 
     * @class PageEvent
     */
    export abstract class PageEvent extends Event {

        /**
         * @type {string} ON_PAGE_LOAD Defines event when page is loaded
         */
        public static ON_PAGE_LOAD: string = "onPageLoad";

        /**
         * @type {string} ON_PAGE_CLOSE Defines event when page is closed
         */
        public static ON_PAGE_CLOSE: string = "onPageClose";

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {string} type Type of page event
         * @constructs
         */
        constructor(sender: IBase, type: string) {
            super(sender, type);
        }
    }

}
