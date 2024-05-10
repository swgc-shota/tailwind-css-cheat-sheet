import { basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { EditorView, keymap } from "@codemirror/view";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
//import { twCompletions } from "./codemirrorCompletions";
import { State } from "vanjs-core";
import { debouncer } from "../utils";
import { initCMThemeToggler, initialTheme } from "./codemirrorThemes";
//import { letsTW } from "./tailwindcss.js";
import initialContent from "./initialContent.html?raw";

const stringToDoc = (htmlString: string): Document => {
  const isLightMode = document.querySelector("html.dark") === null;
  const parser = new DOMParser();
  const mydoc = parser.parseFromString(
    `<html class="${
      isLightMode ? "" : "dark"
    }"><head><meta charset="utf-8"></head>${htmlString}</html>`,
    "text/html"
  );
  return mydoc;
};

export const tailwindize = async (content: string): Promise<string> => {
  const module = await import("./tailwindcss.js");
  const letsTW = module.letsTW;
  return await letsTW(stringToDoc(content));
};

export const initEditor = async (
  parent: HTMLElement,
  content: State<string>
) => {
  const updateContentWithDebounce = debouncer((newContent: string) => {
    content.val = newContent;
  }, 500);

  const updateListener = EditorView.updateListener.of(async (update) => {
    if (update.docChanged) {
      const newContent = update.state.doc.toString();
      const _content = await tailwindize(newContent);

      updateContentWithDebounce(_content);
    }
  });
  content.val = await tailwindize(initialContent);

  const { twCompletions } = await import("./codemirrorCompletions.ts");
  const view = new EditorView({
    doc: initialContent,
    extensions: [
      basicSetup,
      initialTheme,
      html(),
      EditorView.lineWrapping,
      updateListener,
      keymap.of(completionKeymap),
      autocompletion({
        override: [twCompletions],
      }),
    ],
    parent: parent,
  });

  initCMThemeToggler(view);

  document.addEventListener("themetoggle", async () => {
    content.val = await tailwindize(content.val);
  });
};
