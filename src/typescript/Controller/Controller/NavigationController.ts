/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />
/// <reference path="../../View/Container/Page.ts" />
/// <reference path="../../View/Viewport/Viewport.ts" />
/// <reference path="../../View/Container/Navigation.ts" />
/// <reference path="../../View/Container/List.ts" />
/// <reference path="../../View/Field/PageLink.ts" />
/// <reference path="../Event/OnActionRun.ts" />

/**
 * Module that contains controllers
 *
 * @module Ompluscript.Controller.Controller
 */
module Ompluscript.Controller.Controller {
    "use strict";
    
    import Page = Ompluscript.View.Container.Page;
    import Viewport = Ompluscript.View.Viewport.Viewport;
    import OnActionRun = Ompluscript.Controller.Event.OnActionRun;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import OEvent = Ompluscript.Core.Observer.OEvent;
    import Navigation = Ompluscript.View.Container.Navigation;
    import List = Ompluscript.View.Container.List;
    import PageLink = Ompluscript.View.Field.PageLink;

    /**
     * Class that defines navigation controller
     *
     * @class NavigationController
     */
    export class NavigationController extends Controller implements IObserver {

        /**
         * @type {string} TYPE_NAVIGATION_CONTROLLER Type of navigation controller class
         */
        private static TYPE_NAVIGATION_CONTROLLER: string = NavigationController["name"];

        /**
         * @type {string} PATH_SEPARATOR Defines path separator
         */
        private static PATH_SEPARATOR: string = "/";

        /**
         * @type {Viewport} viewport Defines viewport of application
         */
        private viewport: Viewport;

        /**
         * @type {History} history Contains window.history object
         */
        private history: History;

        /**
         * @type {PageController[]} pageControllers Contains a list of page controllers in application
         */
        private pageControllers: PageController[];

        /**
         * Class constructor.
         *
         * Set up pages and page controllers and calls constructor
         * of superclass.
         *
         * @param {IBase} pages A list with pages and page controllers
         * @constructs
         */
        constructor(pages: IBase[]) {
            super(NavigationController.TYPE_NAVIGATION_CONTROLLER);
            this.setup(pages);
        }

        /**
         * Method that shows page by its name
         *
         * @param {string} name Name of page
         */
        public switchPageByName(name: string): void {
            let index: number = this.viewport.findPageIndexByName(name);
            this.viewport.setActivePageIndex(index);
            this.viewport.render();
        }

        /**
         * Method that shows page by its index
         *
         * @param {string} index Index of page
         */
        public switchPageByIndex(index: number): void {
            this.viewport.setActivePageIndex(index);
            this.viewport.render();
        }

        /**
         * Method that updates path in address bar depending on page, action
         * and parameters.
         *
         * @param {string} page Name of page
         * @param {string} action Name of action
         * @param {Object} parameters List of parameters with values
         */
        public updatePath(page: string, action: string = undefined, parameters: Object = undefined): void {
            if (action !== undefined && parameters !== undefined) {
                let paths: any[] = [page, action];
                for (let i in parameters) {
                    if (parameters.hasOwnProperty(i)) {
                        paths.push(i, parameters[i]);
                    }
                }
                this.history.pushState(true, paths.join(NavigationController.PATH_SEPARATOR));
            } else {
                this.history.pushState(true, page);
            }
        }

        /**
         * Method that shows a page depending on path
         *
         * @param {string} path Url to page
         */
        public showPageFromPath(path: string): void {
            if (path.length > 0) {
                let paths: any = path.split(NavigationController.PATH_SEPARATOR);
                let page: string = paths[0];
                this.switchPageByName(page);
                if (paths.length > 1) {
                    let action: string = paths[1];
                    paths.splice(0, 2);
                    let parameters: Object = {};
                    for (let i: number = 0; i < paths.length; i += 2) {
                        parameters[paths[i]] = paths[i + 1];
                    }
                    let pageController: PageController = this.findControllerByName(page);
                    if (pageController !== undefined) {
                        pageController.runAction(action, parameters);
                    }
                }
            } else {
                for (let i: number = 0; i < this.pageControllers.length; i++) {
                    if (this.pageControllers[i].getPage().isDefaultPage()) {
                        this.switchPageByName(this.pageControllers[i].getPage().getName());
                        return;
                    }
                    this.switchPageByName(this.pageControllers[0].getPage().getName());
                }
            }
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {OEvent} event
         */
        public update(event: OEvent): void {
            if (event instanceof OnActionRun) {
                let onActionRun: OnActionRun = <OnActionRun>event;
                this.updatePath(onActionRun.getSender().getName(), onActionRun.getAction(), onActionRun.getParameters());
            }
        }

        /**
         * Method that returns desired page controller by its name
         *
         * @param {string} name Name of page controller
         * @returns {PageController} contains page controller
         */
        private findControllerByName(name: string): PageController {
            for (let i: number = 0; i < this.pageControllers.length; i++) {
                if (this.pageControllers[i].getName() === name) {
                    return this.pageControllers[i];
                }
            }
            return undefined;
        }

        /**
         * Method that setups all page controllers usable by navigation controller
         *
         * @param {IBase[]} pages List that contains pages and page controllers
         */
        private setup(pages: IBase[]): void {
            this.pageControllers = [];
            let pageList: Page[] = [];
            for (let i: number = 0; i < pages.length; i++) {
                if (pages[i] instanceof Page) {
                    let page: Page = <Page>pages[i];
                    let pageController: PageController = new PageController(page.getName(), page);
                    pageController.addObserverByType(this, OnActionRun.ON_ACTION_RUN);
                    this.pageControllers.push(pageController);
                    pageList.push(page);
                } else if (pages[i] instanceof PageController) {
                    let pageController: PageController = <PageController>pages[i];
                    pageController.addObserverByType(this, OnActionRun.ON_ACTION_RUN);
                    this.pageControllers.push(pageController);
                    pageList.push(pageController.getPage());
                }
            }
            let navigation: Navigation = <Navigation>Ompluscript.View.Creator.getInstance().create(Navigation.TYPE_NAVIGATION);
            if (navigation === undefined) {
                let component: PageLink[] = [];
                for (let i: number = 0; i < this.pageControllers.length; i++) {
                    let name: string = this.pageControllers[i].getPage().getName();
                    component.push(new PageLink(name, name, name));
                }
                let list: List = new List("firstLevel", undefined, component);
                navigation = new Navigation([list]);
            }
            this.viewport = new Viewport(navigation, pageList);
            this.setupHistoryHandler();
            let path: string = window.location.pathname.substring(1);
            this.showPageFromPath(path);
        }

        /**
         * Method that setups handler for history API
         */
        private setupHistoryHandler(): void {
            let that: NavigationController = this;
            that.history = window.history;
            let pushState: (first: string, second: string) => void = that.history.pushState;
            that.history.pushState = function(navigationController: boolean, path: string): void {
                pushState.apply(that.history, [path, path, path]);
                if (navigationController === false) {
                    that.showPageFromPath(path);
                }
            };
            window.onpopstate = function(): void {
                let path: string = window.location.pathname.substring(1);
                that.showPageFromPath(path);
            };
        }
    }
}
