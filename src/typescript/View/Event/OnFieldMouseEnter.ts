/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="FieldEvent.ts" />

/**
 * Module that contains view's events
 * 
 * @module Ompluscript.View.Event
 */
module Ompluscript.View.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines event when mouse is entering on field
     * 
     * @class OnFieldMouseEnter
     */
    export class OnFieldMouseEnter extends FieldEvent {

        /**
         * @type {OEvent} event Original event
         */
        private event: Event;

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {OEvent} event Original event
         * @constructs
         */
        constructor(sender: IBase, event: Event) {
            super(sender, FieldEvent.ON_FIELD_MOUSE_ENTER);
            this.event = event;
        }

        /**
         * Method that prevents default click functionality.
         */
        public preventDefault(): void {
            this.event["preventDefault"]();
        }
    }

}
