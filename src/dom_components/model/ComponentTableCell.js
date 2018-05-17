const Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: {
      ...Component.prototype.defaults,
      type: 'cell',
      tagName: 'td',
      draggable: ['tr'],
      unstylable: ['width', 'max-width', 'height', 'min-height', 'text-shadow',
      'font', 'font-size', 'font-weight', 'letter-spacing', 'vertical-align',
      'color', 'line-height', 'text-decoration', 'font-family', 'font-style'
     ],
    }
  },
  {
    isComponent(el) {
      let result = '';
      const tag = el.tagName;

      if (tag == 'TD' || tag == 'TH') {
        result = {
          type: 'cell',
          tagName: tag.toLowerCase()
        };
      }

      return result;
    }
  }
);
