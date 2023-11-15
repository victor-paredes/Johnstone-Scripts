// JS_fit_images_to_frames.jsx
// By Victor Paredes for Johnstone Supply
// August 2023









// InDesign ExtendScript

// Function to make text bold

var increaseAmount = .10; // You can change this value

// Function to delete text content if it has wrapped to a second line
function deleteWrappedText(text) {
  // Check if the text has more than one line (i.e., wrapped)
  
    text.contents = "";
  
}

// Function to iterate through each cell in each table and delete text if it has wrapped to a second line
function updateCell(doc) {
  // Start an undo group
  app.doScript(function () {
    // Iterate through all tables in the document
    for (var i = 0; i < doc.stories.length; i++) {
      var story = doc.stories[i];

      // Check if the story is a table
      if (story.hasOwnProperty("tables")) {
        var tables = story.tables;

        // Iterate through all cells in each table
        for (var j = 0; j < tables.length; j++) {
          var table = tables[j];

          for (var k = 0; k < table.cells.length; k++) {
            var cell = table.cells[k];

            // Check if the cell has content
            if (cell.hasOwnProperty("texts")) {
              var texts = cell.texts;

              // Iterate through all text frames in the cell
              for (var l = 0; l < texts.length; l++) {
                var text = texts[l];

                // Check if the text content is not empty and has wrapped to a second line
                if (text.contents !== "") {

                  if (text.lines.length > 1) {

                    var selectedCell = table.cells[k];
                    var cellWidth = selectedCell.width;
                    // alert("Cell Width: " + (cellWidth / 72) + " inches"); // 1 inch = 72 points
                    selectedCell.width = cellWidth + increaseAmount;

                    // deleteWrappedText(text);
                  }

                }
              }
            }
          }
        }
      }
    }
  }, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Delete Wrapped Text");
}

// Main function to run the script
function main() {
  // Get a reference to the current document
  var doc = app.activeDocument;

  // Call the function to make text bold in non-empty cells
  // makeBoldInNonEmptyCells(doc);

  // Alternatively, call the function to delete text if it has wrapped to a second line
  updateCell(doc);
}

// Run the main function
main();
