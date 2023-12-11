// JS_fit_images_to_frames.jsx
// By Victor Paredes for Johnstone Supply
// August 2023








// Main function
function main() {
    if (app.documents.length === 0) {
        alert("No open documents");
        return;
    }

    var doc = app.activeDocument;

    // Target script label
    var scriptLabel = "product_image_figure";

    // Target paragraph style
    var paragraphStyleName = "Fig";

    // Check if the paragraph style exists
    if (!doc.paragraphStyles.itemByName(paragraphStyleName).isValid) {
        alert("Paragraph style '" + paragraphStyleName + "' does not exist.");
        return;
    }

    // Loop through all page items
    for (var i = 0; i < doc.allPageItems.length; i++) {
        var item = doc.allPageItems[i];

        // Check if the item has the script label
        if (item.label === scriptLabel) {
            try {
                // Apply the paragraph style
                item.paragraphs.everyItem().applyParagraphStyle(doc.paragraphStyles.itemByName(paragraphStyleName), true);
            } catch (e) {
                alert("Error applying paragraph style to item: " + e.message);
            }
        }
    }
}

// Run the script
main();
