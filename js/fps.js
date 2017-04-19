let frameCount = 0;let lastTime;let fps;let fpsContainer;
function initFPS() {
  fpsContainer = document.createElement('div');
  document.body.appendChild(fpsContainer);
}
let measureFPS = function(newTime){
   if(lastTime === undefined) {
     lastTime = newTime;
     return;
   }
   var diffTime = newTime - lastTime;
   if (diffTime >= 1000) {
     fps = frameCount;
     frameCount = 0;
     lastTime = newTime;
   }
   fpsContainer.innerHTML = 'FPS: ' + fps;
   frameCount++;
};
