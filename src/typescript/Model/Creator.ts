/// <reference path="../Core/Interfaces/IBase.ts" />
/// <reference path="../Core/Configuration/Creator.ts" />
/// <reference path="../Core/Configuration/Configuration.ts" />
/// <reference path="../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="Container/Translation.ts" />
/// <reference path="Configuration/Attribute/BooleanConfiguration.ts" />
/// <reference path="Configuration/Attribute/DatetimeConfiguration.ts" />
/// <reference path="Configuration/Attribute/MultipleChoiceConfiguration.ts" />
/// <reference path="Configuration/Attribute/NumberConfiguration.ts" />
/// <reference path="Configuration/Attribute/SingleChoiceConfiguration.ts" />
/// <reference path="Configuration/Attribute/StringConfiguration.ts" />
/// <reference path="Configuration/Container/ModelConfiguration.ts" />
/// <reference path="Configuration/Container/TableConfiguration.ts" />
/// <reference path="Configuration/Container/TranslationConfiguration.ts" />

/**
 * Module that contains model' classes.
 *
 * @module Ompluscript.Model
 */
module Ompluscript.Model {
    "use strict";
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import CreatorParent = Ompluscript.Core.Configuration.Creator;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
    import DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
    import MultipleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.MultipleChoiceConfiguration;
    import NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
    import SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
    import StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import ModelConfiguration = Ompluscript.Model.Configuration.Container.ModelConfiguration;
    import TableConfiguration = Ompluscript.Model.Configuration.Container.TableConfiguration;
    import Translation = Ompluscript.Model.Container.Translation;
    import TranslationConfiguration = Ompluscript.Model.Configuration.Container.TranslationConfiguration;

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
         * @type {Translation} translation Instance of translation
         */
        private translation: Translation;

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
                Configuration.getInstance(BooleanConfiguration),
                Configuration.getInstance(DatetimeConfiguration),
                Configuration.getInstance(MultipleChoiceConfiguration),
                Configuration.getInstance(NumberConfiguration),
                Configuration.getInstance(SingleChoiceConfiguration),
                Configuration.getInstance(StringConfiguration),
                Configuration.getInstance(ModelConfiguration),
                Configuration.getInstance(TableConfiguration),
                Configuration.getInstance(TranslationConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            super(configurations);
        }

        /**
         * Method that returns single instance of translation
         * 
         * @returns {Translation} Single instance of translation
         */
        public getTranslation(): Translation {
            if (this.translation === undefined) {
                if (!this.ifDefined(Translation.TYPE_TRANSLATION)) {
                    this.translation = new Translation();
                } else {
                    this.translation = <Translation>this.create(Translation.TYPE_TRANSLATION);
                }
            }
            return this.translation;
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


