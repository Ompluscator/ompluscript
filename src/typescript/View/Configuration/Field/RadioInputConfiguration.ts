/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/RadioInput.ts" />
/// <reference path="../../../Model/Attribute/Attribute.ts" />
/// <reference path="../../../Model/Attribute/SingleChoice.ts" />
/// <reference path="../../../Model/Configuration/Attribute/SingleChoiceConfiguration.ts" />

/**
 * Module that contains fields' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Field
 */
module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import RadioInput = Ompluscript.View.Field.RadioInput;
    import SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
    import SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    /**
     * Class that contains functionality for radio input configuration.
     *
     * @class RadioInputConfiguration
     */
    export class RadioInputConfiguration extends InputConfiguration {

        /**
         * Class constructor.
         *
         * Sets attributes and calls superclass constructor.
         *
         * @constructs
         */
        constructor() {
            let attributes: Configuration[] = [
                Configuration.getInstance(SingleChoiceConfiguration),
            ];
            super(attributes, SingleChoice.TYPE_SINGLE_CHOICE);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === RadioInput.TYPE_RADIO_INPUT;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.mustBeNumber(definition, RadioInput.PARAMETER_VALUE));
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {String} attribute Instance of binding attribute
         * @returns {IBase} New instance
         */
        public create(definition: Object, attribute: SingleChoice = undefined): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            attribute = <SingleChoice>this.createAttribute(definition, attribute);
            let value: number = definition[RadioInput.PARAMETER_VALUE];
            let styles: Object = definition[Component.PARAMETER_STYLES];
            return new RadioInput(name, attribute, value, styles);
        }
    }
}
