/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="../../Field/RadioInput.ts" />
/// <reference path="../../../Model/Attribute/Attribute.ts" />
/// <reference path="../../../Model/Attribute/Boolean.ts" />
/// <reference path="../../../Model/Configuration/Attribute/BooleanConfiguration.ts" />

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
    import RadioInput = Ompluscript.View.Field.RadioInput;
    import BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
    import Boolean = Ompluscript.Model.Attribute.Boolean;

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
                Configuration.getInstance(BooleanConfiguration),
            ];
            super(attributes, Boolean.TYPE_BOOLEAN);
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
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {String} attribute Instance of binding attribute
         * @returns {IBase} New instance
         */
        public create(definition: Object, attribute: Boolean = undefined): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            attribute = <Boolean>this.createAttribute(definition, attribute);
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new RadioInput(name, attribute, styles);
        }
    }
}
