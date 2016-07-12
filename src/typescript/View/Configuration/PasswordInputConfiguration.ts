/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Field/Input.ts" />
/// <reference path="../Field/PasswordInput.ts" />
/// <reference path="../../Model/Attribute/Attribute.ts" />
/// <reference path="../../Model/Attribute/String.ts" />
/// <reference path="../../Model/Configuration/StringConfiguration.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Input = Ompluscript.View.Field.Input;
    import Component = Ompluscript.View.Component.Component;
    import StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
    import String = Ompluscript.Model.Attribute.String;
    import PasswordInput = Ompluscript.View.Field.PasswordInput;

    export class PasswordInputConfiguration extends InputConfiguration {
        
        constructor() {
            super(Configuration.getInstance(StringConfiguration), String.TYPE_STRING);
        }

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === PasswordInput.TYPE_PASSWORD_INPUT;
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let attribute: String = <String>this.createAttribute(definition[Input.PARAMETER_ATTRIBUTE]);
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new PasswordInput(name, attribute, styles);
        }
    }
}
