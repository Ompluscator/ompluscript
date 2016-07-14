/// <reference path="IBase.ts" />

/**
 * Module that contains core's interfaces.
 *
 * @module Ompluscript.Core.Interfaces
 */
module Ompluscript.Core.Interfaces {
    "use strict";

    /**
     * Interface that defines all clonable classes.
     *
     * @interface IClonable
     */
    export interface ICloneable {

        /**
         * Method that should be called when class object should be cloned.
         */
        clone(): IBase;
    }
}
