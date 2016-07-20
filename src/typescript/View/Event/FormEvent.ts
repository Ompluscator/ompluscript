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
     * Abstract class that defines form's events
     *
     * @class FormEvent
     */
    export abstract class FormEvent extends OEvent {

        /**
         * @type {string} ON_FORM_SUBMIT Defines event when form is submitted
         */
        public static ON_FORM_SUBMIT: string = "onFormSubmit";

        /**
         * @type {string} ON_FORM_FAIL Defines event when form is failed
         */
        public static ON_FORM_FAIL: string = "onFormFail";

        /**
         * @type {Object} response Contains response for proxy
         */
        public response: Object;

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {string} type Type of page event
         * @param {Object} response Contains response for proxy
         * @constructs
         */
        constructor(sender: IBase, type: string, response: Object) {
            super(sender, type);
            this.response = response;
        }

        /**
         * Method that returns response for proxy
         * 
         * @returns {Object} response for proxy
         */
        public getResponse(): Object {
            return this.response;
        }
    }

}
