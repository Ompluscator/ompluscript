/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/AbstractClasses/Observable.ts" />

/**
 * Module that contains attributes' classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Observable = Ompluscript.Core.Interfaces.Observable;

    /**
     * Class that contains functionality for single attribute.
     *
     * @class String
     */
    export abstract class Attribute<T> extends Observable implements IBase {

        /**
         * @type {number} ERROR_WRONG_TYPE Error code for setting a wrong type of value.
         */
        public static ERROR_WRONG_TYPE: number = 101;

        /**
         * @type {number} ERROR_IS_REQUIRED Error code for not entering required value.
         */
        public static ERROR_IS_REQUIRED: number = 102;

        /**
         * @type {number} ERROR_BELOW_MINIMUM Error code for invalid minimum value.
         */
        public static ERROR_BELOW_MINIMUM: number = 201;

        /**
         * @type {number} ERROR_OVER_MAXIMUM Error code for invalid maximum value.
         */
        public static ERROR_OVER_MAXIMUM: number = 202;

        /**
         * @type {number} EVENT_UPDATE Event that occurs when value is updated.
         */
        public static EVENT_UPDATE: number = 1001;

        /**
         * @type {number} EVENT_INVALID Event that occurs when value is invalid.
         */
        public static EVENT_INVALID: number = 1002;

        /**
         * @type {string} TYPE_BOOLEAN Boolean type name.
         */
        public static TYPE_BOOLEAN: string = "boolean";

        /**
         * @type {string} TYPE_NUMBER Number type name.
         */
        public static TYPE_NUMBER: string = "number";

        /**
         * @type {string} TYPE_STRING String type name.
         */
        public static TYPE_STRING: string = "string";

        /**
         * @type {string} TYPE_DATETIME Datetime type name.
         */
        public static TYPE_DATETIME: string = "datetime";

        /**
         * @type {string} TYPE_SINGLE_CHOICE SingleChoice type name.
         */
        public static TYPE_SINGLE_CHOICE: string = "singleChoice";

        /**
         * @type {string} TYPE_MULTIPLE_CHOICE MultipleChoice type name.
         */
        public static TYPE_MULTIPLE_CHOICE: string = "multipleChoice";

        /**
         * @type {string} PARAMETER_TYPE Type parameter name.
         */
        public static PARAMETER_TYPE: string = "type";

        /**
         * @type {string} PARAMETER_NAME Name parameter name.
         */
        public static PARAMETER_NAME: string = "name";

        /**
         * @type {string} PARAMETER_REQUIRED Required parameter name.
         */
        public static PARAMETER_REQUIRED: string = "required";

        /**
         * @type {string} PARAMETER_VALUE Value parameter name.
         */
        public static PARAMETER_VALUE: string = "value";

        /**
         * @type {string} PARAMETER_MINIMUM Minimum parameter name.
         */
        public static PARAMETER_MINIMUM: string = "minimum";

        /**
         * @type {string} PARAMETER_MAXIMUM Maximum parameter name.
         */
        public static PARAMETER_MAXIMUM: string = "maximum";

        /**
         * @type {string} type Value's type
         */
        protected type: string;

        /**
         * @type {string} name Value's name
         */
        protected name: string;

        /**
         * @type {any} value Value that should be stored
         */
        protected value: T;

        /**
         * @type {number} error Error code when value is invalid
         */
        protected error: number;

        /**
         * @type {boolean} required Defines if value is required
         */
        protected required: boolean;

        /**
         * Class constructor.
         *
         * Sets type of value, value itself and defines if it's required.
         *
         * @param {string} type Value's type
         * @param {string} name Name of attribute
         * @param {T} value Value that should be stored
         * @param {boolean} required Defines if value is required
         * @constructs
         */
        constructor(type: string, name: string, value: T = undefined, required: boolean = false) {
            super();
            this.type = type;
            this.name = name;
            this.value = value;
            this.required = false;
            if (required === true) {
                this.required = true;
            }
        }

        /**
         * Method that sets value of attribute
         *
         * @param {T} value Attribute's value
         */
        public setValue(value: T): void {
            this.value = value;
            this.notifyObservers(Attribute.EVENT_UPDATE);
        }

        /**
         * Method that returns value of attribute
         * 
         * @returns {T} Attribute's value
         */
        public getValue(): T {
            return this.value;
        }

        /**
         * Method that clears value from attrbiute
         */
        public resetValue(): void {
            this.value = undefined;
            this.notifyObservers(Attribute.EVENT_UPDATE);
        }

        /**
         * Method that explains if value is required or not
         * 
         * @returns {boolean} defines if value is required
         */
        public isRequired(): boolean {
            return this.required;
        }

        /**
         * Method that returns name of attribute
         * 
         * @returns {string} Attribute's name
         */
        public getName(): string {
            return this.name;
        }

        /**
         * Method that returns error code
         *
         * @returns {number|undefined} Error code
         */
        public getError(): number {
            return this.error;
        }


        /**
         * Method that validates attribute's value.
         *
         * @return {boolean} Validation result
         */
        public validate(): boolean {
            this.error = undefined;
            if (typeof this.value !== this.type && this.value !== undefined) {
                this.error = Attribute.ERROR_WRONG_TYPE;
                this.notifyObservers(Attribute.EVENT_INVALID);
                return false;
            } else if (this.required === true && typeof this.value !== this.type) {
                this.error = Attribute.ERROR_IS_REQUIRED;
                this.notifyObservers(Attribute.EVENT_INVALID);
                return false;
            }
            return true;
        }

        /**
         * Method that returns all current attributes of object.
         *
         * @returns {Object} contains all attributes of the object
         */
        public getStackTrace(): Object {
            let trace: Object = {
                name: this.name,
                required: this.required,
                type: this.type,
                value: this.value,
            };
            return trace;
        }

    }

}
