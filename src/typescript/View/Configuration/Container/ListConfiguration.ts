/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Container/List.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="ContainerConfiguration.ts" />
/// <reference path="../Field/CheckBoxInputConfiguration.ts" />
/// <reference path="../Field/EmailInputConfiguration.ts" />
/// <reference path="../Field/NumberInputConfiguration.ts" />
/// <reference path="../Field/PasswordInputConfiguration.ts" />
/// <reference path="../Field/TextInputConfiguration.ts" />
/// <reference path="../Field/DateInputConfiguration.ts" />
/// <reference path="../Field/ParagraphConfiguration.ts" />
/// <reference path="../Field/ButtonConfiguration.ts" />
/// <reference path="../Field/HeaderConfiguration.ts" />
/// <reference path="../Field/LabelConfiguration.ts" />
/// <reference path="../Field/PageLinkConfiguration.ts" />
/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Container
 */
module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import List = Ompluscript.View.Container.List;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Container.Container;
    import CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
    import EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
    import NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
    import PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
    import TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
    import DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
    import ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
    import HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
    import PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
    import LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;

    /**
     * Class that contains functionality for list configuration.
     *
     * @class ListConfiguration
     */
    export class ListConfiguration extends ContainerConfiguration {

        /**
         * Class constructor.
         *
         * Creates configuration list for children and layouts.
         * Calls constructor of superclass.
         *
         * @constructs
         */
        constructor() {
            let children: Configuration[] = [
                Configuration.getInstance(CheckBoxInputConfiguration),
                Configuration.getInstance(EmailInputConfiguration),
                Configuration.getInstance(NumberInputConfiguration),
                Configuration.getInstance(PasswordInputConfiguration),
                Configuration.getInstance(TextInputConfiguration),
                Configuration.getInstance(DateInputConfiguration),
                Configuration.getInstance(ParagraphConfiguration),
                Configuration.getInstance(ButtonConfiguration),
                Configuration.getInstance(HeaderConfiguration),
                Configuration.getInstance(LabelConfiguration),
                Configuration.getInstance(PageLinkConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_CHILDREN] = children;
            super(configurations);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === List.TYPE_LIST;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeString(definition, List.PARAMETER_LIST));
            if (typeof definition[List.PARAMETER_LIST] === "string") {
                let values: string[] = [
                    List.LIST_NONE,
                    List.LIST_ORDERED,
                    List.LIST_UNORDERED,
                ];
                errors.push(this.mustBeValue(definition, List.PARAMETER_LIST, values));
            }
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {Component[]} children List of children
         * @returns {IBase} New instance
         */
        public create(definition: Object, children: Component[] = undefined): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let list: string = definition[List.PARAMETER_LIST];
            if (children === undefined) {
                children = <Component[]>super.createChildren(
                    definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance()
                );
            }
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new List(name, list, children, styles);
        }
    }
}
