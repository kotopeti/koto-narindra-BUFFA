function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
   let testX=cx;
   let testY=cy;
   if (testX < x0) testX=x0;
   if (testX > (x0+w0)) testX=(x0+w0);
   if (testY < y0) testY=y0;
   if (testY > (y0+h0)) testY=(y0+h0);
   return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  
  if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
    return false; 
  if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
    return false; 
  return true;    
}

function circleCollide(x1, y1, r1, x2, y2, r2) {
   let dx = x1 - x2;
   let dy = y1 - y2;
   return ((dx * dx + dy * dy) < (r1 + r2)*(r1+r2));
}




