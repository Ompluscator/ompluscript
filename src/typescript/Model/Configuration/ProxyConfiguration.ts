/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../Container/Container.ts" />

module Ompluscript.Model.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Container = Ompluscript.Model.Container.Container;

    export abstract class ProxyConfiguration extends Configuration {
        
        public abstract create(definition: Object, container?: Container): IBase;
        
    }
}
