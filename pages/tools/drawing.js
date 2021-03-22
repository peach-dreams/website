var colorWell;
var defaultColor = "#000000";
var currentColor = "#000000";
window.addEventListener("load", startup, false);
function startup() {
  brushSize = document.querySelector("#brushSize");
  colorWell = document.querySelector("#colorWell");
  colorWell.value = defaultColor;
  currentBrushSize = 20;
  colorWell.addEventListener("change", updateColor, false);
  brushSize.addEventListener("change", updateSize, false);
  colorWell.select();
  brushSize.select();
};
function updateColor(event) {
  currentColor = event.target.value;
};
function updateSize(event) {
  currentBrushSize = event.target.value;
  console.log(event.target.value);
};
let mouse_draw = false;
Sketch.create({
    container: document.getElementById('container'),
    autoclear: false,
    retina: 'auto',

    setup: function() {
        console.log( 'setup' );
    },

    update: function() {
        radius = 2 + abs( sin( this.millis * 0.003 ) * 50 );
    },
    // Event handlers
    // Mouse & touch events are merged, so handling touch events by default
    // and powering sketches using the touches array is recommended for easy
    // scalability. If you only need to handle the mouse / desktop browsers,
    // use the 0th touch element and you get wider device support for free.
    mousedown: function() {
      mouse_draw = true;
      console.log('clicked');
      console.log(currentColor);
    },
    mouseup: function(){
      mouse_draw = false;
      console.log('released')
    },
    mousemove: function(){
      if (mouse_draw){
        for ( var i = this.touches.length - 1, touch; i >= 0; i-- ) {
            touch = this.touches[i];

            this.lineCap = 'round';
            this.lineJoin = 'round';
            this.fillStyle = this.strokeStyle = currentColor;
            this.lineWidth = currentBrushSize;

            this.beginPath();
            this.moveTo(touch.ox, touch.oy);
            this.lineTo(touch.x, touch.y);
            this.stroke();
        }
      }
    }
    /*
    touchmove: function() {

        for ( var i = this.touches.length - 1, touch; i >= 0; i-- ) {

            touch = this.touches[i];

            this.lineCap = 'round';
            this.lineJoin = 'round';
            this.fillStyle = this.strokeStyle = '#000000';
            this.lineWidth = radius;

            this.beginPath();
            this.moveTo( touch.ox, touch.oy );
            this.lineTo( touch.x, touch.y );
            this.stroke();
        }
    }
    */
});
