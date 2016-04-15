/**
 * Module that contains utils' classes.
 *
 * @module Ompluscript.Core.Utils
 */
module Ompluscript.Core.Utils {
    "use strict";

    /**
     * Class that contains utils' methods.
     *
     * @class General
     */
    export class General {

        /**
         * 
         * @type {number} ERROR_WRONG_CONFIGURATION Defines error code for wrong configuration.
         */
        public static ERROR_WRONG_CONFIGURATION: number = 1;

        /**
         * Method that throws an error when variables are configured incorrectly.
         * 
         * @param {Function} classType Class that send request for error
         * @param {Object} variables Variables that are set incorrectly
         * @throws {SyntaxError} Rise syntax error for wrong configuration
         */
        public static throwConfigurationException(classType: Function, variables: Object): void {
            let parameters: Object = {
                classType: classType["name"],
                code: General.ERROR_WRONG_CONFIGURATION,
                variables: variables,
            };
            General.throwException(SyntaxError, parameters);
        }

        /**
         * Method that throws an desired error controlled by system
         * 
         * @param {Function} errorType Error class that should be risen
         * @param {Function} classType Class that send request for error
         * @param {string} objectName Variable that causes an error
         * @param {number} code Error code
         * @throws {Error} Rise controlled error
         */
        public static throwControlledException(errorType: Function, classType: Function, objectName: string, code: number): void {
            let parameters: Object = {
                classType: classType["name"],
                code: code,
                objectName: objectName,
            };
            General.throwException(errorType, parameters);
        }

        /**
         * Method that throws desired error with parameters as JSON message
         * 
         * @param {Function} errorType Error class that should be risen
         * @param {Object} parameters Parameters that should be passed as error string
         * @throws {Error} Rise error
         */
        private static throwException(errorType: Function, parameters: Object): void {
            let error: Error = Object.create(errorType.prototype);
            error["message"] = JSON.stringify(parameters);
            throw error;
        }

    }
}
