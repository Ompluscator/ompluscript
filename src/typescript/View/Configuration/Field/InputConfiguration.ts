/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../Component/ComponentConfiguration.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="../../../Model/Creator.ts" />

module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Input = Ompluscript.View.Field.Input;
    import create = Ompluscript.Model.create;
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;

    export abstract class InputConfiguration extends ComponentConfiguration {

        private configuration: Configuration;

        private type: string;

        constructor(configuration: Configuration, type: string) {
            super();
            this.configuration = configuration;
            this.type = type;
        }

        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            let error: string = this.shouldBeStringOrObject(definition, Input.PARAMETER_ATTRIBUTE);
            if (error === undefined) {
                if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "object") {
                    definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] =  Input.PARAMETER_ATTRIBUTE;
                    definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                    errors.push.apply(errors, this.configuration.getErrors(definition));
                } else if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "string") {
                    if (create(definition[Input.PARAMETER_ATTRIBUTE]) === undefined) {
                        errors.push(definition[Input.PARAMETER_ATTRIBUTE] + Configuration.MODEL_MUST_BE_DEFINED);
                    }
                }
            } else {
                errors.push(error);
            }
            return this.filterErrors(errors);
        }

        protected createAttribute(definition: Object): IBase {
            if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "object") {
                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] =  Input.PARAMETER_ATTRIBUTE;
                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                return this.configuration.create(definition);
            } else if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "string") {
                return create(definition[Input.PARAMETER_ATTRIBUTE]);
            }
            return undefined;
        }
    }
}