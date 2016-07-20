/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Container/Page.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../Layout/Layout.ts" />
/// <reference path="ContainerConfiguration.ts" />
/// <reference path="ListConfiguration.ts" />
/// <reference path="BoxConfiguration.ts" />
/// <reference path="FormConfiguration.ts" />
/// <reference path="../Field/CheckBoxInputConfiguration.ts" />
/// <reference path="../Field/EmailInputConfiguration.ts" />
/// <reference path="../Field/NumberInputConfiguration.ts" />
/// <reference path="../Field/PasswordInputConfiguration.ts" />
/// <reference path="../Field/TextInputConfiguration.ts" />
/// <reference path="../Field/DateInputConfiguration.ts" />
/// <reference path="../Field/ParagraphConfiguration.ts" />
/// <reference path="../Field/ButtonConfiguration.ts" />
/// <reference path="../Field/HeaderConfiguration.ts" />
/// <reference path="../Field/PageLinkConfiguration.ts" />
/// <reference path="../Field/LabelConfiguration.ts" />
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
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Page = Ompluscript.View.Container.Page;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Container.Container;
    import Layout = Ompluscript.View.Layout.Layout;
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
    import DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
    import ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
    import HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
    import PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
    import ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
    import LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;

    /**
     * Class that contains functionality for page configuration.
     *
     * @class PageConfiguration
     */
    export class PageConfiguration extends ContainerConfiguration {

        /**
         * Class constructor.
         *
         * Creates configuration list for children and layouts.
         * Calls constructor of superclass.
         *
         * @constructs
         */
        constructor() {
            let layouts: Object[] = [
                NullLayoutConfiguration,
                RelativeLayoutConfiguration,
                LinearLayoutConfiguration,
                TableLayoutConfiguration,
                ErrorConfiguration,
            ];
            let children: Object[] = [
                CheckBoxInputConfiguration,
                EmailInputConfiguration,
                NumberInputConfiguration,
                PasswordInputConfiguration,
                TextInputConfiguration,
                DateInputConfiguration,
                ParagraphConfiguration,
                ButtonConfiguration,
                HeaderConfiguration,
                LabelConfiguration,
                PageLinkConfiguration,
                ListConfiguration,
                BoxConfiguration,
                FormConfiguration,
                ErrorConfiguration,
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_LAYOUT] = layouts;
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
            return definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeBoolean(definition, Page.PARAMETER_DEFAULT_PAGE));
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
            let layout: Layout = <Layout>super.createChild(definition, Container.PARAMETER_LAYOUT);
            if (children === undefined) {
                children = <Component[]>super.createChildren(
                    definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance()
                );
            }
            let defaultPage: boolean = definition[Page.PARAMETER_DEFAULT_PAGE];
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new Page(name, defaultPage, layout, children, styles);
        }
    }
}
