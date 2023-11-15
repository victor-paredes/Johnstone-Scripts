// JS_fit_images_to_frames.jsx
// By Victor Paredes for Johnstone Supply
// August 2023



#target indesign

var myDialog = app.dialogs.add({name:"Move Text Frames"});
with(myDialog.dialogColumns.add()){
    with(dialogRows.add()){
        staticTexts.add({staticLabel:"Choose a direction:"});
    }
    var radioGroup = radiobuttonGroups.add();
    with(radioGroup){
        radiobuttonControls.add({staticLabel:"Left", checkedState:true});
        radiobuttonControls.add({staticLabel:"Right"});
        radiobuttonControls.add({staticLabel:"Both"});
    }
}

var myResult = myDialog.show();
if(myResult == true){
    var myDirection = radioGroup.selectedButton;
    myDialog.destroy();
    app.doScript("moveTextFrames('"+ myDirection +"')", ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Move Text Frames");
} else {
    myDialog.destroy();
}

function moveTextFrames(direction) {
    var doc = app.activeDocument;
    var moveDistance = 0.0833; // in inches
    var moveLeft = direction == 0 || direction == 2;
    var moveRight = direction == 1 || direction == 2;

    for (var i = 0; i < doc.pages.length; i++) {
        var page = doc.pages[i];
        for (var j = 0; j < page.textFrames.length; j++) {
            var textFrame = page.textFrames[j];
            if (moveLeft && textFrame.label == "catalog_textframe_L") {
                textFrame.move(undefined, [moveDistance, 0]);
            }
            if (moveRight && textFrame.label == "catalog_textframe_R") {
                textFrame.move(undefined, [-moveDistance, 0]);
            }
        }
    }
}
