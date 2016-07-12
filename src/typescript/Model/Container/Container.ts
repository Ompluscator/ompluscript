/// <reference path="../../Core/Observer/Observable.ts" />

/**
 * Module that contains container classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import Observable = Ompluscript.Core.Observer.Observable;

    /**
     * Class that contains functionality for Container.
     *
     * @class Container
     */
    export abstract class Container extends Observable {

        /**
         * @type {string} PARAMETER_DEFINITION Name parameter name.
         */
        public static PARAMETER_DEFINITION: string = "definition";

        /**
         * @type {string} name Defines name of model.
         */
        protected name: string;

        /**
         * @type {Object[]} definition Definition for all attributes.
         */
        protected definition: Object[];

        /**
         * Class constructor
         * 
         * Sets name of container and definition for attributes.
         * 
         * @param {string} name
         * @param {Object[]} definition
         * @constructs
         */
        constructor(name: string, definition: Object[] = []) {
            super();
            this.name = name;
            this.definition = definition;
        }

        /**
         * Method that returns name of model.
         *
         * @returns {string} Name of model
         */
        public getName(): string {
            return this.name;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = {
                definition: this.definition,
                name: this.name,
            };
            return trace;
        }

        /**
         * Method that validates values of container.
         *
         * @returns {boolean} Result of validation
         */
        public abstract validate(): boolean;

        /**
         * Method that should be called before removing reference from object.
         */
        public abstract dispose(): void;

    }
}


