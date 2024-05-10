import van from "vanjs-core";
import { debouncer } from "../utils";
import { LoaderIcon } from "./LoaderIcon";

const highlightText = (searchText: string, node: Node) => {
  const recursiveHighlight = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text;
      const nodeValue = textNode.nodeValue as string;
      const matchIndex = nodeValue.indexOf(searchText);

      if (matchIndex >= 0) {
        const mark = document.createElement("mark");
        mark.className = "bg-yellow-200";
        const matchText = textNode.splitText(matchIndex);
        const afterMatch = matchText.splitText(searchText.length);
        const highlightText = matchText.cloneNode(true);
        mark.appendChild(highlightText);
        matchText.parentNode?.replaceChild(mark, matchText);

        recursiveHighlight(afterMatch);
        return;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node as Element;
      if (
        elementNode.tagName == "SCRIPT" ||
        elementNode.tagName == "STYLE" ||
        elementNode.tagName == "MARK"
      ) {
        return;
      }
      Array.from(elementNode.childNodes).forEach(recursiveHighlight);
    }
  };

  recursiveHighlight(node);
};

const removeHighlights = () => {
  const highlightedElements = document.querySelectorAll(`mark`);

  highlightedElements.forEach((element) => {
    const parent = element.parentNode as ParentNode;

    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }

    parent.removeChild(element);
    parent.normalize();
  });
};

export const initClassNameFinder = () => {
  const blocks = document.querySelectorAll(
    "div.content-box"
  ) as NodeListOf<HTMLDivElement>;

  const nowSearching = van.state(false);

  const searchClassNames = debouncer((e: KeyboardEvent) => {
    removeHighlights();
    const input = e.target as HTMLInputElement;
    updateCheatsheet(input.value);
    nowSearching.val = false;
  }, 500);

  const updateCheatsheet = (searchText: string) => {
    if (searchText === "") {
      blocks.forEach((block) => {
        block.style.display = "";
      });
    } else {
      blocks.forEach((block) => {
        if (block.textContent?.includes(searchText)) {
          block.style.display = "block";
          highlightText(searchText, block);
        } else {
          block.style.display = "none";
        }
      });
    }
  };

  const input = document.querySelector("input");
  input?.addEventListener("input", (e: Event) => {
    nowSearching.val = true;
    searchClassNames(e as KeyboardEvent);
  });

  const container = document.querySelector(
    ".classname-finder-container>div"
  ) as HTMLDivElement;
  van.add(container, LoaderIcon(nowSearching));
};
