/// <reference path="LinearLayout.ts" />
/// <reference path="../Component/Component.ts" />

/**
 * Module that contains layout components
 *
 * @module Ompluscript.View.Layout
 */
module Ompluscript.View.Layout {
    "use strict";
    import Component = Ompluscript.View.Component.Component;

    /**
     * Class that defines table layout functionality
     *
     * @class TableLayout
     */
    export class TableLayout extends LinearLayout {

        /**
         * @type {string} TYPE_TABLE_LAYOUT Type of table layout class
         */
        public static TYPE_TABLE_LAYOUT: string = TableLayout["name"];

        /**
         * @type {string} PARAMETER_ROWS Name of rows parameter
         */
        public static PARAMETER_ROWS: string = "rows";

        /**
         * @type {string} PARAMETER_CELLS Name of cells parameter
         */
        public static PARAMETER_CELLS: string = "cells";

        /**
         * @type {string} rows Number of rows
         */
        private rows: number;

        /**
         * @type {string} cells Number of cells
         */
        private cells: number;

        /**
         * @type {Component[]} copies Copy of list of all containing components
         */
        private copies: Component[];

        /**
         * Class constructor.
         * 
         * Sets number of rows and cells and calls
         * constructor of superclass.
         * 
         * @param {number} rows Number of rows
         * @param {number} cells Number of cells
         * @constructs
         */
        constructor(rows: number = 1, cells: number = 1) {
            super(LinearLayout.DIRECTION_VERTICAL, false, LinearLayout.ALIGN_CENTER, TableLayout.TYPE_TABLE_LAYOUT);
            this.rows = rows;
            this.cells = cells;
            for (let i: number = 0; i < this.rows; i++) {
                this.children.push(
                    new LinearLayout(LinearLayout.DIRECTION_HORIZONTAL, false, LinearLayout.ALIGN_CENTER, TableLayout.TYPE_TABLE_LAYOUT)
                );
            }
            this.copies = [];
        }

        /**
         * Method that add new componenet into the list.
         *
         * @param {Component} component
         */
        public addChild(component: Component): void {
            let row: number = Math.floor(this.getChildrenCount() / this.cells);
            if (row < this.children.length) {
                (<Layout>this.children[row]).addChild(component);
                this.copies.push(component);
            }
        }

        /**
         * Method that removes component from the list.
         *
         * @param {Component} component
         */
        public removeChild(component: Component): void {
            for (let i: number = 0; i < this.children.length; i++) {
                (<Layout>this.children[i]).clearChildren();
            }
            let index: number = this.copies.indexOf(component);
            if (index > -1) {
                this.copies.splice(index, 1);
            }
            for (let i: number = 0; i < this.copies.length; i++) {
                this.addChild(this.copies[i]);
            }
        }

        /**
         * Method that clears the list of components
         */
        public clearChildren(): void {
            for (let i: number = 0; i < this.children.length; i++) {
                (<Layout>this.children[i]).clearChildren();
            }
            this.copies = [];
        }

        /**
         * Method that returns number of components in list
         *
         * @returns {number} number of components in list
         */
        public getChildrenCount(): number {
            let count: number = 0;
            for (let i: number = 0; i < this.children.length; i++) {
                count += (<Layout>this.children[i]).getChildrenCount();
            }
            return count;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[TableLayout.PARAMETER_CELLS] = this.cells;
            trace[TableLayout.PARAMETER_ROWS] = this.rows;
            return trace;
        }

        /**
         * Method that defines how component's HTML content should be cleared
         */
        protected clear(): void {
            return;
        }
    }
}
