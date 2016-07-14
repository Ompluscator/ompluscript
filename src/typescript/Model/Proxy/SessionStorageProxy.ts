/// <reference path="StorageProxy.ts" />

/**
 * Module that contains proxy classes.
 *
 * @module Ompluscript.Model.Proxy
 */
module Ompluscript.Model.Proxy {
    "use strict";
    
    /**
     * Class that contains functionality for Session Storage Proxy.
     *
     * @class SessionStorageProxy
     */
    export class SessionStorageProxy extends StorageProxy {

        /**
         * @type {string} TYPE_SESSION_STORAGE_PROXY Defines type of session storage proxy
         */
        public static TYPE_SESSION_STORAGE_PROXY: string = SessionStorageProxy["name"];

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @constructs
         */
        constructor() {
            super(SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY, window.sessionStorage);
        }
    }
}
