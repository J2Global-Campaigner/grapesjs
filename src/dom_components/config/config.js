module.exports = {
  stylePrefix: 'comp-',

  wrapperId: 'wrapper',

  wrapperName: 'Body',

  // Default wrapper configuration
  wrapper: {
    removable: false,
    copyable: false,
    draggable: false,
    components: [],
    traits: [],
    stylable: [
      'background-color',
      'font-size',
      'font-family',
      'font-weight',
      'font-style',
      'color'
    ]
  },

  // Could be used for default components
  components: [],

  // Class for new image component
  imageCompClass: 'fa fa-picture-o',

  // Open assets manager on create of image component
  oAssetsOnCreate: true,

  // Generally, if you don't edit the wrapper in the editor, like
  // custom attributes, you don't need the wrapper stored in your JSON
  // structure, but in case you need it you can use this option.
  // If you have `config.avoidInlineStyle` disabled the wrapper will be stored
  // as we need to store inlined style.
  storeWrapper: 0,

  // List of void elements
  voidElements: [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]
};
