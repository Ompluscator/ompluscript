/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Utils/General.ts" />

/**
 * Module that contains attributes' classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import General = Ompluscript.Core.Utils.General;

    /**
     * Class that contains functionality for single attribute.
     *
     * @class String
     */
    export class Unit<T> implements IBase {

        /**
         * @param {number} ERROR_WRONG_TYPE Error code for setting a wrong type of value.
         */
        public static ERROR_WRONG_TYPE: number = 101;

        /**
         * @param {number} ERROR_IS_REQUIRED Error code for not entering required value.
         */
        public static ERROR_IS_REQUIRED: number = 102;

        /**
         * @param {number} ERROR_BELOW_MINIMUM Error code for invalid minimum value.
         */
        public static ERROR_BELOW_MINIMUM: number = 201;

        /**
         * @param {number} ERROR_OVER_MAXIMUM Error code for invalid maximum value.
         */
        public static ERROR_OVER_MAXIMUM: number = 202;

        /**
         * @param {number} ERROR_VALUE_NOT_ALLOWED Error code when not allowed value.
         */
        public static ERROR_VALUE_NOT_ALLOWED: number = 203;

        public static TYPE_BOOLEAN: string = "boolean";

        public static TYPE_NUMBER: string = "number";

        public static TYPE_STRING: string = "string";

        public static TYPE_DATETIME: string = "datetime";

        public static TYPE_SINGLE_CHOICE: string = "singleChoice";

        public static TYPE_MULTIPLE_CHOICE: string = "multipleChoice";

        public static PARAMETER_TYPE: string = "type";

        public static PARAMETER_NAME: string = "name";

        public static PARAMETER_REQUIRED: string = "required";

        public static PARAMETER_VALUE: string = "value";

        public static PARAMETER_VALUES: string = "values";

        public static PARAMETER_MINIMUM: string = "minimum";

        public static PARAMETER_MAXIMUM: string = "maximum";

        /**
         * @param {string} type Value's type
         */
        protected type: string;

        /**
         * @param {string} name Value's name
         */
        protected name: string;

        /**
         * @param {T} value Value that should be stored
         */
        protected value: T;

        /**
         * @param {boolean} required Defines if value is required
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
         */
        constructor(type: string, name: string, value: T = undefined, required: boolean = false) {
            this.type = type;
            this.name = name;
            this.value = value;
            this.required = false;
            if (required === true) {
                this.required = true;
            }
            if (typeof this.type !== "string") {
                General.throwConfigurationException(Unit, {
                    type: this.type,
                });
            }
            if (typeof this.name !== "string") {
                General.throwConfigurationException(Unit, {
                    name: this.name,
                });
            }
            if (required !== undefined && typeof required !== "boolean") {
                General.throwConfigurationException(Unit, {
                    required: required,
                });
            }
        }

        /**
         * Method that sets value of attribute
         *
         * @param {T} value Attribute's value
         */
        public setValue(value: T): void {
            this.value = value;
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
         * Method that validates attribute's value.
         *
         * @throws {TypeError} when it's not string
         */
        public validate(): void {
            if (typeof this.value !== this.type && this.value !== undefined) {
                General.throwControlledException(TypeError, Unit, this.name, Unit.ERROR_WRONG_TYPE);
            } else if (this.required === true && typeof this.value !== this.type) {
                General.throwControlledException(TypeError, Unit, this.name, Unit.ERROR_IS_REQUIRED);
            }
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
