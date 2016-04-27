/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="IObserver.ts" />
/// <reference path="Event.ts" />

module Ompluscript.Core.Observer {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    
    export abstract class Observable implements IBase {

        /**
         * @type {Object} observers Contains all observers by event.
         */
        protected observers: Object;

        constructor() {
            this.observers = {};
        }

        public addObserverByType(observer: IObserver, type: string): void {
            if (this.observers.hasOwnProperty(type)) {
                this.observers[type] = [];
            }
            this.observers[type].push(observer);
        }

        public deleteObserverByType(observer: IObserver, type: string): void {
            if (this.observers.hasOwnProperty(type)) {
                for (let i in this.observers[type]) {
                    if (this.observers[type].hasOwnProperty(i) && this.observers[type][i] === observer) {
                        this.observers[type].splice(i, 1);
                    }
                }
            }
        }
        
        public clearObservers(): void {
            this.observers = {};
        }

        public clearObserversByType(type: string): void {
            if (this.observers.hasOwnProperty(type)) {
                this.observers[type] = [];
            }
        }
        
        public dispose(): void {
            this.clearObservers();
        }

        public abstract getName(): string;

        public abstract getStackTrace(): Object;

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
