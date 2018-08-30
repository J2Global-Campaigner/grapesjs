define(function() {
  return (opt = {}) => {
    let editor = opt.editor;
    let cmdm = editor.Commands;
    let importCommand = require('./openImportCommand');
    //let exportCommand = require('./openExportCommand');
    let cleanAllCommand = require('./cleanAllCommand');
    let tglImagesCommand = require('./toggleImagesCommand');
    //let editHtmlCommand = require('./openEditCommand');
    cmdm.add(opt.cmdOpenImport, importCommand(opt));
    cmdm.add(opt.cmdTglImages, tglImagesCommand(opt));
    //cmdm.add(opt.cmdEditHtml, editHtmlCommand(opt));

    // Overwrite export template after the editor is loaded
    // (default commands are loaded after plugins)
    // editor.on('load', () => {
    //   cmdm.add('export-template', exportCommand(opt));
    // });

    cmdm.add('undo', {
      run(editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.undo(1);
      }
    });
    cmdm.add('redo', {
      run(editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.redo(1);
      }
    });
    cmdm.add('clean-all', cleanAllCommand(opt)); 
    cmdm.add('set-device-desktop', {
      run(editor) {
        editor.setDevice('Desktop');
      }
    });
    cmdm.add('set-device-tablet', {
      run(editor) {
        editor.select();
        editor.setDevice('Tablet');
      }
    });
    cmdm.add('set-device-mobile', {
      run(editor) {
        editor.select();
        editor.setDevice('Mobile portrait');
      }
    });
  };
})
