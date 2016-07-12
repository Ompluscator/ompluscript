/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Field/Input.ts" />
/// <reference path="../Field/CheckBoxInput.ts" />
/// <reference path="../../Model/Attribute/Attribute.ts" />
/// <reference path="../../Model/Attribute/Boolean.ts" />
/// <reference path="../../Model/Configuration/BooleanConfiguration.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Input = Ompluscript.View.Field.Input;
    import Component = Ompluscript.View.Component.Component;
    import CheckBoxInput = Ompluscript.View.Field.CheckBoxInput;
    import BooleanConfiguration = Ompluscript.Model.Configuration.BooleanConfiguration;
    import Boolean = Ompluscript.Model.Attribute.Boolean;

    export class CheckBoxInputConfiguration extends InputConfiguration {
        
        constructor() {
            super(Configuration.getInstance(BooleanConfiguration), Boolean.TYPE_BOOLEAN);
        }

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === CheckBoxInput.TYPE_CHECK_BOX_INPUT;
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let attribute: Boolean = <Boolean>this.createAttribute(definition[Input.PARAMETER_ATTRIBUTE]);
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new CheckBoxInput(name, attribute, styles);
        }
    }
}
