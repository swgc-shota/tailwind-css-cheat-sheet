import van from "vanjs-core";

const { div, a } = van.tags;

const showingViewName = van.state("");

van.derive(() => {
  const classNameFinder = document.querySelector(
    ".classname-finder-container"
  ) as HTMLElement;
  const cheatsheet = document.querySelector(".cheatsheet-view") as HTMLElement;
  const colorPicker = document.querySelector(
    ".colorpicker-view"
  ) as HTMLElement;
  const playground = document.querySelector(".playground-view") as HTMLElement;

  classNameFinder.style.display = showingViewName.val === "" ? "block" : "none";
  cheatsheet.style.display = showingViewName.val === "" ? "block" : "none";
  colorPicker.style.display =
    showingViewName.val === "colorpicker" ? "block" : "none";
  playground.style.display =
    showingViewName.val === "playground" ? "block" : "none";

  const switchContainer = document.querySelector("div[data-active]");
  switchContainer?.setAttribute("data-active", showingViewName.val);
});

const params = new URLSearchParams(window.location.search);
const _view = params.get("view") as string | null;
showingViewName.val = _view === null ? "" : _view;

const switchShowingView = (e: Event, newViewName: string) => {
  e.preventDefault();
  const a = e.target as HTMLAnchorElement;
  const newUrl = a.getAttribute("href");
  window.history.pushState(null, "", newUrl);

  showingViewName.val = newViewName;
};

export const ViewSwitcher = () => {
  return div(
    {
      "data-active": "",
      class: `group flex w-[320px] 
      sm:w-[520px] 
      text-xs 
      sm:text-sm 
      text-center 
      border 
      border-stone-500 
      divide-x 
      rounded-full 
      mx-auto 
      *:flex
      *:justify-center
      *:items-center
      *:dark:text-stone-200
      *:dark:bg-stone-600
      *:w-1/3
      *:py-2`,
    },
    a(
      {
        href: "./",
        onclick: (e: Event) => switchShowingView(e, ""),
        class: `rounded-l-full          
        group-[[data-active='']]:bg-stone-800
        group-[[data-active='']]:text-stone-300
        group-[[data-active='']]:hover:bg-stone-800
        group-[[data-active='']]:hover:text-stone-300
        dark:group-[[data-active='']]:bg-stone-900
        dark:group-[[data-active='']]:text-yellow-500 dark:hover:group-[[data-active='']]:bg-stone-900 dark:hover:group-[[data-active='']]:text-yellow-500
        hover:bg-stone-50 
        hover:text-stone-800 
        dark:hover:bg-stone-700 
        dark:hover:text-stone-200`,
      },
      "チートシート"
    ),
    a(
      {
        href: "?view=colorpicker",
        onclick: (e: Event) => switchShowingView(e, "colorpicker"),
        class: `         
        group-[[data-active='colorpicker']]:bg-stone-800
        group-[[data-active='colorpicker']]:text-stone-300
        group-[[data-active='colorpicker']]:hover:bg-stone-800
        group-[[data-active='colorpicker']]:hover:text-stone-300
        dark:group-[[data-active='colorpicker']]:bg-stone-900
        dark:group-[[data-active='colorpicker']]:text-yellow-500 dark:hover:group-[[data-active='colorpicker']]:bg-stone-900 dark:hover:group-[[data-active='colorpicker']]:text-yellow-500
        hover:bg-stone-50 
        hover:text-stone-800 
        dark:hover:bg-stone-700 
        dark:hover:text-stone-200`,
      },
      "色見本"
    ),
    a(
      {
        href: "?view=playground",
        onclick: (e: Event) => switchShowingView(e, "playground"),
        class: `rounded-r-full         
        group-[[data-active='playground']]:bg-stone-800
        group-[[data-active='playground']]:text-stone-300
        group-[[data-active='playground']]:hover:bg-stone-800
        group-[[data-active='playground']]:hover:text-stone-300
        dark:group-[[data-active='playground']]:bg-stone-900
        dark:group-[[data-active='playground']]:text-yellow-500 dark:hover:group-[[data-active='playground']]:bg-stone-900 dark:hover:group-[[data-active='playground']]:text-yellow-500
        hover:bg-stone-50 
        hover:text-stone-800 
        dark:hover:bg-stone-700 
        dark:hover:text-stone-200`,
      },
      "プレイグラウンド"
    )
  );
};
