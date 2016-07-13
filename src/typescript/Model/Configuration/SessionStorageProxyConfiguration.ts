/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="ProxyConfiguration.ts" />
/// <reference path="../Proxy/LocaleStorageProxy.ts" />
/// <reference path="../Container/Container.ts" />

module Ompluscript.Model.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Container = Ompluscript.Model.Container.Container;
    import SessionStorageProxy = Ompluscript.Model.Proxy.SessionStorageProxy;

    export class SessionStorageProxyConfiguration extends ProxyConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY;
        }

        public getErrors(definition: Object): string[] {
            return [];
        }

        public create(definition: Object, container: Container = undefined): IBase {
            return new SessionStorageProxy(container);
        }
    }
}
