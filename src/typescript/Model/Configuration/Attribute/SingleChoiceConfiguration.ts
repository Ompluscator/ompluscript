/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="ChoiceConfiguration.ts" />
/// <reference path="../../Attribute/Attribute.ts" />
/// <reference path="../../Attribute/Choice.ts" />
/// <reference path="../../Attribute/SingleChoice.ts" />

/**
 * Module that contains attributes' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Attribute
 */
module Ompluscript.Model.Configuration.Attribute {
    "use strict";

    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Choice = Ompluscript.Model.Attribute.Choice;
    import SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    /**
     * Class that contains functionality for single choice configuration.
     *
     * @class SingleChoiceConfiguration
     */
    export class SingleChoiceConfiguration extends ChoiceConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === SingleChoice.TYPE_SINGLE_CHOICE;
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
            let choices: number[] = definition[Choice.PARAMETER_CHOICES];
            return new SingleChoice(name, value, required, choices);
        }
    }
}
