/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="ApplicationControllerEvent.ts" />

/**
 * Module that contains controller's events
 * 
 * @module Ompluscript.Controller.Event
 */
module Ompluscript.Controller.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines event when application has started
     * 
     * @class OnApplicationStart
     */
    export class OnApplicationStart extends ApplicationControllerEvent {

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @constructs
         */
        constructor(sender: IBase) {
            super(sender, ApplicationControllerEvent.ON_APPLICATION_START);
        }
    }
}
