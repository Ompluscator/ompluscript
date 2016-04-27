/// <reference path="../../Core/Interfaces/IBase.ts" />

/**
 * Module that contains model' classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that contains functionality for Container.
     *
     * @class Container
     */
    export abstract class Container implements IBase {

        /**
         * @type {string} CONTAINER_MODEL Model type.
         */
        public static CONTAINER_MODEL: string = "model";

        /**
         * @type {string} CONTAINER_TABLE Table type.
         */
        public static CONTAINER_TABLE: string = "table";

        /**
         * @type {string} name Defines name of model.
         */
        protected name: string;

        /**
         * @type {Object[]} definition Definition for all attributes.
         */
        protected definition: Object[];

        constructor(name: string, definition: Object[] = []) {
            this.name = name;
            this.definition = definition;
        }

        /**
         * Method that returns name of model.
         *
         * @returns {string}
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

        public abstract dispose(): void;

    }
}


