/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="ContainerConfiguration.ts" />
/// <reference path="../Container/Table.ts" />

module Ompluscript.Model.Configuration {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Table = Ompluscript.Model.Container.Table;
    import Container = Ompluscript.Model.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    
    export class TableConfiguration extends ContainerConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Table.TYPE_TABLE;
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let attributes: Object[] = definition[Container.PARAMETER_DEFINITION];
            return new Table(name, attributes);
        }
    }
}
