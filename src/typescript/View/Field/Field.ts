/// <reference path="../../Core/Interfaces/IBase.ts" />

/**
 * Module that contains model's events
 *
 * @module Ompluscript.View.Field
 */
    module Ompluscript.View.Field {
        "use strict";

        import IBase = Ompluscript.Core.Interfaces.IBase;

        /**
         * Class that defines basic field
         *
         * @class Field
         */
        export abstract class Field implements IBase {

                /**
                 * Method that returns name of boject
                 *
                 * @returns {string} Object's name
                 */
                public abstract getName(): string;

                /**
                 * Method that returns all current values of object.
                 *
                 * @returns {Object} contains all values of the object
                 */
                public abstract getStackTrace(): Object;

                /**
                 * Method that should be called before removing reference from object.
                 */
                public abstract dispose(): void;
                
        }

    }
