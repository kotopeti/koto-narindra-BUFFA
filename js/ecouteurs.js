function toucheEnfoncee(evt) {
   
  switch(evt.key) {
    case 'ArrowRight' :
      if(jeu.gameState==1){
        raquette.x = raquette.x+15;
      }

      break;
    case 'ArrowLeft' :
      if(jeu.gameState==1){
        raquette.x = raquette.x-15;
      }
      break;
    case ' ' :
      if(jeu.gameState==3){
        jeu.gameState = 1;
      }
      else{
        jeu.gameState = 3;
      }
      break;
  }
}

function sourisPush(evt) {

}
function sourisRelache(evt) {


}
function sourisDeplacee(evt) {
  let rect = canvas.getBoundingClientRect();
  let mx = evt.clientX - rect.left;
  let my = evt.clientY - rect.top;
  if(jeu.gameState==1){
    raquette.x= mx;
  }
}

function ecouteurCreate() {
  window.addEventListener('keydown', toucheEnfoncee);
  window.addEventListener('keyup', toucheRelachee);
  canvas.addEventListener('mouseup', sourisRelache); 
 canvas.addEventListener('mousedown', sourisPush); 
 canvas.addEventListener('mousemove', sourisDeplacee); 
}

function toucheRelachee(evt) {

}
