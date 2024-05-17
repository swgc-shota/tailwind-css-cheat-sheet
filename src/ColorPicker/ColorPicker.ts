import van, { State } from "vanjs-core";

const { div, h2, label, input, p } = van.tags;

const colorNumbers = Array.from({ length: 10 }, (_, i) => {
  if (i == 0) return 50;
  else if (i == 9) return 950;
  else return i * 100;
});

const colorNames = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
];

const adjustColorNumber = (colorNumber: number): number => {
  if (colorNumber === 950) return 400;
  if (colorNumber === 50) return 500;
  if (colorNumber > 500) return colorNumber - 500;
  return colorNumber + 500;
};

const ColorTiles = (selectedColorType: State<string>): HTMLDivElement => {
  const Container = div({
    class: "flex flex-col gap-1 mt-4 w-min-11/12 overflow-x-auto py-2",
  });

  const clickHandler = (e: Event) => {
    const tile = e.target as HTMLDivElement;
    const originalText = tile.textContent as string;
    const suffix = tile.getAttribute("data-color-suffix") as string;

    navigator.clipboard
      .writeText(selectedColorType.val + suffix)
      .then(() => {
        tile.textContent = "Copied!";
      })
      .catch((err) => {
        console.error(err);
        tile.textContent = "Failed!";
      });

    setTimeout(() => {
      tile.textContent = originalText;
    }, 500);
  };

  for (let name of colorNames) {
    const Row = div({ class: "flex gap-1 m-auto" });
    van.add(
      Row,
      div(
        {
          class: `w-[4em] rounded text-center text-${name}-800 bg-${name}-100`,
        },
        name
      )
    );
    for (let number of colorNumbers) {
      van.add(
        Row,
        div(
          {
            title: `bg-${name}-${number}`,
            class: `color-tile block rounded bg-${name}-${number} cursor-pointer hover:ring-2 ring-offset-1 text-center text-${name}-${adjustColorNumber(
              number
            )} py-1 w-[4em] text-xs sm:text-sm md:text-md`,
            role: "button",
            tabindex: "0",
            "aria-label": "Copy this color name class",
            onclick: clickHandler,
            "data-color-suffix": `-${name}-${number}`,
          },
          number
        )
      );
    }
    van.add(Container, Row);
  }

  return Container;
};

const ColorTypeOptions = (selectedColorType: State<string>): HTMLDivElement => {
  const colorTypes = [
    "color",
    "decoration",
    "bg",
    "border",
    "divide",
    "outline",
    "ring",
    "ring-offset",
    "shadow",
    "accent",
    "caret",
    "fill",
    "stroke",
  ];

  return div(
    { class: "flex flex-wrap gap-1 *:w-[6em] mt-4" },
    colorTypes.map((type) =>
      label(
        {
          class: "",
        },
        input({
          class: "decoration-yellow-500",
          type: "radio",
          name: "colorType",
          value: type,
          checked: () => selectedColorType.val === type,
          onchange: () => (selectedColorType.val = type),
        }),
        type
      )
    )
  );
};

export const ColorPicker = (): HTMLDivElement => {
  const selectedColorType = van.state("bg");
  return div(
    { class: "w-full sm:w-[664px] m-auto mt-16 px-4 sm:px-0" },
    h2({ class: "font-bold" }, "Color Samples"),
    ColorTypeOptions(selectedColorType),
    p(
      { class: "text-sm mt-2" },
      "When each cell is clicked, the class name corresponding to the selected color prefix is copied."
    ),
    ColorTiles(selectedColorType)
  );
};
