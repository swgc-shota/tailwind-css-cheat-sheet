export const initLazyShowing = (
  showTargetSelector: string = "div.hidden",
  removeClass: string = "hidden",
  numberPerShow: number = 100,
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
        document.querySelectorAll(showTargetSelector),
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
  const copyClassName = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "TD") {
      return;
    }
    copyTextFromDom(target);
  };
  const cheatsheetContent = document.querySelector(
    ".cheatsheet-content",
  ) as HTMLDivElement;
  cheatsheetContent.addEventListener("click", copyClassName);
};

const copyTextFromDom = (target: HTMLElement) => {
  const originalText = target.textContent as string;

  navigator.clipboard
    .writeText(originalText)
    .then(() => {
      target.textContent = "Copied!";
    })
    .catch((err) => {
      console.error(err);
      target.textContent = "Failed!";
    });

  setTimeout(() => {
    target.textContent = originalText;
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
  delay: number,
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
