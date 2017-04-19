window.addEventListener('load', init);
let canvas, ctx, width, height;
let Lesballes = []; 
let LesBlocs = []; 

function colorerBrique(range){
	let color = "white";
	switch(range){
	  case 1:
	    color="#A64B00";
	    break;
	  case 2:
	    color="#BF7130";
	    break;
	  case 3:
	    color="#A6A600";
	    break;
	  case 4:
	    color="#BFBF30";
	    break;
	  case 5:
	    color="#48036F";
	    break;
    case 6:
	    color="#602580";
	    break;
	  case 7:
	    color="#602580";
	    break;

	}
	return color;
}


function init() {
  
  initFPS();
  
  canvas = document.querySelector("#myCanvas");
  width = canvas.width;
  height = canvas.height; 

  ctx = canvas.getContext('2d');

  ecouteurCreate();
  jeu.initGame();
  requestAnimationFrame(mainLoop);
}



function mainLoop(time) {
  measureFPS(time);
  ctx.clearRect(0, 0, width, height);
  switch(jeu.gameState){
    case 1:
      genereBalle(time);
      jeu.reprendreJeux();
      break;
    case 2:
      jeu.gameOver();
      break;
    case 3:
      jeu.pauseJeux();
  }
  requestAnimationFrame(mainLoop);
}


function creerBlc(){
	for(let range = 1; range<8; range++){
		for(let i = 0; i < 8; i++) {
			let width = 67;
			let height = 30;
			let x = i * (width+7) +7;
			let y = 75 + (height+7)*(range-1);
			let couleur = colorerBrique(range);
			let vx = 0;
	    	let vy = 0;
			let bloc = new Bloc(x, y, width, height, couleur, vx, vy);
			LesBlocs.push(bloc);
		}
	}

}
let oldTime=0;
let timeNextStage=0;
function getTimeBeforeNextStage(niveau){
	let time = 20;
	if(niveau%2!=0){
		time = 20;
	}
	else if(niveau%4==0){
		time = 2;
	}
	else if(niveau%2==0){
		time = 4;
	}
	return time;
}
function genereBalle(time){
   var diffTime = time - oldTime;
   if (diffTime >= 1500) {
   	 timeNextStage += 2; 
   	 oldTime = time;
     createBallsByNiveau(jeu.niveauEnCours);
     console.log("timeNextStage " + timeNextStage);
   }
   if(timeNextStage!=0 && timeNextStage%getTimeBeforeNextStage(jeu.niveauEnCours)==0){
   	jeu.passerAuNiveauSuivant();
   	console.log("niveau actuel " + jeu.niveauEnCours);
   	timeNextStage += 2; 
   }
}
function dessinerLesBlocs() {
  LesBlocs.forEach(function(bloc, index, tab) {
    bloc.draw(ctx);
  });
}
function createBallsByNiveau(niveau){
	if(niveau%2!=0){
		creerDesBalles(1);
	}
	else if(niveau%4==0){
		creerDesBalles(10);
	}
	else if(niveau%2==0){
		creerDesBalles(5);
	}
}
function creerDesBalles(nbBalls) {
  for(let i = 0; i < nbBalls; i++) {
    let x = Math.random() * width; 
    let y = 450;
    let rayon = 2 + 0.5 * 10; 
    let couleur = "white";
    let vx = 1+0.75 *5; 
    let vy = 1+0.75 *5;
    
    let b = new Balle(x, y, rayon, couleur, vx, vy);
    Lesballes.push(b);
  }
}

function dessinerEtDeplacerLesBalles() {
  Lesballes.forEach(function(b, index, tab) {
    b.draw(ctx);
    if(jeu.gameState=="1"){
    	b.move();
    }
    testeCollisionBalleAvecMurs(b);
  });
}

function testeCollisionBalleAvecMurs(b) {
  if(((b.x + b.rayon) > width) || ((b.x - b.rayon) < 0)) {
    b.vx = -b.vx;
  }
  if(((b.y - b.rayon) < 0)) {
    jeu.gameOver();
  }
}
function testCollisionBalleAvecBlocs(b, indexBalle) {
  LesBlocs.forEach(function(bloc, index, tab) {
  	if(circRectsOverlap(bloc.x, bloc.y,bloc.width, bloc.height,b.x, b.y, b.rayon)) {
      LesBlocs.splice(index, 1);
  	  b.vy = -b.vy;
  	  if(b.couleur=="red"){
  	  	Lesballes.splice(indexBalle, 1);
  	  }
    }
  });
}

function testerCollisionBalles() {
    Lesballes.forEach(function(b, index, tab) {
    testCollisionBalleAvecBlocs(b, index);
    if(circRectsOverlap(raquette.x, raquette.y, raquette.width, raquette.height, b.x, b.y, b.rayon)) {
      jeu.ajouterScore();
    }
    else if(circRectsOverlap(mur.x, mur.y,mur.width, mur.height,b.x, b.y, b.rayon)) {
      if(((b.y + b.rayon) > mur.y)) {
    	    b.vy = -b.vy;
    	    b.changeCouleur();
      }
    }
  });
    
}

function initGame(){
	Lesballes = []; 
	LesBlocs = []; 
	creerBlc();
}
function displayGame(){
	mur.draw(ctx);
	raquette.draw(ctx);
	jeu.ecrireScore(ctx);
	dessinerLesBlocs();
	dessinerEtDeplacerLesBalles();
	testerCollisionBalles();
}
function displayGameOver(){
	mur.draw(ctx);
	raquette.draw(ctx);
	jeu.ecrireScore(ctx);
  jeu.ecrireGO(ctx);
}

let jeu = {
  niveauEnCours:1,
  gameState:1,
  score:0,
  reprendreJeux: function() {
      this.gameState=1;
      displayGame();
  },
  gameOver: function() {
      this.gameState=2;
	  displayGameOver();
  },
  pauseJeux: function() {
      this.gameState=3;
      displayGame();
      let fontSize = 50;
      ctx.font = fontSize + 'px Courier';
      ctx.strokeStyle = "RED";
      ctx.strokeText("PAUSE", 200, 500);
  },
  initGame: function() {
      this.gameState=1;
      this.score=0;
      initGame();
  },
  ajouterScore: function() {
      this.score++;
  },
  passerAuNiveauSuivant(){
  	this.niveauEnCours++;
  },
  ecrireScore: function(ctx){
      ctx.save();
      ctx.translate(this.x, this.y);
      let fontSize = 50;
      ctx.font = fontSize + 'px Courier';
      ctx.strokeStyle = "white";
      ctx.strokeText("Score : "+this.score, 10, 35);
      ctx.restore();   
  },
  ecrireGO: function(ctx){
      ctx.save();
      ctx.translate(this.x, this.y);
      let fontSize = 50;
      ctx.font = fontSize + 'px Courier';
      ctx.strokeStyle = "white";
      ctx.strokeText("Score Final : "+this.score, 30, 100);
      ctx.strokeText("---- GAME OVER ----", 30, 200);
      ctx.restore();   
  }
}
