/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Container/Page.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../Layout/Layout.ts" />
/// <reference path="ContainerConfiguration.ts" />

module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Page = Ompluscript.View.Container.Page;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Container.Container;
    import Layout = Ompluscript.View.Layout.Layout;


    export class PageConfiguration extends ContainerConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE;
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let layout: Layout = <Layout>super.createChild(definition, Container.PARAMETER_LAYOUT);
            let children: Component[] = <Component[]>super.createChildren(definition, Container.PARAMETER_CHILDREN);
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new Page(name, layout, children, styles);
        }
    }
}
