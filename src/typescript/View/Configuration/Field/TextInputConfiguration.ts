/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="../../Field/TextInput.ts" />
/// <reference path="../../../Model/Attribute/Attribute.ts" />
/// <reference path="../../../Model/Attribute/String.ts" />
/// <reference path="../../../Model/Configuration/Attribute/StringConfiguration.ts" />

/**
 * Module that contains fields' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Field
 */
module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import TextInput = Ompluscript.View.Field.TextInput;
    import Input = Ompluscript.View.Field.Input;
    import Component = Ompluscript.View.Component.Component;
    import StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
    import String = Ompluscript.Model.Attribute.String;

    /**
     * Class that contains functionality for text input configuration.
     *
     * @class TextInputConfiguration
     */
    export class TextInputConfiguration extends InputConfiguration {

        /**
         * Class constructor.
         * 
         * Sets attributes and calls superclass constructor.
         * 
         * @constructs
         */
        constructor() {
            let attributes: Object[] = [
                StringConfiguration,
            ];
            super(attributes, String.TYPE_STRING);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === TextInput.TYPE_TEXT_INPUT;
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
        public create(definition: Object, attribute: String = undefined): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            attribute = <String>this.createAttribute(definition, attribute);
            let placeholder: string = definition[Input.PARAMETER_PLACEHOLDER];
            let styles: Object = definition[Component.PARAMETER_STYLES];
            return new TextInput(name, attribute, placeholder, styles);
        }
    }
}
