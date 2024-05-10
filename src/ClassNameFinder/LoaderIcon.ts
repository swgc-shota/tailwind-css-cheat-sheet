import van, { State } from "vanjs-core";
import "./LoaderIcon.css";
const { div } = van.tags;
export const LoaderIcon = (isShow: State<boolean>) =>
  div({
    class: () =>
      `loader absolute right-[1rem] top-[10%] text-xl text-yellow-500 ${isShow.val ? "" : "hidden"}`,
  });
