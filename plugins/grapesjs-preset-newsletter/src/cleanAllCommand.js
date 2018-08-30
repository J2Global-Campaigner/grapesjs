define(function() {
    const juice = require('juice');
    return (opt = {}) => {
      return {
        run(editor, sender) {
            if (sender) sender.set('active', false);

            try {
                swal({
                    title: "Are you sure?",
                    text: "Click OK to clean the canvas?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                }).then(function (result) {
    
                    if (result === true) {
                        // cancel returns null
                        editor.DomComponents.clear();
                        editor.CssComposer.clear()
                        editor.CssComposer.getAll().reset();
                        editor.DomComponents.getWrapper().setStyle('') //needed to reset the body background
                        setTimeout(function () {
                            clearLocalStorage();
                        }, 0);
                        //clear the selected component, otherwise there will be the blue resize outline left on the canvas
                        editor.select();

                         //reset the default mjml container
                         editor.setComponents(`<mjml><mj-body><mj-container></mj-container></mj-body></mjml>`);

                        //reset the panels to the content blocks:
                        var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
                        openBlocksBtn && openBlocksBtn.set('active', 1);
                    }
                });
            }
            catch(x){
                if (confirm('Are you sure you want to clean the canvas?')) {
                    editor.DomComponents.clear();
                    editor.CssComposer.clear()
                    editor.CssComposer.getAll().reset();
                    editor.DomComponents.getWrapper().setStyle('') //needed to reset the body background
                    setTimeout(function () {
                        clearLocalStorage();
                    }, 0);
                      //clear the selected component, otherwise there will be the blue resize outline left on the canvas
                      editor.select();

                      //reset the default mjml container
                      editor.setComponents(`<mjml><mj-body><mj-container></mj-container></mj-body></mjml>`);
                }
        }
        },
      }
    };
  });
  function clearLocalStorage() {
    var arr = []; // Array to hold the keys
    // Iterate over localStorage and insert the keys that meet the condition into arr
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 3) === 'gjs') {
            arr.push(localStorage.key(i));
        }
    }

    // Iterate over arr and remove the items by key
    for (var j = 0; j < arr.length; j++) {
        localStorage.removeItem(arr[j]);
    }
   
}
  








