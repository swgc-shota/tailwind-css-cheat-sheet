import { oneDarkTheme as darkTheme } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { Compartment } from "@codemirror/state";

const lightTheme = EditorView.theme({});
const themeCompartment = new Compartment();

export const initialTheme = themeCompartment.of(lightTheme);
export const initCMThemeToggler = (view: EditorView) => {
  let isLightMode = true;

  const toggleTheme = (view: EditorView) => {
    const newTheme = isLightMode ? darkTheme : lightTheme;
    isLightMode = !isLightMode;
    view.dispatch({
      effects: themeCompartment.reconfigure(newTheme),
    });
  };

  document.addEventListener("themetoggle", () => {
    toggleTheme(view);
  });
};
