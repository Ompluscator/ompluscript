/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="InputConfiguration.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Field/Input.ts" />
/// <reference path="../Field/TextInput.ts" />
/// <reference path="../../Model/Attribute/Attribute.ts" />
/// <reference path="../../Model/Attribute/String.ts" />
/// <reference path="../../Model/Configuration/StringConfiguration.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Page = Ompluscript.View.Container.Page;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Component.Container;
    

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
