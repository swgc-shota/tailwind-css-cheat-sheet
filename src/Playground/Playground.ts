import van from "vanjs-core";
const { div, iframe } = van.tags;
import { initEditor } from "./codemirror";
import { Resizable } from "./Resizable";

const updateIFrame = (iframe: HTMLIFrameElement, content: string) => {
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  iframe.onload = function () {
    URL.revokeObjectURL(url);
  };
  iframe.src = url;
};

export const Playground = () => {
  const htmlContent = van.state("");
  const EditorContainer = div({
    id: "editor-container",
    class:
      "container mt-4 sm:mt-8 mx-auto h-[50vh] border overflow-scroll resize",
  });

  const previewFrame = iframe({
    sandbox: "",
    class: "w-full h-full z-10",
  });

  van.derive(() => {
    updateIFrame(previewFrame, htmlContent.val);
  });

  initEditor(EditorContainer, htmlContent);

  return div(
    { class: "mt-16 w-full overflow-x-auto" },
    Resizable(previewFrame, { width: window.innerWidth * 0.95, height: 440 }),
    EditorContainer
  );
};
