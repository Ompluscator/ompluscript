/// <reference path="../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../Component/Container.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="CheckBoxInputConfiguration.ts" />
/// <reference path="EmailInputConfiguration.ts" />
/// <reference path="NumberInputConfiguration.ts" />
/// <reference path="PasswordInputConfiguration.ts" />
/// <reference path="TextInputConfiguration.ts" />
/// <reference path="NullLayoutConfiguration.ts" />
/// <reference path="RelativeLayoutConfiguration.ts" />
/// <reference path="LinearLayoutConfiguration.ts" />
/// <reference path="TableLayoutConfiguration.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Container = Ompluscript.View.Component.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;

    export abstract class ContainerConfiguration extends GroupConfiguration {
        
        constructor() {
            let layouts: Configuration[] = [
                Configuration.getInstance(NullLayoutConfiguration),
                Configuration.getInstance(RelativeLayoutConfiguration),
                Configuration.getInstance(LinearLayoutConfiguration),
                Configuration.getInstance(TableLayoutConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let children: Configuration[] = [
                Configuration.getInstance(CheckBoxInputConfiguration),
                Configuration.getInstance(EmailInputConfiguration),
                Configuration.getInstance(NumberInputConfiguration),
                Configuration.getInstance(PasswordInputConfiguration),
                Configuration.getInstance(TextInputConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_LAYOUT] = layouts;
            configurations[Container.PARAMETER_CHILDREN] = children;
            super(configurations);
        }

        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_CHILDREN));
            errors = this.filterErrors(errors);
            if (errors.length === 0) {
                errors.push.apply(errors, super.getErrors(definition, Container.PARAMETER_CHILDREN));
            }
            if (definition.hasOwnProperty(Container.PARAMETER_LAYOUT)) {
                errors.push.apply(errors, super.getErrors(definition, Container.PARAMETER_LAYOUT));
            }
            return this.filterErrors(errors);
        }
    }
}
