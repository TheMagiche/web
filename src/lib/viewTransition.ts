export function navigateWithViewTransition(navigate: () => void) {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    document.startViewTransition(navigate);
    return;
  }

  navigate();
}
