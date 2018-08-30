// define(function() {
//   return (opt = {}) => {
//     let tableStyleStr = '';
//     let cellStyleStr = '';
//     let editor = opt.editor;
//     let tableStyle = opt.tableStyle || {};
//     let cellStyle = opt.cellStyle || {};
//     let bm = editor.BlockManager;
//     for (let prop in tableStyle){
//       tableStyleStr += `${prop}: ${tableStyle[prop]}; `;
//     }
//     for (let prop in cellStyle){
//       cellStyleStr += `${prop}: ${cellStyle[prop]}; `;
//     }

//     bm.add('divider', {
//       label: opt.dividerBlkLabel,
//       category: opt.categoryLabel,
//       content: `<table style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
//         <tr>
//           <td class="divider"></td>
//         </tr>
//       </table>
//       <style>
//       .divider {
//         background-color: rgba(0, 0, 0, 0.1);
//         height: 1px;
//       }
//       </style>`,
//       attributes: {class:'gjs-fonts gjs-f-divider'}
//     });
//     bm.add('text', {
//       label: opt.textBlkLabel,
//       category: opt.categoryLabel,
//       attributes: {class:'gjs-fonts gjs-f-text'},
//       content: {
//        type: 'text',
//        content: 'Insert your text here',
//        style: { padding: '10px', 'font-family': 'Arial, Times New Roman, Serif', 'font-size': '1em' },
//        activeOnRender: 1,
//        unstylable: ['width', 'max-width', 'height', 'min-height'],
//       },
//     });
//     bm.add('text-sect', {
//       label: opt.textSectionBlkLabel,
//       category: opt.categoryLabel,
//       content: {
//         type: 'text',
//         content: '<h1 class="heading">Insert title here</h1><p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>',
//         activeOnRender: 1,
//         style: {'font-family': 'Arial, Times New Roman, Serif', 'font-size': '1em' },
//         unstylable: ['width', 'max-width', 'height', 'min-height'],
//        },
//       attributes: {class:'gjs-fonts gjs-f-h1p'}
//     });
   
//   };
// })
