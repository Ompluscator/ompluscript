/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../Controller/Controller.ts" />

/**
 * Module that contains controller' configuration classes.
 *
 * @module Ompluscript.Controller.Configuration.Controller
 */
module Ompluscript.Controller.Configuration.Controller {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
    import Controller = Ompluscript.Controller.Controller.Controller;

    /**
     * Abstract class that contains functionality for controller configuration.
     *
     * @class ControllerConfiguration
     */
    export abstract class ControllerConfiguration extends GroupConfiguration {

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
            errors.push(this.shouldBeObject(definition, Controller.PARAMETER_EVENTS));
            return this.filterErrors(errors);
        }
    }
}
