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
     * @class LocaleStorageProxy
     */
    export class LocaleStorageProxy extends StorageProxy {

        /**
         * @type {string} TYPE_LOCAL_STORAGE_PROXY Defines type of local storage proxy
         */
        public static TYPE_LOCAL_STORAGE_PROXY: string = "localStorage";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {Container} container Container for which proxy refers
         * @constructs
         */
        constructor(container: Container) {
            super(LocaleStorageProxy.TYPE_LOCAL_STORAGE_PROXY, container, window.localStorage);
        }
    }
}
