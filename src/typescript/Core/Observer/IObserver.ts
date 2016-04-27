/// <reference path="Event.ts" />

module Ompluscript.Core.Observer {
    "use strict";

    export interface IObserver {
        
        update(observable: Observable, type: Event): void;
        
    }

}
