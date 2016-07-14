/// <reference path="../../Core/Observer/Observable.ts" />
/// <reference path="../../Core/Interfaces/ICloneable.ts" />
/// <reference path="../Event/OnUpdateAttribute.ts" />
/// <reference path="../Event/OnInvalidAttribute.ts" />

/**
 * Module that contains attributes' classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    import Observable = Ompluscript.Core.Observer.Observable;
    import OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    import OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
    import ICloneable = Ompluscript.Core.Interfaces.ICloneable;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that contains functionality for single attribute.
     *
     * @class Attribute<T>
     */
    export abstract class Attribute<T> extends Observable implements ICloneable {

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
         * @param {any} value Value that should be stored
         * @param {boolean} required Defines if value is required
         * @constructs
         */
        constructor(type: string, name: string, value: T = undefined, required: boolean = false) {
            super();
            this.type = type;
            this.name = name;
            this.value = value;
            this.required = required;
        }

        /**
         * Method that sets value of attribute
         *
         * @param {any} value Attribute's value
         */
        public setValue(value: T): void {
            let oldValue: T = this.value;
            this.value = value;
            this.fireOnUpdateAttributeEvent(oldValue, this.value);
            if (!this.validate()) {
                this.fireOnInvalidAttributeEvent(this.value, this.error);
            }
        }

        /**
         * Method that returns value of attribute
         * 
         * @returns {any} Attribute's value
         */
        public getValue(): T {
            return this.value;
        }

        /**
         * Method that clears value from attribute
         */
        public resetValue(): void {
            this.setValue(undefined);
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
         * @returns {boolean} Validation result
         */
        public validate(): boolean {
            this.error = undefined;
            if (typeof this.value !== this.type && this.value !== undefined) {
                this.error = Attribute.ERROR_WRONG_TYPE;
                return false;
            } else if (this.required === true && typeof this.value !== this.type) {
                this.error = Attribute.ERROR_IS_REQUIRED;
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

        /**
         * Method that should be called when class object should be cloned.
         */
        public abstract clone(): IBase;

        /**
         * Method that fires event when attribute is updated
         * 
         * @param {any} oldValue Old value of attribute
         * @param {any} newValue New value of attribute
         */
        protected fireOnUpdateAttributeEvent(oldValue: T, newValue: T): void {
            let event: OnUpdateAttribute = new OnUpdateAttribute(this, oldValue, newValue);
            this.notifyObservers(event);
        }

        /**
         * Method that fires event when attribute is invalid
         * 
         * @param {any} value New value of attribute
         * @param {number} validationCode Error validation code
         */
        protected fireOnInvalidAttributeEvent(value: T, validationCode: number): void {
            let event: OnInvalidAttribute = new OnInvalidAttribute(this, value, validationCode);
            this.notifyObservers(event);
        }

    }

}
