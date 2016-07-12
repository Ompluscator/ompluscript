/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../Attribute/Choice.ts" />

module Ompluscript.Model.Configuration {
    "use strict";

    import Choice = Ompluscript.Model.Attribute.Choice;
    
    export abstract class ChoiceConfiguration extends AttributeConfiguration {

        public getErrors(definition: Object, prefix: string): string[] {
            let errors: string[] = super.getErrors(definition, prefix);
            errors.push(this.shouldBeArray(definition, Choice.PARAMETER_CHOICES, prefix));
            return this.filterErrors(errors);
        }

    }
}
