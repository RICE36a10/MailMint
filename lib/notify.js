let container;

export function notify(message) {
  if (typeof window === "undefined") {
    console.log(message);
    return;
  }

  if (!container) {
    container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "1rem";
    container.style.right = "1rem";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "0.5rem";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "0.5rem 1rem";
  toast.style.borderRadius = "0.25rem";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s";

  container.appendChild(toast);

  // trigger transition
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.addEventListener(
      "transitionend",
      () => {
        container.removeChild(toast);
        if (!container.childElementCount) {
          container.remove();
          container = null;
        }
      },
      { once: true }
    );
  }, 3000);
}
