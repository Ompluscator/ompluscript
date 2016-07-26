/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="Configuration.ts" />

/**
 * Module that contains base configuration classes.
 *
 * @module Ompluscript.Core.Configuration
 */
module Ompluscript.Core.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Abstract lass that contains base functionality for group configuration.
     *
     * @class Configuration
     */
    export abstract class GroupConfiguration extends Configuration {

        /**
         * @type {Object} configurations Container with all configurations
         */
        protected configurations: Object;

        /**
         * Class constructor
         * 
         * Sets container with all configurations
         * 
         * @param {Object} configurations Container with all configurations
         * @constructs
         */
        constructor(configurations: Object) {
            super();
            this.configurations = configurations;
        }

        /**
         * Method that returns list of errors for children elements in definition
         * 
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @param {Creator} creator Instance of creator for component
         * @returns {string[]} List of errors
         */
        public getErrorsForChildren(definition: Object, key: string = undefined, creator: Creator = undefined): string[] {
            let errors: string[] = [];
            if (this.configurations.hasOwnProperty(key)) {
                let configuration: {new ()}[] = this.configurations[key];
                if (definition.hasOwnProperty(key)) {
                    if (Array.isArray(definition[key])) {
                        for (let i: number = 0; i < definition[key].length; i++) {
                            if (typeof definition[key][i] === "string" && creator !== undefined) {
                                if (!creator.ifDefined(definition[key][i])) {
                                    errors.push(definition[key][i] + Configuration.MUST_BE_DEFINED);
                                }
                            } else {
                                for (let j: number = 0; j < configuration.length; j++) {
                                    if (Configuration.getInstance(configuration[j]).isRelatedTo(definition[key][i])) {
                                        errors.push.apply(
                                            errors, Configuration.getInstance(configuration[j]).getErrors(definition[key][i])
                                        );
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        if (typeof definition[key] === "string" && creator !== undefined) {
                            if (!creator.ifDefined(definition[key])) {
                                errors.push(definition[key] + Configuration.MUST_BE_DEFINED);
                            }
                        } else {
                            for (let i: number = 0; i < configuration.length; i++) {
                                if (Configuration.getInstance(configuration[i]).isRelatedTo(definition[key])) {
                                    errors.push.apply(errors, Configuration.getInstance(configuration[i]).getErrors(definition[key]));
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return this.filterErrors(errors);
        }

        /**
         * Method that returns list children elements in definition
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @param {Creator} creator Instance of creator for component
         * @returns {IBase[]} List of children
         */
        public createChildren(definition: Object, key: string, creator: Creator = undefined): IBase[] {
            let children: IBase[] = [];
            if (this.configurations.hasOwnProperty(key)) {
                if (definition.hasOwnProperty(key)) {
                    let configuration: {new ()}[] = this.configurations[key];
                    for (let i: number = 0; i < definition[key].length; i++) {
                        if (creator !== undefined && typeof definition[key][i] === "string") {
                            children.push(creator.create(definition[key][i]));
                        } else {
                            for (let j: number = 0; j < configuration.length; j++) {
                                if (Configuration.getInstance(configuration[j]).isRelatedTo(definition[key][i])) {
                                    children.push(Configuration.getInstance(configuration[j]).create(definition[key][i]));
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return children;
        }

        /**
         * Method that returns child elements in definition
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @param {Creator} creator Instance of creator for component
         * @returns {IBase} Child
         */
        public createChild(definition: Object, key: string, creator: Creator = undefined): IBase {
            if (creator !== undefined && typeof definition[key] === "string") {
                return creator.create(definition[key]);
            } else if (this.configurations.hasOwnProperty(key)) {
                let configuration: {new ()}[] = this.configurations[key];
                if (definition.hasOwnProperty(key)) {
                    for (let i: number = 0; i < configuration.length; i++) {
                        if (Configuration.getInstance(configuration[i]).isRelatedTo(definition[key])) {
                            return Configuration.getInstance(configuration[i]).create(definition[key]);
                        }
                    }
                }
            }
            return undefined;
        }
    }
}
