/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Attribute/Attribute.ts" />

/**
 * Module that contains attributes' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Attribute
 */
module Ompluscript.Model.Configuration.Attribute {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Attribute = Ompluscript.Model.Attribute.Attribute;

    /**
     * Class that contains base functionality for attribute configuration.
     *
     * @class AttributeConfiguration
     */
    export abstract class AttributeConfiguration extends Configuration {

        /**
         * Method that searches for errors in configuration
         * 
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
            errors.push(this.shouldBeBoolean(definition, Attribute.PARAMETER_REQUIRED));
            return this.filterErrors(errors);
        }
    }
}
