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
/// <reference path="AjaxProxyConfiguration.ts" />
/// <reference path="LocalStorageProxyConfiguration.ts" />
/// <reference path="SessionStorageProxyConfiguration.ts" />

module Ompluscript.Model.Configuration {
    "use strict";
    
    import Container = Ompluscript.Model.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;

    export abstract class ContainerConfiguration extends GroupConfiguration {
        
        constructor() {
            let definition: Configuration[] = [
                Configuration.getInstance(BooleanConfiguration),
                Configuration.getInstance(DatetimeConfiguration),
                Configuration.getInstance(MultipleChoiceConfiguration),
                Configuration.getInstance(NumberConfiguration),
                Configuration.getInstance(SingleChoiceConfiguration),
                Configuration.getInstance(StringConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let proxies: Configuration[] = [
                Configuration.getInstance(AjaxProxyConfiguration),
                Configuration.getInstance(SessionStorageProxyConfiguration),
                Configuration.getInstance(LocalStorageProxyConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_DEFINITION] = definition;
            configurations[Container.PARAMETER_PROXIES] = proxies;
            super(configurations);
        }

        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_DEFINITION));
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_PROXIES));
            if (definition.hasOwnProperty(Container.PARAMETER_DEFINITION)) {
                errors.push.apply(errors, super.getErrors(definition, Container.PARAMETER_DEFINITION));
            }
            if (definition.hasOwnProperty(Container.PARAMETER_PROXIES)) {
                errors.push.apply(errors, super.getErrors(definition, Container.PARAMETER_PROXIES));
            }
            return this.filterErrors(errors);
        }
    }
}
