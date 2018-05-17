var Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: {
      ...Component.prototype.defaults,
      type: 'image',
      tagName: 'img',
      customBadgeLabel: 'Image',
      activeOnRender: 1,
      src: '',
      void: 1,
      droppable: 0,
      copyable: 0,
      draggable: 0,
      editable: 1,
      highlightable: 0,
      resizable: 1,
      unstylable: ['width', 'max-width', 'height', 'min-height', 'text-shadow',
      'font', 'font-size', 'font-weight', 'letter-spacing', 'vertical-align',
      'color', 'line-height', 'text-decoration', 'font-family', 'font-style'
     ],
      traits: [
        {
          //placeholder for our media library link
          type: 'text',

        },
        {
          type: 'text',
          label: 'Image URL',
          name: 'src',
          changeProp: 1
        },
        {
          type: 'text',
          label: 'Image Description',
          name: 'alt',
          changeProp: 1
        },
        {
          type: 'text',
          label: 'Destination URL',
          name: 'href',
          placeholder: 'http://www.example.com',
          changeProp: 1
        },
        {
          type: 'checkbox',
          label: 'Track Clicks',
          name: 'trackClicks',
          changeProp: 1,
          id: 'test'
        },
        {
          type: 'text',
          label: 'Reporting Name',
          name: 'name',
          changeProp: 1
        },
        {
          type: 'buttonGroup',
          name: 'buttonGroup',
          label: '',
          changeProp: 1
        },


      ],

      // File to load asynchronously once the model is rendered
      file: ''
    },

    initialize(o, opt) {
      Component.prototype.initialize.apply(this, arguments);
      var attr = this.get('attributes');
      if (attr.src) this.set('src', attr.src);

      this.listenTo(this, 'active', this.doOnDropStuff); // listen for active event
      this.on('destroy', this.handleRemove);

      if(!this.get('isdrop')) {
        this.set({ style: {} });
      }
      else {
        this.doOnDropStuff();
      }

    },


    /* CUSTOM CODE TO HANDLE TRAITS & ON DROP/REMOVE LOGIC */
    handleRemove: function() {
      editor.Panels.getButton('views', 'open-blocks').set('active', 1);

    },
    doOnDropStuff: function (component, value) {
      //open the image/link settings
      editor.select(this);
      editor.Panels.getButton('views', 'open-tm').set('active', 1);
      updateMediaLibaryTrait();
      
      //update the model 
    },
    updateDimensions: function(component, src) {

     
      var m = this;
      var img = new Image();
      var srcHeight = 0;
      var srcWidth = 0;
        
    
      //set the image src in order to get the read dimensions
      img.src = src;

      //add event listener with callback to set the dimensions once the image has loaded
      if (img.complete) {
        this.imgLoaded(img.width, img.height, component);
      } else {
        img.addEventListener('load', this.imgLoaded)
      }
     
    },
    //updateDimensions image load callback
    imgLoaded: function(w, h, thisModel) {

      var srcWidth = 0;
      var srcHeight = 0;
      var classId = "";

      //check if we have info passed in or an object 
      if(typeof w === "object") {
        thisModel = editor.getSelected();
        srcWidth = w.target.width;
        srcHeight = w.target.height;
      }
      else {
        srcWidth = w;
        srcHeight = h;
      }

      //we need to get the class id that was assigned, and set our new dimensions as a class rule
      //setting it to the model inlines the css, and the image is not resizable
      var classes = thisModel.get('classes').models;
     
      for(var i=0; i<classes.length; i++) {
        //there should only be 2 classes because we control the image component customImg
       if(classes[i].id != "linkImage") {
          classId = classes[i].id;
       }
      }

        if(srcHeight != 0) {
          try {
            var sm = editor.SelectorManager;
            var sel1 = sm.add('linkImage');
            var sel2 = sm.add(classId);
            var rule = editor.CssComposer.get([sel1, sel2]);
            rule.set('style', { width: srcWidth + 'px', height: srcHeight + 'px' });
            thisModel.view.render();
          }
          catch(ex) {console.log(ex);}
          //unselect and reslect the component to adjust the resizer to the new size
          editor.select();
          editor.select(thisModel);
        }
    },
    updateSrc: function (component, value) {
      component.view.$el.attr('src', value);
      component.view.$el.attr('data-cke-saved-src', value);
      var imgId = component.view.$el.attr('id');
      if (this) {
        try {
          var alt = this.view.$el.attr('alt');
          this.attributes.src = value;
          this.attributes.alt = alt;
        }
        catch (x) { }
      }
      else {
        //no model exists, so just update the view
        this.set('content', component.view.el.outerHTML);
      }

      this.updateDimensions(component, value);
      this.view.render();
    },
    updateHref: function (component, value) {

      var imgLink = component.parent();
      if(!imgLink)
        return;

      if (imgLink.view.$el.attr('name') == null) {
        var reportName = generateReportingName('', value);
        imgLink.view.$el.attr('name', reportName)
      }
      imgLink.view.$el.attr('href', value);

      try {
        var href = imgLink.view.$el.attr('href');
        var c = imgLink.view.$el.attr('class');
        var n = imgLink.view.$el.attr('name');
        var a = imgLink.get('attributes');
        var b = { "name": name, "class": c, "href": href};
        imgLink.set('attributes', b);
        imgLink.attributes.href = href;
        component.attributes.set('href', "");
      }
      catch (x) { }
     
      imgLink.view.render();
    },
    updateName: function (component, value) {

      var imgLink = component.parent();
      if(!imgLink)
        return;

      imgLink.view.$el.attr('name', value);
      try {
        var name = imgLink.view.$el.attr('name');
        var c = imgLink.view.$el.attr('class');
        var a = imgLink.get('attributes');
        var b = { "name": name, "class": c };
        imgLink.set('attributes', b);
        imgLink.attributes.name = name;
        imgLink.attributes.set('name', name);
        component.attributes.set('name', "");
      }
      catch (x) { }
      imgLink.view.render();

    },
    updateAlt: function (component, value) {
      component.view.$el.attr('alt', value);
      var imgId = component.view.$el.attr('id');
      if (this) {
        try {
          var src = this.view.$el.attr('src');
          this.attributes.attributes.src = src;
          this.attributes.attributes.alt = value;
        }
        catch (x) { }
      }
      else {
        //no model exists, so just update the view
        this.set('content', component.view.el.outerHTML);
      }
      this.view.render();

    },
    updateTrackedLink: function (component, value) {

      var imgLink = component.parent();
      if(!imgLink)
        return;
     
      //if we uncheck tracking, set the name to LinkIsNotTracked
      var reportName = "";
      if (!value)
        reportName = "LinkIsNotTracked";
      else {
        //check if we have a report name and set the name to that
        reportName = editor.TraitManager.getTraitsViewer().collection.models[5].attributes.value;

        if (reportName != null && reportName != "" && reportName != "LinkIsNotTracked")
          imgLink.view.$el.attr('name', reportName)
        else {
          //check if we have a URL and set the name to that
          var href = imgLink.view.$el.attr('href');
          if (href != null) {
            reportName = generateReportingName('', href);
            imgLink.view.$el.attr('name', reportName)
          }
          else {
            //if we don't have any other data to set the name, remove it
            imgLink.view.$el.removeAttr('name');
          }
        }
      }
      try {
       var href = imgLink.view.$el.attr('href');
        var c = imgLink.view.$el.attr('class');
        var a = imgLink.get('attributes');
        var b = { "name": reportName, "class": c, "href": href };
        imgLink.set('attributes', b);
        imgLink.attributes.name = reportName;
        imgLink.attributes.set('reportName', reportName);
        component.attributes.set('name', "");
        
        editor.TraitManager.getTraitsViewer().collection.models[5].setTargetValue(reportName);
        editor.TraitManager.getTraitsViewer().render();
        updateMediaLibaryTrait();


      }
      catch (x) { }
      imgLink.view.render();
    
    },



    initToolbar(...args) {
      Component.prototype.initToolbar.apply(this, args);
      const em = this.em;

      if (em) {
        var cmd = em.get('Commands');
        var cmdName = 'image-editor';

        // Add Image Editor button only if the default command exists
        if (cmd.has(cmdName)) {
          var tb = this.get('toolbar');
          tb.push({
            attributes: { class: 'fa fa-pencil' },
            command: cmdName
          });
          this.set('toolbar', tb);
        }
      }
    },

    /**
     * Returns object of attributes for HTML
     * @return {Object}
     * @private
     */
    getAttrToHTML(...args) {
      var attr = Component.prototype.getAttrToHTML.apply(this, args);
      delete attr.onmousedown;
      var src = this.get('src');
      if (src) attr.src = src;
      return attr;
    },

    /**
     * Parse uri
     * @param  {string} uri
     * @return {object}
     * @private
     */
    parseUri(uri) {
      var el = document.createElement('a');
      el.href = uri;
      var query = {};
      var qrs = el.search.substring(1).split('&');
      for (var i = 0; i < qrs.length; i++) {
        var pair = qrs[i].split('=');
        var name = decodeURIComponent(pair[0]);
        if (name) query[name] = decodeURIComponent(pair[1]);
      }
      return {
        hostname: el.hostname,
        pathname: el.pathname,
        protocol: el.protocol,
        search: el.search,
        hash: el.hash,
        port: el.port,
        query
      };
    }
  },
  {
    /**
     * Detect if the passed element is a valid component.
     * In case the element is valid an object abstracted
     * from the element will be returned
     * @param {HTMLElement}
     * @return {Object}
     * @private
     */
    isComponent(el) {
      var result = '';
      if (el.tagName == 'IMG') {
        result = { type: 'image' };
      }
      return result;
    }
  }
);

function generateReportingName(linkText, linkUrl) {
  if (linkUrl.indexOf("#") == 0) {
    return noTrackedLinks;
  }
  var usedField = linkText.trim();
  if (usedField == "") {
    usedField = linkUrl.trim();
  }
  usedField = usedField.replace("http://", "");
  usedField = usedField.replace("www.", "");
  //var nonChars = new XRegExp('[^\\p{L}\\s\\d]*', 'g');
  //input.replace(/\W/g, '')
  usedField = usedField.replace(/\W/g, '');
  return usedField.trim().substring(0, 45);
}
