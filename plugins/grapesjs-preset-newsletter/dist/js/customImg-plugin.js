(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("grapesjs"));
	else if(typeof define === 'function' && define.amd)
		define(["grapesjs"], factory);
	else if(typeof exports === 'object')
		exports["customImg-plugin"] = factory(require("grapesjs"));
	else
		root["customImg-plugin"] = factory(root["grapesjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _grapesjs = __webpack_require__(1);

var _grapesjs2 = _interopRequireDefault(_grapesjs);

var _components = __webpack_require__(2);

var _components2 = _interopRequireDefault(_components);

var _blocks = __webpack_require__(3);

var _blocks2 = _interopRequireDefault(_blocks);

var _traits = __webpack_require__(4);

var _traits2 = _interopRequireDefault(_traits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _grapesjs2.default.plugins.add('customImg-plugin', function (editor) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = opts;

  var defaults = {
    // default options
  };

  // Load defaults
  for (var name in defaults) {
    if (!(name in config)) config[name] = defaults[name];
  }
  // Add components

  (0, _components2.default)(editor, config);

  // Add blocks
  (0, _blocks2.default)(editor, config);

  (0, _traits2.default)(editor, config);

  // TODO Remove
  //editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (editor) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var comps = editor.DomComponents;
  var defaultType = comps.getType('link');
  var defaultModel = defaultType.model;
  var defaultView = defaultType.view;

  comps.addType('customImg', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        //tagName: 'a',
        //style: {'display':'inline-block'},
        highlightable: false,
        droppable: false,
        editable: false, /* prevent ckeditor from treating this as editable text */
        resizable: true,
        badgable: false,
        classes: ['customImg'], //this will prevent the editor from auto-generating an ID-CSS Class which messes up resizing on reload
        traits: [{
          //placeholder for our media library link
          type: 'text'

        }, {
          type: 'text',
          label: 'Image URL',
          name: 'src',
          changeProp: 1
        }, {
          type: 'text',
          label: 'Image Description',
          name: 'alt',
          changeProp: 1
        }, {
          type: 'text',
          label: 'Destination URL',
          name: 'href',
          placeholder: 'http://www.example.com',
          changeProp: 1
        }, {
          type: 'checkbox',
          label: 'Track Clicks',
          name: 'trackClicks',
          changeProp: 1,
          id: 'test'
        }, {
          type: 'text',
          label: 'Reporting Name',
          name: 'name',
          changeProp: 1
        }, {
          type: 'buttonGroup',
          name: 'buttonGroup',
          label: '',
          changeProp: 1
        }]

      }),

      initialize: function initialize() {
        defaultModel.prototype.initialize.apply(this, arguments);

        //this.set('attributes', { 'data-gjs-comp-type': 'customImg' });
        //listen for active event(on drop)
        this.listenTo(this, 'active', this.doOnDropStuff); // listen for active event
        this.on('destroy', this.handleRemove);
      },
      handleRemove: function handleRemove() {
        editor.Panels.getButton('views', 'open-blocks').set('active', 1);
      },
      doOnDropStuff: function doOnDropStuff(component, value) {
        //open the image/link settings
        editor.select(this);
        editor.Panels.getButton('views', 'open-tm').set('active', 1);
        updateMediaLibaryTrait();

        //update the model 
      },
      updateDimensions: function updateDimensions(component) {
        //console.log(component.attributes.components.models[0].view);
        // if(src.indexOf("267x141") > 0) {
        //   this.model.set('style', { display: 'inline-block', width: selComponentWidth, height:selComponentHeight });
        //   this.view.render();
        // }
      },
      updateSrc: function updateSrc(component, value) {
        component.view.$el.find('img').attr('src', value);
        component.view.$el.find('img').attr('data-cke-saved-src', value);
        var imgId = component.view.$el.find('img').attr('id');
        if (this.attributes.components.models.length) {
          try {
            var alt = this.view.$el.find('img').attr('alt');
            var a = this.attributes.components.models[0].get('attributes');
            var b;
            if (imgId != null) b = { "src": value, "alt": alt, "id": imgId };else b = { "src": value, "alt": alt };
            this.attributes.components.models[0].set('attributes', b);
            this.attributes.components.models[0].attributes.src = value;
          } catch (x) {}
        } else {
          //no model exists, so just update the view
          this.set('content', component.view.el.children[0].outerHTML);
        }
        this.view.render();
      },
      updateHref: function updateHref(component, value) {

        var w = component.view.el.style.width;
        var h = component.view.el.style.height;

        if (component.view.$el.attr('name') == null) {
          var reportName = generateReportingName('', value);
          component.view.$el.attr('name', reportName);
        }
        component.view.$el.attr('href', value);

        try {
          var href = this.view.$el.attr('href');
          var c = this.view.$el.attr('class');
          var n = this.view.$el.attr('name');
          var a = this.get('attributes');
          var b = { "name": name, "class": c, "href": href };
          this.set('attributes', b);
          this.attributes.href = href;
        } catch (x) {}
        this.view.render();
        component.view.el.style.width = w;
        component.view.el.style.height = h;
      },
      updateName: function updateName(component, value) {
        var w = component.view.el.style.width;
        var h = component.view.el.style.height;
        component.view.$el.attr('name', value);
        try {
          var name = this.view.$el.attr('name');
          var c = this.view.$el.attr('class');
          var a = this.get('attributes');
          var b = { "name": name, "class": c };
          this.set('attributes', b);
          this.attributes.name = name;
        } catch (x) {}
        this.view.render();
        component.view.el.style.width = w;
        component.view.el.style.height = h;
      },
      updateAlt: function updateAlt(component, value) {
        var w = component.view.el.style.width;
        var h = component.view.el.style.height;
        component.view.$el.find('img').attr('alt', value);
        var imgId = component.view.$el.find('img').attr('id');
        if (this.attributes.components.models.length) {
          try {
            var src = this.view.$el.find('img').attr('src');
            var a = this.attributes.components.models[0].get('attributes');
            var b;
            if (imgId != null) b = { "src": src, "alt": value, "id": imgId };else b = { "src": src, "alt": value };
            this.attributes.components.models[0].set('attributes', b);
            this.attributes.components.models[0].attributes.src = src;
          } catch (x) {}
        } else {
          //no model exists, so just update the view
          this.set('content', component.view.el.children[0].outerHTML);
        }
        this.view.render();
        component.view.el.style.width = w;
        component.view.el.style.height = h;
      },
      updateTrackedLink: function updateTrackedLink(component, value) {
        var w = component.view.el.style.width;
        var h = component.view.el.style.height;
        //if we uncheck tracking, set the name to LinkIsNotTracked
        var reportName = "";
        if (!value) reportName = "LinkIsNotTracked";else {
          //check if we have a report name and set the name to that
          reportName = editor.TraitManager.getTraitsViewer().collection.models[5].attributes.value;

          if (reportName != null && reportName != "" && reportName != "LinkIsNotTracked") component.view.$el.attr('name', reportName);else {
            //check if we have a URL and set the name to that
            var href = component.view.$el.attr('href');
            if (href != null) {
              reportName = generateReportingName('', href);
              component.view.$el.attr('name', reportName);
            } else {
              //if we don't have any other data to set the name, remove it
              component.view.$el.removeAttr('name');
            }
          }
        }
        try {
          var href = this.view.$el.attr('href');
          var c = this.view.$el.attr('class');
          var a = this.get('attributes');
          var b = { "name": reportName, "class": c, "href": href };
          this.set('attributes', b);
          this.attributes.name = reportName;
          editor.TraitManager.getTraitsViewer().collection.models[5].setTargetValue(reportName);
          editor.TraitManager.getTraitsViewer().render();
          updateMediaLibaryTrait();
        } catch (x) {}
        this.view.render();
        component.view.el.style.width = w;
        component.view.el.style.height = h;
      },
      restoreTraits: function restoreTraits() {}

    }, {
      isComponent: function isComponent(el) {
        if ($(el).is("a") && $(el).find('img').length || $(el).hasClass("customImg")) return { type: 'customImg' };
      }
    }),

    view: defaultType.view.extend({
      events: {
        click: 'openSettings'

      },
      openSettings: function openSettings(e) {
        e.preventDefault();
        editor.select(this.model);
        editor.Panels.getButton('views', 'open-tm').set('active', 1);

        var w = e.target.style.width;
        var h = e.target.style.height;

        //we need to manually restore our traits b/c we are not saving/restoring component info
        //img src
        try {
          var src = this.model.attributes.components.models[0].attributes.src;
          editor.TraitManager.getTraitsViewer().collection.models[1].setTargetValue(src);
        } catch (x) {}

        //img alt
        try {
          var alt = this.model.attributes.components.models[0].attributes.attributes.alt;
          if (alt == null || alt == "null") alt = "";
          editor.TraitManager.getTraitsViewer().collection.models[2].setTargetValue(alt);
        } catch (x) {}

        //href
        try {
          var href = this.model.attributes.attributes.href;
          if (href == null) href = "";
          editor.TraitManager.getTraitsViewer().collection.models[3].setTargetValue(href);
        } catch (x) {}

        //name & track link checkbox
        try {
          var name = this.model.get('attributes').name;
          if (name == null) name = "";
          editor.TraitManager.getTraitsViewer().collection.models[5].setTargetValue(name);

          if (name == "LinkIsNotTracked" || name == '' || name == null) editor.TraitManager.getTraitsViewer().collection.models[4].setTargetValue(false);else editor.TraitManager.getTraitsViewer().collection.models[4].setTargetValue(true);
        } catch (x) {}

        this.model.unset(src);

        //refresh the view
        editor.TraitManager.getTraitsViewer().render();

        e.target.style.width = w;
        e.target.style.height = h;

        updateMediaLibaryTrait();
      },
      render: function render(imgWidth, imgHeight) {
        defaultView.prototype.render.apply(this, arguments);

        //prevent dragging of the component once inside the canvas, force use of the move toolbar icon
        this.$el.attr("onmousedown", "return false");

        return this;
      }
    })
  });

  function generateReportingName(linkText, linkUrl) {
    if (linkUrl.indexOf("#") == 0) {
      return noTrackedLinks;
    }
    var usedField = linkText.trim();
    if (usedField == "") {
      usedField = linkUrl.trim();
    }
    usedField = usedField.replace("http://", "");
    usedField = usedField.replace("www.", "");
    //var nonChars = new XRegExp('[^\\p{L}\\s\\d]*', 'g');
    //input.replace(/\W/g, '')
    usedField = usedField.replace(/\W/g, '');
    return usedField.trim().substring(0, 45);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (editor) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var bm = editor.BlockManager;

  bm.add('customImg-block', _defineProperty({
    label: 'Image',
    attributes: { class: 'gjs-fonts gjs-f-image' },
    content: {
      type: 'customImg',
      attributes: { class: 'customImg' },
      activeOnRender: 1
    }
  }, 'content', '<a class="customImg" style="display:inline-block; width:267px; height:141px;"><img src="../images/267x141.png" class="linkImage" style="min-width:100%; min-height:100%; max-width: 100%; max-height: 100%;"></img></a>'));
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

exports.default = function (editor) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


        editor.TraitManager.addType('buttonGroup', {
                events: {
                        click: 'onClick' // trigger parent onChange method on keyup
                },

                /**
                * Returns the input element
                * @return {HTMLElement}
                */
                getInputEl: function getInputEl() {
                        if (!this.inputEl) {
                                var div = document.createElement('div');
                                var btnUpdate = document.createElement('button');
                                btnUpdate.setAttribute('class', 'btnUpdate');
                                btnUpdate.innerHTML = 'OK';
                                btnUpdate.id = "btnUpdate";

                                var btnCancel = document.createElement('button');
                                btnCancel.setAttribute('class', 'btnCancel');
                                btnCancel.innerHTML = 'Cancel';
                                btnCancel.id = "btnCancel";

                                var d = this.$el.children()[1];
                                $(d).removeClass('gjs-field');
                                //input.onclick = this.btnUpdateClick;

                                div.appendChild(btnUpdate);
                                div.appendChild(btnCancel);
                                this.inputEl = div;
                        }
                        return this.inputEl;
                },
                onClick: function onClick(e) {
                        if (e.target.id == "btnUpdate") {
                                this.doUpdate();
                        } else if (e.target.id == "btnCancel") {
                                this.doCancel();
                        }
                },
                doUpdate: function doUpdate() {

                        var selectedComponent = editor.getSelected();

                        var selComponentSrc = "";
                        if (selectedComponent != null) {
                                selComponentSrc = selectedComponent.view.el.children[0].src;
                        }

                        //get all of our trait values:
                        var src = this.model.collection.models[1].get('value');
                        var alt = this.model.collection.models[2].get('value');
                        var href = this.model.collection.models[3].get('value');
                        var trackClicks = this.model.collection.models[4].get('value');
                        var name = this.model.collection.models[5].get('value');

                        //update the model with our values, call the component update methods
                        this.target.updateSrc(this.target, src);
                        this.target.updateAlt(this.target, alt);
                        this.target.updateHref(this.target, href);
                        this.target.updateName(this.target, name);
                        this.target.updateTrackedLink(this.target, trackClicks);

                        if (selComponentSrc != "" && selComponentSrc != null && selComponentSrc != undefined) {
                                //check if this is the default placeholder image, if so render the image source dimensions, override placeholder
                                if (selComponentSrc.indexOf('267x141') > 0) {
                                        this.target.updateDimensions(this.target);
                                }
                        }
                },
                doCancel: function doCancel() {
                        var src = this.target.view.$el.children().first().attr('src');
                        editor.TraitManager.getTraitsViewer().collection.models[1].setTargetValue(src);

                        var alt = this.target.view.$el.children().first().attr('alt');
                        editor.TraitManager.getTraitsViewer().collection.models[2].setTargetValue(alt);

                        var href = this.target.attributes.attributes.href;
                        editor.TraitManager.getTraitsViewer().collection.models[3].setTargetValue(href);

                        var name = this.target.attributes.attributes.name;
                        editor.TraitManager.getTraitsViewer().collection.models[5].setTargetValue(name);

                        if (name == "" || name == null || name == "LinkIsNotTracked") {
                                editor.TraitManager.getTraitsViewer().collection.models[4].setTargetValue(false);
                        } else {
                                editor.TraitManager.getTraitsViewer().collection.models[4].setTargetValue(true);
                        }
                        editor.TraitManager.getTraitsViewer().render();
                        updateMediaLibaryTrait();
                },
                renderLabel: function renderLabel() {
                        this.$el.html('<div class="' + this.labelClass + '"></div>');
                },

                /**
                 * Triggered when the value of the model is changed
                 */

                onValueChange: function onValueChange() {
                        //this.target.set('content', this.model.get('value'));
                }
        });
};

/***/ })
/******/ ]);
});