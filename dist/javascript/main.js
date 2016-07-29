var Ompluscript;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Interfaces;
        (function (Interfaces) {
            "use strict";
        })(Interfaces = Core.Interfaces || (Core.Interfaces = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration_1) {
            "use strict";
            var Configuration = (function () {
                function Configuration() {
                }
                Configuration.getInstance = function (configuration) {
                    return new configuration;
                };
                Configuration.prototype.filterErrors = function (errors) {
                    var filter = [];
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i] !== undefined) {
                            filter.push(errors[i]);
                        }
                    }
                    if (filter.length > 0) {
                        return filter;
                    }
                    return [];
                };
                Configuration.prototype.mustBeValue = function (definition, key, values) {
                    if (values.indexOf(definition[key]) === -1) {
                        return this.getName(definition, key) + Configuration.HAS_WRONG_VALUE;
                    }
                    return undefined;
                };
                Configuration.prototype.mustBeString = function (definition, key) {
                    if (typeof definition[key] !== "string") {
                        return this.getName(definition, key) + Configuration.MUST_BE_STRING;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeString = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "string") {
                        return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeStringOrObject = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "string" && typeof definition[key] !== "object") {
                        return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeStringOrObjectBoolean = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "boolean"
                        && typeof definition[key] !== "string" && typeof definition[key] !== "object") {
                        return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeBoolean = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "boolean") {
                        return this.getName(definition, key) + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeNumber = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "number") {
                        return this.getName(definition, key) + Configuration.MUST_BE_NUMBER_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeRegex = function (definition, key) {
                    if (definition[key] !== undefined && !(definition[key] instanceof RegExp)) {
                        return this.getName(definition, key) + Configuration.MUST_BE_REGEX_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeDatetime = function (definition, key) {
                    if (definition[key] !== undefined && (typeof definition[key] !== "string" || isNaN(new Date(definition[key]).getTime()))) {
                        return this.getName(definition, key) + Configuration.MUST_BE_DATETIME_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeArray = function (definition, key) {
                    if (definition[key] !== undefined && !Array.isArray(definition[key])) {
                        return this.getName(definition, key) + Configuration.MUST_BE_ARRAY_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeFunction = function (definition, key) {
                    var helper = {};
                    if (definition[key] !== undefined && helper.toString.call(definition[key]) !== "[object Function]") {
                        return this.getName(definition, key) + Configuration.MUST_BE_FUNCTION_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.shouldBeObject = function (definition, key) {
                    if (definition[key] !== undefined && typeof definition[key] !== "object") {
                        return this.getName(definition, key) + Configuration.MUST_BE_OBJECT_OR_UNDEFINED;
                    }
                    return undefined;
                };
                Configuration.prototype.mustBeGreater = function (definition, first, second, firstValue, secondValue, include) {
                    if (firstValue !== undefined && secondValue !== undefined) {
                        if (include === true && firstValue > secondValue) {
                            return this.getName(definition, second) + Configuration.MUST_BE_GREATER
                                + this.getName(definition, first);
                        }
                        else if (include !== true && firstValue >= secondValue) {
                            return this.getName(definition, second) + Configuration.MUST_BE_GREATER
                                + this.getName(definition, first);
                        }
                    }
                    return undefined;
                };
                Configuration.prototype.getName = function (definition, key) {
                    if (definition[Configuration.PARAMETER_NAME] !== undefined) {
                        return definition[Configuration.PARAMETER_NAME] + "." + key;
                    }
                    return key;
                };
                Configuration.IS_WRONG_CONFIGURATION = "Is wrong configuration.";
                Configuration.HAS_WRONG_VALUE = " has wrong value.";
                Configuration.MUST_BE_STRING = " must be a string.";
                Configuration.MUST_BE_STRING_OR_UNDEFINED = " must be a string or undefined.";
                Configuration.MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED = " must be a string or object or undefined.";
                Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED = " must be a string or object or boolean or undefined.";
                Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED = " must be a boolean or undefined.";
                Configuration.MUST_BE_NUMBER = " must be a number.";
                Configuration.MUST_BE_NUMBER_OR_UNDEFINED = " must be a number or undefined.";
                Configuration.MUST_BE_REGEX_OR_UNDEFINED = " must be a regex object or undefined.";
                Configuration.MUST_BE_DATETIME_OR_UNDEFINED = " must be in datetime format or undefined.";
                Configuration.MUST_BE_ARRAY_OR_UNDEFINED = " must be an array object or undefined.";
                Configuration.MUST_BE_OBJECT = " must be an object.";
                Configuration.MUST_BE_OBJECT_OR_UNDEFINED = " must be an object or undefined.";
                Configuration.MUST_BE_FUNCTION_OR_UNDEFINED = " must be a function or undefined.";
                Configuration.MUST_BE_GREATER = " must be greater than ";
                Configuration.MUST_BE_DEFINED = " must be defined.";
                Configuration.IS_MISSING = " are missing.";
                Configuration.PARAMETER_TYPE = "type";
                Configuration.PARAMETER_NAME = "name";
                return Configuration;
            }());
            Configuration_1.Configuration = Configuration;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration_2) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var GroupConfiguration = (function (_super) {
                __extends(GroupConfiguration, _super);
                function GroupConfiguration(configurations) {
                    _super.call(this);
                    this.configurations = configurations;
                }
                GroupConfiguration.prototype.getErrorsForChildren = function (definition, key, creator) {
                    if (key === void 0) { key = undefined; }
                    if (creator === void 0) { creator = undefined; }
                    var errors = [];
                    if (this.configurations.hasOwnProperty(key)) {
                        var configuration = this.configurations[key];
                        if (definition.hasOwnProperty(key)) {
                            if (Array.isArray(definition[key])) {
                                for (var i = 0; i < definition[key].length; i++) {
                                    if (typeof definition[key][i] === "string" && creator !== undefined) {
                                        if (!creator.ifDefined(definition[key][i])) {
                                            errors.push(definition[key][i] + Configuration.MUST_BE_DEFINED);
                                        }
                                    }
                                    else {
                                        for (var j = 0; j < configuration.length; j++) {
                                            if (Configuration.getInstance(configuration[j]).isRelatedTo(definition[key][i])) {
                                                errors.push.apply(errors, Configuration.getInstance(configuration[j]).getErrors(definition[key][i]));
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (typeof definition[key] === "string" && creator !== undefined) {
                                    if (!creator.ifDefined(definition[key])) {
                                        errors.push(definition[key] + Configuration.MUST_BE_DEFINED);
                                    }
                                }
                                else {
                                    for (var i = 0; i < configuration.length; i++) {
                                        if (Configuration.getInstance(configuration[i]).isRelatedTo(definition[key])) {
                                            errors.push.apply(errors, Configuration.getInstance(configuration[i]).getErrors(definition[key]));
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return this.filterErrors(errors);
                };
                GroupConfiguration.prototype.createChildren = function (definition, key, creator) {
                    if (creator === void 0) { creator = undefined; }
                    var children = [];
                    if (this.configurations.hasOwnProperty(key)) {
                        if (definition.hasOwnProperty(key)) {
                            var configuration = this.configurations[key];
                            for (var i = 0; i < definition[key].length; i++) {
                                if (creator !== undefined && typeof definition[key][i] === "string") {
                                    children.push(creator.create(definition[key][i]));
                                }
                                else {
                                    for (var j = 0; j < configuration.length; j++) {
                                        if (Configuration.getInstance(configuration[j]).isRelatedTo(definition[key][i])) {
                                            children.push(Configuration.getInstance(configuration[j]).create(definition[key][i]));
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return children;
                };
                GroupConfiguration.prototype.createChild = function (definition, key, creator) {
                    if (creator === void 0) { creator = undefined; }
                    if (creator !== undefined && typeof definition[key] === "string") {
                        return creator.create(definition[key]);
                    }
                    else if (this.configurations.hasOwnProperty(key)) {
                        var configuration = this.configurations[key];
                        if (definition.hasOwnProperty(key)) {
                            for (var i = 0; i < configuration.length; i++) {
                                if (Configuration.getInstance(configuration[i]).isRelatedTo(definition[key])) {
                                    return Configuration.getInstance(configuration[i]).create(definition[key]);
                                }
                            }
                        }
                    }
                    return undefined;
                };
                return GroupConfiguration;
            }(Configuration));
            Configuration_2.GroupConfiguration = GroupConfiguration;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
            var OEvent = (function () {
                function OEvent(sender, type) {
                    this.sender = sender;
                    this.type = type;
                }
                OEvent.prototype.getSender = function () {
                    return this.sender;
                };
                OEvent.prototype.getType = function () {
                    return this.type;
                };
                return OEvent;
            }());
            Observer.OEvent = OEvent;
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
            var GenericObserver = (function () {
                function GenericObserver(observer, callback) {
                    this.observer = observer;
                    this.callback = callback;
                }
                GenericObserver.prototype.update = function (event) {
                    this.callback.bind(this.observer)(event);
                };
                return GenericObserver;
            }());
            Observer.GenericObserver = GenericObserver;
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
            var Observable = (function () {
                function Observable() {
                    this.events = {};
                }
                Observable.prototype.addObserverByType = function (observer, type) {
                    if (!this.events.hasOwnProperty(type)) {
                        this.events[type] = [];
                    }
                    if (this.events[type].indexOf(observer) === -1) {
                        this.events[type].push(observer);
                    }
                };
                Observable.prototype.addGenericObserverByType = function (observer, type, callback) {
                    this.addObserverByType(new Observer.GenericObserver(observer, callback), type);
                };
                Observable.prototype.deleteObserverByType = function (observer, type) {
                    if (this.events.hasOwnProperty(type)) {
                        for (var i in this.events[type]) {
                            if (this.events[type].hasOwnProperty(i) && this.events[type][i] === observer) {
                                this.events[type].splice(i, 1);
                            }
                        }
                    }
                };
                Observable.prototype.clearObservers = function () {
                    this.events = {};
                };
                Observable.prototype.clearObserversByType = function (type) {
                    if (this.events.hasOwnProperty(type)) {
                        this.events[type] = [];
                    }
                };
                Observable.prototype.dispose = function () {
                    this.clearObservers();
                };
                Observable.prototype.notifyObservers = function (event) {
                    if (this.events[event.getType()] !== undefined) {
                        for (var i in this.events[event.getType()]) {
                            if (this.events[event.getType()].hasOwnProperty(i)) {
                                this.events[event.getType()][i].update(event);
                            }
                        }
                    }
                };
                return Observable;
            }());
            Observer.Observable = Observable;
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_1) {
        var Controller;
        (function (Controller_2) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var Controller = (function (_super) {
                __extends(Controller, _super);
                function Controller(name) {
                    _super.call(this);
                    this.name = name;
                }
                Controller.prototype.getName = function () {
                    return this.name;
                };
                Controller.prototype.getStackTrace = function () {
                    var trace = {};
                    trace[Controller.PARAMETER_NAME] = this.name;
                    return trace;
                };
                Controller.PARAMETER_EVENTS = "events";
                Controller.PARAMETER_NAME = "name";
                return Controller;
            }(Observable));
            Controller_2.Controller = Controller;
        })(Controller = Controller_1.Controller || (Controller_1.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_3) {
        var Configuration;
        (function (Configuration_3) {
            var Controller;
            (function (Controller_4) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
                var Controller = Ompluscript.Controller.Controller.Controller;
                var ControllerConfiguration = (function (_super) {
                    __extends(ControllerConfiguration, _super);
                    function ControllerConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ControllerConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        errors.push(this.shouldBeObject(definition, Controller.PARAMETER_EVENTS));
                        return this.filterErrors(errors);
                    };
                    return ControllerConfiguration;
                }(GroupConfiguration));
                Controller_4.ControllerConfiguration = ControllerConfiguration;
            })(Controller = Configuration_3.Controller || (Configuration_3.Controller = {}));
        })(Configuration = Controller_3.Configuration || (Controller_3.Configuration = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var Component = (function (_super) {
                __extends(Component, _super);
                function Component(name, styles) {
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this);
                    this.name = name;
                    this.htmlElement = undefined;
                    this.styles = styles;
                    this.initializeHtmlElement();
                    if (styles !== undefined) {
                        for (var key in styles) {
                            if (styles.hasOwnProperty(key)) {
                                this.setStyle(key, styles[key]);
                            }
                        }
                    }
                }
                Component.prototype.hasClass = function (name) {
                    var classes = this.extractClasses();
                    return classes.indexOf(name) > -1;
                };
                Component.prototype.addClass = function (name) {
                    if (!this.hasClass(name)) {
                        var classes = this.extractClasses();
                        classes.push(name);
                        var value = classes.join(" ").trim();
                        this.setAttribute(Component.ATTRIBUTE_CLASS, value);
                    }
                };
                Component.prototype.removeClass = function (name) {
                    if (this.hasClass(name)) {
                        var classes = this.extractClasses();
                        var index = classes.indexOf(name);
                        classes.splice(index, 1);
                        var value = classes.join(" ").trim();
                        this.setAttribute(Component.ATTRIBUTE_CLASS, value);
                    }
                };
                Component.prototype.toggleClass = function (name) {
                    if (this.hasClass(name)) {
                        this.removeClass(name);
                    }
                    else {
                        this.addClass(name);
                    }
                };
                Component.prototype.setId = function (id) {
                    this.setAttribute(Component.ATTRIBUTE_ID, id);
                };
                Component.prototype.getId = function () {
                    return this.getAttribute(Component.ATTRIBUTE_ID);
                };
                Component.prototype.setAttribute = function (name, value) {
                    this.htmlElement.setAttribute(name, value);
                };
                Component.prototype.getAttribute = function (name) {
                    return this.htmlElement.getAttribute(name);
                };
                Component.prototype.removeAttribute = function (name) {
                    this.htmlElement.removeAttribute(name);
                };
                Component.prototype.getStyle = function (name) {
                    return this.htmlElement.style.getPropertyValue(name);
                };
                Component.prototype.setStyle = function (name, value) {
                    this.htmlElement.style.setProperty(name, value);
                };
                Component.prototype.getName = function () {
                    return this.name;
                };
                Component.prototype.getStackTrace = function () {
                    var trace = {
                        html: this.htmlElement.outerHTML.replace(this.htmlElement.innerHTML, ""),
                        name: this.name,
                    };
                    return trace;
                };
                Component.prototype.dispose = function () {
                    if (this.htmlElement instanceof HTMLElement) {
                        var parent_1 = this.htmlElement.parentElement;
                        if (parent_1 instanceof HTMLElement) {
                            parent_1.removeChild(this.htmlElement);
                        }
                    }
                };
                Component.prototype.setParent = function (parent) {
                    this.parent = parent;
                };
                Component.prototype.getParent = function () {
                    return this.parent;
                };
                Component.prototype.removeParent = function () {
                    this.parent = undefined;
                };
                Component.prototype.getParentsByName = function (name) {
                    return this.getParents(name);
                };
                Component.prototype.getParentsByType = function (type) {
                    return this.getParents(undefined, type);
                };
                Component.prototype.getParents = function (name, type) {
                    if (name === void 0) { name = undefined; }
                    if (type === void 0) { type = undefined; }
                    if (this.getParent() === undefined) {
                        return [];
                    }
                    var parentName = this.getParent().constructor.toString().match(/^function\s*([^\s(]+)/)[1];
                    var parents = [];
                    if (name === undefined && type === undefined) {
                        parents.push(this.getParent());
                    }
                    else if (name === this.getParent().getName() && type === undefined) {
                        parents.push(this.getParent());
                    }
                    else if (name === undefined && type === parentName) {
                        parents.push(this.getParent());
                    }
                    else if (name === this.getParent().getName() && type === parentName) {
                        parents.push(this.getParent());
                    }
                    parents.push.apply(parents, this.getParent().getParents(name, type));
                    return parents;
                };
                Component.prototype.extractClasses = function () {
                    var classes;
                    var classValue = this.getAttribute(Component.ATTRIBUTE_CLASS);
                    if (typeof classValue === "string") {
                        classes = this.getAttribute(Component.ATTRIBUTE_CLASS).split(" ");
                    }
                    else {
                        classes = [];
                    }
                    if (classes === [""]) {
                        classes = [];
                    }
                    return classes;
                };
                Component.PARAMETER_TYPE = "type";
                Component.PARAMETER_STYLES = "styles";
                Component.ATTRIBUTE_ID = "id";
                Component.ATTRIBUTE_CLASS = "class";
                return Component;
            }(Observable));
            Component_1.Component = Component;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout_1) {
            "use strict";
            var Component = Ompluscript.View.Component.Component;
            var Layout = (function (_super) {
                __extends(Layout, _super);
                function Layout(name, styles) {
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, styles);
                    this.children = [];
                    this.addClass(Layout.CLASS_LAYOUT);
                }
                Layout.prototype.addChild = function (component) {
                    var index = this.children.indexOf(component);
                    if (index === -1) {
                        this.children.push(component);
                    }
                    else {
                        this.removeChild(component);
                        this.addChild(component);
                    }
                };
                Layout.prototype.removeChild = function (component) {
                    var index = this.children.indexOf(component);
                    if (index > -1) {
                        this.children.splice(index, 1);
                    }
                };
                Layout.prototype.getChildrenCount = function () {
                    return this.children.length;
                };
                Layout.prototype.clearChildren = function () {
                    this.children = [];
                };
                Layout.prototype.render = function () {
                    this.clear();
                    for (var i = 0; i < this.children.length; i++) {
                        if (this.children[i] !== undefined) {
                            this.appendChild(this.children[i]);
                        }
                    }
                    return this.htmlElement;
                };
                Layout.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Layout.PARAMETER_CHILDREN] = [];
                    for (var i = 0; i < this.children.length; i++) {
                        trace[Layout.PARAMETER_CHILDREN].push(this.children[i].getStackTrace());
                    }
                    return trace;
                };
                Layout.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Layout.ELEMENT_DIV);
                };
                Layout.PARAMETER_CHILDREN = "children";
                Layout.ELEMENT_DIV = "div";
                Layout.CLASS_LAYOUT = "layout";
                return Layout;
            }(Component));
            Layout_1.Layout = Layout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var NullLayout = (function (_super) {
                __extends(NullLayout, _super);
                function NullLayout() {
                    _super.call(this, NullLayout.TYPE_NULL_LAYOUT);
                    this.addClass(NullLayout.CLASS_NULL_LAYOUT);
                }
                NullLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                NullLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                NullLayout.TYPE_NULL_LAYOUT = "NullLayout";
                NullLayout.CLASS_NULL_LAYOUT = "null-layout";
                return NullLayout;
            }(Layout.Layout));
            Layout.NullLayout = NullLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_4) {
            var Component;
            (function (Component_2) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
                var ComponentConfiguration = (function (_super) {
                    __extends(ComponentConfiguration, _super);
                    function ComponentConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ComponentConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                        errors.push(this.shouldBeObject(definition, Component.PARAMETER_STYLES));
                        return this.filterErrors(errors);
                    };
                    return ComponentConfiguration;
                }(GroupConfiguration));
                Component_2.ComponentConfiguration = ComponentConfiguration;
            })(Component = Configuration_4.Component || (Configuration_4.Component = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_5) {
            var Layout;
            (function (Layout) {
                "use strict";
                var ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var LayoutConfiguration = (function (_super) {
                    __extends(LayoutConfiguration, _super);
                    function LayoutConfiguration() {
                        _super.call(this, undefined);
                    }
                    LayoutConfiguration.prototype.getErrors = function (definition) {
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    return LayoutConfiguration;
                }(ComponentConfiguration));
                Layout.LayoutConfiguration = LayoutConfiguration;
            })(Layout = Configuration_5.Layout || (Configuration_5.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_6) {
            var Layout;
            (function (Layout) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var NullLayout = Ompluscript.View.Layout.NullLayout;
                var NullLayoutConfiguration = (function (_super) {
                    __extends(NullLayoutConfiguration, _super);
                    function NullLayoutConfiguration() {
                        _super.apply(this, arguments);
                    }
                    NullLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === NullLayout.TYPE_NULL_LAYOUT;
                    };
                    NullLayoutConfiguration.prototype.create = function (definition) {
                        return new NullLayout();
                    };
                    return NullLayoutConfiguration;
                }(Layout.LayoutConfiguration));
                Layout.NullLayoutConfiguration = NullLayoutConfiguration;
            })(Layout = Configuration_6.Layout || (Configuration_6.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var RelativeLayout = (function (_super) {
                __extends(RelativeLayout, _super);
                function RelativeLayout() {
                    _super.call(this, RelativeLayout.TYPE_RELATIVE_LAYOUT);
                    this.addClass(RelativeLayout.CLASS_RELATIVE_LAYOUT);
                }
                RelativeLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                RelativeLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                RelativeLayout.TYPE_RELATIVE_LAYOUT = "RelativeLayout";
                RelativeLayout.CLASS_RELATIVE_LAYOUT = "relative-layout";
                return RelativeLayout;
            }(Layout.Layout));
            Layout.RelativeLayout = RelativeLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_7) {
            var Layout;
            (function (Layout) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var RelativeLayout = Ompluscript.View.Layout.RelativeLayout;
                var RelativeLayoutConfiguration = (function (_super) {
                    __extends(RelativeLayoutConfiguration, _super);
                    function RelativeLayoutConfiguration() {
                        _super.apply(this, arguments);
                    }
                    RelativeLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === RelativeLayout.TYPE_RELATIVE_LAYOUT;
                    };
                    RelativeLayoutConfiguration.prototype.create = function (definition) {
                        return new RelativeLayout();
                    };
                    return RelativeLayoutConfiguration;
                }(Layout.LayoutConfiguration));
                Layout.RelativeLayoutConfiguration = RelativeLayoutConfiguration;
            })(Layout = Configuration_7.Layout || (Configuration_7.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var LinearLayout = (function (_super) {
                __extends(LinearLayout, _super);
                function LinearLayout(direction, reverse, align, name) {
                    if (direction === void 0) { direction = LinearLayout.DIRECTION_HORIZONTAL; }
                    if (reverse === void 0) { reverse = false; }
                    if (align === void 0) { align = LinearLayout.ALIGN_START; }
                    if (name === void 0) { name = LinearLayout.TYPE_LINEAR_LAYOUT; }
                    _super.call(this, name);
                    this.direction = direction;
                    this.reverse = reverse;
                    this.align = align;
                    this.setUpLayout();
                }
                LinearLayout.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[LinearLayout.PARAMETER_ALIGN] = this.align;
                    trace[LinearLayout.PARAMETER_DIRECTION] = this.direction;
                    trace[LinearLayout.PARAMETER_REVERSE] = this.reverse;
                    return trace;
                };
                LinearLayout.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                LinearLayout.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                LinearLayout.prototype.setUpLayout = function () {
                    this.addClass(LinearLayout.CLASS_LINEAR_LAYOUT);
                    this.addClass(LinearLayout.CLASS_PREFIX + this.direction);
                    this.addClass(LinearLayout.CLASS_PREFIX + this.align);
                    if (this.reverse === true) {
                        this.addClass(LinearLayout.CLASS_PREFIX + LinearLayout.CLASS_REVERSE);
                    }
                };
                LinearLayout.TYPE_LINEAR_LAYOUT = "LinearLayout";
                LinearLayout.PARAMETER_DIRECTION = "direction";
                LinearLayout.PARAMETER_REVERSE = "reverse";
                LinearLayout.PARAMETER_ALIGN = "align";
                LinearLayout.DIRECTION_HORIZONTAL = "horizontal";
                LinearLayout.DIRECTION_VERTICAL = "vertical";
                LinearLayout.ALIGN_START = "start";
                LinearLayout.ALIGN_END = "end";
                LinearLayout.ALIGN_CENTER = "center";
                LinearLayout.CLASS_LINEAR_LAYOUT = "linear-layout";
                LinearLayout.CLASS_PREFIX = "flex-";
                LinearLayout.CLASS_REVERSE = "reverse";
                return LinearLayout;
            }(Layout.Layout));
            Layout.LinearLayout = LinearLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_8) {
            var Layout;
            (function (Layout) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var LinearLayout = Ompluscript.View.Layout.LinearLayout;
                var LinearLayoutConfiguration = (function (_super) {
                    __extends(LinearLayoutConfiguration, _super);
                    function LinearLayoutConfiguration() {
                        _super.apply(this, arguments);
                    }
                    LinearLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === LinearLayout.TYPE_LINEAR_LAYOUT;
                    };
                    LinearLayoutConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        var error = this.shouldBeString(definition, LinearLayout.PARAMETER_DIRECTION);
                        if (error === undefined) {
                            if (definition[LinearLayout.PARAMETER_DIRECTION]) {
                                var values = [LinearLayout.DIRECTION_VERTICAL, LinearLayout.DIRECTION_HORIZONTAL];
                                errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_DIRECTION, values));
                            }
                        }
                        else {
                            errors.push(error);
                        }
                        error = this.shouldBeString(definition, LinearLayout.PARAMETER_ALIGN);
                        if (error === undefined) {
                            if (definition[LinearLayout.PARAMETER_ALIGN]) {
                                var values = [LinearLayout.ALIGN_START, LinearLayout.ALIGN_CENTER, LinearLayout.ALIGN_END];
                                errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_ALIGN, values));
                            }
                        }
                        else {
                            errors.push(error);
                        }
                        errors.push(this.shouldBeBoolean(definition, LinearLayout.PARAMETER_REVERSE));
                        return this.filterErrors(errors);
                    };
                    LinearLayoutConfiguration.prototype.create = function (definition) {
                        var direction = definition[LinearLayout.PARAMETER_DIRECTION];
                        var reverse = definition[LinearLayout.PARAMETER_REVERSE];
                        var align = definition[LinearLayout.PARAMETER_ALIGN];
                        return new LinearLayout(direction, reverse, align);
                    };
                    return LinearLayoutConfiguration;
                }(Layout.LayoutConfiguration));
                Layout.LinearLayoutConfiguration = LinearLayoutConfiguration;
            })(Layout = Configuration_8.Layout || (Configuration_8.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Layout;
        (function (Layout) {
            "use strict";
            var TableLayout = (function (_super) {
                __extends(TableLayout, _super);
                function TableLayout(rows, cells) {
                    if (rows === void 0) { rows = 1; }
                    if (cells === void 0) { cells = 1; }
                    _super.call(this, Layout.LinearLayout.DIRECTION_VERTICAL, false, Layout.LinearLayout.ALIGN_START, TableLayout.TYPE_TABLE_LAYOUT);
                    this.rows = rows;
                    this.cells = cells;
                    for (var i = 0; i < this.rows; i++) {
                        this.children.push(new Layout.LinearLayout(Layout.LinearLayout.DIRECTION_HORIZONTAL, false, Layout.LinearLayout.ALIGN_START, TableLayout.TYPE_TABLE_LAYOUT));
                    }
                    this.copies = [];
                }
                TableLayout.prototype.addChild = function (component) {
                    component.setStyle(TableLayout.STYLE_WIDTH, "calc(100% / " + this.cells + ")");
                    var row = Math.floor(this.getChildrenCount() / this.cells);
                    if (row < this.children.length) {
                        this.children[row].addChild(component);
                        this.copies.push(component);
                    }
                };
                TableLayout.prototype.removeChild = function (component) {
                    var copies = this.copies.slice();
                    this.clearChildren();
                    var index = copies.indexOf(component);
                    if (index > -1) {
                        copies.splice(index, 1);
                    }
                    for (var i = 0; i < copies.length; i++) {
                        this.addChild(copies[i]);
                    }
                };
                TableLayout.prototype.clearChildren = function () {
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].clearChildren();
                    }
                    this.copies = [];
                };
                TableLayout.prototype.getChildrenCount = function () {
                    return this.copies.length;
                };
                TableLayout.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[TableLayout.PARAMETER_CELLS] = this.cells;
                    trace[TableLayout.PARAMETER_ROWS] = this.rows;
                    return trace;
                };
                TableLayout.prototype.clear = function () {
                    return;
                };
                TableLayout.TYPE_TABLE_LAYOUT = "TableLayout";
                TableLayout.PARAMETER_ROWS = "rows";
                TableLayout.PARAMETER_CELLS = "cells";
                TableLayout.STYLE_WIDTH = "width";
                return TableLayout;
            }(Layout.LinearLayout));
            Layout.TableLayout = TableLayout;
        })(Layout = View.Layout || (View.Layout = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_9) {
            var Layout;
            (function (Layout) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var TableLayout = Ompluscript.View.Layout.TableLayout;
                var TableLayoutConfiguration = (function (_super) {
                    __extends(TableLayoutConfiguration, _super);
                    function TableLayoutConfiguration() {
                        _super.apply(this, arguments);
                    }
                    TableLayoutConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === TableLayout.TYPE_TABLE_LAYOUT;
                    };
                    TableLayoutConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeNumber(definition, TableLayout.PARAMETER_ROWS));
                        errors.push(this.shouldBeNumber(definition, TableLayout.PARAMETER_CELLS));
                        return this.filterErrors(errors);
                    };
                    TableLayoutConfiguration.prototype.create = function (definition) {
                        var rows = definition[TableLayout.PARAMETER_ROWS];
                        var cells = definition[TableLayout.PARAMETER_CELLS];
                        return new TableLayout(rows, cells);
                    };
                    return TableLayoutConfiguration;
                }(Layout.LayoutConfiguration));
                Layout.TableLayoutConfiguration = TableLayoutConfiguration;
            })(Layout = Configuration_9.Layout || (Configuration_9.Layout = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration_10) {
            "use strict";
            var Configuration = Ompluscript.Core.Configuration.Configuration;
            var ErrorConfiguration = (function (_super) {
                __extends(ErrorConfiguration, _super);
                function ErrorConfiguration() {
                    _super.apply(this, arguments);
                }
                ErrorConfiguration.prototype.isRelatedTo = function (definition) {
                    return true;
                };
                ErrorConfiguration.prototype.getErrors = function (definition) {
                    return [Configuration.IS_WRONG_CONFIGURATION];
                };
                ErrorConfiguration.prototype.create = function (definition) {
                    return undefined;
                };
                return ErrorConfiguration;
            }(Configuration));
            Configuration_10.ErrorConfiguration = ErrorConfiguration;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Interfaces;
        (function (Interfaces) {
            "use strict";
        })(Interfaces = Core.Interfaces || (Core.Interfaces = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var OnDoneProxy = (function (_super) {
                __extends(OnDoneProxy, _super);
                function OnDoneProxy(sender, action, response) {
                    _super.call(this, sender, OnDoneProxy.ON_DONE_PROXY);
                    this.action = action;
                    this.response = response;
                }
                OnDoneProxy.prototype.getAction = function () {
                    return this.action;
                };
                OnDoneProxy.prototype.getResponse = function () {
                    return this.response;
                };
                OnDoneProxy.ON_DONE_PROXY = "onDoneProxy";
                OnDoneProxy.TYPE_SAVED = "save";
                OnDoneProxy.TYPE_UPDATED = "update";
                OnDoneProxy.TYPE_DELETED = "delete";
                OnDoneProxy.TYPE_SELECTED = "select";
                OnDoneProxy.TYPE_FAILED = "failed";
                return OnDoneProxy;
            }(OEvent));
            Event.OnDoneProxy = OnDoneProxy;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy_1) {
            "use strict";
            var Proxy = (function () {
                function Proxy(name) {
                    this.name = name;
                }
                Proxy.prototype.setContainer = function (container) {
                    this.container = container;
                };
                Proxy.prototype.getName = function () {
                    return this.name;
                };
                Proxy.prototype.getStackTrace = function () {
                    var trace = {
                        type: this.name,
                    };
                    return trace;
                };
                Proxy.prototype.dispose = function () {
                    return undefined;
                };
                Proxy.prototype.finish = function (action, response) {
                    this.container.doneProxy(action, response);
                };
                return Proxy;
            }());
            Proxy_1.Proxy = Proxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Container;
        (function (Container_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(name, proxies) {
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this);
                    this.name = name;
                    this.proxies = {};
                    if (Array.isArray(proxies)) {
                        for (var i = 0; i < proxies.length; i++) {
                            proxies[i].setContainer(this);
                            this.proxies[proxies[i].getName()] = proxies[i];
                        }
                    }
                }
                Container.prototype.getName = function () {
                    return this.name;
                };
                Container.prototype.hasProxy = function (type) {
                    return this.proxies.hasOwnProperty(type);
                };
                Container.prototype.getProxy = function (type) {
                    if (this.hasProxy(type)) {
                        return this.proxies[type];
                    }
                    return undefined;
                };
                Container.prototype.getStackTrace = function () {
                    var trace = {
                        name: this.name,
                        proxies: [],
                    };
                    for (var key in this.proxies) {
                        if (this.proxies.hasOwnProperty(key)) {
                            trace["proxies"].push(this.proxies[key].getStackTrace());
                        }
                    }
                    return trace;
                };
                Container.prototype.doneProxy = function (action, response) {
                    if (action === OnDoneProxy.TYPE_SELECTED) {
                        this.setValues(response);
                    }
                    this.fireOnDoneProxyEvent(action, response);
                };
                Container.prototype.fireOnDoneProxyEvent = function (action, response) {
                    var event = new OnDoneProxy(this, action, response);
                    this.notifyObservers(event);
                };
                Container.PARAMETER_ATTRIBUTES = "attributes";
                Container.PARAMETER_PROXIES = "proxies";
                return Container;
            }(Observable));
            Container_1.Container = Container;
        })(Container = Model.Container || (Model.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var AttributeEvent = (function (_super) {
                __extends(AttributeEvent, _super);
                function AttributeEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                AttributeEvent.ON_UPDATE_ATTRIBUTE = "onUpdateAttribute";
                AttributeEvent.ON_INVALID_ATTRIBUTE = "onInvalidAttribute";
                AttributeEvent.ON_UPDATE_CHOICES = "onUpdateChoices";
                return AttributeEvent;
            }(OEvent));
            Event.AttributeEvent = AttributeEvent;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnUpdateAttribute = (function (_super) {
                __extends(OnUpdateAttribute, _super);
                function OnUpdateAttribute(sender, oldValue, newValue) {
                    _super.call(this, sender, Event.AttributeEvent.ON_UPDATE_ATTRIBUTE);
                    this.oldValue = oldValue;
                    this.newValue = newValue;
                }
                OnUpdateAttribute.prototype.getOldValue = function () {
                    return this.oldValue;
                };
                OnUpdateAttribute.prototype.getNewValue = function () {
                    return this.newValue;
                };
                return OnUpdateAttribute;
            }(Event.AttributeEvent));
            Event.OnUpdateAttribute = OnUpdateAttribute;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnInvalidAttribute = (function (_super) {
                __extends(OnInvalidAttribute, _super);
                function OnInvalidAttribute(sender, value, validationCode) {
                    _super.call(this, sender, Event.AttributeEvent.ON_INVALID_ATTRIBUTE);
                    this.value = value;
                    this.validationCode = validationCode;
                }
                OnInvalidAttribute.prototype.getValidationCode = function () {
                    return this.validationCode;
                };
                OnInvalidAttribute.prototype.getValue = function () {
                    return this.value;
                };
                return OnInvalidAttribute;
            }(Event.AttributeEvent));
            Event.OnInvalidAttribute = OnInvalidAttribute;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
            var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
            var Attribute = (function (_super) {
                __extends(Attribute, _super);
                function Attribute(type, name, value, required) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    _super.call(this);
                    this.type = type;
                    this.name = name;
                    this.value = value;
                    this.required = required;
                }
                Attribute.prototype.setValue = function (value) {
                    var oldValue = this.value;
                    this.value = value;
                    this.fireOnUpdateAttributeEvent(oldValue, this.value);
                    if (!this.validate()) {
                        this.fireOnInvalidAttributeEvent(this.value, this.error);
                    }
                };
                Attribute.prototype.getValue = function () {
                    return this.value;
                };
                Attribute.prototype.resetValue = function () {
                    this.setValue(undefined);
                };
                Attribute.prototype.isRequired = function () {
                    return this.required;
                };
                Attribute.prototype.getName = function () {
                    return this.name;
                };
                Attribute.prototype.getError = function () {
                    return this.error;
                };
                Attribute.prototype.validate = function () {
                    this.error = undefined;
                    if (typeof this.value !== this.type && this.value !== undefined) {
                        this.error = Attribute.ERROR_WRONG_TYPE;
                        return false;
                    }
                    else if (this.required === true && typeof this.value !== this.type) {
                        this.error = Attribute.ERROR_IS_REQUIRED;
                        return false;
                    }
                    return true;
                };
                Attribute.prototype.getStackTrace = function () {
                    var trace = {
                        name: this.name,
                        required: this.required,
                        type: this.type,
                        value: this.value,
                    };
                    return trace;
                };
                Attribute.prototype.fireEventIfInvalid = function () {
                    if (this.validate() === false) {
                        this.fireOnInvalidAttributeEvent(this.value, this.error);
                    }
                };
                Attribute.prototype.fireOnUpdateAttributeEvent = function (oldValue, newValue) {
                    var event = new OnUpdateAttribute(this, oldValue, newValue);
                    this.notifyObservers(event);
                };
                Attribute.prototype.fireOnInvalidAttributeEvent = function (value, validationCode) {
                    var event = new OnInvalidAttribute(this, value, validationCode);
                    this.notifyObservers(event);
                };
                Attribute.ERROR_WRONG_TYPE = 101;
                Attribute.ERROR_IS_REQUIRED = 102;
                Attribute.ERROR_BELOW_MINIMUM = 201;
                Attribute.ERROR_OVER_MAXIMUM = 202;
                Attribute.PARAMETER_REQUIRED = "required";
                Attribute.PARAMETER_VALUE = "value";
                Attribute.PARAMETER_MINIMUM = "minimum";
                Attribute.PARAMETER_MAXIMUM = "maximum";
                return Attribute;
            }(Observable));
            Attribute_1.Attribute = Attribute;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var String = (function (_super) {
                __extends(String, _super);
                function String(name, value, required, minimumLength, maximumLength, pattern) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimumLength === void 0) { minimumLength = undefined; }
                    if (maximumLength === void 0) { maximumLength = undefined; }
                    if (pattern === void 0) { pattern = undefined; }
                    _super.call(this, "string", name, value, required);
                    this.minimumLength = minimumLength;
                    this.maximumLength = maximumLength;
                    this.pattern = pattern;
                }
                String.prototype.getMinimumLength = function () {
                    return this.minimumLength;
                };
                String.prototype.getMaximumLength = function () {
                    return this.maximumLength;
                };
                String.prototype.getPattern = function () {
                    return this.pattern;
                };
                String.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && this.minimumLength !== undefined && this.value["length"] < this.minimumLength) {
                            this.error = String.ERROR_BELOW_MINIMUM_LENGTH;
                            return false;
                        }
                        else if (this.value !== undefined && this.maximumLength !== undefined && this.value["length"] > this.maximumLength) {
                            this.error = String.ERROR_OVER_MAXIMUM_LENGTH;
                            return false;
                        }
                        else if (this.value !== undefined && this.pattern !== undefined && this.pattern.test(this.value) === false) {
                            this.error = String.ERROR_PATTERN_NOT_MATCH;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                String.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[String.PARAMETER_MINIMUM_LENGTH] = this.minimumLength;
                    trace[String.PARAMETER_MAXIMUM_LENGTH] = this.maximumLength;
                    trace[String.PARAMETER_PATTERN] = this.pattern;
                    return trace;
                };
                String.prototype.clone = function () {
                    var pattern = undefined;
                    if (this.pattern !== undefined) {
                        pattern = new RegExp(this.pattern.source);
                    }
                    return new Ompluscript.Model.Attribute.String(this.name, undefined, this.required, this.minimumLength, this.maximumLength, pattern);
                };
                String.ERROR_BELOW_MINIMUM_LENGTH = 211;
                String.ERROR_OVER_MAXIMUM_LENGTH = 212;
                String.ERROR_PATTERN_NOT_MATCH = 221;
                String.PARAMETER_MINIMUM_LENGTH = "minimumLength";
                String.PARAMETER_MAXIMUM_LENGTH = "maximumLength";
                String.PARAMETER_PATTERN = "pattern";
                String.TYPE_STRING = "String";
                return String;
            }(Attribute.Attribute));
            Attribute.String = String;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
            var AjaxProxy = (function (_super) {
                __extends(AjaxProxy, _super);
                function AjaxProxy(saveLink, updateLink, deleteLink, selectLink) {
                    if (saveLink === void 0) { saveLink = undefined; }
                    if (updateLink === void 0) { updateLink = undefined; }
                    if (deleteLink === void 0) { deleteLink = undefined; }
                    if (selectLink === void 0) { selectLink = undefined; }
                    _super.call(this, AjaxProxy.TYPE_AJAX_PROXY);
                    this.saveLink = saveLink;
                    this.updateLink = updateLink;
                    this.deleteLink = deleteLink;
                    this.selectLink = selectLink;
                }
                AjaxProxy.prototype.getSaveLink = function () {
                    return this.saveLink;
                };
                AjaxProxy.prototype.getUpdateLink = function () {
                    return this.updateLink;
                };
                AjaxProxy.prototype.getDeleteLink = function () {
                    return this.deleteLink;
                };
                AjaxProxy.prototype.getSelectLink = function () {
                    return this.selectLink;
                };
                AjaxProxy.prototype.save = function () {
                    var link = this.saveLink;
                    if (link === undefined) {
                        link = "/save" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_SAVED);
                };
                AjaxProxy.prototype.update = function () {
                    var link = this.updateLink;
                    if (link === undefined) {
                        link = "/update" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_UPDATED);
                };
                AjaxProxy.prototype.delete = function () {
                    var link = this.deleteLink;
                    if (link === undefined) {
                        link = "/delete" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_POST, link, this.container.getValues(), OnDoneProxy.TYPE_DELETED);
                };
                AjaxProxy.prototype.select = function (query) {
                    var link = this.selectLink;
                    if (link === undefined) {
                        link = "/select" + this.container.getName();
                    }
                    this.perform(AjaxProxy.METHOD_GET, link, query, OnDoneProxy.TYPE_SELECTED);
                };
                AjaxProxy.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[AjaxProxy.PARAMETER_SAVE_LINK] = this.saveLink;
                    trace[AjaxProxy.PARAMETER_UPDATE_LINK] = this.updateLink;
                    trace[AjaxProxy.PARAMETER_DELETE_LINK] = this.deleteLink;
                    trace[AjaxProxy.PARAMETER_SELECT_LINK] = this.selectLink;
                    return trace;
                };
                AjaxProxy.prototype.perform = function (method, url, parameters, type) {
                    var that = this;
                    var ajax = new XMLHttpRequest();
                    var request = this.extractToParameters(parameters);
                    var listener = function () {
                        try {
                            if (ajax.readyState === ajax.DONE && ajax.status === 200) {
                                that.finish(type, JSON.parse(ajax.responseText));
                            }
                            else if (ajax.readyState === ajax.DONE) {
                                that.finish(OnDoneProxy.TYPE_FAILED, JSON.parse(ajax.responseText));
                            }
                        }
                        catch (ex) {
                            that.finish(OnDoneProxy.TYPE_FAILED, ajax.responseText);
                        }
                    };
                    ajax.addEventListener(AjaxProxy.AJAX_STATE_CHANGED, listener, false);
                    if (request.length === 0) {
                        ajax.open(method, url, true);
                        ajax.send();
                    }
                    else if (method === AjaxProxy.METHOD_POST) {
                        ajax.open(method, url, true);
                        ajax.send(request);
                    }
                    else {
                        ajax.open(method, url + "?" + request, true);
                        ajax.send();
                    }
                };
                AjaxProxy.prototype.extractToParameters = function (parameters) {
                    if (Array.isArray(parameters)) {
                        return this.extractArrayToParameters(parameters);
                    }
                    return this.extractObjectToParameters(parameters);
                };
                AjaxProxy.prototype.extractArrayToParameters = function (parameters) {
                    var request = "";
                    for (var i = 0; i < parameters.length; i++) {
                        request += this.extractObjectToParameters(parameters, i + "");
                    }
                    return request;
                };
                AjaxProxy.prototype.extractObjectToParameters = function (parameters, prefix) {
                    if (prefix === void 0) { prefix = undefined; }
                    var request = "";
                    for (var key in parameters) {
                        if (parameters.hasOwnProperty(key)) {
                            if (request.length > 0) {
                                request += "&";
                            }
                            var value = parameters[key];
                            if (Array.isArray(value)) {
                                value = value.join(",");
                            }
                            else if (value === undefined) {
                                value = "";
                            }
                            if (prefix !== undefined) {
                                key = prefix + "[" + key + "]";
                            }
                            request += key + "=" + value;
                        }
                    }
                    return request;
                };
                AjaxProxy.TYPE_AJAX_PROXY = "AjaxProxy";
                AjaxProxy.PARAMETER_SAVE_LINK = "saveLink";
                AjaxProxy.PARAMETER_UPDATE_LINK = "updateLink";
                AjaxProxy.PARAMETER_DELETE_LINK = "deleteLink";
                AjaxProxy.PARAMETER_SELECT_LINK = "selectLink";
                AjaxProxy.AJAX_STATE_CHANGED = "readystatechange";
                AjaxProxy.METHOD_GET = "GET";
                AjaxProxy.METHOD_POST = "POST";
                return AjaxProxy;
            }(Proxy.Proxy));
            Proxy.AjaxProxy = AjaxProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var OnUpdateAsset = (function (_super) {
                __extends(OnUpdateAsset, _super);
                function OnUpdateAsset(sender, oldValue, newValue) {
                    _super.call(this, sender, OnUpdateAsset.ON_UPDATE_ASSET);
                    this.oldValue = oldValue;
                    this.newValue = newValue;
                }
                OnUpdateAsset.prototype.getOldValue = function () {
                    return this.oldValue;
                };
                OnUpdateAsset.prototype.getNewValue = function () {
                    return this.newValue;
                };
                OnUpdateAsset.ON_UPDATE_ASSET = "onUpdateAsset";
                return OnUpdateAsset;
            }(OEvent));
            Event.OnUpdateAsset = OnUpdateAsset;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Container;
        (function (Container_2) {
            "use strict";
            var Container = Ompluscript.Model.Container.Container;
            var OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
            var StringAttribute = Ompluscript.Model.Attribute.String;
            var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
            var Translation = (function (_super) {
                __extends(Translation, _super);
                function Translation(proxies) {
                    if (proxies === void 0) { proxies = undefined; }
                    if (!Array.isArray(proxies) || proxies.length === 0) {
                        proxies = [
                            new AjaxProxy(),
                        ];
                    }
                    _super.call(this, Translation.TYPE_TRANSLATION, proxies);
                    this.attribute = new StringAttribute(Translation.ATTRIBUTE_ASSET, undefined);
                    this.assets = {};
                    this.observers = {};
                }
                Translation.prototype.attachToAsset = function (name, observer) {
                    if (!this.observers.hasOwnProperty(name)) {
                        this.observers[name] = [];
                    }
                    this.observers[name].push(observer);
                    var oldValue = name;
                    var newValue = this.getAsset(name);
                    var event = new OnUpdateAsset(this, oldValue, newValue);
                    observer.update(event);
                };
                Translation.prototype.detachFromAsset = function (name, observer) {
                    if (!this.observers.hasOwnProperty(name)) {
                        return;
                    }
                    var index = this.observers[name].indexOf(observer);
                    this.observers[name].splice(index, 1);
                    if (this.observers[name].length === 0) {
                        delete this.observers[name];
                    }
                };
                Translation.prototype.hasAsset = function (name) {
                    return this.assets.hasOwnProperty(name);
                };
                Translation.prototype.getAsset = function (name) {
                    if (this.hasAsset(name)) {
                        return this.assets[name].getValue();
                    }
                    return name;
                };
                Translation.prototype.validate = function () {
                    return true;
                };
                Translation.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["assets"] = {};
                    for (var i in this.assets) {
                        if (this.assets.hasOwnProperty(i)) {
                            trace["assets"][i] = this.assets[i].getStackTrace();
                        }
                    }
                    trace["attribute"] = this.attribute.getStackTrace();
                    return trace;
                };
                Translation.prototype.dispose = function () {
                    for (var i in this.assets) {
                        if (this.assets.hasOwnProperty(i)) {
                            this.assets[i].dispose();
                        }
                    }
                    this.assets = {};
                };
                Translation.prototype.setValues = function (values) {
                    for (var key in values) {
                        if (values.hasOwnProperty(key)) {
                            if (!this.assets.hasOwnProperty(key)) {
                                this.addAsset(key, values[key]);
                            }
                            else {
                                this.replaceAsset(key, values[key]);
                            }
                        }
                    }
                    for (var asset in this.assets) {
                        if (this.assets.hasOwnProperty(asset) && !values.hasOwnProperty(asset)) {
                            this.deleteAsset(asset);
                        }
                    }
                };
                Translation.prototype.getValues = function () {
                    var values = {};
                    for (var key in this.assets) {
                        if (this.assets.hasOwnProperty(key)) {
                            values[key] = this.assets[key];
                        }
                    }
                    return values;
                };
                Translation.prototype.resetValues = function () {
                    for (var key in this.assets) {
                        if (this.assets.hasOwnProperty(key)) {
                            this.assets[key].setValue(key);
                        }
                    }
                };
                Translation.prototype.fireOnUpdateAssetEvent = function (name, oldValue, newValue) {
                    var event = new OnUpdateAsset(this, oldValue, newValue);
                    if (this.observers.hasOwnProperty(name)) {
                        for (var i = 0; i < this.observers[name].length; i++) {
                            this.observers[name][i].update(event);
                        }
                    }
                };
                Translation.prototype.addAsset = function (key, value) {
                    this.assets[key] = this.attribute.clone();
                    this.assets[key].setValue(value);
                    this.fireOnUpdateAssetEvent(key, key, value);
                };
                Translation.prototype.replaceAsset = function (key, value) {
                    var oldValue = this.assets[key].getValue();
                    this.assets[key].setValue(value);
                    this.fireOnUpdateAssetEvent(key, oldValue, value);
                };
                Translation.prototype.deleteAsset = function (key) {
                    var oldValue = this.assets[key].getValue();
                    this.assets[key].setValue(key);
                    this.fireOnUpdateAssetEvent(key, oldValue, key);
                    delete this.assets[key];
                };
                Translation.TYPE_TRANSLATION = "Translation";
                Translation.ATTRIBUTE_ASSET = "asset";
                return Translation;
            }(Container));
            Container_2.Translation = Translation;
        })(Container = Model.Container || (Model.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Configuration;
        (function (Configuration) {
            "use strict";
            var ConfigurationClass = Ompluscript.Core.Configuration.Configuration;
            var Creator = (function () {
                function Creator(configurations) {
                    this.definition = {};
                    this.errors = [];
                    this.configurations = configurations;
                }
                Creator.prototype.hasErrors = function () {
                    return this.errors.length > 0;
                };
                Creator.prototype.getErrors = function () {
                    return this.errors;
                };
                Creator.prototype.reset = function () {
                    this.definition = {};
                    this.errors = [];
                };
                Creator.prototype.ifDefined = function (name) {
                    return this.definition.hasOwnProperty(name);
                };
                Creator.prototype.define = function (definition) {
                    var errors = [];
                    for (var i = 0; i < this.configurations.length; i++) {
                        var configuration = this.configurations[i];
                        if (ConfigurationClass.getInstance(configuration).isRelatedTo(definition)) {
                            errors = ConfigurationClass.getInstance(configuration).getErrors(definition);
                            break;
                        }
                    }
                    if (errors.length) {
                        this.errors.push({
                            definition: definition,
                            errors: errors,
                            name: definition[ConfigurationClass.PARAMETER_NAME],
                            type: definition[ConfigurationClass.PARAMETER_TYPE],
                        });
                    }
                    else {
                        this.definition[definition[ConfigurationClass.PARAMETER_NAME]] = definition;
                    }
                };
                Creator.prototype.create = function (name) {
                    if (this.definition.hasOwnProperty(name)) {
                        for (var i = 0; i < this.configurations.length; i++) {
                            var configuration = this.configurations[i];
                            if (ConfigurationClass.getInstance(configuration).isRelatedTo(this.definition[name])) {
                                return ConfigurationClass.getInstance(configuration).create(this.definition[name]);
                            }
                        }
                    }
                    return undefined;
                };
                Creator.PARAMETER_TYPE = "type";
                Creator.PARAMETER_NAME = "name";
                Creator.PARAMETER_ERRORS = "errors";
                Creator.PARAMETER_DEFINITION = "definition";
                return Creator;
            }());
            Configuration.Creator = Creator;
        })(Configuration = Core.Configuration || (Core.Configuration = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_11) {
            var Attribute;
            (function (Attribute_2) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var AttributeConfiguration = (function (_super) {
                    __extends(AttributeConfiguration, _super);
                    function AttributeConfiguration() {
                        _super.apply(this, arguments);
                    }
                    AttributeConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                        errors.push(this.shouldBeBoolean(definition, Attribute.PARAMETER_REQUIRED));
                        return this.filterErrors(errors);
                    };
                    return AttributeConfiguration;
                }(Configuration));
                Attribute_2.AttributeConfiguration = AttributeConfiguration;
            })(Attribute = Configuration_11.Attribute || (Configuration_11.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var Boolean = (function (_super) {
                __extends(Boolean, _super);
                function Boolean(name, value, required, mustBeTrue) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (mustBeTrue === void 0) { mustBeTrue = false; }
                    _super.call(this, "boolean", name, value, required);
                    this.mustBeTrue = mustBeTrue;
                }
                Boolean.prototype.isMustBeTrue = function () {
                    return this.mustBeTrue;
                };
                Boolean.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== true && this.mustBeTrue === true) {
                            this.error = Boolean.ERROR_MUST_BE_TRUE;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                Boolean.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Boolean.PARAMETER_MUST_BE_TRUE] = this.mustBeTrue;
                    return trace;
                };
                Boolean.prototype.clone = function () {
                    return new Ompluscript.Model.Attribute.Boolean(this.name, undefined, this.required, this.mustBeTrue);
                };
                Boolean.PARAMETER_MUST_BE_TRUE = "mustBeTrue";
                Boolean.TYPE_BOOLEAN = "Boolean";
                Boolean.ERROR_MUST_BE_TRUE = 204;
                return Boolean;
            }(Attribute.Attribute));
            Attribute.Boolean = Boolean;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_12) {
            var Attribute;
            (function (Attribute_3) {
                "use strict";
                var BooleanAttribute = Ompluscript.Model.Attribute.Boolean;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var BooleanConfiguration = (function (_super) {
                    __extends(BooleanConfiguration, _super);
                    function BooleanConfiguration() {
                        _super.apply(this, arguments);
                    }
                    BooleanConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === BooleanAttribute.TYPE_BOOLEAN;
                    };
                    BooleanConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeBoolean(definition, BooleanAttribute.PARAMETER_MUST_BE_TRUE));
                        return this.filterErrors(errors);
                    };
                    BooleanConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var mustBeTrue = definition[BooleanAttribute.PARAMETER_MUST_BE_TRUE];
                        return new BooleanAttribute(name, value, required, mustBeTrue);
                    };
                    return BooleanConfiguration;
                }(Attribute_3.AttributeConfiguration));
                Attribute_3.BooleanConfiguration = BooleanConfiguration;
            })(Attribute = Configuration_12.Attribute || (Configuration_12.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_4) {
            "use strict";
            var Attribute = Ompluscript.Model.Attribute.Attribute;
            var Datetime = (function (_super) {
                __extends(Datetime, _super);
                function Datetime(name, value, required, minimum, maximum) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimum === void 0) { minimum = undefined; }
                    if (maximum === void 0) { maximum = undefined; }
                    _super.call(this, "string", name, value, required);
                    this.minimum = minimum;
                    this.maximum = maximum;
                    if (minimum !== undefined) {
                        this.minimumObject = new Date(minimum);
                    }
                    if (maximum !== undefined) {
                        this.maximumObject = new Date(maximum);
                    }
                }
                Datetime.prototype.getDateObject = function () {
                    return new Date(this.value);
                };
                Datetime.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Datetime.prototype.getMinimumDateObject = function () {
                    return this.minimumObject;
                };
                Datetime.prototype.getMaximum = function () {
                    return this.maximum;
                };
                Datetime.prototype.getMaximumDateObject = function () {
                    return this.maximumObject;
                };
                Datetime.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && isNaN(this.getDateObject().getTime())) {
                            this.error = Attribute.ERROR_WRONG_TYPE;
                            return false;
                        }
                        if (this.value !== undefined && this.minimum !== undefined
                            && this.getDateObject().getTime() < this.minimumObject.getTime()) {
                            this.error = Attribute.ERROR_BELOW_MINIMUM;
                            return false;
                        }
                        else if (this.value !== undefined && this.maximum !== undefined
                            && this.getDateObject().getTime() > this.maximumObject.getTime()) {
                            this.error = Attribute.ERROR_OVER_MAXIMUM;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                Datetime.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Attribute.PARAMETER_MINIMUM] = this.minimum;
                    trace["minimumObject"] = this.minimumObject;
                    trace[Attribute.PARAMETER_MAXIMUM] = this.maximum;
                    trace["maximumObject"] = this.maximumObject;
                    return trace;
                };
                Datetime.prototype.clone = function () {
                    return new Datetime(this.name, undefined, this.required, this.minimum, this.maximum);
                };
                Datetime.TYPE_DATETIME = "Datetime";
                return Datetime;
            }(Attribute));
            Attribute_4.Datetime = Datetime;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_13) {
            var Attribute;
            (function (Attribute_5) {
                "use strict";
                var Datetime = Ompluscript.Model.Attribute.Datetime;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var DatetimeConfiguration = (function (_super) {
                    __extends(DatetimeConfiguration, _super);
                    function DatetimeConfiguration() {
                        _super.apply(this, arguments);
                    }
                    DatetimeConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Datetime.TYPE_DATETIME;
                    };
                    DatetimeConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        var validMinimum = this.shouldBeDatetime(definition, Attribute.PARAMETER_MINIMUM);
                        var validMaximum = this.shouldBeDatetime(definition, Attribute.PARAMETER_MAXIMUM);
                        errors.push(validMinimum, validMaximum);
                        if (validMinimum === undefined && validMaximum === undefined) {
                            var minimum = new Date(definition[Attribute.PARAMETER_MINIMUM]);
                            var maximum = new Date(definition[Attribute.PARAMETER_MAXIMUM]);
                            if (minimum !== undefined && maximum !== undefined) {
                                errors.push(this.mustBeGreater(definition, Attribute.PARAMETER_MINIMUM, Attribute.PARAMETER_MAXIMUM, minimum, maximum, true));
                            }
                        }
                        return this.filterErrors(errors);
                    };
                    DatetimeConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var minimum = definition[Attribute.PARAMETER_MINIMUM];
                        var maximum = definition[Attribute.PARAMETER_MAXIMUM];
                        return new Datetime(name, value, required, minimum, maximum);
                    };
                    return DatetimeConfiguration;
                }(Attribute_5.AttributeConfiguration));
                Attribute_5.DatetimeConfiguration = DatetimeConfiguration;
            })(Attribute = Configuration_13.Attribute || (Configuration_13.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnUpdateChoices = (function (_super) {
                __extends(OnUpdateChoices, _super);
                function OnUpdateChoices(sender, oldChoices, newChoices) {
                    _super.call(this, sender, Event.AttributeEvent.ON_UPDATE_CHOICES);
                    this.oldChoices = oldChoices;
                    this.newChoices = newChoices;
                }
                OnUpdateChoices.prototype.getOldChoices = function () {
                    return this.oldChoices;
                };
                OnUpdateChoices.prototype.getNewChoices = function () {
                    return this.newChoices;
                };
                return OnUpdateChoices;
            }(Event.AttributeEvent));
            Event.OnUpdateChoices = OnUpdateChoices;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var OnUpdateChoices = Ompluscript.Model.Event.OnUpdateChoices;
            var Choice = (function (_super) {
                __extends(Choice, _super);
                function Choice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, "number", name, value, required);
                    this.choices = choices;
                }
                Choice.prototype.getChoices = function () {
                    return this.choices;
                };
                Choice.prototype.setChoices = function (values) {
                    var oldChoices = this.choices.slice(0);
                    this.choices = values;
                    this.fireOnUpdateChoicesEvent(oldChoices, this.choices);
                };
                Choice.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Choice.PARAMETER_CHOICES] = this.choices;
                    return trace;
                };
                Choice.prototype.fireOnUpdateChoicesEvent = function (oldChoices, newChoices) {
                    var event = new OnUpdateChoices(this, oldChoices, newChoices);
                    this.notifyObservers(event);
                };
                Choice.PARAMETER_CHOICES = "choices";
                Choice.ERROR_VALUE_NOT_ALLOWED = 203;
                return Choice;
            }(Attribute.Attribute));
            Attribute.Choice = Choice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration) {
            var Attribute;
            (function (Attribute) {
                "use strict";
                var Choice = Ompluscript.Model.Attribute.Choice;
                var ChoiceConfiguration = (function (_super) {
                    __extends(ChoiceConfiguration, _super);
                    function ChoiceConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ChoiceConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeArray(definition, Choice.PARAMETER_CHOICES));
                        return this.filterErrors(errors);
                    };
                    return ChoiceConfiguration;
                }(Attribute.AttributeConfiguration));
                Attribute.ChoiceConfiguration = ChoiceConfiguration;
            })(Attribute = Configuration.Attribute || (Configuration.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_6) {
            "use strict";
            var Attribute = Ompluscript.Model.Attribute.Attribute;
            var MultipleChoice = (function (_super) {
                __extends(MultipleChoice, _super);
                function MultipleChoice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, name, value, required, choices);
                }
                MultipleChoice.prototype.setValue = function (value) {
                    var oldValue = this.value;
                    if (Array.isArray(this.value) === true) {
                        oldValue = this.value.slice(0);
                    }
                    this.value = value;
                    this.fireOnUpdateAttributeEvent(oldValue, this.value);
                    if (!this.validate()) {
                        this.fireOnInvalidAttributeEvent(this.value, this.error);
                    }
                };
                MultipleChoice.prototype.validate = function () {
                    this.error = undefined;
                    if (Array.isArray(this.value) === false && this.value !== undefined) {
                        this.error = Attribute.ERROR_WRONG_TYPE;
                        return false;
                    }
                    else if (this.required === true && (Array.isArray(this.value) === false || this.value.length === 0)) {
                        this.error = Attribute.ERROR_IS_REQUIRED;
                        return false;
                    }
                    if (Array.isArray(this.value) === true) {
                        for (var i in this.value) {
                            if (this.choices.indexOf(this.value[i]) === -1) {
                                this.error = Attribute_6.Choice.ERROR_VALUE_NOT_ALLOWED;
                                return false;
                            }
                        }
                    }
                    return true;
                };
                MultipleChoice.prototype.clone = function () {
                    var choices = undefined;
                    if (Array.isArray(this.choices)) {
                        choices = [];
                        for (var i = 0; i < this.choices.length; i++) {
                            choices.push(this.choices[i]);
                        }
                    }
                    return new MultipleChoice(this.name, undefined, this.required, choices);
                };
                MultipleChoice.TYPE_MULTIPLE_CHOICE = "MultipleChoice";
                return MultipleChoice;
            }(Attribute_6.Choice));
            Attribute_6.MultipleChoice = MultipleChoice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_14) {
            var Attribute;
            (function (Attribute_7) {
                "use strict";
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Choice = Ompluscript.Model.Attribute.Choice;
                var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var MultipleChoiceConfiguration = (function (_super) {
                    __extends(MultipleChoiceConfiguration, _super);
                    function MultipleChoiceConfiguration() {
                        _super.apply(this, arguments);
                    }
                    MultipleChoiceConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === MultipleChoice.TYPE_MULTIPLE_CHOICE;
                    };
                    MultipleChoiceConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    MultipleChoiceConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var choices = definition[Choice.PARAMETER_CHOICES];
                        return new MultipleChoice(name, value, required, choices);
                    };
                    return MultipleChoiceConfiguration;
                }(Attribute_7.ChoiceConfiguration));
                Attribute_7.MultipleChoiceConfiguration = MultipleChoiceConfiguration;
            })(Attribute = Configuration_14.Attribute || (Configuration_14.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_8) {
            "use strict";
            var Attribute = Ompluscript.Model.Attribute.Attribute;
            var Number = (function (_super) {
                __extends(Number, _super);
                function Number(name, value, required, minimum, includeMinimum, maximum, includeMaximum) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimum === void 0) { minimum = undefined; }
                    if (includeMinimum === void 0) { includeMinimum = false; }
                    if (maximum === void 0) { maximum = undefined; }
                    if (includeMaximum === void 0) { includeMaximum = false; }
                    _super.call(this, "number", name, value, required);
                    this.minimum = minimum;
                    this.maximum = maximum;
                    this.includeMinimum = includeMinimum;
                    this.includeMaximum = includeMaximum;
                }
                Number.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Number.prototype.getIncludeMinimum = function () {
                    return this.includeMinimum;
                };
                Number.prototype.getMaximum = function () {
                    return this.maximum;
                };
                Number.prototype.getIncludeMaximum = function () {
                    return this.includeMaximum;
                };
                Number.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined) {
                            if (this.minimum !== undefined) {
                                if (this.includeMinimum === false && this.value <= this.minimum) {
                                    this.error = Attribute.ERROR_BELOW_MINIMUM;
                                    return false;
                                }
                                else if (this.includeMinimum === true && this.value < this.minimum) {
                                    this.error = Attribute.ERROR_BELOW_MINIMUM;
                                    return false;
                                }
                            }
                            if (this.maximum !== undefined) {
                                if (this.includeMaximum === false && this.value >= this.maximum) {
                                    this.error = Attribute.ERROR_OVER_MAXIMUM;
                                    return false;
                                }
                                else if (this.includeMaximum === true && this.value > this.maximum) {
                                    this.error = Attribute.ERROR_OVER_MAXIMUM;
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    return false;
                };
                Number.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Attribute.PARAMETER_MINIMUM] = this.minimum;
                    trace[Number.PARAMETER_INCLUDE_MINIMUM] = this.includeMinimum;
                    trace[Attribute.PARAMETER_MAXIMUM] = this.maximum;
                    trace[Number.PARAMETER_INCLUDE_MAXIMUM] = this.includeMaximum;
                    return trace;
                };
                Number.prototype.clone = function () {
                    return new Ompluscript.Model.Attribute.Number(this.name, undefined, this.required, this.minimum, this.includeMinimum, this.maximum, this.includeMaximum);
                };
                Number.PARAMETER_INCLUDE_MINIMUM = "includeMinimum";
                Number.PARAMETER_INCLUDE_MAXIMUM = "includeMaximum";
                Number.TYPE_NUMBER = "Number";
                return Number;
            }(Attribute));
            Attribute_8.Number = Number;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_15) {
            var Attribute;
            (function (Attribute_9) {
                "use strict";
                var NumberAttribute = Ompluscript.Model.Attribute.Number;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var NumberConfiguration = (function (_super) {
                    __extends(NumberConfiguration, _super);
                    function NumberConfiguration() {
                        _super.apply(this, arguments);
                    }
                    NumberConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === NumberAttribute.TYPE_NUMBER;
                    };
                    NumberConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeNumber(definition, Attribute.PARAMETER_MINIMUM));
                        errors.push(this.shouldBeNumber(definition, Attribute.PARAMETER_MAXIMUM));
                        errors.push(this.shouldBeBoolean(definition, NumberAttribute.PARAMETER_INCLUDE_MINIMUM));
                        errors.push(this.shouldBeBoolean(definition, NumberAttribute.PARAMETER_INCLUDE_MAXIMUM));
                        errors = this.filterErrors(errors);
                        if (errors.length === 0) {
                            var minimum = definition[Attribute.PARAMETER_MINIMUM];
                            var maximum = definition[Attribute.PARAMETER_MAXIMUM];
                            var include = definition[NumberAttribute.PARAMETER_INCLUDE_MINIMUM] &&
                                definition[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
                            if (minimum !== undefined && maximum !== undefined) {
                                errors.push(this.mustBeGreater(definition, Attribute.PARAMETER_MINIMUM, Attribute.PARAMETER_MAXIMUM, minimum, maximum, include));
                            }
                        }
                        return this.filterErrors(errors);
                    };
                    NumberConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var minimum = definition[Attribute.PARAMETER_MINIMUM];
                        var includeMinimum = definition[NumberAttribute.PARAMETER_INCLUDE_MINIMUM];
                        var maximum = definition[Attribute.PARAMETER_MAXIMUM];
                        var includeMaximum = definition[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
                        return new NumberAttribute(name, value, required, minimum, includeMinimum, maximum, includeMaximum);
                    };
                    return NumberConfiguration;
                }(Attribute_9.AttributeConfiguration));
                Attribute_9.NumberConfiguration = NumberConfiguration;
            })(Attribute = Configuration_15.Attribute || (Configuration_15.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var SingleChoice = (function (_super) {
                __extends(SingleChoice, _super);
                function SingleChoice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, name, value, required, choices);
                }
                SingleChoice.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && this.choices.indexOf(this.value) === -1) {
                            this.error = Attribute.Choice.ERROR_VALUE_NOT_ALLOWED;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                SingleChoice.prototype.clone = function () {
                    var choices = undefined;
                    if (Array.isArray(this.choices)) {
                        choices = [];
                        for (var i = 0; i < this.choices.length; i++) {
                            choices.push(this.choices[i]);
                        }
                    }
                    return new SingleChoice(this.name, undefined, this.required, choices);
                };
                SingleChoice.TYPE_SINGLE_CHOICE = "SingleChoice";
                return SingleChoice;
            }(Attribute.Choice));
            Attribute.SingleChoice = SingleChoice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_16) {
            var Attribute;
            (function (Attribute_10) {
                "use strict";
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Choice = Ompluscript.Model.Attribute.Choice;
                var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var SingleChoiceConfiguration = (function (_super) {
                    __extends(SingleChoiceConfiguration, _super);
                    function SingleChoiceConfiguration() {
                        _super.apply(this, arguments);
                    }
                    SingleChoiceConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === SingleChoice.TYPE_SINGLE_CHOICE;
                    };
                    SingleChoiceConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    SingleChoiceConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var choices = definition[Choice.PARAMETER_CHOICES];
                        return new SingleChoice(name, value, required, choices);
                    };
                    return SingleChoiceConfiguration;
                }(Attribute_10.ChoiceConfiguration));
                Attribute_10.SingleChoiceConfiguration = SingleChoiceConfiguration;
            })(Attribute = Configuration_16.Attribute || (Configuration_16.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_17) {
            var Attribute;
            (function (Attribute_11) {
                "use strict";
                var StringAttribute = Ompluscript.Model.Attribute.String;
                var Attribute = Ompluscript.Model.Attribute.Attribute;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var StringConfiguration = (function (_super) {
                    __extends(StringConfiguration, _super);
                    function StringConfiguration() {
                        _super.apply(this, arguments);
                    }
                    StringConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === StringAttribute.TYPE_STRING;
                    };
                    StringConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeNumber(definition, StringAttribute.PARAMETER_MINIMUM_LENGTH));
                        errors.push(this.shouldBeNumber(definition, StringAttribute.PARAMETER_MAXIMUM_LENGTH));
                        errors = this.filterErrors(errors);
                        if (errors.length === 0) {
                            var minimum = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
                            var maximum = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
                            var minimumKey = StringAttribute.PARAMETER_MINIMUM_LENGTH;
                            var maximumKey = StringAttribute.PARAMETER_MAXIMUM_LENGTH;
                            if (minimum !== undefined && maximum !== undefined) {
                                errors.push(this.mustBeGreater(definition, minimumKey, maximumKey, minimum, maximum, true));
                            }
                        }
                        errors.push(this.shouldBeRegex(definition, StringAttribute.PARAMETER_PATTERN));
                        return this.filterErrors(errors);
                    };
                    StringConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var value = definition[Attribute.PARAMETER_VALUE];
                        var required = definition[Attribute.PARAMETER_REQUIRED];
                        var minimumLength = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
                        var maximumLength = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
                        var pattern = definition[StringAttribute.PARAMETER_PATTERN];
                        return new StringAttribute(name, value, required, minimumLength, maximumLength, pattern);
                    };
                    return StringConfiguration;
                }(Attribute_11.AttributeConfiguration));
                Attribute_11.StringConfiguration = StringConfiguration;
            })(Attribute = Configuration_17.Attribute || (Configuration_17.Attribute = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_18) {
            var Proxy;
            (function (Proxy) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
                var AjaxProxyConfiguration = (function (_super) {
                    __extends(AjaxProxyConfiguration, _super);
                    function AjaxProxyConfiguration() {
                        _super.apply(this, arguments);
                    }
                    AjaxProxyConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === AjaxProxy.TYPE_AJAX_PROXY;
                    };
                    AjaxProxyConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_SAVE_LINK));
                        errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_UPDATE_LINK));
                        errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_DELETE_LINK));
                        errors.push(this.shouldBeString(definition, AjaxProxy.PARAMETER_SELECT_LINK));
                        return this.filterErrors(errors);
                    };
                    AjaxProxyConfiguration.prototype.create = function (definition) {
                        var saveLink = definition[AjaxProxy.PARAMETER_SAVE_LINK];
                        var updateLink = definition[AjaxProxy.PARAMETER_UPDATE_LINK];
                        var deleteLink = definition[AjaxProxy.PARAMETER_DELETE_LINK];
                        var selectLink = definition[AjaxProxy.PARAMETER_SELECT_LINK];
                        return new AjaxProxy(saveLink, updateLink, deleteLink, selectLink);
                    };
                    return AjaxProxyConfiguration;
                }(Configuration));
                Proxy.AjaxProxyConfiguration = AjaxProxyConfiguration;
            })(Proxy = Configuration_18.Proxy || (Configuration_18.Proxy = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
            var StorageProxy = (function (_super) {
                __extends(StorageProxy, _super);
                function StorageProxy(name, storage) {
                    _super.call(this, name);
                    this.storage = storage;
                }
                StorageProxy.prototype.save = function () {
                    this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
                    this.finish(OnDoneProxy.TYPE_SAVED, this.container.getValues());
                };
                StorageProxy.prototype.update = function () {
                    this.storage.setItem(this.container.getName(), JSON.stringify(this.container.getValues()));
                    this.finish(OnDoneProxy.TYPE_UPDATED, this.container.getValues());
                };
                StorageProxy.prototype.delete = function () {
                    this.storage.removeItem(this.container.getName());
                    this.finish(OnDoneProxy.TYPE_DELETED, this.container.getValues());
                };
                StorageProxy.prototype.select = function () {
                    var result = this.storage.getItem(this.container.getName());
                    this.finish(OnDoneProxy.TYPE_SELECTED, JSON.parse(result));
                };
                return StorageProxy;
            }(Proxy.Proxy));
            Proxy.StorageProxy = StorageProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var LocalStorageProxy = (function (_super) {
                __extends(LocalStorageProxy, _super);
                function LocalStorageProxy() {
                    _super.call(this, LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY, window.localStorage);
                }
                LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY = "LocalStorageProxy";
                return LocalStorageProxy;
            }(Proxy.StorageProxy));
            Proxy.LocalStorageProxy = LocalStorageProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_19) {
            var Proxy;
            (function (Proxy) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var LocalStorageProxy = Ompluscript.Model.Proxy.LocalStorageProxy;
                var LocalStorageProxyConfiguration = (function (_super) {
                    __extends(LocalStorageProxyConfiguration, _super);
                    function LocalStorageProxyConfiguration() {
                        _super.apply(this, arguments);
                    }
                    LocalStorageProxyConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY;
                    };
                    LocalStorageProxyConfiguration.prototype.getErrors = function (definition) {
                        return [];
                    };
                    LocalStorageProxyConfiguration.prototype.create = function (definition) {
                        return new LocalStorageProxy();
                    };
                    return LocalStorageProxyConfiguration;
                }(Configuration));
                Proxy.LocalStorageProxyConfiguration = LocalStorageProxyConfiguration;
            })(Proxy = Configuration_19.Proxy || (Configuration_19.Proxy = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Proxy;
        (function (Proxy) {
            "use strict";
            var SessionStorageProxy = (function (_super) {
                __extends(SessionStorageProxy, _super);
                function SessionStorageProxy() {
                    _super.call(this, SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY, window.sessionStorage);
                }
                SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY = "SessionStorageProxy";
                return SessionStorageProxy;
            }(Proxy.StorageProxy));
            Proxy.SessionStorageProxy = SessionStorageProxy;
        })(Proxy = Model.Proxy || (Model.Proxy = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_20) {
            var Proxy;
            (function (Proxy) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var SessionStorageProxy = Ompluscript.Model.Proxy.SessionStorageProxy;
                var SessionStorageProxyConfiguration = (function (_super) {
                    __extends(SessionStorageProxyConfiguration, _super);
                    function SessionStorageProxyConfiguration() {
                        _super.apply(this, arguments);
                    }
                    SessionStorageProxyConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === SessionStorageProxy.TYPE_SESSION_STORAGE_PROXY;
                    };
                    SessionStorageProxyConfiguration.prototype.getErrors = function (definition) {
                        return [];
                    };
                    SessionStorageProxyConfiguration.prototype.create = function (definition) {
                        return new SessionStorageProxy();
                    };
                    return SessionStorageProxyConfiguration;
                }(Configuration));
                Proxy.SessionStorageProxyConfiguration = SessionStorageProxyConfiguration;
            })(Proxy = Configuration_20.Proxy || (Configuration_20.Proxy = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_21) {
            var Container;
            (function (Container_3) {
                "use strict";
                var Container = Ompluscript.Model.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
                var DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
                var MultipleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.MultipleChoiceConfiguration;
                var NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
                var SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
                var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
                var AjaxProxyConfiguration = Ompluscript.Model.Configuration.Proxy.AjaxProxyConfiguration;
                var SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.SessionStorageProxyConfiguration;
                var LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.LocalStorageProxyConfiguration;
                var ContainerConfiguration = (function (_super) {
                    __extends(ContainerConfiguration, _super);
                    function ContainerConfiguration() {
                        var definition = [
                            BooleanConfiguration,
                            DatetimeConfiguration,
                            MultipleChoiceConfiguration,
                            NumberConfiguration,
                            SingleChoiceConfiguration,
                            StringConfiguration,
                            ErrorConfiguration,
                        ];
                        var proxies = [
                            AjaxProxyConfiguration,
                            SessionStorageProxyConfiguration,
                            LocalStorageProxyConfiguration,
                            ErrorConfiguration,
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_ATTRIBUTES] = definition;
                        configurations[Container.PARAMETER_PROXIES] = proxies;
                        _super.call(this, configurations);
                    }
                    ContainerConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                        errors.push(this.shouldBeArray(definition, Container.PARAMETER_ATTRIBUTES));
                        errors.push(this.shouldBeArray(definition, Container.PARAMETER_PROXIES));
                        if (definition.hasOwnProperty(Container.PARAMETER_ATTRIBUTES)) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_ATTRIBUTES));
                        }
                        if (definition.hasOwnProperty(Container.PARAMETER_PROXIES)) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_PROXIES));
                        }
                        return this.filterErrors(errors);
                    };
                    return ContainerConfiguration;
                }(GroupConfiguration));
                Container_3.ContainerConfiguration = ContainerConfiguration;
            })(Container = Configuration_21.Container || (Configuration_21.Container = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_1) {
        var Container;
        (function (Container_4) {
            "use strict";
            var Container = Ompluscript.Model.Container.Container;
            var Model = (function (_super) {
                __extends(Model, _super);
                function Model(name, attributes, proxies) {
                    if (attributes === void 0) { attributes = undefined; }
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this, name, proxies);
                    this.attributes = {};
                    if (Array.isArray(attributes)) {
                        for (var i = 0; i < attributes.length; i++) {
                            this.attributes[attributes[i].getName()] = attributes[i];
                        }
                    }
                }
                Model.prototype.hasAttribute = function (name) {
                    return this.attributes.hasOwnProperty(name);
                };
                Model.prototype.getAttribute = function (name) {
                    return this.attributes[name];
                };
                Model.prototype.validate = function () {
                    var result = true;
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            result = result && this.attributes[i].validate();
                        }
                    }
                    return result;
                };
                Model.prototype.fireEventIfInvalid = function () {
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            this.attributes[i].fireEventIfInvalid();
                        }
                    }
                };
                Model.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["attributes"] = {};
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            trace["attributes"][i] = this.attributes[i].getStackTrace();
                        }
                    }
                    return trace;
                };
                Model.prototype.dispose = function () {
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            this.attributes[i].dispose();
                        }
                    }
                };
                Model.prototype.setValues = function (values) {
                    for (var key in values) {
                        if (this.attributes.hasOwnProperty(key) && values.hasOwnProperty(key)) {
                            this.attributes[key].setValue(values[key]);
                        }
                    }
                };
                Model.prototype.getValues = function () {
                    var values = {};
                    for (var key in this.attributes) {
                        if (this.attributes.hasOwnProperty(key)) {
                            values[key] = this.attributes[key].getValue();
                        }
                    }
                    return values;
                };
                Model.prototype.resetValues = function () {
                    for (var key in this.attributes) {
                        if (this.attributes.hasOwnProperty(key)) {
                            this.attributes[key].resetValue();
                        }
                    }
                };
                Model.TYPE_MODEL = "Model";
                return Model;
            }(Container));
            Container_4.Model = Model;
        })(Container = Model_1.Container || (Model_1.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_2) {
        var Configuration;
        (function (Configuration_22) {
            var Container;
            (function (Container_5) {
                "use strict";
                var Model = Ompluscript.Model.Container.Model;
                var Container = Ompluscript.Model.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var ModelConfiguration = (function (_super) {
                    __extends(ModelConfiguration, _super);
                    function ModelConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ModelConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Model.TYPE_MODEL;
                    };
                    ModelConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    ModelConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var attributes = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_ATTRIBUTES);
                        var proxies = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_PROXIES);
                        return new Model(name, attributes, proxies);
                    };
                    return ModelConfiguration;
                }(Container_5.ContainerConfiguration));
                Container_5.ModelConfiguration = ModelConfiguration;
            })(Container = Configuration_22.Container || (Configuration_22.Container = {}));
        })(Configuration = Model_2.Configuration || (Model_2.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var TableEvent = (function (_super) {
                __extends(TableEvent, _super);
                function TableEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                TableEvent.ON_ADD_ROW_TO_TABLE = "onAddRowToTable";
                TableEvent.ON_REMOVE_ROW_FROM_TABLE = "onRemoveRowFromTable";
                TableEvent.ON_CLEAR_TABLE = "onClearTable";
                TableEvent.ON_UPDATE_TABLE = "onUpdateTable";
                return TableEvent;
            }(OEvent));
            Event.TableEvent = TableEvent;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_3) {
        var Event;
        (function (Event) {
            "use strict";
            var OnAddRowToTable = (function (_super) {
                __extends(OnAddRowToTable, _super);
                function OnAddRowToTable(sender, index, model) {
                    _super.call(this, sender, Event.TableEvent.ON_ADD_ROW_TO_TABLE);
                    this.index = index;
                    this.model = model;
                }
                OnAddRowToTable.prototype.getModel = function () {
                    return this.model;
                };
                OnAddRowToTable.prototype.getIndex = function () {
                    return this.index;
                };
                return OnAddRowToTable;
            }(Event.TableEvent));
            Event.OnAddRowToTable = OnAddRowToTable;
        })(Event = Model_3.Event || (Model_3.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnRemoveRowFromTable = (function (_super) {
                __extends(OnRemoveRowFromTable, _super);
                function OnRemoveRowFromTable(sender, index) {
                    _super.call(this, sender, Event.TableEvent.ON_REMOVE_ROW_FROM_TABLE);
                    this.index = index;
                }
                OnRemoveRowFromTable.prototype.getIndex = function () {
                    return this.index;
                };
                return OnRemoveRowFromTable;
            }(Event.TableEvent));
            Event.OnRemoveRowFromTable = OnRemoveRowFromTable;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnClearTable = (function (_super) {
                __extends(OnClearTable, _super);
                function OnClearTable(sender) {
                    _super.call(this, sender, Event.TableEvent.ON_CLEAR_TABLE);
                }
                return OnClearTable;
            }(Event.TableEvent));
            Event.OnClearTable = OnClearTable;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnUpdateTable = (function (_super) {
                __extends(OnUpdateTable, _super);
                function OnUpdateTable(sender) {
                    _super.call(this, sender, Event.TableEvent.ON_UPDATE_TABLE);
                }
                return OnUpdateTable;
            }(Event.TableEvent));
            Event.OnUpdateTable = OnUpdateTable;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_4) {
        var Container;
        (function (Container_6) {
            "use strict";
            var Model = Ompluscript.Model.Container.Model;
            var Container = Ompluscript.Model.Container.Container;
            var OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
            var OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;
            var OnClearTable = Ompluscript.Model.Event.OnClearTable;
            var OnUpdateTable = Ompluscript.Model.Event.OnUpdateTable;
            var Table = (function (_super) {
                __extends(Table, _super);
                function Table(name, attributes, proxies) {
                    if (attributes === void 0) { attributes = undefined; }
                    if (proxies === void 0) { proxies = undefined; }
                    _super.call(this, name, proxies);
                    this.rows = [];
                    this.attributes = attributes;
                }
                Table.prototype.count = function () {
                    return this.rows.length;
                };
                Table.prototype.each = function (callback) {
                    for (var i = 0; i < this.rows.length; i++) {
                        callback(i, this.rows[i]);
                    }
                };
                Table.prototype.hasRowOnIndex = function (index) {
                    return this.rows[index] !== undefined;
                };
                Table.prototype.getRowByIndex = function (index) {
                    return this.rows[index];
                };
                Table.prototype.addRow = function (values) {
                    var attributes = undefined;
                    if (this.attributes !== undefined) {
                        attributes = [];
                        for (var i = 0; i < this.attributes.length; i++) {
                            attributes.push(this.attributes[i].clone());
                        }
                    }
                    var model = new Model(this.name, attributes);
                    this.rows.push(model);
                    this.fireOnAddRowToTableEvent(this.rows.length - 1, model);
                    model.setValues(values);
                };
                Table.prototype.clearRows = function () {
                    for (var i = 0; i < this.rows.length; i++) {
                        this.rows[i].dispose();
                    }
                    this.rows = [];
                    this.fireOnClearTableEvent();
                };
                Table.prototype.removeRowByIndex = function (index) {
                    this.rows.splice(index, 1);
                    this.fireOnRemoveRowFromTableEvent(index);
                };
                Table.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["rows"] = [];
                    for (var i in this.rows) {
                        if (this.rows[i] !== undefined) {
                            trace["rows"].push(this.rows[i].getStackTrace());
                        }
                    }
                    trace["attributes"] = [];
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            trace["attributes"][i] = this.attributes[i].getStackTrace();
                        }
                    }
                    return trace;
                };
                Table.prototype.validate = function () {
                    var result = true;
                    for (var i in this.rows) {
                        if (this.rows.hasOwnProperty(i)) {
                            result = result && this.rows[i].validate();
                        }
                    }
                    return result;
                };
                Table.prototype.dispose = function () {
                    for (var i = 0; i < this.rows.length; i++) {
                        this.rows[i].dispose();
                    }
                    this.clearObservers();
                };
                Table.prototype.setValues = function (values) {
                    this.clearRows();
                    if (Array.isArray(values)) {
                        var rows = values;
                        for (var i = 0; i < rows.length; i++) {
                            this.addRow(rows[i]);
                        }
                    }
                    else {
                        this.addRow(values);
                    }
                    this.fireOnUpdateTableEvent();
                };
                Table.prototype.getValues = function () {
                    var values = [];
                    for (var i = 0; i < this.rows.length; i++) {
                        values.push(this.rows[i].getValues());
                    }
                    return values;
                };
                Table.prototype.resetValues = function () {
                    for (var i = 0; i < this.rows.length; i++) {
                        this.rows[i].resetValues();
                    }
                };
                Table.prototype.fireOnAddRowToTableEvent = function (index, model) {
                    var event = new OnAddRowToTable(this, index, model);
                    this.notifyObservers(event);
                };
                Table.prototype.fireOnRemoveRowFromTableEvent = function (index) {
                    var event = new OnRemoveRowFromTable(this, index);
                    this.notifyObservers(event);
                };
                Table.prototype.fireOnClearTableEvent = function () {
                    var event = new OnClearTable(this);
                    this.notifyObservers(event);
                };
                Table.prototype.fireOnUpdateTableEvent = function () {
                    var event = new OnUpdateTable(this);
                    this.notifyObservers(event);
                };
                Table.TYPE_TABLE = "Table";
                return Table;
            }(Container));
            Container_6.Table = Table;
        })(Container = Model_4.Container || (Model_4.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_23) {
            var Container;
            (function (Container_7) {
                "use strict";
                var Table = Ompluscript.Model.Container.Table;
                var Container = Ompluscript.Model.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var TableConfiguration = (function (_super) {
                    __extends(TableConfiguration, _super);
                    function TableConfiguration() {
                        _super.apply(this, arguments);
                    }
                    TableConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Table.TYPE_TABLE;
                    };
                    TableConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    TableConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var attributes = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_ATTRIBUTES);
                        var proxies = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_PROXIES);
                        return new Table(name, attributes, proxies);
                    };
                    return TableConfiguration;
                }(Container_7.ContainerConfiguration));
                Container_7.TableConfiguration = TableConfiguration;
            })(Container = Configuration_23.Container || (Configuration_23.Container = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Configuration;
        (function (Configuration_24) {
            var Container;
            (function (Container_8) {
                "use strict";
                var Container = Ompluscript.Model.Container.Container;
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var AjaxProxyConfiguration = Ompluscript.Model.Configuration.Proxy.AjaxProxyConfiguration;
                var SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.SessionStorageProxyConfiguration;
                var LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.LocalStorageProxyConfiguration;
                var Translation = Ompluscript.Model.Container.Translation;
                var TranslationConfiguration = (function (_super) {
                    __extends(TranslationConfiguration, _super);
                    function TranslationConfiguration() {
                        var proxies = [
                            AjaxProxyConfiguration,
                            SessionStorageProxyConfiguration,
                            LocalStorageProxyConfiguration,
                            ErrorConfiguration,
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_PROXIES] = proxies;
                        _super.call(this, configurations);
                    }
                    TranslationConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Translation.TYPE_TRANSLATION;
                    };
                    TranslationConfiguration.prototype.getErrors = function (definition) {
                        var errors = [];
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
                        errors.push(this.shouldBeArray(definition, Container.PARAMETER_PROXIES));
                        if (definition.hasOwnProperty(Container.PARAMETER_PROXIES)) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_PROXIES));
                        }
                        return this.filterErrors(errors);
                    };
                    TranslationConfiguration.prototype.create = function (definition) {
                        var proxies = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_PROXIES);
                        return new Translation(proxies);
                    };
                    return TranslationConfiguration;
                }(GroupConfiguration));
                Container_8.TranslationConfiguration = TranslationConfiguration;
            })(Container = Configuration_24.Container || (Configuration_24.Container = {}));
        })(Configuration = Model.Configuration || (Model.Configuration = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        "use strict";
        var CreatorParent = Ompluscript.Core.Configuration.Creator;
        var BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
        var DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
        var MultipleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.MultipleChoiceConfiguration;
        var NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
        var SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
        var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
        var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
        var ModelConfiguration = Ompluscript.Model.Configuration.Container.ModelConfiguration;
        var TableConfiguration = Ompluscript.Model.Configuration.Container.TableConfiguration;
        var Translation = Ompluscript.Model.Container.Translation;
        var TranslationConfiguration = Ompluscript.Model.Configuration.Container.TranslationConfiguration;
        var Creator = (function (_super) {
            __extends(Creator, _super);
            function Creator() {
                var configurations = [
                    BooleanConfiguration,
                    DatetimeConfiguration,
                    MultipleChoiceConfiguration,
                    NumberConfiguration,
                    SingleChoiceConfiguration,
                    StringConfiguration,
                    ModelConfiguration,
                    TableConfiguration,
                    TranslationConfiguration,
                    ErrorConfiguration,
                ];
                _super.call(this, configurations);
            }
            Creator.getInstance = function () {
                if (Creator.instance === undefined) {
                    Creator.instance = new Creator();
                }
                return Creator.instance;
            };
            Creator.prototype.getTranslation = function () {
                if (this.translation === undefined) {
                    if (!this.ifDefined(Translation.TYPE_TRANSLATION)) {
                        this.translation = new Translation();
                    }
                    else {
                        this.translation = this.create(Translation.TYPE_TRANSLATION);
                    }
                }
                return this.translation;
            };
            return Creator;
        }(CreatorParent));
        Model.Creator = Creator;
        function define(definition) {
            if (definition === void 0) { definition = {}; }
            Creator.getInstance().define(definition);
        }
        Model.define = define;
        function create(name) {
            return Creator.getInstance().create(name);
        }
        Model.create = create;
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var FieldEvent = (function (_super) {
                __extends(FieldEvent, _super);
                function FieldEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                FieldEvent.ON_FIELD_CLICK = "onFieldClick";
                FieldEvent.ON_FIELD_FOCUS = "onFieldFocus";
                FieldEvent.ON_FIELD_BLUR = "onFieldBlur";
                FieldEvent.ON_FIELD_MOUSE_ENTER = "onFieldMouseEnter";
                FieldEvent.ON_FIELD_MOUSE_LEAVE = "onFieldMouseLeave";
                return FieldEvent;
            }(OEvent));
            Event.FieldEvent = FieldEvent;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnFieldClick = (function (_super) {
                __extends(OnFieldClick, _super);
                function OnFieldClick(sender, event) {
                    _super.call(this, sender, Event.FieldEvent.ON_FIELD_CLICK);
                    this.event = event;
                }
                OnFieldClick.prototype.preventDefault = function () {
                    this.event["preventDefault"]();
                };
                return OnFieldClick;
            }(Event.FieldEvent));
            Event.OnFieldClick = OnFieldClick;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnFieldFocus = (function (_super) {
                __extends(OnFieldFocus, _super);
                function OnFieldFocus(sender, event) {
                    _super.call(this, sender, Event.FieldEvent.ON_FIELD_FOCUS);
                    this.event = event;
                }
                OnFieldFocus.prototype.preventDefault = function () {
                    this.event["preventDefault"]();
                };
                return OnFieldFocus;
            }(Event.FieldEvent));
            Event.OnFieldFocus = OnFieldFocus;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnFieldBlur = (function (_super) {
                __extends(OnFieldBlur, _super);
                function OnFieldBlur(sender, event) {
                    _super.call(this, sender, Event.FieldEvent.ON_FIELD_BLUR);
                    this.event = event;
                }
                OnFieldBlur.prototype.preventDefault = function () {
                    this.event["preventDefault"]();
                };
                return OnFieldBlur;
            }(Event.FieldEvent));
            Event.OnFieldBlur = OnFieldBlur;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnFieldMouseEnter = (function (_super) {
                __extends(OnFieldMouseEnter, _super);
                function OnFieldMouseEnter(sender, event) {
                    _super.call(this, sender, Event.FieldEvent.ON_FIELD_MOUSE_ENTER);
                    this.event = event;
                }
                OnFieldMouseEnter.prototype.preventDefault = function () {
                    this.event["preventDefault"]();
                };
                return OnFieldMouseEnter;
            }(Event.FieldEvent));
            Event.OnFieldMouseEnter = OnFieldMouseEnter;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnFieldMouseLeave = (function (_super) {
                __extends(OnFieldMouseLeave, _super);
                function OnFieldMouseLeave(sender, event) {
                    _super.call(this, sender, Event.FieldEvent.ON_FIELD_MOUSE_LEAVE);
                    this.event = event;
                }
                OnFieldMouseLeave.prototype.preventDefault = function () {
                    this.event["preventDefault"]();
                };
                return OnFieldMouseLeave;
            }(Event.FieldEvent));
            Event.OnFieldMouseLeave = OnFieldMouseLeave;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field_1) {
            "use strict";
            var Component = Ompluscript.View.Component.Component;
            var Creator = Ompluscript.Model.Creator;
            var OnFieldClick = Ompluscript.View.Event.OnFieldClick;
            var FieldEvent = Ompluscript.View.Event.FieldEvent;
            var OnFieldFocus = Ompluscript.View.Event.OnFieldFocus;
            var OnFieldBlur = Ompluscript.View.Event.OnFieldBlur;
            var OnFieldMouseEnter = Ompluscript.View.Event.OnFieldMouseEnter;
            var OnFieldMouseLeave = Ompluscript.View.Event.OnFieldMouseLeave;
            var Field = (function (_super) {
                __extends(Field, _super);
                function Field(name, styles) {
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, styles);
                    this.translation = Creator.getInstance().getTranslation();
                    this.addOnFieldClickEvent();
                    this.addOnFieldFocusEvent();
                    this.addOnFieldBlurEvent();
                    this.addOnFieldMouseEnterEvent();
                    this.addOnFieldMouseLeaveEvent();
                }
                Field.prototype.render = function () {
                    return this.htmlElement;
                };
                Field.prototype.attachOnFieldClickEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_CLICK, callback);
                };
                Field.prototype.attachOnFieldFocusEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_FOCUS, callback);
                };
                Field.prototype.attachOnFieldBlurEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_BLUR, callback);
                };
                Field.prototype.attachOnFieldMouseEnterEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_MOUSE_ENTER, callback);
                };
                Field.prototype.attachOnFieldMouseLeaveEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_MOUSE_LEAVE, callback);
                };
                Field.prototype.addOnFieldClickEvent = function () {
                    var that = this;
                    var listener = function (event) {
                        that.fireOnFieldClickEvent(event);
                    };
                    that.htmlElement.addEventListener(Field.EVENT_CLICK, listener, false);
                };
                Field.prototype.addOnFieldFocusEvent = function () {
                    var that = this;
                    var listener = function (event) {
                        that.fireOnFieldFocusEvent(event);
                    };
                    that.htmlElement.addEventListener(Field.EVENT_FOCUS, listener, false);
                };
                Field.prototype.addOnFieldBlurEvent = function () {
                    var that = this;
                    var listener = function (event) {
                        that.fireOnFieldBlurEvent(event);
                    };
                    that.htmlElement.addEventListener(Field.EVENT_BLUR, listener, false);
                };
                Field.prototype.addOnFieldMouseEnterEvent = function () {
                    var that = this;
                    var listener = function (event) {
                        that.fireOnFieldMouseEnterEvent(event);
                    };
                    that.htmlElement.addEventListener(Field.EVENT_MOUSE_ENTER, listener, false);
                };
                Field.prototype.addOnFieldMouseLeaveEvent = function () {
                    var that = this;
                    var listener = function (event) {
                        that.fireOnFieldMouseLeaveEvent(event);
                    };
                    that.htmlElement.addEventListener(Field.EVENT_MOUSE_LEAVE, listener, false);
                };
                Field.prototype.fireOnFieldClickEvent = function (event) {
                    var oEvent = new OnFieldClick(this, event);
                    this.notifyObservers(oEvent);
                };
                Field.prototype.fireOnFieldFocusEvent = function (event) {
                    var oEvent = new OnFieldFocus(this, event);
                    this.notifyObservers(oEvent);
                };
                Field.prototype.fireOnFieldBlurEvent = function (event) {
                    var oEvent = new OnFieldBlur(this, event);
                    this.notifyObservers(oEvent);
                };
                Field.prototype.fireOnFieldMouseEnterEvent = function (event) {
                    var oEvent = new OnFieldMouseEnter(this, event);
                    this.notifyObservers(oEvent);
                };
                Field.prototype.fireOnFieldMouseLeaveEvent = function (event) {
                    var oEvent = new OnFieldMouseLeave(this, event);
                    this.notifyObservers(oEvent);
                };
                Field.PARAMETER_EVENTS = "events";
                Field.PARAMETER_ON_FIELD_CLICK = "onFieldClick";
                Field.PARAMETER_ON_FIELD_FOCUS = "onFieldFocus";
                Field.PARAMETER_ON_FIELD_BLUR = "onFieldBlur";
                Field.PARAMETER_ON_FIELD_MOUSE_ENTER = "onFieldMouseEnter";
                Field.PARAMETER_ON_FIELD_MOUSE_LEAVE = "onFieldMouseLeave";
                Field.EVENT_CLICK = "click";
                Field.EVENT_FOCUS = "focus";
                Field.EVENT_BLUR = "blur";
                Field.EVENT_MOUSE_ENTER = "mouseenter";
                Field.EVENT_MOUSE_LEAVE = "mouseleave";
                return Field;
            }(Component));
            Field_1.Field = Field;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration) {
            var Field;
            (function (Field_2) {
                "use strict";
                var ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
                var Field = Ompluscript.View.Field.Field;
                var FieldConfiguration = (function (_super) {
                    __extends(FieldConfiguration, _super);
                    function FieldConfiguration() {
                        _super.apply(this, arguments);
                    }
                    FieldConfiguration.prototype.attachEvents = function (definition, field) {
                        if (definition[Field.PARAMETER_EVENTS] !== undefined) {
                            var onFieldClick = definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_CLICK];
                            if (onFieldClick !== undefined) {
                                field.attachOnFieldClickEvent(field, onFieldClick);
                            }
                            var onFieldFocus = definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_FOCUS];
                            if (onFieldFocus !== undefined) {
                                field.attachOnFieldFocusEvent(field, onFieldFocus);
                            }
                            var onFieldBlur = definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_BLUR];
                            if (onFieldBlur !== undefined) {
                                field.attachOnFieldBlurEvent(field, onFieldBlur);
                            }
                            var onFieldMouseEnter = definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_MOUSE_ENTER];
                            if (onFieldMouseEnter !== undefined) {
                                field.attachOnFieldMouseEnterEvent(field, onFieldMouseEnter);
                            }
                            var onFieldMouseLeave = definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_MOUSE_LEAVE];
                            if (onFieldMouseLeave !== undefined) {
                                field.attachOnFieldMouseLeaveEvent(field, onFieldMouseLeave);
                            }
                        }
                    };
                    return FieldConfiguration;
                }(ComponentConfiguration));
                Field_2.FieldConfiguration = FieldConfiguration;
            })(Field = Configuration.Field || (Configuration.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var OnUpdateInput = (function (_super) {
                __extends(OnUpdateInput, _super);
                function OnUpdateInput(sender, value) {
                    _super.call(this, sender, OnUpdateInput.ON_UPDATE_INPUT);
                    this.value = value;
                }
                OnUpdateInput.prototype.getValue = function () {
                    return this.value;
                };
                OnUpdateInput.ON_UPDATE_INPUT = "onUpdateInput";
                return OnUpdateInput;
            }(OEvent));
            Event.OnUpdateInput = OnUpdateInput;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
            var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
            var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;
            var OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
            var Input = (function (_super) {
                __extends(Input, _super);
                function Input(name, attribute, placeholder, styles, type) {
                    if (attribute === void 0) { attribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    if (type === void 0) { type = undefined; }
                    _super.call(this, name, styles);
                    this.isUpdating = false;
                    this.type = type;
                    this.setAttribute(Input.ATTRIBUTE_TYPE, type);
                    this.setAttribute(Input.ATTRIBUTE_NAME, this.name);
                    this.addClass(Input.CLASS_INPUT);
                    this.attribute = undefined;
                    this.setBinding(attribute);
                    this.addObserverByType(this, OnUpdateInput.ON_UPDATE_INPUT);
                    this.placeholder = placeholder;
                    if (this.isTranslated()) {
                        this.translation.attachToAsset(placeholder, this);
                    }
                }
                Input.prototype.update = function (event) {
                    if (event instanceof OnUpdateAttribute && this.isUpdating === false) {
                        var onUpdateAttribute = event;
                        this.updateValue(onUpdateAttribute.getNewValue());
                    }
                    else if (event instanceof OnUpdateInput && this.isBound()) {
                        var onUpdateInput = event;
                        this.attribute.setValue(onUpdateInput.getValue());
                    }
                    else if (event instanceof OnUpdateAsset && this.isTranslated()) {
                        var onUpdateAsset = event;
                        this.updatePlaceholder(onUpdateAsset.getNewValue());
                    }
                };
                Input.prototype.setBinding = function (attribute) {
                    this.removeBinding();
                    this.attribute = attribute;
                    if (this.isBound()) {
                        this.attribute.addObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                        this.updateValue(this.attribute.getValue());
                    }
                };
                Input.prototype.isBound = function () {
                    return this.attribute !== undefined;
                };
                Input.prototype.getBindingAttribute = function () {
                    return this.attribute;
                };
                Input.prototype.removeBinding = function () {
                    if (this.isBound()) {
                        this.attribute.deleteObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                        this.attribute = undefined;
                    }
                };
                Input.prototype.setValue = function (value) {
                    this.updateValue(value);
                    if (this.isBound()) {
                        this.attribute.setValue(this.getValue());
                    }
                };
                Input.prototype.isTranslated = function () {
                    return this.translation !== undefined && this.placeholder !== undefined;
                };
                Input.prototype.getPlaceholderContent = function () {
                    if (this.placeholderContent !== undefined) {
                        return this.placeholderContent;
                    }
                    return this.placeholder;
                };
                Input.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    if (this.isBound()) {
                        trace["attribute"] = this.attribute.getStackTrace();
                    }
                    else {
                        trace["attribute"] = undefined;
                    }
                    return trace;
                };
                Input.prototype.updatePlaceholder = function (value) {
                    this.placeholderContent = value;
                    this.setAttribute(Input.ATTRIBUTE_PLACEHOLDER, this.getPlaceholderContent());
                };
                Input.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Input.ELEMENT_INPUT);
                    this.addOnUpdateInputEvent();
                };
                Input.prototype.fireOnUpdateInputEvent = function (value) {
                    this.isUpdating = true;
                    var event = new OnUpdateInput(this, value);
                    this.notifyObservers(event);
                    this.isUpdating = false;
                };
                Input.PARAMETER_ATTRIBUTE = "attribute";
                Input.PARAMETER_PLACEHOLDER = "placeholder";
                Input.ELEMENT_INPUT = "input";
                Input.CLASS_INPUT = "input";
                Input.ATTRIBUTE_TYPE = "type";
                Input.ATTRIBUTE_VALUE = "value";
                Input.ATTRIBUTE_NAME = "name";
                Input.ATTRIBUTE_PLACEHOLDER = "placeholder";
                Input.EVENT_KEY_UP = "keyup";
                Input.EVENT_CHANGE = "change";
                Input.EVENT_BLUR = "blur";
                return Input;
            }(Field.Field));
            Field.Input = Input;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_25) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Input = Ompluscript.View.Field.Input;
                var Creator = Ompluscript.Model.Creator;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var InputConfiguration = (function (_super) {
                    __extends(InputConfiguration, _super);
                    function InputConfiguration(attributes, type) {
                        attributes.push(ErrorConfiguration);
                        var configurations = {};
                        configurations[Input.PARAMETER_ATTRIBUTE] = attributes;
                        _super.call(this, configurations);
                        this.type = type;
                    }
                    InputConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeString(definition, Input.PARAMETER_PLACEHOLDER));
                        var error = this.shouldBeStringOrObjectBoolean(definition, Input.PARAMETER_ATTRIBUTE);
                        if (error === undefined) {
                            if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "string") {
                                if (!Creator.getInstance().ifDefined(definition[Input.PARAMETER_ATTRIBUTE])) {
                                    errors.push(definition[Input.PARAMETER_ATTRIBUTE] + Configuration.MUST_BE_DEFINED);
                                }
                            }
                            else if (definition[Input.PARAMETER_ATTRIBUTE] !== undefined) {
                                if (typeof definition[Input.PARAMETER_ATTRIBUTE] === "boolean") {
                                    definition[Input.PARAMETER_ATTRIBUTE] = {};
                                }
                                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] = Input.PARAMETER_ATTRIBUTE;
                                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                                errors.push.apply(errors, this.getErrorsForChildren(definition, Input.PARAMETER_ATTRIBUTE));
                            }
                        }
                        else {
                            errors.push(error);
                        }
                        return this.filterErrors(errors);
                    };
                    InputConfiguration.prototype.createAttribute = function (definition, attribute) {
                        if (attribute === undefined && definition.hasOwnProperty(Input.PARAMETER_ATTRIBUTE)) {
                            if (typeof definition[Input.PARAMETER_ATTRIBUTE] !== "string") {
                                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_NAME] = Input.PARAMETER_ATTRIBUTE;
                                definition[Input.PARAMETER_ATTRIBUTE][Configuration.PARAMETER_TYPE] = this.type;
                            }
                            attribute = this.createChild(definition, Input.PARAMETER_ATTRIBUTE, Creator.getInstance());
                        }
                        return attribute;
                    };
                    return InputConfiguration;
                }(Field.FieldConfiguration));
                Field.InputConfiguration = InputConfiguration;
            })(Field = Configuration_25.Field || (Configuration_25.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var CheckBoxInput = (function (_super) {
                __extends(CheckBoxInput, _super);
                function CheckBoxInput(name, booleanAttribute, styles) {
                    if (booleanAttribute === void 0) { booleanAttribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, booleanAttribute, undefined, styles, CheckBoxInput.INPUT_CHECK_BOX);
                }
                CheckBoxInput.prototype.getValue = function () {
                    return this.htmlElement["checked"];
                };
                CheckBoxInput.prototype.clone = function () {
                    return new CheckBoxInput(this.name, this.attribute, this.styles);
                };
                CheckBoxInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(CheckBoxInput.EVENT_CHANGE, listener, false);
                };
                CheckBoxInput.prototype.updateValue = function (value) {
                    this.htmlElement["checked"] = value;
                };
                CheckBoxInput.TYPE_CHECK_BOX_INPUT = "CheckBoxInput";
                CheckBoxInput.INPUT_CHECK_BOX = "checkbox";
                return CheckBoxInput;
            }(Field.Input));
            Field.CheckBoxInput = CheckBoxInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_26) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var CheckBoxInput = Ompluscript.View.Field.CheckBoxInput;
                var BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
                var Boolean = Ompluscript.Model.Attribute.Boolean;
                var CheckBoxInputConfiguration = (function (_super) {
                    __extends(CheckBoxInputConfiguration, _super);
                    function CheckBoxInputConfiguration() {
                        var attributes = [
                            BooleanConfiguration,
                        ];
                        _super.call(this, attributes, Boolean.TYPE_BOOLEAN);
                    }
                    CheckBoxInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    CheckBoxInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === CheckBoxInput.TYPE_CHECK_BOX_INPUT;
                    };
                    CheckBoxInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var styles = definition[Component.PARAMETER_STYLES];
                        var checkBoxInput = new CheckBoxInput(name, attribute, styles);
                        this.attachEvents(definition, checkBoxInput);
                        return checkBoxInput;
                    };
                    return CheckBoxInputConfiguration;
                }(Field.InputConfiguration));
                Field.CheckBoxInputConfiguration = CheckBoxInputConfiguration;
            })(Field = Configuration_26.Field || (Configuration_26.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var TextInput = (function (_super) {
                __extends(TextInput, _super);
                function TextInput(name, attribute, placeholder, styles, type) {
                    if (attribute === void 0) { attribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    if (type === void 0) { type = TextInput.INPUT_TEXT; }
                    _super.call(this, name, attribute, placeholder, styles, type);
                }
                TextInput.prototype.getValue = function () {
                    var value = this.htmlElement["value"];
                    if (typeof value === "string" && value.length > 0) {
                        return value;
                    }
                    return undefined;
                };
                TextInput.prototype.clone = function () {
                    return new TextInput(this.name, this.attribute, this.placeholder, this.styles, this.type);
                };
                TextInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(TextInput.EVENT_KEY_UP, listener, false);
                };
                TextInput.prototype.updateValue = function (value) {
                    if (value === undefined) {
                        this.htmlElement["value"] = "";
                    }
                    else {
                        this.htmlElement["value"] = value;
                    }
                };
                TextInput.TYPE_TEXT_INPUT = "TextInput";
                TextInput.INPUT_TEXT = "text";
                return TextInput;
            }(Field.Input));
            Field.TextInput = TextInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_27) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var TextInput = Ompluscript.View.Field.TextInput;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
                var String = Ompluscript.Model.Attribute.String;
                var TextInputConfiguration = (function (_super) {
                    __extends(TextInputConfiguration, _super);
                    function TextInputConfiguration() {
                        var attributes = [
                            StringConfiguration,
                        ];
                        _super.call(this, attributes, String.TYPE_STRING);
                    }
                    TextInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === TextInput.TYPE_TEXT_INPUT;
                    };
                    TextInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    TextInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var textInput = new TextInput(name, attribute, placeholder, styles);
                        this.attachEvents(definition, textInput);
                        return textInput;
                    };
                    return TextInputConfiguration;
                }(Field.InputConfiguration));
                Field.TextInputConfiguration = TextInputConfiguration;
            })(Field = Configuration_27.Field || (Configuration_27.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var EmailInput = (function (_super) {
                __extends(EmailInput, _super);
                function EmailInput(name, stringAttribute, placeholder, styles) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, stringAttribute, placeholder, styles, EmailInput.INPUT_EMAIL);
                }
                EmailInput.prototype.clone = function () {
                    return new EmailInput(this.name, this.attribute, this.placeholder, this.styles);
                };
                EmailInput.TYPE_EMAIL_INPUT = "EmailInput";
                EmailInput.INPUT_EMAIL = "email";
                return EmailInput;
            }(Field.TextInput));
            Field.EmailInput = EmailInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_28) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var EmailInput = Ompluscript.View.Field.EmailInput;
                var EmailInputConfiguration = (function (_super) {
                    __extends(EmailInputConfiguration, _super);
                    function EmailInputConfiguration() {
                        _super.apply(this, arguments);
                    }
                    EmailInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === EmailInput.TYPE_EMAIL_INPUT;
                    };
                    EmailInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    EmailInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var emailInput = new EmailInput(name, attribute, placeholder, styles);
                        this.attachEvents(definition, emailInput);
                        return emailInput;
                    };
                    return EmailInputConfiguration;
                }(Field.TextInputConfiguration));
                Field.EmailInputConfiguration = EmailInputConfiguration;
            })(Field = Configuration_28.Field || (Configuration_28.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var NumberInput = (function (_super) {
                __extends(NumberInput, _super);
                function NumberInput(name, numberAttribute, placeholder, styles) {
                    if (numberAttribute === void 0) { numberAttribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, numberAttribute, placeholder, styles, NumberInput.INPUT_NUMBER);
                }
                NumberInput.prototype.getValue = function () {
                    var value = this.htmlElement["value"];
                    if (typeof value === "string") {
                        if (isNaN(parseInt(value, 10))) {
                            if (typeof value === "string" && value.length === 0) {
                                return undefined;
                            }
                            return value;
                        }
                        return parseInt(value, 10);
                    }
                    return undefined;
                };
                NumberInput.prototype.clone = function () {
                    return new NumberInput(this.name, this.attribute, this.placeholder, this.styles);
                };
                NumberInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(Field.TextInput.EVENT_KEY_UP, listener, false);
                    that.htmlElement.addEventListener(Field.TextInput.EVENT_CHANGE, listener, false);
                };
                NumberInput.prototype.updateValue = function (value) {
                    if (value === undefined) {
                        this.htmlElement["value"] = "";
                    }
                    else {
                        this.htmlElement["value"] = value.toString();
                    }
                };
                NumberInput.TYPE_NUMBER_INPUT = "NumberInput";
                NumberInput.INPUT_NUMBER = "number";
                return NumberInput;
            }(Field.Input));
            Field.NumberInput = NumberInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_29) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
                var Number = Ompluscript.Model.Attribute.Number;
                var NumberInput = Ompluscript.View.Field.NumberInput;
                var NumberInputConfiguration = (function (_super) {
                    __extends(NumberInputConfiguration, _super);
                    function NumberInputConfiguration() {
                        var attributes = [
                            NumberConfiguration,
                        ];
                        _super.call(this, attributes, Number.TYPE_NUMBER);
                    }
                    NumberInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === NumberInput.TYPE_NUMBER_INPUT;
                    };
                    NumberInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    NumberInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var numberInput = new NumberInput(name, attribute, placeholder, styles);
                        this.attachEvents(definition, numberInput);
                        return numberInput;
                    };
                    return NumberInputConfiguration;
                }(Field.InputConfiguration));
                Field.NumberInputConfiguration = NumberInputConfiguration;
            })(Field = Configuration_29.Field || (Configuration_29.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var PasswordInput = (function (_super) {
                __extends(PasswordInput, _super);
                function PasswordInput(name, stringAttribute, placeholder, styles) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, stringAttribute, placeholder, styles, PasswordInput.INPUT_PASSWORD);
                }
                PasswordInput.prototype.clone = function () {
                    return new PasswordInput(this.name, this.attribute, this.placeholder, this.styles);
                };
                PasswordInput.TYPE_PASSWORD_INPUT = "PasswordInput";
                PasswordInput.INPUT_PASSWORD = "password";
                return PasswordInput;
            }(Field.TextInput));
            Field.PasswordInput = PasswordInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_30) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var PasswordInput = Ompluscript.View.Field.PasswordInput;
                var PasswordInputConfiguration = (function (_super) {
                    __extends(PasswordInputConfiguration, _super);
                    function PasswordInputConfiguration() {
                        _super.apply(this, arguments);
                    }
                    PasswordInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === PasswordInput.TYPE_PASSWORD_INPUT;
                    };
                    PasswordInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    PasswordInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var passwordInput = new PasswordInput(name, attribute, placeholder, styles);
                        this.attachEvents(definition, passwordInput);
                        return passwordInput;
                    };
                    return PasswordInputConfiguration;
                }(Field.TextInputConfiguration));
                Field.PasswordInputConfiguration = PasswordInputConfiguration;
            })(Field = Configuration_30.Field || (Configuration_30.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container_9) {
            "use strict";
            var Layout = Ompluscript.View.Layout.Layout;
            var NullLayout = Ompluscript.View.Layout.NullLayout;
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(name, layout, children, styles) {
                    if (layout === void 0) { layout = undefined; }
                    if (children === void 0) { children = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, styles);
                    this.layout = layout;
                    if (this.layout === undefined) {
                        this.layout = new NullLayout();
                    }
                    if (Array.isArray(children)) {
                        for (var i = 0; i < children.length; i++) {
                            this.addChild(children[i]);
                        }
                    }
                    this.removeClass(Layout.CLASS_LAYOUT);
                }
                Container.prototype.addChild = function (component) {
                    component.setParent(this);
                    _super.prototype.addChild.call(this, component);
                    this.layout.addChild(component);
                };
                Container.prototype.removeChild = function (component) {
                    component.removeParent();
                    _super.prototype.removeChild.call(this, component);
                    this.layout.removeChild(component);
                };
                Container.prototype.clearChildren = function () {
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].removeParent();
                    }
                    _super.prototype.clearChildren.call(this);
                    this.layout.clearChildren();
                };
                Container.prototype.findChildrenByName = function (name) {
                    return this.findChildren(name);
                };
                Container.prototype.findChildrenByType = function (type) {
                    return this.findChildren(undefined, type);
                };
                Container.prototype.findChildren = function (name, type) {
                    if (name === void 0) { name = undefined; }
                    if (type === void 0) { type = undefined; }
                    if (this.getChildrenCount() === 0) {
                        return [];
                    }
                    var children = [];
                    for (var i = 0; i < this.getChildrenCount(); i++) {
                        var childName = this.children[i].constructor.toString().match(/^function\s*([^\s(]+)/)[1];
                        if (name === undefined && type === undefined) {
                            children.push(this.children[i]);
                        }
                        else if (name === this.children[i].getName() && type === undefined) {
                            children.push(this.children[i]);
                        }
                        else if (name === undefined && type === childName) {
                            children.push(this.children[i]);
                        }
                        else if (name === this.children[i].getName() && type === childName) {
                            children.push(this.children[i]);
                        }
                        if (this.children[i] instanceof Container) {
                            var container = this.children[i];
                            children.push.apply(children, container.findChildren(name, type));
                        }
                    }
                    return children;
                };
                Container.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Container.PARAMETER_LAYOUT] = this.layout.getStackTrace();
                    return trace;
                };
                Container.prototype.render = function () {
                    this.clear();
                    this.layout.clearChildren();
                    for (var i = 0; i < this.children.length; i++) {
                        this.layout.addChild(this.children[i]);
                    }
                    this.appendChild(this.layout);
                    return this.htmlElement;
                };
                Container.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                Container.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                Container.PARAMETER_LAYOUT = "layout";
                return Container;
            }(Layout));
            Container_9.Container = Container;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var PageEvent = (function (_super) {
                __extends(PageEvent, _super);
                function PageEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                PageEvent.ON_PAGE_LOAD = "onPageLoad";
                PageEvent.ON_PAGE_CLOSE = "onPageClose";
                return PageEvent;
            }(OEvent));
            Event.PageEvent = PageEvent;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnPageLoad = (function (_super) {
                __extends(OnPageLoad, _super);
                function OnPageLoad(sender) {
                    _super.call(this, sender, Event.PageEvent.ON_PAGE_LOAD);
                }
                return OnPageLoad;
            }(Event.PageEvent));
            Event.OnPageLoad = OnPageLoad;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnPageClose = (function (_super) {
                __extends(OnPageClose, _super);
                function OnPageClose(sender) {
                    _super.call(this, sender, Event.PageEvent.ON_PAGE_CLOSE);
                }
                return OnPageClose;
            }(Event.PageEvent));
            Event.OnPageClose = OnPageClose;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var OnPageLoad = Ompluscript.View.Event.OnPageLoad;
            var OnPageClose = Ompluscript.View.Event.OnPageClose;
            var Page = (function (_super) {
                __extends(Page, _super);
                function Page(name, defaultPage, layout, children, styles) {
                    if (defaultPage === void 0) { defaultPage = false; }
                    if (layout === void 0) { layout = undefined; }
                    if (children === void 0) { children = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, layout, children, styles);
                    this.addClass(Page.CLASS_PAGE);
                    this.addClass(name);
                    this.active = false;
                    this.defaultPage = defaultPage;
                }
                Page.prototype.isActive = function () {
                    return this.active;
                };
                Page.prototype.isRelated = function (path) {
                    return path.indexOf(this.name) === 0;
                };
                Page.prototype.trimPath = function (path) {
                    return path.replace(this.name, "");
                };
                Page.prototype.isDefaultPage = function () {
                    return this.defaultPage;
                };
                Page.prototype.setActive = function (active) {
                    var beforeChange = this.active;
                    this.active = active;
                    if (this.active === true && this.active !== beforeChange) {
                        this.fireOnPageLoadEvent();
                    }
                    else if (this.active === false && this.active !== beforeChange) {
                        this.fireOnPageCloseEvent();
                    }
                };
                Page.prototype.attachOnPageLoadEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, OnPageLoad.ON_PAGE_LOAD, callback);
                };
                Page.prototype.attachOnPageCloseEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, OnPageClose.ON_PAGE_CLOSE, callback);
                };
                Page.prototype.fireOnPageLoadEvent = function () {
                    var event = new OnPageLoad(this);
                    this.notifyObservers(event);
                };
                Page.prototype.fireOnPageCloseEvent = function () {
                    var event = new OnPageClose(this);
                    this.notifyObservers(event);
                };
                Page.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["active"] = this.active;
                    trace[Page.PARAMETER_DEFAULT_PAGE] = this.defaultPage;
                    return trace;
                };
                Page.TYPE_PAGE = "Page";
                Page.PARAMETER_EVENTS = "events";
                Page.PARAMETER_ON_PAGE_LOAD = "onPageLoad";
                Page.PARAMETER_ON_PAGE_CLOSE = "onPageClose";
                Page.NAME_404_PAGE = "Error-404";
                Page.PARAMETER_DEFAULT_PAGE = "defaultPage";
                Page.CLASS_PAGE = "page";
                return Page;
            }(Container.Container));
            Container.Page = Page;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
            var TextContent = (function (_super) {
                __extends(TextContent, _super);
                function TextContent(name, text, styles) {
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, styles);
                    this.text = text;
                    this.attachToTranslation();
                }
                TextContent.prototype.setTextAsset = function (text) {
                    this.detachFromTranslation();
                    this.text = text;
                    this.attachToTranslation();
                };
                TextContent.prototype.update = function (event) {
                    if (event instanceof OnUpdateAsset && this.isTranslated()) {
                        var onUpdateAsset = event;
                        this.updateText(onUpdateAsset.getNewValue());
                    }
                };
                TextContent.prototype.getTextContent = function () {
                    if (this.textContent !== undefined) {
                        return this.textContent;
                    }
                    return this.text;
                };
                TextContent.prototype.isTranslated = function () {
                    return this.translation !== undefined && this.text !== undefined;
                };
                TextContent.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[TextContent.PARAMETER_TEXT] = this.text;
                    return trace;
                };
                TextContent.prototype.attachToTranslation = function () {
                    if (this.isTranslated()) {
                        this.translation.attachToAsset(this.text, this);
                    }
                };
                TextContent.prototype.detachFromTranslation = function () {
                    if (this.isTranslated()) {
                        this.translation.detachFromAsset(this.text, this);
                    }
                };
                TextContent.prototype.updateText = function (value) {
                    this.textContent = value;
                    this.htmlElement.innerHTML = this.getTextContent();
                };
                TextContent.PARAMETER_TEXT = "text";
                return TextContent;
            }(Field.Field));
            Field.TextContent = TextContent;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var Button = (function (_super) {
                __extends(Button, _super);
                function Button(name, text, styles) {
                    if (text === void 0) { text = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, text, styles);
                    this.addClass(Button.CLASS_BUTTON);
                }
                Button.prototype.clone = function () {
                    return new Button(this.name, this.text, this.styles);
                };
                Button.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Button.ELEMENT_BUTTON);
                };
                Button.TYPE_BUTTON = "Button";
                Button.CLASS_BUTTON = "button";
                Button.ELEMENT_BUTTON = "button";
                return Button;
            }(Field.TextContent));
            Field.Button = Button;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var Button = Ompluscript.View.Field.Button;
            var Navigation = (function (_super) {
                __extends(Navigation, _super);
                function Navigation(children, styles) {
                    if (children === void 0) { children = []; }
                    if (styles === void 0) { styles = undefined; }
                    var button = new Button(Navigation.CLASS_NAVIGATION);
                    children.push(button);
                    for (var i = 0; i < children.length; i++) {
                        children[i].addClass(Navigation.CLASS_NAVIGATION_ELEMENT);
                    }
                    _super.call(this, Navigation.TYPE_NAVIGATION, undefined, children, styles);
                    this.addClass(Navigation.CLASS_NAVIGATION);
                    this.addClass(name);
                    button.attachOnFieldClickEvent(this, this.toggleMobileNavigation);
                }
                Navigation.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    delete trace[Container.List.PARAMETER_LAYOUT];
                    return trace;
                };
                Navigation.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Navigation.ELEMENT_NAV);
                };
                Navigation.prototype.toggleMobileNavigation = function () {
                    for (var i = 0; i < this.children.length - 1; i++) {
                        this.getParent().toggleClass(Navigation.CLASS_ACTIVE_NAVIGATION);
                    }
                };
                Navigation.TYPE_NAVIGATION = "Navigation";
                Navigation.ELEMENT_NAV = "nav";
                Navigation.CLASS_NAVIGATION = "navigation";
                Navigation.CLASS_ACTIVE_NAVIGATION = "active";
                Navigation.CLASS_NAVIGATION_ELEMENT = "navigation-element";
                return Navigation;
            }(Container.Container));
            Container.Navigation = Navigation;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Viewport;
        (function (Viewport_1) {
            "use strict";
            var Component = Ompluscript.View.Component.Component;
            var Viewport = (function (_super) {
                __extends(Viewport, _super);
                function Viewport(navigation, pages) {
                    if (pages === void 0) { pages = []; }
                    _super.call(this, Viewport.TYPE_VIEWPORT);
                    this.pages = pages;
                    this.navigation = navigation;
                    this.navigation.setParent(this);
                    if (pages.length > 0) {
                        this.setActivePageIndex(0);
                    }
                }
                Viewport.prototype.getPageByIndex = function (index) {
                    return this.pages[index];
                };
                Viewport.prototype.findPageIndexByName = function (name) {
                    for (var i = 0; i < this.pages.length; i++) {
                        if (this.pages[i].getName() === name) {
                            return i;
                        }
                    }
                    return undefined;
                };
                Viewport.prototype.setActivePageIndex = function (index) {
                    this.activePageIndex = index;
                    for (var i = 0; i < this.pages.length; i++) {
                        if (this.getPageByIndex(i).isActive() === true) {
                            this.getPageByIndex(i).setActive(false);
                        }
                    }
                    this.getPageByIndex(index).setActive(true);
                };
                Viewport.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["activePageIndex"] = this.activePageIndex;
                    trace[Viewport.PARAMETER_NAVIGATION] = this.navigation.getStackTrace();
                    trace[Viewport.PARAMETER_PAGES] = [];
                    for (var i = 0; i < this.pages.length; i++) {
                        trace[Viewport.PARAMETER_PAGES].push(this.pages[i].getStackTrace());
                    }
                    return trace;
                };
                Viewport.prototype.render = function () {
                    this.clear();
                    this.appendChild(this.navigation);
                    this.appendChild(this.pages[this.activePageIndex]);
                    return this.htmlElement;
                };
                Viewport.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                Viewport.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                Viewport.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.body;
                    this.addClass(Viewport.CLASS_VIEWPORT);
                };
                Viewport.TYPE_VIEWPORT = "Viewport";
                Viewport.PARAMETER_PAGES = "pages";
                Viewport.PARAMETER_NAVIGATION = "navigation";
                Viewport.CLASS_VIEWPORT = "viewport";
                return Viewport;
            }(Component));
            Viewport_1.Viewport = Viewport;
        })(Viewport = View.Viewport || (View.Viewport = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var List = (function (_super) {
                __extends(List, _super);
                function List(name, list, children, styles) {
                    if (list === void 0) { list = List.LIST_UNORDERED; }
                    if (children === void 0) { children = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, undefined, children, styles);
                    this.list = list;
                    this.addClass(List.CLASS_LIST);
                    this.addClass(list);
                }
                List.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    delete trace[List.PARAMETER_LAYOUT];
                    trace[List.PARAMETER_LIST] = this.list;
                    return trace;
                };
                List.prototype.render = function () {
                    this.clear();
                    for (var i = 0; i < this.children.length; i++) {
                        this.appendChild(this.children[i]);
                    }
                    return this.htmlElement;
                };
                List.prototype.appendChild = function (component) {
                    var element = document.createElement(List.ELEMENT_LIST_ITEM);
                    element.appendChild(component.render());
                    this.htmlElement.appendChild(element);
                };
                List.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(List.ELEMENT_LIST);
                };
                List.TYPE_LIST = "List";
                List.PARAMETER_LIST = "list";
                List.LIST_ORDERED = "ordered";
                List.LIST_UNORDERED = "unordered";
                List.LIST_NONE = "none";
                List.CLASS_LIST = "list";
                List.ELEMENT_LIST = "ul";
                List.ELEMENT_LIST_ITEM = "li";
                return List;
            }(Container.Container));
            Container.List = List;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var OnFieldClick = Ompluscript.View.Event.OnFieldClick;
            var Link = (function (_super) {
                __extends(Link, _super);
                function Link(name, text, href, styles) {
                    if (text === void 0) { text = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, text, styles);
                    this.addClass(Link.CLASS_LINK);
                    this.setAttribute(Link.ATTRIBUTE_HREF, href);
                }
                Link.prototype.update = function (event) {
                    _super.prototype.update.call(this, event);
                    if (event instanceof OnFieldClick) {
                        this.handleLinking(event);
                    }
                };
                Link.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Link.ELEMENT_LINK);
                };
                Link.CLASS_LINK = "link";
                Link.ELEMENT_LINK = "a";
                Link.ATTRIBUTE_HREF = "href";
                return Link;
            }(Field.TextContent));
            Field.Link = Link;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var FieldEvent = Ompluscript.View.Event.FieldEvent;
            var PageLink = (function (_super) {
                __extends(PageLink, _super);
                function PageLink(name, text, page, styles) {
                    if (text === void 0) { text = undefined; }
                    if (page === void 0) { page = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, text, page, styles);
                    this.page = page;
                    this.addClass(Field.Link.CLASS_LINK);
                    this.addObserverByType(this, FieldEvent.ON_FIELD_CLICK);
                }
                PageLink.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[PageLink.PARAMETER_PAGE] = this.page;
                    return trace;
                };
                PageLink.prototype.clone = function () {
                    return new PageLink(this.name, this.text, this.page, this.styles);
                };
                PageLink.prototype.handleLinking = function (event) {
                    event.preventDefault();
                    window.history.pushState(false, this.page);
                };
                PageLink.TYPE_PAGE_LINK = "PageLink";
                PageLink.PARAMETER_PAGE = "page";
                PageLink.CLASS_LINK = "link";
                PageLink.ELEMENT_LINK = "a";
                return PageLink;
            }(Field.Link));
            Field.PageLink = PageLink;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var Header = (function (_super) {
                __extends(Header, _super);
                function Header(name, text, level, styles) {
                    if (text === void 0) { text = undefined; }
                    if (level === void 0) { level = Header.LEVEL_FIRST; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, Header.ELEMENT_HEADER + level, text, styles);
                    this.name = name;
                    this.level = level;
                    this.addClass(Header.CLASS_HEADER);
                }
                Header.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Header.PARAMETER_LEVEL] = this.level;
                    return trace;
                };
                Header.prototype.clone = function () {
                    return new Header(this.name, this.text, this.level, this.styles);
                };
                Header.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(this.name);
                };
                Header.TYPE_HEADER = "Header";
                Header.PARAMETER_LEVEL = "level";
                Header.LEVEL_FIRST = "1";
                Header.LEVEL_SECOND = "2";
                Header.LEVEL_THIRD = "3";
                Header.LEVEL_FOURTH = "4";
                Header.LEVEL_FIFTH = "5";
                Header.LEVEL_SIXTH = "6";
                Header.CLASS_HEADER = "header";
                Header.ELEMENT_HEADER = "h";
                return Header;
            }(Field.TextContent));
            Field.Header = Header;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_5) {
        var Controller;
        (function (Controller) {
            "use strict";
            var Page = Ompluscript.View.Container.Page;
            var Viewport = Ompluscript.View.Viewport.Viewport;
            var Navigation = Ompluscript.View.Container.Navigation;
            var List = Ompluscript.View.Container.List;
            var PageLink = Ompluscript.View.Field.PageLink;
            var Header = Ompluscript.View.Field.Header;
            var NavigationController = (function (_super) {
                __extends(NavigationController, _super);
                function NavigationController(pages) {
                    _super.call(this, NavigationController.TYPE_NAVIGATION_CONTROLLER);
                    this.setup(pages);
                }
                NavigationController.prototype.switchPageByName = function (name) {
                    var index = this.viewport.findPageIndexByName(name);
                    this.viewport.setActivePageIndex(index);
                    this.viewport.render();
                };
                NavigationController.prototype.switchPageByIndex = function (index) {
                    this.viewport.setActivePageIndex(index);
                    this.viewport.render();
                };
                NavigationController.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["pageControllers"] = this.pageControllers;
                    trace["viewport"] = this.viewport;
                    return trace;
                };
                NavigationController.prototype.showPageFromPath = function (path) {
                    if (path.length > 1) {
                        for (var i = 0; i < this.pageControllers.length; i++) {
                            if (this.pageControllers[i].isRelated(path)) {
                                this.switchPageByIndex(i);
                                this.pageControllers[i].runPage(path);
                                return;
                            }
                        }
                        this.switchPageByIndex(this.pageControllers.length - 1);
                    }
                    else {
                        for (var i = 0; i < this.pageControllers.length; i++) {
                            if (this.pageControllers[i].getPage().isDefaultPage()) {
                                this.switchPageByName(this.pageControllers[i].getPage().getName());
                                return;
                            }
                            this.switchPageByName(this.pageControllers[0].getPage().getName());
                        }
                    }
                };
                NavigationController.prototype.setup = function (pages) {
                    this.pageControllers = [];
                    var pageList = [];
                    for (var i = 0; i < pages.length; i++) {
                        var pageController = void 0;
                        if (pages[i] instanceof Page) {
                            var page = pages[i];
                            pageController = new Controller.PageController(page);
                        }
                        else if (pages[i] instanceof Controller.PageController) {
                            pageController = pages[i];
                        }
                        this.pageControllers.push(pageController);
                        pageList.push(pageController.getPage());
                    }
                    var errorPage = Ompluscript.View.Creator.getInstance().create(Page.NAME_404_PAGE);
                    if (errorPage === undefined) {
                        errorPage = new Page(Page.NAME_404_PAGE, false, undefined, [new Header(Page.NAME_404_PAGE, "text_404_error_title")]);
                    }
                    this.pageControllers.push(new Controller.PageController(errorPage));
                    pageList.push(errorPage);
                    var navigation = Ompluscript.View.Creator.getInstance().create(Navigation.TYPE_NAVIGATION);
                    if (navigation === undefined) {
                        var component = [];
                        for (var i = 0; i < this.pageControllers.length; i++) {
                            if (this.pageControllers[i].getPage().getName() !== Page.NAME_404_PAGE) {
                                var name_1 = this.pageControllers[i].getPage().getName();
                                component.push(new PageLink(name_1, name_1, name_1));
                            }
                        }
                        var list = new List("firstLevel", undefined, component);
                        navigation = new Navigation([list]);
                    }
                    this.viewport = new Viewport(navigation, pageList);
                    this.setupHistoryHandler();
                    var path = window.location.pathname;
                    this.showPageFromPath(path);
                };
                NavigationController.prototype.setupHistoryHandler = function () {
                    var that = this;
                    that.history = window.history;
                    var pushState = that.history.pushState;
                    that.history.pushState = function (navigationController, path) {
                        pushState.apply(that.history, [path, path, path]);
                        if (navigationController === false) {
                            that.showPageFromPath(path);
                        }
                    };
                    window.onpopstate = function () {
                        var path = window.location.pathname;
                        that.showPageFromPath(path);
                    };
                };
                NavigationController.TYPE_NAVIGATION_CONTROLLER = "NavigationController";
                return NavigationController;
            }(Controller.Controller));
            Controller.NavigationController = NavigationController;
        })(Controller = Controller_5.Controller || (Controller_5.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var Paragraph = (function (_super) {
                __extends(Paragraph, _super);
                function Paragraph(name, text, styles) {
                    if (text === void 0) { text = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, text, styles);
                    this.addClass(Paragraph.CLASS_PARAGRAPH);
                }
                Paragraph.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Paragraph.ELEMENT_PARAGRAPH);
                };
                Paragraph.prototype.clone = function () {
                    return new Paragraph(this.name, this.text, this.styles);
                };
                Paragraph.TYPE_PARAGRAPH = "Paragraph";
                Paragraph.CLASS_PARAGRAPH = "paragraph";
                Paragraph.ELEMENT_PARAGRAPH = "p";
                return Paragraph;
            }(Field.TextContent));
            Field.Paragraph = Paragraph;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var Header = Ompluscript.View.Field.Header;
            var Paragraph = Ompluscript.View.Field.Paragraph;
            var WrongConfigurationContainer = (function (_super) {
                __extends(WrongConfigurationContainer, _super);
                function WrongConfigurationContainer(error) {
                    var children = [];
                    var title = error[Ompluscript.Core.Configuration.Creator.PARAMETER_TYPE]
                        + ": " + error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME];
                    children.push(new Header(error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME], title, Header.LEVEL_FIRST));
                    for (var i = 0; i < error[Ompluscript.Core.Configuration.Creator.PARAMETER_ERRORS].length; i++) {
                        var description = error[Ompluscript.Core.Configuration.Creator.PARAMETER_ERRORS][i];
                        children.push(new Paragraph(description, description));
                    }
                    var definition = "<pre>" +
                        JSON.stringify(error[Ompluscript.Core.Configuration.Creator.PARAMETER_DEFINITION], undefined, 2)
                        + "</pre>";
                    children.push(new Paragraph(error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME], definition));
                    _super.call(this, WrongConfigurationContainer.TYPE_WRONG_CONFIGURATION_CONTAINER, undefined, children);
                    this.addClass(WrongConfigurationContainer.CLASS_WRONG_CONFIGURATION_CONTAINER);
                }
                WrongConfigurationContainer.TYPE_WRONG_CONFIGURATION_CONTAINER = "WrongConfigurationContainer";
                WrongConfigurationContainer.CLASS_WRONG_CONFIGURATION_CONTAINER = "wrong-configuration";
                return WrongConfigurationContainer;
            }(Container.Container));
            Container.WrongConfigurationContainer = WrongConfigurationContainer;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var ApplicationControllerEvent = (function (_super) {
                __extends(ApplicationControllerEvent, _super);
                function ApplicationControllerEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                ApplicationControllerEvent.ON_APPLICATION_START = "onApplicationStart";
                ApplicationControllerEvent.ON_COMPONENT_LOAD = "onComponentLoad";
                return ApplicationControllerEvent;
            }(OEvent));
            Event.ApplicationControllerEvent = ApplicationControllerEvent;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event) {
            "use strict";
            var OnApplicationStart = (function (_super) {
                __extends(OnApplicationStart, _super);
                function OnApplicationStart(sender) {
                    _super.call(this, sender, Event.ApplicationControllerEvent.ON_APPLICATION_START);
                }
                return OnApplicationStart;
            }(Event.ApplicationControllerEvent));
            Event.OnApplicationStart = OnApplicationStart;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event) {
            "use strict";
            var OnComponentLoad = (function (_super) {
                __extends(OnComponentLoad, _super);
                function OnComponentLoad(sender, component) {
                    _super.call(this, sender, Event.ApplicationControllerEvent.ON_COMPONENT_LOAD);
                    this.component = component;
                }
                OnComponentLoad.prototype.getComponent = function () {
                    return this.component;
                };
                return OnComponentLoad;
            }(Event.ApplicationControllerEvent));
            Event.OnComponentLoad = OnComponentLoad;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_6) {
        var Controller;
        (function (Controller) {
            "use strict";
            var Page = Ompluscript.View.Container.Page;
            var OnApplicationStart = Ompluscript.Controller.Event.OnApplicationStart;
            var OnComponentLoad = Ompluscript.Controller.Event.OnComponentLoad;
            var ApplicationControllerEvent = Ompluscript.Controller.Event.ApplicationControllerEvent;
            var WrongConfigurationContainer = Ompluscript.View.Container.WrongConfigurationContainer;
            var ApplicationController = (function (_super) {
                __extends(ApplicationController, _super);
                function ApplicationController(components) {
                    _super.call(this, ApplicationController.TYPE_APPLICATION_CONTROLLER);
                    this.componentMap = {};
                    this.components = components;
                    for (var i = 0; i < components.length; i++) {
                        this.componentMap[components[i]] = undefined;
                    }
                    window.addEventListener("load", this.setup.bind(this));
                }
                ApplicationController.prototype.attachOnApplicationStartEvent = function (callback) {
                    this.addGenericObserverByType(this, ApplicationControllerEvent.ON_APPLICATION_START, callback);
                };
                ApplicationController.prototype.attachOnComponentLoadEvent = function (callback) {
                    this.addGenericObserverByType(this, ApplicationControllerEvent.ON_COMPONENT_LOAD, callback);
                };
                ApplicationController.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[ApplicationController.PARAMETER_COMPONENTS] = this.components;
                    trace[ApplicationController.PARAMETER_NAVIGATION_CONTROLLER] = this.navigationController;
                    return trace;
                };
                ApplicationController.prototype.setup = function () {
                    var that = this;
                    var _loop_1 = function(i) {
                        that.componentMap[that.components[i]] = undefined;
                        var ajax = new XMLHttpRequest();
                        var source = ApplicationController.COMPONENTS_FOLDER + that.components[i] + ".js";
                        var listener = function () {
                            if (ajax.readyState === ajax.DONE && ajax.status === 200) {
                                that.execute(that.components[i], ajax.responseText, true);
                            }
                            else if (ajax.readyState === ajax.DONE) {
                                that.execute(that.components[i], undefined, false);
                            }
                        };
                        ajax.addEventListener("readystatechange", listener, false);
                        ajax.open("GET", source, true);
                        ajax.send();
                    };
                    for (var i = 0; i < that.components.length; i++) {
                        _loop_1(i);
                    }
                };
                ApplicationController.prototype.execute = function (name, content, status) {
                    this.componentMap[name] = status;
                    if (status === true) {
                        this.componentMap[name] = content;
                    }
                    var numberOfUndefined = 0;
                    var numberOfFalse = 0;
                    for (var key in this.componentMap) {
                        if (this.componentMap.hasOwnProperty(key)) {
                            if (this.componentMap[key] === undefined) {
                                numberOfUndefined++;
                            }
                            else if (this.componentMap[key] === false) {
                                numberOfFalse++;
                            }
                        }
                    }
                    if (numberOfFalse === 0 && numberOfUndefined === 0) {
                        this.launch();
                    }
                    else if (numberOfFalse > 0 && numberOfUndefined === 0) {
                        this.exit();
                    }
                };
                ApplicationController.prototype.launch = function () {
                    for (var key in this.componentMap) {
                        if (this.componentMap.hasOwnProperty(key)) {
                            var script = document.createElement("script");
                            script.type = "text/javascript";
                            script.text = this.componentMap[key];
                            document.head.appendChild(script);
                            document.head.removeChild(script);
                            if (this.isValidConfiguration()) {
                                this.fireOnComponentLoadEvent(key);
                            }
                        }
                    }
                    var pages = [];
                    if (this.isValidConfiguration()) {
                        var pageNames = Ompluscript.View.Creator.getInstance().getPages();
                        for (var i = 0; i < pageNames.length; i++) {
                            pages.push(Ompluscript.View.Creator.getInstance().create(pageNames[i]));
                        }
                        var pageControllerNames = Ompluscript.Controller.Creator.getInstance().getPageControllers();
                        for (var i = 0; i < pageControllerNames.length; i++) {
                            pages.push(Ompluscript.Controller.Creator.getInstance().create(pageControllerNames[i]));
                        }
                    }
                    else {
                        var components = [];
                        var creators = [
                            Ompluscript.Model.Creator.getInstance(),
                            Ompluscript.View.Creator.getInstance(),
                            Ompluscript.Controller.Creator.getInstance(),
                        ];
                        for (var i = 0; i < creators.length; i++) {
                            components.push.apply(components, this.createWrongConfigurationContainers(creators[i]));
                        }
                        pages = [new Page(ApplicationController.TYPE_APPLICATION_CONTROLLER, true, undefined, components)];
                    }
                    this.navigationController = new Controller.NavigationController(pages);
                    if (this.isValidConfiguration()) {
                        this.fireOnApplicationStartEvent();
                    }
                };
                ApplicationController.prototype.exit = function () {
                    var components = [];
                    for (var key in this.componentMap) {
                        if (this.componentMap.hasOwnProperty(key) && this.componentMap[key] === false) {
                            components.push(new WrongConfigurationContainer({
                                definition: this.componentMap,
                                errors: [ApplicationController.COMPONENTS_FOLDER + key + ".js not found"],
                                name: ApplicationController.COMPONENTS_FOLDER + key + ".js",
                                type: "Script",
                            }));
                        }
                    }
                    var pages = [new Page(ApplicationController.TYPE_APPLICATION_CONTROLLER, true, undefined, components)];
                    this.navigationController = new Controller.NavigationController(pages);
                };
                ApplicationController.prototype.isValidConfiguration = function () {
                    return !Ompluscript.View.Creator.getInstance().hasErrors()
                        && !Ompluscript.Model.Creator.getInstance().hasErrors()
                        && !Ompluscript.Controller.Creator.getInstance().hasErrors();
                };
                ApplicationController.prototype.createWrongConfigurationContainers = function (creator) {
                    var components = [];
                    var errors = creator.getErrors();
                    for (var i = 0; i < errors.length; i++) {
                        components.push(new WrongConfigurationContainer(errors[i]));
                    }
                    return components;
                };
                ApplicationController.prototype.fireOnApplicationStartEvent = function () {
                    var event = new OnApplicationStart(this);
                    this.notifyObservers(event);
                };
                ApplicationController.prototype.fireOnComponentLoadEvent = function (component) {
                    var event = new OnComponentLoad(this, component);
                    this.notifyObservers(event);
                };
                ApplicationController.TYPE_APPLICATION_CONTROLLER = "ApplicationController";
                ApplicationController.PARAMETER_COMPONENTS = "components";
                ApplicationController.PARAMETER_NAVIGATION_CONTROLLER = "navigationController";
                ApplicationController.PARAMETER_ON_APPLICATION_START = "onApplicationStart";
                ApplicationController.PARAMETER_ON_COMPONENT_LOAD = "onComponentLoad";
                ApplicationController.COMPONENTS_FOLDER = "/app/";
                return ApplicationController;
            }(Controller.Controller));
            Controller.ApplicationController = ApplicationController;
        })(Controller = Controller_6.Controller || (Controller_6.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_7) {
        var Configuration;
        (function (Configuration_31) {
            var Controller;
            (function (Controller_8) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
                var Controller = Ompluscript.Controller.Controller.Controller;
                var ApplicationControllerConfiguration = (function (_super) {
                    __extends(ApplicationControllerConfiguration, _super);
                    function ApplicationControllerConfiguration() {
                        _super.call(this, undefined);
                    }
                    ApplicationControllerConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === ApplicationController.TYPE_APPLICATION_CONTROLLER;
                    };
                    ApplicationControllerConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeArray(definition, ApplicationController.PARAMETER_COMPONENTS));
                        if (definition[Controller.PARAMETER_EVENTS] !== undefined) {
                            errors.push(this.shouldBeFunction(definition[Controller.PARAMETER_EVENTS], ApplicationController.PARAMETER_ON_APPLICATION_START));
                            errors.push(this.shouldBeFunction(definition[Controller.PARAMETER_EVENTS], ApplicationController.PARAMETER_ON_COMPONENT_LOAD));
                        }
                        return this.filterErrors(errors);
                    };
                    ApplicationControllerConfiguration.prototype.create = function (definition) {
                        var components = definition[ApplicationController.PARAMETER_COMPONENTS];
                        var applicationController = new ApplicationController(components);
                        if (definition[Controller.PARAMETER_EVENTS] !== undefined) {
                            var onApplicationStart = definition[Controller.PARAMETER_EVENTS][ApplicationController.PARAMETER_ON_APPLICATION_START];
                            if (onApplicationStart !== undefined) {
                                applicationController.attachOnApplicationStartEvent(onApplicationStart);
                            }
                            var onComponentLoad = definition[Controller.PARAMETER_EVENTS][ApplicationController.PARAMETER_ON_COMPONENT_LOAD];
                            if (onComponentLoad !== undefined) {
                                applicationController.attachOnComponentLoadEvent(onComponentLoad);
                            }
                        }
                        return applicationController;
                    };
                    return ApplicationControllerConfiguration;
                }(Controller_8.ControllerConfiguration));
                Controller_8.ApplicationControllerConfiguration = ApplicationControllerConfiguration;
            })(Controller = Configuration_31.Controller || (Configuration_31.Controller = {}));
        })(Configuration = Controller_7.Configuration || (Controller_7.Configuration = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var OnActionRun = (function (_super) {
                __extends(OnActionRun, _super);
                function OnActionRun(sender, action, parameters) {
                    _super.call(this, sender, OnActionRun.ON_ACTION_RUN);
                    this.action = action;
                    this.parameters = parameters;
                }
                OnActionRun.prototype.getAction = function () {
                    return this.action;
                };
                OnActionRun.prototype.getParameters = function () {
                    return this.parameters;
                };
                OnActionRun.ON_ACTION_RUN = "onActionRun";
                return OnActionRun;
            }(OEvent));
            Event.OnActionRun = OnActionRun;
        })(Event = Controller.Event || (Controller.Event = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_9) {
        var Controller;
        (function (Controller) {
            "use strict";
            var OnActionRun = Ompluscript.Controller.Event.OnActionRun;
            var PageController = (function (_super) {
                __extends(PageController, _super);
                function PageController(page) {
                    _super.call(this, page.getName());
                    this.page = page;
                    this.actions = {};
                }
                PageController.prototype.getPage = function () {
                    return this.page;
                };
                PageController.prototype.isRelated = function (path) {
                    var isRelated = this.page.isRelated(path);
                    if (!isRelated) {
                        return false;
                    }
                    var rest = this.page.trimPath(path);
                    if (rest.charAt(0) === "/") {
                        rest = rest.substring(1);
                    }
                    if (rest.length === 0) {
                        return true;
                    }
                    var paths = rest.split("/");
                    return this.actions.hasOwnProperty(paths[0]);
                };
                PageController.prototype.runPage = function (path) {
                    var rest = this.page.trimPath(path);
                    if (rest.charAt(0) === "/") {
                        rest = rest.substring(1);
                    }
                    if (rest.length > 0) {
                        var paths = rest.split("/");
                        if (paths.length > 0) {
                            var action = paths[0];
                            paths.splice(0, 1);
                            var parameters = {};
                            for (var i = 0; i < paths.length; i += 2) {
                                parameters[paths[i]] = paths[i + 1];
                            }
                            this.runAction(action, parameters);
                        }
                    }
                };
                PageController.prototype.addAction = function (action, method) {
                    this.actions[action] = method;
                };
                PageController.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[PageController.PARAMETER_ACTIONS] = [];
                    for (var key in this.actions) {
                        if (this.actions.hasOwnProperty(key)) {
                            trace[PageController.PARAMETER_ACTIONS].push(key);
                        }
                    }
                    trace[PageController.PARAMETER_PAGE] = this.page.getStackTrace();
                    return trace;
                };
                PageController.prototype.runAction = function (action, parameters) {
                    if (parameters === void 0) { parameters = {}; }
                    if (this.actions.hasOwnProperty(action)) {
                        var names = this.getActionParameterNames(this.actions[action]);
                        var values = [];
                        for (var i = 0; i < names.length; i++) {
                            if (parameters.hasOwnProperty(names[i])) {
                                values.push(parameters[names[i]]);
                            }
                            else {
                                values.push(undefined);
                            }
                        }
                        this.actions[action].apply(this, values);
                        this.fireOnActionRunEvent(action, parameters);
                    }
                };
                PageController.prototype.fireOnActionRunEvent = function (action, parameters) {
                    var event = new OnActionRun(this, action, parameters);
                    this.notifyObservers(event);
                };
                PageController.prototype.getActionParameterNames = function (action) {
                    var definition = action.toString();
                    return definition.match(/\(.*?\)/)[0].replace(/[()]/gi, "").replace(/\s/gi, "").split(",");
                };
                PageController.TYPE_PAGE_CONTROLLER = "PageController";
                PageController.PARAMETER_PAGE = "page";
                PageController.PARAMETER_ACTIONS = "actions";
                return PageController;
            }(Controller.Controller));
            Controller.PageController = PageController;
        })(Controller = Controller_9.Controller || (Controller_9.Controller = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration) {
            var Container;
            (function (Container_10) {
                "use strict";
                var Container = Ompluscript.View.Container.Container;
                var ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
                var ContainerConfiguration = (function (_super) {
                    __extends(ContainerConfiguration, _super);
                    function ContainerConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ContainerConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeArray(definition, Container.PARAMETER_CHILDREN));
                        if (Array.isArray(definition[Container.PARAMETER_CHILDREN])) {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance()));
                        }
                        errors.push(this.shouldBeObject(definition, Container.PARAMETER_LAYOUT));
                        if (typeof definition[Container.PARAMETER_LAYOUT] === "object") {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Container.PARAMETER_LAYOUT));
                        }
                        return this.filterErrors(errors);
                    };
                    return ContainerConfiguration;
                }(ComponentConfiguration));
                Container_10.ContainerConfiguration = ContainerConfiguration;
            })(Container = Configuration.Container || (Configuration.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var DateInput = (function (_super) {
                __extends(DateInput, _super);
                function DateInput(name, datetimeAttribute, placeholder, styles) {
                    if (datetimeAttribute === void 0) { datetimeAttribute = undefined; }
                    if (placeholder === void 0) { placeholder = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, datetimeAttribute, placeholder, styles, DateInput.INPUT_DATE);
                }
                DateInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(Field.TextInput.EVENT_KEY_UP, listener, false);
                    that.htmlElement.addEventListener(Field.TextInput.EVENT_CHANGE, listener, false);
                    that.htmlElement.addEventListener(Field.TextInput.EVENT_BLUR, listener, false);
                };
                DateInput.prototype.clone = function () {
                    return new DateInput(this.name, this.attribute, this.placeholder, this.styles);
                };
                DateInput.TYPE_DATE_INPUT = "DateInput";
                DateInput.INPUT_DATE = "date";
                return DateInput;
            }(Field.TextInput));
            Field.DateInput = DateInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_32) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var DateInput = Ompluscript.View.Field.DateInput;
                var Input = Ompluscript.View.Field.Input;
                var Component = Ompluscript.View.Component.Component;
                var DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
                var Datetime = Ompluscript.Model.Attribute.Datetime;
                var DateInputConfiguration = (function (_super) {
                    __extends(DateInputConfiguration, _super);
                    function DateInputConfiguration() {
                        var attributes = [
                            DatetimeConfiguration,
                        ];
                        _super.call(this, attributes, Datetime.TYPE_DATETIME);
                    }
                    DateInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === DateInput.TYPE_DATE_INPUT;
                    };
                    DateInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    DateInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var placeholder = definition[Input.PARAMETER_PLACEHOLDER];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var dateInput = new DateInput(name, attribute, placeholder, styles);
                        this.attachEvents(definition, dateInput);
                        return dateInput;
                    };
                    return DateInputConfiguration;
                }(Field.InputConfiguration));
                Field.DateInputConfiguration = DateInputConfiguration;
            })(Field = Configuration_32.Field || (Configuration_32.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration) {
            var Field;
            (function (Field) {
                "use strict";
                var TextContent = Ompluscript.View.Field.TextContent;
                var TextContentConfiguration = (function (_super) {
                    __extends(TextContentConfiguration, _super);
                    function TextContentConfiguration() {
                        _super.call(this, undefined);
                    }
                    TextContentConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeString(definition, TextContent.PARAMETER_TEXT));
                        return this.filterErrors(errors);
                    };
                    return TextContentConfiguration;
                }(Field.FieldConfiguration));
                Field.TextContentConfiguration = TextContentConfiguration;
            })(Field = Configuration.Field || (Configuration.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_33) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var Paragraph = Ompluscript.View.Field.Paragraph;
                var TextContent = Ompluscript.View.Field.TextContent;
                var ParagraphConfiguration = (function (_super) {
                    __extends(ParagraphConfiguration, _super);
                    function ParagraphConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ParagraphConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Paragraph.TYPE_PARAGRAPH;
                    };
                    ParagraphConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    ParagraphConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var text = definition[TextContent.PARAMETER_TEXT];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var paragraph = new Paragraph(name, text, styles);
                        this.attachEvents(definition, paragraph);
                        return paragraph;
                    };
                    return ParagraphConfiguration;
                }(Field.TextContentConfiguration));
                Field.ParagraphConfiguration = ParagraphConfiguration;
            })(Field = Configuration_33.Field || (Configuration_33.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_34) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var Button = Ompluscript.View.Field.Button;
                var TextContent = Ompluscript.View.Field.TextContent;
                var ButtonConfiguration = (function (_super) {
                    __extends(ButtonConfiguration, _super);
                    function ButtonConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ButtonConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Button.TYPE_BUTTON;
                    };
                    ButtonConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    ButtonConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var text = definition[TextContent.PARAMETER_TEXT];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var button = new Button(name, text, styles);
                        this.attachEvents(definition, button);
                        return button;
                    };
                    return ButtonConfiguration;
                }(Field.TextContentConfiguration));
                Field.ButtonConfiguration = ButtonConfiguration;
            })(Field = Configuration_34.Field || (Configuration_34.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_35) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var TextContent = Ompluscript.View.Field.TextContent;
                var Header = Ompluscript.View.Field.Header;
                var HeaderConfiguration = (function (_super) {
                    __extends(HeaderConfiguration, _super);
                    function HeaderConfiguration() {
                        _super.apply(this, arguments);
                    }
                    HeaderConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Header.TYPE_HEADER;
                    };
                    HeaderConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeString(definition, Header.PARAMETER_LEVEL));
                        if (typeof definition[Header.PARAMETER_LEVEL] === "string") {
                            var values = [
                                Header.LEVEL_FIRST,
                                Header.LEVEL_SECOND,
                                Header.LEVEL_THIRD,
                                Header.LEVEL_FOURTH,
                                Header.LEVEL_FIFTH,
                                Header.LEVEL_SIXTH,
                            ];
                            errors.push(this.mustBeValue(definition, Header.PARAMETER_LEVEL, values));
                        }
                        return this.filterErrors(errors);
                    };
                    HeaderConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var text = definition[TextContent.PARAMETER_TEXT];
                        var level = definition[Header.PARAMETER_LEVEL];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var header = new Header(name, text, level, styles);
                        this.attachEvents(definition, header);
                        return header;
                    };
                    return HeaderConfiguration;
                }(Field.TextContentConfiguration));
                Field.HeaderConfiguration = HeaderConfiguration;
            })(Field = Configuration_35.Field || (Configuration_35.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var Label = (function (_super) {
                __extends(Label, _super);
                function Label(name, text, styles) {
                    if (text === void 0) { text = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, text, styles);
                    this.addClass(Label.CLASS_LABEL);
                }
                Label.prototype.clone = function () {
                    return new Label(this.name, this.text, this.styles);
                };
                Label.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Label.ELEMENT_LABEL);
                };
                Label.TYPE_LABEL = "Label";
                Label.CLASS_LABEL = "label";
                Label.ELEMENT_LABEL = "label";
                return Label;
            }(Field.TextContent));
            Field.Label = Label;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_36) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var Label = Ompluscript.View.Field.Label;
                var TextContent = Ompluscript.View.Field.TextContent;
                var LabelConfiguration = (function (_super) {
                    __extends(LabelConfiguration, _super);
                    function LabelConfiguration() {
                        _super.apply(this, arguments);
                    }
                    LabelConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Label.TYPE_LABEL;
                    };
                    LabelConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    LabelConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var text = definition[TextContent.PARAMETER_TEXT];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var label = new Label(name, text, styles);
                        this.attachEvents(definition, label);
                        return label;
                    };
                    return LabelConfiguration;
                }(Field.TextContentConfiguration));
                Field.LabelConfiguration = LabelConfiguration;
            })(Field = Configuration_36.Field || (Configuration_36.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_37) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var TextContent = Ompluscript.View.Field.TextContent;
                var PageLink = Ompluscript.View.Field.PageLink;
                var PageLinkConfiguration = (function (_super) {
                    __extends(PageLinkConfiguration, _super);
                    function PageLinkConfiguration() {
                        _super.apply(this, arguments);
                    }
                    PageLinkConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === PageLink.TYPE_PAGE_LINK;
                    };
                    PageLinkConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.mustBeString(definition, PageLink.PARAMETER_PAGE));
                        return this.filterErrors(errors);
                    };
                    PageLinkConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var text = definition[TextContent.PARAMETER_TEXT];
                        var page = definition[PageLink.PARAMETER_PAGE];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var pageLink = new PageLink(name, text, page, styles);
                        this.attachEvents(definition, pageLink);
                        return pageLink;
                    };
                    return PageLinkConfiguration;
                }(Field.TextContentConfiguration));
                Field.PageLinkConfiguration = PageLinkConfiguration;
            })(Field = Configuration_37.Field || (Configuration_37.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var Image = (function (_super) {
                __extends(Image, _super);
                function Image(name, source, text, styles) {
                    if (text === void 0) { text = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, text, styles);
                    this.addClass(Image.CLASS_IMAGE);
                    this.source = source;
                    this.setAttribute(Image.ATTRIBUTE_SRC, this.source);
                }
                Image.prototype.clone = function () {
                    return new Image(this.name, this.source, this.text, this.styles);
                };
                Image.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Image.PARAMETER_SOURCE] = this.source;
                    return trace;
                };
                Image.prototype.updateText = function (value) {
                    this.textContent = value;
                    this.setAttribute(Image.ATTRIBUTE_ALT, this.getTextContent());
                    this.setAttribute(Image.ATTRIBUTE_TITLE, this.getTextContent());
                };
                Image.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Image.ELEMENT_IMAGE);
                };
                Image.TYPE_IMAGE = "Image";
                Image.PARAMETER_SOURCE = "source";
                Image.CLASS_IMAGE = "image";
                Image.ELEMENT_IMAGE = "img";
                Image.ATTRIBUTE_SRC = "src";
                Image.ATTRIBUTE_TITLE = "title";
                Image.ATTRIBUTE_ALT = "alt";
                return Image;
            }(Field.TextContent));
            Field.Image = Image;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_38) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var Image = Ompluscript.View.Field.Image;
                var TextContent = Ompluscript.View.Field.TextContent;
                var ImageConfiguration = (function (_super) {
                    __extends(ImageConfiguration, _super);
                    function ImageConfiguration() {
                        _super.apply(this, arguments);
                    }
                    ImageConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Image.TYPE_IMAGE;
                    };
                    ImageConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.mustBeString(definition, Image.PARAMETER_SOURCE));
                        return this.filterErrors(errors);
                    };
                    ImageConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var text = definition[TextContent.PARAMETER_TEXT];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var source = definition[Image.PARAMETER_SOURCE];
                        var image = new Image(name, source, text, styles);
                        this.attachEvents(definition, image);
                        return image;
                    };
                    return ImageConfiguration;
                }(Field.TextContentConfiguration));
                Field.ImageConfiguration = ImageConfiguration;
            })(Field = Configuration_38.Field || (Configuration_38.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_39) {
            var Container;
            (function (Container_11) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var List = Ompluscript.View.Container.List;
                var Component = Ompluscript.View.Component.Component;
                var Container = Ompluscript.View.Container.Container;
                var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
                var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
                var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
                var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
                var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
                var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
                var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
                var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
                var PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
                var LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;
                var ImageConfiguration = Ompluscript.View.Configuration.Field.ImageConfiguration;
                var ListConfiguration = (function (_super) {
                    __extends(ListConfiguration, _super);
                    function ListConfiguration() {
                        var children = [
                            CheckBoxInputConfiguration,
                            EmailInputConfiguration,
                            NumberInputConfiguration,
                            PasswordInputConfiguration,
                            TextInputConfiguration,
                            DateInputConfiguration,
                            ParagraphConfiguration,
                            ButtonConfiguration,
                            HeaderConfiguration,
                            LabelConfiguration,
                            PageLinkConfiguration,
                            ListConfiguration,
                            ImageConfiguration,
                            ErrorConfiguration,
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_CHILDREN] = children;
                        _super.call(this, configurations);
                    }
                    ListConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === List.TYPE_LIST;
                    };
                    ListConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeString(definition, List.PARAMETER_LIST));
                        if (typeof definition[List.PARAMETER_LIST] === "string") {
                            var values = [
                                List.LIST_NONE,
                                List.LIST_ORDERED,
                                List.LIST_UNORDERED,
                            ];
                            errors.push(this.mustBeValue(definition, List.PARAMETER_LIST, values));
                        }
                        return this.filterErrors(errors);
                    };
                    ListConfiguration.prototype.create = function (definition, children) {
                        if (children === void 0) { children = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        var list = definition[List.PARAMETER_LIST];
                        if (children === undefined) {
                            children = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance());
                        }
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new List(name, list, children, styles);
                    };
                    return ListConfiguration;
                }(Container_11.ContainerConfiguration));
                Container_11.ListConfiguration = ListConfiguration;
            })(Container = Configuration_39.Container || (Configuration_39.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var Box = (function (_super) {
                __extends(Box, _super);
                function Box(name, layout, children, styles) {
                    if (layout === void 0) { layout = undefined; }
                    if (children === void 0) { children = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, layout, children, styles);
                    this.addClass(Box.CLASS_BOX);
                }
                Box.TYPE_BOX = "Box";
                Box.CLASS_BOX = "box";
                return Box;
            }(Container.Container));
            Container.Box = Box;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var Label = Ompluscript.View.Field.Label;
            var AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
            var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
            var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
            var InputContainer = (function (_super) {
                __extends(InputContainer, _super);
                function InputContainer(input) {
                    var label = new Label(input.getName() + "Error");
                    var children = [label, input];
                    _super.call(this, input.getName(), undefined, children);
                    this.addClass(InputContainer.CLASS_INPUT_CONTAINER);
                    this.label = label;
                    this.input = input;
                    input.getBindingAttribute().addObserverByType(this, AttributeEvent.ON_INVALID_ATTRIBUTE);
                    input.getBindingAttribute().addObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                }
                InputContainer.prototype.update = function (event) {
                    if (event instanceof OnInvalidAttribute) {
                        var onInvalidAttribute = event;
                        this.label.setTextAsset(this.name + "." + onInvalidAttribute.getValidationCode());
                        this.label.getParent().addClass(InputContainer.CLASS_ERROR);
                    }
                    else if (event instanceof OnUpdateAttribute) {
                        if (this.input.getBindingAttribute().validate()) {
                            this.label.getParent().removeClass(InputContainer.CLASS_ERROR);
                        }
                    }
                };
                InputContainer.prototype.clearError = function () {
                    this.label.getParent().removeClass(InputContainer.CLASS_ERROR);
                };
                InputContainer.CLASS_INPUT_CONTAINER = "input-container";
                InputContainer.CLASS_ERROR = "error";
                return InputContainer;
            }(Container.Container));
            Container.InputContainer = InputContainer;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OEvent = Ompluscript.Core.Observer.OEvent;
            var FormEvent = (function (_super) {
                __extends(FormEvent, _super);
                function FormEvent(sender, type, response) {
                    _super.call(this, sender, type);
                    this.response = response;
                }
                FormEvent.prototype.getResponse = function () {
                    return this.response;
                };
                FormEvent.ON_FORM_SUBMIT = "onFormSubmit";
                FormEvent.ON_FORM_FAIL = "onFormFail";
                return FormEvent;
            }(OEvent));
            Event.FormEvent = FormEvent;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnFormFail = (function (_super) {
                __extends(OnFormFail, _super);
                function OnFormFail(sender, response) {
                    _super.call(this, sender, Event.FormEvent.ON_FORM_FAIL, response);
                }
                return OnFormFail;
            }(Event.FormEvent));
            Event.OnFormFail = OnFormFail;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event) {
            "use strict";
            var OnFormSubmit = (function (_super) {
                __extends(OnFormSubmit, _super);
                function OnFormSubmit(sender, response) {
                    _super.call(this, sender, Event.FormEvent.ON_FORM_SUBMIT, response);
                }
                return OnFormSubmit;
            }(Event.FormEvent));
            Event.OnFormSubmit = OnFormSubmit;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var TableEvent = Ompluscript.Model.Event.TableEvent;
            var OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
            var Input = Ompluscript.View.Field.Input;
            var OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;
            var OnClearTable = Ompluscript.Model.Event.OnClearTable;
            var OnUpdateTable = Ompluscript.Model.Event.OnUpdateTable;
            var TableLayout = Ompluscript.View.Layout.TableLayout;
            var TableContainer = (function (_super) {
                __extends(TableContainer, _super);
                function TableContainer(name, table, headers, cells, styles) {
                    if (cells === void 0) { cells = undefined; }
                    if (styles === void 0) { styles = undefined; }
                    _super.call(this, name, undefined, [], styles);
                    this.addClass(TableContainer.CLASS_TABLE);
                    this.table = table;
                    this.headers = headers;
                    this.cells = cells;
                    this.rows = [];
                    if (this.table !== undefined) {
                        this.table.addObserverByType(this, TableEvent.ON_ADD_ROW_TO_TABLE);
                        this.table.addObserverByType(this, TableEvent.ON_REMOVE_ROW_FROM_TABLE);
                        this.table.addObserverByType(this, TableEvent.ON_CLEAR_TABLE);
                        this.table.addObserverByType(this, TableEvent.ON_UPDATE_TABLE);
                    }
                }
                TableContainer.prototype.update = function (event) {
                    if (event instanceof OnAddRowToTable) {
                        this.addRow(event.getModel());
                    }
                    else if (event instanceof OnRemoveRowFromTable) {
                        this.removeRow(event.getIndex());
                    }
                    else if (event instanceof OnClearTable) {
                        this.clearRows();
                    }
                    else if (event instanceof OnUpdateTable) {
                        this.updateRows();
                    }
                };
                TableContainer.prototype.getTable = function () {
                    return this.table;
                };
                TableContainer.prototype.addRow = function (model) {
                    var cells = [];
                    for (var i = 0; i < this.cells.length; i++) {
                        var cell = this.cells[i].clone();
                        if (cell instanceof Input) {
                            cell.setBinding(model.getAttribute(cell.getName()));
                        }
                        cells.push(cell);
                    }
                    this.rows.push(cells);
                };
                TableContainer.prototype.removeRow = function (index) {
                    if (this.rows[index] !== undefined) {
                        for (var i = 0; i < this.rows[index].length; i++) {
                            this.rows[index][i].dispose();
                        }
                        this.rows.slice(index, 1);
                    }
                };
                TableContainer.prototype.clearRows = function () {
                    for (var i = this.rows.length; i > -1; i--) {
                        this.removeRow(i);
                    }
                    this.rows = [];
                };
                TableContainer.prototype.updateRows = function () {
                    this.clearChildren();
                    this.layout = new TableLayout(this.rows.length + 1, this.cells.length);
                    for (var i = 0; i < this.headers.length; i++) {
                        this.addChild(this.headers[i]);
                    }
                    for (var i = 0; i < this.rows.length; i++) {
                        for (var j = 0; j < this.rows[i].length; j++) {
                            this.addChild(this.rows[i][j]);
                        }
                    }
                    this.render();
                };
                TableContainer.TYPE_TABLE = "TableContainer";
                TableContainer.PARAMETER_TABLE = "table";
                TableContainer.PARAMETER_HEADERS = "headers";
                TableContainer.PARAMETER_CELLS = "cells";
                TableContainer.CLASS_TABLE = "table";
                return TableContainer;
            }(Container.Container));
            Container.TableContainer = TableContainer;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var LabelInput = (function (_super) {
                __extends(LabelInput, _super);
                function LabelInput(name, attribute, styles) {
                    if (attribute === void 0) { attribute = undefined; }
                    if (styles === void 0) { styles = {}; }
                    _super.call(this, name, attribute, undefined, styles);
                    this.removeAttribute(Field.Input.ATTRIBUTE_TYPE);
                    this.removeAttribute(Field.Input.ATTRIBUTE_NAME);
                }
                LabelInput.prototype.getValue = function () {
                    return this.htmlElement.innerHTML;
                };
                LabelInput.prototype.clone = function () {
                    return new LabelInput(this.name, this.attribute, this.styles);
                };
                LabelInput.prototype.addOnUpdateInputEvent = function () {
                    return undefined;
                };
                LabelInput.prototype.updateValue = function (value) {
                    if (value === undefined) {
                        value = "";
                    }
                    this.htmlElement.innerHTML = value;
                };
                LabelInput.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Field.Label.ELEMENT_LABEL);
                };
                LabelInput.TYPE_LABEL_INPUT = "LabelInput";
                LabelInput.EVENT_KEY_UP = "keyup";
                return LabelInput;
            }(Field.Input));
            Field.LabelInput = LabelInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_40) {
            var Field;
            (function (Field) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var LabelInput = Ompluscript.View.Field.LabelInput;
                var Component = Ompluscript.View.Component.Component;
                var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
                var String = Ompluscript.Model.Attribute.String;
                var LabelInputConfiguration = (function (_super) {
                    __extends(LabelInputConfiguration, _super);
                    function LabelInputConfiguration() {
                        var attributes = [
                            StringConfiguration,
                        ];
                        _super.call(this, attributes, String.TYPE_STRING);
                    }
                    LabelInputConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === LabelInput.TYPE_LABEL_INPUT;
                    };
                    LabelInputConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    LabelInputConfiguration.prototype.create = function (definition, attribute) {
                        if (attribute === void 0) { attribute = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        attribute = this.createAttribute(definition, attribute);
                        var styles = definition[Component.PARAMETER_STYLES];
                        var labelInput = new LabelInput(name, attribute, styles);
                        this.attachEvents(definition, labelInput);
                        return labelInput;
                    };
                    return LabelInputConfiguration;
                }(Field.InputConfiguration));
                Field.LabelInputConfiguration = LabelInputConfiguration;
            })(Field = Configuration_40.Field || (Configuration_40.Field = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_41) {
            var Container;
            (function (Container) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
                var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
                var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
                var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
                var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
                var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
                var LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;
                var LabelInputConfiguration = Ompluscript.View.Configuration.Field.LabelInputConfiguration;
                var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
                var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
                var ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
                var PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
                var TableConfiguration = Ompluscript.Model.Configuration.Container.TableConfiguration;
                var TableContainer = Ompluscript.View.Container.TableContainer;
                var ImageConfiguration = Ompluscript.View.Configuration.Field.ImageConfiguration;
                var TableContainerConfiguration = (function (_super) {
                    __extends(TableContainerConfiguration, _super);
                    function TableContainerConfiguration() {
                        var cells = [
                            CheckBoxInputConfiguration,
                            EmailInputConfiguration,
                            NumberInputConfiguration,
                            PasswordInputConfiguration,
                            TextInputConfiguration,
                            DateInputConfiguration,
                            LabelConfiguration,
                            LabelInputConfiguration,
                            ParagraphConfiguration,
                            ButtonConfiguration,
                            HeaderConfiguration,
                            LabelConfiguration,
                            PageLinkConfiguration,
                            ErrorConfiguration,
                        ];
                        var headers = [
                            LabelConfiguration,
                            ParagraphConfiguration,
                            ButtonConfiguration,
                            HeaderConfiguration,
                            LabelConfiguration,
                            PageLinkConfiguration,
                            ImageConfiguration,
                            ErrorConfiguration,
                        ];
                        var table = [
                            TableConfiguration,
                        ];
                        var configurations = {};
                        configurations[TableContainer.PARAMETER_CELLS] = cells;
                        configurations[TableContainer.PARAMETER_HEADERS] = headers;
                        configurations[TableContainer.PARAMETER_TABLE] = table;
                        _super.call(this, configurations);
                    }
                    TableContainerConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === TableContainer.TYPE_TABLE;
                    };
                    TableContainerConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeStringOrObject(definition, TableContainer.PARAMETER_TABLE));
                        if (typeof definition[TableContainer.PARAMETER_TABLE] === "object") {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, TableContainer.PARAMETER_TABLE));
                        }
                        errors.push(this.shouldBeObject(definition, TableContainer.PARAMETER_HEADERS));
                        if (typeof definition[TableContainer.PARAMETER_HEADERS] === "object") {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, TableContainer.PARAMETER_HEADERS));
                        }
                        errors.push(this.shouldBeObject(definition, TableContainer.PARAMETER_CELLS));
                        if (typeof definition[TableContainer.PARAMETER_CELLS] === "object") {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, TableContainer.PARAMETER_CELLS));
                        }
                        errors = this.filterErrors(errors);
                        return this.filterErrors(errors);
                    };
                    TableContainerConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var table = _super.prototype.createChild.call(this, definition, TableContainer.PARAMETER_TABLE, Ompluscript.Model.Creator.getInstance());
                        var headers = _super.prototype.createChildren.call(this, definition, TableContainer.PARAMETER_HEADERS, Ompluscript.Model.Creator.getInstance());
                        var cells = _super.prototype.createChildren.call(this, definition, TableContainer.PARAMETER_CELLS, Ompluscript.Model.Creator.getInstance());
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new TableContainer(name, table, headers, cells, styles);
                    };
                    return TableContainerConfiguration;
                }(Container.ContainerConfiguration));
                Container.TableContainerConfiguration = TableContainerConfiguration;
            })(Container = Configuration_41.Container || (Configuration_41.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_42) {
            var Container;
            (function (Container_12) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Box = Ompluscript.View.Container.Box;
                var Component = Ompluscript.View.Component.Component;
                var Container = Ompluscript.View.Container.Container;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var NullLayoutConfiguration = Ompluscript.View.Configuration.Layout.NullLayoutConfiguration;
                var RelativeLayoutConfiguration = Ompluscript.View.Configuration.Layout.RelativeLayoutConfiguration;
                var LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
                var TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
                var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
                var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
                var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
                var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
                var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
                var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
                var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
                var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
                var PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
                var ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
                var LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;
                var LabelInputConfiguration = Ompluscript.View.Configuration.Field.LabelInputConfiguration;
                var ImageConfiguration = Ompluscript.View.Configuration.Field.ImageConfiguration;
                var BoxConfiguration = (function (_super) {
                    __extends(BoxConfiguration, _super);
                    function BoxConfiguration() {
                        var layouts = [
                            NullLayoutConfiguration,
                            RelativeLayoutConfiguration,
                            LinearLayoutConfiguration,
                            TableLayoutConfiguration,
                            ErrorConfiguration,
                        ];
                        var children = [
                            CheckBoxInputConfiguration,
                            EmailInputConfiguration,
                            NumberInputConfiguration,
                            PasswordInputConfiguration,
                            TextInputConfiguration,
                            DateInputConfiguration,
                            LabelInputConfiguration,
                            ParagraphConfiguration,
                            ButtonConfiguration,
                            ImageConfiguration,
                            HeaderConfiguration,
                            LabelConfiguration,
                            PageLinkConfiguration,
                            Container_12.ListConfiguration,
                            Container_12.TableContainerConfiguration,
                            ErrorConfiguration,
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_LAYOUT] = layouts;
                        configurations[Container.PARAMETER_CHILDREN] = children;
                        _super.call(this, configurations);
                    }
                    BoxConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Box.TYPE_BOX;
                    };
                    BoxConfiguration.prototype.getErrors = function (definition) {
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    BoxConfiguration.prototype.create = function (definition, children) {
                        if (children === void 0) { children = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        var layout = _super.prototype.createChild.call(this, definition, Container.PARAMETER_LAYOUT);
                        if (children === undefined) {
                            children = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance());
                        }
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new Box(name, layout, children, styles);
                    };
                    return BoxConfiguration;
                }(Container_12.ContainerConfiguration));
                Container_12.BoxConfiguration = BoxConfiguration;
            })(Container = Configuration_42.Container || (Configuration_42.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Container;
        (function (Container) {
            "use strict";
            var Button = Ompluscript.View.Field.Button;
            var FieldEvent = Ompluscript.View.Event.FieldEvent;
            var OnFieldClick = Ompluscript.View.Event.OnFieldClick;
            var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
            var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
            var OnFormSubmit = Ompluscript.View.Event.OnFormSubmit;
            var OnFormFail = Ompluscript.View.Event.OnFormFail;
            var FormEvent = Ompluscript.View.Event.FormEvent;
            var Label = Ompluscript.View.Field.Label;
            var OnFieldFocus = Ompluscript.View.Event.OnFieldFocus;
            var OnFieldBlur = Ompluscript.View.Event.OnFieldBlur;
            var Form = (function (_super) {
                __extends(Form, _super);
                function Form(name, layout, proxy, buttonAsset, model, inputs, styles) {
                    if (layout === void 0) { layout = undefined; }
                    if (inputs === void 0) { inputs = []; }
                    if (styles === void 0) { styles = undefined; }
                    var button = new Button(name + "Submit", buttonAsset);
                    var containers = [];
                    var label = new Label(name + "Status");
                    containers.push(label);
                    for (var i = 0; i < inputs.length; i++) {
                        containers.push(new Container.InputContainer(inputs[i]));
                    }
                    containers.push(button);
                    _super.call(this, name, layout, containers, styles);
                    for (var i = 0; i < inputs.length; i++) {
                        inputs[i].addObserverByType(this, FieldEvent.ON_FIELD_FOCUS);
                        inputs[i].addObserverByType(this, FieldEvent.ON_FIELD_BLUR);
                    }
                    this.addClass(Form.CLASS_FORM);
                    this.proxy = proxy;
                    this.model = model;
                    this.button = button;
                    this.label = label;
                    this.button.addObserverByType(this, FieldEvent.ON_FIELD_CLICK);
                    this.model.addObserverByType(this, OnDoneProxy.ON_DONE_PROXY);
                }
                Form.prototype.update = function (event) {
                    if (event instanceof OnFieldClick) {
                        this.submit();
                    }
                    else if (event instanceof OnDoneProxy) {
                        var onDoneProxy = event;
                        this.handleResponse(onDoneProxy);
                    }
                    else if (event instanceof OnFieldFocus) {
                        var onFieldFocus = event;
                        this.showLabel(onFieldFocus.getSender());
                    }
                    else if (event instanceof OnFieldBlur) {
                        var onFieldBlur = event;
                        this.hideLabel(onFieldBlur.getSender());
                    }
                };
                Form.prototype.setStatusAsset = function (asset) {
                    this.label.setTextAsset(asset);
                    this.label.addClass(Form.CLASS_STATUS);
                };
                Form.prototype.reset = function () {
                    this.model.resetValues();
                    this.label.removeClass(Form.CLASS_STATUS);
                    for (var i = 0; i < this.children.length; i++) {
                        if (this.children[i] instanceof Container.InputContainer) {
                            this.children[i].clearError();
                        }
                    }
                };
                Form.prototype.attachOnFormSubmitEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, FormEvent.ON_FORM_SUBMIT, callback);
                };
                Form.prototype.attachOnFormFailEvent = function (observer, callback) {
                    this.addGenericObserverByType(observer, FormEvent.ON_FORM_FAIL, callback);
                };
                Form.prototype.submit = function () {
                    if (this.model.validate() === true) {
                        switch (this.proxy) {
                            case OnDoneProxy.TYPE_SAVED:
                                this.model.getProxy(AjaxProxy.TYPE_AJAX_PROXY).save();
                                break;
                            case OnDoneProxy.TYPE_UPDATED:
                                this.model.getProxy(AjaxProxy.TYPE_AJAX_PROXY).update();
                                break;
                            case OnDoneProxy.TYPE_DELETED:
                                this.model.getProxy(AjaxProxy.TYPE_AJAX_PROXY).delete();
                                break;
                            default:
                                return;
                        }
                    }
                    else {
                        this.model.fireEventIfInvalid();
                    }
                };
                Form.prototype.handleResponse = function (onDoneProxy) {
                    if (onDoneProxy.getAction() === this.proxy) {
                        this.setStatusAsset(this.name + "." + this.proxy);
                        this.fireOnFormSubmitEvent(onDoneProxy.getResponse());
                    }
                    else if (onDoneProxy.getAction() === OnDoneProxy.TYPE_FAILED) {
                        this.setStatusAsset(this.name + "." + OnDoneProxy.TYPE_FAILED);
                        this.fireOnFormFailEvent(onDoneProxy.getResponse());
                    }
                };
                Form.prototype.fireOnFormSubmitEvent = function (response) {
                    var event = new OnFormSubmit(this, response);
                    this.notifyObservers(event);
                };
                Form.prototype.fireOnFormFailEvent = function (response) {
                    var event = new OnFormFail(this, response);
                    this.notifyObservers(event);
                };
                Form.prototype.showLabel = function (input) {
                    var inputContainer = input.getParent();
                    var label = inputContainer.findChildrenByType("Label")[0];
                    label.addClass(Form.CLASS_SHOW);
                };
                Form.prototype.hideLabel = function (input) {
                    var inputContainer = input.getParent();
                    var label = inputContainer.findChildrenByType("Label")[0];
                    label.removeClass(Form.CLASS_SHOW);
                };
                Form.TYPE_FORM = "Form";
                Form.PARAMETER_MODEL = "model";
                Form.PARAMETER_PROXY = "proxy";
                Form.PARAMETER_BUTTON_ASSET = "buttonAsset";
                Form.CLASS_FORM = "form";
                Form.CLASS_STATUS = "status";
                Form.CLASS_SHOW = "show";
                return Form;
            }(Container.Container));
            Container.Form = Form;
        })(Container = View.Container || (View.Container = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_43) {
            var Container;
            (function (Container_13) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Form = Ompluscript.View.Container.Form;
                var Component = Ompluscript.View.Component.Component;
                var Container = Ompluscript.View.Container.Container;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var NullLayoutConfiguration = Ompluscript.View.Configuration.Layout.NullLayoutConfiguration;
                var RelativeLayoutConfiguration = Ompluscript.View.Configuration.Layout.RelativeLayoutConfiguration;
                var LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
                var TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
                var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
                var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
                var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
                var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
                var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
                var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
                var ModelConfiguration = Ompluscript.Model.Configuration.Container.ModelConfiguration;
                var FormConfiguration = (function (_super) {
                    __extends(FormConfiguration, _super);
                    function FormConfiguration() {
                        var layouts = [
                            NullLayoutConfiguration,
                            RelativeLayoutConfiguration,
                            LinearLayoutConfiguration,
                            TableLayoutConfiguration,
                            ErrorConfiguration,
                        ];
                        var children = [
                            CheckBoxInputConfiguration,
                            EmailInputConfiguration,
                            NumberInputConfiguration,
                            PasswordInputConfiguration,
                            TextInputConfiguration,
                            DateInputConfiguration,
                            ErrorConfiguration,
                        ];
                        var model = [
                            ModelConfiguration,
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_LAYOUT] = layouts;
                        configurations[Container.PARAMETER_CHILDREN] = children;
                        configurations[Form.PARAMETER_MODEL] = model;
                        _super.call(this, configurations);
                    }
                    FormConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Form.TYPE_FORM;
                    };
                    FormConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeStringOrObject(definition, Form.PARAMETER_MODEL));
                        if (typeof definition[Form.PARAMETER_MODEL] === "object") {
                            errors.push.apply(errors, _super.prototype.getErrorsForChildren.call(this, definition, Form.PARAMETER_MODEL));
                        }
                        errors.push(this.mustBeString(definition, Form.PARAMETER_PROXY));
                        errors.push(this.mustBeString(definition, Form.PARAMETER_BUTTON_ASSET));
                        errors = this.filterErrors(errors);
                        return this.filterErrors(errors);
                    };
                    FormConfiguration.prototype.create = function (definition) {
                        var name = definition[Configuration.PARAMETER_NAME];
                        var layout = _super.prototype.createChild.call(this, definition, Container.PARAMETER_LAYOUT);
                        var model = _super.prototype.createChild.call(this, definition, Form.PARAMETER_MODEL, Ompluscript.Model.Creator.getInstance());
                        var styles = definition[Component.PARAMETER_STYLES];
                        var proxy = definition[Form.PARAMETER_PROXY];
                        var buttonAsset = definition[Form.PARAMETER_BUTTON_ASSET];
                        var inputs = [];
                        var children = definition[Form.PARAMETER_CHILDREN];
                        var configurations = this.configurations[Form.PARAMETER_CHILDREN];
                        for (var i = 0; i < children.length; i++) {
                            for (var j = 0; j < configurations.length; j++) {
                                var configuration = Configuration.getInstance(configurations[j]);
                                if (configuration.isRelatedTo(children[i])) {
                                    inputs.push(configuration.create(children[i], model.getAttribute(children[i][Configuration.PARAMETER_NAME])));
                                    break;
                                }
                            }
                        }
                        return new Form(name, layout, proxy, buttonAsset, model, inputs, styles);
                    };
                    return FormConfiguration;
                }(Container_13.ContainerConfiguration));
                Container_13.FormConfiguration = FormConfiguration;
            })(Container = Configuration_43.Container || (Configuration_43.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_44) {
            var Container;
            (function (Container_14) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Component = Ompluscript.View.Component.Component;
                var Container = Ompluscript.View.Container.Container;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var NullLayoutConfiguration = Ompluscript.View.Configuration.Layout.NullLayoutConfiguration;
                var RelativeLayoutConfiguration = Ompluscript.View.Configuration.Layout.RelativeLayoutConfiguration;
                var LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
                var TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
                var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
                var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
                var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
                var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
                var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
                var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
                var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
                var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
                var PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
                var ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
                var LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;
                var TableContainerConfiguration = Ompluscript.View.Configuration.Container.TableContainerConfiguration;
                var LabelInputConfiguration = Ompluscript.View.Configuration.Field.LabelInputConfiguration;
                var Page = Ompluscript.View.Container.Page;
                var ImageConfiguration = Ompluscript.View.Configuration.Field.ImageConfiguration;
                var PageConfiguration = (function (_super) {
                    __extends(PageConfiguration, _super);
                    function PageConfiguration() {
                        var layouts = [
                            NullLayoutConfiguration,
                            RelativeLayoutConfiguration,
                            LinearLayoutConfiguration,
                            TableLayoutConfiguration,
                            ErrorConfiguration,
                        ];
                        var children = [
                            CheckBoxInputConfiguration,
                            EmailInputConfiguration,
                            NumberInputConfiguration,
                            PasswordInputConfiguration,
                            TextInputConfiguration,
                            DateInputConfiguration,
                            LabelInputConfiguration,
                            ParagraphConfiguration,
                            ButtonConfiguration,
                            HeaderConfiguration,
                            LabelConfiguration,
                            PageLinkConfiguration,
                            Container_14.ListConfiguration,
                            Container_14.BoxConfiguration,
                            Container_14.FormConfiguration,
                            TableContainerConfiguration,
                            ImageConfiguration,
                            ErrorConfiguration,
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_LAYOUT] = layouts;
                        configurations[Container.PARAMETER_CHILDREN] = children;
                        _super.call(this, configurations);
                    }
                    PageConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE;
                    };
                    PageConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        errors.push(this.shouldBeBoolean(definition, Page.PARAMETER_DEFAULT_PAGE));
                        return this.filterErrors(errors);
                    };
                    PageConfiguration.prototype.create = function (definition, children) {
                        if (children === void 0) { children = undefined; }
                        var name = definition[Configuration.PARAMETER_NAME];
                        var layout = _super.prototype.createChild.call(this, definition, Container.PARAMETER_LAYOUT);
                        if (children === undefined) {
                            children = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance());
                        }
                        var defaultPage = definition[Page.PARAMETER_DEFAULT_PAGE];
                        var styles = definition[Component.PARAMETER_STYLES];
                        var page = new Page(name, defaultPage, layout, children, styles);
                        if (definition[Page.PARAMETER_EVENTS] !== undefined) {
                            var onPageLoad = definition[Page.PARAMETER_EVENTS][Page.PARAMETER_ON_PAGE_LOAD];
                            if (onPageLoad !== undefined) {
                                page.attachOnPageLoadEvent(page, onPageLoad);
                            }
                            var onPageClose = definition[Page.PARAMETER_EVENTS][Page.PARAMETER_ON_PAGE_CLOSE];
                            if (onPageClose !== undefined) {
                                page.attachOnPageCloseEvent(page, onPageClose);
                            }
                        }
                        return page;
                    };
                    return PageConfiguration;
                }(Container_14.ContainerConfiguration));
                Container_14.PageConfiguration = PageConfiguration;
            })(Container = Configuration_44.Container || (Configuration_44.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller_10) {
        var Configuration;
        (function (Configuration_45) {
            var Controller;
            (function (Controller) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var PageController = Ompluscript.Controller.Controller.PageController;
                var PageConfiguration = Ompluscript.View.Configuration.Container.PageConfiguration;
                var PageControllerConfiguration = (function (_super) {
                    __extends(PageControllerConfiguration, _super);
                    function PageControllerConfiguration() {
                        var pages = [
                            PageConfiguration,
                        ];
                        var configurations = {};
                        configurations[PageController.PARAMETER_PAGE] = pages;
                        _super.call(this, configurations);
                    }
                    PageControllerConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === PageController.TYPE_PAGE_CONTROLLER;
                    };
                    PageControllerConfiguration.prototype.getErrors = function (definition) {
                        var errors = _super.prototype.getErrors.call(this, definition);
                        if (definition[PageController.PARAMETER_PAGE] !== undefined) {
                            definition[Configuration.PARAMETER_NAME] = definition[PageController.PARAMETER_PAGE][Configuration.PARAMETER_NAME];
                        }
                        errors.push(this.shouldBeStringOrObject(definition, PageController.PARAMETER_PAGE));
                        errors.push(this.shouldBeObject(definition, PageController.PARAMETER_ACTIONS));
                        if (definition[PageController.PARAMETER_ACTIONS] !== undefined) {
                            for (var key in definition[PageController.PARAMETER_ACTIONS]) {
                                if (definition[PageController.PARAMETER_ACTIONS].hasOwnProperty(key)) {
                                    errors.push(this.shouldBeFunction(definition[PageController.PARAMETER_ACTIONS], key));
                                }
                            }
                        }
                        return this.filterErrors(errors);
                    };
                    PageControllerConfiguration.prototype.create = function (definition) {
                        var page = this.createChild(definition, PageController.PARAMETER_PAGE, Ompluscript.View.Creator.getInstance());
                        var pageController = new PageController(page);
                        if (definition[PageController.PARAMETER_ACTIONS] !== undefined) {
                            for (var key in definition[PageController.PARAMETER_ACTIONS]) {
                                if (definition[PageController.PARAMETER_ACTIONS].hasOwnProperty(key)) {
                                    pageController.addAction(key, definition[PageController.PARAMETER_ACTIONS][key]);
                                }
                            }
                        }
                        return pageController;
                    };
                    return PageControllerConfiguration;
                }(Controller.ControllerConfiguration));
                Controller.PageControllerConfiguration = PageControllerConfiguration;
            })(Controller = Configuration_45.Controller || (Configuration_45.Controller = {}));
        })(Configuration = Controller_10.Configuration || (Controller_10.Configuration = {}));
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Controller;
    (function (Controller) {
        "use strict";
        var CreatorParent = Ompluscript.Core.Configuration.Creator;
        var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
        var ApplicationControllerConfiguration = Ompluscript.Controller.Configuration.Controller.ApplicationControllerConfiguration;
        var Configuration = Ompluscript.Core.Configuration.Configuration;
        var PageController = Ompluscript.Controller.Controller.PageController;
        var PageControllerConfiguration = Ompluscript.Controller.Configuration.Controller.PageControllerConfiguration;
        var Creator = (function (_super) {
            __extends(Creator, _super);
            function Creator() {
                var configurations = [
                    ApplicationControllerConfiguration,
                    PageControllerConfiguration,
                    ErrorConfiguration,
                ];
                _super.call(this, configurations);
                this.pageControllers = [];
            }
            Creator.getInstance = function () {
                if (Creator.instance === undefined) {
                    Creator.instance = new Creator();
                }
                return Creator.instance;
            };
            Creator.prototype.define = function (definition) {
                _super.prototype.define.call(this, definition);
                if (definition[Configuration.PARAMETER_TYPE] === PageController.TYPE_PAGE_CONTROLLER) {
                    this.pageControllers.push(definition[Configuration.PARAMETER_NAME]);
                }
            };
            Creator.prototype.getPageControllers = function () {
                return this.pageControllers;
            };
            return Creator;
        }(CreatorParent));
        Controller.Creator = Creator;
        function define(definition) {
            if (definition === void 0) { definition = {}; }
            Creator.getInstance().define(definition);
        }
        Controller.define = define;
        function create(name) {
            return Creator.getInstance().create(name);
        }
        Controller.create = create;
    })(Controller = Ompluscript.Controller || (Ompluscript.Controller = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    "use strict";
    var ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
    var Configuration = Ompluscript.Core.Configuration.Configuration;
    var Creator = Ompluscript.Controller.Creator;
    function application(definition) {
        if (definition === void 0) { definition = {}; }
        definition[Configuration.PARAMETER_TYPE] = ApplicationController.TYPE_APPLICATION_CONTROLLER;
        Creator.getInstance().define(definition);
        Creator.getInstance().create(ApplicationController.TYPE_APPLICATION_CONTROLLER);
    }
    Ompluscript.application = application;
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Configuration;
        (function (Configuration_46) {
            var Container;
            (function (Container_15) {
                "use strict";
                var Configuration = Ompluscript.Core.Configuration.Configuration;
                var Navigation = Ompluscript.View.Container.Navigation;
                var Component = Ompluscript.View.Component.Component;
                var Container = Ompluscript.View.Container.Container;
                var ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
                var NavigationConfiguration = (function (_super) {
                    __extends(NavigationConfiguration, _super);
                    function NavigationConfiguration() {
                        var children = [
                            Container_15.ListConfiguration,
                            ErrorConfiguration,
                        ];
                        var configurations = {};
                        configurations[Container.PARAMETER_CHILDREN] = children;
                        _super.call(this, configurations);
                    }
                    NavigationConfiguration.prototype.isRelatedTo = function (definition) {
                        return definition[Configuration.PARAMETER_TYPE] === Navigation.TYPE_NAVIGATION;
                    };
                    NavigationConfiguration.prototype.getErrors = function (definition) {
                        definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
                        return this.filterErrors(_super.prototype.getErrors.call(this, definition));
                    };
                    NavigationConfiguration.prototype.create = function (definition, children) {
                        if (children === void 0) { children = undefined; }
                        if (children === undefined) {
                            children = _super.prototype.createChildren.call(this, definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance());
                        }
                        var styles = definition[Component.PARAMETER_STYLES];
                        return new Navigation(children, styles);
                    };
                    return NavigationConfiguration;
                }(Container_15.ContainerConfiguration));
                Container_15.NavigationConfiguration = NavigationConfiguration;
            })(Container = Configuration_46.Container || (Configuration_46.Container = {}));
        })(Configuration = View.Configuration || (View.Configuration = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        "use strict";
        var CreatorParent = Ompluscript.Core.Configuration.Creator;
        var Configuration = Ompluscript.Core.Configuration.Configuration;
        var PageConfiguration = Ompluscript.View.Configuration.Container.PageConfiguration;
        var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
        var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
        var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
        var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
        var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
        var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
        var Page = Ompluscript.View.Container.Page;
        var ParagraphConfiguration = Ompluscript.View.Configuration.Field.ParagraphConfiguration;
        var HeaderConfiguration = Ompluscript.View.Configuration.Field.HeaderConfiguration;
        var PageLinkConfiguration = Ompluscript.View.Configuration.Field.PageLinkConfiguration;
        var ListConfiguration = Ompluscript.View.Configuration.Container.ListConfiguration;
        var ButtonConfiguration = Ompluscript.View.Configuration.Field.ButtonConfiguration;
        var NavigationConfiguration = Ompluscript.View.Configuration.Container.NavigationConfiguration;
        var LabelConfiguration = Ompluscript.View.Configuration.Field.LabelConfiguration;
        var BoxConfiguration = Ompluscript.View.Configuration.Container.BoxConfiguration;
        var FormConfiguration = Ompluscript.View.Configuration.Container.FormConfiguration;
        var TableContainerConfiguration = Ompluscript.View.Configuration.Container.TableContainerConfiguration;
        var Creator = (function (_super) {
            __extends(Creator, _super);
            function Creator() {
                var configurations = [
                    CheckBoxInputConfiguration,
                    EmailInputConfiguration,
                    NumberInputConfiguration,
                    PasswordInputConfiguration,
                    TextInputConfiguration,
                    DateInputConfiguration,
                    ParagraphConfiguration,
                    ButtonConfiguration,
                    HeaderConfiguration,
                    LabelConfiguration,
                    ListConfiguration,
                    PageLinkConfiguration,
                    PageConfiguration,
                    NavigationConfiguration,
                    BoxConfiguration,
                    TableContainerConfiguration,
                    FormConfiguration,
                ];
                _super.call(this, configurations);
                this.pages = [];
            }
            Creator.getInstance = function () {
                if (Creator.instance === undefined) {
                    Creator.instance = new Creator();
                }
                return Creator.instance;
            };
            Creator.prototype.define = function (definition) {
                _super.prototype.define.call(this, definition);
                if (definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE) {
                    this.pages.push(definition[Configuration.PARAMETER_NAME]);
                }
            };
            Creator.prototype.getPages = function () {
                return this.pages;
            };
            return Creator;
        }(CreatorParent));
        View.Creator = Creator;
        function define(definition) {
            if (definition === void 0) { definition = {}; }
            Creator.getInstance().define(definition);
        }
        View.define = define;
        function create(name) {
            return Creator.getInstance().create(name);
        }
        View.create = create;
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
