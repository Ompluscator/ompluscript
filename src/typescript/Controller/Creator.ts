/// <reference path="../Core/Interfaces/IBase.ts" />
/// <reference path="../Core/Configuration/Creator.ts" />
/// <reference path="../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="Configuration/Controller/ApplicationControllerConfiguration.ts" />
/// <reference path="Configuration/Controller/PageControllerConfiguration.ts" />
/// <reference path="Controller/PageController.ts" />

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
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import PageController = Ompluscript.Controller.Controller.PageController;
    import PageControllerConfiguration = Ompluscript.Controller.Configuration.Controller.PageControllerConfiguration;

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
         * @type {string[]} pageControllers List of all page controllers
         */
        private pageControllers: string[];

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
                PageControllerConfiguration,
                ErrorConfiguration,
            ];
            super(configurations);
            this.pageControllers = [];
        }

        /**
         * Method that defines different types of containers
         *
         * @param {Object[]} definition Definition for container
         */
        public define(definition: Object): void {
            super.define(definition);
            if (definition[Configuration.PARAMETER_TYPE] === PageController.TYPE_PAGE_CONTROLLER) {
                this.pageControllers.push(definition[Configuration.PARAMETER_NAME]);
            }
        }

        /**
         * Method that returns list of all page controllers
         *
         * @returns {string[]} List of all page controllers
         */
        public getPageControllers(): string[] {
            return this.pageControllers;
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


