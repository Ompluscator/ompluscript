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
     * Class that contains functionality for Session Storage Proxy.
     *
     * @class SessionStorageProxy
     */
    export class SessionStorageProxy extends StorageProxy {

        /**
         * @type {string} TYPE_SESSION_STORAGE_PROXY Defines type of session storage proxy
         */
        public static TYPE_SESSION_STORAGE_PROXY: string = "sessionStorage";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {Container} container Container for which proxy refers
         * @constructs
         */
        constructor(container: Container) {
            super(SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY, container, window.sessionStorage);
        }
    }
}
