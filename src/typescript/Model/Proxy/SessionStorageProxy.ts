/// <reference path="StorageProxy.ts" />
/// <reference path="../Container/Container.ts" />

module Ompluscript.Model.Proxy {
    "use strict";
    
    import Container = Ompluscript.Model.Container.Container;

    export class SessionStorageProxy extends StorageProxy {
        
        public static TYPE_SESSION_STORAGE_PROXY: string = "sessionStorage";

        constructor(container: Container) {
            super(SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY, container, window.sessionStorage);
        }

    }
}
