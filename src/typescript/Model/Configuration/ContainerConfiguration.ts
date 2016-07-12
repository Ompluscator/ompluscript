/// <reference path="../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../Container/Container.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="BooleanConfiguration.ts" />
/// <reference path="DatetimeConfiguration.ts" />
/// <reference path="MultipleChoiceConfiguration.ts" />
/// <reference path="NumberConfiguration.ts" />
/// <reference path="SingleChoiceConfiguration.ts" />
/// <reference path="StringConfiguration.ts" />

module Ompluscript.Model.Configuration {
    "use strict";
    
    import Container = Ompluscript.Model.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;

    export abstract class ContainerConfiguration extends GroupConfiguration {
        
        constructor() {
            let configurations: Configuration[] = [
                Configuration.getInstance(BooleanConfiguration),
                Configuration.getInstance(DatetimeConfiguration),
                Configuration.getInstance(MultipleChoiceConfiguration),
                Configuration.getInstance(NumberConfiguration),
                Configuration.getInstance(SingleChoiceConfiguration),
                Configuration.getInstance(StringConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            super(configurations, Container.PARAMETER_DEFINITION);
        }

        public getErrors(definition: Object, prefix: string): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME, prefix));
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_DEFINITION, prefix));
            errors = this.filterErrors(errors);
            if (errors.length === 0) {
                prefix += definition[Configuration.PARAMETER_NAME] + ".";
                errors.push.apply(errors, super.getErrors(definition, prefix));
            }
            return this.filterErrors(errors);
        }
    }
}
