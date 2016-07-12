/// <reference path="Component.ts" />
/// <reference path="Layout.ts" />
/// <reference path="../Layout/NullLayout.ts" />
/// <reference path="../Layout/LinearLayout.ts" />
/// <reference path="../Layout/RelativeLayout.ts" />
/// <reference path="../Layout/TableLayout.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Component {
    "use strict";

    import Component = Ompluscript.View.Component.Component;
    import NullLayout = Ompluscript.View.Layout.NullLayout;
    import LinearLayout = Ompluscript.View.Layout.LinearLayout;
    import RelativeLayout = Ompluscript.View.Layout.RelativeLayout;
    import TableLayout = Ompluscript.View.Layout.TableLayout;

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export abstract class Container extends Layout {
        
        public static PARAMETER_LAYOUT: string = "layout";
        
        public static CONTAINER_PAGE: string = "page";
        
        protected layout: Layout;
        
        constructor(name: string, definition: Object = {}) {
            super(name, definition[Component.PARAMETER_STYLES]);
            this.layout = this.createLayout(definition[Container.PARAMETER_LAYOUT]);
        }

        public addChild(component: Component): void {
            super.addChild(component);
            this.layout.addChild(component);
        }

        public removeChild(component: Component): void {
            super.removeChild(component);
            this.layout.removeChild(component);
        }

        public clearChildren(): void {
            super.clearChildren();
            this.layout.clearChildren();
        }

        public render(): HTMLElement {
            this.clear();
            this.layout.render();
            this.appendChild(this.layout);
            return this.htmlElement;
        }
        
        protected clear(): void {
            while (this.htmlElement.firstChild) {
                this.htmlElement.removeChild(this.htmlElement.firstChild);
            }
        }
        
        protected appendChild(component: Component): void {
            this.htmlElement.appendChild(component.render());
        }

        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Layout.DIV_ELEMENT);
        }
        
        private createLayout(definition: Object = undefined): Layout {
            if (definition === undefined) {
                return new NullLayout();
            } else {
                switch (definition[Layout.PARAMETER_TYPE]) {
                    case Layout.TYPE_NULL_LAYOUT:
                        return new NullLayout();
                    case Layout.TYPE_LINEAR_LAYOUT:
                        let direction: string = definition[LinearLayout.PARAMETER_DIRECTION];
                        let reverse: boolean = definition[LinearLayout.PARAMETER_REVERSE];
                        let align: string = definition[LinearLayout.PARAMETER_ALIGN];
                        return new LinearLayout(direction, reverse, align);
                    case Layout.TYPE_RELATIVE_LAYOUT:
                        return new RelativeLayout();
                    case Layout.TYPE_TABLE_LAYOUT:
                        let rows: number = definition[TableLayout.PARAMETER_ROWS];
                        let cells: number = definition[TableLayout.PARAMETER_CELLS];
                        return new TableLayout(rows, cells);
                    default:
                        return undefined;
                }
            }
        }
    }

}
