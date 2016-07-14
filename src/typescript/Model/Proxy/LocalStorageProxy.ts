/// <reference path="StorageProxy.ts" />

/**
 * Module that contains proxy classes.
 *
 * @module Ompluscript.Model.Proxy
 */
module Ompluscript.Model.Proxy {
    "use strict";
    
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
         * @constructs
         */
        constructor() {
            super(LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY, window.localStorage);
        }
    }
}
