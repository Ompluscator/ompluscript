/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="Controller.ts" />
/// <reference path="NavigationController.ts" />
/// <reference path="../../Core/Configuration/Creator.ts" />
/// <reference path="../../View/Container/WrongConfigurationContainer.ts" />
/// <reference path="../../View/Container/Page.ts" />
/// <reference path="../Event/OnApplicationStart.ts" />
/// <reference path="../Event/OnComponentLoad.ts" />

/**
 * Module that contains controllers
 *
 * @module Ompluscript.Controller.Controller
 */
module Ompluscript.Controller.Controller {
    "use strict";

    import Page = Ompluscript.View.Container.Page;
    import OnApplicationStart = Ompluscript.Controller.Event.OnApplicationStart;
    import OnComponentLoad = Ompluscript.Controller.Event.OnComponentLoad;
    import ApplicationControllerEvent = Ompluscript.Controller.Event.ApplicationControllerEvent;
    import Creator = Ompluscript.Core.Configuration.Creator;
    import WrongConfigurationContainer = Ompluscript.View.Container.WrongConfigurationContainer;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines application controller
     *
     * @class ApplicationController
     */
    export class ApplicationController extends Controller {

        /**
         * @type {string} TYPE_APPLICATION_CONTROLLER Type of application controller class
         */
        public static TYPE_APPLICATION_CONTROLLER: string = "ApplicationController";

        /**
         * @type {string} PARAMETER_COMPONENTS Name of type parameter
         */
        public static PARAMETER_COMPONENTS: string = "components";

        /**
         * @type {string} PARAMETER_NAVIGATION_CONTROLLER Name of navigation controller parameter
         */
        public static PARAMETER_NAVIGATION_CONTROLLER: string = "navigationController";

        /**
         * @type {string} PARAMETER_ON_APPLICATION_START Name of application start event handler parameter
         */
        public static PARAMETER_ON_APPLICATION_START: string = "onApplicationStart";

        /**
         * @type {string} PARAMETER_ON_COMPONENT_LOAD Name of component load event handler parameter
         */
        public static PARAMETER_ON_COMPONENT_LOAD: string = "onComponentLoad";

        /**
         * @type {string} COMPONENTS_FOLDER Name of folder for components
         */
        private static COMPONENTS_FOLDER: string = "/app/";

        /**
         * @type {Object} componentMap Contains a map of all components
         */
        private componentMap: Object;

        /**
         * @type {string[]} componentMap Contains a list of all components
         */
        private components: string[];

        /**
         * @type {NavigationController} navigationController Contains navigation controller
         */
        private navigationController: NavigationController;

        /**
         * Class constructor.
         *
         * Runs process for executing scripts with components.
         * Calls constructor of superclass.
         *
         * @param {string[]} components Contains a list of all components
         * @constructs
         */
        constructor(components: string[]) {
            super(ApplicationController.TYPE_APPLICATION_CONTROLLER);
            this.componentMap = {};
            this.components = components;
            for (let i: number = 0; i < components.length; i++) {
                this.componentMap[components[i]] = undefined;
            }
            window.addEventListener("load", this.setup.bind(this));
        }

        /**
         * Method that attach handler for application start event
         *
         * @param {Function} callback Event handler
         */
        public attachOnApplicationStartEvent(callback: Function): void {
            this.addGenericObserverByType(this, ApplicationControllerEvent.ON_APPLICATION_START, callback);
        }

        /**
         * Method that attach handler for component load event
         *
         * @param {Function} callback Event handler
         */
        public attachOnComponentLoadEvent(callback: Function): void {
            this.addGenericObserverByType(this, ApplicationControllerEvent.ON_COMPONENT_LOAD, callback);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[ApplicationController.PARAMETER_COMPONENTS] = this.components;
            trace[ApplicationController.PARAMETER_NAVIGATION_CONTROLLER] = this.navigationController;
            return trace;
        }

        /**
         * Method that runs process for executing scripts with components.
         */
        private setup(): void {
            let that: ApplicationController = this;
            for (let i: number = 0; i < that.components.length; i++) {
                that.componentMap[that.components[i]] = undefined;
                let ajax: XMLHttpRequest = new XMLHttpRequest();
                let source: string = ApplicationController.COMPONENTS_FOLDER + that.components[i] + ".js";
                let listener: () => void = function(): void {
                    if (ajax.readyState === ajax.DONE && ajax.status === 200) {
                        that.execute(that.components[i], ajax.responseText, true);
                    } else if (ajax.readyState === ajax.DONE) {
                        that.execute(that.components[i], undefined, false);
                    }
                };
                ajax.addEventListener("readystatechange", listener, false);
                ajax.open("GET", source, true);
                ajax.send();
            }
        }

