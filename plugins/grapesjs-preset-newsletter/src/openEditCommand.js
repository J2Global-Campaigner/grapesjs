define(function() {
    const juice = require('juice');
    return (opt = {}) => {
      let editor = opt.editor;
      let codeViewer = editor && editor.CodeManager.getViewer('CodeMirror').clone();
      let container = document.createElement("div");
      let pfx = opt.pfx || '';
      var cmdm = editor.Commands;
      var pnm = editor.Panels;
      let md = editor.Modal;
      var btnEditContainer = document.createElement('div');
      var btnEdit = document.createElement('button');
      // Init code viewer
      codeViewer.set({
        codeName: 'htmlmixed',
        readOnly: 0,
        theme: opt.codeViewerTheme,
        autoBeautify: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        styleActiveLine: true,
        smartIndent: true,
        indentWithTabs: true
      });

      btnEditContainer.className = "btnEditDiv";
      btnEdit.innerHTML = 'Update';
      btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
      btnEdit.onclick = function () {
          var code = codeViewer.editor.getValue();
          editor.DomComponents.getWrapper().set('content', '');
          editor.setComponents(code.trim());
          md.close();
      };
      return {
        run(editor, sender) {
            sender && sender.set('active', 0);
            var viewer = codeViewer.editor;
           
            let modalContent = md.getContentEl();
            md.setTitle(opt.modalEditHtml);
            if (!viewer) {
                var txtarea = document.createElement('textarea');
                container.appendChild(txtarea);
                container.appendChild(btnEditContainer);
                btnEditContainer.appendChild(btnEdit);
                codeViewer.init(txtarea);
                viewer = codeViewer.editor;
            }
            var InnerHtml = editor.getHtml();
            var Css = editor.getCss();
            md.setContent('');
            md.setContent(container);
            codeViewer.setContent(InnerHtml + "<style>" + Css + '</style>');
            md.open();
            viewer.refresh();
        },
      }
    };
  });
  