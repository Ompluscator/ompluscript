/// <reference path="../Core/Interfaces/IBase.ts" />
/// <reference path="../Core/Configuration/Creator.ts" />
/// <reference path="../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="Configuration/Controller/ApplicationControllerConfiguration.ts" />

/**
 * Module that contains controller' classes.
 *
 * @module Ompluscript.Controller
 */
module Ompluscript.Controller {
    "use strict";
    
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import CreatorParent = Ompluscript.Core.Configuration.Creator;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import ApplicationControllerConfiguration = Ompluscript.Controller.Configuration.Controller.ApplicationControllerConfiguration;

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
            let configurations: Object[] = [
                ApplicationControllerConfiguration,
                ErrorConfiguration,
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


