/// <reference path="../Interfaces/IObserver.ts" />

module Ompluscript.Core.Interfaces {
    "use strict";

    export abstract class Observable {

        /**
         * @type {Object} observers Contains all observers by event.
         */
        protected observers: Object;

        constructor() {
            this.observers = {};
        }

        public addObserver(observer: IObserver, type: number): void {
            if (this.observers[type] !== undefined) {
                this.observers[type] = [];
            }
            this.observers[type].push(observer);
        }

        public deleteObserver(observer: IObserver, type: number): void {
            if (this.observers[type] !== undefined) {
                for (let i in this.observers[type]) {
                    if (this.observers[type].hasOwnProperty(i) && this.observers[type][i] === observer) {
                        this.observers[type].splice(i, 1);
                    }
                }
            }
        }

        public clearObserver(type: number): void {
            if (this.observers[type] !== undefined) {
                this.observers[type] = [];
            }
        }

        public notifyObservers(type: number): void {
            if (this.observers[type] !== undefined) {
                for (let i in this.observers[type]) {
                    if (this.observers[type].hasOwnProperty(i)) {
                        this.observers[type][i].update(this, type);
                    }
                }
            }
        }
        
    }

}
