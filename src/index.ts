import van from "vanjs-core";
import { ViewSwitcher } from "./ViewSwitcher/ViewSwitcher";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import { TWPlayground } from "./TWPlayground/TWPlayground";
import { initClassNameFinder } from "./ClassNameFinder/ClassNameFinder";
import { initLazyShowing } from "./utils";
import { initCopyClassName } from "./utils";
import { initThemeToggler } from "./Common/ThemeToggler";
import "./index.css";

const switchContainer = document.querySelector(
  ".view-switch-container"
) as HTMLElement;
van.add(switchContainer, ViewSwitcher());

const colorPickerView = document.querySelector(
  ".colorpicker-view"
) as HTMLElement;
van.add(colorPickerView, ColorPicker());

const twPlaygroundContainer = document.querySelector(
  ".playground-view"
) as HTMLElement;
van.add(twPlaygroundContainer, TWPlayground());

initClassNameFinder();

initLazyShowing(".content-box.hidden", "hidden", 30);

initCopyClassName();

initThemeToggler();
