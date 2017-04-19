let mur = {
  x:0,
  y:850,
  width:600,
  height:10,
  couleur:"white",
  move: function(x, y) {
      this.x = x;
      this.y = y;
  }, 
  draw: function(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = this.couleur;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.restore();    
  }

}
