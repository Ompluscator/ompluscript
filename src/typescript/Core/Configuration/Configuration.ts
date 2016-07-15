/// <reference path="../../Core/Interfaces/IBase.ts" />

module Ompluscript.Core.Configuration {
    "use strict";
    
    import IBase = Ompluscript.Core.Interfaces.IBase;

    export abstract class Configuration {

        /**
         * @type {string} IS_WRONG_CONFIGURATION Message for wrong value of definition.
         */
        public static IS_WRONG_CONFIGURATION: string = "Is wrong configuration.";

        /**
         * @type {string} HAS_WRONG_VALUE Message for wrong value of definition.
         */
        public static HAS_WRONG_VALUE: string = " has wrong value.";

        /**
         * @type {string} MUST_BE_STRING Message for definition that should be string.
         */
        public static MUST_BE_STRING: string = " must be a string.";

        /**
         * @type {string} MUST_BE_STRING_OR_UNDEFINED Message for definition that should be string or undefined.
         */
        public static MUST_BE_STRING_OR_UNDEFINED: string = " must be a string or undefined.";

        /**
         * @type {string} MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED Message for definition that should be string or object or undefined.
         */
        public static MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED: string = " must be a string or object or undefined.";

        /**
         * @type {string} MUST_BE_BOOLEAN_OR_UNDEFINED Message for definition that should be boolean or undefined.
         */
        public static MUST_BE_BOOLEAN_OR_UNDEFINED: string = " must be a boolean or undefined.";

        /**
         * @type {string} MUST_BE_NUMBER Message for definition that should be number.
         */
        public static MUST_BE_NUMBER: string = " must be a number.";

        /**
         * @type {string} MUST_BE_NUMBER_OR_UNDEFINED Message for definition that should be number or undefined.
         */
        public static MUST_BE_NUMBER_OR_UNDEFINED: string = " must be a number or undefined.";

        /**
         * @type {string} MUST_BE_REGEX_OR_UNDEFINED Message for definition that should be regex object or undefined.
         */
        public static MUST_BE_REGEX_OR_UNDEFINED: string = " must be a regex object or undefined.";

        /**
         * @type {string} MUST_BE_DATETIME_OR_UNDEFINED Message for definition that should be date format or undefined.
         */
        public static MUST_BE_DATETIME_OR_UNDEFINED: string = " must be in datetime format or undefined.";

        /**
         * @type {string} MUST_BE_ARRAY_OR_UNDEFINED Message for definition that should be array object or undefined.
         */
        public static MUST_BE_ARRAY_OR_UNDEFINED: string = " must be an array object or undefined.";

        /**
         * @type {string} MUST_BE_OBJECT_OR_UNDEFINED Message for definition that should be object or undefined.
         */
        public static MUST_BE_OBJECT_OR_UNDEFINED: string = " must be an object or undefined.";

        /**
         * @type {string} MUST_BE_GREATER Message for definition that should greater than other.
         */
        public static MUST_BE_GREATER: string = " must be greater than ";

        /**
         * @type {string} MODEL_MUST_BE_DEFINED Message for model definition that should defined.
         */
        public static MODEL_MUST_BE_DEFINED: string = " model must be defined ";

        /**
         * @type {string} PARAMETER_TYPE Type parameter name.
         */
        public static PARAMETER_TYPE: string = "type";

        /**
         * @type {string} PARAMETER_NAME Name parameter name.
         */
        public static PARAMETER_NAME: string = "name";

        private static instances: Object = {};

        public static getInstance(configuration: { new () }): Configuration {
            if (!Configuration.instances.hasOwnProperty(configuration["name"])) {
                Configuration.instances[configuration["name"]] = new configuration;
            }
            return Configuration.instances[configuration["name"]];
        }

        public abstract isRelatedTo(definition: Object): boolean;
        
        public abstract getErrors(definition: Object): string[];
        
        public abstract create(definition: Object): IBase;

        protected filterErrors(errors: string[]): string[] {
            let filter: string[] = [];
            for (let i: number = 0; i < errors.length; i++) {
                if (errors[i] !== undefined) {
                    filter.push(errors[i]);
                }
            }
            if (filter.length > 0) {
                return filter;
            }
            return [];
        }

        protected mustBeValue(definition: Object, key: string, values: any[]): string {
            if (values.indexOf(definition[key]) === -1) {
                return this.getName(definition, key) + Configuration.HAS_WRONG_VALUE;
            }
            return undefined;
        }

        protected mustBeString(definition: Object, key: string): string {
            if (typeof definition[key] !== "string") {
                return this.getName(definition, key) + Configuration.MUST_BE_STRING;
            }
            return undefined;
        }

        protected shouldBeString(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "string") {
                return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_UNDEFINED;
            }
            return undefined;
        }

        protected shouldBeStringOrObject(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "string" && typeof definition[key] !== "object") {
                return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED;
            }
            return undefined;
        }

        protected shouldBeBoolean(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "boolean") {
                return this.getName(definition, key) + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED;
            }
            return undefined;
        }

        protected mustBeNumber(definition: Object, key: string): string {
            if (typeof definition[key] !== "number") {
                return this.getName(definition, key) + Configuration.MUST_BE_NUMBER;
            }
            return undefined;
        }

        protected shouldBeNumber(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "number") {
                return this.getName(definition, key) + Configuration.MUST_BE_NUMBER_OR_UNDEFINED;
            }
            return undefined;
        }

        protected shouldBeRegex(definition: Object, key: string): string {
            if (definition[key] !== undefined && !(definition[key] instanceof RegExp)) {
                return this.getName(definition, key) + Configuration.MUST_BE_REGEX_OR_UNDEFINED;
            }
            return undefined;
        }

        protected shouldBeDatetime(definition: Object, key: string): string {
            if (definition[key] !== undefined && (typeof definition[key] !== "string" || isNaN(new Date(definition[key]).getTime()))) {
                return this.getName(definition, key) + Configuration.MUST_BE_DATETIME_OR_UNDEFINED;
            }
            return undefined;
        }

        protected shouldBeArray(definition: Object, key: string): string {
            if (definition[key] !== undefined && !Array.isArray(definition[key])) {
                return this.getName(definition, key) + Configuration.MUST_BE_ARRAY_OR_UNDEFINED;
            }
            return undefined;
        }

        protected shouldBeObject(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "object") {
                return this.getName(definition, key) + Configuration.MUST_BE_OBJECT_OR_UNDEFINED;
            }
            return undefined;
        }

        protected mustBeGreater(definition: Object, first: string, second: string, firstValue: any,
                                secondValue: any, include: boolean): string {
            if (firstValue !== undefined && secondValue !== undefined) {
                if (include === true && firstValue > secondValue) {
                    return this.getName(definition, second) + Configuration.MUST_BE_GREATER
                        + this.getName(definition, first);
                } else if (include !== true && firstValue >= secondValue) {
                    return this.getName(definition, second) + Configuration.MUST_BE_GREATER
                        + this.getName(definition, first);
                }
            }
            return undefined;
        }
        
        protected getName(definition: Object, key: string): string {
            return definition[Configuration.PARAMETER_NAME] + "." + key;
        }
    }
}
