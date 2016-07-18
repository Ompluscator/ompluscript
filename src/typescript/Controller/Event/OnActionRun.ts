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
     * Class that defines event when action is run
     * 
     * @class OnActionRun
     */
    export class OnActionRun extends Event {

        /**
         * @type {string} ON_ACTION_RUN Defines event when action is run
         */
        public static ON_ACTION_RUN: string = "onActionRun";

        private action: string;

        private parameters: Object;

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @constructs
         */
        constructor(sender: IBase, action: string, parameters: Object) {
            super(sender, OnActionRun.ON_ACTION_RUN);
            this.action = action;
            this.parameters = parameters;
        }


        public getAction(): string {
            return this.action;
        }

        public getParameters(): Object {
            return this.parameters;
        }
    }

}
