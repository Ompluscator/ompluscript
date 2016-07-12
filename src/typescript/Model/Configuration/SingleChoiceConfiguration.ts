/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="ChoiceConfiguration.ts" />
/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../Attribute/Choice.ts" />
/// <reference path="../Attribute/SingleChoice.ts" />

module Ompluscript.Model.Configuration {
    "use strict";

    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Choice = Ompluscript.Model.Attribute.Choice;
    import SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    
    export class SingleChoiceConfiguration extends ChoiceConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === SingleChoice.TYPE_SINGLE_CHOICE;
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let value: number = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let choices: number[] = definition[Choice.PARAMETER_CHOICES];
            return new SingleChoice(name, value, required, choices);
        }
    }
}
