const ComponentTableBody = require('./ComponentTableBody');

module.exports = ComponentTableBody.extend(
  {
    defaults: {
      ...ComponentTableBody.prototype.defaults,
      type: 'tfoot',
      tagName: 'tfoot',
      unstylable: ['width', 'max-width', 'height', 'min-height', 'text-shadow',
      'font', 'font-size', 'font-weight', 'letter-spacing', 'vertical-align',
      'color', 'line-height', 'text-decoration', 'font-family', 'font-style'
     ],
    }
  },
  {
    isComponent(el) {
      let result = '';

      if (el.tagName == 'TFOOT') {
        result = { type: 'tfoot' };
      }

      return result;
    }
  }
);
