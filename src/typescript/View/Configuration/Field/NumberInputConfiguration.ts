/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="../../Field/NumberInput.ts" />
/// <reference path="../../../Model/Attribute/Attribute.ts" />
/// <reference path="../../../Model/Attribute/String.ts" />
/// <reference path="../../../Model/Configuration/Attribute/NumberConfiguration.ts" />

/**
 * Module that contains fields' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Field
 */
module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Input = Ompluscript.View.Field.Input;
    import Component = Ompluscript.View.Component.Component;
    import NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
    import Number = Ompluscript.Model.Attribute.Number;
    import NumberInput = Ompluscript.View.Field.NumberInput;

    /**
     * Class that contains functionality for number input configuration.
     *
     * @class NumberInputConfiguration
     */
    export class NumberInputConfiguration extends InputConfiguration {

        /**
         * Class constructor.
         *
         * Sets attributes and calls superclass constructor.
         *
         * @constructs
         */
        constructor() {
            let attributes: Configuration[] = [
                Configuration.getInstance(NumberConfiguration),
            ];
            super(attributes, Number.TYPE_NUMBER);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === NumberInput.TYPE_NUMBER_INPUT;
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
         * @param {String} attribute Instance of binding attribute
         * @returns {IBase} New instance
         */
        public create(definition: Object, attribute: Number = undefined): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            attribute = <Number>this.createAttribute(definition, attribute);
            let placeholder: string = definition[Input.PARAMETER_PLACEHOLDER];
            let styles: Object = definition[Component.PARAMETER_STYLES];
            return new NumberInput(name, attribute, placeholder, styles);
        }
    }
}
