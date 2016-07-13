/// <reference path="../Core/Interfaces/IBase.ts" />
/// <reference path="../Core/Configuration/Creator.ts" />
/// <reference path="../Core/Configuration/Configuration.ts" />
/// <reference path="../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="Configuration/PageConfiguration.ts" />
/// <reference path="Configuration/CheckBoxInputConfiguration.ts" />
/// <reference path="Configuration/EmailInputConfiguration.ts" />
/// <reference path="Configuration/NumberInputConfiguration.ts" />
/// <reference path="Configuration/PasswordInputConfiguration.ts" />
/// <reference path="Configuration/TextInputConfiguration.ts" />

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
    import PageConfiguration = Ompluscript.View.Configuration.PageConfiguration;
    import CheckBoxInputConfiguration = Ompluscript.View.Configuration.CheckBoxInputConfiguration;
    import EmailInputConfiguration = Ompluscript.View.Configuration.EmailInputConfiguration;
    import NumberInputConfiguration = Ompluscript.View.Configuration.NumberInputConfiguration;
    import PasswordInputConfiguration = Ompluscript.View.Configuration.PasswordInputConfiguration;
    import TextInputConfiguration = Ompluscript.View.Configuration.TextInputConfiguration;

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
                Configuration.getInstance(PageConfiguration),
            ];
            super(configurations);
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


