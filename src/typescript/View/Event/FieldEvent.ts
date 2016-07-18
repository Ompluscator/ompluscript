/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />

/**
 * Module that contains view's events
 *
 * @module Ompluscript.View.Event
 */
module Ompluscript.View.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import OEvent = Ompluscript.Core.Observer.OEvent;

    /**
     * Abstract class that defines field's events
     *
     * @class PageEvent
     */
    export abstract class FieldEvent extends OEvent {

        /**
         * @type {string} ON_FIELD_CLICK Defines event when it's clicked on field
         */
        public static ON_FIELD_CLICK: string = "onFieldClick";

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
