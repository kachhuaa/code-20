// function handleHotkeys(evt, element) {
//   if (evt.key === "Tab") {
//     evt.preventDefault();
//     const start = element.selectionStart;
//     const end = element.selectionEnd;
//
//     element.value = element.value.substring(0, start) + "\t" + element.value.substring(end);
//     element.selectionStart = element.selectionEnd = start + 1;
//   }
// }

// console.log(CodeMirror.modes);

// $(".editor").keydown(function(evt) {
//   // console.log(evt.key);
//   handleHotkeys(evt, this);
// });

// const codeMirrorEditor = CodeMirror.fromTextArea($(".editor")[0], {
//   lineNumbers: true,
//   matchBrackets: true,
//   mode: "text/x-c++src",
//   theme: "midnight",
//   indentWithTabs: true,
//   undoDepth: 1024,
//   maxHighlightLength: Infinity,
//   autocapitalize: false,
//   autocorrect: false,
//   spellcheck: false,
//   viewportMargin: Infinity,
//   scrollbarStyle: "overlay"
// });

// require([
//   "/lib/codemirror/lib/codemirror.js",
//   "/lib/codemirror/mode/clike/clike.js",
//   "/lib/codemirror/addon/scroll/simplescrollbars.js"
//   // "/temp.js"
// ], function(CodeMirror) {
//   CodeMirror.fromTextArea($(".editor")[0], {
//     lineNumbers: true,
//     matchBrackets: true,
//     mode: "text/x-c++src",
//     theme: "midnight",
//     indentWithTabs: true,
//     undoDepth: 1024,
//     maxHighlightLength: Infinity,
//     autocapitalize: false,
//     autocorrect: false,
//     spellcheck: false,
//     viewportMargin: Infinity,
//     scrollbarStyle: "overlay"
//   });
// });

const editors = [
  { id: "code-main", handle: null, lang: "cpp"},
  { id: "input-main", handle: null, lang: "plaintext"},
  { id: "output-main", handle: null, lang: "plaintext" }
];

console.log(monaco);
editors.forEach((editor) => {
  editor.handle = monaco.editor.create(document.getElementById(`${editor.id}-container`), {
    value: "",
    language: editor.lang
  });
  $(`#${editor.id}-container > .monaco-editor`).attr("id", editor.id);
});

console.log(editors[0].handle);

/*
children
3 div.view-lines.monaco-mouse-cursor-text
children
0 div.lines-content.monaco-editor-background
children
1 div.monaco-scrollable-element.editor-scrollable.vs
children
0 div.overflow-guard
children
0 div#code-main.monaco-editor.no-user-select.showUnused.showDeprecated.vs
children
_domElement
editor.handle
*/

$(".cmd").click(function(evt) {
  // $(".editor")[0].value = codeMirrorEditor.getValue();
  editors.forEach((editor) => {
    // $(`#${editor.id}`).value = editor.handle.getValue();
    const codeLines = Array.from(
      $(`#${editor.id} div.overflow-guard div.monaco-scrollable-element.editor-scrollable.vs div.lines-content.monaco-editor-background div.view-lines.monaco-mouse-cursor-text`)
      .children()
    ).map(element => element.textContent);
    $(`#${editor.id}-placeholder`).val(codeLines.join("\n"));
      // console.log(line.textContent);
  });
  $("#submit-btn").val(evt.target.value).trigger("click");
})

// editors.forEach((editor) => {
//   require([
//     "/lib/codemirror/lib/codemirror.js",
//     "/lib/codemirror/mode/clike/clike.js",
//     "/lib/codemirror/addon/scroll/simplescrollbars.js"
//   ], function(CodeMirror) {
//     editor.handle = CodeMirror((element) => {
//       $(`#${editor.id}`).css(`display`, `none`);
//       $(`#${editor.id}`).after(element);
//       element.id = `${editor.id}-editor`;
//       ["editor", "flex-grow-1", "justify-content-evenly"].forEach((cl) => {
//         element.classList.add(cl);
//       });
//     }, {
//       lineNumbers: true,
//       matchBrackets: true,
//       mode: "text/x-c++src",
//       theme: "midnight",
//       indentWithTabs: true,
//       undoDepth: 1024,
//       maxHighlightLength: Infinity,
//       autocapitalize: false,
//       autocorrect: false,
//       spellcheck: false,
//       viewportMargin: Infinity,
//       scrollbarStyle: "overlay"
//     });
//     // editor.handle = CodeMirror.fromTextArea($(`#${editor.id}`)[0], {
//     //   lineNumbers: true,
//     //   matchBrackets: true,
//     //   mode: "text/x-c++src",
//     //   theme: "midnight",
//     //   indentWithTabs: true,
//     //   undoDepth: 1024,
//     //   maxHighlightLength: Infinity,
//     //   autocapitalize: false,
//     //   autocorrect: false,
//     //   spellcheck: false,
//     //   viewportMargin: Infinity,
//     //   scrollbarStyle: "overlay"
//     // });
//     // editor.handle.addClass("d-inline-flex");
//   });
// });
