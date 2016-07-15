/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="TextInputConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="../../Field/EmailInput.ts" />
/// <reference path="../../../Model/Attribute/Attribute.ts" />
/// <reference path="../../../Model/Attribute/String.ts" />

module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Input = Ompluscript.View.Field.Input;
    import Component = Ompluscript.View.Component.Component;
    import String = Ompluscript.Model.Attribute.String;
    import EmailInput = Ompluscript.View.Field.EmailInput;

    export class EmailInputConfiguration extends TextInputConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === EmailInput.TYPE_EMAIL_INPUT;
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
            return new EmailInput(name, attribute, placeholder, styles);
        }
    }
}
