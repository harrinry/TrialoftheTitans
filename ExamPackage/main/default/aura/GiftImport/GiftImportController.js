({	
    DoInit : function(component, event, helper) {
        helper.HandleInit(component);
    },
    // On file upload it use file reader to get the text file content
    HandleUploadFile : function(component, event, helper) {
        let fileName = 'No File Selected..';
        let fileContents = '';

        if (event.getSource().get("v.files").length > 0) {
            
            var file = event.getSource().get("v.files")[0];

            fileName = file['name'];
            component.set("v.fileName", fileName);
            
            var reader = new FileReader();
            reader.onload = function(e) {
                fileContents = reader.result;
                let helperResult = helper.SplitString(component, fileContents)
                component.set("v.submitList", helperResult);
                component.set("v.displayList", helperResult);
                component.set("v.toImport", helperResult.length);
                // console.log(fileContents);
            }
            
            // allow the file content to be turn into text
            reader.readAsText(file);
            let test = reader;
        }
        
    },
    // Next handler, send user to upload page.
    HandleNext : function(component, event, helper) {
        let iffer = component.get("v.canUpload");
        component.set("v.successMessage", false);
        component.set("v.canUpload", true);
    },
    // Submit handler, submit file to be processed
    HandleSubmit : function(component, event, helper) {
        helper.SubmitClick(component, helper);  
    },
    // Handle the change of selectedTechnology option
    HandleChange : function(component, event, helper) {
        // change v.selectedTechnology to have it line up with titan
        component.set("v.selectedTechnology", component.get("v.selectedTitan"));
    }
})