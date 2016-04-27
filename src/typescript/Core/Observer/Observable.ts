/// <reference path="../Interfaces/IBase.ts" />
/// <reference path="IObserver.ts" />
/// <reference path="Event.ts" />

/**
 * Module that creates basic functionality for observing objects.
 *
 * @module Ompluscript.Core.Observer
 */
module Ompluscript.Core.Observer {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines basic functionality object that fires events
     * 
     * @class Observable
     */
    export abstract class Observable implements IBase {

        /**
         * @type {Object} events Contains all observers by event type.
         */
        protected events: Object;

        /**
         * Class constructor
         * 
         * Initializes empty map for observer
         * 
         * @constructs
         */
        constructor() {
            this.events = {};
        }

        /**
         * Method that adds new observer to map
         * 
         * @param {IObserver} observer Observer that handles event
         * @param {type} type Type of event
         */
        public addObserverByType(observer: IObserver, type: string): void {
            if (this.events.hasOwnProperty(type)) {
                this.events[type] = [];
            }
            this.events[type].push(observer);
        }

        /**
         * Method that removes observer from map
         *
         * @param {IObserver} observer Observer that handles event
         * @param {type} type Type of event
         */
        public deleteObserverByType(observer: IObserver, type: string): void {
            if (this.events.hasOwnProperty(type)) {
                for (let i in this.events[type]) {
                    if (this.events[type].hasOwnProperty(i) && this.events[type][i] === observer) {
                        this.events[type].splice(i, 1);
                    }
                }
            }
        }

        /**
         * Method removes all observers.
         */
        public clearObservers(): void {
            this.events = {};
        }

        /**
         * Method that removes all observers for event type
         *
         * @param {type} type Type of event
         */
        public clearObserversByType(type: string): void {
            if (this.events.hasOwnProperty(type)) {
                this.events[type] = [];
            }
        }

        /**
         * Method removes all observers.
         */
        public dispose(): void {
            this.clearObservers();
        }

        /**
         * Method that returns name of boject
         *
         * @returns {string} Object's name
         */
        public abstract getName(): string;

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public abstract getStackTrace(): Object;

        /**
         * Method that fires event.
         * 
         * @param {Event} event Event that need to be fired
         */
        protected notifyObservers(event: Event): void {
            if (this.events[event.getType()] !== undefined) {
                for (let i in this.events[event.getType()]) {
                    if (this.events[event.getType()].hasOwnProperty(i)) {
                        this.events[event.getType()][i].update(event);
                    }
                }
            }
        }
        
    }

}
