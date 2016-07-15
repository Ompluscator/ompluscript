/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="../../Field/DateInput.ts" />
/// <reference path="../../../Model/Attribute/Attribute.ts" />
/// <reference path="../../../Model/Attribute/Datetime.ts" />
/// <reference path="../../../Model/Configuration/Attribute/DatetimeConfiguration.ts" />

/**
 * Module that contains fields' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Field
 */
module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import DateInput = Ompluscript.View.Field.DateInput;
    import Input = Ompluscript.View.Field.Input;
    import Component = Ompluscript.View.Component.Component;
    import DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
    import Datetime = Ompluscript.Model.Attribute.Datetime;

    /**
     * Class that contains functionality for date input configuration.
     *
     * @class DateInputConfiguration
     */
    export class DateInputConfiguration extends InputConfiguration {

        /**
         * Class constructor.
         * 
         * Sets attributes and calls superclass constructor.
         * 
         * @constructs
         */
        constructor() {
            let attributes: Configuration[] = [
                Configuration.getInstance(DatetimeConfiguration),
            ];
            super(attributes, Datetime.TYPE_DATETIME);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === DateInput.TYPE_DATE_INPUT;
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {String} attribute Instance of binding attribute
         * @returns {IBase} New instance
         */
        public create(definition: Object, attribute: Datetime = undefined): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            attribute = <Datetime>this.createAttribute(definition, attribute);
            let placeholder: string = definition[Input.PARAMETER_PLACEHOLDER];
            let styles: Object = definition[Component.PARAMETER_STYLES];
            return new DateInput(name, attribute, placeholder, styles);
        }
    }
}
