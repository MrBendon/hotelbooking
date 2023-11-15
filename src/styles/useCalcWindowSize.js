export default function useCalcWindowSize() {
  return window.addEventListener("resize", function () {
    const WindowWidth = window.innerWidth;
    const WindowHieght = window.innerHeight;

    return { WindowWidth, WindowHieght };
  });
}
