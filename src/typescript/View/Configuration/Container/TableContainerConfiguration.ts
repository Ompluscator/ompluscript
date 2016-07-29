/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Container/TableContainer.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../Layout/Layout.ts" />
/// <reference path="../../Field/TextContent.ts" />
/// <reference path="../../Field/Field.ts" />
/// <reference path="ContainerConfiguration.ts" />
/// <reference path="../Field/CheckBoxInputConfiguration.ts" />
/// <reference path="../Field/EmailInputConfiguration.ts" />
/// <reference path="../Field/NumberInputConfiguration.ts" />
/// <reference path="../Field/PasswordInputConfiguration.ts" />
/// <reference path="../Field/TextInputConfiguration.ts" />
/// <reference path="../Field/DateInputConfiguration.ts" />
/// <reference path="../Field/InputConfiguration.ts" />
/// <reference path="../Field/LabelConfiguration.ts" />
/// <reference path="../Field/ParagraphConfiguration.ts" />
/// <reference path="../Field/PageLinkConfiguration.ts" />
/// <reference path="../Field/HeaderConfiguration.ts" />
/// <reference path="../Field/ButtonConfiguration.ts" />
/// <reference path="../Field/ImageConfiguration.ts" />
/// <reference path="../Field/LabelInputConfiguration.ts" />
/// <reference path="../../../Model/Configuration/Container/TableConfiguration.ts" />
/// <reference path="../../../Model/Container/Table.ts" />
/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Container
 */
module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import TableModel = Ompluscript.Model.Container.Table;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
    import EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
    import NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
    import PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
    import TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
    import DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
    import LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;
    import LabelInputConfiguration = Ompluscript.View.Configuration.Field.LabelInputConfiguration;
    import HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
    import ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
    import ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
    import PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
    import TableConfiguration = Ompluscript.Model.Configuration.Container.TableConfiguration;
    import TableContainer = Ompluscript.View.Container.TableContainer;
    import TextContent = Ompluscript.View.Field.TextContent;
    import Field = Ompluscript.View.Field.Field;
    import ImageConfiguration = Ompluscript.View.Configuration.Field.ImageConfiguration;

    /**
     * Class that contains functionality for table configuration.
     *
     * @class TableContainerConfiguration
     */
    export class TableContainerConfiguration extends ContainerConfiguration {

        /**
         * Class constructor.
         *
         * Creates configuration list for children and layouts.
         * Calls constructor of superclass.
         *
         * @constructs
         */
        constructor() {
            let cells: Object[] = [
                CheckBoxInputConfiguration,
                EmailInputConfiguration,
                NumberInputConfiguration,
                PasswordInputConfiguration,
                TextInputConfiguration,
                DateInputConfiguration,
                LabelConfiguration,
                LabelInputConfiguration,
                ParagraphConfiguration,
                ButtonConfiguration,
                HeaderConfiguration,
                LabelConfiguration,
                PageLinkConfiguration,
                ErrorConfiguration,
            ];
            let headers: Object[] = [
                LabelConfiguration,
                ParagraphConfiguration,
                ButtonConfiguration,
                HeaderConfiguration,
                LabelConfiguration,
                PageLinkConfiguration,
                ImageConfiguration,
                ErrorConfiguration,
            ];
            let table: Object[] = [
                TableConfiguration,
            ];
            let configurations: Object = {};
            configurations[TableContainer.PARAMETER_CELLS] = cells;
            configurations[TableContainer.PARAMETER_HEADERS] = headers;
            configurations[TableContainer.PARAMETER_TABLE] = table;
            super(configurations);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === TableContainer.TYPE_TABLE;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeStringOrObject(definition, TableContainer.PARAMETER_TABLE));
            if (typeof definition[TableContainer.PARAMETER_TABLE] === "object") {
                errors.push.apply(errors, super.getErrorsForChildren(definition, TableContainer.PARAMETER_TABLE));
            }
            errors.push(this.shouldBeObject(definition, TableContainer.PARAMETER_HEADERS));
            if (typeof definition[TableContainer.PARAMETER_HEADERS] === "object") {
                errors.push.apply(errors, super.getErrorsForChildren(definition, TableContainer.PARAMETER_HEADERS));
            }
            errors.push(this.shouldBeObject(definition, TableContainer.PARAMETER_CELLS));
            if (typeof definition[TableContainer.PARAMETER_CELLS] === "object") {
                errors.push.apply(errors, super.getErrorsForChildren(definition, TableContainer.PARAMETER_CELLS));
            }
            errors = this.filterErrors(errors);
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let table: TableModel = <TableModel>super.createChild(
                definition, TableContainer.PARAMETER_TABLE, Ompluscript.Model.Creator.getInstance()
            );
            let headers: TextContent[] = <TextContent[]>super.createChildren(
                definition, TableContainer.PARAMETER_HEADERS, Ompluscript.Model.Creator.getInstance()
            );
            let cells: Field[] = <Field[]>super.createChildren(
                definition, TableContainer.PARAMETER_CELLS, Ompluscript.Model.Creator.getInstance()
            );
            let styles: Object = definition[Component.PARAMETER_STYLES];
            return new TableContainer(name, table, headers, cells, styles);
        }
    }
}
