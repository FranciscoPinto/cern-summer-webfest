// requestAnimFrame shim
window.requestAnimFrame = (function()
{
   return  window.requestAnimationFrame       || 
           window.webkitRequestAnimationFrame || 
           window.mozRequestAnimationFrame    || 
           window.oRequestAnimationFrame      || 
           window.msRequestAnimationFrame     || 
           function(callback)
           {
               window.setTimeout(callback);
           };
})();

// remove frame margin and scrollbars when maxing out size of canvas
document.body.style.margin = "0px";
document.body.style.overflow = "hidden";

// get dimensions of window and resize the canvas to fit
var width = window.innerWidth,
    height = window.innerHeight,
    canvas = document.getElementById("c");

canvas.width = width;
canvas.height = height;

// get 2d graphics context and set global alpha
var G=canvas.getContext("2d");
G.globalAlpha=0.25;

// setup aliases
var Rnd = Math.random,
    Sin = Math.sin,
    Floor = Math.floor;

// constants and storage for objects that represent star positions
var warpZ = 30,
    units = 200,
    stars = [],
    Z = 0.025 + (1/25 * 2);
   
// function to reset a star object
function resetstar(a)
{
   a.x = (Rnd() * width - (width * 0.5)) * warpZ;
   a.y = (Rnd() * height - (height * 0.5)) * warpZ;
   a.z = warpZ;
   a.px = 0;
   a.py = 0;
}

// initial star setup
for (var i=0, n; i<units; i++)
{
   n = {};
   resetstar(n);
   stars.push(n);
}

var myImage = new Image();

myImage.src = "star.png";

// star rendering anim function
var rf = function()
{
   // clear background
   G.fillStyle = "#000";
   G.fillRect(0, 0, width, height);

   // update all stars
   for (var i=0; i<units; i++)
   {
      var n = stars[i],            // the star
          xx = n.x / n.z,          // star position
          yy = n.y / n.z,
          e = (5.0 / n.z + 1) * 2;   // size i.e. z
      
      if (n.px !== 0)
      {
				//G.fillRect(n.x/n.z, n.y/n.z, e, e);
        G.drawImage(myImage, n.px + width/2, n.py + height/2, 1/n.z*width/10, 1/n.z*width/10);
      }

      n.px = xx;
      n.py = yy;
      n.z -= Z;
      
      if (n.z < Z || n.px > width || n.py > height)
      {
         resetstar(n);
      }
   }

   requestAnimFrame(rf);
};
requestAnimFrame(rf);

