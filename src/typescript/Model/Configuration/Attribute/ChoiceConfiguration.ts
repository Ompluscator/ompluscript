/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../../Attribute/Choice.ts" />

/**
 * Module that contains attributes' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Attribute
 */
module Ompluscript.Model.Configuration.Attribute {
    "use strict";

    import Choice = Ompluscript.Model.Attribute.Choice;

    /**
     * Class that contains functionality for choice configuration.
     *
     * @class ChoiceConfiguration
     */
    export abstract class ChoiceConfiguration extends AttributeConfiguration {

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeArray(definition, Choice.PARAMETER_CHOICES));
            return this.filterErrors(errors);
        }
    }
}
