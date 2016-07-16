/// <reference path="../Component/Component.ts" />
/// <reference path="../Layout/Layout.ts" />
/// <reference path="../Layout/NullLayout.ts" />
/// <reference path="../Configuration/Layout/NullLayoutConfiguration.ts" />
/// <reference path="../Configuration/Layout/RelativeLayoutConfiguration.ts" />
/// <reference path="../Configuration/Layout/LinearLayoutConfiguration.ts" />
/// <reference path="../Configuration/Layout/TableLayoutConfiguration.ts" />
/// <reference path="../Configuration/Field/CheckBoxInputConfiguration.ts" />
/// <reference path="../Configuration/Field/EmailInputConfiguration.ts" />
/// <reference path="../Configuration/Field/NumberInputConfiguration.ts" />
/// <reference path="../Configuration/Field/PasswordInputConfiguration.ts" />
/// <reference path="../Configuration/Field/TextInputConfiguration.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Container {
    "use strict";

    import Component = Ompluscript.View.Component.Component;
    import Layout = Ompluscript.View.Layout.Layout;
    import NullLayout = Ompluscript.View.Layout.NullLayout;

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export abstract class Container extends Layout {

        public static PARAMETER_LAYOUT: string = "layout";

        public static PARAMETER_CHILDREN: string = "children";
        
        protected layout: Layout;
        
        constructor(name: string, layout: Layout = undefined, children: Component[] = undefined, styles: Object = undefined) {
            super(name, styles);
            this.layout = layout;
            if (this.layout === undefined) {
                this.layout = new NullLayout();
            }
            if (Array.isArray(children)) {
                for (let i: number = 0; i < children.length; i++) {
                    this.addChild(children[i]);
                }
            }
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
    }

}
