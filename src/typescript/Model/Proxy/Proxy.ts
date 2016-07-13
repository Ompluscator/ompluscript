/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../Container/Container.ts" />

module Ompluscript.Model.Proxy {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    export abstract class Proxy implements IBase {

        protected name: string;
        
        protected container: Container;

        constructor(name: string, container: Container) {
            this.name = name;
            this.container = container;
        }

        public getName(): string {
            return this.name;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = {
                name: this.name,
            };
            return trace;
        }

        /**
         * Method that should be called before removing reference from object.
         */
        public dispose(): void {
            return undefined;
        }

        public abstract save(): void;

        public abstract update(): void;

        public abstract delete(): void;

        public abstract select(query: Object): void;
        
        protected finish(action: string, response: Object): void {
            this.container.doneProxy(action, response);
        }

    }
}
