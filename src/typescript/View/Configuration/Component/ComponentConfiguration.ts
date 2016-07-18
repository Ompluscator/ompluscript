/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />

/**
 * Module that contains component' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Component
 */
module Ompluscript.View.Configuration.Component {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Component = Ompluscript.View.Component.Component;
    import GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;

    /**
     * Abstract class that contains functionality for component configuration.
     *
     * @class ComponentConfiguration
     */
    export abstract class ComponentConfiguration extends GroupConfiguration {

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
            errors.push(this.shouldBeObject(definition, Component.PARAMETER_STYLES));
            return this.filterErrors(errors);
        }
    }
}
