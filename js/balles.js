class Balle extends ObjetGraphique {
  constructor(x, y, rayon, couleur, vx, vy) {
    super(x, y, couleur, vx, vy);
    this.rayon = rayon;
  }
  
  changeCouleur() {
    if(this.couleur=="white"){
      this.couleur="orange";
    }
    else if(this.couleur=="orange"){
      this.couleur="red";
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.rayon,0, 2*Math.PI);
    ctx.fillStyle = this.couleur;
    ctx.fill();
    ctx.restore();
    super.draw(ctx);
  }

  
}