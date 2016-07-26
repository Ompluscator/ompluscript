/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="Configuration.ts" />

/**
 * Module that contains base configuration classes.
 *
 * @module Ompluscript.Core.Configuration
 */
module Ompluscript.Core.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that contains base functionality for undefined type configuration.
     *
     * @class ErrorConfiguration
     */
    export class ErrorConfiguration extends Configuration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return true;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            return [Configuration.IS_WRONG_CONFIGURATION];
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            return undefined;
        }
    }
}
