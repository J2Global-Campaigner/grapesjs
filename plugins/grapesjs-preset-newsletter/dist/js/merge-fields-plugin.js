/*! merge-fields-plugin - 0.1.46 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("grapesjs"));
	else if(typeof define === 'function' && define.amd)
		define(["grapesjs"], factory);
	else if(typeof exports === 'object')
		exports["merge-fields-plugin"] = factory(require("grapesjs"));
	else
		root["merge-fields-plugin"] = factory(root["grapesjs"]);
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _grapesjs2.default.plugins.add('merge-fields-plugin', function (editor) {
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

  // TODO Remove
  editor.on('load', function () {
    return editor.addComponents('<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>');
  });
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
  var defaultType = comps.getType('default');
  var defaultModel = defaultType.model;
  var defaultView = defaultType.view;

  var mergeFieldsArray;

  comps.addType('merge-field', {
    // Define the Model
    model: defaultModel.extend({
      init: function init() {
        this.listenTo(this, 'change:mergeField', this.updateMergeFieldText);
        populateMergeFields();
      },
      updateMergeFieldText: function updateMergeFieldText(e) {
        var found = 0;
        var text = "";
        var traits = this.get('traits');

        traits.each(function (trait) {
          found = 1;
          if (trait.get('changeProp')) {
            var value = trait.getInitValue();
            if (value) {
              text = value;
            }
          }
        });

        if (text == "") text = "[Merge.Field]";
        this.set('content', text);

        //this little gem actually updates the UI to reflect the changes to the model
        this.view.render();
      },
      populateMergeFields: function populateMergeFields() {
        var mfTrait = this.get('traits').where({ name: 'mergeField' })[0];
        mfTrait.set('options', [{ value: 'val1', name: 'name1' }]);
        editor.trigger('change:selectedComponent');
        this.view.render();
      },


      // Extend default properties
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        type: 'merge-field',
        tagName: 'span',
        content: '[Merge.Field.Placeholder]',
        //attributes: { c2f: 'true' },

        // Can't drop other elements inside it
        droppable: false,
        draggable: true,
        highlightable: true,
        copyable: true,
        editable: false,
        selectable: true,
        hoverable: true,
        status: 'selected',

        // Traits (Settings)
        traits: [{
          // Change the type of the input (text, password, email, etc.)
          type: 'select',
          label: 'Merge Field',
          name: 'mergeField',
          changeProp: 1
          //options: mergeFieldsArray
          // options: [
          //   {value: '[Contact.FirstName]', name: 'Contact.FirstName'},
          //   {value: '[Contact.LastName]', name: 'Contact.LastName'},
          //   {value: '[Contact.Email]', name: 'Contact.Email'},
          //   {value: '[Contact.Phone]', name: 'Contact.Phone'},
          // ]
        }]
      })

    },
    // The second argument of .extend are static methods and we'll put inside our
    // isComponent() method. As you're putting a new Component type on top of the stack,
    // not declaring isComponent() might probably break stuff, especially if you extend
    // the default one.
    {
      isComponent: function isComponent(el) {
        if (el.tagName == 'select') {
          return { type: 'merge-field' };
        }
      }

    }),

    // Define the View
    view: defaultType.view
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (editor) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var bm = editor.BlockManager;

  bm.add('merge-field-block', {
    label: 'Merge Field Block',
    content: {
      type: 'merge-field',
      style: {
        height: '350px'
      },
      removable: true
    }
  });
};

/***/ })
/******/ ]);
});