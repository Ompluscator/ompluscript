/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/Observable.ts" />
/// <reference path="../../Core/Observer/Event.ts" />

module Ompluscript.Contoller.Controller {
    "use strict";
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import Observable = Ompluscript.Core.Observer.Observable;
    import Event = Ompluscript.Core.Observer.Event;

    export abstract class Controller extends Observable implements IBase, IObserver {

        private name: string;

        private handlers: Object;

        constructor(name: string) {
            super();
            this.name = name;
            this.handlers = {};
        }

        public attachEventHandler(observable: Observable, type: string, handler: Function): void {
            if (!this.handlers.hasOwnProperty(observable.getName())) {
                this.handlers[observable.getName()] = {};
            }
            if (!this.handlers[observable.getName()].hasOwnProperty(type)) {
                this.handlers[observable.getName()][type] = [];
            }
            this.handlers[observable.getName()][type].push(handler);
            observable.addObserverByType(this, type);
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {Event} event
         */
        public update(event: Event): void {
            if (!this.handlers.hasOwnProperty(event.getSender().getName())) {
                if (!this.handlers[event.getSender().getName()].hasOwnProperty(event.getType())) {
                    let handlers: Function[] = this.handlers[event.getSender().getName()][event.getType()];
                    for (let i: number = 0; i < handlers.length; i++) {
                         handlers[i].bind(this)();
                    }
                }
            }
        }

        public getName(): string {
            return this.name;
        }

        public getStackTrace(): Object {
            return undefined;
        }
    }
}
