/// <reference path="Component.ts" />
/// <reference path="Layout.ts" />
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
module Ompluscript.View.Component {
    "use strict";

    import Component = Ompluscript.View.Component.Component;
    import NullLayout = Ompluscript.View.Layout.NullLayout;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import NullLayoutConfiguration = Ompluscript.View.Configuration.Layout.NullLayoutConfiguration;
    import RelativeLayoutConfiguration = Ompluscript.View.Configuration.Layout.RelativeLayoutConfiguration;
    import LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
    import TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
    import CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
    import EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
    import NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
    import PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
    import TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export abstract class Container extends Layout {

        public static PARAMETER_LAYOUT: string = "layout";

        public static PARAMETER_CHILDREN: string = "children";
        
        public static CONTAINER_PAGE: string = "page";
        
        protected layout: Layout;
        
        constructor(name: string, layoutDefinition: Object = undefined, children: Object[] = undefined, styles: Object = undefined) {
            super(name, styles);
            this.createLayout(layoutDefinition);
            this.createChildren(children);
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
        
        private createLayout(layoutDefinition: Object = undefined): void {
            if (layoutDefinition === undefined) {
                this.layout = new NullLayout();
            } else {
                let configurations: Configuration[] = [
                    Configuration.getInstance(NullLayoutConfiguration),
                    Configuration.getInstance(RelativeLayoutConfiguration),
                    Configuration.getInstance(LinearLayoutConfiguration),
                    Configuration.getInstance(TableLayoutConfiguration),
                ];
                for (let i: number = 0; i < configurations.length; i++) {
                    if (configurations[i].isRelatedTo(layoutDefinition)) {
                        this.layout = <Layout>configurations[i].create(layoutDefinition);
                    }
                }
            }
        }

        private createChildren(children: Object[] = undefined): void {
            if (children !== undefined) {
                let configurations: Configuration[] = [
                    Configuration.getInstance(CheckBoxInputConfiguration),
                    Configuration.getInstance(EmailInputConfiguration),
                    Configuration.getInstance(NumberInputConfiguration),
                    Configuration.getInstance(PasswordInputConfiguration),
                    Configuration.getInstance(TextInputConfiguration),
                ];
                for (let i: number = 0; i < children.length; i++) {
                    for (let j: number = 0; j < configurations.length; j++) {
                        if (configurations[j].isRelatedTo(children[i])) {
                            this.addChild(<Component>configurations[i].create(children[i]));
                        }
                    }
                }
            }
        }
    }

}
