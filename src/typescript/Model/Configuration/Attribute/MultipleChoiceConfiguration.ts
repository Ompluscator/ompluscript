/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="ChoiceConfiguration.ts" />
/// <reference path="../../Attribute/Attribute.ts" />
/// <reference path="../../Attribute/Choice.ts" />
/// <reference path="../../Attribute/MultipleChoice.ts" />

/**
 * Module that contains attributes' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Attribute
 */
module Ompluscript.Model.Configuration.Attribute {
    "use strict";

    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Choice = Ompluscript.Model.Attribute.Choice;
    import MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    /**
     * Class that contains functionality for multiple choice configuration.
     *
     * @class MultipleChoiceConfiguration
     */
    export class MultipleChoiceConfiguration extends ChoiceConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === MultipleChoice.TYPE_MULTIPLE_CHOICE;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            return this.filterErrors(super.getErrors(definition));
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let value: number[] = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let choices: number[] = definition[Choice.PARAMETER_CHOICES];
            return new MultipleChoice(name, value, required, choices);
        }
    }
}
