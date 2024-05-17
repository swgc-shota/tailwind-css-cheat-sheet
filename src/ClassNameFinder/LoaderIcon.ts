import van, { State } from "vanjs-core";
import "./LoaderIcon.css";
const { div } = van.tags;
export const LoaderIcon = (isShow: State<boolean>) =>
  div(
    {
      class: () =>
        `absolute left-[16px] top-[20%]  text-yellow-500 ${
          isShow.val ? "loader left-[18px] top-[6px] text-xl" : "text-md"
        }`,
    },
    () => (isShow.val ? "" : "🔍")
  );
