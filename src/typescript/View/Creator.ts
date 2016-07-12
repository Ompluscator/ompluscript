/// <reference path="Container/Page.ts" />

/**
 * Module that contains views' classes.
 *
 * @module Ompluscript.View
 */
module Ompluscript.View {
    "use strict";
    
    import Page = Ompluscript.View.Container.Page;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Component.Container;
    import Layout = Ompluscript.View.Component.Layout;
    import LinearLayout = Ompluscript.View.Layout.LinearLayout;
    import TableLayout = Ompluscript.View.Layout.TableLayout;

    /**
     * Class that contains functionality for view creator.
     *
     * @class Creator
     */
    export class Creator {

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
         * @type {string} MUST_BE_BOOLEAN_OR_UNDEFINED Message for definition that should be boolean or undefined.
         */
        public static MUST_BE_BOOLEAN_OR_UNDEFINED: string = " must be a boolean or undefined.";

        /**
         * @type {string} MUST_BE_NUMBER_OR_UNDEFINED Message for definition that should be number or undefined.
         */
        public static MUST_BE_NUMBER_OR_UNDEFINED: string = " must be a number or undefined.";

        /**
         * @type {string} MUST_BE_OBJECT_OR_UNDEFINED Message for definition that should be object or undefined.
         */
        public static MUST_BE_OBJECT_OR_UNDEFINED: string = " must be an object or undefined.";

        /**
         * @type {Creator} instance Instance for singleton pattern
         */
        private static instance: Creator = new Creator();

        /**
         * @type {Object} definition Contains a map for all definitions
         */
        private definition: Object;

        /**
         * @type {Object[]} errors Contains errors for all definitions
         */
        private errors: Object[];

        /**
         * Method for singleton pattern
         *
         * @return {Creator} Instance for singleton pattern
         */
        public static getInstance(): Creator {
            return Creator.instance;
        }

        /**
         * Class constructor
         *
         * Initializes definition map and errors list
         */
        constructor() {
            this.definition = {};
            this.errors = [];
        }

        /**
         * Method that defines if there are errors in definitions
         *
         * @return {boolean} Defines if there are errors in definitions
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
         * Method that defines different types of views
         *
         * @param {string} name Name of view
         * @param {string} type Type of view
         * @param {Object[]} definition Definition for view
         */
        public define(name: string, type: string, definition: Object[] = []): void {
            definition[Component.PARAMETER_TYPE] = type;
            let errors: string[] = this.checkConfiguration(definition);
            if (errors.length) {
                this.errors.push({
                    definition: definition,
                    errors: errors,
                    name: name,
                    type: type,
                });
            } else {
                this.definition[name] = {
                    definition: definition,
                    name: name,
                    type: type,
                };
            }
        }

        /**
         * Method that creates defined views
         *
         * @param {string} name Name of view
         */
        public create(name: string): Container {
            if (this.definition.hasOwnProperty(name)) {
                if (this.definition[name].hasOwnProperty("type")) {
                    if (this.definition[name]["type"] === Container.CONTAINER_PAGE) {
                        return new Page(name, this.definition[name]["definition"]);
                    }
                }
            }
            return undefined;
        }

        /**
         * Method that validates component configuration.
         *
         * @param {Object} definition View definition
         */
        private checkConfiguration(definition: Object): string[] {
            let errors: string[] = [];
            let type: string = definition[Component.PARAMETER_TYPE];
            switch (type) {
                case Container.CONTAINER_PAGE:
                    errors = this.checkContainerConfiguration(definition);
                    break;
                default:
                    errors.push(Component.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE);
                    break;
            }
            return errors;
        }

        private checkComponentConfiguration(definition: Object): string[] {
            let errors: string[] = [];
            let styles: Object = definition[Component.PARAMETER_STYLES];
            if (styles !== undefined && typeof styles !== "object") {
                errors.push(Component.PARAMETER_STYLES + Creator.MUST_BE_OBJECT_OR_UNDEFINED);
            }
            return errors;
        }

