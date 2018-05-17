const Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: {
      ...Component.prototype.defaults,
      type: 'row',
      tagName: 'tr',
      draggable: ['thead', 'tbody', 'tfoot'],
      droppable: ['th', 'td'],
      unstylable: ['width', 'max-width', 'height', 'min-height', 'text-shadow',
      'font', 'font-size', 'font-weight', 'letter-spacing', 'vertical-align',
      'color', 'line-height', 'text-decoration', 'font-family', 'font-style'
     ],
    },

    initialize(o, opt) {
      Component.prototype.initialize.apply(this, arguments);

      // Clean the row from non cell components
      const cells = [];
      const components = this.get('components');
      components.each(model => model.is('cell') && cells.push(model));
      components.reset(cells);
    }
  },
  {
    isComponent(el) {
      let result = '';

      if (el.tagName == 'TR') {
        result = { type: 'row' };
      }

      return result;
    }
  }
);
