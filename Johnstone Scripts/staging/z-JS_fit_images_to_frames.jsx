// JS_fit_images_to_frames.jsx
// By Victor Paredes for Johnstone Supply
// July 2023

// Only run if a document is open.
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  // package to enable UNDO & REDO
  app.doScript(selectImagesAndRectanglesInTextFrames, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "Select Images and Rectangles");
} else {
  alert('No document open! Script aborted.');
}

function selectImagesAndRectanglesInTextFrames() {
  var doc = app.activeDocument;
  var textFrames = doc.textFrames;

  

  app.doScript(function () {
    for (var i = 0; i < textFrames.length; i++) {
      var textFrame = textFrames[i];

      // Check if the text frame contains any images
      if (textFrame.allGraphics.length > 0) {
        for (var j = 0; j < textFrame.allGraphics.length; j++) {
          var graphic = textFrame.allGraphics[j];
        //   if (graphic instanceof Image) {
            // Select the image inside the text frame
            graphic.fit(FitOptions.PROPORTIONALLY);
        //   }
        }
      }
    }
    alert('🎉 Images fit proportionally to frames!');
  }, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "Select Images and Rectangles in Text Frames");
}
