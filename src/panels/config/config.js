var crc = 'create-comp';
var mvc = 'move-comp';
var swv = 'sw-visibility';
var expt = 'export-template';
var osm = 'open-sm';
var otm = 'open-tm';
var ola = 'open-layers';
var obl = 'open-blocks';
var ful = 'fullscreen';
var prv = 'preview';

module.exports = {
  stylePrefix: 'pn-',

  // Default panels fa-sliders for features
  defaults: [
    {
      id: 'commands',
      buttons: [{}]
    },
    {
      id: 'options',
      buttons: [
        {
          active: true,
          id: swv,
          className: 'fa fa-square-o',
          command: swv,
          context: swv,
          attributes: { title: 'View components' },
          //label:' Outline'
          
        },
        {
          id: prv,
          className: 'fa fa-eye',
          command: prv,
          context: prv,
          attributes: { title: 'Preview' }
        },
        {
          id: ful,
          className: 'fa fa-arrows-alt',
          command: ful,
          context: ful,
          attributes: { title: 'Fullscreen' },
          //label: ' Fullscreen'
          
        },
        {
          id: expt,
          className: 'fa fa-code',
          command: expt,
          attributes: { title: 'View code' }
          //label:' View Code'
          
        }
      ]
    },
    {
      id: 'views',
      buttons: [
        {
          id: obl,
          className: 'gjs-block-label pn-button-spacing',
          command: obl,
          label: 'Content',
          attributes: { title: 'Content Blocks' }
        },
        {
          id: osm,
          className: 'gjs-block-label pn-button-spacing mr-60 ml-60',
          command: osm,
          active: true,
          label: 'Style Manager',
          attributes: { title: 'Style Manager' }
        },
        {
          id: otm,
          className: 'gjs-block-label pn-button-spacing',
          label: 'Settings',
          command: otm,
          attributes: { title: 'Settings' }
        },
        {
          id: ola,
          className: 'fa fa-bars',
          command: ola,
          attributes: { title: 'Open Layer Manager' }
        },
       
      ]
    }
  ],

  // Editor model
  em: null,

  // Delay before show children buttons (in milliseconds)
  delayBtnsShow: 300
};
