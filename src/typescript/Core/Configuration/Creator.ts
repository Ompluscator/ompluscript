/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="Configuration.ts" />

/**
 * Module that contains core configuration classes.
 *
 * @module Ompluscript.Core.Configuration
 */
module Ompluscript.Core.Configuration {
    "use strict";

    import ConfigurationClass = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    
    /**
     * Class that contains functionality for creator.
     *
     * @class Creator
     */
    export class Creator {

        /**
         * @type {Object} definition Contains a map for all definitions
         */
        private definition: Object;

        /**
         * @type {Object[]} errors Contains errors for all definitions
         */
        private errors: Object[];

        private configurations: Configuration[];

        /**
         * Class constructor
         *
         * Initializes definition map and errors list
         */
        constructor(configurations: Configuration[]) {
            this.definition = {};
            this.errors = [];
            this.configurations = configurations;
        }

        /**
         * Method that defines if there are errors in defintions
         *
         * @return {boolean} Defines if there are errors in defintions
         */
        public hasErrors(): boolean {
            return this.errors.length > 0;
        }

        /**
         * Method that returns all errors in definitions
         *
         * @return {Object[]} All errors in definitions
         */
        public getErrors(): Object[] {
            return this.errors;
        }

        /**
         * Method that resets map of definition and error list
         */
        public reset(): void {
            this.definition = {};
            this.errors = [];
        }

        /**
         * Method that defines different types of containers
         *
         * @param {Object[]} definition Definition for container
         */
        public define(definition: Object): void {
            let errors: string[] = [];
            for (let i: number = 0; i < this.configurations.length; i++) {
                if (this.configurations[i].isRelatedTo(definition)) {
                    errors = this.configurations[i].getErrors(definition);
                    break;
                }
            }
            if (errors.length) {
                this.errors.push({
                    definition: definition,
                    errors: errors,
                    name: definition[ConfigurationClass.PARAMETER_NAME],
                    type: definition[ConfigurationClass.PARAMETER_TYPE],
                });
            } else {
                this.definition[definition[ConfigurationClass.PARAMETER_NAME]] = {
                    definition: definition,
                    name: definition[ConfigurationClass.PARAMETER_NAME],
                    type: definition[ConfigurationClass.PARAMETER_TYPE],
                };
            }
        }

        /**
         * Method that creates defined containers
         *
         * @param {string} name Name of container
         */
        public create(name: string): IBase {
            if (this.definition.hasOwnProperty(name)) {
                for (let i: number = 0; i < this.configurations.length; i++) {
                    if (this.configurations[i].isRelatedTo(this.definition[name])) {
                        return this.configurations[i].create(this.definition[name]);
                    }
                }
            }
            return undefined;
        }
    }
}