        /**
         * Method that executes code fetched from script
         * 
         * @param {string} name Name of script
         * @param {string} content Content of script
         * @param {boolean} status Ajax result for fetching script
         */
        private execute(name: string, content: string, status: boolean): void {
            this.componentMap[name] = status;
            if (status === true) {
                this.componentMap[name] = content;
            }
            let numberOfUndefined: number = 0;
            let numberOfFalse: number = 0;
            for (let key in this.componentMap) {
                if (this.componentMap.hasOwnProperty(key)) {
                    if (this.componentMap[key] === undefined) {
                        numberOfUndefined++;
                    } else if (this.componentMap[key] === false) {
                        numberOfFalse++;
                    }
                }
            }
            if (numberOfFalse === 0 && numberOfUndefined === 0) {
                this.launch();
            } else if (numberOfFalse > 0 && numberOfUndefined === 0) {
                this.exit();
            }
        }

        /**
         * Method that launches application
         */
        private launch(): void {
            for (let key in this.componentMap) {
                if (this.componentMap.hasOwnProperty(key)) {
                    let script: HTMLScriptElement = document.createElement("script");
                    script.type = "text/javascript";
                    script.text = this.componentMap[key];
                    document.head.appendChild(script);
                    document.head.removeChild(script);
                    if (this.isValidConfiguration()) {
                        this.fireOnComponentLoadEvent(key);
                    }
                }
            }
            let pages: IBase[] = [];
            if (this.isValidConfiguration()) {
                let pageNames: string[] = Ompluscript.View.Creator.getInstance().getPages();
                for (let i: number = 0; i < pageNames.length; i++) {
                    pages.push(Ompluscript.View.Creator.getInstance().create(pageNames[i]));
                }
                let pageControllerNames: string[] = Ompluscript.Controller.Creator.getInstance().getPageControllers();
                for (let i: number = 0; i < pageControllerNames.length; i++) {
                    pages.push(Ompluscript.Controller.Creator.getInstance().create(pageControllerNames[i]));
                }
            } else {
                let components: WrongConfigurationContainer[] = [];
                let creators: Creator[] = [
                    Ompluscript.Model.Creator.getInstance(),
                    Ompluscript.View.Creator.getInstance(),
                    Ompluscript.Controller.Creator.getInstance(),
                ];
                for (let i: number = 0; i < creators.length; i++) {
                    components.push.apply(components, this.createWrongConfigurationContainers(creators[i]));
                }
                pages = [new Page(ApplicationController.TYPE_APPLICATION_CONTROLLER, true, undefined, components)];
            }
            this.navigationController = new NavigationController(pages);
            if (this.isValidConfiguration()) {
                this.fireOnApplicationStartEvent();
            }
        }

        /**
         * Method that launches when some of scripts are missing
         */
        private exit(): void {
            let components: WrongConfigurationContainer[] = [];
            for (let key in this.componentMap) {
                if (this.componentMap.hasOwnProperty(key) && this.componentMap[key] === false) {
                    components.push(new WrongConfigurationContainer({
                        definition: this.componentMap,
                        errors: [ApplicationController.COMPONENTS_FOLDER + key + ".js not found"],
                        name: ApplicationController.COMPONENTS_FOLDER + key + ".js",
                        type: "Script",
                    }));
                }
            }
            let pages: Page[] = [new Page(ApplicationController.TYPE_APPLICATION_CONTROLLER, true, undefined, components)];
            this.navigationController = new NavigationController(pages);
        }

        /**
         * Method that returns if whole configuration is written as it should be.
         * 
         * @returns {boolean} if whole configuration is written as it should be
         */
        private isValidConfiguration(): boolean {
            return !Ompluscript.View.Creator.getInstance().hasErrors()
                && !Ompluscript.Model.Creator.getInstance().hasErrors()
                && !Ompluscript.Controller.Creator.getInstance().hasErrors();
        }

        /**
         * Method that returns a list of wrong configuration containers
         * for desired creator
         * 
         * @param {Creator} creator Desired creator
         * @returns {WrongConfigurationContainer[]} list of wrong configuration containers
         */
        private createWrongConfigurationContainers(creator: Creator): WrongConfigurationContainer[] {
            let components: WrongConfigurationContainer[] = [];
            let errors: Object[] = creator.getErrors();
            for (let i: number = 0; i < errors.length; i++) {
                components.push(new WrongConfigurationContainer(errors[i]));
            }
            return components;
        }

        /**
         * Method that fires event when row is cleared
         */
        private fireOnApplicationStartEvent(): void {
            let event: OnApplicationStart = new OnApplicationStart(this);
            this.notifyObservers(event);
        }

        /**
         * Method that fires event when row is cleared
         *
         * @param {string} component Name of component
         */
        private fireOnComponentLoadEvent(component: string): void {
            let event: OnComponentLoad = new OnComponentLoad(this, component);
            this.notifyObservers(event);
        }
    }
}
