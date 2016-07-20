/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="FormEvent.ts" />

/**
 * Module that contains view's events
 * 
 * @module Ompluscript.View.Event
 */
module Ompluscript.View.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines event when form is failed
     * 
     * @class OnFormFail
     */
    export class OnFormFail extends FormEvent {

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {Object} response Contains response for proxy
         * @constructs
         */
        constructor(sender: IBase, response: Object) {
            super(sender, FormEvent.ON_FORM_FAIL, response);
        }
    }
}
