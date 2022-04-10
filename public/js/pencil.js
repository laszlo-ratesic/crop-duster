
/**
 * Canvas Painting
 */
 var canvas = document.getElementById('myCanvas');
 var ctx = canvas.getContext('2d');
 var painting = document.getElementById('app');
 var paintStyle = getComputedStyle(painting);

 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 var mouse = {x: 0, y: 0};
 var clearBtn = document.getElementById('clear');

 canvas.addEventListener('mousemove', function(e){
     mouse.x = e.pageX - this.offsetLeft;
     mouse.y = e.pageY - this.offsetTop;
 }, false);

 ctx.lineWidth = 3;
 ctx.lineJoin = 'round';
 ctx.lineCap = 'round';
 document.getElementById('black').onclick = function() {
  ctx.strokeStyle = '#000000'
  console.log('black')
 }
 document.getElementById('red').onclick = function() {
  ctx.strokeStyle = '#ff0000'
  console.log('red')
}
document.getElementById('blue').onclick = function() {
  ctx.strokeStyle = '#003cff'
  console.log('blue')
}
document.getElementById('yellow').onclick = function() {
  ctx.strokeStyle = '#ffee00'
  console.log('yel')
}
document.getElementById('purple').onclick = function() {
  ctx.strokeStyle = '#a200ff'
  console.log('pur')
}
document.getElementById('green').onclick = function() {
  ctx.strokeStyle = '#00ff2f'
  console.log('green')
}

 canvas.addEventListener('mousedown', function(e){
     ctx.beginPath();


     ctx.moveTo(mouse.x, mouse.y);
     canvas.addEventListener('mousemove', onPaint, false);
 }, false);

 canvas.addEventListener('mouseup', function(){
     canvas.removeEventListener('mousemove', onPaint, false);
 }, false);

 var onPaint = function(){
     ctx.lineTo(mouse.x, mouse.y);
     ctx.stroke();
 };

 function clear(){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
 };
 clearBtn.addEventListener('click', clear);

 //click
 function click(e){
   clX = e.offsetX;
   clY = e.offsetY;
   var imgData = ctx2.getImageData(clX,clY,1,1).data;
   rgbaColor = 'rgba('+ imgData[0] + ',' + imgData[1] + ',' + imgData[2] +',1)';
   fillGradient();
 }
 //fillGradient
 function fillGradient(){
   ctx1.fillStyle = rgbaColor;
   ctx1.fillRect(0,0, cbWidth, cbHeight);
   //white grd
   var gWhite = ctx2.createLinearGradient(0,0,cbWidth,0);
   gWhite.addColorStop(0, 'rgba(255,255,255,1)');
   gWhite.addColorStop(1, 'rgba(255,255,255,0)');
   ctx1.fillStyle = gWhite;  ctx1.fillRect(0,0,cbWidth,cbHeight);
   //black grd
   var gBlack = ctx2.createLinearGradient(0,0,0,cbHeight);
   gBlack.addColorStop(0, 'rgba(0,0,0,0)');
   gBlack.addColorStop(1, 'rgba(0,0,0,1)');
   ctx1.fillStyle = gBlack;
   ctx1.fillRect(0,0, cbWidth,cbHeight);
 }
 //mousedown on gradient
 function mousedown(e){
   cldrag = true;
   changeColor(e);
 }
 //mousemove in gradient
 function mousemove(e){
   if(cldrag){
     changeColor(e);
   }
 }
 //mouseup in gradient
 function mouseup(e){
   cldrag = false;
 }
 //changeColor
 function changeColor(e){
   clX = e.offsetX;
   clY = e.offsetY;
   var imgData = ctx1.getImageData(clX,clY,1,1).data;
   rgbaColor = 'rgba(' + imgData[0] + ',' + imgData[1] + ',' + imgData[2] + ',1)';

   cLabel.style.backgroundColor = rgbaColor;
 }

 // saving
window.onload = () => {
  const myCanvas = document.getElementById('myCanvas');
  const saveButton = document.getElementById('save');
  const loadInput = document.getElementById('load');
  const postButton = document.getElementById('post');

  new Drawing(myCanvas, saveButton, loadInput, postButton);
};

class Drawing {
  constructor(myCanvas, saveButton, loadInput, postButton) {
    this.isDrawing = false;

    myCanvas.addEventListener('mousedown', () => this.startDrawing());
    myCanvas.addEventListener('mousemove', (event) => this.draw(event));
    myCanvas.addEventListener('mouseup', () => this.stopDrawing());

    saveButton.addEventListener('click', () => this.save());
    loadInput.addEventListener('change', (event) => this.load(event));
    postButton.addEventListener('click', () => this.post());

    const rect = myCanvas.getBoundingClientRect();

    this.offsetLeft = rect.left;
    this.offsetTop = rect.top;

    this.myCanvas = myCanvas;
    this.context = this.myCanvas.getContext('2d');
  }
  startDrawing() {
    this.isDrawing = true;
  }
  stopDrawing() {
    this.isDrawing = false;
  }
  draw(event) {
    if (this.isDrawing) {
      this.context.fillRect(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, 2, 2);
    }
  }
  save() {
    const data = this.myCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = 'image.png';
    a.click();
  }
  load(event) {
    const file = [...event.target.files].pop();
    this.readTheFile(file)
      .then((image) => this.loadTheImage(image))
  }
  loadTheImage(image) {
    const img = new Image();
    const myCanvas = this.myCanvas;
    img.onload = function () {
      const context = myCanvas.getContext('2d');
      context.clearRect(0, 0, myCanvas.width, myCanvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = image;
  }
  readTheFile(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    })
  }
  // post() {
  //   const img = new Image();
  //   const myCanvas = this.myCanvas;

  // }
}
