/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../Attribute/Choice.ts" />

module Ompluscript.Model.Configuration {
    "use strict";

    import Choice = Ompluscript.Model.Attribute.Choice;
    
    export abstract class ChoiceConfiguration extends AttributeConfiguration {

        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeArray(definition, Choice.PARAMETER_CHOICES));
            return this.filterErrors(errors);
        }

    }
}
