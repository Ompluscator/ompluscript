/// <reference path="IObserver.ts" />
/// <reference path="../Interfaces/IBase.ts" />

/**
 * Module that creates basic functionality for observing objects.
 *
 * @module Ompluscript.Core.Observer
 */
module Ompluscript.Core.Observer {
    "use strict";
    
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class for generic observer functionality
     *
     * @class GenericObserver
     */
    export class GenericObserver implements IObserver {

        /**
         * @type {IObserver} observer Observer that handles event
         */
        private observer: IBase;

        /**
         * @type {Function} callback Event handler
         */
        private callback: Function;

        /**
         * Class constructor
         * 
         * Sets observer and event handler;
         * 
         * @param {IObserver} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        constructor(observer: IBase, callback: Function) {
            this.observer = observer;
            this.callback = callback;
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {OEvent} event
         */
        public update(event: OEvent): void {
            this.callback.bind(this.observer)(event);
        }

    }

}
