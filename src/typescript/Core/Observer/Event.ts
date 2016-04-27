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
     * Class that contains basic functionality for events.
     *
     * @class Event
     */
    export abstract class Event {

        /**
         * @type {IBase} sender Object that fired event
         */
        protected sender: IBase;

        /**
         * @type {string} type Type of event
         */
        protected type: string;

        /**
         * Class constructor
         *
         * Sets sender object and type of event
         *
         * @param {IBase} sender Object that fired event
         * @param {string} type Type of event
         * @constructs
         */
        constructor(sender: IBase, type: string) {
            this.sender = sender;
            this.type = type;
        }

        /**
         * Method that returns object that fired event
         * 
         * @return {IBase} Object that fired event
         */
        public getSender(): IBase {
            return this.sender;
        }

        /**
         * Method that returns type of event
         * 
         * @return {string} Type of event
         */
        public getType(): string {
            return this.type;
        }
        
    }

}
