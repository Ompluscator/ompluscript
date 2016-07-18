/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />

/**
 * Module that contains model's events
 * 
 * @module Ompluscript.Model.Event
 */
module Ompluscript.View.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import OEvent = Ompluscript.Core.Observer.OEvent;

    /**
     * Class that defines event when input is updated
     * 
     * @class OnUpdateInputEvent
     */
    export class OnUpdateInput extends OEvent {

        /**
         * @type {string} ON_UPDATE_INPUT Defines event when input is updated
         */
        public static ON_UPDATE_INPUT: string = "onUpdateInput";

        protected value: any;

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {any} value Value of input
         * @constructs
         */
        constructor(sender: IBase, value: any) {
            super(sender, OnUpdateInput.ON_UPDATE_INPUT);
            this.value = value;
        }

        public getValue(): any {
            return this.value;
        }
    }

}
