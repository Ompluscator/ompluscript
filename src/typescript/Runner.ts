/// <reference path="Controller/Controller/ApplicationController.ts" />
/// <reference path="Core/Configuration/Configuration.ts" />
/// <reference path="Controller/Creator.ts" />

/**
 * Module that contains model' classes.
 *
 * @module Ompluscript
 */
module Ompluscript {
    "use strict";
    import ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Creator = Ompluscript.Controller.Creator;

    export function application(definition: Object = {}): void {
        definition[Configuration.PARAMETER_TYPE] = ApplicationController.TYPE_APPLICATION_CONTROLLER;
        Creator.getInstance().define(definition);
        Creator.getInstance().create(ApplicationController.TYPE_APPLICATION_CONTROLLER);
    }
}


