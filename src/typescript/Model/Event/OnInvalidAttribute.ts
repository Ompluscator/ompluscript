/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="AttributeEvent.ts" />

/**
 * Module that contains model's events
 *
 * @module Ompluscript.Model.Event
 */
module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that contains info for event when attribute is invalid
     *
     * @class OnInvalidAttribute
     */
    export class OnInvalidAttribute extends AttributeEvent {

        /**
         * @type {any} value Vale of attribute
         */
        protected value: any;

        /**
         * @type {number} validationCode Error code for validation
         */
        protected validationCode: number;

        /**
         * Class constructor
         *
         * Sets value of attribute and error code for validation.
         * Calls superclass' constructor.
         *
         * @param {IBase} sender Object that fired event
         * @param {any} value Value of attribute
         * @param {number} validationCode Error code for validation
         * @constructs
         */
        constructor(sender: IBase, value: any, validationCode: number) {
            super(sender, AttributeEvent.ON_INVALID_ATTRIBUTE);
            this.value = value;
            this.validationCode = validationCode;
        }

        /**
         * Method that returns error code for validation
         * 
         * @return {number} Error code for validation
         */
        public getValidationCode(): number {
            return this.validationCode;
        }

        /**
         * Method that returns value of attribute
         * 
         * @return {any} Value of attribute
         */
        public getValue(): any {
            return this.value;
        }

    }

}
