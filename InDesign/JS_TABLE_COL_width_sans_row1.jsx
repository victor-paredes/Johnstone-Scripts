// JS_fit_images_to_frames.jsx
// By Victor Paredes for Johnstone Supply
// August 2023













var doc = app.activeDocument;

// Check if there's a selection and it's within a table cell
if (app.selection.length === 0 || !(app.selection[0] instanceof Cell || app.selection[0].parent instanceof Cell)) {
    alert("Please select a table cell.");
} else {
    app.doScript(function() {
        // Get the selected cell
        var selectedCell = (app.selection[0] instanceof Cell) ? app.selection[0] : app.selection[0].parent;
        var column = selectedCell.parentColumn;
        var maxWidth = 0;

        // Iterate through all cells in the column, starting from the second cell
        for (var i = 1; i < column.cells.length; i++) {
            var cell = column.cells[i];
            var text = cell.texts[0];

            // Measure the width of the selection in points
            var width = measureTextWidth(text, doc);

            // Add 0.10 points to the width for padding
            width += 0.10;

            // Update maxWidth if this cell's width is larger
            if (width > maxWidth) {
                maxWidth = width;
            }
        }

        // Apply the largest width to the entire column
        column.width = maxWidth;

        // Uncomment the next line if you want to show a confirmation message
        // alert("Column width updated to the largest cell width (excluding the first cell): " + maxWidth + " pt");
    }, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Update Column Width");
}

// Function to measure the width of the text
function measureTextWidth(text, doc) {
    var tempFrame = doc.textFrames.add({geometricBounds: ["0p0", "0p0", "100p0", "100p0"]});
    tempFrame.contents = text.contents;

    // Apply the same formatting as the original text
    tempFrame.texts[0].properties = text.properties;

    // Adjust for right alignment
    var alignment = tempFrame.texts[0].justification;
    var width;
    if (alignment === Justification.RIGHT_ALIGN || alignment === Justification.FULLY_JUSTIFIED) {
        width = tempFrame.textFrames[0].geometricBounds[3] - tempFrame.texts[0].horizontalOffset;
    } else {
        width = tempFrame.texts[0].endHorizontalOffset;
    }

    // Clean up
    tempFrame.remove();

    return width;
}
