/// <reference path="StorageProxy.ts" />
/// <reference path="../Container/Container.ts" />

/**
 * Module that contains proxy classes.
 *
 * @module Ompluscript.Model.Proxy
 */
module Ompluscript.Model.Proxy {
    "use strict";
    
    import Container = Ompluscript.Model.Container.Container;

    /**
     * Class that contains functionality for Local Storage Proxy.
     *
     * @class LocalStorageProxy
     */
    export class LocalStorageProxy extends StorageProxy {

        /**
         * @type {string} TYPE_LOCAL_STORAGE_PROXY Defines type of local storage proxy
         */
        public static TYPE_LOCAL_STORAGE_PROXY: string = LocalStorageProxy["name"];

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {Container} container Container for which proxy refers
         * @constructs
         */
        constructor(container: Container) {
            super(LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY, container, window.localStorage);
        }
    }
}
