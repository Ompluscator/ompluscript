/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="PageEvent.ts" />

/**
 * Module that contains view's events
 * 
 * @module Ompluscript.View.Event
 */
module Ompluscript.View.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines event when page is loaded
     * 
     * @class OnPageLoad
     */
    export class OnPageLoad extends PageEvent {

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @constructs
         */
        constructor(sender: IBase) {
            super(sender, PageEvent.ON_PAGE_LOAD);
        }
    }

}
