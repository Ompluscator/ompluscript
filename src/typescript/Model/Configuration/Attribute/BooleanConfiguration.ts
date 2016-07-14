/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../../Attribute/Attribute.ts" />
/// <reference path="../../Attribute/Boolean.ts" />

/**
 * Module that contains attributes' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Attribute
 */
module Ompluscript.Model.Configuration.Attribute {
    "use strict";

    import BooleanAttribute = Ompluscript.Model.Attribute.Boolean;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    /**
     * Class that contains functionality for boolean configuration.
     *
     * @class BooleanConfiguration
     */
    export class BooleanConfiguration extends AttributeConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         * 
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === BooleanAttribute.TYPE_BOOLEAN;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeBoolean(definition, BooleanAttribute.PARAMETER_MUST_BE_TRUE));
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         * 
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let value: boolean = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let mustBeTrue: boolean = definition[BooleanAttribute.PARAMETER_MUST_BE_TRUE];
            return new BooleanAttribute(name, value, required, mustBeTrue);
        }
    }
}
