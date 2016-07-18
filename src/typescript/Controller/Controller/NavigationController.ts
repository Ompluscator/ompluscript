/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../View/Container/Page.ts" />
/// <reference path="../../View/Viewport/Viewport.ts" />
/// <reference path="../Event/OnActionRun.ts" />

module Ompluscript.Controller.Controller {
    "use strict";
    
    import Page = Ompluscript.View.Container.Page;
    import Viewport = Ompluscript.View.Viewport.Viewport;
    import OnActionRun = Ompluscript.Controller.Event.OnActionRun;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    export class NavigationController extends Controller {

        private static NAVIGATION_CONTROLLER: string = "navigationController";

        private static PATH_SEPARATOR: string = "/";

        private viewport: Viewport;

        private history: History;

        private pageControllers: PageController[];

        constructor(pages: IBase[]) {
            super(NavigationController.NAVIGATION_CONTROLLER);
            this.setup(pages);
        }

        public switchPageByName(name: string): void {
            let index: number = this.viewport.findPageIndexByName(name);
            this.viewport.setActivePageIndex(index);
            this.viewport.render();
        }

        public switchPageByIndex(index: number): void {
            this.viewport.setActivePageIndex(index);
            this.viewport.render();
        }

        public updatePath(page: string, action: string = undefined, parameters: Object = undefined): void {
            if (action !== undefined && parameters !== undefined) {
                let paths: any[] = [page, action];
                for (let i in parameters) {
                    if (parameters.hasOwnProperty(i)) {
                        paths.push(i, parameters[i]);
                    }
                }
                this.history.pushState(undefined, page, paths.join(NavigationController.PATH_SEPARATOR));
            } else {
                this.history.pushState(undefined, page, page);
            }
        }

        public showPageFromPath(path: string): void {
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
        }

        private findControllerByName(name: string): PageController {
            for (let i: number = 0; i < this.pageControllers.length; i++) {
                if (this.pageControllers[i].getName() === name) {
                    return this.pageControllers[i];
                }
            }
            return undefined;
        }

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
            this.viewport = new Viewport(pageList);
            this.history = window.history;
            let path: string = location.pathname;
            path = path.slice(1);
            if (path.length > 0) {
                this.showPageFromPath(path);
            } else {
                this.switchPageByIndex(0);
            }
        }
    }
}
