// JS_fit_images_to_frames.jsx
// By Victor Paredes for Johnstone Supply
// August 2023














var doc = app.activeDocument;

app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Update Column Width");

function main() {
    // Check if there's a selection and it's within a table cell
    if (app.selection.length === 0 || !(app.selection[0] instanceof Cell || app.selection[0].parent instanceof Cell)) {
        alert("Please select a table cell.");
    } else {
        // Get the selected cell
        var selectedCell = (app.selection[0] instanceof Cell) ? app.selection[0] : app.selection[0].parent;
        var column = selectedCell.parentColumn;
        var maxWidth = 0;

        // Iterate through all cells in the column
        for (var i = 0; i < column.cells.length; i++) {
            var cell = column.cells[i];
            var text = cell.texts[0];
            
            // Measure the width of the selection in points
            var width = measureTextWidth(text);

            // Add 0.10 points to the width
            width += 0.10;

            // Update maxWidth if this cell's width is larger
            if (width > maxWidth) {
                maxWidth = width;
            }
        }

        // Apply the largest width to the entire column
        column.width = maxWidth;

        // Uncomment the alert below if you want a confirmation message
        // alert("Column width updated to the largest cell width: " + maxWidth + " pt");
    }
}

// Function to measure the width of the text
function measureTextWidth(text) {
    var tempFrame = doc.textFrames.add({geometricBounds: ["0p0", "0p0", "100p0", "100p0"]});
    tempFrame.contents = text.contents;

    // Apply the same formatting as the original text
    tempFrame.texts[0].properties = text.properties;

    var width = tempFrame.texts[0].endHorizontalOffset;

    // Clean up
    tempFrame.remove();

    return width;
}
