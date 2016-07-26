/// <reference path="Container.ts" />
/// <reference path="InputContainer.ts" />
/// <reference path="../Layout/Layout.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Field/Input.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />
/// <reference path="../Event/FieldEvent.ts" />
/// <reference path="../Event/OnFieldClick.ts" />
/// <reference path="../../Model/Event/OnRemoveRowFromTable.ts" />
/// <reference path="../../Model/Event/OnAddRowToTable.ts" />
/// <reference path="../../Model/Event/OnClearTable.ts" />
/// <reference path="../../Model/Event/OnUpdateTable.ts" />
/// <reference path="../../Model/Container/Model.ts" />
/// <reference path="../../Model/Container/Table.ts" />
/// <reference path="../Layout/TableLayout.ts" />
/// <reference path="../Event/OnFormFail.ts" />
/// <reference path="../Event/OnFormSubmit.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";
    
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import OEvent = Ompluscript.Core.Observer.OEvent;
    import Table = Ompluscript.Model.Container.Table;
    import TextContent = Ompluscript.View.Field.TextContent;
    import Field = Ompluscript.View.Field.Field;
    import TableEvent = Ompluscript.Model.Event.TableEvent;
    import OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
    import Input = Ompluscript.View.Field.Input;
    import OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;
    import Model = Ompluscript.Model.Container.Model;
    import OnClearTable = Ompluscript.Model.Event.OnClearTable;
    import OnUpdateTable = Ompluscript.Model.Event.OnUpdateTable;
    import TableLayout = Ompluscript.View.Layout.TableLayout;

    /**
     * Class that defines table
     *
     * @class TableContainer
     */
    export class TableContainer extends Container implements IObserver {

        /**
         * @type {string} TYPE_TABLE Type of table
         */
        public static TYPE_TABLE: string = TableContainer["name"];

        /**
         * @type {string} PARAMETER_TABLE Name of table parameter
         */
        public static PARAMETER_TABLE: string = "table";

        /**
         * @type {string} PARAMETER_HEADERS Name of headers parameter
         */
        public static PARAMETER_HEADERS: string = "headers";

        /**
         * @type {string} PARAMETER_CELLS Name of cells parameter
         */
        public static PARAMETER_CELLS: string = "cells";

        /**
         * @type {string} CLASS_TABLE Class of HTML div element for table
         */
        public static CLASS_TABLE: string = "table";

        /**
         * @type {Table} table Table that contains attributes for form
         */
        private table: Table;

        /**
         * @type {TextContent[]} headers Components that define headers of table
         */
        private headers: TextContent[];

        /**
         * @type {Field[]} cells Components that define one row in table
         */
        private cells: Field[];

        /**
         * @type {Field[][]} rows Components that represent all rows in table
         */
        private rows: Field[][];

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {string} name Name of container
         * @param {Table} table Table that contains attributes for form
         * @param {Field[]} cells List of input components
         * @param {TextContent[]} headers List of input components
         * @param {Object} styles Styles for container
         * @constructs
         */
        constructor(name: string, table: Table, headers: TextContent[],
                    cells: Field[] = undefined, styles: Object = undefined) {
            super(name, undefined, [], styles);
            this.addClass(TableContainer.CLASS_TABLE);
            this.table = table;
            this.headers = headers;
            this.cells = cells;
            this.rows = [];
            if (this.table !== undefined) {
                this.table.addObserverByType(this, TableEvent.ON_ADD_ROW_TO_TABLE);
                this.table.addObserverByType(this, TableEvent.ON_REMOVE_ROW_FROM_TABLE);
                this.table.addObserverByType(this, TableEvent.ON_CLEAR_TABLE);
                this.table.addObserverByType(this, TableEvent.ON_UPDATE_TABLE);
            }
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {OEvent} event
         */
        public update(event: OEvent): void {
            if (event instanceof OnAddRowToTable) {
                this.addRow((<OnAddRowToTable>event).getModel());
            } else if (event instanceof OnRemoveRowFromTable) {
                this.removeRow((<OnRemoveRowFromTable>event).getIndex());
            } else if (event instanceof OnClearTable) {
                this.clearRows();
            } else if (event instanceof OnUpdateTable) {
                this.updateRows();
            }
        }

        /**
         * Method that returns table object
         *
         * @returns {Table}
         */
        public getTable(): Table {
            return this.table;
        }

        /**
         * Method that adds new row in table
         *
         * @param {Model} model
         */
        private addRow(model: Model): void {
            let cells: Field[] = [];
            for (let i: number = 0; i < this.cells.length; i++) {
                let cell: Field = <Field>this.cells[i].clone();
                if (cell instanceof Input) {
                    (<Input>cell).setBinding(model.getAttribute(cell.getName()));
                }
                cells.push(cell);
            }
            this.rows.push(cells);
        }

        /**
         * Method that removes one row from table
         *
         * @param index
         */
        private removeRow(index: number): void {
            if (this.rows[index] !== undefined) {
                for (let i: number = 0; i < this.rows[index].length; i++) {
                    this.rows[index][i].dispose();
                }
                this.rows.slice(index, 1);
            }
        }

        /**
         * Method that removes all rows from table
         */
        private clearRows(): void {
            for (let i: number = this.rows.length; i > -1; i--) {
                this.removeRow(i);
            }
            this.rows = [];
        }

        /**
         * Method that sets all row in table
         */
        private updateRows(): void {
            this.clearChildren();
            this.layout = new TableLayout(this.rows.length + 1, this.cells.length);
            for (let i: number = 0; i < this.headers.length; i++) {
                this.addChild(this.headers[i]);
            }
            for (let i: number = 0; i < this.rows.length; i++) {
                for (let j: number = 0; j < this.rows[i].length; j++) {
                    this.addChild(this.rows[i][j]);
                }
            }
            this.render();
        }
    }
}
