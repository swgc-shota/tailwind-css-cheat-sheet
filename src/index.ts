import van from "vanjs-core";
import { ViewSwitcher } from "./ViewSwitcher/ViewSwitcher";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import { Playground } from "./Playground/Playground";
import { initClassNameFinder } from "./ClassNameFinder/ClassNameFinder";
import { initLazyShowing } from "./utils";
import { initCopyClassName } from "./utils";
import { initThemeToggler } from "./Common/ThemeToggler";
import { Footer } from "./Common/Footer";
import "./index.css";

const switchContainer = document.querySelector(
  ".view-switch-container"
) as HTMLElement;
van.add(switchContainer, ViewSwitcher());

const cheatSheetView = document.querySelector(
  ".cheatsheet-view"
) as HTMLElement;
van.add(cheatSheetView, Footer());

const colorPickerView = document.querySelector(
  ".colorpicker-view"
) as HTMLElement;
van.add(colorPickerView, ColorPicker(), Footer());

const playgroundContainer = document.querySelector(
  ".playground-view"
) as HTMLElement;
van.add(playgroundContainer, Playground(), Footer());

initClassNameFinder();

initCopyClassName();

initThemeToggler();

initLazyShowing(".content-box.hidden", "hidden", 30);
