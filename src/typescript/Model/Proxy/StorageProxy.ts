/// <reference path="Proxy.ts" />
/// <reference path="../Event/OnDoneProxy.ts" />

/**
 * Module that contains proxy classes.
 *
 * @module Ompluscript.Model.Proxy
 */
module Ompluscript.Model.Proxy {
    "use strict";

    import OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;

    /**
     * Abstract class that contains basic functionality for Storage Proxy.
     *
     * @class StorageProxy
     */
    export abstract class StorageProxy extends Proxy {

        /**
         * @type {Storage} storage Contains a reference to desired storage object
         */
        private storage: Storage;

        /**
         * Class constructor.
         * 
         * Sets storage reference and calls constructor of superclass.
         * 
         * @param {string} name Name of proxy
         * @param {Storage} storage Contains a reference to desired storage object
         * @constructs
         */
        constructor(name: string, storage: Storage) {
            super(name);
            this.storage = storage;
        }

        /**
         * Method that should perform save request of storage proxy
         */
        public save(): void {
            this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
            this.finish(OnDoneProxy.TYPE_SAVED, this.container.getValues());
        }

        /**
         * Method that should perform update request of storage proxy
         */
        public update(): void {
            this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
            this.finish(OnDoneProxy.TYPE_UPDATED, this.container.getValues());
        }

        /**
         * Method that should perform delete request of storage proxy
         */
        public delete(): void {
            this.storage.removeItem(this.container.getName());
            this.finish(OnDoneProxy.TYPE_DELETED, this.container.getValues());
        }

        /**
         * Method that should perform query request of storage proxy
         */
        public select(): void {
            let result: string = this.storage.getItem(this.container.getName());
            this.finish(OnDoneProxy.TYPE_SELECTED, JSON.parse(result));
        }

    }
}
