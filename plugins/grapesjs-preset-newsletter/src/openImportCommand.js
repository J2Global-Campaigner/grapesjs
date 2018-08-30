define(function() {
  return (opt = {}) => {
    let editor = opt.editor;
    let codeViewer = editor && editor.CodeManager.getViewer('CodeMirror').clone();
    let btnImp = document.createElement("button");
    let container = document.createElement("div");
    let pfx = opt.pfx || '';
    // Init import button
    btnImp.innerHTML = opt.modalBtnImport;
    btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btnImp.onclick = () => {
      let code = codeViewer.editor.getValue();
      code = updateImportForEditor(code);
      editor.DomComponents.getWrapper().set('content', '');
      editor.setComponents(code);
      //setBodyWidth(); //csb logic to restore body/wrapper styles, setComponents does not do it properly
      editor.Modal.close();
    };
    //import existing template:
    let selImportDiv = document.createElement('div');
    selImportDiv.className = "gjs-mdl-headerActionArea";

    let selImportLabel = document.createElement('span');
    selImportLabel.className = "gjs-import-label";
    selImportLabel.innerHTML = "Select an existing campaign to import:";
    

    let selImportTemplate = document.createElement('select');
    selImportTemplate.id = "selImportTemplate";
    selImportTemplate.className = "selImportTemplate";
    selImportTemplate.onchange = () => {
      var newContent = getTemplateHtml(selImportTemplate);
      codeViewer.setContent(newContent || '');
      let viewer = codeViewer.editor;
      viewer.refresh();
    };
    
   

    selImportDiv.appendChild(selImportLabel);
    selImportDiv.appendChild(selImportTemplate),
    container.appendChild(selImportDiv);



    // Init code viewer
    codeViewer.set({
      codeName: 'htmlmixed',
      theme: opt.codeViewerTheme,
      readOnly: 0
    });
    return {
      run(editor, sender) {
        let md = editor.Modal;
        let modalContent = md.getContentEl();
        let viewer = codeViewer.editor;
        md.setTitle(opt.importHeaderContent);
        // Init code viewer if not yet instantiated
        if(!viewer){
          let txtarea = document.createElement('textarea');
          if(opt.modalLabelImport){
            let labelEl = document.createElement('div');
            labelEl.className = pfx + 'import-label';
            labelEl.innerHTML = opt.modalLabelImport;
            container.appendChild(labelEl);
          }
          container.appendChild(txtarea);
          container.appendChild(btnImp);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor;
        }
        md.setContent('');
        md.setContent(container);
        codeViewer.setContent(opt.importPlaceholder || '');
        md.open();
        viewer.refresh();
        sender && sender.set('active', 0);
         //populate the select with the most recent campaigns, put here so only called when/if template import modal is opened
        populateImportTemplates();
      },
    }
  };
});