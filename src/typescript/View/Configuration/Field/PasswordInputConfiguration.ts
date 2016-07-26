/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="TextInputConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="../../Field/PasswordInput.ts" />
/// <reference path="../../../Model/Attribute/Attribute.ts" />
/// <reference path="../../../Model/Attribute/String.ts" />

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
    import String = Ompluscript.Model.Attribute.String;
    import PasswordInput = Ompluscript.View.Field.PasswordInput;

    /**
     * Class that contains functionality for password input configuration.
     *
     * @class PasswordInputConfiguration
     */
    export class PasswordInputConfiguration extends TextInputConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === PasswordInput.TYPE_PASSWORD_INPUT;
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
            let passwordInput: PasswordInput = new PasswordInput(name, attribute, placeholder, styles);
            this.attachEvents(definition, passwordInput);
            return passwordInput;
        }
    }
}
