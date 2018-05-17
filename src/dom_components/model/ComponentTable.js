const Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: {
      ...Component.prototype.defaults,
      type: 'table',
      tagName: 'table',
      droppable: ['tbody', 'thead', 'tfoot'],
      unstylable: ['width', 'max-width', 'height', 'min-height', 'text-shadow',
      'font', 'font-size', 'font-weight', 'letter-spacing', 'vertical-align',
      'color', 'line-height', 'text-decoration', 'font-family', 'font-style'
     ],
    },

    initialize(o, opt) {
      Component.prototype.initialize.apply(this, arguments);
      const components = this.get('components');
      !components.length && components.add({ type: 'tbody' });
    }
  },
  {
    isComponent(el) {
      let result = '';

      if (el.tagName == 'TABLE') {
        result = { type: 'table' };
      }

      return result;
    }
  }
);
