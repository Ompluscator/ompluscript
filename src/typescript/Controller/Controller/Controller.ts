/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/Observable.ts" />

module Ompluscript.Controller.Controller {
    "use strict";
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Observable = Ompluscript.Core.Observer.Observable;

    export abstract class Controller extends Observable implements IBase {

        /**
         * @type {string} PARAMETER_EVENTS Name of events parameter
         */
        public static PARAMETER_EVENTS: string = "events";

        /**
         * @type {string} PARAMETER_NAME Name of name parameter
         */
        public static PARAMETER_NAME: string = "name";

        /**
         * @type {string} PARAMETER_HANDLERS Name of handlers parameter
         */
        public static PARAMETER_HANDLERS: string = "handlers";

        private name: string;

        constructor(name: string) {
            super();
            this.name = name;
        }

        /**
         * Method that returns name of boject
         *
         * @returns {string} Object's name
         */
        public getName(): string {
            return this.name;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = {};
            trace[Controller.PARAMETER_NAME] = this.name;
            return trace;
        }
    }
}
