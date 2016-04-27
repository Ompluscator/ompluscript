/// <reference path="IObserver.ts" />
/// <reference path="Event.ts" />

module Ompluscript.Core.Observer {
    "use strict";

    export abstract class Observable {

        /**
         * @type {Object} observers Contains all observers by event.
         */
        protected observers: Object;

        constructor() {
            this.observers = {};
        }

        public addObserver(observer: IObserver, type: string): void {
            if (this.observers.hasOwnProperty(type)) {
                this.observers[type] = [];
            }
            this.observers[type].push(observer);
        }

        public deleteObserver(observer: IObserver, type: string): void {
            if (this.observers.hasOwnProperty(type)) {
                for (let i in this.observers[type]) {
                    if (this.observers[type].hasOwnProperty(i) && this.observers[type][i] === observer) {
                        this.observers[type].splice(i, 1);
                    }
                }
            }
        }

        public clearObserver(type: string): void {
            if (this.observers.hasOwnProperty(type)) {
                this.observers[type] = [];
            }
        }

        protected notifyObservers(event: Event): void {
            if (this.observers[event.getType()] !== undefined) {
                for (let i in this.observers[event.getType()]) {
                    if (this.observers[event.getType()].hasOwnProperty(i)) {
                        this.observers[event.getType()][i].update(this, event);
                    }
                }
            }
        }
        
    }

}
