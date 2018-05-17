var Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: _.extend({}, Component.prototype.defaults, {
      droppable: false,
      editable: true,
      unstylable: ['width', 'max-width', 'height', 'min-height', 'text-shadow',
      'font', 'font-size', 'font-weight', 'letter-spacing', 'vertical-align',
      'color', 'line-height', 'text-decoration', 'font-family', 'font-style'
     ],
    }),

    toHTML() {
      return this.get('content');
    }
  },
  {
    isComponent(el) {
      var result = '';
      if (el.nodeType === 3) {
        result = {
          type: 'textnode',
          content: el.textContent
        };
      }
      return result;
    }
  }
);
