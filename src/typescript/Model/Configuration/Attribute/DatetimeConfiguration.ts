/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../../Attribute/Attribute.ts" />
/// <reference path="../../Attribute/Datetime.ts" />

/**
 * Module that contains attributes' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Attribute
 */
module Ompluscript.Model.Configuration.Attribute {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Datetime = Ompluscript.Model.Attribute.Datetime;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    /**
     * Class that contains functionality for datetime configuration.
     *
     * @class DatetimeConfiguration
     */
    export class DatetimeConfiguration extends AttributeConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Datetime.TYPE_DATETIME;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            let validMinimum: string = this.shouldBeDatetime(definition, Attribute.PARAMETER_MINIMUM);
            let validMaximum: string = this.shouldBeDatetime(definition, Attribute.PARAMETER_MAXIMUM);
            errors.push(validMinimum, validMaximum);
            if (validMinimum === undefined && validMaximum === undefined) {
                let minimum: Date = new Date(definition[Attribute.PARAMETER_MINIMUM]);
                let maximum: Date = new Date(definition[Attribute.PARAMETER_MAXIMUM]);
                if (minimum !== undefined && maximum !== undefined) {
                    errors.push(this.mustBeGreater(
                        definition, Attribute.PARAMETER_MINIMUM, Attribute.PARAMETER_MAXIMUM, minimum, maximum, true
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
            let value: string = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let minimum: string = definition[Attribute.PARAMETER_MINIMUM];
            let maximum: string = definition[Attribute.PARAMETER_MAXIMUM];
            return new Datetime(name, value, required, minimum, maximum);
        }
    }
}
