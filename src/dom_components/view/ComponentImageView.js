var Backbone = require('backbone');
var ComponentView = require('./ComponentView');

module.exports = ComponentView.extend({
  tagName: 'img',

  events: {
    //dblclick: 'openModal',
    click: 'openSettings'
  },

  initialize(o) {
    const model = this.model;
    ComponentView.prototype.initialize.apply(this, arguments);
    //this.listenTo(model, 'change:src', this.updateSrc);
    //this.listenTo(model, 'dblclick active', this.openModal);
  


    this.classEmpty = `${this.ppfx}plh-image`;
    const config = this.config;
    config.modal && (this.modal = config.modal);
    config.am && (this.am = config.am);
    this.fetchFile();
  },
  openSettings: function (e) {
    e.preventDefault();
    editor.select(this.model);
    editor.showPanel('properties'); 

  // we don't want the slider to be used for the width, make it an integer
  $("#gjs-sm-width").removeClass('gjs-sm-slider').addClass('gjs-sm-integer');
  $("#gjs-sm-width .gjs-field-range").hide();
  let widthProp = editor.StyleManager.getProperty("Dimension", "width");
  widthProp.set('type', 'integer');
  widthProp.set("min", 0);
  widthProp.set("max", "");
  widthProp.set("step", 1);
  widthProp.unset("showInput");

    //var w = e.target.style.width;
    //var h = e.target.style.height;

    //we need to manually restore our traits b/c we are not saving/restoring component info
    //img src
    try {
      var src = this.model.get('attributes').src;
      if(src.indexOf("imgPlaceholder150x150") > -1) src = "";
      editor.TraitManager.getTraitsViewer().collection.models[1].setTargetValue(src);
    
    }
    catch (x) { }

    //img alt
    try {
      var alt = this.model.get('attributes').alt;
      if (alt == null || alt == "null")
        alt = "";
      editor.TraitManager.getTraitsViewer().collection.models[2].setTargetValue(alt);
    }
    catch (x) { }

    //href
    try {
      var href = this.model.get('attributes').href;
      if (href == null)
        href = "";
      editor.TraitManager.getTraitsViewer().collection.models[3].setTargetValue(href);
    }
    catch (x) { }

    //name & track link checkbox
    try {
      var name = this.model.get('attributes').name;
      if (name == null)
        name = "";
      editor.TraitManager.getTraitsViewer().collection.models[5].setTargetValue(name);

      if (name == "LinkIsNotTracked" || name == '' || name == null)
        editor.TraitManager.getTraitsViewer().collection.models[4].setTargetValue(false);
      else
        editor.TraitManager.getTraitsViewer().collection.models[4].setTargetValue(true);
    }
    catch (x) { }

    //refresh the view
    editor.TraitManager.getTraitsViewer().render();

    // e.target.style.width = w;
    // e.target.style.height = h;

    updateMediaLibaryTrait();
  },

  /**
   * Fetch file if exists
   */
  fetchFile() {
    const model = this.model;
    const file = model.get('file');

    if (file) {
      const fu = this.em.get('AssetManager').FileUploader();
      fu.uploadFile(
        {
          dataTransfer: { files: [file] }
        },
        res => {
          const obj = res && res.data && res.data[0];
          const src = obj && obj.src;
          src && model.set({ src });
        }
      );
      model.set('file', '');
    }
  },

  /**
   * Update src attribute
   * @private
   * */
  updateSrc() {
    const src = this.model.get('src');
    const el = this.$el;
    el.attr('src', src);
    el[src ? 'removeClass' : 'addClass'](this.classEmpty);
  },

  

  /**
   * Open dialog for image changing
   * @param  {Object}  e  Event
   * @private
   * */
  openModal(e) {
    var em = this.opts.config.em;
    var editor = em ? em.get('Editor') : '';

    if (editor && this.model.get('editable')) {
      editor.runCommand('open-assets', {
        target: this.model,
        types: ['image'],
        accept: 'image/*',
        onSelect() {
          editor.Modal.close();
          editor.AssetManager.setTarget(null);
        }
      });
    }
  },


  render() {
    this.updateAttributes();
    this.updateClasses();
   

    var actCls = this.$el.attr('class') || '';
    if (!this.model.get('src'))
      this.$el.attr('class', (actCls + ' ' + this.classEmpty).trim());

    // Avoid strange behaviours while try to drag
    this.$el.attr('onmousedown', 'return false');
    return this;
  }
});

