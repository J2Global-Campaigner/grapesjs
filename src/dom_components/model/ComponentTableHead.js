const ComponentTableBody = require('./ComponentTableBody');

module.exports = ComponentTableBody.extend(
  {
    defaults: {
      ...ComponentTableBody.prototype.defaults,
      type: 'thead',
      tagName: 'thead',
      unstylable: ['width', 'max-width', 'height', 'min-height', 'text-shadow',
      'font', 'font-size', 'font-weight', 'letter-spacing', 'vertical-align',
      'color', 'line-height', 'text-decoration', 'font-family', 'font-style'
     ],
    }
  },
  {
    isComponent(el) {
      let result = '';

      if (el.tagName == 'THEAD') {
        result = { type: 'thead' };
      }

      return result;
    }
  }
);
