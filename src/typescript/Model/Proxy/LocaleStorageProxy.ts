/// <reference path="StorageProxy.ts" />
/// <reference path="../Container/Container.ts" />

module Ompluscript.Model.Proxy {
    "use strict";
    
    import Container = Ompluscript.Model.Container.Container;

    export class LocaleStorageProxy extends StorageProxy {
        
        public static TYPE_LOCAL_STORAGE_PROXY: string = "localStorage";

        constructor(container: Container) {
            super(LocaleStorageProxy.TYPE_LOCAL_STORAGE_PROXY, container, window.localStorage);
        }

    }
}
