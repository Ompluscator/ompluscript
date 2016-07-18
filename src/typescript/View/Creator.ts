/// <reference path="../Core/Interfaces/IBase.ts" />
/// <reference path="../Core/Configuration/Creator.ts" />
/// <reference path="../Core/Configuration/Configuration.ts" />
/// <reference path="../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="Configuration/Container/PageConfiguration.ts" />
/// <reference path="Configuration/Field/CheckBoxInputConfiguration.ts" />
/// <reference path="Configuration/Field/EmailInputConfiguration.ts" />
/// <reference path="Configuration/Field/NumberInputConfiguration.ts" />
/// <reference path="Configuration/Field/PasswordInputConfiguration.ts" />
/// <reference path="Configuration/Field/TextInputConfiguration.ts" />
/// <reference path="Configuration/Field/DateInputConfiguration.ts" />
/// <reference path="Configuration/Field/ParagraphConfiguration.ts" />
/// <reference path="Configuration/Field/PageLinkConfiguration.ts" />
/// <reference path="Configuration/Field/HeaderConfiguration.ts" />

/**
 * Module that contains model' classes.
 *
 * @module Ompluscript.View
 */
module Ompluscript.View {
    "use strict";
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import CreatorParent = Ompluscript.Core.Configuration.Creator;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import PageConfiguration = Ompluscript.View.Configuration.Container.PageConfiguration;
    import CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
    import EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
    import NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
    import PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
    import TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
    import DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
    import Page = Ompluscript.View.Container.Page;
    import ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
    import HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
    import PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;

    /**
     * Class that contains functionality for model creator.
     *
     * @class Creator
     */
    export class Creator extends CreatorParent {

        /**
         * @type {Creator} instance Instance for singleton pattern
         */
        private static instance: Creator;

        /**
         * @type {string[]} pages List of all pages
         */
        private pages: string[];

        /**
         * Method for singleton pattern
         *
         * @return {Creator} Instance for singleton pattern
         */
        public static getInstance(): Creator {
            if (Creator.instance === undefined) {
                Creator.instance = new Creator();
            }
            return Creator.instance;
        }

        /**
         * Class constructor
         *
         * Initializes definition map and errors list
         */
        constructor() {
            let configurations: Configuration[] = [
                Configuration.getInstance(CheckBoxInputConfiguration),
                Configuration.getInstance(EmailInputConfiguration),
                Configuration.getInstance(NumberInputConfiguration),
                Configuration.getInstance(PasswordInputConfiguration),
                Configuration.getInstance(TextInputConfiguration),
                Configuration.getInstance(DateInputConfiguration),
                Configuration.getInstance(ParagraphConfiguration),
                Configuration.getInstance(HeaderConfiguration),
                Configuration.getInstance(PageLinkConfiguration),
                Configuration.getInstance(PageConfiguration),
            ];
            super(configurations);
            this.pages = [];
        }

        /**
         * Method that defines different types of containers
         *
         * @param {Object[]} definition Definition for container
         */
        public define(definition: Object): void {
            super.define(definition);
            if (definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE) {
                this.pages.push(definition[Configuration.PARAMETER_NAME]);
            }
        }

        /**
         * Method that returns list of all pages
         * 
         * @returns {string[]} List of all pages
         */
        public getPages(): string[] {
            return this.pages;
        }
    }

    /**
     * Method that defines different types of containers
     *
     * @param {Object[]} definition Definition for container
     */
    export function define(definition: Object = {}): void {
        Creator.getInstance().define(definition);
    }

    /**
     * Method that creates defined containers
     *
     * @param {string} name Name of container
     */
    export function create(name: string): IBase {
        return Creator.getInstance().create(name);
    }
}


