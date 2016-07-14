/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Container/Page.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Component/Container.ts" />
/// <reference path="../Component/ContainerConfiguration.ts" />

module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Page = Ompluscript.View.Container.Page;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Component.Container;
    import ContainerConfiguration = Ompluscript.View.Configuration.Component.ContainerConfiguration;
    

    export class PageConfiguration extends ContainerConfiguration {
        
        constructor() {
            super();
        }

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE;
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let layoutDefinition: Object = definition[Container.PARAMETER_LAYOUT];
            let children: Object[] = definition[Container.PARAMETER_CHILDREN];
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new Page(name, layoutDefinition, children, styles);
        }
    }
}
