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
      'color',

    ]
  },

  // Could be used for default components
  components: [],

  // Class for new image component
  imageCompClass: 'fa fa-picture-o',

  // Open assets manager on create of image component
  oAssetsOnCreate: true,

  // TODO to remove
  // Editor should also store the wrapper informations, but as this change might
  // break stuff I set ii as an opt-in option, for now.
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
