/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="ContainerConfiguration.ts" />
/// <reference path="../Container/Model.ts" />

module Ompluscript.Model.Configuration {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Model = Ompluscript.Model.Container.Model;
    import Container = Ompluscript.Model.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    
    export class ModelConfiguration extends ContainerConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Model.TYPE_MODEL;
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let attributes: Object[] = definition[Container.PARAMETER_DEFINITION];
            return new Model(name, attributes);
        }
    }
}
