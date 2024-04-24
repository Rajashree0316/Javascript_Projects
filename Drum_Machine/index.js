const screen = document.querySelector(".screen");

window.addEventListener("keydown", (e) => {
  const key = document.getElementById(e.key);

  if (e.key === " ") {
    screen.textContent = screen.textContent + e.key;
  }

  if (!key) {
    return;
  }

  key.children[0].play();
  screen.textContent = screen.textContent + e.key;
});