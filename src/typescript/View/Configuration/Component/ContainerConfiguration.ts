/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../Component/Container.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="../Field/CheckBoxInputConfiguration.ts" />
/// <reference path="../Field/EmailInputConfiguration.ts" />
/// <reference path="../Field/NumberInputConfiguration.ts" />
/// <reference path="../Field/PasswordInputConfiguration.ts" />
/// <reference path="../Field/TextInputConfiguration.ts" />
/// <reference path="../Layout/NullLayoutConfiguration.ts" />
/// <reference path="../Layout/RelativeLayoutConfiguration.ts" />
/// <reference path="../Layout/LinearLayoutConfiguration.ts" />
/// <reference path="../Layout/TableLayoutConfiguration.ts" />

module Ompluscript.View.Configuration.Component {
    "use strict";
    
    import Container = Ompluscript.View.Component.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import NullLayoutConfiguration = Ompluscript.View.Configuration.Layout.NullLayoutConfiguration;
    import RelativeLayoutConfiguration = Ompluscript.View.Configuration.Layout.RelativeLayoutConfiguration;
    import LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
    import TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
    import CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
    import EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
    import NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
    import PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
    import TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;

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
