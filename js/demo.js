var screen=document.getElementById('screen');



function step(timestamp) {
  screen.innerHTML+=screenLeft;
  if (true) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);