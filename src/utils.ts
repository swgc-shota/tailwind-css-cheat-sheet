export const initLazyShowing = (
  showTargetSelector: string = "div.hidden",
  removeClass: string = "hidden",
  numberPerShow: number = 100
) => {
  const onScroll = () => {
    const params = new URLSearchParams(window.location.search);
    const isNotCheatsheetView = (params.get("view") as string | null) !== null;
    if (isNotCheatsheetView) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const hiddenItems = Array.from(
        document.querySelectorAll(showTargetSelector)
      ).slice(0, numberPerShow) as HTMLDivElement[];
      hiddenItems.forEach((item) => {
        item.classList.remove(removeClass);
      });

      if (hiddenItems.length < numberPerShow) {
        window.removeEventListener("scroll", onScroll);
      }
    }
  };

  window.addEventListener("scroll", onScroll);
};

export const initCopyClassName = () => {
  const cheatsheetContent = document.querySelector(
    ".cheatsheet-content"
  ) as HTMLDivElement;

  cheatsheetContent.addEventListener("click", (e: MouseEvent) => {
    const _ = e.target as HTMLElement;
    const target = _.tagName !== "MARK" ? _ : (_.parentElement as HTMLElement);

    if (target.tagName !== "TD") {
      return;
    }
    doCopyTextContent(target);
  });

  cheatsheetContent.addEventListener("keydown", (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "TD" || e.key !== "Enter") {
      return;
    }
    doCopyTextContent(target);
  });
};

/**
 * Copies the text content of a given HTML element to the clipboard.
 * Optionally, a function can be provided to generate the text before copying.
 * After copying, the element's text content is temporarily changed to indicate success or failure.
 *
 * @param {HTMLElement} target - The target HTML element whose text content is to be copied.
 * @param {() => string} [generateCopyText] - An optional function to generate the text content before copying. If not provided, the original text content is copied.
 */
export const doCopyTextContent = (
  target: HTMLElement,
  generateCopyText?: () => string
) => {
  const originalText = (target.textContent as string)
    .replace(/\/\*[\s\S]*?\*\//, "")
    .replace("> * + *", "")
    .trim();
  const cloneDom = target.cloneNode(true);
  const copyText =
    generateCopyText !== undefined ? generateCopyText() : originalText;

  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      target.textContent = "Copied!";
    })
    .catch((err) => {
      console.error(err);
      target.textContent = "Failed!";
    });

  setTimeout(() => {
    target.parentElement?.replaceChild(cloneDom, target);
  }, 500);
};

/**
 * Generates a debouncer function.
 * @param func The callback function to execute
 * @param delay The debounce waiting time in milliseconds
 * @return The debounced function
 */
export function debouncer<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<void> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let resolvePrevious: () => void = () => {};

  return (...args: Parameters<T>): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        resolvePrevious();
      }

      resolvePrevious = resolve;

      timeoutId = setTimeout(() => {
        func(...args);
        resolve();
        timeoutId = null;
      }, delay);
    });
  };
}
