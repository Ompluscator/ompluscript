/// <reference path="OEvent.ts" />

/**
 * Module that creates basic functionality for observing objects.
 *
 * @module Ompluscript.Core.Observer
 */
module Ompluscript.Core.Observer {
    "use strict";

    /**
     * Interface that defines basi observer
     *
     * @interface IObserver
     */
    export interface IObserver {

        /**
         * Method that defines event handler for desired event.
         * 
         * @param {OEvent} event
         */
        update(event: OEvent): void;
        
    }

}
