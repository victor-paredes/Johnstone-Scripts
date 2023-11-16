// JS_fit_images_to_frames.jsx
// By Victor Paredes for Johnstone Supply
// August 2023














// Start an undo transaction
app.doScript(function() {

    var myDocument = app.activeDocument;
    // Store the original ruler units
    var originalHorizontalRulerUnits = myDocument.viewPreferences.horizontalMeasurementUnits;
    var originalVerticalRulerUnits = myDocument.viewPreferences.verticalMeasurementUnits;

    // Set ruler units to inches
    myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.inches;
    myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.inches;
    // alert("Ruler units have been changed to inches.");

    // Create a dialog window for target width selection
    var dialog = new Window("dialog", "Select Target Width");

    // Add a radio button group to the dialog
    var radioGroup = dialog.add("group", undefined, "Target Width:");
    var radio1 = radioGroup.add("radiobutton", undefined, "Full Width (7.25in)");
    var radio2 = radioGroup.add("radiobutton", undefined, "2/3 Width (4.7963in)");
    var radio3 = radioGroup.add("radiobutton", undefined, "1/2 Width (3.5625in)");
    var radio4 = radioGroup.add("radiobutton", undefined, "1/3 Width (2.3427in)");
    

    // Set default selection
    radio1.value = true;

    // Add OK and Cancel buttons
    var buttons = dialog.add("group");
    buttons.add("button", undefined, "OK");
    buttons.add("button", undefined, "Cancel");

    // Show the dialog and get the user's choice
    dialog.center();
    var result = dialog.show();

    if (result == 1) { // OK was clicked
        var targetWidth;
        if (radio1.value) {
            targetWidth = 7.25;
        } else if (radio2.value) {
            targetWidth = 4.7963;
        } else if (radio3.value) {
            targetWidth = 3.5625;
        } else if (radio4.value) {
            targetWidth = 2.3427;
        }
        
        // Continue with the script using the selected targetWidth
        selectTable(); // Call the updated function with the new targetWidth
    } else {
        // Cancel was clicked or window was closed
        // alert("Operation cancelled.");
        exit(); // Exit the script
    }

    // Function to select and modify the table
    function selectTable() {
        var selectedCell = (app.selection[0] instanceof Cell) ? app.selection[0] : app.selection[0].parent;
        var column = selectedCell.parentColumn;

        // alert (selectedCell.width);

        var s = app.selection[0];
        if (!s) {
            alert('no selection');
            return;
        }

        while (s.constructor !== Cell) {
            s = s.parent;
            if (s.constructor === Application) {
                alert('no cell found');
                return;
            }
        }

        var tableWidth = s.parent.width;
        
        var widthDifference = targetWidth - tableWidth;
        var column_width_update = column.width + widthDifference;
        column_width_update = Number(column_width_update.toFixed(3));
        // alert('\nTable Width: ' + tableWidth + '\nTargetWidth: ' + targetWidth + '\nwidthDifference: ' + widthDifference + '\ncolumn.width:  ' + column.width + '\nUPDATE:  ' + column_width_update );
        
        // Apply the largest width to the entire column
        column.width = column_width_update;
    }

    // Reset the ruler units to their original settings
    myDocument.viewPreferences.horizontalMeasurementUnits = originalHorizontalRulerUnits;
    myDocument.viewPreferences.verticalMeasurementUnits = originalVerticalRulerUnits;
    // alert("Ruler units have been reset to their original settings.");

}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Undo Change Ruler Units and Table Width");

// Note: The entire original script is now wrapped within the app.doScript function.
