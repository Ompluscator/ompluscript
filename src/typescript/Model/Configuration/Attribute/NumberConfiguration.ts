/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../../Attribute/Attribute.ts" />
/// <reference path="../../Attribute/Number.ts" />

/**
 * Module that contains attributes' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Attribute
 */
module Ompluscript.Model.Configuration.Attribute {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import NumberAttribute = Ompluscript.Model.Attribute.Number;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    /**
     * Class that contains functionality for number configuration.
     *
     * @class NumberConfiguration
     */
    export class NumberConfiguration extends AttributeConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === NumberAttribute.TYPE_NUMBER;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeNumber(definition, Attribute.PARAMETER_MINIMUM));
            errors.push(this.shouldBeNumber(definition, Attribute.PARAMETER_MAXIMUM));
            errors.push(this.shouldBeBoolean(definition, NumberAttribute.PARAMETER_INCLUDE_MINIMUM));
            errors.push(this.shouldBeBoolean(definition, NumberAttribute.PARAMETER_INCLUDE_MAXIMUM));
            errors = this.filterErrors(errors);
            if (errors.length === 0) {
                let minimum: number = definition[Attribute.PARAMETER_MINIMUM];
                let maximum: number = definition[Attribute.PARAMETER_MAXIMUM];
                let include: boolean = definition[NumberAttribute.PARAMETER_INCLUDE_MINIMUM] &&
                    definition[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
                if (minimum !== undefined && maximum !== undefined) {
                    errors.push(this.mustBeGreater(
                        definition, Attribute.PARAMETER_MINIMUM, Attribute.PARAMETER_MAXIMUM, minimum, maximum, include
                    ));
                }
            }
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
            let value: number = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let minimum: number = definition[Attribute.PARAMETER_MINIMUM];
            let includeMinimum: boolean = definition[NumberAttribute.PARAMETER_INCLUDE_MINIMUM];
            let maximum: number = definition[Attribute.PARAMETER_MAXIMUM];
            let includeMaximum: boolean = definition[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
            return new NumberAttribute(name, value, required, minimum, includeMinimum, maximum, includeMaximum);
        }
    }
}
