const Component = require('./Component');

module.exports = Component.extend({
  defaults: {
    ...Component.prototype.defaults,
    type: 'text',
    droppable: 'a',
    editable: true,
    unstylable: ['width', 'max-width', 'height', 'min-height', 'text-shadow',
    'font', 'font-size', 'font-weight', 'letter-spacing', 'vertical-align',
    'color', 'line-height', 'text-decoration', 'font-family', 'font-style'
   ],
  }
});