        private checkLinearLayout(definition: Object): string[] {
            let errors: string[] = [];
            let direction: string = definition[LinearLayout.PARAMETER_DIRECTION];
            if (direction !== undefined && typeof direction !== "string") {
                errors.push(Container.PARAMETER_LAYOUT + " " + LinearLayout.PARAMETER_DIRECTION + Creator.MUST_BE_STRING_OR_UNDEFINED);
            }
            if (typeof direction === "string" &&
                [LinearLayout.DIRECTION_VERTICAL, LinearLayout.DIRECTION_HORIZONTAL].indexOf(direction) === -1) {
                errors.push(Container.PARAMETER_LAYOUT + " " + LinearLayout.PARAMETER_DIRECTION + Creator.HAS_WRONG_VALUE);
            }
            let reverse: string = definition[LinearLayout.PARAMETER_REVERSE];
            if (reverse !== undefined && typeof reverse !== "boolean") {
                errors.push(Container.PARAMETER_LAYOUT + " " + LinearLayout.PARAMETER_REVERSE + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
            }
            let align: string = definition[LinearLayout.PARAMETER_ALIGN];
            if (align !== undefined && typeof align !== "string") {
                errors.push(Container.PARAMETER_LAYOUT + " " + LinearLayout.PARAMETER_ALIGN + Creator.MUST_BE_STRING_OR_UNDEFINED);
            }
            if (typeof align === "string" &&
                [LinearLayout.ALIGN_START, LinearLayout.ALIGN_CENTER, LinearLayout.ALIGN_END].indexOf(align) === -1) {
                errors.push(Container.PARAMETER_LAYOUT + " " + LinearLayout.PARAMETER_ALIGN + Creator.HAS_WRONG_VALUE);
            }
            return errors;
        }

        private checkTableLayout(definition: Object): string[] {
            let errors: string[] = [];
            let rows: string = definition[TableLayout.PARAMETER_ROWS];
            if (rows !== undefined && typeof rows !== "number") {
                errors.push(Container.PARAMETER_LAYOUT + " " + TableLayout.PARAMETER_ROWS + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
            }
            let cells: string = definition[TableLayout.PARAMETER_CELLS];
            if (cells !== undefined && typeof cells !== "number") {
                errors.push(Container.PARAMETER_LAYOUT + " " + TableLayout.PARAMETER_CELLS + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
            }
            return errors;
        }
        
        private checkContainerConfiguration(definition: Object): string[] {
            let errors: string[] = this.checkComponentConfiguration(definition);
            let layout: Object = definition[Container.PARAMETER_LAYOUT];
            if (layout !== undefined && typeof layout !== "object") {
                errors.push(Container.PARAMETER_LAYOUT + Creator.MUST_BE_OBJECT_OR_UNDEFINED);
            }
            let type: string = layout[Layout.PARAMETER_TYPE];
            if (typeof type !== "string") {
                errors.push(Container.PARAMETER_LAYOUT + " " + Layout.PARAMETER_TYPE + Creator.MUST_BE_STRING);
            }
            if ([Layout.TYPE_NULL_LAYOUT, Layout.TYPE_RELATIVE_LAYOUT, Layout.TYPE_LINEAR_LAYOUT, Layout.TYPE_TABLE_LAYOUT]
                    .indexOf(type) === -1) {
                errors.push(Container.PARAMETER_LAYOUT + " " + Layout.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE);
            }
            switch (type) {
                case Layout.TYPE_LINEAR_LAYOUT:
                    errors.push.apply(errors, this.checkLinearLayout(layout));
                    break;
                case Layout.TYPE_TABLE_LAYOUT:
                    errors.push.apply(errors, this.checkTableLayout(layout));
                    break;
                default:
                    break;
            }
            return errors;
        }
    }

    /**
     * Method that defines different types of views
     *
     * @param {string} name Name of view
     * @param {string} type Type of view
     * @param {Object[]} definition Definition for view
     */
    export function define(name: string, type: string, definition: Object[] = []): void {
        Creator.getInstance().define(name, type, definition);
    }

    /**
     * Method that creates defined views
     *
     * @param {string} name Name of view
     */
    export function create(name: string): Container {
        return Creator.getInstance().create(name);
    }
}


