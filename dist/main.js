(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("underscore"), require("react/addons"), require("react-bootstrap"), require("react-scroll-components"));
	else if(typeof define === 'function' && define.amd)
		define("OpenStaxConceptCoach", ["react", "underscore", "react/addons", "react-bootstrap", "react-scroll-components"], factory);
	else if(typeof exports === 'object')
		exports["OpenStaxConceptCoach"] = factory(require("react"), require("underscore"), require("react/addons"), require("react-bootstrap"), require("react-scroll-components"));
	else
		root["OpenStaxConceptCoach"] = factory(root["React"], root["_"], root["React.addons"], root["ReactBootstrap"], root["ReactScrollComponents"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_29__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ConceptCoach, ConceptCoachAPI;

	ConceptCoach = __webpack_require__(1).ConceptCoach;

	ConceptCoachAPI = __webpack_require__(115);

	module.exports = {
	  ConceptCoach: ConceptCoach,
	  ConceptCoachAPI: ConceptCoachAPI
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var AccountsIframe, ConceptCoach, CourseRegistration, Dashboard, ErrorNotification, EventEmitter2, ExerciseStep, LoginGateway, Navigation, Progress, React, SmartOverflow, SpyMode, Task, UpdateStudentIdentifier, User, VIEWS, _, channel, classnames, navigation, navigator, ref, ref1,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	EventEmitter2 = __webpack_require__(5);

	ref = __webpack_require__(6), SmartOverflow = ref.SmartOverflow, SpyMode = ref.SpyMode;

	Task = __webpack_require__(34).Task;

	navigation = (ref1 = __webpack_require__(84), Navigation = ref1.Navigation, ref1);

	CourseRegistration = __webpack_require__(91);

	ErrorNotification = __webpack_require__(102);

	AccountsIframe = __webpack_require__(103);

	UpdateStudentIdentifier = __webpack_require__(104);

	LoginGateway = __webpack_require__(101);

	User = __webpack_require__(75);

	ExerciseStep = __webpack_require__(78).ExerciseStep;

	Dashboard = __webpack_require__(105).Dashboard;

	Progress = __webpack_require__(106).Progress;

	channel = __webpack_require__(114).channel;

	navigator = navigation.channel;

	VIEWS = ['loading', 'login', 'registration', ['task', 'progress', 'profile', 'dashboard', 'registration', 'student_id'], 'logout'];

	ConceptCoach = React.createClass({
	  displayName: 'ConceptCoach',
	  propTypes: {
	    close: React.PropTypes.func,
	    moduleUUID: React.PropTypes.string.isRequired,
	    collectionUUID: React.PropTypes.string.isRequired,
	    triggeredFrom: React.PropTypes.shape({
	      moduleUUID: React.PropTypes.string,
	      collectionUUID: React.PropTypes.string
	    })
	  },
	  getDefaultProps: function() {
	    return {
	      defaultView: _.chain(VIEWS).last().first().value()
	    };
	  },
	  getInitialState: function() {
	    var userState, view;
	    userState = User.status(this.props.collectionUUID);
	    view = this.getAllowedView(userState);
	    userState.view = view;
	    return userState;
	  },
	  childContextTypes: {
	    moduleUUID: React.PropTypes.string,
	    collectionUUID: React.PropTypes.string,
	    triggeredFrom: React.PropTypes.shape({
	      moduleUUID: React.PropTypes.string,
	      collectionUUID: React.PropTypes.string
	    }),
	    getNextPage: React.PropTypes.func,
	    view: React.PropTypes.oneOf(_.flatten(VIEWS)),
	    cnxUrl: React.PropTypes.string,
	    bookUrlPattern: React.PropTypes.string,
	    close: React.PropTypes.func,
	    navigator: React.PropTypes.instanceOf(EventEmitter2),
	    processHtmlAndMath: React.PropTypes.func
	  },
	  getChildContext: function() {
	    var bookUrlPattern, close, cnxUrl, collectionUUID, getNextPage, moduleUUID, processHtmlAndMath, ref2, triggeredFrom, view;
	    view = this.state.view;
	    ref2 = this.props, cnxUrl = ref2.cnxUrl, close = ref2.close, moduleUUID = ref2.moduleUUID, collectionUUID = ref2.collectionUUID, getNextPage = ref2.getNextPage, triggeredFrom = ref2.triggeredFrom;
	    bookUrlPattern = '{cnxUrl}/contents/{ecosystem_book_uuid}';
	    processHtmlAndMath = this.props.processHtmlAndMath;
	    return {
	      view: view,
	      cnxUrl: cnxUrl,
	      close: close,
	      processHtmlAndMath: processHtmlAndMath,
	      bookUrlPattern: bookUrlPattern,
	      navigator: navigator,
	      moduleUUID: moduleUUID,
	      collectionUUID: collectionUUID,
	      triggeredFrom: triggeredFrom,
	      getNextPage: getNextPage
	    };
	  },
	  componentWillMount: function() {
	    return User.ensureStatusLoaded();
	  },
	  componentDidMount: function() {
	    var mountData;
	    mountData = this.getMountData('mount');
	    channel.emit('coach.mount.success', mountData);
	    User.channel.on('change', this.updateUser);
	    return navigator.on('show.*', this.updateView);
	  },
	  componentWillUnmount: function() {
	    var mountData;
	    mountData = this.getMountData('ummount');
	    channel.emit('coach.unmount.success', mountData);
	    User.channel.off('change', this.updateUser);
	    return navigator.off('show.*', this.updateView);
	  },
	  getAllowedView: function(userInfo) {
	    var authLevel, defaultView, view;
	    defaultView = this.props.defaultView;
	    if (!userInfo.isLoaded) {
	      authLevel = 0;
	    } else if (userInfo.preValidate) {
	      authLevel = 2;
	    } else if (!userInfo.isLoggedIn) {
	      authLevel = 1;
	    } else if (!userInfo.isRegistered) {
	      authLevel = 2;
	    } else {
	      authLevel = 3;
	    }
	    view = VIEWS[authLevel];
	    if (_.isArray(view)) {
	      if (indexOf.call(view, defaultView) >= 0) {
	        view = defaultView;
	      } else {
	        view = _.first(view);
	      }
	    }
	    return view;
	  },
	  getMountData: function(action) {
	    var collectionUUID, el, moduleUUID, ref2, view;
	    ref2 = this.props, moduleUUID = ref2.moduleUUID, collectionUUID = ref2.collectionUUID;
	    view = this.state.view;
	    el = this.getDOMNode();
	    return {
	      coach: {
	        el: el,
	        action: action,
	        view: view,
	        moduleUUID: moduleUUID,
	        collectionUUID: collectionUUID
	      }
	    };
	  },
	  updateView: function(eventData) {
	    var view;
	    view = eventData.view;
	    if ((view != null) && view !== this.state.view) {
	      return this.setState({
	        view: view
	      });
	    }
	  },
	  showTasks: function() {
	    return this.updateView({
	      view: 'task'
	    });
	  },
	  updateUser: function() {
	    var userState, view;
	    userState = User.status(this.props.collectionUUID);
	    view = this.getAllowedView(userState);
	    if (view !== this.state.view) {
	      navigator.emit("show." + view, {
	        view: view
	      });
	    }
	    return this.setState(userState);
	  },
	  childComponent: function(course) {
	    var view;
	    view = this.state.view;
	    switch (view) {
	      case 'loading':
	        return React.createElement("span", null, React.createElement("i", {
	          "className": 'fa fa-spinner fa-spin'
	        }), " Loading ...");
	      case 'logout':
	        return React.createElement(AccountsIframe, {
	          "type": 'logout'
	        });
	      case 'login':
	        return React.createElement(LoginGateway, null);
	      case 'registration':
	        return React.createElement(CourseRegistration, React.__spread({}, this.props));
	      case 'task':
	        return React.createElement(Task, React.__spread({}, this.props, {
	          "key": 'task'
	        }));
	      case 'progress':
	        return React.createElement(Progress, {
	          "id": course.id
	        });
	      case 'dashboard':
	        return React.createElement(Dashboard, {
	          "cnxUrl": this.props.cnxUrl
	        });
	      case 'profile':
	        return React.createElement(AccountsIframe, {
	          "type": 'profile',
	          "onComplete": this.updateUser
	        });
	      case 'registration':
	        return React.createElement(CourseRegistration, React.__spread({}, this.props));
	      case 'student_id':
	        return React.createElement(UpdateStudentIdentifier, React.__spread({}, this.props, {
	          "course": course
	        }));
	      default:
	        return React.createElement("h3", {
	          "className": "error"
	        }, "bad internal state, no view is set");
	    }
	  },
	  render: function() {
	    var className, course, isLoaded, isLoggedIn, ref2, view;
	    ref2 = this.state, isLoaded = ref2.isLoaded, isLoggedIn = ref2.isLoggedIn, view = ref2.view;
	    course = User.getCourse(this.props.collectionUUID);
	    className = classnames('concept-coach-view', "concept-coach-view-" + view, {
	      loading: !(isLoggedIn || isLoaded)
	    });
	    return React.createElement("div", {
	      "className": 'concept-coach openstax-wrapper'
	    }, React.createElement(ErrorNotification, null), React.createElement(SpyMode.Wrapper, null, React.createElement(Navigation, {
	      "key": 'user-status',
	      "close": this.props.close,
	      "course": course
	    }), React.createElement("div", {
	      "className": className
	    }, this.childComponent(course))));
	  }
	});

	module.exports = {
	  ConceptCoach: ConceptCoach,
	  channel: channel
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter2
	 * https://github.com/hij1nx/EventEmitter2
	 *
	 * Copyright (c) 2013 hij1nx
	 * Licensed under the MIT license.
	 */
	;!function(undefined) {

	  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
	    return Object.prototype.toString.call(obj) === "[object Array]";
	  };
	  var defaultMaxListeners = 10;

	  function init() {
	    this._events = {};
	    if (this._conf) {
	      configure.call(this, this._conf);
	    }
	  }

	  function configure(conf) {
	    if (conf) {

	      this._conf = conf;

	      conf.delimiter && (this.delimiter = conf.delimiter);
	      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
	      conf.wildcard && (this.wildcard = conf.wildcard);
	      conf.newListener && (this.newListener = conf.newListener);

	      if (this.wildcard) {
	        this.listenerTree = {};
	      }
	    }
	  }

	  function EventEmitter(conf) {
	    this._events = {};
	    this.newListener = false;
	    configure.call(this, conf);
	  }

	  //
	  // Attention, function return type now is array, always !
	  // It has zero elements if no any matches found and one or more
	  // elements (leafs) if there are matches
	  //
	  function searchListenerTree(handlers, type, tree, i) {
	    if (!tree) {
	      return [];
	    }
	    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
	        typeLength = type.length, currentType = type[i], nextType = type[i+1];
	    if (i === typeLength && tree._listeners) {
	      //
	      // If at the end of the event(s) list and the tree has listeners
	      // invoke those listeners.
	      //
	      if (typeof tree._listeners === 'function') {
	        handlers && handlers.push(tree._listeners);
	        return [tree];
	      } else {
	        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
	          handlers && handlers.push(tree._listeners[leaf]);
	        }
	        return [tree];
	      }
	    }

	    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
	      //
	      // If the event emitted is '*' at this part
	      // or there is a concrete match at this patch
	      //
	      if (currentType === '*') {
	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
	          }
	        }
	        return listeners;
	      } else if(currentType === '**') {
	        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
	        if(endReached && tree._listeners) {
	          // The next element has a _listeners, add it to the handlers.
	          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
	        }

	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            if(branch === '*' || branch === '**') {
	              if(tree[branch]._listeners && !endReached) {
	                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
	              }
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            } else if(branch === nextType) {
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
	            } else {
	              // No match on this one, shift into the tree but not in the type array.
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            }
	          }
	        }
	        return listeners;
	      }

	      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
	    }

	    xTree = tree['*'];
	    if (xTree) {
	      //
	      // If the listener tree will allow any match for this part,
	      // then recursively explore all branches of the tree
	      //
	      searchListenerTree(handlers, type, xTree, i+1);
	    }

	    xxTree = tree['**'];
	    if(xxTree) {
	      if(i < typeLength) {
	        if(xxTree._listeners) {
	          // If we have a listener on a '**', it will catch all, so add its handler.
	          searchListenerTree(handlers, type, xxTree, typeLength);
	        }

	        // Build arrays of matching next branches and others.
	        for(branch in xxTree) {
	          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
	            if(branch === nextType) {
	              // We know the next element will match, so jump twice.
	              searchListenerTree(handlers, type, xxTree[branch], i+2);
	            } else if(branch === currentType) {
	              // Current node matches, move into the tree.
	              searchListenerTree(handlers, type, xxTree[branch], i+1);
	            } else {
	              isolatedBranch = {};
	              isolatedBranch[branch] = xxTree[branch];
	              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
	            }
	          }
	        }
	      } else if(xxTree._listeners) {
	        // We have reached the end and still on a '**'
	        searchListenerTree(handlers, type, xxTree, typeLength);
	      } else if(xxTree['*'] && xxTree['*']._listeners) {
	        searchListenerTree(handlers, type, xxTree['*'], typeLength);
	      }
	    }

	    return listeners;
	  }

	  function growListenerTree(type, listener) {

	    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

	    //
	    // Looks for two consecutive '**', if so, don't add the event at all.
	    //
	    for(var i = 0, len = type.length; i+1 < len; i++) {
	      if(type[i] === '**' && type[i+1] === '**') {
	        return;
	      }
	    }

	    var tree = this.listenerTree;
	    var name = type.shift();

	    while (name) {

	      if (!tree[name]) {
	        tree[name] = {};
	      }

	      tree = tree[name];

	      if (type.length === 0) {

	        if (!tree._listeners) {
	          tree._listeners = listener;
	        }
	        else if(typeof tree._listeners === 'function') {
	          tree._listeners = [tree._listeners, listener];
	        }
	        else if (isArray(tree._listeners)) {

	          tree._listeners.push(listener);

	          if (!tree._listeners.warned) {

	            var m = defaultMaxListeners;

	            if (typeof this._events.maxListeners !== 'undefined') {
	              m = this._events.maxListeners;
	            }

	            if (m > 0 && tree._listeners.length > m) {

	              tree._listeners.warned = true;
	              console.error('(node) warning: possible EventEmitter memory ' +
	                            'leak detected. %d listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit.',
	                            tree._listeners.length);
	              console.trace();
	            }
	          }
	        }
	        return true;
	      }
	      name = type.shift();
	    }
	    return true;
	  }

	  // By default EventEmitters will print a warning if more than
	  // 10 listeners are added to it. This is a useful default which
	  // helps finding memory leaks.
	  //
	  // Obviously not all Emitters should be limited to 10. This function allows
	  // that to be increased. Set to zero for unlimited.

	  EventEmitter.prototype.delimiter = '.';

	  EventEmitter.prototype.setMaxListeners = function(n) {
	    this._events || init.call(this);
	    this._events.maxListeners = n;
	    if (!this._conf) this._conf = {};
	    this._conf.maxListeners = n;
	  };

	  EventEmitter.prototype.event = '';

	  EventEmitter.prototype.once = function(event, fn) {
	    this.many(event, 1, fn);
	    return this;
	  };

	  EventEmitter.prototype.many = function(event, ttl, fn) {
	    var self = this;

	    if (typeof fn !== 'function') {
	      throw new Error('many only accepts instances of Function');
	    }

	    function listener() {
	      if (--ttl === 0) {
	        self.off(event, listener);
	      }
	      fn.apply(this, arguments);
	    }

	    listener._origin = fn;

	    this.on(event, listener);

	    return self;
	  };

	  EventEmitter.prototype.emit = function() {

	    this._events || init.call(this);

	    var type = arguments[0];

	    if (type === 'newListener' && !this.newListener) {
	      if (!this._events.newListener) { return false; }
	    }

	    // Loop through the *_all* functions and invoke them.
	    if (this._all) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	      for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        this._all[i].apply(this, args);
	      }
	    }

	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {

	      if (!this._all &&
	        !this._events.error &&
	        !(this.wildcard && this.listenerTree.error)) {

	        if (arguments[1] instanceof Error) {
	          throw arguments[1]; // Unhandled 'error' event
	        } else {
	          throw new Error("Uncaught, unspecified 'error' event.");
	        }
	        return false;
	      }
	    }

	    var handler;

	    if(this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    }
	    else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      if (arguments.length === 1) {
	        handler.call(this);
	      }
	      else if (arguments.length > 1)
	        switch (arguments.length) {
	          case 2:
	            handler.call(this, arguments[1]);
	            break;
	          case 3:
	            handler.call(this, arguments[1], arguments[2]);
	            break;
	          // slower
	          default:
	            var l = arguments.length;
	            var args = new Array(l - 1);
	            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	            handler.apply(this, args);
	        }
	      return true;
	    }
	    else if (handler) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

	      var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        this.event = type;
	        listeners[i].apply(this, args);
	      }
	      return (listeners.length > 0) || !!this._all;
	    }
	    else {
	      return !!this._all;
	    }

	  };

	  EventEmitter.prototype.on = function(type, listener) {

	    if (typeof type === 'function') {
	      this.onAny(type);
	      return this;
	    }

	    if (typeof listener !== 'function') {
	      throw new Error('on only accepts instances of Function');
	    }
	    this._events || init.call(this);

	    // To avoid recursion in the case that type == "newListeners"! Before
	    // adding it to the listeners, first emit "newListeners".
	    this.emit('newListener', type, listener);

	    if(this.wildcard) {
	      growListenerTree.call(this, type, listener);
	      return this;
	    }

	    if (!this._events[type]) {
	      // Optimize the case of one listener. Don't need the extra array object.
	      this._events[type] = listener;
	    }
	    else if(typeof this._events[type] === 'function') {
	      // Adding the second element, need to change to array.
	      this._events[type] = [this._events[type], listener];
	    }
	    else if (isArray(this._events[type])) {
	      // If we've already got an array, just append.
	      this._events[type].push(listener);

	      // Check for listener leak
	      if (!this._events[type].warned) {

	        var m = defaultMaxListeners;

	        if (typeof this._events.maxListeners !== 'undefined') {
	          m = this._events.maxListeners;
	        }

	        if (m > 0 && this._events[type].length > m) {

	          this._events[type].warned = true;
	          console.error('(node) warning: possible EventEmitter memory ' +
	                        'leak detected. %d listeners added. ' +
	                        'Use emitter.setMaxListeners() to increase limit.',
	                        this._events[type].length);
	          console.trace();
	        }
	      }
	    }
	    return this;
	  };

	  EventEmitter.prototype.onAny = function(fn) {

	    if (typeof fn !== 'function') {
	      throw new Error('onAny only accepts instances of Function');
	    }

	    if(!this._all) {
	      this._all = [];
	    }

	    // Add the function to the event listener collection.
	    this._all.push(fn);
	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  EventEmitter.prototype.off = function(type, listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('removeListener only takes instances of Function');
	    }

	    var handlers,leafs=[];

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
	    }
	    else {
	      // does not use listeners(), so no side effect of creating _events[type]
	      if (!this._events[type]) return this;
	      handlers = this._events[type];
	      leafs.push({_listeners:handlers});
	    }

	    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
	      var leaf = leafs[iLeaf];
	      handlers = leaf._listeners;
	      if (isArray(handlers)) {

	        var position = -1;

	        for (var i = 0, length = handlers.length; i < length; i++) {
	          if (handlers[i] === listener ||
	            (handlers[i].listener && handlers[i].listener === listener) ||
	            (handlers[i]._origin && handlers[i]._origin === listener)) {
	            position = i;
	            break;
	          }
	        }

	        if (position < 0) {
	          continue;
	        }

	        if(this.wildcard) {
	          leaf._listeners.splice(position, 1);
	        }
	        else {
	          this._events[type].splice(position, 1);
	        }

	        if (handlers.length === 0) {
	          if(this.wildcard) {
	            delete leaf._listeners;
	          }
	          else {
	            delete this._events[type];
	          }
	        }
	        return this;
	      }
	      else if (handlers === listener ||
	        (handlers.listener && handlers.listener === listener) ||
	        (handlers._origin && handlers._origin === listener)) {
	        if(this.wildcard) {
	          delete leaf._listeners;
	        }
	        else {
	          delete this._events[type];
	        }
	      }
	    }

	    return this;
	  };

	  EventEmitter.prototype.offAny = function(fn) {
	    var i = 0, l = 0, fns;
	    if (fn && this._all && this._all.length > 0) {
	      fns = this._all;
	      for(i = 0, l = fns.length; i < l; i++) {
	        if(fn === fns[i]) {
	          fns.splice(i, 1);
	          return this;
	        }
	      }
	    } else {
	      this._all = [];
	    }
	    return this;
	  };

	  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

	  EventEmitter.prototype.removeAllListeners = function(type) {
	    if (arguments.length === 0) {
	      !this._events || init.call(this);
	      return this;
	    }

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

	      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
	        var leaf = leafs[iLeaf];
	        leaf._listeners = null;
	      }
	    }
	    else {
	      if (!this._events[type]) return this;
	      this._events[type] = null;
	    }
	    return this;
	  };

	  EventEmitter.prototype.listeners = function(type) {
	    if(this.wildcard) {
	      var handlers = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
	      return handlers;
	    }

	    this._events || init.call(this);

	    if (!this._events[type]) this._events[type] = [];
	    if (!isArray(this._events[type])) {
	      this._events[type] = [this._events[type]];
	    }
	    return this._events[type];
	  };

	  EventEmitter.prototype.listenersAny = function() {

	    if(this._all) {
	      return this._all;
	    }
	    else {
	      return [];
	    }

	  };

	  if (true) {
	     // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return EventEmitter;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // CommonJS
	    exports.EventEmitter2 = EventEmitter;
	  }
	  else {
	    // Browser global.
	    window.EventEmitter2 = EventEmitter;
	  }
	}();


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var ArbitraryHtmlAndMath, AsyncButton, Breadcrumb, CardBody, ChapterSectionMixin, CloseButton, Exercise, ExerciseGroup, FreeResponse, GetPositionMixin, KeysHelper, PinnableFooter, PinnedHeader, PinnedHeaderFooterCard, Question, RefreshButton, ResizeListenerMixin, SmartOverflow, SpyMode, ref;

	Exercise = __webpack_require__(7);

	FreeResponse = __webpack_require__(25);

	ExerciseGroup = __webpack_require__(12);

	Breadcrumb = __webpack_require__(26);

	SpyMode = __webpack_require__(27);

	PinnedHeaderFooterCard = __webpack_require__(28);

	ref = __webpack_require__(14), PinnedHeader = ref.PinnedHeader, CardBody = ref.CardBody, PinnableFooter = ref.PinnableFooter;

	Question = __webpack_require__(23);

	ArbitraryHtmlAndMath = __webpack_require__(21);

	SmartOverflow = __webpack_require__(32);

	RefreshButton = __webpack_require__(18);

	AsyncButton = __webpack_require__(17);

	CloseButton = __webpack_require__(33);

	ChapterSectionMixin = __webpack_require__(13);

	GetPositionMixin = __webpack_require__(31);

	ResizeListenerMixin = __webpack_require__(30);

	KeysHelper = __webpack_require__(24);

	module.exports = {
	  Exercise: Exercise,
	  ExerciseGroup: ExerciseGroup,
	  FreeResponse: FreeResponse,
	  Breadcrumb: Breadcrumb,
	  PinnedHeaderFooterCard: PinnedHeaderFooterCard,
	  PinnedHeader: PinnedHeader,
	  CardBody: CardBody,
	  PinnableFooter: PinnableFooter,
	  Question: Question,
	  ArbitraryHtmlAndMath: ArbitraryHtmlAndMath,
	  SmartOverflow: SmartOverflow,
	  RefreshButton: RefreshButton,
	  AsyncButton: AsyncButton,
	  CloseButton: CloseButton,
	  ChapterSectionMixin: ChapterSectionMixin,
	  GetPositionMixin: GetPositionMixin,
	  ResizeListenerMixin: ResizeListenerMixin,
	  SpyMode: SpyMode,
	  KeysHelper: KeysHelper
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Exercise, ExerciseStepCard, NOT_FREE_RESPONSE_PROPS, NOT_MULTIPLE_CHOICE_PROPS, NOT_REVIEW_PROPS, NOT_TEACHER_READ_ONLY_PROPS, REVIEW_CONTROL_PROPS, React, _, camelCase, propTypes, step;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	camelCase = __webpack_require__(8);

	ExerciseStepCard = __webpack_require__(9);

	propTypes = __webpack_require__(19).propTypes;

	step = propTypes.ExerciseStepCard.step;

	REVIEW_CONTROL_PROPS = ['refreshStep', 'recoverFor', 'canTryAnother'];

	NOT_REVIEW_PROPS = ['onNextStep', 'canReview', 'disabled'];

	NOT_TEACHER_READ_ONLY_PROPS = _.union(NOT_REVIEW_PROPS, ['onStepCompleted', 'canTryAnother']);

	NOT_MULTIPLE_CHOICE_PROPS = _.union(REVIEW_CONTROL_PROPS, ['disabled']);

	NOT_FREE_RESPONSE_PROPS = _.union(REVIEW_CONTROL_PROPS, ['onStepCompleted', 'onNextStep', 'canReview']);

	Exercise = React.createClass({
	  displayName: 'Exercise',
	  propTypes: {
	    id: React.PropTypes.string.isRequired,
	    taskId: React.PropTypes.string.isRequired,
	    onStepCompleted: React.PropTypes.func.isRequired,
	    onNextStep: React.PropTypes.func.isRequired,
	    getCurrentPanel: React.PropTypes.func.isRequired,
	    step: step,
	    setFreeResponseAnswer: React.PropTypes.func.isRequired,
	    setAnswerId: React.PropTypes.func.isRequired,
	    getReadingForStep: React.PropTypes.func,
	    refreshStep: React.PropTypes.func,
	    recoverFor: React.PropTypes.func,
	    review: React.PropTypes.string,
	    focus: React.PropTypes.bool,
	    courseId: React.PropTypes.string,
	    canTryAnother: React.PropTypes.bool,
	    canReview: React.PropTypes.bool,
	    disabled: React.PropTypes.bool
	  },
	  getInitialState: function() {
	    var id;
	    id = this.props.id;
	    return {
	      currentPanel: this.props.getCurrentPanel(id)
	    };
	  },
	  componentWillMount: function() {
	    var id;
	    id = this.props.id;
	    if (!this.state.currentPanel) {
	      return this.updateCurrentPanel(this.props);
	    }
	  },
	  componentWillReceiveProps: function(nextProps) {
	    return this.updateCurrentPanel(nextProps);
	  },
	  updateCurrentPanel: function(props) {
	    var currentPanel, id;
	    id = (props || this.props).id;
	    currentPanel = this.props.getCurrentPanel(id);
	    if ((currentPanel != null) && this.state.currentPanel !== currentPanel) {
	      return this.setState({
	        currentPanel: currentPanel
	      });
	    }
	  },
	  getDefaultProps: function() {
	    return {
	      focus: true,
	      review: '',
	      pinned: true,
	      canTryAnother: false,
	      canReview: false
	    };
	  },
	  refreshMemory: function() {
	    var id, index, ref, taskId;
	    ref = this.props, id = ref.id, taskId = ref.taskId;
	    index = this.props.getReadingForStep(id, taskId).index;
	    return this.props.refreshStep(index, id);
	  },
	  tryAnother: function() {
	    var id;
	    id = this.props.id;
	    return this.props.recoverFor(id);
	  },
	  onFreeResponseContinue: function(state) {
	    var freeResponse, id;
	    id = this.props.id;
	    freeResponse = state.freeResponse;
	    return this.props.setFreeResponseAnswer(id, freeResponse);
	  },
	  onMultipleChoiceAnswerChanged: function(answer) {
	    var id;
	    id = this.props.id;
	    return this.props.setAnswerId(id, answer.id);
	  },
	  getReviewProps: function() {
	    var reviewProps;
	    reviewProps = _.omit(this.props, NOT_REVIEW_PROPS);
	    reviewProps.onContinue = this.props.onNextStep;
	    reviewProps.refreshMemory = this.refreshMemory;
	    reviewProps.tryAnother = this.tryAnother;
	    return reviewProps;
	  },
	  getMultipleChoiceProps: function() {
	    var multipleChoiceProps;
	    multipleChoiceProps = _.omit(this.props, NOT_MULTIPLE_CHOICE_PROPS);
	    multipleChoiceProps.onAnswerChanged = this.onMultipleChoiceAnswerChanged;
	    return multipleChoiceProps;
	  },
	  getFreeResponseProps: function() {
	    var freeResponseProps;
	    freeResponseProps = _.omit(this.props, NOT_FREE_RESPONSE_PROPS);
	    freeResponseProps.onContinue = this.onFreeResponseContinue;
	    return freeResponseProps;
	  },
	  getTeacherReadOnlyProps: function() {
	    var teacherReadOnlyProps;
	    teacherReadOnlyProps = _.omit(this.props, NOT_TEACHER_READ_ONLY_PROPS);
	    teacherReadOnlyProps.onContinue = this.props.onNextStep;
	    teacherReadOnlyProps.controlButtons = false;
	    teacherReadOnlyProps.type = 'teacher-review';
	    return teacherReadOnlyProps;
	  },
	  render: function() {
	    var cardProps, currentPanel, getPropsForPanel, id, ref, waitingText;
	    ref = this.props, id = ref.id, step = ref.step, waitingText = ref.waitingText;
	    currentPanel = this.state.currentPanel;
	    getPropsForPanel = camelCase("get-" + currentPanel + "-props");
	    cardProps = typeof this[getPropsForPanel] === "function" ? this[getPropsForPanel]() : void 0;
	    return React.createElement(ExerciseStepCard, React.__spread({}, cardProps, {
	      "step": step,
	      "panel": currentPanel,
	      "waitingText": waitingText
	    }));
	  }
	});

	module.exports = Exercise;


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		var str = [].map.call(arguments, function (str) {
			return str.trim();
		}).filter(function (str) {
			return str.length;
		}).join('-');

		if (!str.length) {
			return '';
		}

		if (str.length === 1 || !(/[_.\- ]+/).test(str) ) {
			if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
				return str;
			}

			return str.toLowerCase();
		}

		return str
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
			return p1.toUpperCase();
		});
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var CONTINUE_CHECKS, CONTROLS, CONTROLS_TEXT, CardBody, ExContinueButton, ExMode, ExReviewControls, ExerciseDefaultFooter, ExerciseGroup, ExerciseStepCard, ON_CHANGE, React, _, classnames, keymaster, propTypes, props, ref, ref1;

	React = __webpack_require__(10);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	keymaster = __webpack_require__(11);

	ExerciseGroup = __webpack_require__(12);

	CardBody = __webpack_require__(14).CardBody;

	ref = __webpack_require__(15), ExContinueButton = ref.ExContinueButton, ExReviewControls = ref.ExReviewControls;

	ExMode = __webpack_require__(20).ExMode;

	ref1 = __webpack_require__(19), propTypes = ref1.propTypes, props = ref1.props;

	CONTROLS = {
	  'free-response': ExContinueButton,
	  'multiple-choice': ExContinueButton,
	  'review': ExReviewControls,
	  'teacher-read-only': ExContinueButton
	};

	CONTROLS_TEXT = {
	  'free-response': 'Answer',
	  'multiple-choice': 'Submit',
	  'review': 'Next Question',
	  'teacher-read-only': 'Next Question'
	};

	CONTINUE_CHECKS = {
	  'free-response': 'freeResponse',
	  'multiple-choice': 'answerId',
	  'review': null,
	  'teacher-read-only': null
	};

	ON_CHANGE = {
	  'free-response': 'onFreeResponseChange',
	  'multiple-choice': 'onAnswerChanged',
	  'review': 'onChangeAnswerAttempt',
	  'teacher-read-only': 'onChangeAnswerAttempt'
	};

	ExerciseDefaultFooter = React.createClass({
	  displayName: 'ExerciseDefaultFooter',
	  render: function() {
	    return React.createElement("div", null, this.props.controlButtons);
	  }
	});

	ExerciseStepCard = React.createClass({
	  displayName: 'ExerciseStepCard',
	  propTypes: propTypes.ExerciseStepCard,
	  getDefaultProps: function() {
	    return {
	      disabled: false,
	      isContinueEnabled: true,
	      footer: React.createElement(ExerciseDefaultFooter, null),
	      allowKeyNext: false
	    };
	  },
	  getInitialState: function() {
	    var stepState;
	    return stepState = this.getStepState(this.props);
	  },
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !(_.isEqual(this.props, nextProps) && this.props.isContinueEnabled === this.isContinueEnabled(this.props, this.state) && this.isContinueEnabled(this.props, this.state) === this.isContinueEnabled(nextProps, nextState));
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var nextStepState;
	    if (!_.isEqual(this.getStepState(this.props), this.getStepState(nextProps))) {
	      nextStepState = this.getStepState(nextProps);
	      this.setState(nextStepState);
	    }
	    if (this.props.allowKeyNext !== nextProps.allowKeyNext) {
	      return this.updateKeyBind(nextProps.allowKeyNext);
	    }
	  },
	  updateKeyBind: function(allowKeyNext) {
	    if (allowKeyNext) {
	      return this.startKeys();
	    } else {
	      return this.clearKeys();
	    }
	  },
	  startKeys: function() {
	    keymaster('enter', 'multiple-choice', this.onContinue);
	    return keymaster.setScope('multiple-choice');
	  },
	  clearKeys: function() {
	    keymaster.unbind('enter', 'multiple-choice');
	    return keymaster.deleteScope('multiple-choice');
	  },
	  getStepState: function(props) {
	    var step;
	    step = props.step;
	    return {
	      freeResponse: step.free_response || '',
	      answerId: step.answer_id || ''
	    };
	  },
	  isContinueEnabled: function(props, state) {
	    var panel, ref2, toCheck;
	    panel = props.panel;
	    toCheck = CONTINUE_CHECKS[panel];
	    if (toCheck == null) {
	      return true;
	    }
	    return ((ref2 = state[toCheck]) != null ? ref2.trim().length : void 0) > 0;
	  },
	  onAnswerChanged: function(answer) {
	    var base;
	    this.setState({
	      answerId: answer.id
	    });
	    return typeof (base = this.props).onAnswerChanged === "function" ? base.onAnswerChanged(answer) : void 0;
	  },
	  onFreeResponseChange: function(freeResponse) {
	    var base;
	    this.setState({
	      freeResponse: freeResponse
	    });
	    return typeof (base = this.props).onFreeResponseChange === "function" ? base.onFreeResponseChange(freeResponse) : void 0;
	  },
	  onChangeAnswerAttempt: function(answer) {
	    var base;
	    console.log('You cannot change an answer on a problem you\'ve reviewed.', 'TODO: show warning in ui.');
	    return typeof (base = this.props).onChangeAnswerAttempt === "function" ? base.onChangeAnswerAttempt(answer) : void 0;
	  },
	  onContinue: function() {
	    var canReview, isContinueEnabled, onContinue, onNextStep, onStepCompleted, panel, ref2;
	    ref2 = this.props, panel = ref2.panel, canReview = ref2.canReview, onNextStep = ref2.onNextStep, onStepCompleted = ref2.onStepCompleted, onContinue = ref2.onContinue, isContinueEnabled = ref2.isContinueEnabled;
	    if (!(isContinueEnabled && this.isContinueEnabled(this.props, this.state))) {
	      return;
	    }
	    if (onContinue != null) {
	      onContinue(this.state);
	      return;
	    }
	    if (panel === 'multiple-choice') {
	      onStepCompleted();
	      if (!canReview) {
	        return onNextStep();
	      }
	    }
	  },
	  render: function() {
	    var ControlButtons, cardClasses, className, controlButtons, controlProps, controlText, footer, footerProps, group, isContinueEnabled, onInputChange, panel, panelProps, pinned, ref2, related_content, step, waitingText;
	    ref2 = this.props, step = ref2.step, panel = ref2.panel, pinned = ref2.pinned, isContinueEnabled = ref2.isContinueEnabled, waitingText = ref2.waitingText, controlButtons = ref2.controlButtons, className = ref2.className, footer = ref2.footer;
	    group = step.group, related_content = step.related_content;
	    ControlButtons = CONTROLS[panel];
	    onInputChange = ON_CHANGE[panel];
	    controlText = CONTROLS_TEXT[panel];
	    controlProps = _.pick(this.props, props.ExReviewControls);
	    controlProps.isContinueEnabled = isContinueEnabled && this.isContinueEnabled(this.props, this.state);
	    controlProps.onContinue = this.onContinue;
	    controlProps.children = controlText;
	    panelProps = _.omit(this.props, props.notPanel);
	    panelProps.choicesEnabled = !waitingText && panel === 'multiple-choice';
	    panelProps[onInputChange] = this[onInputChange];
	    footerProps = _.pick(this.props, props.StepFooter);
	    footerProps.controlButtons = controlButtons || React.createElement(ControlButtons, React.__spread({}, controlProps));
	    footer = React.addons.cloneWithProps(footer, footerProps);
	    cardClasses = classnames('task-step', 'openstax-exercise-card', className);
	    return React.createElement(CardBody, {
	      "className": cardClasses,
	      "footer": footer,
	      "pinned": pinned
	    }, React.createElement("div", {
	      "className": "exercise-" + panel
	    }, React.createElement(ExMode, React.__spread({}, step, panelProps, {
	      "mode": panel
	    })), React.createElement(ExerciseGroup, {
	      "key": 'step-exercise-group',
	      "group": group,
	      "related_content": related_content
	    })));
	  }
	});

	module.exports = ExerciseStepCard;


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	//     keymaster.js
	//     (c) 2011-2013 Thomas Fuchs
	//     keymaster.js may be freely distributed under the MIT license.

	;(function(global){
	  var k,
	    _handlers = {},
	    _mods = { 16: false, 18: false, 17: false, 91: false },
	    _scope = 'all',
	    // modifier keys
	    _MODIFIERS = {
	      '⇧': 16, shift: 16,
	      '⌥': 18, alt: 18, option: 18,
	      '⌃': 17, ctrl: 17, control: 17,
	      '⌘': 91, command: 91
	    },
	    // special keys
	    _MAP = {
	      backspace: 8, tab: 9, clear: 12,
	      enter: 13, 'return': 13,
	      esc: 27, escape: 27, space: 32,
	      left: 37, up: 38,
	      right: 39, down: 40,
	      del: 46, 'delete': 46,
	      home: 36, end: 35,
	      pageup: 33, pagedown: 34,
	      ',': 188, '.': 190, '/': 191,
	      '`': 192, '-': 189, '=': 187,
	      ';': 186, '\'': 222,
	      '[': 219, ']': 221, '\\': 220
	    },
	    code = function(x){
	      return _MAP[x] || x.toUpperCase().charCodeAt(0);
	    },
	    _downKeys = [];

	  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

	  // IE doesn't support Array#indexOf, so have a simple replacement
	  function index(array, item){
	    var i = array.length;
	    while(i--) if(array[i]===item) return i;
	    return -1;
	  }

	  // for comparing mods before unassignment
	  function compareArray(a1, a2) {
	    if (a1.length != a2.length) return false;
	    for (var i = 0; i < a1.length; i++) {
	        if (a1[i] !== a2[i]) return false;
	    }
	    return true;
	  }

	  var modifierMap = {
	      16:'shiftKey',
	      18:'altKey',
	      17:'ctrlKey',
	      91:'metaKey'
	  };
	  function updateModifierKey(event) {
	      for(k in _mods) _mods[k] = event[modifierMap[k]];
	  };

	  // handle keydown event
	  function dispatch(event) {
	    var key, handler, k, i, modifiersMatch, scope;
	    key = event.keyCode;

	    if (index(_downKeys, key) == -1) {
	        _downKeys.push(key);
	    }

	    // if a modifier key, set the key.<modifierkeyname> property to true and return
	    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
	    if(key in _mods) {
	      _mods[key] = true;
	      // 'assignKey' from inside this closure is exported to window.key
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
	      return;
	    }
	    updateModifierKey(event);

	    // see if we need to ignore the keypress (filter() can can be overridden)
	    // by default ignore key presses if a select, textarea, or input is focused
	    if(!assignKey.filter.call(this, event)) return;

	    // abort if no potentially matching shortcuts found
	    if (!(key in _handlers)) return;

	    scope = getScope();

	    // for each potential shortcut
	    for (i = 0; i < _handlers[key].length; i++) {
	      handler = _handlers[key][i];

	      // see if it's in the current scope
	      if(handler.scope == scope || handler.scope == 'all'){
	        // check if modifiers match if any
	        modifiersMatch = handler.mods.length > 0;
	        for(k in _mods)
	          if((!_mods[k] && index(handler.mods, +k) > -1) ||
	            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
	        // call the handler and stop the event if neccessary
	        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
	          if(handler.method(event, handler)===false){
	            if(event.preventDefault) event.preventDefault();
	              else event.returnValue = false;
	            if(event.stopPropagation) event.stopPropagation();
	            if(event.cancelBubble) event.cancelBubble = true;
	          }
	        }
	      }
	    }
	  };

	  // unset modifier keys on keyup
	  function clearModifier(event){
	    var key = event.keyCode, k,
	        i = index(_downKeys, key);

	    // remove key from _downKeys
	    if (i >= 0) {
	        _downKeys.splice(i, 1);
	    }

	    if(key == 93 || key == 224) key = 91;
	    if(key in _mods) {
	      _mods[key] = false;
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
	    }
	  };

	  function resetModifiers() {
	    for(k in _mods) _mods[k] = false;
	    for(k in _MODIFIERS) assignKey[k] = false;
	  };

	  // parse and assign shortcut
	  function assignKey(key, scope, method){
	    var keys, mods;
	    keys = getKeys(key);
	    if (method === undefined) {
	      method = scope;
	      scope = 'all';
	    }

	    // for each shortcut
	    for (var i = 0; i < keys.length; i++) {
	      // set modifier keys if any
	      mods = [];
	      key = keys[i].split('+');
	      if (key.length > 1){
	        mods = getMods(key);
	        key = [key[key.length-1]];
	      }
	      // convert to keycode and...
	      key = key[0]
	      key = code(key);
	      // ...store handler
	      if (!(key in _handlers)) _handlers[key] = [];
	      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
	    }
	  };

	  // unbind all handlers for given key in current scope
	  function unbindKey(key, scope) {
	    var multipleKeys, keys,
	      mods = [],
	      i, j, obj;

	    multipleKeys = getKeys(key);

	    for (j = 0; j < multipleKeys.length; j++) {
	      keys = multipleKeys[j].split('+');

	      if (keys.length > 1) {
	        mods = getMods(keys);
	        key = keys[keys.length - 1];
	      }

	      key = code(key);

	      if (scope === undefined) {
	        scope = getScope();
	      }
	      if (!_handlers[key]) {
	        return;
	      }
	      for (i = 0; i < _handlers[key].length; i++) {
	        obj = _handlers[key][i];
	        // only clear handlers if correct scope and mods match
	        if (obj.scope === scope && compareArray(obj.mods, mods)) {
	          _handlers[key][i] = {};
	        }
	      }
	    }
	  };

	  // Returns true if the key with code 'keyCode' is currently down
	  // Converts strings into key codes.
	  function isPressed(keyCode) {
	      if (typeof(keyCode)=='string') {
	        keyCode = code(keyCode);
	      }
	      return index(_downKeys, keyCode) != -1;
	  }

	  function getPressedKeyCodes() {
	      return _downKeys.slice(0);
	  }

	  function filter(event){
	    var tagName = (event.target || event.srcElement).tagName;
	    // ignore keypressed in any elements that support keyboard data input
	    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
	  }

	  // initialize key.<modifier> to false
	  for(k in _MODIFIERS) assignKey[k] = false;

	  // set current scope (default 'all')
	  function setScope(scope){ _scope = scope || 'all' };
	  function getScope(){ return _scope || 'all' };

	  // delete all handlers for a given scope
	  function deleteScope(scope){
	    var key, handlers, i;

	    for (key in _handlers) {
	      handlers = _handlers[key];
	      for (i = 0; i < handlers.length; ) {
	        if (handlers[i].scope === scope) handlers.splice(i, 1);
	        else i++;
	      }
	    }
	  };

	  // abstract key logic for assign and unassign
	  function getKeys(key) {
	    var keys;
	    key = key.replace(/\s/g, '');
	    keys = key.split(',');
	    if ((keys[keys.length - 1]) == '') {
	      keys[keys.length - 2] += ',';
	    }
	    return keys;
	  }

	  // abstract mods logic for assign and unassign
	  function getMods(key) {
	    var mods = key.slice(0, key.length - 1);
	    for (var mi = 0; mi < mods.length; mi++)
	    mods[mi] = _MODIFIERS[mods[mi]];
	    return mods;
	  }

	  // cross-browser events
	  function addEvent(object, event, method) {
	    if (object.addEventListener)
	      object.addEventListener(event, method, false);
	    else if(object.attachEvent)
	      object.attachEvent('on'+event, function(){ method(window.event) });
	  };

	  // set the handlers globally on document
	  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
	  addEvent(document, 'keyup', clearModifier);

	  // reset modifiers to false whenever the window is (re)focused.
	  addEvent(window, 'focus', resetModifiers);

	  // store previously defined key
	  var previousKey = global.key;

	  // restore previously defined key and return reference to our key object
	  function noConflict() {
	    var k = global.key;
	    global.key = previousKey;
	    return k;
	  }

	  // set window.key and window.key.set/get/deleteScope, and the default filter
	  global.key = assignKey;
	  global.key.setScope = setScope;
	  global.key.getScope = getScope;
	  global.key.deleteScope = deleteScope;
	  global.key.filter = filter;
	  global.key.isPressed = isPressed;
	  global.key.getPressedKeyCodes = getPressedKeyCodes;
	  global.key.noConflict = noConflict;
	  global.key.unbind = unbindKey;

	  if(true) module.exports = assignKey;

	})(this);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var ChapterSectionMixin, DEFAULT_GROUP, ExerciseGroup, RULES, React, _, camelCase;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	camelCase = __webpack_require__(8);

	ChapterSectionMixin = __webpack_require__(13);

	DEFAULT_GROUP = {
	  show: false
	};

	RULES = {
	  "default": DEFAULT_GROUP,
	  core: DEFAULT_GROUP,
	  personalized: {
	    show: true,
	    label: 'Personalized'
	  },
	  'spaced practice': {
	    show: true
	  },
	  spaced_practice: {
	    show: true
	  }
	};

	ExerciseGroup = React.createClass({
	  displayName: 'ExerciseGroup',
	  mixins: [ChapterSectionMixin],
	  propTypes: {
	    group: React.PropTypes.oneOf(_.keys(RULES)).isRequired,
	    related_content: React.PropTypes.array.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      group: 'default',
	      related_content: []
	    };
	  },
	  getPossibleGroups: function() {
	    return _.keys(RULES);
	  },
	  buildLabel: function(related) {
	    var chapterSection;
	    chapterSection = this.sectionFormat(related.chapter_section, this.props.sectionSeparator);
	    return "Review - " + chapterSection + " " + related.title;
	  },
	  getGroupLabel: function(group, related_content) {
	    var labels;
	    if (RULES[group].label != null) {
	      labels = RULES[group].label;
	    } else {
	      labels = _.map(related_content, this.buildLabel);
	    }
	    return labels;
	  },
	  render: function() {
	    var className, group, groupDOM, labels, ref, related_content;
	    ref = this.props, group = ref.group, related_content = ref.related_content;
	    groupDOM = null;
	    if (RULES[group].show) {
	      className = group.replace(' ', '_');
	      labels = this.getGroupLabel(group, related_content);
	      groupDOM = React.createElement("div", {
	        "className": 'openstax-step-group'
	      }, React.createElement("i", {
	        "className": "icon-sm icon-" + className
	      }), React.createElement("span", {
	        "className": 'openstax-step-group-label'
	      }, labels));
	    }
	    return groupDOM;
	  }
	});

	module.exports = ExerciseGroup;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _;

	_ = __webpack_require__(3);

	module.exports = {
	  getDefaultProps: function() {
	    return {
	      sectionSeparator: '.',
	      skipZeros: true,
	      inputStringSeparator: '.'
	    };
	  },
	  sectionFormat: function(section, separator) {
	    var inputStringSeparator, ref, sectionArray, sectionSeparator, skipZeros;
	    ref = this.props, inputStringSeparator = ref.inputStringSeparator, skipZeros = ref.skipZeros, sectionSeparator = ref.sectionSeparator;
	    if (_.isString(section)) {
	      sectionArray = section.split(inputStringSeparator);
	    }
	    if (_.isArray(section)) {
	      sectionArray = section;
	    }
	    sectionArray = _.clone(sectionArray);
	    if (skipZeros && _.last(sectionArray) === 0) {
	      sectionArray.pop();
	    }
	    if (sectionArray instanceof Array) {
	      return sectionArray.join(separator || sectionSeparator);
	    } else {
	      return section;
	    }
	  }
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var CardBody, PinnableFooter, PinnedHeader, React;

	React = __webpack_require__(2);

	PinnedHeader = React.createClass({
	  displayName: 'PinnedHeader',
	  propTypes: {
	    className: React.PropTypes.string
	  },
	  render: function() {
	    var className, classes;
	    className = this.props.className;
	    classes = 'pinned-header';
	    if (className != null) {
	      classes += " " + className;
	    }
	    return React.createElement("div", {
	      "className": classes
	    }, this.props.children);
	  }
	});

	PinnableFooter = React.createClass({
	  displayName: 'PinnableFooter',
	  propTypes: {
	    className: React.PropTypes.string,
	    pinned: React.PropTypes.bool.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      pinned: true
	    };
	  },
	  render: function() {
	    var className, classPrefix, classes, pinned, ref;
	    ref = this.props, className = ref.className, pinned = ref.pinned;
	    classPrefix = pinned ? 'pinned' : 'card';
	    classes = classPrefix + "-footer";
	    if (className != null) {
	      classes += " " + className;
	    }
	    return React.createElement("div", {
	      "className": classes
	    }, this.props.children);
	  }
	});

	CardBody = React.createClass({
	  displayName: 'CardBody',
	  propTypes: {
	    className: React.PropTypes.string,
	    footerClassName: React.PropTypes.string,
	    pinned: React.PropTypes.bool.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      pinned: true
	    };
	  },
	  render: function() {
	    var children, className, classes, footer, footerClassName, pinnableFooter, pinned, ref;
	    ref = this.props, className = ref.className, pinned = ref.pinned, footerClassName = ref.footerClassName, footer = ref.footer, children = ref.children;
	    classes = 'card-body';
	    if (className != null) {
	      classes += " " + className;
	    }
	    if (footer) {
	      pinnableFooter = React.createElement(PinnableFooter, {
	        "pinned": pinned,
	        "className": footerClassName
	      }, footer);
	    }
	    return React.createElement("div", {
	      "className": classes
	    }, children, pinnableFooter);
	  }
	});

	module.exports = {
	  PinnedHeader: PinnedHeader,
	  CardBody: CardBody,
	  PinnableFooter: PinnableFooter
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var AsyncButton, BS, ExContinueButton, ExReviewControls, React, _, propTypes, props, ref;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	_ = __webpack_require__(3);

	AsyncButton = __webpack_require__(17);

	ref = __webpack_require__(19), propTypes = ref.propTypes, props = ref.props;

	ExContinueButton = React.createClass({
	  displayName: 'ExContinueButton',
	  propTypes: propTypes.ExContinueButton,
	  getDefaultProps: function() {
	    return {
	      isContinueFailed: false,
	      waitingText: null,
	      isContinueEnabled: true
	    };
	  },
	  render: function() {
	    var buttonText, children, isContinueEnabled, isContinueFailed, onContinue, ref1, waitingText;
	    ref1 = this.props, isContinueEnabled = ref1.isContinueEnabled, isContinueFailed = ref1.isContinueFailed, waitingText = ref1.waitingText, onContinue = ref1.onContinue, children = ref1.children;
	    buttonText = children || 'Continue';
	    return React.createElement(AsyncButton, {
	      "bsStyle": 'primary',
	      "className": 'continue',
	      "key": 'step-continue',
	      "onClick": onContinue,
	      "disabled": !isContinueEnabled,
	      "isWaiting": !!waitingText,
	      "waitingText": waitingText,
	      "isFailed": isContinueFailed
	    }, buttonText);
	  }
	});

	ExReviewControls = React.createClass({
	  displayName: 'ExReviewControls',
	  propTypes: propTypes.ExReviewControls,
	  getDefaultProps: function() {
	    return {
	      review: '',
	      canTryAnother: false,
	      isRecovering: false,
	      canRefreshMemory: false
	    };
	  },
	  render: function() {
	    var canRefreshMemory, canTryAnother, children, continueButton, continueButtonText, isContinueEnabled, isContinueFailed, isRecovering, onContinue, ref1, ref2, ref3, refreshMemory, refreshMemoryButton, review, tryAnother, tryAnotherButton, waitingText;
	    ref1 = this.props, review = ref1.review, canTryAnother = ref1.canTryAnother, tryAnother = ref1.tryAnother, isRecovering = ref1.isRecovering, children = ref1.children;
	    ref2 = this.props, canRefreshMemory = ref2.canRefreshMemory, refreshMemory = ref2.refreshMemory;
	    ref3 = this.props, isContinueFailed = ref3.isContinueFailed, waitingText = ref3.waitingText, onContinue = ref3.onContinue, isContinueEnabled = ref3.isContinueEnabled;
	    continueButtonText = canTryAnother ? 'Move On' : children;
	    if (canTryAnother) {
	      tryAnotherButton = React.createElement(AsyncButton, {
	        "key": 'step-try-another',
	        "bsStyle": 'primary',
	        "className": '-try-another',
	        "onClick": tryAnother,
	        "isWaiting": isRecovering,
	        "waitingText": 'Loading Another…'
	      }, "Try Another");
	    }
	    if (canRefreshMemory) {
	      refreshMemoryButton = React.createElement(BS.Button, {
	        "key": 'step-refresh',
	        "bsStyle": 'primary',
	        "className": '-refresh-memory',
	        "onClick": refreshMemory
	      }, "Refresh My Memory");
	    }
	    continueButton = review !== 'completed' ? React.createElement(ExContinueButton, {
	      "key": 'step-continue',
	      "isContinueFailed": isContinueFailed,
	      "waitingText": waitingText,
	      "onContinue": onContinue,
	      "isContinueEnabled": isContinueEnabled
	    }, continueButtonText) : void 0;
	    return React.createElement("div", {
	      "className": 'task-footer-buttons',
	      "key": 'step-buttons'
	    }, tryAnotherButton, continueButton);
	  }
	});

	module.exports = {
	  ExContinueButton: ExContinueButton,
	  ExReviewControls: ExReviewControls
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var BS, React, RefreshButton, _;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	_ = __webpack_require__(3);

	RefreshButton = __webpack_require__(18);

	module.exports = React.createClass({
	  displayName: 'AsyncButton',
	  propTypes: {
	    isWaiting: React.PropTypes.bool.isRequired,
	    isDone: React.PropTypes.bool,
	    isFailed: React.PropTypes.bool,
	    waitingText: React.PropTypes.node,
	    failedState: React.PropTypes.func,
	    failedProps: React.PropTypes.object,
	    doneText: React.PropTypes.node,
	    isJob: React.PropTypes.bool,
	    timeoutLength: React.PropTypes.number
	  },
	  getInitialState: function() {
	    return {
	      isTimedout: false
	    };
	  },
	  componentDidUpdate: function() {
	    var isJob, isTimedout, isWaiting, ref, timeout;
	    ref = this.props, isWaiting = ref.isWaiting, isJob = ref.isJob;
	    isTimedout = this.state.isTimedout;
	    timeout = this.props.timeoutLength || (isJob ? 600000 : 30000);
	    if (isWaiting && !isTimedout) {
	      return _.delay(this.checkForTimeout, timeout);
	    }
	  },
	  checkForTimeout: function() {
	    var isWaiting;
	    isWaiting = this.props.isWaiting;
	    if (isWaiting && this.isMounted()) {
	      return this.setState({
	        isTimedout: true
	      });
	    }
	  },
	  getDefaultProps: function() {
	    return {
	      isDone: false,
	      isFailed: false,
	      waitingText: 'Loading…',
	      failedState: RefreshButton,
	      failedProps: {
	        beforeText: 'There was a problem.  '
	      },
	      doneText: '',
	      isJob: false
	    };
	  },
	  render: function() {
	    var FailedState, buttonTypeClass, children, className, disabled, doneText, failedProps, isDone, isFailed, isTimedout, isWaiting, ref, ref1, ref2, spinner, stateClass, text, waitingText;
	    ref = this.props, className = ref.className, disabled = ref.disabled;
	    ref1 = this.props, isWaiting = ref1.isWaiting, isDone = ref1.isDone, isFailed = ref1.isFailed;
	    ref2 = this.props, children = ref2.children, waitingText = ref2.waitingText, failedProps = ref2.failedProps, doneText = ref2.doneText;
	    isTimedout = this.state.isTimedout;
	    FailedState = this.props.failedState;
	    buttonTypeClass = 'async-button';
	    if (isFailed || isTimedout) {
	      stateClass = 'is-failed';
	      return React.createElement(FailedState, React.__spread({}, failedProps));
	    } else if (isWaiting) {
	      stateClass = 'is-waiting';
	      text = waitingText;
	      disabled = true;
	      spinner = React.createElement("i", {
	        "className": 'fa fa-spinner fa-spin'
	      });
	    } else if (isDone) {
	      stateClass = 'is-done';
	      text = doneText;
	    } else {
	      stateClass = null;
	      text = children;
	    }
	    return React.createElement(BS.Button, React.__spread({}, this.props, {
	      "className": [buttonTypeClass, stateClass, className],
	      "disabled": disabled
	    }), spinner, text);
	  }
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(2);

	module.exports = React.createClass({
	  displayName: 'RefreshButton',
	  propTypes: {
	    beforeText: React.PropTypes.string,
	    buttonText: React.PropTypes.string,
	    afterText: React.PropTypes.string
	  },
	  getDefaultProps: function() {
	    return {
	      beforeText: 'There was a problem loading. ',
	      buttonText: 'Refresh',
	      afterText: ' to try again.'
	    };
	  },
	  render: function() {
	    var afterText, beforeText, buttonText, ref;
	    ref = this.props, beforeText = ref.beforeText, buttonText = ref.buttonText, afterText = ref.afterText;
	    return React.createElement("span", {
	      "className": 'refresh-button'
	    }, beforeText, React.createElement("a", {
	      "className": 'btn btn-primary',
	      "href": window.location.href
	    }, buttonText), afterText);
	  }
	});


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var CONTINUE_PROP_TYPES, CONTROL_PROPS, EXERCISE_STEP_CARD_PROP_TYPES, FOOTER_PROPS, FREE_RESPONSE_PROP_TYPES, MULTIPLE_CHOICE_PROP_TYPES, NOT_PANEL_PROPS, REVIEW_CONTROL_PROP_TYPES, React, STEP_PROP_TYPES, _, extendPropTypes, propTypes, props,
	  slice = [].slice;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	extendPropTypes = function() {
	  var propTypes;
	  propTypes = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  propTypes.unshift({});
	  return _.extend.apply(_, propTypes);
	};

	STEP_PROP_TYPES = {
	  content: React.PropTypes.object.isRequired,
	  feedback_html: React.PropTypes.string,
	  correct_answer_id: React.PropTypes.string,
	  answer_id: React.PropTypes.string,
	  free_response: React.PropTypes.string,
	  group: React.PropTypes.string,
	  related_content: React.PropTypes.array
	};

	CONTINUE_PROP_TYPES = {
	  isContinueEnabled: React.PropTypes.bool,
	  isContinueFailed: React.PropTypes.bool,
	  waitingText: React.PropTypes.string,
	  children: React.PropTypes.string,
	  onContinue: React.PropTypes.func
	};

	REVIEW_CONTROL_PROP_TYPES = {
	  review: React.PropTypes.string,
	  isRecovering: React.PropTypes.bool,
	  canTryAnother: React.PropTypes.bool,
	  tryAnother: React.PropTypes.func,
	  canRefreshMemory: React.PropTypes.bool,
	  refreshMemory: React.PropTypes.func
	};

	FREE_RESPONSE_PROP_TYPES = {
	  free_response: React.PropTypes.string,
	  focus: React.PropTypes.bool.isRequired,
	  disabled: React.PropTypes.bool,
	  onFreeResponseChange: React.PropTypes.func
	};

	MULTIPLE_CHOICE_PROP_TYPES = {
	  choicesEnabled: React.PropTypes.bool.isRequired,
	  canReview: React.PropTypes.bool.isRequired,
	  onAnswerChanged: React.PropTypes.func
	};

	EXERCISE_STEP_CARD_PROP_TYPES = _.extend({}, CONTINUE_PROP_TYPES, REVIEW_CONTROL_PROP_TYPES);

	EXERCISE_STEP_CARD_PROP_TYPES.step = React.PropTypes.shape(STEP_PROP_TYPES).isRequired;

	EXERCISE_STEP_CARD_PROP_TYPES.footer = React.PropTypes.node.isRequired;

	EXERCISE_STEP_CARD_PROP_TYPES.pinned = React.PropTypes.bool;

	EXERCISE_STEP_CARD_PROP_TYPES.allowKeyNav = React.PropTypes.bool;

	EXERCISE_STEP_CARD_PROP_TYPES.panel = React.PropTypes.oneOf(['review', 'multiple-choice', 'free-response', 'teacher-read-only']);

	EXERCISE_STEP_CARD_PROP_TYPES.review = React.PropTypes.string;

	EXERCISE_STEP_CARD_PROP_TYPES.onAnswerChanged = React.PropTypes.func;

	EXERCISE_STEP_CARD_PROP_TYPES.onFreeResponseChange = React.PropTypes.func;

	EXERCISE_STEP_CARD_PROP_TYPES.onChangeAnswerAttempt = React.PropTypes.func;

	CONTROL_PROPS = _.union(_.keys(CONTINUE_PROP_TYPES), _.keys(REVIEW_CONTROL_PROP_TYPES));

	FOOTER_PROPS = ['pinned', 'courseId', 'id', 'taskId', 'review', 'panel'];

	NOT_PANEL_PROPS = _.union(CONTROL_PROPS, FOOTER_PROPS, ['onContinue', 'isContinueEnabled', 'step']);

	propTypes = {
	  ExContinueButton: extendPropTypes(CONTINUE_PROP_TYPES),
	  ExReviewControls: extendPropTypes(CONTINUE_PROP_TYPES, REVIEW_CONTROL_PROP_TYPES),
	  ExFreeResponse: extendPropTypes(STEP_PROP_TYPES, FREE_RESPONSE_PROP_TYPES),
	  ExMultipleChoice: extendPropTypes(STEP_PROP_TYPES, MULTIPLE_CHOICE_PROP_TYPES),
	  ExReview: extendPropTypes(STEP_PROP_TYPES),
	  ExerciseStepCard: EXERCISE_STEP_CARD_PROP_TYPES
	};

	props = _.mapObject(propTypes, _.keys);

	props.StepFooter = ['pinned', 'courseId', 'id', 'taskId', 'review', 'panel'];

	props.notPanel = _.union(props.ExReviewControls, props.StepFooter, ['step']);

	module.exports = {
	  propTypes: propTypes,
	  props: props
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var ArbitraryHtmlAndMath, ExMode, FreeResponse, Question, React, _, modeProps, modeType, propTypes, props, ref;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	ArbitraryHtmlAndMath = __webpack_require__(21);

	Question = __webpack_require__(23);

	FreeResponse = __webpack_require__(25);

	ref = __webpack_require__(19), propTypes = ref.propTypes, props = ref.props;

	modeType = propTypes.ExerciseStepCard.panel;

	modeProps = _.extend({}, propTypes.ExFreeResponse, propTypes.ExMulitpleChoice, propTypes.ExReview, {
	  mode: modeType
	});

	ExMode = React.createClass({
	  displayName: 'ExMode',
	  propTypes: modeProps,
	  getDefaultProps: function() {
	    return {
	      disabled: false,
	      free_response: '',
	      answer_id: ''
	    };
	  },
	  getInitialState: function() {
	    var answer_id, free_response, ref1;
	    ref1 = this.props, free_response = ref1.free_response, answer_id = ref1.answer_id;
	    return {
	      freeResponse: free_response,
	      answerId: answer_id
	    };
	  },
	  componentDidMount: function() {
	    var mode;
	    mode = this.props.mode;
	    if (mode === 'free-response') {
	      return this.focusBox();
	    }
	  },
	  componentDidUpdate: function(nextProps, nextState) {
	    var mode;
	    mode = nextProps.mode;
	    if (mode === 'free-response') {
	      return this.focusBox();
	    }
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var answer_id, free_response, mode;
	    mode = nextProps.mode, free_response = nextProps.free_response, answer_id = nextProps.answer_id;
	    switch (mode) {
	      case 'free-response':
	        if (this.state.freeResponse !== free_response) {
	          return this.setState({
	            freeResponse: free_response
	          });
	        }
	        break;
	      case 'multiple-choice':
	        if (this.state.answerId !== answer_id) {
	          return this.setState({
	            answerId: answer_id
	          });
	        }
	    }
	  },
	  focusBox: function() {
	    var base, focus, mode, ref1, ref2;
	    ref1 = this.props, focus = ref1.focus, mode = ref1.mode;
	    if (focus && mode === 'free-response') {
	      return (ref2 = this.refs.freeResponse) != null ? typeof ref2.getDOMNode === "function" ? typeof (base = ref2.getDOMNode()).focus === "function" ? base.focus() : void 0 : void 0 : void 0;
	    }
	  },
	  onFreeResponseChange: function() {
	    var base, freeResponse, ref1, ref2;
	    freeResponse = (ref1 = this.refs.freeResponse) != null ? (ref2 = ref1.getDOMNode()) != null ? ref2.value : void 0 : void 0;
	    this.setState({
	      freeResponse: freeResponse
	    });
	    return typeof (base = this.props).onFreeResponseChange === "function" ? base.onFreeResponseChange(freeResponse) : void 0;
	  },
	  onAnswerChanged: function(answer) {
	    var base;
	    if (answer.id === this.state.answerId || this.props.mode !== 'multiple-choice') {
	      return;
	    }
	    this.setState({
	      answerId: answer.id
	    });
	    return typeof (base = this.props).onAnswerChanged === "function" ? base.onAnswerChanged(answer) : void 0;
	  },
	  getFreeResponse: function() {
	    var disabled, freeResponse, free_response, mode, ref1;
	    ref1 = this.props, mode = ref1.mode, free_response = ref1.free_response, disabled = ref1.disabled;
	    freeResponse = this.state.freeResponse;
	    if (mode === 'free-response') {
	      return React.createElement("textarea", {
	        "disabled": disabled,
	        "ref": 'freeResponse',
	        "placeholder": 'Enter your response',
	        "value": freeResponse,
	        "onChange": this.onFreeResponseChange
	      });
	    } else {
	      return React.createElement(FreeResponse, {
	        "free_response": free_response
	      });
	    }
	  },
	  render: function() {
	    var answerId, answerKeySet, changeProps, choicesEnabled, content, htmlAndMathProps, mode, onChangeAnswerAttempt, question, questionProps, ref1, stimulus_html;
	    ref1 = this.props, mode = ref1.mode, content = ref1.content, onChangeAnswerAttempt = ref1.onChangeAnswerAttempt, answerKeySet = ref1.answerKeySet, choicesEnabled = ref1.choicesEnabled;
	    answerId = this.state.answerId;
	    if (!choicesEnabled) {
	      answerKeySet = null;
	    }
	    question = content.questions[0];
	    if (mode === 'free-response') {
	      question = _.omit(question, 'answers');
	    }
	    questionProps = _.pick(this.props, 'processHtmlAndMath', 'choicesEnabled', 'correct_answer_id', 'feedback_html', 'type');
	    if (mode === 'multiple-choice') {
	      changeProps = {
	        onChange: this.onAnswerChanged
	      };
	    } else if (mode === 'review') {
	      changeProps = {
	        onChangeAttempt: onChangeAnswerAttempt
	      };
	    }
	    htmlAndMathProps = _.pick(this.props, 'processHtmlAndMath');
	    stimulus_html = content.stimulus_html;
	    return React.createElement("div", {
	      "className": 'openstax-exercise'
	    }, React.createElement(ArbitraryHtmlAndMath, React.__spread({}, htmlAndMathProps, {
	      "className": 'exercise-stimulus',
	      "block": true,
	      "html": stimulus_html
	    })), React.createElement(Question, React.__spread({}, questionProps, changeProps, {
	      "key": 'step-question',
	      "model": question,
	      "answer_id": answerId,
	      "keySet": answerKeySet,
	      "exercise_uid": content.uid
	    }), this.getFreeResponse()));
	  }
	});

	module.exports = {
	  ExMode: ExMode
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var React, _, classnames, typesetMath;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	typesetMath = __webpack_require__(22).typesetMath;

	module.exports = React.createClass({
	  displayName: 'ArbitraryHtmlAndMath',
	  propTypes: {
	    className: React.PropTypes.string,
	    html: React.PropTypes.string,
	    block: React.PropTypes.bool.isRequired,
	    processHtmlAndMath: React.PropTypes.func
	  },
	  getDefaultProps: function() {
	    return {
	      block: false
	    };
	  },
	  render: function() {
	    var block, className, classes, otherProps, ref;
	    ref = this.props, className = ref.className, block = ref.block;
	    classes = classnames('openstax-has-html', className);
	    otherProps = _.omit(this.props, 'className', 'block', 'html');
	    if (block) {
	      return React.createElement("div", React.__spread({}, otherProps, {
	        "className": classes,
	        "dangerouslySetInnerHTML": this.getHTMLFromProp()
	      }));
	    } else {
	      return React.createElement("span", React.__spread({}, otherProps, {
	        "className": classes,
	        "dangerouslySetInnerHTML": this.getHTMLFromProp()
	      }));
	    }
	  },
	  getHTMLFromProp: function() {
	    var html;
	    html = this.props.html;
	    if (html) {
	      return {
	        __html: html
	      };
	    }
	  },
	  shouldComponentUpdate: function(nextProps, nextState) {
	    var propName, value;
	    for (propName in nextProps) {
	      value = nextProps[propName];
	      if (this.props[propName] !== value) {
	        return true;
	      }
	    }
	    return false;
	  },
	  componentDidMount: function() {
	    return this.updateDOMNode();
	  },
	  componentDidUpdate: function() {
	    return this.updateDOMNode();
	  },
	  updateDOMNode: function() {
	    var base, links, root;
	    root = this.getDOMNode();
	    links = root.querySelectorAll('a');
	    _.each(links, function(link) {
	      var ref;
	      if (((ref = link.getAttribute('href')) != null ? ref[0] : void 0) !== '#') {
	        return link.setAttribute('target', '_blank');
	      }
	    });
	    return (typeof (base = this.props).processHtmlAndMath === "function" ? base.processHtmlAndMath(root) : void 0) || typesetMath(root);
	  }
	});


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var COMBINED_MATH_SELECTOR, MATH_DATA_SELECTOR, MATH_MARKER_BLOCK, MATH_MARKER_INLINE, MATH_ML_SELECTOR, MATH_RENDERED_CLASS, _, setAsRendered, startMathJax, typesetDocument, typesetMath;

	_ = __webpack_require__(3);

	MATH_MARKER_BLOCK = '\u200c\u200c\u200c';

	MATH_MARKER_INLINE = '\u200b\u200b\u200b';

	MATH_RENDERED_CLASS = 'math-rendered';

	MATH_DATA_SELECTOR = "[data-math]:not(." + MATH_RENDERED_CLASS + ")";

	MATH_ML_SELECTOR = "math:not(." + MATH_RENDERED_CLASS + ")";

	COMBINED_MATH_SELECTOR = MATH_DATA_SELECTOR + ", " + MATH_ML_SELECTOR;

	setAsRendered = function(node, type) {
	  if (type == null) {
	    type = 'mathjax';
	  }
	  node.classList.add(type + "-rendered");
	  return node.classList.add(MATH_RENDERED_CLASS);
	};

	typesetDocument = function() {
	  var allNodes, formula, i, len, node, ref;
	  allNodes = [];
	  ref = document.querySelectorAll(MATH_DATA_SELECTOR);
	  for (i = 0, len = ref.length; i < len; i++) {
	    node = ref[i];
	    formula = node.getAttribute('data-math');
	    if (node.tagName.toLowerCase() === 'div') {
	      node.textContent = "" + MATH_MARKER_BLOCK + formula + MATH_MARKER_BLOCK;
	    } else {
	      node.textContent = "" + MATH_MARKER_INLINE + formula + MATH_MARKER_INLINE;
	    }
	    allNodes.push(node);
	  }
	  allNodes = allNodes.concat(_.pluck(document.querySelectorAll(MATH_ML_SELECTOR), 'parentNode'));
	  window.MathJax.Hub.Typeset(allNodes);
	  return window.MathJax.Hub.Queue(function() {
	    var j, len1, results;
	    results = [];
	    for (j = 0, len1 = allNodes.length; j < len1; j++) {
	      node = allNodes[j];
	      results.push(setAsRendered(node));
	    }
	    return results;
	  });
	};

	typesetDocument = _.debounce(typesetDocument, 10);

	typesetMath = function(root) {
	  var ref, ref1;
	  if ((((ref = window.MathJax) != null ? (ref1 = ref.Hub) != null ? ref1.Queue : void 0 : void 0) != null) && root.querySelector(COMBINED_MATH_SELECTOR)) {
	    return typesetDocument();
	  }
	};

	startMathJax = function() {
	  var MATHJAX_CONFIG, configuredCallback, ref;
	  MATHJAX_CONFIG = {
	    showProcessingMessages: false,
	    tex2jax: {
	      displayMath: [[MATH_MARKER_BLOCK, MATH_MARKER_BLOCK]],
	      inlineMath: [[MATH_MARKER_INLINE, MATH_MARKER_INLINE]]
	    },
	    styles: {
	      '#MathJax_Message': {
	        visibility: 'hidden',
	        left: '',
	        right: 0
	      },
	      '#MathJax_MSIE_Frame': {
	        visibility: 'hidden',
	        left: '',
	        right: 0
	      }
	    }
	  };
	  configuredCallback = function() {
	    return window.MathJax.Hub.Configured();
	  };
	  if ((ref = window.MathJax) != null ? ref.Hub : void 0) {
	    window.MathJax.Hub.Config(MATHJAX_CONFIG);
	    window.MathJax.Hub.processSectionDelay = 0;
	    return configuredCallback();
	  } else {
	    MATHJAX_CONFIG.AuthorInit = configuredCallback;
	    return window.MathJax = MATHJAX_CONFIG;
	  }
	};

	module.exports = {
	  typesetMath: typesetMath,
	  startMathJax: startMathJax
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Answer, AnswersTable, ArbitraryHtmlAndMath, Feedback, KEYS, KEYSETS_PROPS, QuestionHtml, React, _, classnames, idCounter, isAnswerChecked, isAnswerCorrect, keymaster, keysHelper,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	keymaster = __webpack_require__(11);

	keysHelper = __webpack_require__(24);

	KEYS = {
	  'multiple-choice-numbers': _.range(1, 10)
	};

	KEYS['multiple-choice-alpha'] = _.map(KEYS['multiple-choice-numbers'], _.partial(keysHelper.getCharFromNumKey, _, null));

	KEYS['multiple-choice'] = _.zip(KEYS['multiple-choice-numbers'], KEYS['multiple-choice-alpha']);

	KEYSETS_PROPS = _.keys(KEYS);

	KEYSETS_PROPS.push(null);

	ArbitraryHtmlAndMath = __webpack_require__(21);

	idCounter = 0;

	isAnswerCorrect = function(answer, correctAnswerId) {
	  var isCorrect;
	  isCorrect = answer.id === correctAnswerId;
	  if (answer.correctness != null) {
	    isCorrect = answer.correctness === '1.0';
	  }
	  return isCorrect;
	};

	isAnswerChecked = function(answer, chosenAnswer) {
	  var isChecked, ref;
	  return isChecked = (ref = answer.id, indexOf.call(chosenAnswer, ref) >= 0);
	};

	Answer = React.createClass({
	  displayName: 'Answer',
	  propTypes: {
	    answer: React.PropTypes.shape({
	      id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
	      content_html: React.PropTypes.string.isRequired,
	      correctness: React.PropTypes.string,
	      selected_count: React.PropTypes.number
	    }).isRequired,
	    iter: React.PropTypes.number.isRequired,
	    qid: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
	    type: React.PropTypes.string.isRequired,
	    hasCorrectAnswer: React.PropTypes.bool.isRequired,
	    onChangeAnswer: React.PropTypes.func.isRequired,
	    disabled: React.PropTypes.bool,
	    chosenAnswer: React.PropTypes.array,
	    correctAnswerId: React.PropTypes.string,
	    answered_count: React.PropTypes.number,
	    show_all_feedback: React.PropTypes.bool,
	    keyControl: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.array])
	  },
	  getDefaultProps: function() {
	    return {
	      disabled: false,
	      show_all_feedback: false
	    };
	  },
	  componentWillMount: function() {
	    if (this.shouldKey()) {
	      return this.setUpKeys();
	    }
	  },
	  componentWillUnmount: function() {
	    var keyControl;
	    keyControl = this.props.keyControl;
	    if (keyControl != null) {
	      return keysHelper.off(keyControl, 'multiple-choice');
	    }
	  },
	  componentDidUpdate: function(prevProps) {
	    var keyControl;
	    keyControl = this.props.keyControl;
	    if (this.shouldKey(prevProps) && !this.shouldKey()) {
	      keysHelper.off(prevProps.keyControl, 'multiple-choice');
	    }
	    if (this.shouldKey() && prevProps.keyControl !== keyControl) {
	      return this.setUpKeys();
	    }
	  },
	  shouldKey: function(props) {
	    var disabled, keyControl;
	    if (props == null) {
	      props = this.props;
	    }
	    keyControl = props.keyControl, disabled = props.disabled;
	    return (keyControl != null) && !disabled;
	  },
	  setUpKeys: function() {
	    var answer, keyControl, keyInAnswer, onChangeAnswer, ref;
	    ref = this.props, answer = ref.answer, onChangeAnswer = ref.onChangeAnswer, keyControl = ref.keyControl;
	    keyInAnswer = _.partial(onChangeAnswer, answer);
	    keysHelper.on(keyControl, 'multiple-choice', keyInAnswer);
	    return keymaster.setScope('multiple-choice');
	  },
	  contextTypes: {
	    processHtmlAndMath: React.PropTypes.func
	  },
	  render: function() {
	    var answer, answered_count, chosenAnswer, classes, correctAnswerId, disabled, feedback, hasCorrectAnswer, htmlAndMathProps, isChecked, isCorrect, iter, onChangeAnswer, percent, qid, radioBox, ref, selectedCount, type;
	    ref = this.props, answer = ref.answer, iter = ref.iter, qid = ref.qid, type = ref.type, correctAnswerId = ref.correctAnswerId, answered_count = ref.answered_count, hasCorrectAnswer = ref.hasCorrectAnswer, chosenAnswer = ref.chosenAnswer, onChangeAnswer = ref.onChangeAnswer, disabled = ref.disabled;
	    if (qid == null) {
	      qid = "auto-" + (idCounter++);
	    }
	    isChecked = isAnswerChecked(answer, chosenAnswer);
	    isCorrect = isAnswerCorrect(answer, correctAnswerId);
	    classes = classnames('answers-answer', {
	      'answer-checked': isChecked,
	      'answer-correct': isCorrect
	    });
	    if (!(hasCorrectAnswer || type === 'teacher-review')) {
	      radioBox = React.createElement("input", {
	        "type": 'radio',
	        "className": 'answer-input-box',
	        "checked": isChecked,
	        "id": qid + "-option-" + iter,
	        "name": qid + "-options",
	        "onChange": _.partial(onChangeAnswer, answer),
	        "disabled": disabled
	      });
	    }
	    if (type === 'teacher-review') {
	      percent = Math.round(answer.selected_count / answered_count * 100) || 0;
	      selectedCount = React.createElement("div", {
	        "className": 'selected-count',
	        "data-count": "" + answer.selected_count,
	        "data-percent": "" + percent
	      });
	    }
	    if (this.props.show_all_feedback && answer.feedback_html) {
	      feedback = React.createElement(Feedback, {
	        "key": 'question-mc-feedback'
	      }, answer.feedback_html);
	    }
	    htmlAndMathProps = _.pick(this.context, 'processHtmlAndMath');
	    return React.createElement("div", null, React.createElement("div", {
	      "className": classes
	    }, selectedCount, radioBox, React.createElement("label", {
	      "htmlFor": qid + "-option-" + iter,
	      "className": 'answer-label'
	    }, React.createElement("div", {
	      "className": 'answer-letter'
	    }), React.createElement(ArbitraryHtmlAndMath, React.__spread({}, htmlAndMathProps, {
	      "className": 'answer-content',
	      "html": answer.content_html
	    })))), feedback);
	  }
	});

	Feedback = React.createClass({
	  displayName: 'Feedback',
	  propTypes: {
	    children: React.PropTypes.string.isRequired,
	    position: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
	  },
	  getDefaultProps: function() {
	    return {
	      position: 'bottom'
	    };
	  },
	  contextTypes: {
	    processHtmlAndMath: React.PropTypes.func
	  },
	  render: function() {
	    var htmlAndMathProps, wrapperClasses;
	    wrapperClasses = classnames('question-feedback', this.props.position);
	    htmlAndMathProps = _.pick(this.context, 'processHtmlAndMath');
	    return React.createElement("div", {
	      "className": wrapperClasses
	    }, React.createElement("div", {
	      "className": 'arrow'
	    }), React.createElement(ArbitraryHtmlAndMath, React.__spread({}, htmlAndMathProps, {
	      "className": 'question-feedback-content has-html',
	      "html": this.props.children,
	      "block": true
	    })));
	  }
	});

	AnswersTable = React.createClass({
	  displayName: 'AnswersTable',
	  propTypes: {
	    model: React.PropTypes.object.isRequired,
	    type: React.PropTypes.string.isRequired,
	    answer_id: React.PropTypes.string,
	    correct_answer_id: React.PropTypes.string,
	    feedback_html: React.PropTypes.string,
	    answered_count: React.PropTypes.number,
	    show_all_feedback: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    onChangeAttempt: React.PropTypes.func,
	    keySet: React.PropTypes.oneOf(KEYSETS_PROPS)
	  },
	  getDefaultProps: function() {
	    return {
	      type: 'student',
	      show_all_feedback: false,
	      keySet: 'multiple-choice'
	    };
	  },
	  getInitialState: function() {
	    return {
	      answer_id: null
	    };
	  },
	  onChangeAnswer: function(answer, changeEvent) {
	    var base;
	    if (this.props.onChange != null) {
	      this.setState({
	        answer_id: answer.id
	      });
	      return this.props.onChange(answer);
	    } else {
	      changeEvent.preventDefault();
	      return typeof (base = this.props).onChangeAttempt === "function" ? base.onChangeAttempt(answer) : void 0;
	    }
	  },
	  render: function() {
	    var answer_id, answered_count, answers, answersHtml, checkedAnswerIndex, choicesEnabled, chosenAnswer, correct_answer_id, feedback, feedback_html, hasCorrectAnswer, id, keySet, model, questionAnswerProps, ref, show_all_feedback, type;
	    ref = this.props, model = ref.model, type = ref.type, answered_count = ref.answered_count, choicesEnabled = ref.choicesEnabled, correct_answer_id = ref.correct_answer_id, answer_id = ref.answer_id, feedback_html = ref.feedback_html, show_all_feedback = ref.show_all_feedback, keySet = ref.keySet;
	    answers = model.answers, id = model.id;
	    if (!((answers != null ? answers.length : void 0) > 0)) {
	      return null;
	    }
	    chosenAnswer = [answer_id, this.state.answer_id];
	    checkedAnswerIndex = null;
	    hasCorrectAnswer = !!correct_answer_id;
	    questionAnswerProps = {
	      qid: id || ("auto-" + (idCounter++)),
	      correctAnswerId: correct_answer_id,
	      hasCorrectAnswer: hasCorrectAnswer,
	      chosenAnswer: chosenAnswer,
	      onChangeAnswer: this.onChangeAnswer,
	      type: type,
	      answered_count: answered_count,
	      disabled: !choicesEnabled,
	      show_all_feedback: show_all_feedback
	    };
	    answersHtml = _.chain(answers).sortBy(function(answer) {
	      return parseInt(answer.id);
	    }).map(function(answer, i) {
	      var additionalProps, answerProps, ref1;
	      additionalProps = {
	        answer: answer,
	        iter: i,
	        key: questionAnswerProps.qid + "-option-" + i,
	        keyControl: (ref1 = KEYS[keySet]) != null ? ref1[i] : void 0
	      };
	      answerProps = _.extend({}, additionalProps, questionAnswerProps);
	      if (isAnswerChecked(answer, chosenAnswer)) {
	        checkedAnswerIndex = i;
	      }
	      return React.createElement(Answer, React.__spread({}, answerProps));
	    }).value();
	    if (feedback_html) {
	      feedback = React.createElement(Feedback, {
	        "key": 'question-mc-feedback'
	      }, feedback_html);
	    }
	    if ((feedback != null) && (checkedAnswerIndex != null)) {
	      answersHtml.splice(checkedAnswerIndex + 1, 0, feedback);
	    }
	    return React.createElement("div", {
	      "className": 'answers-table'
	    }, answersHtml);
	  }
	});

	QuestionHtml = React.createClass({
	  displayName: 'QuestionHtml',
	  propTypes: {
	    html: React.PropTypes.string,
	    type: React.PropTypes.string
	  },
	  getDefaultProps: function() {
	    return {
	      html: '',
	      type: ''
	    };
	  },
	  contextTypes: {
	    processHtmlAndMath: React.PropTypes.func
	  },
	  render: function() {
	    var html, htmlAndMathProps, ref, type;
	    ref = this.props, html = ref.html, type = ref.type;
	    if (!(html.length > 0)) {
	      return null;
	    }
	    htmlAndMathProps = _.pick(this.context, 'processHtmlAndMath');
	    return React.createElement(ArbitraryHtmlAndMath, React.__spread({}, htmlAndMathProps, {
	      "className": "question-" + type,
	      "block": true,
	      "html": html
	    }));
	  }
	});

	module.exports = React.createClass({
	  displayName: 'Question',
	  propTypes: {
	    model: React.PropTypes.object.isRequired,
	    correct_answer_id: React.PropTypes.string,
	    exercise_uid: React.PropTypes.string
	  },
	  childContextTypes: {
	    processHtmlAndMath: React.PropTypes.func
	  },
	  getChildContext: function() {
	    return {
	      processHtmlAndMath: this.props.processHtmlAndMath
	    };
	  },
	  render: function() {
	    var classes, correct_answer_id, exercise_uid, hasCorrectAnswer, model, ref, stem_html, stimulus_html;
	    ref = this.props, model = ref.model, correct_answer_id = ref.correct_answer_id, exercise_uid = ref.exercise_uid;
	    stem_html = model.stem_html, stimulus_html = model.stimulus_html;
	    hasCorrectAnswer = !!correct_answer_id;
	    classes = classnames('openstax-question', {
	      'has-correct-answer': hasCorrectAnswer
	    });
	    return React.createElement("div", {
	      "className": classes
	    }, React.createElement(QuestionHtml, {
	      "type": 'stem',
	      "html": stem_html
	    }), React.createElement(QuestionHtml, {
	      "type": 'stimulus',
	      "html": stimulus_html
	    }), this.props.children, React.createElement(AnswersTable, React.__spread({}, this.props)), React.createElement("div", {
	      "className": "exercise-uid"
	    }, exercise_uid));
	  }
	});


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var _, handleKeys, keymaster, keysHelper,
	  slice = [].slice;

	_ = __webpack_require__(3);

	keymaster = __webpack_require__(11);

	keysHelper = {};

	handleKeys = function() {
	  var keyFN, keymasterArgs, keys;
	  keyFN = arguments[0], keys = arguments[1], keymasterArgs = 3 <= arguments.length ? slice.call(arguments, 2) : [];
	  if (!keys) {
	    return keys != null;
	  }
	  if (_.isArray(keys)) {
	    return _.each(keys, function(key) {
	      return keyFN.apply(null, [key.toString()].concat(slice.call(keymasterArgs)));
	    });
	  } else {
	    return keyFN.apply(null, [keys].concat(slice.call(keymasterArgs)));
	  }
	};

	keysHelper.on = _.partial(handleKeys, keymaster);

	keysHelper.off = _.partial(handleKeys, keymaster.unbind);

	keysHelper.getCharFromNumKey = function(numKey, offset) {
	  if (offset == null) {
	    offset = 1;
	  }
	  return String.fromCharCode((97 - offset) + numKey);
	};

	module.exports = keysHelper;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var FreeResponse, React;

	React = __webpack_require__(2);

	FreeResponse = React.createClass({
	  displayName: 'FreeResponse',
	  propTypes: {
	    free_response: React.PropTypes.string.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      free_response: ''
	    };
	  },
	  render: function() {
	    var freeResponseProps, free_response, ref, student_names;
	    ref = this.props, free_response = ref.free_response, student_names = ref.student_names;
	    FreeResponse = null;
	    freeResponseProps = {
	      className: 'free-response'
	    };
	    if (student_names != null) {
	      freeResponseProps['data-student-names'] = student_names.join(', ');
	    }
	    if ((free_response != null) && free_response.length) {
	      FreeResponse = React.createElement("div", React.__spread({}, freeResponseProps), free_response);
	    }
	    return FreeResponse;
	  }
	});

	module.exports = FreeResponse;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Breadcrumb, React, _, classnames;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	Breadcrumb = React.createClass({
	  displayName: 'Breadcrumb',
	  propTypes: {
	    crumb: React.PropTypes.object.isRequired,
	    goToStep: React.PropTypes.func.isRequired,
	    step: React.PropTypes.object.isRequired,
	    canReview: React.PropTypes.bool,
	    currentStep: React.PropTypes.number,
	    onMouseEnter: React.PropTypes.func,
	    onMouseLeave: React.PropTypes.func
	  },
	  getDefaultProps: function() {
	    return {
	      canReview: true,
	      step: {}
	    };
	  },
	  getInitialState: function() {
	    return this.getState(this.props);
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var nextState;
	    nextState = this.getState(nextProps);
	    return this.setState(nextState);
	  },
	  getState: function(arg) {
	    var canReview, crumb, crumbType, currentStep, isCompleted, isCorrect, isCurrent, isEnd, isIncorrect, step;
	    crumb = arg.crumb, currentStep = arg.currentStep, step = arg.step, canReview = arg.canReview;
	    isCorrect = false;
	    isIncorrect = false;
	    isCurrent = crumb.key === currentStep;
	    isCompleted = step != null ? step.is_completed : void 0;
	    isEnd = crumb.type === 'end';
	    crumbType = isEnd ? crumb.type : step != null ? step.type : void 0;
	    if (isCompleted) {
	      if (canReview && (step.correct_answer_id != null)) {
	        if (step.is_correct) {
	          isCorrect = true;
	        } else if (step.answer_id) {
	          isIncorrect = true;
	        }
	      }
	    }
	    return {
	      isCorrect: isCorrect,
	      isIncorrect: isIncorrect,
	      isCurrent: isCurrent,
	      isCompleted: isCompleted,
	      isEnd: isEnd,
	      crumbType: crumbType
	    };
	  },
	  render: function() {
	    var className, classes, crumb, crumbClasses, crumbType, goToStep, iconClasses, isCompleted, isCorrect, isCurrent, isEnd, isIncorrect, propsToPassOn, ref, ref1, status, step, title;
	    ref = this.props, step = ref.step, crumb = ref.crumb, goToStep = ref.goToStep, className = ref.className;
	    ref1 = this.state, isCorrect = ref1.isCorrect, isIncorrect = ref1.isIncorrect, isCurrent = ref1.isCurrent, isCompleted = ref1.isCompleted, isEnd = ref1.isEnd, crumbType = ref1.crumbType;
	    propsToPassOn = _.pick(this.props, 'onMouseEnter', 'onMouseLeave', 'style', 'tabIndex');
	    if (isCurrent) {
	      title = "Current Step (" + crumbType + ")";
	    }
	    if (isCompleted) {
	      if (title == null) {
	        title = "Step Completed (" + crumbType + "). Click to review";
	      }
	    }
	    if (isCorrect) {
	      status = React.createElement("i", {
	        "className": 'icon-lg icon-correct'
	      });
	    }
	    if (isIncorrect) {
	      status = React.createElement("i", {
	        "className": 'icon-lg icon-incorrect'
	      });
	    }
	    if (isEnd) {
	      title = step.title + " Completion";
	    }
	    classes = classnames('openstax-breadcrumbs-step', 'icon-stack', 'icon-lg', step.group, "breadcrumb-" + crumbType, className, {
	      current: isCurrent,
	      active: isCurrent,
	      completed: isCompleted,
	      'status-correct': isCorrect,
	      'status-incorrect': isIncorrect
	    });
	    if (crumb.data.labels != null) {
	      crumbClasses = _.map(crumb.data.labels, function(label) {
	        return "icon-" + label;
	      });
	    }
	    iconClasses = classnames("icon-" + crumbType, crumbClasses);
	    return React.createElement("span", React.__spread({}, propsToPassOn, {
	      "className": classes,
	      "title": title,
	      "onClick": _.partial(goToStep, crumb.key),
	      "data-chapter": crumb.sectionLabel,
	      "key": "step-" + crumb.key
	    }), React.createElement("i", {
	      "className": "icon-lg " + iconClasses
	    }), status);
	  }
	});

	module.exports = Breadcrumb;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var React, SpyModeContent, SpyModeWrapper, classnames;

	React = __webpack_require__(2);

	classnames = __webpack_require__(4);

	SpyModeWrapper = React.createClass({displayName: "SpyModeWrapper",
	  propTypes: {
	    onChange: React.PropTypes.func
	  },
	  getInitialState: function() {
	    return {
	      isEnabled: false
	    };
	  },
	  toggleDebug: function(ev) {
	    this.setState({
	      isEnabled: !this.state.isEnabled
	    });
	    return ev.preventDefault();
	  },
	  render: function() {
	    return React.createElement("div", {
	      "className": classnames('openstax-debug-content', {
	        'is-enabled': this.state.isEnabled
	      })
	    }, this.props.children, React.createElement("a", {
	      "href": '#spy',
	      "onClick": this.toggleDebug,
	      "className": 'debug-toggle-link'
	    }, "π"));
	  }
	});

	SpyModeContent = React.createClass({displayName: "SpyModeContent",
	  propTypes: {
	    className: React.PropTypes.string
	  },
	  render: function() {
	    return React.createElement("div", {
	      "className": classnames('visible-when-debugging', this.props.className)
	    }, this.props.children);
	  }
	});

	module.exports = {
	  Content: SpyModeContent,
	  Wrapper: SpyModeWrapper
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var CardBody, GetPositionMixin, PinnableFooter, PinnedHeader, React, ResizeListenerMixin, ScrollListenerMixin, _, ref;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	ScrollListenerMixin = __webpack_require__(29).ScrollListenerMixin;

	ResizeListenerMixin = __webpack_require__(30);

	GetPositionMixin = __webpack_require__(31);

	ref = __webpack_require__(14), PinnedHeader = ref.PinnedHeader, CardBody = ref.CardBody, PinnableFooter = ref.PinnableFooter;

	module.exports = React.createClass({
	  displayName: 'PinnedHeaderFooterCard',
	  propTypes: {
	    cardType: React.PropTypes.string.isRequired,
	    buffer: React.PropTypes.number,
	    scrollSpeedBuffer: React.PropTypes.number,
	    forceShy: React.PropTypes.bool,
	    containerBuffer: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      buffer: 60,
	      scrollSpeedBuffer: 30,
	      forceShy: false,
	      containerBuffer: 30
	    };
	  },
	  getInitialState: function() {
	    return {
	      offset: 0,
	      shy: false,
	      pinned: false,
	      shouldBeShy: false,
	      headerHeight: 0,
	      containerMarginTop: '0px'
	    };
	  },
	  mixins: [ScrollListenerMixin, ResizeListenerMixin, GetPositionMixin],
	  componentWillMount: function() {
	    var cardBodyClass;
	    this.previousBodyClasses = document.body.className;
	    cardBodyClass = this.props.cardType;
	    document.body.className = cardBodyClass + "-view";
	    document.body.classList.add('pinned-view');
	    if (this.props.forceShy) {
	      return document.body.classList.add('pinned-force-shy');
	    }
	  },
	  componentWillUnmount: function() {
	    return document.body.className = this.previousBodyClasses;
	  },
	  getOffset: function() {
	    var offset;
	    if (this.props.fixedOffset != null) {
	      offset = this.props.fixedOffset;
	    } else if (this.refs.header != null) {
	      offset = this.getTopPosition(this.refs.header.getDOMNode());
	    }
	    return offset;
	  },
	  setOffset: function() {
	    var offset;
	    offset = this.getOffset();
	    return this.setState({
	      offset: offset
	    });
	  },
	  shouldPinHeader: function(prevScrollTop, currentScrollTop) {
	    return currentScrollTop >= this.state.offset - this.props.buffer;
	  },
	  isScrollingSlowed: function(prevScrollTop, currentScrollTop) {
	    return Math.abs(prevScrollTop - currentScrollTop) <= this.props.scrollSpeedBuffer;
	  },
	  isScrollingDown: function(prevScrollTop, currentScrollTop) {
	    return currentScrollTop > prevScrollTop;
	  },
	  isScrollPassBuffer: function(prevScrollTop, currentScrollTop) {
	    return currentScrollTop >= this.props.buffer + this.state.offset;
	  },
	  shouldBeShy: function(prevScrollTop, currentScrollTop) {
	    var shouldBeShy;
	    if (!this.isScrollPassBuffer(prevScrollTop, currentScrollTop)) {
	      shouldBeShy = false;
	    } else if (this.isScrollingDown(prevScrollTop, currentScrollTop)) {
	      shouldBeShy = true;
	    } else if (this.isScrollingSlowed(prevScrollTop, currentScrollTop)) {
	      shouldBeShy = this.state.shy;
	    } else {
	      shouldBeShy = false;
	    }
	    return shouldBeShy;
	  },
	  updatePinState: function(prevScrollTop) {
	    var addOrRemove, pinnedClassAction, shouldBeShy, shouldPinHeader, shyClassAction;
	    addOrRemove = ['remove', 'add'];
	    this.setState({
	      shy: this.state.shouldBeShy || this.shouldBeShy(prevScrollTop, this.state.scrollTop),
	      pinned: this.shouldPinHeader(prevScrollTop, this.state.scrollTop),
	      shouldBeShy: false
	    });
	    shouldPinHeader = this.state.pinned * 1;
	    shouldBeShy = this.state.shy * 1;
	    pinnedClassAction = addOrRemove[shouldPinHeader];
	    document.body.classList[pinnedClassAction]('pinned-on');
	    shyClassAction = addOrRemove[shouldBeShy];
	    return document.body.classList[shyClassAction]('pinned-shy');
	  },
	  forceShy: function() {
	    window.scroll(0, this.props.buffer + this.state.offset);
	    return this.setState({
	      shouldBeShy: true
	    });
	  },
	  getHeaderHeight: function() {
	    var header, headerHeight, ref1;
	    header = (ref1 = this.refs.header) != null ? ref1.getDOMNode() : void 0;
	    return headerHeight = (header != null ? header.offsetHeight : void 0) || 0;
	  },
	  setOriginalContainerMargin: function() {
	    var container, ref1;
	    container = (ref1 = this.refs.container) != null ? ref1.getDOMNode() : void 0;
	    if (!container) {
	      return;
	    }
	    if (window.getComputedStyle != null) {
	      return this.setState({
	        containerMarginTop: window.getComputedStyle(container).marginTop
	      });
	    }
	  },
	  setContainerMargin: function() {
	    var container, headerHeight, ref1;
	    headerHeight = this.getHeaderHeight();
	    container = (ref1 = this.refs.container) != null ? ref1.getDOMNode() : void 0;
	    if (!container) {
	      return;
	    }
	    return this.setState({
	      headerHeight: headerHeight
	    });
	  },
	  _resizeListener: function() {
	    return this.setContainerMargin();
	  },
	  componentDidMount: function() {
	    this.setOffset();
	    this.updatePinState(0);
	    this.setOriginalContainerMargin();
	    return this.setContainerMargin();
	  },
	  componentDidUpdate: function(prevProps, prevState) {
	    var didHeaderHeightChange, didOffsetChange, didShouldBeShyChange, didShouldPinChange;
	    didOffsetChange = (!this.state.pinned) && !(this.state.offset === this.getOffset());
	    didShouldPinChange = !prevState.pinned === this.shouldPinHeader(prevState.scrollTop, this.state.scrollTop);
	    didShouldBeShyChange = !prevState.shy === this.shouldBeShy(prevState.scrollTop, this.state.scrollTop);
	    didHeaderHeightChange = !(prevState.headerHeight === this.getHeaderHeight());
	    if (didOffsetChange) {
	      this.setOffset();
	    }
	    if (didShouldPinChange || didShouldBeShyChange) {
	      this.updatePinState(prevState.scrollTop);
	    }
	    if (didHeaderHeightChange || didShouldPinChange) {
	      return this.setContainerMargin();
	    }
	  },
	  componentWillReceiveProps: function() {
	    if (this.props.forceShy) {
	      return this.forceShy();
	    }
	  },
	  render: function() {
	    var childrenProps, className, classes, containerStyle, pinnedHeader;
	    className = this.props.className;
	    classes = ['pinned-container'];
	    if (className != null) {
	      classes.push(className);
	    }
	    classes = classes.join(' ');
	    childrenProps = _.omit(this.props, 'children', 'header', 'footer', 'className');
	    if (this.state.pinned) {
	      containerStyle = {
	        marginTop: (this.state.headerHeight + this.props.containerBuffer) + 'px'
	      };
	    } else {
	      containerStyle = {
	        marginTop: this.state.containerMarginTop
	      };
	    }
	    if (this.props.header != null) {
	      pinnedHeader = React.createElement(PinnedHeader, React.__spread({}, childrenProps, {
	        "ref": 'header'
	      }), this.props.header);
	    }
	    return React.createElement("div", {
	      "className": classes,
	      "style": containerStyle,
	      "ref": 'container'
	    }, pinnedHeader, this.props.children);
	  }
	});


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var React, _;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	module.exports = {
	  propTypes: {
	    resizeThrottle: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      resizeThrottle: 200
	    };
	  },
	  getInitialState: function() {
	    return {
	      windowEl: {},
	      componentEl: {},
	      sizesInitial: {}
	    };
	  },
	  componentWillMount: function() {
	    return this.resizeListener = _.throttle(this.resizeEffect, this.state.resizeThrottle || this.props.resizeThrottle);
	  },
	  componentDidMount: function() {
	    _.defer(this.setInitialSize);
	    return window.addEventListener('resize', this.resizeListener);
	  },
	  componentWillUnmount: function() {
	    return window.removeEventListener('resize', this.resizeListener);
	  },
	  resizeEffect: function(resizeEvent) {
	    var componentEl, sizes, windowEl;
	    windowEl = this._getWindowSize();
	    componentEl = this._getComponentSize();
	    sizes = {
	      windowEl: windowEl,
	      componentEl: componentEl
	    };
	    this.setState(sizes);
	    return typeof this._resizeListener === "function" ? this._resizeListener(sizes, resizeEvent) : void 0;
	  },
	  _getWindowSize: function() {
	    var height, width;
	    width = window.innerWidth;
	    height = window.innerHeight;
	    return {
	      width: width,
	      height: height
	    };
	  },
	  _getComponentSize: function() {
	    var componentNode;
	    componentNode = this.getDOMNode();
	    return {
	      width: componentNode.offsetWidth,
	      height: componentNode.offsetHeight
	    };
	  },
	  setInitialSize: function() {
	    var componentEl, sizesInitial, windowEl;
	    windowEl = this._getWindowSize();
	    componentEl = this._getComponentSize();
	    sizesInitial = {
	      windowEl: windowEl,
	      componentEl: componentEl
	    };
	    return this.setState({
	      sizesInitial: sizesInitial,
	      windowEl: windowEl,
	      componentEl: componentEl
	    });
	  }
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {
	  getTopPosition: function(el) {
	    return el.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
	  }
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var React, ResizeListenerMixin, SmartOverflow, _, classnames;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	ResizeListenerMixin = __webpack_require__(30);

	SmartOverflow = React.createClass({displayName: "SmartOverflow",
	  propTypes: {
	    heightBuffer: React.PropTypes.number,
	    marginBottom: React.PropTypes.number
	  },
	  getInitialState: function() {
	    return {
	      isOverflowing: false,
	      triggerHeight: null,
	      style: void 0
	    };
	  },
	  getDefaultProps: function() {
	    return {
	      heightBuffer: 20,
	      marginBottom: 0
	    };
	  },
	  mixins: [ResizeListenerMixin],
	  getOffset: function() {
	    var componentNode, topOffset;
	    componentNode = this.getDOMNode();
	    return topOffset = componentNode.getBoundingClientRect().top;
	  },
	  getTriggerHeight: function() {
	    var topOffset;
	    topOffset = this.getOffset();
	    return topOffset + this.state.sizesInitial.componentEl.height;
	  },
	  componentDidUpdate: function() {
	    var sizes, triggerHeight, triggerHeightState;
	    if (!(_.isEmpty(this.state.sizesInitial) || (this.state.triggerHeight != null))) {
	      triggerHeight = this.getTriggerHeight();
	      triggerHeightState = {
	        triggerHeight: triggerHeight
	      };
	      this.setState(triggerHeightState);
	      sizes = _.defaults({}, this.state.sizesInitial, triggerHeightState);
	      return this._resizeListener(sizes);
	    }
	  },
	  _resizeListener: function(sizes) {
	    var marginBottom, maxHeight, style;
	    if (sizes.windowEl.height < (sizes.triggerHeight || this.state.triggerHeight)) {
	      maxHeight = sizes.windowEl.height - this.getOffset() - this.props.heightBuffer;
	      marginBottom = this.props.marginBottom;
	      style = {
	        maxHeight: maxHeight,
	        marginBottom: marginBottom
	      };
	    } else {
	      style = void 0;
	    }
	    return this.setState({
	      style: style
	    });
	  },
	  render: function() {
	    var className, classes;
	    className = this.props.className;
	    classes = classnames('openstax-smart-overflow', className);
	    return React.createElement("div", {
	      "className": classes,
	      "style": this.state.style
	    }, this.props.children);
	  }
	});

	module.exports = SmartOverflow;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var React, classnames;

	React = __webpack_require__(2);

	classnames = __webpack_require__(4);

	module.exports = React.createClass({displayName: "exports",
	  render: function() {
	    var classNames;
	    classNames = classnames('openstax-close-x', 'close', this.props.className);
	    return React.createElement("button", React.__spread({}, this.props, {
	      "className": classNames,
	      "aria-role": 'close'
	    }));
	  }
	});


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Breadcrumbs, EventEmitter2, ExerciseStep, NoExercises, React, Reactive, SpyMode, Task, TaskBase, TaskReview, TaskTitle, _, api, apiChannelName, breadcrumbs, channel, classnames, exercises, ref, ref1, tasks;

	React = __webpack_require__(2);

	EventEmitter2 = __webpack_require__(5);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	SpyMode = __webpack_require__(6).SpyMode;

	channel = (tasks = __webpack_require__(35)).channel;

	api = __webpack_require__(37);

	Reactive = __webpack_require__(77).Reactive;

	apiChannelName = 'task';

	exercises = (ref = __webpack_require__(78), ExerciseStep = ref.ExerciseStep, ref);

	breadcrumbs = (ref1 = __webpack_require__(79), Breadcrumbs = ref1.Breadcrumbs, ref1);

	TaskReview = __webpack_require__(80).TaskReview;

	TaskTitle = __webpack_require__(82).TaskTitle;

	NoExercises = __webpack_require__(83).NoExercises;

	TaskBase = React.createClass({
	  displayName: 'TaskBase',
	  getInitialState: function() {
	    var item;
	    item = this.props.item;
	    return {
	      task: item,
	      currentStep: 0,
	      steps: this.setupSteps(item)
	    };
	  },
	  contextTypes: {
	    close: React.PropTypes.func,
	    navigator: React.PropTypes.instanceOf(EventEmitter2)
	  },
	  setupSteps: function(task) {
	    var steps;
	    steps = _.keys(task != null ? task.steps : void 0);
	    steps.push('summary');
	    steps.push('continue');
	    return steps;
	  },
	  goToStep: function(stepIndex) {
	    if (this.isStepAllowed(stepIndex)) {
	      return this.setState({
	        currentStep: stepIndex
	      });
	    }
	  },
	  nextStep: function() {
	    var currentStep;
	    currentStep = this.state.currentStep;
	    return this.goToStep(currentStep + 1);
	  },
	  goToFirstIncomplete: function() {
	    var stepIndex, taskId;
	    taskId = this.props.taskId;
	    stepIndex = tasks.getFirstIncompleteIndex(taskId);
	    return this.goToStep(stepIndex);
	  },
	  isStepAllowed: function(stepIndex) {
	    return this.isExerciseStep(stepIndex) || (this.isReviewStep(stepIndex) && this.canReview()) || (this.isContinueStep(stepIndex) && this.shouldContinue());
	  },
	  isExerciseStep: function(stepIndex) {
	    var task;
	    task = this.state.task;
	    return stepIndex < task.steps.length;
	  },
	  canReview: function() {
	    var taskId;
	    taskId = this.props.taskId;
	    return !_.isEmpty(tasks.getCompleteSteps(taskId));
	  },
	  shouldContinue: function() {
	    var taskId;
	    taskId = this.props.taskId;
	    return _.isEmpty(tasks.getIncompleteSteps(taskId));
	  },
	  isReviewStep: function(stepIndex) {
	    var steps;
	    steps = this.state.steps;
	    return steps[stepIndex] === 'summary';
	  },
	  isContinueStep: function(stepIndex) {
	    var steps;
	    steps = this.state.steps;
	    return steps[stepIndex] === 'continue';
	  },
	  fetchTask: function() {
	    return tasks.fetchByModule(this.props);
	  },
	  componentWillMount: function() {
	    api.channel.on('exercise.*.receive.complete', this.fetchTask);
	    return exercises.channel.on('leave.*', this.nextStep);
	  },
	  componentWillUnmount: function() {
	    api.channel.off('exercise.*.receive.complete', this.fetchTask);
	    return exercises.channel.off('leave.*', this.nextStep);
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var nextState, stepIndex;
	    nextState = {
	      task: nextProps.item,
	      steps: this.setupSteps(nextProps.item)
	    };
	    if ((_.isEmpty(this.props.item) && !_.isEmpty(nextProps.item)) || (this.props.taskId !== nextProps.taskId)) {
	      stepIndex = tasks.getFirstIncompleteIndex(nextProps.taskId);
	      nextState.currentStep = stepIndex;
	    }
	    return this.setState(nextState);
	  },
	  componentDidUpdate: function() {
	    var close, currentStep, navigator, ref2, ref3, step, steps;
	    ref2 = this.state, currentStep = ref2.currentStep, steps = ref2.steps;
	    ref3 = this.context, close = ref3.close, navigator = ref3.navigator;
	    step = steps[currentStep];
	    navigator.emit('show.task', {
	      view: 'task',
	      step: step
	    });
	    if (this.isContinueStep(currentStep)) {
	      return close();
	    }
	  },
	  render: function() {
	    var currentStep, noExercises, panel, ref2, task, taskClasses, taskId;
	    ref2 = this.state, task = ref2.task, currentStep = ref2.currentStep;
	    taskId = this.props.taskId;
	    if (task == null) {
	      return null;
	    }
	    breadcrumbs = React.createElement(Breadcrumbs, React.__spread({}, this.props, {
	      "canReview": this.canReview(),
	      "shouldContinue": this.shouldContinue(),
	      "goToStep": this.goToStep,
	      "currentStep": currentStep
	    }));
	    noExercises = (task.steps == null) || _.isEmpty(task.steps);
	    if (noExercises) {
	      panel = React.createElement(NoExercises, null);
	    } else if (task.steps[currentStep] != null) {
	      panel = React.createElement(ExerciseStep, {
	        "className": 'concept-coach-task-body',
	        "id": task.steps[currentStep].id,
	        "pinned": false
	      });
	    } else if (this.isReviewStep(currentStep)) {
	      panel = React.createElement(TaskReview, React.__spread({}, this.props, {
	        "goToStep": this.goToFirstIncomplete
	      }));
	    } else if (this.isContinueStep(currentStep)) {
	      panel = null;
	    }
	    taskClasses = classnames('concept-coach-task', {
	      'card-body': noExercises
	    });
	    return React.createElement("div", {
	      "className": taskClasses
	    }, React.createElement(TaskTitle, React.__spread({}, this.props)), breadcrumbs, panel, React.createElement(SpyMode.Content, null, JSON.stringify(task.spy)));
	  }
	});

	Task = React.createClass({
	  displayName: 'Task',
	  filter: function(props, eventData) {
	    var receivedData, setProps, toCompare;
	    toCompare = ['collectionUUID', 'moduleUUID'];
	    setProps = _.pick(props, toCompare);
	    receivedData = _.pick(eventData.data, toCompare);
	    return _.isEqual(setProps, receivedData);
	  },
	  render: function() {
	    var collectionUUID, moduleUUID, ref2, taskId;
	    ref2 = this.props, collectionUUID = ref2.collectionUUID, moduleUUID = ref2.moduleUUID;
	    taskId = collectionUUID + "/" + moduleUUID;
	    return React.createElement(Reactive, {
	      "topic": taskId,
	      "store": tasks,
	      "apiChannelName": apiChannelName,
	      "collectionUUID": collectionUUID,
	      "moduleUUID": moduleUUID,
	      "fetcher": tasks.fetchByModule,
	      "filter": this.filter
	    }, React.createElement(TaskBase, React.__spread({}, this.props, {
	      "taskId": taskId
	    })));
	  }
	});

	module.exports = {
	  Task: Task,
	  channel: channel
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var ERRORS_TO_SILENCE, EventEmitter2, _, api, channel, checkFailure, exercises, fetch, fetchByModule, get, getAsPage, getCompleteSteps, getFirstIncompleteIndex, getIncompleteSteps, getModuleInfo, getStepIndex, getUnhandledErrors, handledAllErrors, init, interpolate, load, tasks, update, user;

	EventEmitter2 = __webpack_require__(5);

	interpolate = __webpack_require__(36);

	_ = __webpack_require__(3);

	api = __webpack_require__(37);

	exercises = __webpack_require__(74);

	tasks = {};

	user = __webpack_require__(75);

	channel = new EventEmitter2({
	  wildcard: true
	});

	ERRORS_TO_SILENCE = ['page_has_no_exercises'];

	getUnhandledErrors = function(errors) {
	  var otherErrors;
	  return otherErrors = _.reject(errors, function(error) {
	    return _.indexOf(ERRORS_TO_SILENCE, error.code) > -1;
	  });
	};

	handledAllErrors = function(otherErrors) {
	  return _.isEmpty(otherErrors);
	};

	checkFailure = function(response) {
	  var ref;
	  if ((ref = response.data) != null ? ref.errors : void 0) {
	    response.data.errors = getUnhandledErrors(response.data.errors);
	    return response.stopErrorDisplay = handledAllErrors(response.data.errors);
	  }
	};

	load = function(taskId, data) {
	  var status;
	  tasks[taskId] = data;
	  status = !data || (data.errors != null) ? 'failed' : 'loaded';
	  _.each(data != null ? data.steps : void 0, function(step) {
	    return exercises.quickLoad(step.id, step);
	  });
	  return channel.emit("load." + taskId, {
	    data: data,
	    status: status
	  });
	};

	update = function(eventData) {
	  var data, query;
	  if (eventData == null) {
	    return;
	  }
	  data = eventData.data, query = eventData.query;
	  return load(query, data);
	};

	fetch = function(taskId) {
	  var eventData;
	  eventData = {
	    data: {
	      id: taskId
	    },
	    status: 'loading'
	  };
	  eventData.query = taskId;
	  channel.emit("fetch." + taskId, eventData);
	  return api.channel.emit("task." + taskId + ".send.fetch", eventData);
	};

	fetchByModule = function(arg) {
	  var collectionUUID, eventData, moduleUUID;
	  collectionUUID = arg.collectionUUID, moduleUUID = arg.moduleUUID;
	  eventData = {
	    data: {
	      collectionUUID: collectionUUID,
	      moduleUUID: moduleUUID
	    },
	    status: 'loading'
	  };
	  eventData.query = collectionUUID + "/" + moduleUUID;
	  channel.emit("fetch." + collectionUUID + "/" + moduleUUID, eventData);
	  return api.channel.emit("task." + collectionUUID + "/" + moduleUUID + ".send.fetchByModule", eventData);
	};

	get = function(taskId) {
	  return tasks[taskId];
	};

	getCompleteSteps = function(taskId) {
	  var ref;
	  return _.filter((ref = tasks[taskId]) != null ? ref.steps : void 0, function(step) {
	    return (step != null) && step.is_completed;
	  });
	};

	getIncompleteSteps = function(taskId) {
	  var ref;
	  return _.filter((ref = tasks[taskId]) != null ? ref.steps : void 0, function(step) {
	    return (step != null) && !step.is_completed;
	  });
	};

	getFirstIncompleteIndex = function(taskId) {
	  var ref;
	  return _.max([
	    _.findIndex((ref = tasks[taskId]) != null ? ref.steps : void 0, {
	      is_completed: false
	    }), 0
	  ]);
	};

	getStepIndex = function(taskId, stepId) {
	  var ref;
	  return _.findIndex((ref = tasks[taskId]) != null ? ref.steps : void 0, {
	    id: stepId
	  });
	};

	getModuleInfo = function(taskId, cnxUrl) {
	  var collectionUUID, moduleInfo, moduleUUID, moduleUrlPattern, ref, ref1, task;
	  if (cnxUrl == null) {
	    cnxUrl = '';
	  }
	  task = tasks[taskId];
	  if (task == null) {
	    return;
	  }
	  moduleUrlPattern = '{cnxUrl}/contents/{collectionUUID}:{moduleUUID}';
	  collectionUUID = task.collectionUUID, moduleUUID = task.moduleUUID;
	  moduleInfo = _.clone((ref = task.steps) != null ? (ref1 = ref[0].related_content) != null ? ref1[0] : void 0 : void 0) || {};
	  _.extend(moduleInfo, _.pick(task, 'collectionUUID', 'moduleUUID'));
	  moduleInfo.link = interpolate(moduleUrlPattern, {
	    cnxUrl: cnxUrl,
	    collectionUUID: collectionUUID,
	    moduleUUID: moduleUUID
	  });
	  return moduleInfo;
	};

	getAsPage = function(taskId) {
	  var moduleUUID, page, steps, task;
	  task = get(taskId);
	  moduleUUID = task.moduleUUID, steps = task.steps;
	  page = _.pick(task, 'last_worked_at', 'id');
	  _.extend(page, _.first(_.first(steps).related_content));
	  page.exercises = steps;
	  page.uuid = moduleUUID;
	  return page;
	};

	init = function() {
	  user.channel.on('logout.received', function() {
	    return tasks = {};
	  });
	  api.channel.on("task.*.receive.*", update);
	  return api.channel.on('task.*.receive.failure', checkFailure);
	};

	module.exports = {
	  init: init,
	  load: load,
	  fetch: fetch,
	  fetchByModule: fetchByModule,
	  get: get,
	  getCompleteSteps: getCompleteSteps,
	  getIncompleteSteps: getIncompleteSteps,
	  getFirstIncompleteIndex: getFirstIncompleteIndex,
	  getStepIndex: getStepIndex,
	  getModuleInfo: getModuleInfo,
	  getAsPage: getAsPage,
	  channel: channel
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	
	/**
	 port of http://www.bbc.co.uk/glow/docs/1.7/api/glow.lang.shtml #interpolate
	  Modified to be stand-alone and offer support for delimters of random length
	  @description Replaces placeholders in a string with data from an object

	  @param {String} template The string containing {placeholders}
	  @param {Object} data Object containing the data to be merged in to the template
	    The object can contain nested data objects and arrays, with nested object properties and array elements are accessed using dot notation. eg foo.bar or foo.0.
	    The data labels in the object cannot contain characters used in the template delimiters, so if the data must be allowed to contain the default { and } delimiters, the delimters must be changed using the option below.
	  @param {Object} opts Options object
	    @param {String} [opts.delimiter="{}"] Alternative label delimiter(s) for the template. Needs to be symmetric, i.e. '{{}}', '<%%>'

	  @returns {String}
	 */

	function interpolate (template, data, opts) {
	  var regex,
	      lDel,
	      rDel,
	      delLen,
	      lDelLen,
	      delimiter,
	      // For escaping strings to go in regex
	      regexEscape = /([$\^\\\/()|?+*\[\]{}.\-])/g;

	  opts = opts || {};

	  delimiter = opts.delimiter || '{}';
	  delLen = delimiter.length;
	  lDelLen = Math.ceil(delLen / 2);
	  // escape delimiters for regex
	  lDel = delimiter.substr(0, lDelLen).replace(regexEscape, "\\$1");
	  rDel = delimiter.substr(lDelLen, delLen).replace(regexEscape, "\\$1") || lDel;

	  // construct the new regex
	  regex = new RegExp(lDel + "[^" + lDel + rDel + "]+" + rDel, "g");

	  return template.replace(regex, function (placeholder) {
	    var key = placeholder.slice(lDelLen, -lDelLen),
	        keyParts = key.split("."),
	        val,
	        i = 0,
	        len = keyParts.length;

	    if (key in data) {
	      // need to be backwards compatible with "flattened" data.
	      val = data[key];
	    }
	    else {
	      // look up the chain
	      val = data;
	      for (; i < len; i++) {
	        if (keyParts[i] in val) {
	          val = val[ keyParts[i] ];
	        } else {
	          return placeholder;
	        }
	      }
	    }
	    return val;
	  });
	}

	module.exports = interpolate;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter2, IS_INITIALIZED, channel, destroy, initialize, isPending, loader, ref, settings;

	EventEmitter2 = __webpack_require__(5);

	ref = __webpack_require__(38), loader = ref.loader, isPending = ref.isPending;

	settings = __webpack_require__(73);

	channel = new EventEmitter2({
	  wildcard: true
	});

	IS_INITIALIZED = false;

	initialize = function(baseUrl) {
	  if (settings.baseUrl == null) {
	    settings.baseUrl = baseUrl;
	  }
	  if (!IS_INITIALIZED) {
	    loader(channel, settings);
	  }
	  return IS_INITIALIZED = true;
	};

	destroy = function() {
	  channel.removeAllListeners();
	  return IS_INITIALIZED = false;
	};

	module.exports = {
	  loader: loader,
	  isPending: isPending,
	  settings: settings,
	  initialize: initialize,
	  destroy: destroy,
	  channel: channel
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var $, API_ACCESS_TOKEN, LOADING, METHODS_WITH_DATA, _, deepMerge, defaultFail, getAjaxSettingsByEnv, getResponseDataByEnv, handleAPIEvent, interpolate, isPending, loader;

	_ = __webpack_require__(3);

	deepMerge = __webpack_require__(39);

	$ = __webpack_require__(72);

	interpolate = __webpack_require__(36);

	METHODS_WITH_DATA = ['PUT', 'PATCH', 'POST'];

	LOADING = {};

	API_ACCESS_TOKEN = false;

	defaultFail = function(response) {
	  if (!window.__karma__) {
	    return console.info(response);
	  }
	};

	getAjaxSettingsByEnv = function(isLocal, baseUrl, setting, eventData) {
	  var apiSetting, change, data;
	  data = eventData.data, change = eventData.change;
	  apiSetting = _.pick(setting, 'url', 'method');
	  apiSetting.dataType = 'json';
	  apiSetting.contentType = 'application/json;charset=UTF-8';
	  if (_.includes(METHODS_WITH_DATA, apiSetting.method)) {
	    apiSetting.data = JSON.stringify(change || data);
	  }
	  if (isLocal) {
	    apiSetting.url = (interpolate(apiSetting.url, data)) + "/" + apiSetting.method + ".json";
	    apiSetting.method = 'GET';
	  } else {
	    if (setting.useCredentials) {
	      apiSetting.xhrFields = {
	        withCredentials: true
	      };
	    } else if (API_ACCESS_TOKEN) {
	      apiSetting.headers = {
	        Authorization: "Bearer " + API_ACCESS_TOKEN
	      };
	    }
	    apiSetting.url = baseUrl + "/" + (interpolate(apiSetting.url, data));
	  }
	  return apiSetting;
	};

	getResponseDataByEnv = function(isLocal, requestEvent, data) {
	  var datasToMerge;
	  if (isLocal) {
	    datasToMerge = [
	      {}, {
	        data: data,
	        query: requestEvent.query
	      }
	    ];
	    if (requestEvent.change != null) {
	      datasToMerge.push({
	        data: requestEvent.change
	      });
	    }
	  } else {
	    datasToMerge = [
	      {}, requestEvent, {
	        data: data
	      }
	    ];
	  }
	  return deepMerge.apply({}, datasToMerge);
	};

	handleAPIEvent = function(apiEventChannel, baseUrl, setting, requestEvent) {
	  var apiSetting, delay, isLocal;
	  if (requestEvent == null) {
	    requestEvent = {};
	  }
	  isLocal = window.__karma__ || setting.loadLocally;
	  delay = isLocal ? 20 : 0;
	  apiSetting = getAjaxSettingsByEnv(isLocal, baseUrl, setting, requestEvent);
	  if (apiSetting.method === 'GET') {
	    if (LOADING[apiSetting.url]) {
	      return;
	    }
	    LOADING[apiSetting.url] = true;
	  }
	  return _.delay(function() {
	    return $.ajax(apiSetting).done(function(responseData) {
	      var completedData, completedEvent, error;
	      delete LOADING[apiSetting.url];
	      try {
	        completedEvent = interpolate(setting.completedEvent, requestEvent.data);
	        completedData = getResponseDataByEnv(isLocal, requestEvent, responseData);
	        return apiEventChannel.emit(completedEvent, completedData);
	      } catch (_error) {
	        error = _error;
	        return apiEventChannel.emit('error', {
	          apiSetting: apiSetting,
	          response: responseData,
	          failedData: completedData,
	          exception: error
	        });
	      }
	    }).fail(function(response) {
	      var failedData, failedEvent, responseJSON;
	      delete LOADING[apiSetting.url];
	      responseJSON = response.responseJSON;
	      failedData = getResponseDataByEnv(isLocal, requestEvent, responseJSON);
	      if (_.isString(setting.failedEvent)) {
	        failedEvent = interpolate(setting.failedEvent, requestEvent.data);
	        apiEventChannel.emit(failedEvent, failedData);
	      }
	      defaultFail(response);
	      return apiEventChannel.emit('error', {
	        response: response,
	        apiSetting: apiSetting,
	        failedData: failedData
	      });
	    }).always(function(response) {
	      return apiEventChannel.emit('completed');
	    });
	  }, delay);
	};

	isPending = function() {
	  return !_.isEmpty(LOADING);
	};

	loader = function(apiEventChannel, settings) {
	  apiEventChannel.on('set.access_token', function(token) {
	    return API_ACCESS_TOKEN = token;
	  });
	  return _.each(settings.endpoints, function(setting, eventName) {
	    return apiEventChannel.on(eventName, _.partial(handleAPIEvent, apiEventChannel, setting.baseUrl || settings.baseUrl, setting));
	  });
	};

	module.exports = {
	  loader: loader,
	  isPending: isPending
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(40),
	    createAssigner = __webpack_require__(67);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(41),
	    baseMergeDeep = __webpack_require__(42),
	    isArray = __webpack_require__(50),
	    isArrayLike = __webpack_require__(45),
	    isObject = __webpack_require__(54),
	    isObjectLike = __webpack_require__(49),
	    isTypedArray = __webpack_require__(62),
	    keys = __webpack_require__(65);

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);

	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(43),
	    isArguments = __webpack_require__(44),
	    isArray = __webpack_require__(50),
	    isArrayLike = __webpack_require__(45),
	    isPlainObject = __webpack_require__(55),
	    isTypedArray = __webpack_require__(62),
	    toPlainObject = __webpack_require__(63);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(45),
	    isObjectLike = __webpack_require__(49);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(46),
	    isLength = __webpack_require__(48);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(47);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(51),
	    isLength = __webpack_require__(48),
	    isObjectLike = __webpack_require__(49);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(52);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(53),
	    isObjectLike = __webpack_require__(49);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(54);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(56),
	    isArguments = __webpack_require__(44),
	    isObjectLike = __webpack_require__(49);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(57),
	    keysIn = __webpack_require__(60);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(58);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(59);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(54);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(44),
	    isArray = __webpack_require__(50),
	    isIndex = __webpack_require__(61),
	    isLength = __webpack_require__(48),
	    isObject = __webpack_require__(54);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(48),
	    isObjectLike = __webpack_require__(49);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(64),
	    keysIn = __webpack_require__(60);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(51),
	    isArrayLike = __webpack_require__(45),
	    isObject = __webpack_require__(54),
	    shimKeys = __webpack_require__(66);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(44),
	    isArray = __webpack_require__(50),
	    isIndex = __webpack_require__(61),
	    isLength = __webpack_require__(48),
	    keysIn = __webpack_require__(60);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(68),
	    isIterateeCall = __webpack_require__(70),
	    restParam = __webpack_require__(71);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(69);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(45),
	    isIndex = __webpack_require__(61),
	    isObject = __webpack_require__(54);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 71 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-04-28T16:01Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//

	var arr = [];

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		version = "2.1.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},

		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.0-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-16
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];
		nodeType = context.nodeType;

		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		if ( !seed && documentIsHTML ) {

			// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;
		parent = doc.defaultView;

		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Support tests
		---------------------------------------------------------------------- */
		documentIsHTML = !isXML( doc );

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\f]' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return doc;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context !== document && context;
				}

				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;

			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var matched = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}

			return matched;
		}
	});

	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);



	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// We once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};


	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});

		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}

			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];

			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;

				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );

				// Support: Android<4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}

			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}

			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];

			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}

			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			if ( key === undefined ) {
				this.cache[ unlock ] = {};

			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();

	var data_user = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );

					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}

			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});


	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};

	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;



	support.focusinBubbles = "onfocusin" in window;


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// Support: Firefox, Chrome, Safari
	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );

					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {

			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],

			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			_default: [ 0, "", "" ]
		};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			data_user.set( dest, udataCur );
		}
	}

	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			return fragment;
		},

		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;

			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];

					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});

	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},

		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;

			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var arg = arguments[ 0 ];

			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;

				jQuery.cleanData( getAll( this ) );

				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, callback ) {

			// Flatten any nested arrays
			args = concat.apply( [], args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( this[ i ], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

				// Use of this method is a temporary fix (more like optimization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			if ( elem.ownerDocument.defaultView.opener ) {
				return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
			}

			return window.getComputedStyle( elem, null );
		};



	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}


	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );

			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";

			docElem.removeChild( container );
		}

		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {

					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {

					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );

					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

					docElem.removeChild( container );
					div.removeChild( marginDiv );

					return ret;
				}
			});
		}
	})();


	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var
		// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;

				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];

					// Make sure we update the tween properties later on
					parts = parts || [];

					// Iteratively approximate from a nonzero starting point
					start = +target || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*.
						// Use string for doubling so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur(),
					// break the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}

				return tween;
			} ]
		};

	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;

				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};


	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});

	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});




	var rfocusable = /^(?:input|select|textarea|button)$/i;

	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});

	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );

			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});




	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace(rreturn, "") :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	// Return jQuery for attributes-only inclusion


	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});

	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Document location
		ajaxLocation = window.location.href,

		// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function( options ) {
		var callback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");

					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");

					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};




	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			// Support: BlackBerry 5, iOS 3 (original iPhone)
			// If we don't have gBCR, just use 0,0 rather than error
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;

				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || docElem;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

	// Support: Safari<7+, Chrome<37+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});


	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;

	}));


