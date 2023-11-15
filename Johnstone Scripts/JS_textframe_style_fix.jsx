// JS_fit_images_to_frames.jsx
// By Victor Paredes for Johnstone Supply
// August 2023




// Check if there is an open document
if (app.documents.length > 0) {
    var document = app.activeDocument;

    // Create a dialog for user input
    var dialog = new Window('dialog', 'Select Frame Alignment');
    dialog.orientation = 'column';
    dialog.alignChildren = 'left';

    // Add radio buttons for Left, Right, and Both options
    var leftRadioButton = dialog.add('radiobutton', undefined, 'Left');
    var rightRadioButton = dialog.add('radiobutton', undefined, 'Right');
    var bothRadioButton = dialog.add('radiobutton', undefined, 'Both');
    leftRadioButton.value = true; // Set Left as the default selection

    // Add OK and Cancel buttons
    dialog.add('button', undefined, 'OK', {name: 'ok'});
    dialog.add('button', undefined, 'Cancel', {name: 'cancel'});

    // Show the dialog and get the user's response
    var userChoice = dialog.show();

    if (userChoice == 1) { // If the user clicked OK
        var alignment = leftRadioButton.value ? "Left" : rightRadioButton.value ? "Right" : "Both";

        // Wrap the operation in a single undoable action
        app.doScript(function() {
            applyObjectStyles(alignment);
        }, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "Apply Object Style to Text Frames");

        alert("Object style applied to all matching text frames.");
    }
} else {
    alert("No open documents.");
}

function applyObjectStyles(alignment) {
    if (alignment === "Both") {
        applyStyle("Left", "Master Text Frame_Left", "catalog_textframe_L");
        applyStyle("Right", "Master Text Frame_Right", "catalog_textframe_R");
    } else {
        var objectStyleName = "Master Text Frame_" + alignment;
        var scriptLabel = "catalog_textframe_" + alignment.charAt(0);
        applyStyle(alignment, objectStyleName, scriptLabel);
    }
}

function applyStyle(alignment, objectStyleName, scriptLabel) {
    var objectStyle = document.objectStyles.itemByName(objectStyleName);
    if (!objectStyle.isValid) {
        alert("Object style '" + objectStyleName + "' for " + alignment + " does not exist.");
        return;
    }

    // Iterate through all text frames in the document
    for (var i = 0; i < document.textFrames.length; i++) {
        var textFrame = document.textFrames[i];

        // Check if the text frame has the correct script label
        if (textFrame.label === scriptLabel) {
            // Apply the object style to the text frame
            textFrame.applyObjectStyle(objectStyle);
        }
    }
}
