export const initThemeToggler = () => {
  const toggler = document.querySelector(".theme-toggler");
  toggler?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const event = new CustomEvent("themetoggle", {
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
  });
};
