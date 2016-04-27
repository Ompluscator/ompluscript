/**
 * Module that contains core's interfaces.
 *
 * @module Ompluscript.Core.Interfaces
 */
module Ompluscript.Core.Interfaces {
    "use strict";

    /**
     * Interface that defines all classes.
     *
     * @interface IBase
     */
    export interface IBase {

        /**
         * Method that returns name of boject
         *
         * @returns {string} Object's name
         */
        getName(): string;

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        getStackTrace(): Object;

        /**
         * Method that should be called before removing reference from object.
         */
        dispose(): void;
    }
}
