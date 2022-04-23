function handleHotkeys(evt, element) {
  if (evt.key === "Tab") {
    evt.preventDefault();
    const start = element.selectionStart;
    const end = element.selectionEnd;

    element.value = element.value.substring(0, start) + "\t" + element.value.substring(end);
    element.selectionStart = element.selectionEnd = start + 1;
  }
}

console.log(CodeMirror.modes);

// $(".editor").keydown(function(evt) {
//   // console.log(evt.key);
//   handleHotkeys(evt, this);
// });

const codeMirrorEditor = CodeMirror.fromTextArea($(".editor")[0], {
  lineNumbers: true,
  matchBrackets: true,
  mode: "text/x-c++src",
  theme: "midnight",
  indentWithTabs: true,
  undoDepth: 1024,
  maxHighlightLength: Infinity,
  autocapitalize: false,
  autocorrect: false,
  spellcheck: false,
  viewportMargin: Infinity,
  scrollbarStyle: "overlay"
});

$(".cmd").click(function() {
  $(".editor")[0].value = codeMirrorEditor.getValue();
})
