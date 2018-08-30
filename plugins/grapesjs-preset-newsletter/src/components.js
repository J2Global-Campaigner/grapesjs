// export default (editor, config = {}) => {
//     const comps = editor.DomComponents;
//     const defaultType = comps.getType('text');
//     const defaultModel = defaultType.model;
//     const defaultView = defaultType.view;
  
  
//     comps.extend('text', {
//       model: defaultModel.extend({
//         defaults: Object.assign({}, defaultModel.prototype.defaults, {
//           activeOnRender: true,
//           badgable: false,
//           status: "selected",
//           classes: ['custom-text'], 
//         }),
  
//         initialize: function initialize() {
//           defaultModel.prototype.initialize.apply(this, arguments);
  
//           this.listenTo(this, 'active', this.doOnDropStuff); // listen for active event
//           this.on('destroy', this.handleRemove);
//           //for whatever reason, the ckeditor will only appear initially, and then will not render after text loses focus
//           //page reload, isCompnoent is called and component is treated as a 'text' type, and all is well
//           //so here we need to explicitely set the type to text to resolve this issue
//           //the only reason for this component is to have the class properties open on text focus
//           //this.set('type', 'text');
//         },
       
  
//         handleRemove: function() {
//           editor.Panels.getButton('views', 'open-blocks').set('active', 1);
  
//         },
//         doOnDropStuff: function (component, value) {
//           editor.select(this);
//           editor.Panels.getButton('views', 'open-sm').set('active', 1);
//         },
//     },
//         {
//           isComponent: function (el) {
//            if($(el).hasClass("custom-text"))
//               return { type: 'text' };
//           }
//         }
//       ),
  
//       view: defaultType.view.extend({
        
//         events: {
//           click: 'openSettings',
         
//         },
       
//         openSettings: function (e) {
//           e.preventDefault();
//           editor.select(this.model);
//           editor.Panels.getButton('views', 'open-sm').set('active', 1);
//         },
//         render: function() {
//           defaultView.prototype.render.apply(this, arguments);
//           return this;
//         }
//       })
//     });
//   }
  
  
  