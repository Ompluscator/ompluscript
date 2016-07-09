/// <reference path="LinearLayout.ts" />
/// <reference path="NullLayout.ts" />

/**
 * Module that contains layout components
 *
 * @module Ompluscript.View.Layout
 */
module Ompluscript.View.Layout {
    "use strict";

    import Component = Ompluscript.View.Component.Component;

    /**
     * Class that defines linear layout
     *
     * @class Container
     */
    export class TableLayout extends LinearLayout {

        private rows: number;

        private cells: number;

        constructor(rows: number = 1, cells: number = 1) {
            super(LinearLayout.DIRECTION_VERTICAL, false, LinearLayout.ALIGN_CENTER);
            this.rows = rows;
            this.cells = cells;
            for (let i: number = 0; i < this.rows; i++) {
                let layout: LinearLayout = new LinearLayout();
                for (let j: number = 0; j < this.cells; j++) {
                    let container: NullLayout = new NullLayout();
                    container.setStyle(Component.STYLE_WIDTH, "calc(100% / " + this.cells + ")");
                    container.setStyle(Component.STYLE_HEIGHT, "1px");
                    layout.addChild(container);
                }
                this.addChild(layout);
            }
        }

        protected appendChild(component: Component): void {
            this.htmlElement.appendChild(component.render());
        }

        protected clear(): void {
            while (this.htmlElement.firstChild) {
                this.htmlElement.removeChild(this.htmlElement.firstChild);
            }
        }

        protected initializeHtmlElement(): void {
            super.initializeHtmlElement();
            this.addClass(LinearLayout.LINEAR_LAYOUT_CLASS);
        }
    }

}
