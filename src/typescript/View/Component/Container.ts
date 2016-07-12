/// <reference path="Component.ts" />
/// <reference path="Layout.ts" />
/// <reference path="../Layout/NullLayout.ts" />
/// <reference path="../Configuration/NullLayoutConfiguration.ts" />
/// <reference path="../Configuration/RelativeLayoutConfiguration.ts" />
/// <reference path="../Configuration/LinearLayoutConfiguration.ts" />
/// <reference path="../Configuration/TableLayoutConfiguration.ts" />

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
    import NullLayoutConfiguration = Ompluscript.View.Configuration.NullLayoutConfiguration;
    import RelativeLayoutConfiguration = Ompluscript.View.Configuration.RelativeLayoutConfiguration;
    import LinearLayoutConfiguration = Ompluscript.View.Configuration.LinearLayoutConfiguration;
    import TableLayoutConfiguration = Ompluscript.View.Configuration.TableLayoutConfiguration;

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export abstract class Container extends Layout {
        
        public static PARAMETER_LAYOUT: string = "layout";
        
        public static CONTAINER_PAGE: string = "page";
        
        protected layout: Layout;
        
        constructor(name: string, layoutDefinition: Object = undefined, styles: Object = undefined) {
            super(name, styles);
            this.createLayout(layoutDefinition);
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
    }

}
