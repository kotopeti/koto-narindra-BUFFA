class ObjetGraphique {


  draw(ctx) {
    ctx.save(); 
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, 2,0, 2*Math.PI);
    ctx.fillStyle = this.couleur;
    ctx.fill();
    ctx.restore();
    
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
  
  constructor(x, y, couleur, vx, vy) {
    this.x = x;
    this.y = y;
    this.couleur = couleur;
    this.vx = vx;
    this.vy = vy;
  }
  
  
  
}
