/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../../Attribute/Attribute.ts" />
/// <reference path="../../Attribute/String.ts" />

/**
 * Module that contains attributes' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Attribute
 */
module Ompluscript.Model.Configuration.Attribute {
    "use strict";

    import StringAttribute = Ompluscript.Model.Attribute.String;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    /**
     * Class that contains functionality for string configuration.
     *
     * @class StringConfiguration
     */
    export class StringConfiguration extends AttributeConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === StringAttribute.TYPE_STRING;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeNumber(definition, StringAttribute.PARAMETER_MINIMUM_LENGTH));
            errors.push(this.shouldBeNumber(definition, StringAttribute.PARAMETER_MAXIMUM_LENGTH));
            errors = this.filterErrors(errors);
            if (errors.length === 0) {
                let minimum: number = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
                let maximum: number = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
                let minimumKey: string = StringAttribute.PARAMETER_MINIMUM_LENGTH;
                let maximumKey: string = StringAttribute.PARAMETER_MAXIMUM_LENGTH;
                if (minimum !== undefined && maximum !== undefined) {
                    errors.push(this.mustBeGreater(
                        definition, minimumKey, maximumKey, minimum, maximum, true
                    ));
                }
            }
            errors.push(this.shouldBeRegex(definition, StringAttribute.PARAMETER_PATTERN));
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
            let value: string = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let minimumLength: number = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
            let maximumLength: number = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
            let pattern: RegExp = definition[StringAttribute.PARAMETER_PATTERN];
            return new StringAttribute(name, value, required, minimumLength, maximumLength, pattern);
        }
    }
}
