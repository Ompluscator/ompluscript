/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="../Component/ComponentConfiguration.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="../../../Model/Creator.ts" />
/// <reference path="../../../Model/Attribute/Attribute.ts" />

/**
 * Module that contains fields' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Field
 */
module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Input = Ompluscript.View.Field.Input;
    import Creator = Ompluscript.Model.Creator;
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Attribute = Ompluscript.Model.Attribute.Attribute;

    /**
     * Abstract class that contains functionality for input configuration.
     *
     * @class InputConfiguration
     */
    export abstract class InputConfiguration extends ComponentConfiguration {

        /**
         * @type {string} type Type of attribute that input should contain
         */
        private type: string;

        /**
         * Class constructor.
         * 
         * Creates configuration list and save attribute's type. 
         * Calls constructor of superclass.
         * 
         * @param {Configuration[]} attributes List of attributes' configurations
         * @param {string} type Type of attribute that input should contain
         * @constructs
         */
        constructor(attributes: Configuration[], type: string) {
            attributes.push(Configuration.getInstance(ErrorConfiguration));
            let configurations: Object = {};
            configurations[Input.PARAMETER_ATTRIBUTE] = attributes;
            super(configurations);
            this.type = type;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            let error: string = this.shouldBeStringOrObject(definition, Input.PARAMETER_ATTRIBUTE);
            let error: string = this.shouldBeString(definition, Input.PARAMETER_PLACEHOLDER);
            if (error === undefined) {
                if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "string") {
                    if (!Creator.getInstance().ifDefined(definition[Input.PARAMETER_ATTRIBUTE])) {
                        errors.push(definition[Input.PARAMETER_ATTRIBUTE] + Configuration.MODEL_MUST_BE_DEFINED);
                    }
                } else {
                    if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "boolean") {
                        definition[Input.PARAMETER_ATTRIBUTE] = {};
                    }
                    definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] = Input.PARAMETER_ATTRIBUTE;
                    definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                    errors.push.apply(errors, this.getErrorsForChildren(definition, Input.PARAMETER_ATTRIBUTE));
                }
            } else {
                errors.push(error);
            }
            return this.filterErrors(errors);
        }

        /**
         * Method that creates and returns desired attribute if
         * there is no one.
         * 
         * @param {Object} definition Class definition
         * @param {Attribute<any>} attribute Already created attribute
         * @returns {Attribute<any>} Instance of attribute
         */
        public createAttribute(definition: Object, attribute: Attribute<any>): Attribute<any> {
            if (attribute === undefined && definition.hasOwnProperty(Input.PARAMETER_ATTRIBUTE)) {
                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] = Input.PARAMETER_ATTRIBUTE;
                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                attribute = <Attribute<any>>this.createChild(definition, Input.PARAMETER_ATTRIBUTE);
            }
            return attribute;
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {String} attribute Instance of binding attribute
         * @returns {IBase} New instance
         */
        public abstract create(definition: Object, attribute?: Attribute): IBase;

    }
}