/***/ },
/* 73 */
/***/ function(module, exports) {

	var settings;

	settings = {
	  endpoints: {
	    'exercise.*.send.save': {
	      url: 'api/steps/{id}',
	      method: 'PATCH',
	      completedEvent: 'exercise.{id}.receive.save'
	    },
	    'exercise.*.send.complete': {
	      url: 'api/steps/{id}/completed',
	      method: 'PUT',
	      completedEvent: 'exercise.{id}.receive.complete'
	    },
	    'exercise.*.send.fetch': {
	      url: 'api/steps/{id}',
	      method: 'GET',
	      completedEvent: 'exercise.{id}.receive.fetch'
	    },
	    'task.*.send.fetch': {
	      url: 'api/tasks/{id}',
	      method: 'GET',
	      completedEvent: 'task.{id}.receive.fetch',
	      failedEvent: 'task.{id}.receive.failure'
	    },
	    'task.*.send.fetchByModule': {
	      url: 'api/cc/tasks/{collectionUUID}/{moduleUUID}',
	      method: 'GET',
	      completedEvent: 'task.{collectionUUID}/{moduleUUID}.receive.fetchByModule',
	      failedEvent: 'task.{collectionUUID}/{moduleUUID}.receive.failure'
	    },
	    'user.status.send.fetch': {
	      url: 'auth/status',
	      method: 'GET',
	      useCredentials: true,
	      completedEvent: 'user.status.receive.fetch'
	    },
	    'courseDashboard.*.send.fetch': {
	      url: 'api/courses/{id}/cc/dashboard',
	      method: 'GET',
	      completedEvent: 'courseDashboard.{id}.receive.fetch'
	    },
	    'course.*.send.prevalidation': {
	      url: 'api/enrollment_changes/prevalidate',
	      method: 'POST',
	      failedEvent: 'course.{book_uuid}.receive.prevalidation.failure',
	      completedEvent: 'course.{book_uuid}.receive.prevalidation.complete'
	    },
	    'course.*.send.registration': {
	      url: 'api/enrollment_changes',
	      method: 'POST',
	      failedEvent: 'course.{book_uuid}.receive.registration.failure',
	      completedEvent: 'course.{book_uuid}.receive.registration.complete'
	    },
	    'course.*.send.confirmation': {
	      url: 'api/enrollment_changes/{id}/approve',
	      method: 'PUT',
	      failedEvent: 'course.{id}.receive.confirmation.failure',
	      completedEvent: 'course.{id}.receive.confirmation.complete'
	    },
	    'course.*.send.studentUpdate': {
	      url: 'api/user/courses/{id}/student',
	      method: 'PATCH',
	      failedEvent: 'course.*.send.studentUpdate.failure',
	      completedEvent: 'course.*.receive.studentUpdate.complete'
	    }
	  }
	};

	module.exports = settings;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter2, STEP_TYPES, _, api, channel, fetch, get, getCurrentPanel, init, load, quickLoad, steps, update, user,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	EventEmitter2 = __webpack_require__(5);

	api = __webpack_require__(37);

	steps = {};

	_ = __webpack_require__(3);

	user = __webpack_require__(75);

	channel = new EventEmitter2({
	  wildcard: true
	});

	STEP_TYPES = {
	  'free-response': ['free_response'],
	  'multiple-choice': ['answer_id', 'is_completed']
	};

	quickLoad = function(stepId, data) {
	  steps[stepId] = data;
	  return channel.emit("quickLoad." + stepId, {
	    data: data
	  });
	};

	load = function(stepId, data) {
	  var temp_free_response;
	  temp_free_response = steps[stepId].temp_free_response;
	  steps[stepId] = _.extend({
	    temp_free_response: temp_free_response
	  }, data);
	  return channel.emit("load." + stepId, {
	    data: data
	  });
	};

	update = function(eventData) {
	  var data;
	  data = eventData.data;
	  return load(data.id, data);
	};

	fetch = function(stepId) {
	  var eventData;
	  eventData = {
	    data: {
	      id: stepId
	    },
	    status: 'loading'
	  };
	  channel.emit("fetch." + stepId, eventData);
	  return api.channel.emit("exercise." + stepId + ".send.fetch", eventData);
	};

	getCurrentPanel = function(stepId) {
	  var formats, panel, question, ref, ref1, step;
	  panel = 'review';
	  step = steps[stepId];
	  question = step != null ? (ref = step.content) != null ? (ref1 = ref.questions) != null ? ref1[0] : void 0 : void 0 : void 0;
	  if (question == null) {
	    return panel;
	  }
	  formats = question.formats;
	  _.find(STEP_TYPES, function(stepChecks, format) {
	    var isStepCompleted;
	    if (indexOf.call(formats, format) < 0) {
	      return false;
	    }
	    isStepCompleted = _.reduce(stepChecks, function(isOtherCompleted, currentCheck) {
	      return (step[currentCheck] != null) && step[currentCheck] && isOtherCompleted;
	    }, true);
	    if (!isStepCompleted) {
	      panel = format;
	      return true;
	    }
	  });
	  return panel;
	};

	get = function(stepId) {
	  return steps[stepId];
	};

	init = function() {
	  user.channel.on('logout.received', function() {
	    return steps = {};
	  });
	  return api.channel.on("exercise.*.receive.*", update);
	};

	module.exports = {
	  fetch: fetch,
	  getCurrentPanel: getCurrentPanel,
	  get: get,
	  init: init,
	  channel: channel,
	  quickLoad: quickLoad
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var BLANK_USER, Course, EventEmitter2, React, User, _, api;

	_ = __webpack_require__(3);

	React = __webpack_require__(2);

	EventEmitter2 = __webpack_require__(5);

	Course = __webpack_require__(76);

	api = __webpack_require__(37);

	BLANK_USER = {
	  is_admin: false,
	  is_content_analyst: false,
	  is_customer_service: false,
	  name: null,
	  profile_url: null,
	  courses: [],
	  _course_data: [],
	  isLoaded: false,
	  isLoggingOut: false
	};

	User = {
	  channel: new EventEmitter2({
	    wildcard: true
	  }),
	  update: function(data) {
	    var pending;
	    _.extend(this, data.user);
	    this._course_data = data.courses;
	    pending = this.validatedPendingCourses();
	    this.courses = _.compact(_.map(data.courses, function(course) {
	      if (course.is_concept_coach && _.detect(course.roles, function(role) {
	        return role.type === 'student';
	      })) {
	        return new Course(course);
	      }
	    }));
	    _.each(pending, (function(_this) {
	      return function(course) {
	        _this.courses.push(course);
	        return course.register(course.enrollment_code, _this);
	      };
	    })(this));
	    return this.channel.emit('change');
	  },
	  validatedPendingCourses: function() {
	    return _.filter(this.courses, function(course) {
	      return course.isValidated();
	    });
	  },
	  isTeacherForCourse: function(collectionUUID) {
	    var course;
	    course = _.findWhere(this._course_data, {
	      ecosystem_book_uuid: collectionUUID
	    });
	    return course && _.detect(course.roles, function(role) {
	      return role.type === 'teacher';
	    });
	  },
	  status: function(collectionUUID) {
	    var course;
	    course = this.getCourse(collectionUUID);
	    return {
	      isLoggedIn: this.isLoggedIn(),
	      isLoaded: this.isLoaded,
	      isRegistered: !!(course != null ? course.isRegistered() : void 0),
	      preValidate: (!this.isLoggedIn()) && (!(course != null ? course.isValidated() : void 0))
	    };
	  },
	  getCourse: function(collectionUUID) {
	    return _.findWhere(this.courses, {
	      ecosystem_book_uuid: collectionUUID
	    });
	  },
	  registeredCourses: function() {
	    return _.filter(this.courses, function(course) {
	      return course.isRegistered();
	    });
	  },
	  findOrCreateCourse: function(collectionUUID) {
	    var course;
	    return this.getCourse(collectionUUID) || (course = new Course({
	      ecosystem_book_uuid: collectionUUID
	    }), this.courses.push(course), course);
	  },
	  ensureStatusLoaded: function(force) {
	    if (force == null) {
	      force = false;
	    }
	    if (force || !this.isLoggedIn()) {
	      return api.channel.emit('user.status.send.fetch');
	    }
	  },
	  isLoggedIn: function() {
	    return !!this.profile_url;
	  },
	  onCourseUpdate: function(course) {
	    this.channel.emit('change');
	    return this.ensureStatusLoaded(true);
	  },
	  removeCourse: function(course) {
	    var index;
	    index = this.courses.indexOf(course);
	    if (index !== -1) {
	      this.courses.splice(index, 1);
	    }
	    return this.channel.emit('change');
	  },
	  _signalLogoutCompleted: function() {
	    _.extend(this, BLANK_USER);
	    this.isLoggingOut = true;
	    return this.channel.emit('logout.received');
	  },
	  init: function() {
	    return api.channel.on('user.status.receive.*', function(arg) {
	      var data;
	      data = arg.data;
	      User.isLoaded = true;
	      if (data.access_token) {
	        api.channel.emit('set.access_token', data.access_token);
	      }
	      User.endpoints = data.endpoints;
	      if (data.user) {
	        return User.update(data);
	      } else {
	        _.extend(this, BLANK_USER);
	        return User.channel.emit('change');
	      }
	    });
	  },
	  destroy: function() {
	    User.channel.removeAllListeners();
	    _.invoke(this.courses, 'destroy');
	    return this.courses = [];
	  }
	};

	_.extend(User, BLANK_USER);

	User.endpoints = {};

	module.exports = User;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var Course, ERROR_MAP, EventEmitter2, React, _, api;

	_ = __webpack_require__(3);

	React = __webpack_require__(2);

	EventEmitter2 = __webpack_require__(5);

	api = __webpack_require__(37);

	ERROR_MAP = {
	  invalid_enrollment_code: 'This is not a valid enrollment code for this book. Please try again. Contact your instructor to verify your enrollment code.',
	  enrollment_code_does_not_match_book: 'The enrollment code is invalid for this content',
	  already_enrolled: 'You are already enrolled in this course',
	  multiple_roles: 'You are listed as both  teacher and a student',
	  dropped_student: 'Your account is  unable to participate at this time',
	  already_processed: 'The request has already been processed',
	  already_approved: 'The request has already been approved',
	  already_rejected: 'The request has been rejected',
	  taken: 'The Student ID is already a member'
	};

	Course = (function() {
	  function Course(attributes) {
	    this.channel = new EventEmitter2;
	    _.extend(this, attributes);
	    _.bindAll(this, '_onRegistered', '_onConfirmed', '_onValidated', '_onStudentUpdated');
	  }

	  Course.prototype.isRegistered = function() {
	    return this.id && !(this.isIncomplete() || this.isPending());
	  };

	  Course.prototype.isIncomplete = function() {
	    return !(this.name || this.to);
	  };

	  Course.prototype.isValidated = function() {
	    return this.status === "validated";
	  };

	  Course.prototype.isPending = function() {
	    return this.status === "pending";
	  };

	  Course.prototype.resetToBlankState = function() {
	    delete this.to;
	    delete this.name;
	    return this.channel.emit('change');
	  };

	  Course.prototype.description = function() {
	    var msg;
	    if (this.isIncomplete()) {
	      return "";
	    } else if (this.isPending()) {
	      msg = this.describeMovePart(this.to);
	      if (this.from) {
	        return "from " + (this.describeMovePart(this.from)) + " to " + msg;
	      } else {
	        return msg;
	      }
	    } else {
	      return this.name + " " + (_.first(this.periods).name);
	    }
	  };

	  Course.prototype.describeMovePart = function(part) {
	    if (!part) {
	      return '';
	    }
	    return part.course.name + " (" + part.period.name + ") by " + (this.teacherNames(part));
	  };

	  Course.prototype.teacherNames = function(part) {
	    var names, teachers;
	    teachers = part.course.teachers;
	    names = _.map(teachers, function(teacher) {
	      return teacher.name || (teacher.first_name + " " + teacher.last_name);
	    });
	    if (names.length > 1) {
	      return names.slice(0, names.length - 1).join(', ') + " and " + names.slice(-1);
	    } else {
	      return _.first(names);
	    }
	  };

	  Course.prototype.hasErrors = function() {
	    return !_.isEmpty(this.errors);
	  };

	  Course.prototype.errorMessages = function() {
	    return _.map(this.errors, function(err) {
	      return ERROR_MAP[err.code];
	    });
	  };

	  Course.prototype.clone = function() {
	    return new Course({
	      ecosystem_book_uuid: this.ecosystem_book_uuid
	    });
	  };

	  Course.prototype.persist = function(user) {
	    var other, ref, ref1;
	    other = user.findOrCreateCourse(this.ecosystem_book_uuid);
	    _.extend(other, (ref = this.to) != null ? ref.course : void 0);
	    other.status = this.status;
	    other.enrollment_code = this.enrollment_code;
	    other.periods = [(ref1 = this.to) != null ? ref1.period : void 0];
	    return user.onCourseUpdate(other);
	  };

	  Course.prototype._onValidated = function(response) {
	    var data;
	    data = response.data;
	    delete this.isBusy;
	    this.errors = data != null ? data.errors : void 0;
	    if (this.errors) {
	      response.stopErrorDisplay = true;
	    }
	    if ((data != null ? data.response : void 0) === true) {
	      this.status = 'validated';
	    }
	    return this.channel.emit('change');
	  };

	  Course.prototype.confirm = function(studentId) {
	    var payload;
	    payload = {
	      id: this.id
	    };
	    if (!_.isEmpty(studentId)) {
	      payload.student_identifier = studentId;
	    }
	    this.isBusy = true;
	    api.channel.once("course." + this.id + ".receive.confirmation.*", this._onConfirmed);
	    api.channel.emit("course." + this.id + ".send.confirmation", {
	      data: payload
	    });
	    return this.channel.emit('change');
	  };

	  Course.prototype._onConfirmed = function(response) {
	    var data;
	    if (_.isEmpty(response)) {
	      throw new Error("response is empty in onConfirmed");
	    }
	    data = response.data;
	    if (data != null ? data.to : void 0) {
	      _.extend(this, data.to.course);
	      this.periods = [data.to.period];
	    }
	    this.errors = data != null ? data.errors : void 0;
	    if (this.errors) {
	      response.stopErrorDisplay = true;
	    }
	    if (!this.hasErrors()) {
	      delete this.status;
	    }
	    delete this.isBusy;
	    return this.channel.emit('change');
	  };

	  Course.prototype.register = function(enrollment_code, user) {
	    var data;
	    this.enrollment_code = enrollment_code;
	    data = {
	      enrollment_code: enrollment_code,
	      book_uuid: this.ecosystem_book_uuid
	    };
	    this.isBusy = true;
	    if (user.isLoggedIn()) {
	      api.channel.once("course." + this.ecosystem_book_uuid + ".receive.registration.*", this._onRegistered);
	      api.channel.emit("course." + this.ecosystem_book_uuid + ".send.registration", {
	        data: data
	      });
	    } else {
	      api.channel.once("course." + this.ecosystem_book_uuid + ".receive.prevalidation.*", this._onValidated);
	      api.channel.emit("course." + this.ecosystem_book_uuid + ".send.prevalidation", {
	        data: data
	      });
	    }
	    return this.channel.emit('change');
	  };

	  Course.prototype._onStudentUpdated = function(response) {
	    if (response != null ? response.data : void 0) {
	      _.extend(this, response.data);
	    }
	    return this.channel.emit('change');
	  };

	  Course.prototype.updateStudent = function(attributes) {
	    var data;
	    data = _.extend({}, attributes, {
	      id: this.id
	    });
	    api.channel.once("course." + this.ecosystem_book_uuid + ".receive.studentUpdate.*", this._onStudentUpdated);
	    return api.channel.emit("course." + this.ecosystem_book_uuid + ".send.studentUpdate", {
	      data: data
	    });
	  };

	  Course.prototype._onRegistered = function(response) {
	    var data;
	    if (_.isEmpty(response)) {
	      throw new Error("response is empty in onRegistered");
	    }
	    data = response.data;
	    if (data) {
	      _.extend(this, data);
	    }
	    this.errors = data != null ? data.errors : void 0;
	    this.is_concept_coach = true;
	    if (this.errors) {
	      response.stopErrorDisplay = true;
	    }
	    delete this.isBusy;
	    return this.channel.emit('change');
	  };

	  Course.prototype.destroy = function() {
	    this.channel.emit('destroy');
	    return this.channel.removeAllListeners();
	  };

	  return Course;

	})();

	module.exports = Course;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var React, Reactive, _, api, classnames, interpolate;

	React = __webpack_require__(10);

	classnames = __webpack_require__(4);

	api = __webpack_require__(37);

	_ = __webpack_require__(3);

	interpolate = __webpack_require__(36);

	Reactive = React.createClass({
	  displayName: 'Reactive',
	  propTypes: {
	    children: React.PropTypes.node.isRequired,
	    store: React.PropTypes.object.isRequired,
	    topic: React.PropTypes.string.isRequired,
	    apiChannelPattern: React.PropTypes.string,
	    channelUpdatePattern: React.PropTypes.string,
	    apiChannelName: React.PropTypes.string,
	    fetcher: React.PropTypes.func,
	    filter: React.PropTypes.func,
	    getStatusMessage: React.PropTypes.func,
	    getter: React.PropTypes.func
	  },
	  getDefaultProps: function() {
	    return {
	      apiChannelPattern: '{apiChannelName}.{topic}.send.*',
	      channelUpdatePattern: 'load.*'
	    };
	  },
	  getInitialState: function() {
	    var apiChannelPattern, channelUpdatePattern, ref, state;
	    ref = this.props, channelUpdatePattern = ref.channelUpdatePattern, apiChannelPattern = ref.apiChannelPattern;
	    state = this.getState();
	    state.status = 'loading';
	    state.storeChannelUpdate = interpolate(channelUpdatePattern, this.props);
	    state.apiChannelSend = interpolate(apiChannelPattern, this.props);
	    return state;
	  },
	  fetchModel: function(props) {
	    var fetcher, store, topic;
	    if (props == null) {
	      props = this.props;
	    }
	    topic = props.topic, store = props.store, fetcher = props.fetcher;
	    if (_.isFunction(fetcher)) {
	      return fetcher(props);
	    } else {
	      return store.fetch(topic);
	    }
	  },
	  getState: function(eventData, props) {
	    var errors, getter, ref, status, store, topic;
	    if (eventData == null) {
	      eventData = {};
	    }
	    if (props == null) {
	      props = this.props;
	    }
	    topic = props.topic, store = props.store, getter = props.getter;
	    status = eventData.status;
	    if (status == null) {
	      status = 'loaded';
	    }
	    errors = eventData != null ? (ref = eventData.data) != null ? ref.errors : void 0 : void 0;
	    return {
	      item: (typeof getter === "function" ? getter(topic) : void 0) || (typeof store.get === "function" ? store.get(topic) : void 0),
	      status: status,
	      errors: errors
	    };
	  },
	  isForThisComponent: function(eventData, props) {
	    var filter, ref, ref1, topic;
	    if (props == null) {
	      props = this.props;
	    }
	    topic = props.topic, filter = props.filter;
	    return (eventData.errors != null) || (typeof filter === "function" ? filter(props, eventData) : void 0) || (eventData != null ? (ref = eventData.data) != null ? ref.id : void 0 : void 0) === topic || (eventData != null ? (ref1 = eventData.data) != null ? ref1.topic : void 0 : void 0) === topic;
	  },
	  update: function(eventData, props) {
	    var nextState;
	    if (props == null) {
	      props = this.props;
	    }
	    if (!this.isForThisComponent(eventData, props)) {
	      return;
	    }
	    nextState = this.getState(eventData, props);
	    return this.setState(nextState);
	  },
	  setStatus: function(eventData) {
	    var status;
	    if (!this.isForThisComponent(eventData)) {
	      return;
	    }
	    status = eventData.status;
	    return this.setState({
	      status: status
	    });
	  },
	  componentWillMount: function() {
	    var apiChannelSend, ref, store, storeChannelUpdate;
	    store = this.props.store;
	    ref = this.state, storeChannelUpdate = ref.storeChannelUpdate, apiChannelSend = ref.apiChannelSend;
	    this.fetchModel();
	    store.channel.on(storeChannelUpdate, this.update);
	    return api.channel.on(apiChannelSend, this.setStatus);
	  },
	  componentWillUnmount: function() {
	    var apiChannelSend, ref, ref1, store, storeChannelUpdate, topic;
	    ref = this.props, topic = ref.topic, store = ref.store;
	    ref1 = this.state, storeChannelUpdate = ref1.storeChannelUpdate, apiChannelSend = ref1.apiChannelSend;
	    store.channel.off(storeChannelUpdate, this.update);
	    return api.channel.off(apiChannelSend, this.setStatus);
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var stubDataForImmediateUpdate;
	    if (nextProps.topic !== this.props.topic) {
	      stubDataForImmediateUpdate = {
	        data: {
	          id: nextProps.topic
	        },
	        status: 'cached'
	      };
	      this.update(stubDataForImmediateUpdate, nextProps);
	      return this.fetchModel(nextProps);
	    }
	  },
	  render: function() {
	    var className, classes, item, propsForChildren, reactiveItems, ref, status;
	    ref = this.state, status = ref.status, item = ref.item;
	    className = this.props.className;
	    classes = classnames('reactive', "reactive-" + status, className, {
	      'is-empty': _.isEmpty(item)
	    });
	    propsForChildren = _.pick(this.state, 'status', 'item', 'errors');
	    reactiveItems = React.Children.map(this.props.children, function(child) {
	      return React.addons.cloneWithProps(child, propsForChildren);
	    });
	    return React.createElement("div", {
	      "className": classes
	    }, reactiveItems);
	  }
	});

	module.exports = {
	  Reactive: Reactive
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var Exercise, ExerciseBase, ExerciseStep, React, Reactive, _, api, apiChannelName, channel, exercises, getCurrentPanel, ref, tasks;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	Exercise = __webpack_require__(6).Exercise;

	ref = exercises = __webpack_require__(74), channel = ref.channel, getCurrentPanel = ref.getCurrentPanel;

	tasks = __webpack_require__(35);

	api = __webpack_require__(37);

	Reactive = __webpack_require__(77).Reactive;

	apiChannelName = 'exercise';

	ExerciseBase = React.createClass({
	  displayName: 'ExerciseBase',
	  getInitialState: function() {
	    var item;
	    item = this.props.item;
	    return {
	      step: item
	    };
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var item;
	    item = nextProps.item;
	    return this.setState({
	      step: item
	    });
	  },
	  componentDidUpdate: function(prevProps, prevState) {
	    var status, step;
	    status = this.props.status;
	    step = this.state.step;
	    return channel.emit("component." + status, {
	      status: status,
	      step: step
	    });
	  },
	  contextTypes: {
	    processHtmlAndMath: React.PropTypes.func
	  },
	  render: function() {
	    var exerciseProps, htmlAndMathProps, step, taskId, wrapperProps;
	    step = this.state.step;
	    taskId = this.props.taskId;
	    if (_.isEmpty(step)) {
	      return null;
	    }
	    exerciseProps = {
	      taskId: step.task_id,
	      step: step,
	      getCurrentPanel: getCurrentPanel,
	      canReview: true,
	      freeResponseValue: step.temp_free_response,
	      setAnswerId: function(id, answerId) {
	        var eventData;
	        step.answer_id = answerId;
	        eventData = {
	          change: step,
	          data: step,
	          status: 'saving'
	        };
	        channel.emit("change." + step.id, eventData);
	        return api.channel.emit("exercise." + step.id + ".send.save", eventData);
	      },
	      setFreeResponseAnswer: function(id, freeResponse) {
	        var eventData;
	        step.free_response = freeResponse;
	        eventData = {
	          change: step,
	          data: step,
	          status: 'saving'
	        };
	        channel.emit("change." + step.id, eventData);
	        return api.channel.emit("exercise." + step.id + ".send.save", eventData);
	      },
	      onFreeResponseChange: function(freeResponse) {
	        return step.temp_free_response = freeResponse;
	      },
	      onContinue: function() {
	        var eventData;
	        step.is_completed = true;
	        eventData = {
	          change: step,
	          data: step,
	          status: 'loading'
	        };
	        channel.emit("change." + step.id, eventData);
	        return api.channel.emit("exercise." + step.id + ".send.complete", eventData);
	      },
	      onStepCompleted: function() {
	        return channel.emit("completed." + step.id);
	      },
	      onNextStep: function() {
	        return channel.emit("leave." + step.id);
	      }
	    };
	    if (taskId != null) {
	      wrapperProps = {
	        'data-step-number': tasks.getStepIndex(taskId, step.id) + 1
	      };
	    }
	    htmlAndMathProps = _.pick(this.context, 'processHtmlAndMath');
	    return React.createElement("div", React.__spread({
	      "className": 'exercise-wrapper'
	    }, wrapperProps), React.createElement(Exercise, React.__spread({}, exerciseProps, htmlAndMathProps, this.props)));
	  }
	});

	ExerciseStep = React.createClass({
	  displayName: 'ExerciseStep',
	  render: function() {
	    var id;
	    id = this.props.id;
	    return React.createElement(Reactive, {
	      "topic": id,
	      "store": exercises,
	      "apiChannelName": apiChannelName
	    }, React.createElement(ExerciseBase, React.__spread({}, this.props)));
	  }
	});

	module.exports = {
	  ExerciseStep: ExerciseStep,
	  channel: channel
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var Breadcrumb, BreadcrumbDynamic, Breadcrumbs, React, _, classnames, exercises, tasks;

	React = __webpack_require__(2);

	classnames = __webpack_require__(4);

	Breadcrumb = __webpack_require__(6).Breadcrumb;

	_ = __webpack_require__(3);

	tasks = __webpack_require__(35);

	exercises = __webpack_require__(74);

	BreadcrumbDynamic = React.createClass({
	  displayName: 'BreadcrumbDynamic',
	  propTypes: {
	    goToStep: React.PropTypes.func.isRequired,
	    step: React.PropTypes.object.isRequired
	  },
	  getInitialState: function() {
	    return {
	      step: this.props.step
	    };
	  },
	  componentWillMount: function() {
	    var id;
	    id = this.props.step.id;
	    return exercises.channel.on("load." + id, this.update);
	  },
	  componentWillUnmount: function() {
	    var id;
	    id = this.props.step.id;
	    return exercises.channel.off("load." + id, this.update);
	  },
	  update: function(eventData) {
	    return this.setState({
	      step: eventData.data
	    });
	  },
	  goToStep: function(stepIndex) {
	    return this.props.goToStep(stepIndex);
	  },
	  render: function() {
	    var crumbProps, step;
	    step = this.state.step;
	    crumbProps = _.omit(this.props, 'step');
	    return React.createElement(Breadcrumb, React.__spread({}, crumbProps, {
	      "step": step,
	      "canReview": true,
	      "goToStep": this.goToStep
	    }));
	  }
	});

	Breadcrumbs = React.createClass({
	  displayName: 'Breadcrumbs',
	  propTypes: {
	    goToStep: React.PropTypes.func.isRequired,
	    moduleUUID: React.PropTypes.string.isRequired,
	    collectionUUID: React.PropTypes.string.isRequired,
	    currentStep: React.PropTypes.number,
	    canReview: React.PropTypes.bool
	  },
	  getInitialState: function() {
	    var collectionUUID, moduleUUID, ref, taskId;
	    ref = this.props, collectionUUID = ref.collectionUUID, moduleUUID = ref.moduleUUID;
	    taskId = collectionUUID + "/" + moduleUUID;
	    return {
	      task: tasks.get(taskId),
	      moduleInfo: tasks.getModuleInfo(taskId)
	    };
	  },
	  makeCrumbEnd: function(label, enabled) {
	    var moduleInfo, reviewEnd;
	    moduleInfo = this.state.moduleInfo;
	    return reviewEnd = {
	      type: 'end',
	      data: {
	        id: "" + label,
	        title: moduleInfo.title
	      },
	      label: label,
	      disabled: !enabled
	    };
	  },
	  render: function() {
	    var breadcrumbs, canReview, crumbs, currentStep, moduleInfo, ref, ref1, reviewEnd, task;
	    ref = this.state, task = ref.task, moduleInfo = ref.moduleInfo;
	    ref1 = this.props, currentStep = ref1.currentStep, canReview = ref1.canReview;
	    if (_.isEmpty(task.steps)) {
	      return null;
	    }
	    crumbs = _.map(task.steps, function(crumbStep, index) {
	      return {
	        data: crumbStep,
	        crumb: true,
	        type: 'step'
	      };
	    });
	    reviewEnd = this.makeCrumbEnd('summary', canReview);
	    crumbs.push(reviewEnd);
	    breadcrumbs = _.map(crumbs, (function(_this) {
	      return function(crumb, index) {
	        var classes, disabled;
	        disabled = crumb.disabled;
	        classes = classnames({
	          disabled: disabled
	        });
	        crumb.key = index;
	        return React.createElement(BreadcrumbDynamic, {
	          "className": classes,
	          "data-label": crumb.label,
	          "key": crumb.data.id,
	          "crumb": crumb,
	          "step": crumb.data || {},
	          "currentStep": currentStep,
	          "goToStep": _this.props.goToStep
	        });
	      };
	    })(this));
	    return React.createElement("div", {
	      "className": 'task-homework'
	    }, React.createElement("div", {
	      "className": 'task-breadcrumbs'
	    }, breadcrumbs));
	  }
	});

	module.exports = {
	  Breadcrumbs: Breadcrumbs
	};


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var BS, ChapterSectionMixin, ContinueToBookButton, ExerciseButton, ExerciseStep, React, ReturnToBookButton, ReviewControls, TaskReview, _, ref, tasks;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	_ = __webpack_require__(3);

	tasks = __webpack_require__(35);

	ChapterSectionMixin = __webpack_require__(6).ChapterSectionMixin;

	ExerciseStep = __webpack_require__(78).ExerciseStep;

	ref = __webpack_require__(81), ExerciseButton = ref.ExerciseButton, ContinueToBookButton = ref.ContinueToBookButton, ReturnToBookButton = ref.ReturnToBookButton;

	ReviewControls = React.createClass({
	  displayName: 'ReviewControls',
	  mixins: [ChapterSectionMixin],
	  propTypes: {
	    moduleUUID: React.PropTypes.string.isRequired,
	    collectionUUID: React.PropTypes.string.isRequired,
	    taskId: React.PropTypes.string.isRequired
	  },
	  render: function() {
	    var collectionUUID, moduleInfo, moduleUUID, ref1, section, taskId;
	    ref1 = this.props, taskId = ref1.taskId, moduleUUID = ref1.moduleUUID, collectionUUID = ref1.collectionUUID;
	    moduleInfo = tasks.getModuleInfo(taskId);
	    section = this.sectionFormat(moduleInfo.chapter_section);
	    return React.createElement(BS.ButtonGroup, {
	      "justified": true,
	      "className": 'concept-coach-task-review-controls'
	    }, React.createElement(ReturnToBookButton, {
	      "className": 'btn-lg',
	      "moduleUUID": moduleUUID,
	      "collectionUUID": collectionUUID,
	      "section": section
	    }), React.createElement(ContinueToBookButton, {
	      "className": 'btn-lg',
	      "moduleUUID": moduleUUID
	    }));
	  }
	});

	TaskReview = React.createClass({
	  displayName: 'TaskReview',
	  propTypes: {
	    moduleUUID: React.PropTypes.string.isRequired,
	    collectionUUID: React.PropTypes.string.isRequired
	  },
	  getInitialState: function() {
	    return this.getSteps(this.props);
	  },
	  componentWillMount: function() {
	    var collectionUUID, moduleUUID, ref1;
	    ref1 = this.props, collectionUUID = ref1.collectionUUID, moduleUUID = ref1.moduleUUID;
	    return tasks.fetchByModule({
	      collectionUUID: collectionUUID,
	      moduleUUID: moduleUUID
	    });
	  },
	  componentWillReceiveProps: function(nextProps) {
	    return this.setState(this.getSteps(nextProps));
	  },
	  getSteps: function(props) {
	    var taskId;
	    taskId = props.taskId;
	    return {
	      completeSteps: tasks.getCompleteSteps(taskId),
	      incompleteSteps: tasks.getIncompleteSteps(taskId)
	    };
	  },
	  render: function() {
	    var collectionUUID, completeSteps, completeStepsReview, completedEnd, completedMessage, incompleteSteps, moduleUUID, ref1, ref2, status, taskId;
	    ref1 = this.state, completeSteps = ref1.completeSteps, incompleteSteps = ref1.incompleteSteps;
	    ref2 = this.props, status = ref2.status, taskId = ref2.taskId, moduleUUID = ref2.moduleUUID, collectionUUID = ref2.collectionUUID;
	    if (_.isEmpty(completeSteps)) {
	      completeStepsReview = React.createElement("div", {
	        "className": 'card-body'
	      }, React.createElement("h3", null, "Exercise to see Review"), React.createElement(ExerciseButton, {
	        "onClick": _.partial(this.props.goToStep, 0)
	      }));
	    } else {
	      completeStepsReview = _.map(completeSteps, function(step) {
	        return React.createElement(ExerciseStep, {
	          "id": step.id,
	          "key": step.id,
	          "pinned": false,
	          "review": 'completed',
	          "focus": false,
	          "taskId": taskId,
	          "allowKeyNext": false
	        });
	      });
	    }
	    if (_.isEmpty(incompleteSteps)) {
	      completedMessage = React.createElement("div", {
	        "className": 'card-body coach-coach-review-completed'
	      }, React.createElement("h2", null, "You\'re done."), React.createElement(ReviewControls, {
	        "taskId": taskId,
	        "moduleUUID": moduleUUID,
	        "collectionUUID": collectionUUID
	      }), React.createElement("p", null, "or review your work below."));
	      completedEnd = React.createElement("div", {
	        "className": 'card-body coach-coach-review-completed'
	      }, React.createElement(ReviewControls, {
	        "taskId": taskId,
	        "moduleUUID": moduleUUID,
	        "collectionUUID": collectionUUID
	      }));
	    }
	    return React.createElement("div", {
	      "className": 'concept-coach-task-review'
	    }, completedMessage, completeStepsReview, completedEnd);
	  }
	});

	module.exports = {
	  TaskReview: TaskReview
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var BS, BookButton, BookLink, BookLinkBase, ContinueToBookButton, EventEmitter2, ExerciseButton, GoToBookLink, React, ReturnToBookButton, _, classnames;

	React = __webpack_require__(10);

	BS = __webpack_require__(16);

	_ = __webpack_require__(3);

	EventEmitter2 = __webpack_require__(5);

	classnames = __webpack_require__(4);

	BookLinkBase = React.createClass({
	  displayName: 'BookLinkBase',
	  propTypes: {
	    children: React.PropTypes.node,
	    collectionUUID: React.PropTypes.string.isRequired,
	    moduleUUID: React.PropTypes.string,
	    link: React.PropTypes.string
	  },
	  contextTypes: {
	    close: React.PropTypes.func,
	    navigator: React.PropTypes.instanceOf(EventEmitter2)
	  },
	  broadcastNav: function(clickEvent) {
	    var close, navigator, onClick, ref;
	    clickEvent.preventDefault();
	    onClick = this.props.onClick;
	    ref = this.context, close = ref.close, navigator = ref.navigator;
	    close();
	    navigator.emit('close.for.book', _.pick(this.props, 'collectionUUID', 'moduleUUID', 'link'));
	    if (typeof onClick === "function") {
	      onClick(clickEvent);
	    }
	    return true;
	  },
	  render: function() {
	    var children;
	    children = this.props.children;
	    if (children == null) {
	      return null;
	    }
	    return React.addons.cloneWithProps(children, {
	      onClick: this.broadcastNav
	    });
	  }
	});

	BookLink = React.createClass({
	  displayName: 'BookLink',
	  propTypes: {
	    children: React.PropTypes.node
	  },
	  render: function() {
	    var children, className, classes, linkProps, ref;
	    ref = this.props, children = ref.children, className = ref.className;
	    linkProps = _.omit(this.props, 'children', 'className');
	    classes = classnames('concept-coach-book-link', className);
	    return React.createElement(BookLinkBase, React.__spread({}, linkProps), React.createElement("a", {
	      "role": 'button',
	      "className": classes
	    }, children));
	  }
	});

	BookButton = React.createClass({
	  displayName: 'BookButton',
	  propTypes: {
	    children: React.PropTypes.node
	  },
	  render: function() {
	    var children, className, classes, linkProps, ref;
	    ref = this.props, children = ref.children, className = ref.className;
	    linkProps = _.omit(this.props, 'children', 'className');
	    classes = classnames('concept-coach-book-link', className);
	    return React.createElement(BookLinkBase, React.__spread({}, linkProps), React.createElement(BS.Button, React.__spread({
	      "className": classes
	    }, linkProps), children));
	  }
	});

	ExerciseButton = React.createClass({
	  displayName: 'ExerciseButton',
	  propTypes: {
	    children: React.PropTypes.node
	  },
	  contextTypes: {
	    navigator: React.PropTypes.instanceOf(EventEmitter2)
	  },
	  getDefaultProps: function() {
	    return {
	      children: 'Exercise'
	    };
	  },
	  showExercise: function() {
	    var base;
	    this.context.navigator.emit('show.task', {
	      view: 'task'
	    });
	    return typeof (base = this.props).onClick === "function" ? base.onClick() : void 0;
	  },
	  render: function() {
	    return React.createElement(BS.Button, {
	      "onClick": this.showExercise
	    }, this.props.children);
	  }
	});

	ContinueToBookButton = React.createClass({
	  displayName: 'ContinueToBookButton',
	  propTypes: {
	    children: React.PropTypes.node,
	    moduleUUID: React.PropTypes.string
	  },
	  contextTypes: {
	    collectionUUID: React.PropTypes.string,
	    getNextPage: React.PropTypes.func
	  },
	  getInitialState: function() {
	    return this.getNextPage();
	  },
	  getDefaultProps: function() {
	    return {
	      bsStyle: 'primary'
	    };
	  },
	  componentWillReceiveProps: function(nextProps, nextContext) {
	    var nextPage;
	    nextPage = this.getNextPage(nextProps, nextContext);
	    return this.setState(nextPage);
	  },
	  getNextPage: function(props, context) {
	    var collectionUUID, fallBack, moduleUUID;
	    if (props == null) {
	      props = this.props;
	    }
	    if (context == null) {
	      context = this.context;
	    }
	    moduleUUID = props.moduleUUID;
	    collectionUUID = context.collectionUUID;
	    fallBack = {
	      nextChapter: 'Reading',
	      nextModuleUUID: moduleUUID
	    };
	    return (typeof context.getNextPage === "function" ? context.getNextPage({
	      moduleUUID: moduleUUID,
	      collectionUUID: collectionUUID
	    }) : void 0) || fallBack;
	  },
	  render: function() {
	    var collectionUUID, continueLabel, nextChapter, nextModuleUUID, props, ref;
	    props = _.omit(this.props, 'children');
	    ref = this.state, nextChapter = ref.nextChapter, nextModuleUUID = ref.nextModuleUUID;
	    collectionUUID = this.context.collectionUUID;
	    if (!_.isEmpty(this.props.children)) {
	      continueLabel = this.props.children;
	    }
	    if (continueLabel == null) {
	      continueLabel = "Continue to " + nextChapter;
	    }
	    return React.createElement(BookButton, React.__spread({}, props, {
	      "moduleUUID": nextModuleUUID,
	      "collectionUUID": collectionUUID
	    }), continueLabel, React.createElement("i", {
	      "className": 'fa fa-caret-right'
	    }));
	  }
	});

	GoToBookLink = React.createClass({
	  displayName: 'GoToBookLink',
	  contextTypes: {
	    moduleUUID: React.PropTypes.string,
	    collectionUUID: React.PropTypes.string,
	    triggeredFrom: React.PropTypes.shape({
	      moduleUUID: React.PropTypes.string,
	      collectionUUID: React.PropTypes.string
	    })
	  },
	  isFromOpen: function() {
	    var triggeredFrom, viewingInfo;
	    triggeredFrom = this.context.triggeredFrom;
	    viewingInfo = _.pick(this.props, 'moduleUUID', 'collectionUUID');
	    return _.isEqual(triggeredFrom, viewingInfo);
	  },
	  render: function() {
	    var linkAction;
	    linkAction = this.isFromOpen() ? 'Return' : 'Go';
	    return React.createElement(BookLink, React.__spread({}, this.props), linkAction, " to Reading");
	  }
	});

	ReturnToBookButton = React.createClass({
	  displayName: 'ReturnToBookButton',
	  getDefaultProps: function() {
	    return {
	      section: 'Reading'
	    };
	  },
	  render: function() {
	    var className, classes, ref, section;
	    ref = this.props, section = ref.section, className = ref.className;
	    classes = classnames('btn-plain', className);
	    return React.createElement(BookButton, React.__spread({}, this.props, {
	      "className": classes
	    }), React.createElement("i", {
	      "className": 'fa fa-caret-left'
	    }), "Return to ", section);
	  }
	});

	module.exports = {
	  ExerciseButton: ExerciseButton,
	  ContinueToBookButton: ContinueToBookButton,
	  ReturnToBookButton: ReturnToBookButton,
	  GoToBookLink: GoToBookLink,
	  BookLink: BookLink,
	  BookLinkBase: BookLinkBase
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var ChapterSectionMixin, GoToBookLink, React, TaskTitle, _, classnames, tasks;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	tasks = __webpack_require__(35);

	ChapterSectionMixin = __webpack_require__(6).ChapterSectionMixin;

	GoToBookLink = __webpack_require__(81).GoToBookLink;

	TaskTitle = React.createClass({
	  displayName: 'TaskTitle',
	  mixins: [ChapterSectionMixin],
	  contextTypes: {
	    close: React.PropTypes.func,
	    moduleUUID: React.PropTypes.string,
	    collectionUUID: React.PropTypes.string
	  },
	  render: function() {
	    var close, cnxUrl, linkProps, moduleInfo, ref, section, sectionProps, taskId, title, titleClasses;
	    ref = this.props, taskId = ref.taskId, cnxUrl = ref.cnxUrl;
	    close = this.context.close;
	    moduleInfo = tasks.getModuleInfo(taskId, cnxUrl);
	    if (!moduleInfo) {
	      return null;
	    }
	    section = this.sectionFormat(moduleInfo.chapter_section);
	    sectionProps = {
	      className: 'chapter-section-prefix'
	    };
	    if (section != null) {
	      sectionProps['data-section'] = section;
	    }
	    linkProps = _.pick(this.props, 'collectionUUID', 'moduleUUID');
	    linkProps.role = 'button';
	    linkProps.link = moduleInfo.link;
	    if (moduleInfo.title) {
	      linkProps.target = '_blank';
	      title = React.createElement("h3", React.__spread({}, sectionProps), moduleInfo.title);
	    }
	    titleClasses = classnames('concept-coach-title', {
	      'has-title': moduleInfo.title != null
	    });
	    return React.createElement("div", {
	      "className": titleClasses
	    }, title, React.createElement("span", {
	      "className": 'concept-coach-title-link'
	    }, React.createElement(GoToBookLink, React.__spread({}, linkProps))));
	  }
	});

	module.exports = {
	  TaskTitle: TaskTitle
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var NoExercises, React;

	React = __webpack_require__(2);

	NoExercises = React.createClass({
	  displayName: 'NoExercises',
	  render: function() {
	    return React.createElement("div", {
	      "className": 'no-exercises'
	    }, "Sorry, there are no exercises for this module.");
	  }
	});

	module.exports = {
	  NoExercises: NoExercises
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var BS, CloseButton, Course, CourseNameBase, Navigation, React, UserMenu, api, channel, user;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	CloseButton = __webpack_require__(6).CloseButton;

	CourseNameBase = __webpack_require__(85).CourseNameBase;

	Course = __webpack_require__(76);

	user = __webpack_require__(75);

	channel = __webpack_require__(86).channel;

	api = __webpack_require__(37);

	UserMenu = __webpack_require__(89);

	Navigation = React.createClass({
	  displayName: 'Navigation',
	  contextTypes: {
	    close: React.PropTypes.func,
	    view: React.PropTypes.string
	  },
	  propTypes: {
	    course: React.PropTypes.instanceOf(Course)
	  },
	  componentWillMount: function() {
	    user.ensureStatusLoaded();
	    return user.channel.on('change', this.update);
	  },
	  componentWillUnmount: function() {
	    return user.channel.off('change', this.update);
	  },
	  update: function() {
	    if (this.isMounted()) {
	      return this.forceUpdate();
	    }
	  },
	  close: function() {
	    var base;
	    return typeof (base = this.context).close === "function" ? base.close() : void 0;
	  },
	  handleSelect: function(selectedKey) {
	    if (selectedKey != null) {
	      return channel.emit("show." + selectedKey, {
	        view: selectedKey
	      });
	    }
	  },
	  render: function() {
	    var brand, course, courseItems, view;
	    course = this.props.course;
	    view = this.context.view;
	    brand = [
	      React.createElement("span", {
	        "key": 'app',
	        "className": 'navbar-logo'
	      }, React.createElement("strong", null, "Concept"), " Coach"), React.createElement(CourseNameBase, {
	        "key": 'course-name',
	        "className": 'hidden-sm hidden-xs',
	        "course": course
	      })
	    ];
	    if (course != null ? course.isRegistered() : void 0) {
	      courseItems = [
	        React.createElement(BS.NavItem, {
	          "active": view === 'progress',
	          "eventKey": 'progress',
	          "key": 'progress',
	          "className": 'concept-coach-dashboard-nav -progress'
	        }, "My Progress")
	      ];
	    }
	    return React.createElement(BS.Navbar, {
	      "brand": brand,
	      "toggleNavKey": 0.,
	      "fixedTop": true,
	      "fluid": true
	    }, React.createElement(BS.CollapsibleNav, {
	      "eventKey": 0.,
	      "collapsible": true
	    }, React.createElement(BS.Nav, {
	      "right": true,
	      "navbar": true,
	      "activeKey": view,
	      "onSelect": this.handleSelect
	    }, React.createElement(UserMenu, {
	      "course": this.props.course
	    }), courseItems, React.createElement(BS.NavItem, {
	      "onClick": this.close,
	      "className": 'concept-coach-dashboard-nav'
	    }, React.createElement(BS.Button, {
	      "className": 'btn-plain -coach-close'
	    }, "Close")))));
	  }
	});

	module.exports = {
	  Navigation: Navigation,
	  channel: channel
	};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var CourseNameBase, React, _, classnames;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	CourseNameBase = React.createClass({
	  displayName: 'CourseNameBase',
	  getDefaultProps: function() {
	    return {
	      course: {}
	    };
	  },
	  render: function() {
	    var className, classes, course, ref;
	    ref = this.props, course = ref.course, className = ref.className;
	    classes = classnames('concept-coach-course-name', className);
	    return React.createElement("span", {
	      "className": classes
	    }, typeof course.description === "function" ? course.description() : void 0);
	  }
	});

	module.exports = {
	  CourseNameBase: CourseNameBase
	};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter2, _, channel, getDataByView, getViewByRoute, initialize, loader, navigation, settings;

	_ = __webpack_require__(3);

	EventEmitter2 = __webpack_require__(5);

	settings = __webpack_require__(87);

	loader = __webpack_require__(88).loader;

	navigation = {};

	channel = new EventEmitter2({
	  wildcard: true
	});

	initialize = function(options) {
	  _.extend(navigation, options);
	  return loader(navigation, settings.views);
	};

	getDataByView = function(view) {
	  return navigation.views[view];
	};

	getViewByRoute = function(route) {
	  var navData, ref, view;
	  navData = _.findWhere(navigation.views, {
	    route: route
	  });
	  view = navData != null ? (ref = navData.state) != null ? ref.view : void 0 : void 0;
	  if (view != null) {
	    if (view === 'default') {
	      view = 'task';
	    }
	  }
	  return view;
	};

	module.exports = {
	  channel: channel,
	  initialize: initialize,
	  getDataByView: getDataByView,
	  getViewByRoute: getViewByRoute
	};


/***/ },
/* 87 */
/***/ function(module, exports) {

	var DEFAULT_PATTERN, settings;

	DEFAULT_PATTERN = '{prefix}{base}{view}';

	settings = {
	  views: {
	    profile: DEFAULT_PATTERN,
	    prevalidate: DEFAULT_PATTERN,
	    dashboard: DEFAULT_PATTERN,
	    task: DEFAULT_PATTERN,
	    registration: DEFAULT_PATTERN,
	    progress: DEFAULT_PATTERN,
	    loading: DEFAULT_PATTERN,
	    login: DEFAULT_PATTERN,
	    student_id: DEFAULT_PATTERN,
	    logout: DEFAULT_PATTERN,
	    "default": '{prefix}{base}',
	    close: '{prefix}'
	  }
	};

	module.exports = settings;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var _, interpolate, loader, makeViewSettings;

	_ = __webpack_require__(3);

	interpolate = __webpack_require__(36);

	makeViewSettings = function(viewOptions, routePattern, view) {
	  var route;
	  viewOptions = _.extend({}, viewOptions, {
	    view: view
	  });
	  route = interpolate(routePattern, viewOptions);
	  return {
	    state: {
	      view: view
	    },
	    route: route
	  };
	};

	loader = function(model, viewSettings) {
	  var viewOptions;
	  viewOptions = _.pick(model, 'prefix', 'base');
	  return model.views = _.mapObject(viewSettings, _.partial(makeViewSettings, viewOptions));
	};

	module.exports = {
	  loader: loader
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var BS, CloseButton, Course, EventEmitter2, React, Status, UserMenu, api, getWaitingText;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	EventEmitter2 = __webpack_require__(5);

	CloseButton = __webpack_require__(6).CloseButton;

	Status = __webpack_require__(90);

	Course = __webpack_require__(76);

	api = __webpack_require__(37);

	getWaitingText = function(status) {
	  return status + "…";
	};

	UserMenu = React.createClass({displayName: "UserMenu",
	  mixins: [Status],
	  contextTypes: {
	    close: React.PropTypes.func,
	    navigator: React.PropTypes.instanceOf(EventEmitter2)
	  },
	  propTypes: {
	    course: React.PropTypes.instanceOf(Course)
	  },
	  componentWillMount: function() {
	    return this.getUser().ensureStatusLoaded();
	  },
	  logoutUser: function(clickEvent) {
	    clickEvent.preventDefault();
	    return this.context.navigator.emit('show.logout', {
	      view: 'logout'
	    });
	  },
	  showProfile: function(clickEvent) {
	    clickEvent.preventDefault();
	    return this.context.navigator.emit('show.profile', {
	      view: 'profile'
	    });
	  },
	  updateStudentId: function(clickEvent) {
	    clickEvent.preventDefault();
	    return this.context.navigator.emit('show.student_id', {
	      view: 'student_id'
	    });
	  },
	  update: function() {
	    if (this.isMounted()) {
	      return this.forceUpdate();
	    }
	  },
	  close: function(clickEvent) {
	    var base;
	    clickEvent.preventDefault();
	    return typeof (base = this.context).close === "function" ? base.close() : void 0;
	  },
	  modifyCourse: function(clickEvent) {
	    clickEvent.preventDefault();
	    return this.context.navigator.emit('show.registration', {
	      view: 'registration'
	    });
	  },
	  renderCourseOption: function() {
	    var courseChangeText, ref;
	    if ((ref = this.props.course) != null ? ref.isRegistered() : void 0) {
	      courseChangeText = 'Change Course';
	    } else {
	      courseChangeText = 'Register for Course';
	    }
	    return React.createElement(BS.MenuItem, {
	      "onClick": this.modifyCourse
	    }, courseChangeText);
	  },
	  renderStudentIdOption: function() {
	    var ref;
	    if (!((ref = this.props.course) != null ? ref.isRegistered() : void 0)) {
	      return null;
	    }
	    return React.createElement(BS.MenuItem, {
	      "onClick": this.updateStudentId
	    }, "Change student ID");
	  },
	  render: function() {
	    var user;
	    user = this.getUser();
	    if (!user.isLoggedIn()) {
	      return null;
	    }
	    return React.createElement(BS.DropdownButton, {
	      "navItem": true,
	      "className": 'concept-coach-user',
	      "title": user.name
	    }, this.renderCourseOption(), React.createElement(BS.MenuItem, {
	      "onClick": this.showProfile
	    }, "Account Profile"), this.renderStudentIdOption(), React.createElement(BS.MenuItem, {
	      "onClick": this.logoutUser
	    }, "Logout"));
	  }
	});

	module.exports = UserMenu;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var User, UserStatusMixin;

	User = __webpack_require__(75);

	UserStatusMixin = {
	  componentDidMount: function() {
	    return User.channel.on("change", this.onUserChange);
	  },
	  componentWillUnmount: function() {
	    return User.channel.off("change", this.onUserChange);
	  },
	  onUserChange: function() {
	    if (this.isMounted()) {
	      return this.forceUpdate();
	    }
	  },
	  getUser: function() {
	    return User;
	  }
	};

	module.exports = UserStatusMixin;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var Course, CourseRegistration, EnrollOrLogin, ModifyCourseRegistration, NewCourseRegistration, React, UserStatus;

	React = __webpack_require__(2);

	NewCourseRegistration = __webpack_require__(92);

	ModifyCourseRegistration = __webpack_require__(99);

	EnrollOrLogin = __webpack_require__(100);

	UserStatus = __webpack_require__(90);

	Course = __webpack_require__(76);

	CourseRegistration = React.createClass({displayName: "CourseRegistration",
	  propTypes: {
	    collectionUUID: React.PropTypes.string.isRequired
	  },
	  mixins: [UserStatus],
	  render: function() {
	    var body, course, user;
	    user = this.getUser();
	    course = user.getCourse(this.props.collectionUUID);
	    body = course && course.isRegistered() ? React.createElement(ModifyCourseRegistration, React.__spread({}, this.props, {
	      "course": course
	    })) : user.isLoggedIn() ? React.createElement(NewCourseRegistration, React.__spread({}, this.props)) : React.createElement(EnrollOrLogin, React.__spread({}, this.props));
	    return React.createElement("div", {
	      "className": "row"
	    }, body);
	  }
	});

	module.exports = CourseRegistration;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var ConfirmJoin, Course, ENTER, InviteCodeInput, Navigation, NewCourseRegistration, React, User, _;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	Course = __webpack_require__(76);

	User = __webpack_require__(75);

	ENTER = 'Enter';

	InviteCodeInput = __webpack_require__(93);

	ConfirmJoin = __webpack_require__(97);

	Navigation = __webpack_require__(86);

	User = __webpack_require__(75);

	NewCourseRegistration = React.createClass({displayName: "NewCourseRegistration",
	  propTypes: {
	    collectionUUID: React.PropTypes.string.isRequired,
	    validateOnly: React.PropTypes.bool,
	    title: React.PropTypes.string,
	    course: React.PropTypes.instanceOf(Course)
	  },
	  getDefaultProps: function() {
	    return {
	      title: 'Register for this Concept Coach course'
	    };
	  },
	  componentWillMount: function() {
	    var course;
	    course = this.props.course || User.getCourse(this.props.collectionUUID) || new Course({
	      ecosystem_book_uuid: this.props.collectionUUID
	    });
	    course.channel.on('change', this.onCourseChange);
	    return this.setState({
	      course: course
	    });
	  },
	  componentWillUnmount: function() {
	    return this.state.course.channel.off('change', this.onCourseChange);
	  },
	  onComplete: function() {
	    this.state.course.persist(User);
	    return Navigation.channel.emit('show');
	  },
	  onCourseChange: function() {
	    if (this.state.course.isRegistered()) {
	      _.delay(this.onComplete, 1500);
	    } else if (this.state.course.isValidated()) {
	      this.onComplete();
	    }
	    return this.forceUpdate();
	  },
	  renderValidated: function() {
	    return React.createElement("p", {
	      "className": "lead"
	    }, "Redirecting to login...");
	  },
	  renderComplete: function(course) {
	    return React.createElement("h3", {
	      "className": "text-center"
	    }, "You have successfully joined ", course.description());
	  },
	  isTeacher: function() {
	    return User.isTeacherForCourse(this.props.collectionUUID);
	  },
	  renderCurrentStep: function() {
	    var course, title;
	    course = this.state.course;
	    if (course.isValidated()) {
	      return this.renderValidated();
	    } else if (course.isIncomplete()) {
	      title = this.isTeacher() ? '' : this.props.title;
	      return React.createElement(InviteCodeInput, {
	        "course": course,
	        "currentCourses": User.registeredCourses(),
	        "title": title
	      });
	    } else if (course.isPending()) {
	      return React.createElement(ConfirmJoin, {
	        "title": "Would you like to join " + (this.state.course.description()) + "?",
	        "course": course
	      });
	    } else {
	      return this.renderComplete(course);
	    }
	  },
	  teacherMessage: function() {
	    return React.createElement("div", {
	      "className": "teacher-message"
	    }, React.createElement("p", {
	      "className": "lead"
	    }, "Welcome!"), React.createElement("p", {
	      "className": "lead"
	    }, "To see the student view of your course in Concept Coach,\nenter an enrollment code from one of your sections."), React.createElement("p", null, "We suggest creating a test section for yourself so you can\nseparate your Concept Coach responses from those of your students."));
	  },
	  render: function() {
	    return React.createElement("div", {
	      "className": "new-registration"
	    }, (this.isTeacher() ? this.teacherMessage() : void 0), this.renderCurrentStep());
	  }
	});

	module.exports = NewCourseRegistration;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var AsyncButton, BS, Course, CourseListing, ENTER, ErrorList, InviteCodeInput, React, User;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	ENTER = 'Enter';

	CourseListing = __webpack_require__(94).CourseListing;

	ErrorList = __webpack_require__(96);

	Course = __webpack_require__(76);

	AsyncButton = __webpack_require__(6).AsyncButton;

	User = __webpack_require__(75);

	InviteCodeInput = React.createClass({displayName: "InviteCodeInput",
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    course: React.PropTypes.instanceOf(Course).isRequired,
	    currentCourses: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Course))
	  },
	  startRegistration: function() {
	    return this.props.course.register(this.refs.input.getValue(), User);
	  },
	  onKeyPress: function(ev) {
	    if (this.props.course.isBusy) {
	      return;
	    }
	    if (ev.key === ENTER) {
	      return this.startRegistration();
	    }
	  },
	  renderCurrentCourses: function() {
	    return React.createElement("div", {
	      "className": 'text-center'
	    }, React.createElement("h3", null, "You are not registered for this course."), React.createElement("p", null, "Did you mean to go to one of these?"), React.createElement(CourseListing, {
	      "courses": this.props.currentCourses
	    }));
	  },
	  render: function() {
	    var button, ref;
	    button = React.createElement(AsyncButton, {
	      "isWaiting": !!this.props.course.isBusy,
	      "waitingText": 'Registering…',
	      "onClick": this.startRegistration
	    }, "Enroll");
	    return React.createElement("div", {
	      "className": "form-group"
	    }, (((ref = this.props.currentCourses) != null ? ref.length : void 0) ? this.renderCurrentCourses() : void 0), React.createElement("h3", {
	      "className": "text-center"
	    }, this.props.title), React.createElement("hr", null), React.createElement(ErrorList, {
	      "course": this.props.course
	    }), React.createElement("div", {
	      "className": "code-wrapper col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12"
	    }, React.createElement(BS.Input, {
	      "type": "text",
	      "ref": "input",
	      "label": "Enter the two-word enrollment code",
	      "placeholder": "enrollment code",
	      "autoFocus": true,
	      "onKeyPress": this.onKeyPress,
	      "buttonAfter": button
	    })));
	  }
	});

	module.exports = InviteCodeInput;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var BS, CourseItem, CourseListing, React, _;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	_ = __webpack_require__(3);

	CourseItem = __webpack_require__(95).CourseItem;

	CourseListing = React.createClass({
	  displayName: 'CourseListing',
	  getDefaultProps: function() {
	    return {
	      disabled: false
	    };
	  },
	  render: function() {
	    var courses, listedCourses;
	    courses = this.props.courses;
	    listedCourses = _.map(courses, function(course) {
	      return React.createElement(CourseItem, {
	        "key": "course-" + course.id,
	        "course": course
	      });
	    });
	    return React.createElement(BS.ListGroup, {
	      "className": 'concept-coach-courses-listing'
	    }, listedCourses);
	  }
	});

	module.exports = {
	  CourseListing: CourseListing
	};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var BS, BookLinkBase, CourseItem, EventEmitter2, React, _, interpolate, navigation;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	EventEmitter2 = __webpack_require__(5);

	interpolate = __webpack_require__(36);

	_ = __webpack_require__(3);

	BookLinkBase = __webpack_require__(81).BookLinkBase;

	navigation = __webpack_require__(86);

	CourseItem = React.createClass({
	  displayName: 'CourseItem',
	  contextTypes: {
	    cnxUrl: React.PropTypes.string,
	    bookUrlPattern: React.PropTypes.string
	  },
	  getLink: function() {
	    var bookUrlPattern, cnxUrl, course, ecosystem_book_uuid, link, ref, routeData;
	    course = this.props.course;
	    ref = this.context, cnxUrl = ref.cnxUrl, bookUrlPattern = ref.bookUrlPattern;
	    ecosystem_book_uuid = course.ecosystem_book_uuid;
	    if (bookUrlPattern == null) {
	      bookUrlPattern = '';
	    }
	    link = interpolate(bookUrlPattern, {
	      cnxUrl: cnxUrl,
	      ecosystem_book_uuid: ecosystem_book_uuid
	    });
	    routeData = navigation.getDataByView('task');
	    return "" + link + routeData.route;
	  },
	  render: function() {
	    var category, course, ecosystem_book_uuid, link, ref;
	    course = this.props.course;
	    if (!course.isRegistered()) {
	      return null;
	    }
	    ecosystem_book_uuid = course.ecosystem_book_uuid;
	    link = this.getLink();
	    category = ((ref = course.catalog_offering_identifier) != null ? ref.toLowerCase() : void 0) || 'unknown';
	    return React.createElement(BookLinkBase, {
	      "collectionUUID": ecosystem_book_uuid,
	      "link": link
	    }, React.createElement(BS.ListGroupItem, {
	      "className": 'concept-coach-course-item',
	      "data-category": category
	    }, course.description()));
	  }
	});

	module.exports = {
	  CourseItem: CourseItem
	};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var Course, ErrorList, React;

	React = __webpack_require__(2);

	Course = __webpack_require__(76);

	ErrorList = React.createClass({displayName: "ErrorList",
	  propTypes: {
	    course: React.PropTypes.instanceOf(Course).isRequired
	  },
	  render: function() {
	    var i, msg;
	    if (!this.props.course.hasErrors()) {
	      return null;
	    }
	    return React.createElement("div", {
	      "className": "alert alert-danger"
	    }, React.createElement("ul", {
	      "className": "errors"
	    }, (function() {
	      var j, len, ref, results;
	      ref = this.props.course.errorMessages();
	      results = [];
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        msg = ref[i];
	        results.push(React.createElement("li", {
	          "key": i
	        }, msg));
	      }
	      return results;
	    }).call(this)));
	  }
	});

	module.exports = ErrorList;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var AsyncButton, BS, ConfirmJoin, Course, ENTER, ErrorList, React, RequestStudentId;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	ENTER = 'Enter';

	RequestStudentId = __webpack_require__(98);

	Course = __webpack_require__(76);

	ErrorList = __webpack_require__(96);

	AsyncButton = __webpack_require__(6).AsyncButton;

	ConfirmJoin = React.createClass({displayName: "ConfirmJoin",
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    course: React.PropTypes.instanceOf(Course).isRequired,
	    optionalStudentId: React.PropTypes.bool
	  },
	  onCancel: function() {
	    return this.props.course.resetToBlankState();
	  },
	  startConfirmation: function(studentId) {
	    return this.props.course.confirm(studentId);
	  },
	  render: function() {
	    var label;
	    label = this.props.optionalStudentId ? React.createElement("span", null, "Update school issued ID", React.createElement("br", null), "(", React.createElement("i", null, "leave blank to leave unchanged"), "):") : "Enter your school issued ID:";
	    return React.createElement(BS.Row, null, React.createElement(RequestStudentId, React.__spread({
	      "onCancel": this.onCancel,
	      "onSubmit": this.startConfirmation,
	      "saveButtonLabel": "Confirm",
	      "label": label,
	      "onConfirmationCancel": this.onCancel
	    }, this.props)));
	  }
	});

	module.exports = ConfirmJoin;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var AsyncButton, BS, Course, ENTER, ErrorList, React, RequestStudentId;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	ENTER = 'Enter';

	Course = __webpack_require__(76);

	ErrorList = __webpack_require__(96);

	AsyncButton = __webpack_require__(6).AsyncButton;

	RequestStudentId = React.createClass({displayName: "RequestStudentId",
	  propTypes: {
	    onCancel: React.PropTypes.func.isRequired,
	    onSubmit: React.PropTypes.func.isRequired,
	    label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
	    saveButtonLabel: React.PropTypes.string.isRequired,
	    title: React.PropTypes.string.isRequired,
	    course: React.PropTypes.instanceOf(Course).isRequired
	  },
	  startConfirmation: function() {
	    return this.props.course.confirm(this.refs.input.getValue());
	  },
	  onKeyPress: function(ev) {
	    if (ev.key === ENTER) {
	      return this.onSubmit();
	    }
	  },
	  onSubmit: function() {
	    return this.props.onSubmit(this.refs.input.getValue());
	  },
	  render: function() {
	    var button;
	    button = React.createElement(AsyncButton, {
	      "className": "btn btn-success",
	      "isWaiting": !!this.props.course.isBusy,
	      "waitingText": 'Confirming…',
	      "onClick": this.onSubmit
	    }, this.props.saveButtonLabel);
	    return React.createElement("div", {
	      "className": "request-student-id form-group"
	    }, React.createElement("h3", {
	      "className": "text-center"
	    }, this.props.title), React.createElement(ErrorList, {
	      "course": this.props.course
	    }), React.createElement("div", {
	      "className": 'panels'
	    }, React.createElement("div", {
	      "className": 'field'
	    }, React.createElement(BS.Input, {
	      "type": "text",
	      "ref": "input",
	      "label": this.props.label,
	      "placeholder": "School issued ID",
	      "autoFocus": true,
	      "onKeyPress": this.onKeyPress,
	      "buttonAfter": button
	    })), React.createElement("div", {
	      "className": "cancel"
	    }, React.createElement("button", {
	      "className": "btn",
	      "onClick": this.props.onCancel
	    }, "Cancel"))));
	  }
	});

	module.exports = RequestStudentId;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var ConfirmJoin, Course, InviteCodeInput, ModifyCourseRegistration, Navigation, React, RequestStudentId, User, _;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	InviteCodeInput = __webpack_require__(93);

	RequestStudentId = __webpack_require__(98);

	ConfirmJoin = __webpack_require__(97);

	User = __webpack_require__(75);

	Course = __webpack_require__(76);

	Navigation = __webpack_require__(86);

	ModifyCourseRegistration = React.createClass({displayName: "ModifyCourseRegistration",
	  propTypes: {
	    course: React.PropTypes.instanceOf(Course)
	  },
	  getInitialState: function() {
	    var course;
	    course = this.props.course.clone();
	    course.channel.on('change', this.onCourseChange);
	    return {
	      course: course,
	      original: this.props.course
	    };
	  },
	  componentWillUnmount: function() {
	    return this.state.course.channel.off('change', this.onCourseChange);
	  },
	  onCourseChange: function() {
	    if (this.state.course.isRegistered()) {
	      _.delay(this.onComplete, 1500);
	    }
	    return this.forceUpdate();
	  },
	  showTasks: function() {
	    return Navigation.channel.emit('show.panel', {
	      view: 'task'
	    });
	  },
	  onComplete: function() {
	    this.state.course.persist(User);
	    return this.showTasks();
	  },
	  renderComplete: function(course) {
	    return React.createElement("h3", {
	      "className": "text-center"
	    }, "You have successfully modified your registration to be ", course.description());
	  },
	  renderCurrentStep: function() {
	    var course, original, ref;
	    ref = this.state, course = ref.course, original = ref.original;
	    if (course.isIncomplete()) {
	      return React.createElement(InviteCodeInput, {
	        "course": course,
	        "title": "Leave " + (original.description()) + " for new course/period"
	      });
	    } else if (course.isPending()) {
	      return React.createElement(ConfirmJoin, {
	        "course": course,
	        "optionalStudentId": true,
	        "title": "Are you sure you want to switch your registration " + (course.description()) + "?"
	      });
	    } else {
	      return this.renderComplete(course);
	    }
	  },
	  render: function() {
	    return React.createElement("div", {
	      "className": '-modify-registration'
	    }, React.createElement("i", {
	      "className": 'close-icon',
	      "onClick": this.showTasks
	    }), this.renderCurrentStep());
	  }
	});

	module.exports = ModifyCourseRegistration;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var Course, EnrollOrLogin, LoginGateway, NewCourseRegistration, React;

	React = __webpack_require__(2);

	NewCourseRegistration = __webpack_require__(92);

	Course = __webpack_require__(76);

	LoginGateway = __webpack_require__(101);

	EnrollOrLogin = React.createClass({displayName: "EnrollOrLogin",
	  propTypes: {
	    collectionUUID: React.PropTypes.string.isRequired
	  },
	  render: function() {
	    return React.createElement("div", {
	      "className": "enroll-or-login"
	    }, React.createElement(LoginGateway, {
	      "title": "Already entered an enrollment code?"
	    }), React.createElement(NewCourseRegistration, React.__spread({
	      "title": 'First time here?'
	    }, this.props)));
	  }
	});

	module.exports = EnrollOrLogin;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var LoginGateway, React, SECOND, User, _, api;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	User = __webpack_require__(75);

	api = __webpack_require__(37);

	SECOND = 1000;

	LoginGateway = React.createClass({displayName: "LoginGateway",
	  propTypes: {
	    title: React.PropTypes.string,
	    window: React.PropTypes.shape({
	      open: React.PropTypes.func
	    })
	  },
	  getDefaultProps: function() {
	    return {
	      title: 'You need to login or signup in order to use ConceptCoach™',
	      window: window
	    };
	  },
	  getInitialState: function() {
	    return {
	      loginWindow: false
	    };
	  },
	  openLogin: function(ev) {
	    var height, loginWindow, options, width;
	    ev.preventDefault();
	    width = Math.min(1000, window.screen.width - 20);
	    height = Math.min(800, window.screen.height - 30);
	    options = ["toolbar=no", "location=" + (this.props.window.opera ? "no" : "yes"), "directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no", "width=" + width, "height=" + height, "top=" + (window.screen.height - height) / 2, "left=" + (window.screen.width - width) / 2].join();
	    loginWindow = this.props.window.open(this.urlForLogin(), 'oxlogin', options);
	    this.setState({
	      loginWindow: loginWindow
	    });
	    return _.delay(this.windowClosedCheck, SECOND);
	  },
	  parseAndDispatchMessage: function(msg) {
	    var data, error;
	    if (!this.isMounted()) {
	      return;
	    }
	    try {
	      data = JSON.parse(msg.data);
	      if (data.user) {
	        api.channel.emit('user.status.receive.fetch', {
	          data: data
	        });
	      }
	      return this.setState({
	        loginWindow: false
	      });
	    } catch (_error) {
	      error = _error;
	      return console.warn(error);
	    }
	  },
	  componentWillUnmount: function() {
	    return window.removeEventListener('message', this.parseAndDispatchMessage);
	  },
	  componentWillMount: function() {
	    return window.addEventListener('message', this.parseAndDispatchMessage);
	  },
	  windowClosedCheck: function() {
	    if (!this.isMounted()) {
	      return;
	    }
	    if (this.state.loginWindow && this.state.loginWindow.closed) {
	      return User.ensureStatusLoaded(true);
	    } else {
	      return _.delay(this.windowClosedCheck, SECOND);
	    }
	  },
	  renderWaiting: function() {
	    return React.createElement("p", null, "Please log in using your OpenStax account in the window. ", this.loginLink('Click to reopen window.'));
	  },
	  urlForLogin: function() {
	    return User.endpoints.login + '?parent=' + encodeURIComponent(window.location.href);
	  },
	  loginLink: function(msg) {
	    return React.createElement("a", {
	      "data-bypass": true,
	      "className": 'login',
	      "onClick": this.openLogin,
	      "href": this.urlForLogin()
	    }, msg);
	  },
	  renderLogin: function() {
	    return React.createElement("p", null, this.loginLink('click to begin login.'));
	  },
	  render: function() {
	    return React.createElement("div", {
	      "className": 'login'
	    }, React.createElement("h3", null, this.props.title), (this.state.loginWindow ? this.renderWaiting() : this.renderLogin()));
	  }
	});

	module.exports = LoginGateway;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var BS, ErrorNotification, React, _, api;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	_ = __webpack_require__(3);

	api = __webpack_require__(37);

	ErrorNotification = React.createClass({displayName: "ErrorNotification",
	  getInitialState: function() {
	    return {
	      error: false,
	      isShowingDetails: false
	    };
	  },
	  componentWillMount: function() {
	    return api.channel.on('error', this.onError);
	  },
	  componentWillUnmount: function() {
	    return api.channel.off('error', this.onError);
	  },
	  onError: function(arg) {
	    var errors, exception, failedData, ref, response;
	    response = arg.response, failedData = arg.failedData, exception = arg.exception;
	    if (failedData != null ? failedData.stopErrorDisplay : void 0) {
	      return;
	    }
	    if (exception != null) {
	      errors = [exception.toString()];
	    } else if (response.status === 0) {
	      errors = ["Unknown response received from server"];
	    } else {
	      errors = [response.status + ": " + response.statusText];
	      if (_.isArray((ref = failedData.data) != null ? ref.errors : void 0)) {
	        errors = errors.concat(_.flatten(_.map(failedData.data.errors, function(error) {
	          if (error.code) {
	            return error.code;
	          } else {
	            return JSON.stringify(error);
	          }
	        })));
	      }
	    }
	    return this.setState({
	      errors: errors
	    });
	  },
	  toggleDetails: function() {
	    return this.setState({
	      isShowingDetails: !this.state.isShowingDetails
	    });
	  },
	  onHide: function() {
	    return this.setState({
	      errors: false
	    });
	  },
	  renderDetails: function() {
	    var error, i;
	    return React.createElement(BS.Panel, {
	      "header": "Error Details"
	    }, React.createElement("ul", {
	      "className": "errors-listing"
	    }, (function() {
	      var j, len, ref, results;
	      ref = this.state.errors;
	      results = [];
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        error = ref[i];
	        results.push(React.createElement("li", {
	          "key": i
	        }, error));
	      }
	      return results;
	    }).call(this)), React.createElement("p", null, window.navigator.userAgent));
	  },
	  render: function() {
	    if (!this.state.errors) {
	      return null;
	    }
	    return React.createElement(BS.Modal, {
	      "className": 'errors',
	      "onRequestHide": this.onHide,
	      "title": "Error encountered"
	    }, React.createElement("div", {
	      "className": 'modal-body'
	    }, React.createElement("p", null, "An unexpected error has occured.  Please\nvisit ", React.createElement("a", {
	      "target": "_blank",
	      "href": "https://openstaxcc.zendesk.com/hc/en-us"
	    }, " our support site "), " so we can help to diagnose and correct the issue."), React.createElement("p", null, "When reporting the issue, it would be helpful if you could include the error details."), React.createElement(BS.Button, {
	      "className": '-display-errors',
	      "style": {
	        marginBottom: '1rem'
	      },
	      "onClick": this.toggleDetails
	    }, (this.state.isShowingDetails ? "Hide" : "Show"), " Details"), (this.state.isShowingDetails ? this.renderDetails() : void 0)), React.createElement("div", {
	      "className": 'modal-footer'
	    }, React.createElement(BS.Button, {
	      "className": 'ok',
	      "bsStyle": 'primary',
	      "onClick": this.onHide
	    }, "OK")));
	  }
	});

	module.exports = ErrorNotification;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var AccountsIframe, React, User, api, classnames;

	React = __webpack_require__(2);

	classnames = __webpack_require__(4);

	api = __webpack_require__(37);

	User = __webpack_require__(75);

	AccountsIframe = React.createClass({displayName: "AccountsIframe",
	  propTypes: {
	    type: React.PropTypes.oneOf(['logout', 'profile']).isRequired
	  },
	  getInitialState: function() {
	    return {
	      width: '100%',
	      height: 400,
	      isClosable: this.props.type === "profile"
	    };
	  },
	  pageLoad: function(page) {
	    if (page === "/login") {
	      if (User.isLoggingOut) {
	        User._signalLogoutCompleted();
	      }
	      return this.setState({
	        isClosable: false
	      });
	    } else {
	      if (User.isLoggedIn()) {
	        return this.setState({
	          isClosable: true
	        });
	      } else {
	        this.setState({
	          isClosable: false
	        });
	        if (page === "/profile") {
	          return this.sendCommand('displayLogin', User.endpoints.iframe_login);
	        }
	      }
	    }
	  },
	  pageResize: function(arg) {
	    var height, width;
	    width = arg.width, height = arg.height;
	    return this.setState({
	      height: height
	    });
	  },
	  setTitle: function(title) {
	    return this.setState({
	      title: title
	    });
	  },
	  iFrameReady: function() {
	    return this.sendCommand('displayProfile');
	  },
	  logoutComplete: function(success) {
	    if (!success) {
	      return;
	    }
	    return User._signalLogoutCompleted();
	  },
	  sendCommand: function(command, payload) {
	    var msg, obj;
	    if (payload == null) {
	      payload = {};
	    }
	    msg = JSON.stringify({
	      data: (
	        obj = {},
	        obj["" + command] = payload,
	        obj
	      )
	    });
	    return React.findDOMNode(this.refs.iframe).contentWindow.postMessage(msg, '*');
	  },
	  parseAndDispatchMessage: function(msg) {
	    var error, json, method, payload, ref, results;
	    if (!this.isMounted()) {
	      return;
	    }
	    try {
	      json = JSON.parse(msg.data);
	      ref = json.data;
	      results = [];
	      for (method in ref) {
	        payload = ref[method];
	        if (this[method]) {
	          results.push(this[method](payload));
	        } else {
	          results.push(typeof console.warn === "function" ? console.warn("Received message for unsupported " + method) : void 0);
	        }
	      }
	      return results;
	    } catch (_error) {
	      error = _error;
	      return console.warn(error);
	    }
	  },
	  componentWillUnmount: function() {
	    return window.removeEventListener('message', this.parseAndDispatchMessage);
	  },
	  componentWillMount: function() {
	    return window.addEventListener('message', this.parseAndDispatchMessage);
	  },
	  render: function() {
	    var className, me, ref, url;
	    me = window.location.protocol + '//' + window.location.host;
	    url = this.props.type === 'logout' ? User.endpoints.logout : User.endpoints.accounts_iframe;
	    url = url + "?parent=" + me;
	    className = classnames('accounts-iframe', this.props.type);
	    return React.createElement("div", {
	      "className": className
	    }, React.createElement("div", {
	      "className": "heading"
	    }, React.createElement("h3", {
	      "className": "title"
	    }, ((ref = this.state) != null ? ref.title : void 0))), React.createElement("iframe", {
	      "src": url,
	      "ref": 'iframe',
	      "style": {
	        width: this.state.width,
	        height: this.state.height,
	        border: 0
	      },
	      "id": "OxAccountIframe",
	      "name": "OxAccountIframe"
	    }));
	  }
	});

	module.exports = AccountsIframe;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var AsyncButton, BS, Course, ENTER, ErrorList, Navigation, React, RequestStudentId, UpdateStudentIdentifer, _;

	_ = __webpack_require__(3);

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	AsyncButton = __webpack_require__(6).AsyncButton;

	ENTER = 'Enter';

	Course = __webpack_require__(76);

	ErrorList = __webpack_require__(96);

	RequestStudentId = __webpack_require__(98);

	Navigation = __webpack_require__(86);

	UpdateStudentIdentifer = React.createClass({displayName: "UpdateStudentIdentifer",
	  componentWillMount: function() {
	    var course;
	    course = this.props.course || User.getCourse(this.props.collectionUUID) || new Course({
	      ecosystem_book_uuid: this.props.collectionUUID
	    });
	    course.channel.on('change', this.onCourseChange);
	    return this.setState({
	      course: course
	    });
	  },
	  componentWillUnmount: function() {
	    return this.state.course.channel.off('change', this.onCourseChange);
	  },
	  onCourseChange: function() {
	    if (this.props.course.student_identifier) {
	      this.setState({
	        requestSuccess: true
	      });
	      delete this.props.course.student_identifier;
	      _.delay(this.onCancel, 1500);
	    }
	    return this.forceUpdate();
	  },
	  propTypes: {
	    course: React.PropTypes.instanceOf(Course).isRequired
	  },
	  startConfirmation: function() {
	    return this.props.course.confirm(this.refs.input.getValue());
	  },
	  onKeyPress: function(ev) {
	    if (ev.key === ENTER) {
	      return this.startConfirmation();
	    }
	  },
	  onConfirmKeyPress: function(ev) {
	    if (ev.key === ENTER) {
	      return this.startConfirmation();
	    }
	  },
	  cancelConfirmation: function() {
	    return this.props.course.resetToBlankState();
	  },
	  onSubmit: function(studentId) {
	    return this.props.course.updateStudent({
	      student_identifier: studentId
	    });
	  },
	  onCancel: function() {
	    return Navigation.channel.emit('show.task', {
	      view: 'task'
	    });
	  },
	  renderComplete: function() {
	    return React.createElement("h3", {
	      "className": "text-center"
	    }, "You have successfully updated your student identifier.");
	  },
	  render: function() {
	    if (this.state.requestSuccess) {
	      return this.renderComplete();
	    }
	    return React.createElement(BS.Row, null, React.createElement(RequestStudentId, React.__spread({
	      "label": "Enter your school issued ID:",
	      "title": "Change your student ID",
	      "onCancel": this.onCancel,
	      "onSubmit": this.onSubmit,
	      "saveButtonLabel": "Save",
	      "canCancel": true
	    }, this.props)));
	  }
	});

	module.exports = UpdateStudentIdentifer;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var CourseListing, Dashboard, DashboardBase, React, Reactive, User, _, apiChannelName, classnames;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	Reactive = __webpack_require__(77).Reactive;

	CourseListing = __webpack_require__(94).CourseListing;

	User = __webpack_require__(75);

	apiChannelName = 'user';

	DashboardBase = React.createClass({
	  displayName: 'DashboardBase',
	  getDefaultProps: function() {
	    return {
	      item: {}
	    };
	  },
	  render: function() {
	    var cnxUrl, item, ref, status;
	    ref = this.props, item = ref.item, status = ref.status, cnxUrl = ref.cnxUrl;
	    return React.createElement("div", {
	      "className": 'concept-coach-courses'
	    }, React.createElement("h1", null, "Enrolled Courses"), React.createElement(CourseListing, {
	      "courses": item.courses
	    }));
	  }
	});

	Dashboard = React.createClass({
	  displayName: 'Dashboard',
	  render: function() {
	    return React.createElement(Reactive, {
	      "store": User,
	      "topic": 'status',
	      "fetcher": User.ensureStatusLoaded.bind(User),
	      "apiChannelName": apiChannelName,
	      "channelUpdatePattern": 'change'
	    }, React.createElement(DashboardBase, {
	      "cnxUrl": this.props.cnxUrl
	    }));
	  }
	});

	module.exports = {
	  Dashboard: Dashboard,
	  DashboardBase: DashboardBase
	};


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var ChapterProgress, ChapterSectionMixin, CurrentProgress, ExerciseButton, Progress, ProgressBase, React, Reactive, SectionProgress, _, apiChannelName, channel, classnames, progresses, tasks;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	ChapterSectionMixin = __webpack_require__(6).ChapterSectionMixin;

	Reactive = __webpack_require__(77).Reactive;

	ExerciseButton = __webpack_require__(81).ExerciseButton;

	SectionProgress = __webpack_require__(107).SectionProgress;

	ChapterProgress = __webpack_require__(108).ChapterProgress;

	CurrentProgress = __webpack_require__(112).CurrentProgress;

	channel = (progresses = __webpack_require__(113)).channel;

	tasks = __webpack_require__(35);

	apiChannelName = 'courseDashboard';

	ProgressBase = React.createClass({
	  displayName: 'ProgressBase',
	  getDefaultProps: function() {
	    return {
	      item: {}
	    };
	  },
	  contextTypes: {
	    moduleUUID: React.PropTypes.string,
	    collectionUUID: React.PropTypes.string
	  },
	  render: function() {
	    var chapters, className, classes, collectionUUID, currentTask, item, maxExercises, maxLength, moduleUUID, progress, ref, ref1, ref2, status;
	    ref = this.props, item = ref.item, className = ref.className, status = ref.status;
	    ref1 = this.context, moduleUUID = ref1.moduleUUID, collectionUUID = ref1.collectionUUID;
	    chapters = item;
	    classes = classnames('concept-coach-student-dashboard', className);
	    currentTask = tasks.get(collectionUUID + "/" + moduleUUID);
	    maxExercises = _.chain(chapters).pluck('pages').flatten().pluck('exercises').max(function(exercises) {
	      return exercises.length;
	    }).value();
	    maxLength = Math.max((maxExercises != null ? maxExercises.length : void 0) || 0, (currentTask != null ? (ref2 = currentTask.steps) != null ? ref2.length : void 0 : void 0) || 0);
	    progress = _.map(chapters, function(chapter) {
	      return React.createElement(ChapterProgress, {
	        "chapter": chapter,
	        "maxLength": maxLength,
	        "key": "progress-chapter-" + chapter.id
	      });
	    });
	    return React.createElement("div", {
	      "className": classes
	    }, React.createElement(SectionProgress, {
	      "title": 'Current Progress'
	    }, React.createElement(CurrentProgress, {
	      "maxLength": maxLength
	    })), React.createElement(SectionProgress, {
	      "title": 'Previous'
	    }, progress));
	  }
	});

	Progress = React.createClass({
	  displayName: 'Progress',
	  contextTypes: {
	    moduleUUID: React.PropTypes.string
	  },
	  render: function() {
	    var id, moduleUUID;
	    id = this.props.id;
	    moduleUUID = this.context.moduleUUID;
	    return React.createElement(Reactive, {
	      "topic": id,
	      "getter": _.partial(progresses.getFilteredChapters, _, [moduleUUID]),
	      "store": progresses,
	      "apiChannelName": apiChannelName
	    }, React.createElement(ProgressBase, null));
	  }
	});

	module.exports = {
	  Progress: Progress,
	  ProgressBase: ProgressBase,
	  channel: channel
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var React, SectionProgress, _, classnames;

	React = __webpack_require__(2);

	classnames = __webpack_require__(4);

	_ = __webpack_require__(3);

	SectionProgress = React.createClass({
	  displayName: 'SectionProgress',
	  getDefaultProps: function() {
	    return {
	      progress: null,
	      title: 'Progress'
	    };
	  },
	  render: function() {
	    var children, className, classes, progress, ref, title;
	    ref = this.props, progress = ref.progress, title = ref.title, children = ref.children, className = ref.className;
	    if (progress == null) {
	      progress = children;
	    }
	    if (_.isEmpty(progress)) {
	      return null;
	    }
	    classes = classnames('concept-coach-progress-section', className);
	    return React.createElement("div", {
	      "className": classes
	    }, React.createElement("h1", null, title), progress);
	  }
	});

	module.exports = {
	  SectionProgress: SectionProgress
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var ChapterProgress, ChapterSectionMixin, PageProgress, React, _, classnames;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	ChapterSectionMixin = __webpack_require__(6).ChapterSectionMixin;

	PageProgress = __webpack_require__(109).PageProgress;

	ChapterProgress = React.createClass({
	  displayName: 'ChapterProgress',
	  propTypes: {
	    maxLength: React.PropTypes.number,
	    className: React.PropTypes.string,
	    chapter: React.PropTypes.shape({
	      chapter_section: React.PropTypes.array,
	      pages: React.PropTypes.arrayOf(React.PropTypes.object)
	    })
	  },
	  getDefaultProps: function() {
	    return {
	      chapter: {}
	    };
	  },
	  mixins: [ChapterSectionMixin],
	  render: function() {
	    var chapter, className, classes, maxLength, pages, ref, ref1, section, sectionProps, title;
	    ref = this.props, chapter = ref.chapter, className = ref.className, maxLength = ref.maxLength;
	    if (!(((ref1 = chapter.pages) != null ? ref1.length : void 0) > 0)) {
	      return null;
	    }
	    classes = classnames('concept-coach-progress-chapter', className);
	    section = this.sectionFormat(chapter.chapter_section);
	    sectionProps = {
	      className: 'chapter-section-prefix'
	    };
	    if (section != null) {
	      sectionProps['data-section'] = section;
	    }
	    pages = _.map(chapter.pages, function(page) {
	      return React.createElement(PageProgress, {
	        "page": page,
	        "maxLength": maxLength,
	        "key": "progress-page-" + page.id
	      });
	    });
	    if (chapter.title != null) {
	      title = React.createElement("h3", React.__spread({}, sectionProps), chapter.title);
	    }
	    return React.createElement("div", {
	      "className": classes
	    }, title, React.createElement("ul", {
	      "className": 'concept-coach-progress-pages'
	    }, pages));
	  }
	});

	module.exports = {
	  ChapterProgress: ChapterProgress
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var ChapterSectionMixin, EventEmitter2, ExerciseProgress, PageProgress, React, ResizeListenerMixin, _, classnames, dateFormat, ref;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	dateFormat = __webpack_require__(110);

	classnames = __webpack_require__(4);

	EventEmitter2 = __webpack_require__(5);

	ref = __webpack_require__(6), ChapterSectionMixin = ref.ChapterSectionMixin, ResizeListenerMixin = ref.ResizeListenerMixin;

	ExerciseProgress = __webpack_require__(111).ExerciseProgress;

	PageProgress = React.createClass({
	  displayName: 'PageProgress',
	  getDefaultProps: function() {
	    return {
	      page: {},
	      dateFormatString: 'mmm. d',
	      progressWidth: 30,
	      progressMargin: 5,
	      dateBuffer: 100
	    };
	  },
	  contextTypes: {
	    navigator: React.PropTypes.instanceOf(EventEmitter2)
	  },
	  mixins: [ChapterSectionMixin, ResizeListenerMixin],
	  switchModule: function(data) {
	    return this.context.navigator.emit('switch.module', {
	      data: data,
	      view: 'task'
	    });
	  },
	  render: function() {
	    var className, classes, componentEl, dateBuffer, dateFormatString, exercises, exercisesProgressWidth, maxLength, page, pageLastWorked, progressMargin, progressWidth, ref1, section, sectionProps, titleWidth;
	    ref1 = this.props, page = ref1.page, dateFormatString = ref1.dateFormatString, dateBuffer = ref1.dateBuffer, maxLength = ref1.maxLength, progressWidth = ref1.progressWidth, progressMargin = ref1.progressMargin, className = ref1.className;
	    componentEl = this.state.componentEl;
	    exercisesProgressWidth = maxLength * progressWidth + (maxLength - 1) * progressMargin;
	    titleWidth = componentEl.width - exercisesProgressWidth - dateBuffer;
	    classes = classnames('concept-coach-progress-page', className);
	    section = this.sectionFormat(page.chapter_section);
	    if (page.last_worked_at != null) {
	      pageLastWorked = dateFormat(new Date(page.last_worked_at), dateFormatString);
	    }
	    sectionProps = {
	      className: 'chapter-section-prefix'
	    };
	    if (section != null) {
	      sectionProps['data-section'] = section;
	    }
	    exercises = _.map(page.exercises, function(exercise) {
	      return React.createElement(ExerciseProgress, {
	        "exercise": exercise,
	        "key": "progress-exercise-" + exercise.id
	      });
	    });
	    return React.createElement("li", {
	      "className": classes,
	      "onClick": _.partial(this.switchModule, {
	        moduleUUID: page.uuid
	      })
	    }, React.createElement("h4", {
	      "className": 'concept-coach-progress-page-title',
	      "style": {
	        width: titleWidth
	      }
	    }, React.createElement("div", React.__spread({}, sectionProps), page.title)), React.createElement("span", {
	      "className": 'concept-coach-progress-page-last-worked'
	    }, pageLastWorked), React.createElement("div", {
	      "style": {
	        width: exercisesProgressWidth
	      },
	      "className": 'concept-coach-progress-exercises'
	    }, exercises));
	  }
	});

	module.exports = {
	  PageProgress: PageProgress
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	(function(global) {
	  'use strict';

	  var dateFormat = (function() {
	      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
	      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	      var timezoneClip = /[^-+\dA-Z]/g;
	  
	      // Regexes and supporting functions are cached through closure
	      return function (date, mask, utc, gmt) {
	  
	        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
	        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
	          mask = date;
	          date = undefined;
	        }
	  
	        date = date || new Date;
	  
	        if(!(date instanceof Date)) {
	          date = new Date(date);
	        }
	  
	        if (isNaN(date)) {
	          throw TypeError('Invalid date');
	        }
	  
	        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
	  
	        // Allow setting the utc/gmt argument via the mask
	        var maskSlice = mask.slice(0, 4);
	        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
	          mask = mask.slice(4);
	          utc = true;
	          if (maskSlice === 'GMT:') {
	            gmt = true;
	          }
	        }
	  
	        var _ = utc ? 'getUTC' : 'get';
	        var d = date[_ + 'Date']();
	        var D = date[_ + 'Day']();
	        var m = date[_ + 'Month']();
	        var y = date[_ + 'FullYear']();
	        var H = date[_ + 'Hours']();
	        var M = date[_ + 'Minutes']();
	        var s = date[_ + 'Seconds']();
	        var L = date[_ + 'Milliseconds']();
	        var o = utc ? 0 : date.getTimezoneOffset();
	        var W = getWeek(date);
	        var N = getDayOfWeek(date);
	        var flags = {
	          d:    d,
	          dd:   pad(d),
	          ddd:  dateFormat.i18n.dayNames[D],
	          dddd: dateFormat.i18n.dayNames[D + 7],
	          m:    m + 1,
	          mm:   pad(m + 1),
	          mmm:  dateFormat.i18n.monthNames[m],
	          mmmm: dateFormat.i18n.monthNames[m + 12],
	          yy:   String(y).slice(2),
	          yyyy: y,
	          h:    H % 12 || 12,
	          hh:   pad(H % 12 || 12),
	          H:    H,
	          HH:   pad(H),
	          M:    M,
	          MM:   pad(M),
	          s:    s,
	          ss:   pad(s),
	          l:    pad(L, 3),
	          L:    pad(Math.round(L / 10)),
	          t:    H < 12 ? 'a'  : 'p',
	          tt:   H < 12 ? 'am' : 'pm',
	          T:    H < 12 ? 'A'  : 'P',
	          TT:   H < 12 ? 'AM' : 'PM',
	          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
	          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
	          W:    W,
	          N:    N
	        };
	  
	        return mask.replace(token, function (match) {
	          if (match in flags) {
	            return flags[match];
	          }
	          return match.slice(1, match.length - 1);
	        });
	      };
	    })();

	  dateFormat.masks = {
	    'default':               'ddd mmm dd yyyy HH:MM:ss',
	    'shortDate':             'm/d/yy',
	    'mediumDate':            'mmm d, yyyy',
	    'longDate':              'mmmm d, yyyy',
	    'fullDate':              'dddd, mmmm d, yyyy',
	    'shortTime':             'h:MM TT',
	    'mediumTime':            'h:MM:ss TT',
	    'longTime':              'h:MM:ss TT Z',
	    'isoDate':               'yyyy-mm-dd',
	    'isoTime':               'HH:MM:ss',
	    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
	    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
	    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
	  };

	  // Internationalization strings
	  dateFormat.i18n = {
	    dayNames: [
	      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
	      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	    ],
	    monthNames: [
	      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
	      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	    ]
	  };

	function pad(val, len) {
	  val = String(val);
	  len = len || 2;
	  while (val.length < len) {
	    val = '0' + val;
	  }
	  return val;
	}

	/**
	 * Get the ISO 8601 week number
	 * Based on comments from
	 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
	 *
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getWeek(date) {
	  // Remove time components of date
	  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	  // Change date to Thursday same week
	  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

	  // Take January 4th as it is always in week 1 (see ISO 8601)
	  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

	  // Change date to Thursday same week
	  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

	  // Check if daylight-saving-time-switch occured and correct for it
	  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
	  targetThursday.setHours(targetThursday.getHours() - ds);

	  // Number of weeks between target Thursday and first Thursday
	  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
	  return 1 + Math.floor(weekDiff);
	}

	/**
	 * Get ISO-8601 numeric representation of the day of the week
	 * 1 (for Monday) through 7 (for Sunday)
	 * 
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getDayOfWeek(date) {
	  var dow = date.getDay();
	  if(dow === 0) {
	    dow = 7;
	  }
	  return dow;
	}

	/**
	 * kind-of shortcut
	 * @param  {*} val
	 * @return {String}
	 */
	function kindOf(val) {
	  if (val === null) {
	    return 'null';
	  }

	  if (val === undefined) {
	    return 'undefined';
	  }

	  if (typeof val !== 'object') {
	    return typeof val;
	  }

	  if (Array.isArray(val)) {
	    return 'array';
	  }

	  return {}.toString.call(val)
	    .slice(8, -1).toLowerCase();
	};



	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return dateFormat;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = dateFormat;
	  } else {
	    global.dateFormat = dateFormat;
	  }
	})(this);


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var ExerciseProgress, React, classnames;

	React = __webpack_require__(2);

	classnames = __webpack_require__(4);

	ExerciseProgress = React.createClass({
	  displayName: 'ExerciseProgress',
	  propTypes: {
	    className: React.PropTypes.string,
	    exercise: React.PropTypes.shape({
	      is_completed: React.PropTypes.bool,
	      is_correct: React.PropTypes.bool
	    })
	  },
	  getDefaultProps: function() {
	    return {
	      exercise: {}
	    };
	  },
	  render: function() {
	    var className, classes, exercise, ref;
	    ref = this.props, exercise = ref.exercise, className = ref.className;
	    classes = classnames('concept-coach-progress-exercise', className, {
	      'is-completed': exercise.is_completed,
	      'is-correct': exercise.is_correct
	    });
	    return React.createElement("div", {
	      "className": classes
	    });
	  }
	});

	module.exports = {
	  ExerciseProgress: ExerciseProgress
	};


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var ChapterProgress, CurrentProgress, CurrentProgressBase, React, Reactive, _, apiChannelName, channel, classnames, tasks;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	channel = (tasks = __webpack_require__(35)).channel;

	Reactive = __webpack_require__(77).Reactive;

	apiChannelName = 'task';

	ChapterProgress = __webpack_require__(108).ChapterProgress;

	CurrentProgressBase = React.createClass({
	  displayName: 'CurrentProgressBase',
	  render: function() {
	    var chapter, item, maxLength, moduleUUID, page, ref, task, taskId;
	    ref = this.props, item = ref.item, taskId = ref.taskId, maxLength = ref.maxLength, moduleUUID = ref.moduleUUID;
	    task = item;
	    if ((task != null ? task.steps : void 0) == null) {
	      return null;
	    }
	    page = tasks.getAsPage(taskId);
	    chapter = {
	      pages: [page]
	    };
	    return React.createElement(ChapterProgress, {
	      "className": 'current',
	      "chapter": chapter,
	      "maxLength": maxLength,
	      "key": "progress-chapter-current"
	    });
	  }
	});

	CurrentProgress = React.createClass({
	  displayName: 'CurrentProgress',
	  contextTypes: {
	    moduleUUID: React.PropTypes.string,
	    collectionUUID: React.PropTypes.string
	  },
	  filter: function(props, eventData) {
	    var receivedData, setProps, toCompare;
	    toCompare = ['collectionUUID', 'moduleUUID'];
	    setProps = _.pick(props, toCompare);
	    receivedData = _.pick(eventData.data, toCompare);
	    return _.isEqual(setProps, receivedData);
	  },
	  render: function() {
	    var collectionUUID, moduleUUID, ref, taskId;
	    ref = this.context, collectionUUID = ref.collectionUUID, moduleUUID = ref.moduleUUID;
	    taskId = collectionUUID + "/" + moduleUUID;
	    return React.createElement(Reactive, {
	      "topic": taskId,
	      "store": tasks,
	      "apiChannelName": apiChannelName,
	      "collectionUUID": collectionUUID,
	      "moduleUUID": moduleUUID,
	      "fetcher": tasks.fetchByModule,
	      "filter": this.filter
	    }, React.createElement(CurrentProgressBase, React.__spread({}, this.context, this.props, {
	      "taskId": taskId
	    })));
	  }
	});

	module.exports = {
	  CurrentProgress: CurrentProgress
	};


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter2, _, api, apiChannelName, channel, fetch, get, getFilteredChapters, init, load, local, update;

	EventEmitter2 = __webpack_require__(5);

	_ = __webpack_require__(3);

	api = __webpack_require__(37);

	local = {};

	channel = new EventEmitter2({
	  wildcard: true
	});

	apiChannelName = 'courseDashboard';

	load = function(id, data) {
	  local[id] = data;
	  return channel.emit("load." + id, {
	    data: data
	  });
	};

	update = function(eventData) {
	  var data;
	  data = eventData.data;
	  return load(data.id, data);
	};

	fetch = function(id) {
	  var eventData;
	  eventData = {
	    data: {
	      id: id
	    },
	    status: 'loading'
	  };
	  channel.emit("fetch." + id, eventData);
	  return api.channel.emit(apiChannelName + "." + id + ".send.fetch", eventData);
	};

	get = function(id) {
	  return local[id];
	};

	getFilteredChapters = function(id, uuids) {
	  var chapters, progresses;
	  if (uuids == null) {
	    uuids = [];
	  }
	  progresses = get(id);
	  if (progresses == null) {
	    return;
	  }
	  chapters = progresses.chapters;
	  return _.chain(chapters).map(function(chapter) {
	    chapter.pages = _.reject(chapter.pages, function(page) {
	      return _.indexOf(uuids, page.uuid) > -1;
	    });
	    if (_.isEmpty(chapter.pages)) {
	      return null;
	    }
	    return chapter;
	  }).compact().value();
	};

	init = function() {
	  return api.channel.on(apiChannelName + ".*.receive.*", update);
	};

	module.exports = {
	  fetch: fetch,
	  get: get,
	  getFilteredChapters: getFilteredChapters,
	  init: init,
	  channel: channel
	};


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter2, _, coach;

	_ = __webpack_require__(3);

	EventEmitter2 = __webpack_require__(5);

	coach = {
	  update: function(options) {
	    return _.extend(this, options);
	  },
	  channel: new EventEmitter2({
	    wildcard: true
	  })
	};

	module.exports = coach;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var $, Coach, ConceptCoachAPI, EventEmitter2, PROPS, User, WRAPPER_CLASSNAME, _, coachWrapped, componentModel, deleteProperties, exercise, helpers, initializeModels, listenAndBroadcast, navigation, progress, restAPI, setupAPIListeners, stopModelChannels, task,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	_ = __webpack_require__(3);

	$ = __webpack_require__(72);

	EventEmitter2 = __webpack_require__(5);

	helpers = __webpack_require__(116);

	restAPI = __webpack_require__(37);

	componentModel = __webpack_require__(114);

	navigation = __webpack_require__(86);

	User = __webpack_require__(75);

	exercise = __webpack_require__(74);

	progress = __webpack_require__(113);

	task = __webpack_require__(35);

	Coach = __webpack_require__(117).Coach;

	coachWrapped = helpers.wrapComponent(Coach);

	PROPS = ['moduleUUID', 'collectionUUID', 'cnxUrl', 'getNextPage', 'processHtmlAndMath'];

	WRAPPER_CLASSNAME = 'concept-coach-wrapper';

	listenAndBroadcast = function(componentAPI) {
	  restAPI.channel.on('error', function(response) {
	    return componentAPI.emit('api.error', response);
	  });
	  restAPI.channel.on('user.status.receive.fetch', function(response) {
	    return componentAPI.emit('user.change', response);
	  });
	  componentModel.channel.on('coach.mount.success', function(eventData) {
	    componentModel.update(eventData.coach);
	    componentAPI.emit('open', eventData);
	    return componentAPI.emit('view.update', navigation.getDataByView(eventData.coach.view));
	  });
	  componentModel.channel.on('coach.unmount.success', function(eventData) {
	    componentModel.update(eventData.coach);
	    componentAPI.emit('close', eventData);
	    return componentAPI.emit('view.update', navigation.getDataByView('close'));
	  });
	  componentModel.channel.on('close.clicked', function() {
	    return componentAPI.emit('ui.close');
	  });
	  componentModel.channel.on('launcher.clicked', function() {
	    return componentAPI.emit('ui.launching');
	  });
	  navigation.channel.on('show.*', function(eventData) {
	    return componentAPI.emit('view.update', navigation.getDataByView(eventData.view));
	  });
	  navigation.channel.on('close.for.book', function(eventData) {
	    return componentAPI.emit('book.update', eventData);
	  });
	  return exercise.channel.on('component.*', function(eventData) {
	    return componentAPI.emit("exercise.component." + eventData.status, eventData);
	  });
	};

	setupAPIListeners = function(componentAPI) {
	  navigation.channel.on("switch.*", function(eventData) {
	    var data, view;
	    data = eventData.data, view = eventData.view;
	    componentAPI.update(data);
	    return navigation.channel.emit("show." + view, {
	      view: view
	    });
	  });
	  return componentAPI.on('show.*', function(eventData) {
	    return componentAPI.updateToView(eventData.view);
	  });
	};

	initializeModels = function(models) {
	  return _.each(models, function(model) {
	    return typeof model.init === "function" ? model.init() : void 0;
	  });
	};

	stopModelChannels = function(models) {
	  return _.each(models, function(model) {
	    var ref;
	    return (typeof model.destroy === "function" ? model.destroy() : void 0) || ((ref = model.channel) != null ? typeof ref.removeAllListeners === "function" ? ref.removeAllListeners() : void 0 : void 0);
	  });
	};

	deleteProperties = function(obj) {
	  var property, results, value;
	  results = [];
	  for (property in obj) {
	    value = obj[property];
	    if (!(_.isFunction(obj[property]) || property === 'channel')) {
	      delete obj[property];
	    }
	    results.push(null);
	  }
	  return results;
	};

	ConceptCoachAPI = (function(superClass) {
	  extend(ConceptCoachAPI, superClass);

	  function ConceptCoachAPI(baseUrl, navOptions) {
	    if (navOptions == null) {
	      navOptions = {};
	    }
	    ConceptCoachAPI.__super__.constructor.call(this, {
	      wildcard: true
	    });
	    _.defaults(navOptions, {
	      prefix: '/',
	      base: 'concept-coach/'
	    });
	    restAPI.init = _.partial(restAPI.initialize, baseUrl);
	    navigation.init = _.partial(navigation.initialize, navOptions);
	    this.models = [restAPI, navigation, User, exercise, progress, task, componentModel];
	    initializeModels(this.models);
	    listenAndBroadcast(this);
	    setupAPIListeners(this);
	    User.ensureStatusLoaded(true);
	  }

	  ConceptCoachAPI.prototype.destroy = function() {
	    if (typeof this.close === "function") {
	      this.close();
	    }
	    this.remove();
	    stopModelChannels(this.models);
	    deleteProperties(this.models);
	    deleteProperties(componentModel);
	    return this.removeAllListeners();
	  };

	  ConceptCoachAPI.prototype.remove = function() {
	    var ref;
	    if ((ref = this.component) != null ? ref.isMounted() : void 0) {
	      return coachWrapped.unmountFrom(componentModel.mounter);
	    }
	  };

	  ConceptCoachAPI.prototype.setOptions = function(options) {
	    var isSame;
	    isSame = _.isEqual(_.pick(options, PROPS), _.pick(componentModel, PROPS));
	    options = _.extend({}, options, {
	      isSame: isSame
	    });
	    return componentModel.update(options);
	  };

	  ConceptCoachAPI.prototype.initialize = function(mountNode, props) {
	    if (props == null) {
	      props = {};
	    }
	    this.remove();
	    props = _.clone(props);
	    if (props.defaultView == null) {
	      props.defaultView = componentModel.isSame ? componentModel.view : 'task';
	    }
	    componentModel.update({
	      mounter: mountNode,
	      isSame: true
	    });
	    props.close = (function(_this) {
	      return function() {
	        _this.component.setProps({
	          open: false
	        });
	        return componentModel.channel.emit('close.clicked');
	      };
	    })(this);
	    this.close = props.close;
	    return this.component = coachWrapped.render(mountNode, props);
	  };

	  ConceptCoachAPI.prototype.open = function(props) {
	    var openProps;
	    User.channel.once('logout.received', (function(_this) {
	      return function() {
	        return _this.close();
	      };
	    })(this));
	    openProps = _.extend({}, props, {
	      open: true
	    });
	    openProps.triggeredFrom = _.pick(props, 'moduleUUID', 'collectionUUID');
	    return this.component.setProps(openProps);
	  };

	  ConceptCoachAPI.prototype.openByRoute = function(props, route) {
	    props = _.clone(props);
	    props.defaultView = navigation.getViewByRoute(route);
	    if ((props.defaultView != null) && props.defaultView !== 'close') {
	      return this.open(props);
	    }
	  };

	  ConceptCoachAPI.prototype.updateToView = function(view) {
	    var props, ref;
	    if ((ref = this.component) != null ? ref.isMounted() : void 0) {
	      if (view === 'close') {
	        return this.component.props.close();
	      } else {
	        return navigation.channel.emit("show." + view, {
	          view: view
	        });
	      }
	    } else if ((componentModel.mounter != null) && view !== 'close') {
	      props = _.pick(componentModel, PROPS);
	      props.defaultView = view;
	      return this.open(props);
	    }
	  };

	  ConceptCoachAPI.prototype.updateToRoute = function(route) {
	    var view;
	    view = navigation.getViewByRoute(route);
	    if (view != null) {
	      return this.updateToView(view);
	    }
	  };

	  ConceptCoachAPI.prototype.update = function(nextProps) {
	    var props;
	    if (this.component == null) {
	      return;
	    }
	    props = _.extend({}, _.pick(nextProps, PROPS));
	    return this.component.setProps(props);
	  };

	  ConceptCoachAPI.prototype.handleOpened = function(eventData, body) {
	    if (body == null) {
	      body = document.body;
	    }
	    return body.classList.add('cc-opened');
	  };

	  ConceptCoachAPI.prototype.handleClosed = function(eventData, body) {
	    if (body == null) {
	      body = document.body;
	    }
	    return body.classList.remove('cc-opened');
	  };

	  ConceptCoachAPI.prototype.handleError = function(error) {
	    channel.emit('error', error);
	    return console.info(error);
	  };

	  return ConceptCoachAPI;

	})(EventEmitter2);

	module.exports = ConceptCoachAPI;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var React, _, helpers;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	helpers = {
	  wrapComponent: function(component) {
	    return {
	      render: function(DOMNode, props) {
	        if (props == null) {
	          props = {};
	        }
	        return React.render(React.createElement(component, props), DOMNode);
	      },
	      unmountFrom: React.unmountComponentAtNode
	    };
	  }
	};

	module.exports = helpers;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var CCModal, Coach, ConceptCoach, Launcher, React, _, channel, ref;

	React = __webpack_require__(2);

	_ = __webpack_require__(3);

	ref = __webpack_require__(1), ConceptCoach = ref.ConceptCoach, channel = ref.channel;

	CCModal = __webpack_require__(118).CCModal;

	Launcher = __webpack_require__(119).Launcher;

	Coach = React.createClass({
	  displayName: 'Coach',
	  getDefaultProps: function() {
	    return {
	      open: false,
	      displayLauncher: true
	    };
	  },
	  propTypes: {
	    open: React.PropTypes.bool,
	    displayLauncher: React.PropTypes.bool
	  },
	  render: function() {
	    var coachProps, displayLauncher, launcher, modal, open;
	    open = this.props.open;
	    displayLauncher = this.props.displayLauncher;
	    coachProps = _.omit(this.props, 'open');
	    if (open) {
	      modal = React.createElement(CCModal, null, React.createElement(ConceptCoach, React.__spread({}, coachProps)));
	    }
	    if (displayLauncher) {
	      launcher = React.createElement(Launcher, {
	        "isLaunching": open
	      });
	    }
	    return React.createElement("div", {
	      "className": 'concept-coach-wrapper'
	    }, launcher, modal);
	  }
	});

	module.exports = {
	  Coach: Coach,
	  channel: channel
	};


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var CCModal, React, _, api, channel, classnames, navigation;

	React = __webpack_require__(2);

	classnames = __webpack_require__(4);

	_ = __webpack_require__(3);

	channel = __webpack_require__(114).channel;

	api = __webpack_require__(37);

	navigation = __webpack_require__(86);

	CCModal = React.createClass({
	  displayName: 'CCModal',
	  getInitialState: function() {
	    return {
	      isLoaded: false
	    };
	  },
	  componentDidMount: function() {
	    var mountData;
	    mountData = {
	      modal: {
	        el: this.getDOMNode()
	      }
	    };
	    channel.emit('modal.mount.success', mountData);
	    mountData.modal.el.focus();
	    if (api.isPending()) {
	      return api.channel.once('completed', this.setLoaded);
	    } else {
	      return this.setLoaded();
	    }
	  },
	  componentWillMount: function() {
	    document.addEventListener('click', this.checkAllowed, true);
	    document.addEventListener('focus', this.checkAllowed, true);
	    return navigation.channel.on('show.*', this.resetScroll);
	  },
	  componentWillUnmount: function() {
	    document.removeEventListener('click', this.checkAllowed, true);
	    document.removeEventListener('focus', this.checkAllowed, true);
	    return navigation.channel.off('show.*', this.resetScroll);
	  },
	  resetScroll: function() {
	    var modal;
	    modal = this.getDOMNode();
	    return modal.scrollTop = 0;
	  },
	  checkAllowed: function(focusEvent) {
	    var modal;
	    modal = this.getDOMNode();
	    if (!modal.contains(focusEvent.target)) {
	      focusEvent.preventDefault();
	      focusEvent.stopImmediatePropagation();
	      return modal.focus();
	    }
	  },
	  setLoaded: function() {
	    var isLoaded;
	    isLoaded = this.state.isLoaded;
	    if (!isLoaded) {
	      return this.setState({
	        isLoaded: true
	      });
	    }
	  },
	  render: function() {
	    var classes, isLoaded;
	    isLoaded = this.state.isLoaded;
	    classes = classnames('concept-coach-modal', {
	      loaded: isLoaded
	    });
	    return React.createElement("div", {
	      "className": classes,
	      "role": 'dialog',
	      "tabIndex": '-1'
	    }, React.createElement("div", {
	      "role": 'document'
	    }, this.props.children));
	  }
	});

	module.exports = {
	  CCModal: CCModal,
	  channel: channel
	};


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var BS, BackgroundAndDesk, LaptopAndMug, Launcher, React, _, channel, classnames, ref;

	React = __webpack_require__(2);

	BS = __webpack_require__(16);

	_ = __webpack_require__(3);

	classnames = __webpack_require__(4);

	ref = __webpack_require__(120), BackgroundAndDesk = ref.BackgroundAndDesk, LaptopAndMug = ref.LaptopAndMug;

	channel = __webpack_require__(114).channel;

	Launcher = React.createClass({
	  displayName: 'Launcher',
	  propTypes: {
	    isLaunching: React.PropTypes.bool,
	    defaultHeight: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      isLaunching: false,
	      defaultHeight: 388
	    };
	  },
	  getInitialState: function() {
	    return {
	      height: this.getHeight()
	    };
	  },
	  componentWillReceiveProps: function(nextProps) {
	    if (this.props.isLaunching !== nextProps.isLaunching) {
	      return this.setState({
	        height: this.getHeight(nextProps)
	      });
	    }
	  },
	  getHeight: function(props) {
	    var defaultHeight, isLaunching;
	    if (props == null) {
	      props = this.props;
	    }
	    isLaunching = props.isLaunching, defaultHeight = props.defaultHeight;
	    if (isLaunching) {
	      return window.innerHeight;
	    } else {
	      return defaultHeight;
	    }
	  },
	  launch: function() {
	    channel.emit('launcher.clicked');
	    return void 0;
	  },
	  render: function() {
	    var classes, defaultHeight, height, isLaunching, ref1;
	    ref1 = this.props, isLaunching = ref1.isLaunching, defaultHeight = ref1.defaultHeight;
	    height = this.state.height;
	    classes = classnames('concept-coach-launcher', {
	      launching: isLaunching
	    });
	    return React.createElement("div", {
	      "className": 'concept-coach-launcher-wrapper'
	    }, React.createElement("div", {
	      "className": classes,
	      "onClick": this.launch
	    }, React.createElement(BackgroundAndDesk, {
	      "height": height
	    }), React.createElement(LaptopAndMug, {
	      "height": defaultHeight
	    }), React.createElement(BS.Button, {
	      "bsStyle": 'primary',
	      "bsSize": 'large'
	    }, "Launch Concept Coach")));
	  }
	});

	module.exports = {
	  Launcher: Launcher
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var BackgroundAndDesk, LaptopAndMug, React;

	React = __webpack_require__(2);

	LaptopAndMug = React.createClass({
	  displayName: 'LaptopAndMug',
	  propTypes: {
	    height: React.PropTypes.number.isRequired
	  },
	  render: function() {
	    var height;
	    height = this.props.height;
	    return React.createElement("svg", {
	      "x": "0px",
	      "y": "0px",
	      "width": "100%",
	      "height": height + "px",
	      "viewBox": "-100 0 1140 388",
	      "preserveAspectRatio": "xMidYMin slice",
	      "version": "1.1",
	      "xmlns": "http://www.w3.org/2000/svg"
	    }, React.createElement("g", {
	      "className": 'launcher-laptop'
	    }, React.createElement("path", {
	      "fill-rule": "evenodd",
	      "fill": "#5F6163",
	      "d": "M385.927,295.597V122.57c0-20.053,5.683-25.72,25.72-25.72h240.835 c20.034,0,25.72,5.667,25.72,25.72v173.026"
	    }), React.createElement("path", {
	      "fill-rule": "evenodd",
	      "fill": "#D1D2D2",
	      "d": "M350.854,295.597h362.421c3.873,0,7.015,3.142,7.015,7.014v3.942 c0,3.872-3.142,7.014-7.015,7.014H350.854c-3.872,0-7.014-3.142-7.014-7.014v-3.942 C343.84,298.738,346.982,295.597,350.854,295.597z"
	    }), React.createElement("path", {
	      "fill-rule": "evenodd",
	      "fill": "#9A9A9B",
	      "d": "M561.292,295.629c0,3.834-3.142,7.015-7.015,7.015h-44.424 c-3.874,0-7.016-3.181-7.016-7.015C502.836,295.556,561.292,295.629,561.292,295.629z"
	    }), React.createElement("path", {
	      "fill": "#E5E5E5",
	      "d": "M660.963,111.404H403.167c-1.766,0-3.21,1.444-3.21,3.209V281.22c0,1.765,1.444,3.21,3.21,3.21h257.796 c1.765,0,3.209-1.445,3.209-3.21V114.613C664.173,112.849,662.728,111.404,660.963,111.404z"
	    }), React.createElement("path", {
	      "fill": "#FFFFFF",
	      "d": "M660.963,111.147H403.167c-1.766,0-3.21,1.444-3.21,3.209v14.72h264.216v-14.72 C664.173,112.592,662.728,111.147,660.963,111.147z"
	    }), React.createElement("rect", {
	      "x": "428.717",
	      "y": "119.311",
	      "fill": "#E5E5E5",
	      "width": "61.177",
	      "height": "4"
	    }), React.createElement("rect", {
	      "x": "408.928",
	      "y": "117.117",
	      "fill": "#9A9A9B",
	      "width": "8.987",
	      "height": "1.198"
	    }), React.createElement("rect", {
	      "x": "408.928",
	      "y": "120.112",
	      "fill": "#9A9A9B",
	      "width": "8.987",
	      "height": "1.198"
	    }), React.createElement("rect", {
	      "x": "408.928",
	      "y": "123.108",
	      "fill": "#9A9A9B",
	      "width": "8.987",
	      "height": "1.199"
	    }), React.createElement("path", {
	      "className": 'launcher-laptop-shine',
	      "fill": "#F1F1F1",
	      "d": "M401.12,283.669c0.558,0.468,1.267,0.761,2.047,0.761h257.796c1.765,0,3.209-1.445,3.209-3.21V129.077 h-26.951L401.12,283.669z"
	    })), React.createElement("g", {
	      "className": 'launcher-coffee'
	    }, React.createElement("g", {
	      "className": 'launcher-coffee-steam'
	    }, React.createElement("path", {
	      "fill-rule": "evenodd",
	      "fill": "#FFFFFF",
	      "d": "M773.967,191.167c3.781,6.054-8.06,11.515-8.06,11.515s6.199-4.644,3.454-11.515 c-2.746-6.872,3.307-9.169,5.757-9.788C775.452,181.296,769.754,184.422,773.967,191.167z"
	    }), React.createElement("path", {
	      "fill-rule": "evenodd",
	      "fill": "#FFFFFF",
	      "d": "M756.12,203.833 c0,0,7.693-5.226,4.605-13.243c-3.088-8.016,3.001-10.793,5.757-11.513c0.375-0.099-5.316,4.221-0.575,12.09 C770.161,198.23,756.12,203.833,756.12,203.833z"
	    })), React.createElement("path", {
	      "className": 'launcher-coffee-mug',
	      "fill-rule": "evenodd",
	      "fill": "#77AF42",
	      "d": "M814.514,245.441c0,10.459-8.742,18.65-19.097,19.097v10.185 c0,4.672-2.966,8.275-7.639,8.275h-42.649c-4.673,0-8.275-3.603-8.275-8.275v-59.2c0-4.671,0.42-6.366,5.094-6.366h49.013 c4.674,0,4.457,1.694,4.457,6.366v10.186C805.772,226.154,814.514,234.981,814.514,245.441z M795.417,232.71v24.825 c6.585-0.443,12.731-5.399,12.731-12.094C808.148,238.746,802.002,233.152,795.417,232.71z"
	    }), React.createElement("path", {
	      "className": 'launcher-coffee-shine',
	      "fill-rule": "evenodd",
	      "fill": "#8EC15A",
	      "d": "M743.989,215.922c1.055,0,1.911,0.855,1.911,1.91v59.199 c0,1.055-0.856,1.911-1.911,1.911c-1.054,0-1.909-0.855-1.909-1.911v-59.199C742.08,216.777,742.936,215.922,743.989,215.922z"
	    })), React.createElement("g", {
	      "className": 'launcher-concept-coach'
	    }, React.createElement("rect", {
	      "className": 'launcher-concept-coach-screen',
	      "fill": "#F1F1F1",
	      "x": "426.338",
	      "y": "138.694",
	      "width": "211.662",
	      "height": "137.639"
	    }), React.createElement("polygon", {
	      "className": 'launcher-concept-coach-shine-bottom',
	      "fill": "#F5F5F5",
	      "points": "638,276.333 638,138.694 622.534,138.694 426.338,267.157 426.338,276.333"
	    }), React.createElement("g", {
	      "className": 'launcher-section-label'
	    }, React.createElement("path", {
	      "fill": "#222E65",
	      "d": "M432.273,145.027c0.29-0.296,0.659-0.444,1.106-0.444c0.599,0,1.037,0.199,1.313,0.596 c0.153,0.223,0.235,0.447,0.247,0.671h-0.752c-0.048-0.172-0.109-0.303-0.184-0.391c-0.134-0.156-0.333-0.234-0.596-0.234 c-0.268,0-0.479,0.11-0.634,0.331c-0.155,0.221-0.232,0.533-0.232,0.937s0.082,0.706,0.245,0.907 c0.164,0.201,0.371,0.301,0.622,0.301c0.258,0,0.455-0.086,0.59-0.259c0.075-0.093,0.137-0.232,0.186-0.417h0.747 c-0.064,0.392-0.229,0.711-0.494,0.957c-0.265,0.246-0.604,0.369-1.018,0.369c-0.512,0-0.915-0.166-1.208-0.498 c-0.293-0.333-0.439-0.791-0.439-1.372C431.773,145.852,431.939,145.368,432.273,145.027z"
	    }), React.createElement("path", {
	      "fill": "#222E65",
	      "d": "M435.535,148.25v-3.599h0.747v1.372h1.399v-1.372h0.747v3.599h-0.747v-1.606h-1.399v1.606H435.535z"
	    }), React.createElement("path", {
	      "fill": "#222E65",
	      "d": "M440.18,144.651h0.851l1.273,3.599h-0.815l-0.238-0.74h-1.325l-0.244,0.74h-0.787L440.18,144.651z M440.13,146.89h0.922l-0.455-1.416L440.13,146.89z"
	    }), React.createElement("path", {
	      "fill": "#222E65",
	      "d": "M445.178,146.692c-0.211,0.176-0.512,0.264-0.902,0.264h-0.75v1.294h-0.747v-3.599h1.545 c0.356,0,0.641,0.093,0.852,0.278c0.212,0.186,0.318,0.473,0.318,0.862C445.494,146.216,445.388,146.517,445.178,146.692z M444.604,145.396c-0.095-0.08-0.229-0.12-0.4-0.12h-0.678v1.06h0.678c0.171,0,0.305-0.043,0.4-0.129s0.143-0.223,0.143-0.41 S444.699,145.476,444.604,145.396z"
	    }), React.createElement("path", {
	      "fill": "#222E65",
	      "d": "M448.711,144.651v0.637h-1.077v2.961h-0.757v-2.961h-1.082v-0.637H448.711z"
	    }), React.createElement("path", {
	      "fill": "#222E65",
	      "d": "M451.812,145.289h-1.904v0.764h1.748v0.625h-1.748v0.925h1.992v0.647h-2.727v-3.599h2.639V145.289z"
	    }), React.createElement("path", {
	      "fill": "#222E65",
	      "d": "M454.792,144.744c0.132,0.057,0.245,0.141,0.337,0.251c0.076,0.091,0.136,0.192,0.181,0.303 s0.067,0.237,0.067,0.378c0,0.171-0.043,0.339-0.129,0.504c-0.086,0.166-0.229,0.282-0.427,0.351 c0.166,0.067,0.284,0.162,0.353,0.284c0.069,0.123,0.104,0.311,0.104,0.563v0.242c0,0.165,0.007,0.276,0.02,0.334 c0.02,0.093,0.066,0.161,0.139,0.205v0.09h-0.83c-0.023-0.08-0.039-0.144-0.049-0.193c-0.02-0.101-0.03-0.204-0.032-0.31 l-0.005-0.334c-0.003-0.229-0.042-0.382-0.119-0.459c-0.076-0.077-0.219-0.115-0.428-0.115h-0.734v1.411h-0.735v-3.599h1.721 C454.47,144.656,454.66,144.687,454.792,144.744z M453.238,145.276v0.967h0.809c0.161,0,0.281-0.02,0.362-0.059 c0.142-0.068,0.213-0.204,0.213-0.405c0-0.218-0.069-0.365-0.207-0.439c-0.077-0.042-0.193-0.063-0.348-0.063H453.238z"
	    }), React.createElement("path", {
	      "fill": "#222E65",
	      "d": "M457.372,146.729c0.09-0.161,0.221-0.282,0.394-0.364c-0.171-0.114-0.283-0.237-0.334-0.37 c-0.051-0.132-0.077-0.256-0.077-0.372c0-0.257,0.097-0.477,0.291-0.658c0.194-0.181,0.468-0.272,0.822-0.272 s0.628,0.091,0.822,0.272c0.194,0.182,0.291,0.401,0.291,0.658c0,0.116-0.025,0.24-0.077,0.372 c-0.051,0.133-0.162,0.248-0.333,0.346c0.175,0.098,0.307,0.227,0.395,0.388s0.132,0.341,0.132,0.54 c0,0.298-0.11,0.551-0.331,0.761c-0.221,0.209-0.529,0.313-0.925,0.313c-0.396,0-0.695-0.104-0.899-0.313 c-0.204-0.209-0.306-0.463-0.306-0.761C457.237,147.07,457.282,146.89,457.372,146.729z M458.095,147.627 c0.09,0.096,0.215,0.144,0.375,0.144s0.285-0.048,0.375-0.144c0.091-0.096,0.136-0.231,0.136-0.405 c0-0.181-0.046-0.318-0.138-0.412c-0.092-0.093-0.216-0.14-0.373-0.14s-0.28,0.047-0.373,0.14 c-0.092,0.094-0.138,0.231-0.138,0.412C457.959,147.396,458.004,147.531,458.095,147.627z M458.139,146.016 c0.079,0.082,0.189,0.122,0.329,0.122c0.142,0,0.252-0.041,0.33-0.122s0.116-0.187,0.116-0.315c0-0.14-0.039-0.25-0.116-0.328 c-0.078-0.079-0.188-0.119-0.33-0.119c-0.14,0-0.25,0.04-0.329,0.119c-0.079,0.079-0.119,0.188-0.119,0.328 C458.021,145.83,458.06,145.935,458.139,146.016z"
	    })), React.createElement("g", {
	      "className": 'launcher-concept-row launcher-question'
	    }, React.createElement("circle", {
	      "fill": "#F47641",
	      "cx": "450.107",
	      "cy": "176.179",
	      "r": "7.236"
	    }), React.createElement("path", {
	      "fill": "#FFFFFF",
	      "d": "M453.193,177.441c-0.126,0.413-0.313,0.755-0.56,1.028l0.826,0.778l-0.784,0.818l-0.864-0.82 c-0.264,0.16-0.492,0.273-0.685,0.338c-0.322,0.108-0.708,0.162-1.158,0.162c-0.938,0-1.714-0.28-2.326-0.84 c-0.743-0.674-1.114-1.664-1.114-2.969c0-1.315,0.381-2.31,1.143-2.983c0.622-0.55,1.395-0.825,2.319-0.825 c0.931,0,1.712,0.292,2.344,0.874c0.729,0.674,1.094,1.616,1.094,2.827C453.428,176.471,453.35,177.008,453.193,177.441z M450.465,178.408c0.088-0.023,0.2-0.063,0.337-0.123l-0.729-0.693l0.772-0.807l0.731,0.689c0.114-0.234,0.194-0.439,0.239-0.615 c0.072-0.264,0.107-0.571,0.107-0.923c0-0.807-0.165-1.431-0.496-1.872s-0.813-0.662-1.448-0.662 c-0.596,0-1.071,0.211-1.426,0.635s-0.532,1.056-0.532,1.899c0,0.986,0.254,1.693,0.762,2.119 c0.329,0.277,0.723,0.415,1.182,0.415C450.139,178.471,450.305,178.45,450.465,178.408z"
	    }), React.createElement("g", {
	      "className": 'launcher-text'
	    }, React.createElement("rect", {
	      "fill": "#222E65",
	      "x": "461.509",
	      "y": "170.954",
	      "width": "138.3",
	      "height": "3.845"
	    }), React.createElement("polygon", {
	      "fill": "#7A7A99",
	      "points": "599.809,170.954 573.238,170.954 567.367,174.799 599.809,174.799"
	    }), React.createElement("rect", {
	      "x": "461.509",
	      "y": "177.623",
	      "fill": "#222E65",
	      "width": "83.606",
	      "height": "3.845"
	    }))), React.createElement("g", {
	      "className": 'launcher-concept-row launcher-answer launcher-a'
	    }, React.createElement("g", {
	      "className": 'launcher-circle'
	    }, React.createElement("circle", {
	      "fill": "#FFFFFF",
	      "cx": "451.581",
	      "cy": "196.976",
	      "r": "5.762"
	    }), React.createElement("path", {
	      "className": 'launcher-letter',
	      "fill": "#9A9A9B",
	      "d": "M451.479,196.31c0.207-0.026,0.355-0.059,0.444-0.098c0.16-0.068,0.24-0.173,0.24-0.316 c0-0.174-0.062-0.295-0.184-0.361s-0.303-0.1-0.541-0.1c-0.267,0-0.456,0.065-0.566,0.195c-0.079,0.096-0.132,0.227-0.158,0.391 h-1.074c0.023-0.373,0.128-0.678,0.314-0.918c0.295-0.375,0.803-0.562,1.522-0.562c0.468,0,0.884,0.092,1.248,0.277 c0.364,0.185,0.545,0.534,0.545,1.047v1.953c0,0.135,0.002,0.299,0.008,0.492c0.008,0.146,0.03,0.245,0.066,0.297 s0.091,0.095,0.164,0.129v0.164h-1.211c-0.034-0.086-0.057-0.167-0.07-0.242s-0.023-0.162-0.031-0.258 c-0.154,0.167-0.333,0.309-0.534,0.426c-0.241,0.138-0.514,0.207-0.817,0.207c-0.388,0-0.708-0.11-0.961-0.33 c-0.252-0.22-0.379-0.532-0.379-0.936c0-0.523,0.203-0.902,0.61-1.137c0.223-0.127,0.551-0.219,0.984-0.273L451.479,196.31z M452.16,196.83c-0.071,0.044-0.144,0.08-0.216,0.107c-0.073,0.027-0.172,0.053-0.299,0.076l-0.253,0.047 c-0.238,0.042-0.408,0.092-0.512,0.152c-0.175,0.102-0.263,0.259-0.263,0.473c0,0.19,0.054,0.328,0.161,0.412 s0.237,0.127,0.391,0.127c0.243,0,0.467-0.07,0.672-0.211s0.312-0.397,0.319-0.77V196.83z"
	    })), React.createElement("g", {
	      "className": 'launcher-text'
	    }, React.createElement("polygon", {
	      "fill": "#E5E5E5",
	      "points": "461.827,193.022 461.827,196.224 534.651,196.224 539.54,193.022  "
	    }), React.createElement("polygon", {
	      "fill": "#EFEFEF",
	      "points": "554.25,193.022 539.54,193.022 534.651,196.224 554.25,196.224  "
	    }), React.createElement("polygon", {
	      "fill": "#E5E5E5",
	      "points": "461.827,198.089 461.827,201.291 526.914,201.291 531.802,198.089"
	    }), React.createElement("polygon", {
	      "fill": "#EFEFEF",
	      "points": "554.25,198.089 531.802,198.089 526.914,201.291 554.25,201.291"
	    }))), React.createElement("g", {
	      "className": 'launcher-concept-row launcher-answer launcher-b'
	    }, React.createElement("g", {
	      "className": 'launcher-circle'
	    }, React.createElement("circle", {
	      "fill": "#FFFFFF",
	      "cx": "451.581",
	      "cy": "214.626",
	      "r": "5.762"
	    }), React.createElement("path", {
	      "className": 'launcher-letter',
	      "fill": "#9A9A9B",
	      "d": "M453.428,213.598c0.318,0.404,0.478,0.924,0.478,1.562c0,0.662-0.157,1.209-0.471,1.645 s-0.752,0.652-1.315,0.652c-0.353,0-0.637-0.07-0.852-0.211c-0.128-0.083-0.267-0.229-0.416-0.438v0.535h-1.098v-5.75h1.113v2.047 c0.142-0.198,0.297-0.349,0.468-0.453c0.202-0.13,0.459-0.195,0.771-0.195C452.668,212.993,453.109,213.194,453.428,213.598z M452.498,216.192c0.16-0.232,0.24-0.537,0.24-0.914c0-0.302-0.04-0.552-0.118-0.75c-0.149-0.375-0.425-0.562-0.827-0.562 c-0.407,0-0.687,0.184-0.839,0.551c-0.079,0.195-0.118,0.448-0.118,0.758c0,0.365,0.082,0.667,0.244,0.906 c0.163,0.24,0.411,0.359,0.745,0.359C452.113,216.54,452.337,216.424,452.498,216.192z"
	    })), React.createElement("g", {
	      "className": 'launcher-text'
	    }, React.createElement("polygon", {
	      "fill": "#E5E5E5",
	      "points": "461.827,210.412 461.827,213.613 508.098,213.613 512.986,210.412"
	    }), React.createElement("polygon", {
	      "fill": "#EFEFEF",
	      "points": "554.25,210.412 512.986,210.412 508.098,213.613 554.25,213.613"
	    }), React.createElement("polygon", {
	      "fill": "#E5E5E5",
	      "points": "461.827,215.542 461.827,218.744 500.263,218.744 505.151,215.542"
	    }), React.createElement("polygon", {
	      "fill": "#EFEFEF",
	      "points": "554.25,215.542 505.151,215.542 500.263,218.744 554.25,218.744"
	    }))), React.createElement("g", {
	      "className": 'launcher-concept-row launcher-answer launcher-c'
	    }, React.createElement("g", {
	      "className": 'launcher-circle'
	    }, React.createElement("circle", {
	      "fill": "#FFFFFF",
	      "cx": "451.581",
	      "cy": "232.142",
	      "r": "5.762"
	    }), React.createElement("path", {
	      "className": 'launcher-letter',
	      "fill": "#9A9A9B",
	      "d": "M452.339,231.77c-0.021-0.159-0.074-0.302-0.161-0.43c-0.125-0.172-0.32-0.258-0.583-0.258 c-0.376,0-0.633,0.186-0.771,0.559c-0.073,0.197-0.109,0.46-0.109,0.787c0,0.312,0.037,0.562,0.109,0.752 c0.133,0.354,0.384,0.531,0.752,0.531c0.261,0,0.446-0.07,0.556-0.211s0.176-0.323,0.2-0.547h1.137 c-0.026,0.338-0.148,0.659-0.368,0.961c-0.349,0.487-0.867,0.73-1.552,0.73s-1.19-0.203-1.513-0.609s-0.485-0.933-0.485-1.58 c0-0.73,0.179-1.299,0.536-1.705s0.85-0.609,1.478-0.609c0.534,0,0.972,0.12,1.312,0.359c0.34,0.24,0.542,0.663,0.604,1.27 H452.339z"
	    })), React.createElement("g", {
	      "className": 'launcher-text'
	    }, React.createElement("polygon", {
	      "fill": "#E5E5E5",
	      "points": "461.827,227.885 461.827,231.086 481.415,231.086 486.303,227.885"
	    }), React.createElement("polygon", {
	      "fill": "#EFEFEF",
	      "points": "565.411,227.885 486.303,227.885 481.415,231.086 565.411,231.086"
	    }), React.createElement("polygon", {
	      "fill": "#E5E5E5",
	      "points": "461.827,233.201 461.827,236.402 473.297,236.402 478.186,233.201"
	    }), React.createElement("polygon", {
	      "fill": "#EFEFEF",
	      "points": "524.301,233.201 478.186,233.201 473.297,236.402 524.301,236.402"
	    }))), React.createElement("g", {
	      "className": 'launcher-concept-row launcher-answer launcher-d'
	    }, React.createElement("g", {
	      "className": 'launcher-circle'
	    }, React.createElement("circle", {
	      "fill": "#FFFFFF",
	      "cx": "451.581",
	      "cy": "249.804",
	      "r": "5.762"
	    }), React.createElement("path", {
	      "fill": "none",
	      "d": "M451.412,249.075c-0.326,0-0.564,0.123-0.717,0.369s-0.229,0.551-0.229,0.916c0,0.354,0.072,0.636,0.198,0.863 l1.666-1.09c-0.042-0.372-0.145-0.674-0.356-0.854C451.813,249.143,451.625,249.075,451.412,249.075z"
	    }), React.createElement("path", {
	      "className": 'launcher-letter',
	      "fill": "#9A9A9B",
	      "d": "M450.467,250.36c0-0.365,0.076-0.67,0.229-0.916s0.391-0.369,0.717-0.369c0.213,0,0.401,0.068,0.562,0.203 c0.211,0.18,0.314,0.482,0.356,0.854l1.136-0.744v-2.677h-1.129v2.031c-0.125-0.201-0.288-0.357-0.488-0.471s-0.43-0.17-0.688-0.17 c-0.56,0-1.007,0.208-1.342,0.625s-0.502,0.988-0.502,1.715c0,0.557,0.141,1.019,0.405,1.397l0.941-0.617 C450.539,250.997,450.467,250.715,450.467,250.36z"
	    }), React.createElement("path", {
	      "className": 'launcher-letter-dark',
	      "fill": "#CFCECE",
	      "d": "M451.084,252.595c0.302,0,0.555-0.057,0.758-0.172s0.384-0.298,0.543-0.551v0.59h1.082v-3.073l-1.136,0.744 c0.01,0.091,0.039,0.161,0.039,0.263c0,0.373-0.082,0.676-0.246,0.91s-0.404,0.352-0.719,0.352s-0.55-0.118-0.705-0.354 c-0.015-0.023-0.021-0.056-0.034-0.081l-0.941,0.617c0.035,0.05,0.064,0.104,0.104,0.151 C450.168,252.394,450.586,252.595,451.084,252.595z"
	    }), React.createElement("path", {
	      "className": 'launcher-letter-hole',
	      "fill": "#FFFFFF",
	      "d": "M450.699,251.304c0.155,0.236,0.39,0.354,0.705,0.354s0.555-0.117,0.719-0.352s0.246-0.538,0.246-0.91 c0-0.102-0.028-0.172-0.039-0.263l-1.666,1.09C450.679,251.248,450.684,251.281,450.699,251.304z"
	    })), React.createElement("g", {
	      "className": 'launcher-text'
	    }, React.createElement("rect", {
	      "x": "461.827",
	      "y": "245.545",
	      "fill-rule": "evenodd",
	      "fill": "#EFEFEF",
	      "width": "100.223",
	      "height": "3.201"
	    }), React.createElement("rect", {
	      "x": "461.827",
	      "y": "250.92",
	      "fill-rule": "evenodd",
	      "fill": "#EFEFEF",
	      "width": "48.276",
	      "height": "3.084"
	    })))));
	  }
	});

	BackgroundAndDesk = React.createClass({
	  displayName: 'BackgroundAndDesk',
	  propTypes: {
	    height: React.PropTypes.number.isRequired
	  },
	  render: function() {
	    var height;
	    height = this.props.height;
	    return React.createElement("svg", {
	      "x": "0px",
	      "y": "0px",
	      "width": "100%",
	      "height": height + "px",
	      "preserveAspectRatio": "xMidYMin meet",
	      "version": "1.1",
	      "xmlns": "http://www.w3.org/2000/svg"
	    }, React.createElement("g", null, React.createElement("rect", {
	      "className": 'launcher-background',
	      "y": "0.541",
	      "fill": "#E5E5E5",
	      "width": "100%",
	      "height": "100%"
	    }), React.createElement("rect", {
	      "className": 'launcher-desk',
	      "y": "70%",
	      "fill-rule": "evenodd",
	      "fill": "#FFFFFF",
	      "width": "100%",
	      "height": "30%"
	    })));
	  }
	});

	module.exports = {
	  LaptopAndMug: LaptopAndMug,
	  BackgroundAndDesk: BackgroundAndDesk
	};


/***/ }
/******/ ])
});
;