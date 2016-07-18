/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/Observable.ts" />
/// <reference path="../../Core/Observer/Event.ts" />

module Ompluscript.Controller.Controller {
    "use strict";
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import Observable = Ompluscript.Core.Observer.Observable;
    import Event = Ompluscript.Core.Observer.Event;

    export abstract class Controller extends Observable implements IBase, IObserver {

        /**
         * @type {string} PARAMETER_EVENTS Name of events parameter
         */
        public static PARAMETER_EVENTS: string = "events";

        /**
         * @type {string} PARAMETER_NAME Name of name parameter
         */
        public static PARAMETER_NAME: string = "name";

        /**
         * @type {string} PARAMETER_HANDLERS Name of handlers parameter
         */
        public static PARAMETER_HANDLERS: string = "handlers";

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
            if (this.handlers.hasOwnProperty(event.getSender().getName())) {
                if (this.handlers[event.getSender().getName()].hasOwnProperty(event.getType())) {
                    let handlers: Function[] = this.handlers[event.getSender().getName()][event.getType()];
                    for (let i: number = 0; i < handlers.length; i++) {
                         handlers[i].bind(this)(event);
                    }
                }
            }
        }

        /**
         * Method that returns name of boject
         *
         * @returns {string} Object's name
         */
        public getName(): string {
            return this.name;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = {};
            trace[Controller.PARAMETER_HANDLERS] = [];
            for (let key in this.handlers) {
                if (this.handlers.hasOwnProperty(key)) {
                    trace[Controller.PARAMETER_HANDLERS].push(key);
                }
            }
            trace[Controller.PARAMETER_NAME] = this.name;
            return trace;
        }
    }
}
