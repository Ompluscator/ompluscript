/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/Event.ts" />

/**
 * Module that contains controller's events
 *
 * @module Ompluscript.Controller.Event
 */
module Ompluscript.Controller.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Event = Ompluscript.Core.Observer.Event;

    /**
     * Class that defines event when application has started
     *
     * @class OnApplicationStart
     */
    export abstract class ApplicationControllerEvent extends Event {

        /**
         * @type {string} ON_APPLICATION_START Defines event when application has started
         */
        public static ON_APPLICATION_START: string = "onApplicationStart";

        /**
         * @type {string} ON_COMPONENT_LOAD Defines event when component is loaded
         */
        public static ON_COMPONENT_LOAD: string = "onComponentLoad";

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {string} type Type of event
         * @constructs
         */
        constructor(sender: IBase, type: string) {
            super(sender, type);
        }
    }
}
