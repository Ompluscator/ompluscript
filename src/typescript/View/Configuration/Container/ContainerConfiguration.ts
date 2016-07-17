/// <reference path="../Component/ComponentConfiguration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="../Field/CheckBoxInputConfiguration.ts" />
/// <reference path="../Field/EmailInputConfiguration.ts" />
/// <reference path="../Field/NumberInputConfiguration.ts" />
/// <reference path="../Field/PasswordInputConfiguration.ts" />
/// <reference path="../Field/TextInputConfiguration.ts" />
/// <reference path="../Field/DateInputConfiguration.ts" />
/// <reference path="../Layout/NullLayoutConfiguration.ts" />
/// <reference path="../Layout/RelativeLayoutConfiguration.ts" />
/// <reference path="../Layout/LinearLayoutConfiguration.ts" />
/// <reference path="../Layout/TableLayoutConfiguration.ts" />

/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Container
 */
module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Container = Ompluscript.View.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
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
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
    import DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;

    /**
     * Abstract class that contains functionality for container configuration.
     *
     * @class InputConfiguration
     */
    export abstract class ContainerConfiguration extends ComponentConfiguration {

        /**
         * Class constructor.
         *
         * Creates configuration list for children and layouts.
         * Calls constructor of superclass.
         *
         * @constructs
         */
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
                Configuration.getInstance(DateInputConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_LAYOUT] = layouts;
            configurations[Container.PARAMETER_CHILDREN] = children;
            super(configurations);
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_CHILDREN));
            errors = this.filterErrors(errors);
            if (Array.isArray(definition[Container.PARAMETER_CHILDREN])) {
                errors.push.apply(errors, super.getErrorsForChildren(
                    definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance())
                );
            }
            errors.push(this.shouldBeObject(definition, Container.PARAMETER_LAYOUT));
            if (typeof definition[Container.PARAMETER_LAYOUT] === "object") {
                errors.push.apply(errors, super.getErrorsForChildren(definition, Container.PARAMETER_LAYOUT));
            }
            return this.filterErrors(errors);
        }
    }
}
