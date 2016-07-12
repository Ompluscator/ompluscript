/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Field/Input.ts" />
/// <reference path="../Field/NumberInput.ts" />
/// <reference path="../../Model/Attribute/Attribute.ts" />
/// <reference path="../../Model/Attribute/String.ts" />
/// <reference path="../../Model/Configuration/NumberConfiguration.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Input = Ompluscript.View.Field.Input;
    import Component = Ompluscript.View.Component.Component;
    import NumberConfiguration = Ompluscript.Model.Configuration.NumberConfiguration;
    import Number = Ompluscript.Model.Attribute.Number;
    import NumberInput = Ompluscript.View.Field.NumberInput;

    export class NumberInputConfiguration extends InputConfiguration {
        
        constructor() {
            super(Configuration.getInstance(NumberConfiguration), Number.TYPE_NUMBER);
        }

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === NumberInput.TYPE_NUMBER_INPUT;
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let attribute: Number = <Number>this.createAttribute(definition[Input.PARAMETER_ATTRIBUTE]);
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new NumberInput(name, attribute, styles);
        }
    }
}
