import van from "vanjs-core";
const { div } = van.tags;

export const Resizable = (
  child: HTMLElement,
  options = { width: 373, height: 665 },
) => {
  const width = van.state(options.width);
  const height = van.state(options.height);

  let resizeType = "";
  let startX = 0,
    startWidth = 0,
    startY = 0,
    startHeight = 0;

  const handleMousedown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target === null) {
      return;
    }
    resizeType = getComputedStyle(target).cursor;
    startX = e.clientX;
    startWidth = width.val;
    startY = e.clientY;
    startHeight = height.val;
    e.preventDefault();

    const mask = document.querySelector(".mousemove-catcher-for-iframe");
    mask?.classList.add("z-10");

    document.addEventListener("mousemove", handleMousemove);
    document.addEventListener("mouseup", handleMouseup);
    window.addEventListener("mouseout", handleMouseoutForWindow);
  };

  const handleMousemove = (e: MouseEvent) => {
    if (resizeType === "ns-resize") {
      const newHeight = startHeight + e.clientY - startY;
      height.val = newHeight > 50 ? newHeight : 50;
    } else if (resizeType === "ew-resize") {
      const newWidth = startWidth + (e.clientX - startX) * 2;
      width.val = newWidth > 50 ? newWidth : 50;
    } else if (resizeType === "nwse-resize") {
      const newWidth = startWidth + (e.clientX - startX) * 2;
      width.val = newWidth > 50 ? newWidth : 50;
      const newHeight = startHeight + e.clientY - startY;
      height.val = newHeight > 50 ? newHeight : 50;
    }
  };

  const handleMouseup = () => {
    resizeType = "";

    const mask = document.querySelector(".mousemove-catcher-for-iframe");
    mask?.classList.remove("z-10");

    document.removeEventListener("mousemove", handleMousemove);
    document.removeEventListener("mouseup", handleMouseup);
    window.removeEventListener("mouseout", handleMouseoutForWindow);
  };

  const handleMouseoutForWindow = (e: MouseEvent) => {
    if (
      (!e.relatedTarget && e.clientX <= 0) ||
      e.clientX >= window.innerWidth ||
      e.clientY <= 0 ||
      e.clientY >= window.innerHeight
    ) {
      resizeType = "";

      const mask = document.querySelector(".mousemove-catcher-for-iframe");
      mask?.classList.remove("z-10");

      document.removeEventListener("mousemove", handleMousemove);
      document.removeEventListener("mouseup", handleMouseup);
      window.removeEventListener("mouseout", handleMouseoutForWindow);
    }
  };

  return div(
    {
      class: "relative py-4 mx-auto border",
      style: () => `height: ${height.val}px; width: ${width.val}px;`,
    },
    div(
      {
        class:
          "absolute left-0 bottom-[-5px] w-full h-[6px] hover:bg-yellow-500",
      },
      div({
        class:
          "absolute left-0 bottom-0 w-[95%] h-full hover:cursor-ns-resize z-20",
        onmousedown: handleMousedown,
      }),
      div({
        class:
          "absolute right-0 bottom-0 w-[5%] h-full hover:cursor-nwse-resize z-20",
        onmousedown: handleMousedown,
      }),
    ),
    div(
      {
        class: "absolute top-0 right-[-5px] w-[4px] h-full hover:bg-yellow-500",
      },
      div({
        class:
          "absolute top-0 right-0 w-full h-[95%] hover:cursor-ew-resize z-20",
        onmousedown: handleMousedown,
      }),
      div({
        class:
          "absolute bottom-0 right-0 w-full h-[5%] hover:cursor-nwse-resize z-20",
        onmousedown: handleMousedown,
      }),
    ),
    div({
      class:
        "mousemove-catcher-for-iframe absolute top-0 left-0 w-full h-full opacity-0",
    }),
    div(
      { class: "absolute top-0 left-0 w-full h-full" },

      child,
    ),
  );
};
