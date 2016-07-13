/// <reference path="Proxy.ts" />
/// <reference path="../Container/Container.ts" />

module Ompluscript.Model.Proxy {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import OnDoneProxyEvent = Ompluscript.Model.Event.OnDoneProxyEvent;

    export abstract class StorageProxy extends Proxy {

        private storage: Storage;

        constructor(name: string, container: Container, storage: Storage = undefined) {
            super(name, container);
            this.storage = storage;
        }

        public save(): void {
            this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
            this.finish(OnDoneProxyEvent.TYPE_SAVED, this.container.getValues());
        }

        public update(): void {
            this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
            this.finish(OnDoneProxyEvent.TYPE_UPDATED, this.container.getValues());
        }

        public delete(): void {
            this.storage.removeItem(this.container.getName());
            this.finish(OnDoneProxyEvent.TYPE_DELETED, this.container.getValues());
        }

        public select(query: Object): void {
            let result: string = this.storage.getItem(this.container.getName());
            this.finish(OnDoneProxyEvent.TYPE_SELECTED, JSON.parse(result));
        }

    }
}
