/// <reference path="../Core/Interfaces/IBase.ts" />
/// <reference path="../Core/Configuration/Creator.ts" />
/// <reference path="../Core/Configuration/Configuration.ts" />
/// <reference path="../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="Configuration/BooleanConfiguration.ts" />
/// <reference path="Configuration/DatetimeConfiguration.ts" />
/// <reference path="Configuration/MultipleChoiceConfiguration.ts" />
/// <reference path="Configuration/NumberConfiguration.ts" />
/// <reference path="Configuration/SingleChoiceConfiguration.ts" />
/// <reference path="Configuration/StringConfiguration.ts" />
/// <reference path="Configuration/ModelConfiguration.ts" />
/// <reference path="Configuration/TableConfiguration.ts" />

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
    import BooleanConfiguration = Ompluscript.Model.Configuration.BooleanConfiguration;
    import DatetimeConfiguration = Ompluscript.Model.Configuration.DatetimeConfiguration;
    import MultipleChoiceConfiguration = Ompluscript.Model.Configuration.MultipleChoiceConfiguration;
    import NumberConfiguration = Ompluscript.Model.Configuration.NumberConfiguration;
    import SingleChoiceConfiguration = Ompluscript.Model.Configuration.SingleChoiceConfiguration;
    import StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import ModelConfiguration = Ompluscript.Model.Configuration.ModelConfiguration;
    import TableConfiguration = Ompluscript.Model.Configuration.TableConfiguration;

    /**
     * Class that contains functionality for model creator.
     *
     * @class Creator
     */
    class Creator extends CreatorParent {

        /**
         * @type {Creator} instance Instance for singleton pattern
         */
        private static instance: Creator = new Creator();

        /**
         * Method for singleton pattern
         *
         * @return {Creator} Instance for singleton pattern
         */
        public static getInstance(): Creator {
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
                Configuration.getInstance(ErrorConfiguration),
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

    /**
     * Method that defines if there are errors in defintions
     *
     * @return {boolean} Defines if there are errors in defintions
     */
    export function hasErrors(): boolean {
        return Creator.getInstance().hasErrors();
    }

    /**
     * Method that returns all errors in definitions
     *
     * @return {Object[]} All errors in definitions
     */
    export function getErrors(): Object[] {
        return Creator.getInstance().getErrors();
    }
    /**
     * Method that resets map of definition and error list
     */
    export function reset(): void {
        Creator.getInstance().reset();
    }
}


