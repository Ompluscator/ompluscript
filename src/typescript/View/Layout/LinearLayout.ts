/// <reference path="Layout.ts" />

/**
 * Module that contains layout components
 *
 * @module Ompluscript.View.Layout
 */
module Ompluscript.View.Layout {
    "use strict";

    import Component = Ompluscript.View.Component.Component;

    /**
     * Class that defines linear layout functionality
     *
     * @class LinearLayout
     */
    export class LinearLayout extends Layout {

        /**
         * @type {string} TYPE_LINEAR_LAYOUT Type of linear layout class
         */
        public static TYPE_LINEAR_LAYOUT: string = LinearLayout["name"];

        /**
         * @type {string} PARAMETER_DIRECTION Name of direction parameter
         */
        public static PARAMETER_DIRECTION: string = "direction";

        /**
         * @type {string} PARAMETER_DIRECTION Name of reverse parameter
         */
        public static PARAMETER_REVERSE: string = "reverse";

        /**
         * @type {string} PARAMETER_DIRECTION Name of align parameter
         */
        public static PARAMETER_ALIGN: string = "align";

        /**
         * @type {string} DIRECTION_HORIZONTAL Option for horizontal direction
         */
        public static DIRECTION_HORIZONTAL: string = "horizontal";

        /**
         * @type {string} DIRECTION_VERTICAL Option for vertical direction
         */
        public static DIRECTION_VERTICAL: string = "vertical";

        /**
         * @type {string} ALIGN_START Option for alignment to start
         */
        public static ALIGN_START: string = "start";

        /**
         * @type {string} ALIGN_START Option for alignment to end
         */
        public static ALIGN_END: string = "end";

        /**
         * @type {string} ALIGN_START Option for alignment to center
         */
        public static ALIGN_CENTER: string = "center";

        /**
         * @type {string} CLASS_LINEAR_LAYOUT Class of HTML div element for linear layout
         */
        public static CLASS_LINEAR_LAYOUT: string = "linear-layout";

        /**
         * @type {string} CLASS_PREFIX Class prefix of HTML div element for linear layout
         */
        private static CLASS_PREFIX: string = "flex-";

        /**
         * @type {string} CLASS_PREFIX Class of HTML div element for reverse ordering in linear layout
         */
        private static CLASS_REVERSE: string = "reverse";

        /**
         * @type {string} direction Direction of layout
         */
        private direction: string;

        /**
         * @type {boolean} reverse Defines reverse ordering
         */
        private reverse: boolean;

        /**
         * @type {string} align Alignment of layout
         */
        private align: string;

        /**
         * Class constructor.
         *
         * Sets direction, ordering and alignment.
         * Calls constructor of superclass.
         *
         * @param {string} direction Direction of layout
         * @param {boolean} reverse Defines reverse ordering
         * @param {string} align Alignment of layout
         * @param {string} name Name of layout
         * @constructs
         */
        constructor(direction: string = LinearLayout.DIRECTION_HORIZONTAL, reverse: boolean = false,
                    align: string = LinearLayout.ALIGN_START, name: string = LinearLayout.TYPE_LINEAR_LAYOUT) {
            super(name);
            this.direction = direction;
            this.reverse = reverse;
            this.align = align;
            this.setUpLayout();
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[LinearLayout.PARAMETER_ALIGN] = this.align;
            trace[LinearLayout.PARAMETER_DIRECTION] = this.direction;
            trace[LinearLayout.PARAMETER_REVERSE] = this.reverse;
            return trace;
        }

        /**
         * Method that defines how component's HTML content should be added to DOM
         *
         * @param {Component} component That should be added
         */
        protected appendChild(component: Component): void {
            this.htmlElement.appendChild(component.render());
        }

        /**
         * Method that defines how component's HTML content should be cleared
         */
        protected clear(): void {
            while (this.htmlElement.firstChild) {
                this.htmlElement.removeChild(this.htmlElement.firstChild);
            }
        }

        /**
         * Method that adds classes to HTML element depending on its configuration
         */
        protected setUpLayout(): void {
            this.addClass(LinearLayout.CLASS_LINEAR_LAYOUT);
            this.addClass(LinearLayout.CLASS_PREFIX + this.direction);
            this.addClass(LinearLayout.CLASS_PREFIX + this.align);
            if (this.reverse === true) {
                this.addClass(LinearLayout.CLASS_PREFIX + LinearLayout.CLASS_REVERSE);
            }
        }
    }
}
