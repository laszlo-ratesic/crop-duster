// Set up the sketchpad.  This uses paper.js to render the pencil markings.
// The pencil itself is rendered as a 3D object using THREE.js, but we'll get to that later.
// There are 2 canvases in use, one for the pencil and one for the actual sketch.
  // color buttons
  

(function (window) {
  function Sketch() {
    this.group = new paper.Group();
    this.isDrawing = false;

    // paper.js allows us to use the mouse easily to create vector lines.
    // more here http://paperjs.org/tutorials/interaction/creating-mouse-tools/
    this.mouseTool = new paper.Tool();
    this.mouseTool.minDistance = 5;
    this.mouseTool.maxDistance = 30;
    this.mouseTool.on('mousedown', this.onMouseDown.bind(this));
    this.mouseTool.on('mousedrag', this.onMouseDrag.bind(this));
    this.mouseTool.on('mouseup', this.onMouseUp.bind(this));
  } 

  Sketch.prototype.onMouseDown = function (e) {
    this.isDrawing = true;
    this.currPath = new paper.Path();

  // const blkButton = document.getElementById('black');
  // const redButton = document.getElementById('red');
  // const blueButton = document.getElementById('blue');
  // const yelButton = document.getElementById('yellow');
  // const purButton = document.getElementById('purple');
  // const grnButton = document.getElementById('green');

  // dif color pencils
  var clicked = $(this).attr("id");
  this.currPath.fillColor = '#424242';
  document.getElementById('black').onclick = function() {
  console.log('black')
  color()
 }
 document.getElementById('red').onclick = function() {
  console.log('red')
  color()
}
document.getElementById('blue').onclick = function() {
  console.log('blue')
  color()
}
document.getElementById('yellow').onclick = function() {
  console.log('yellow')
  color()
}
document.getElementById('purple').onclick = function() {
  console.log('purple')
  color()
}
document.getElementById('green').onclick = function() {
  console.log('green')
  color()
}

  function color() {
 
  if (clicked === 'black'){
     // black
    this.currPath.fillColor = '#424242';
  }
    else if (clicked === 'red'){
      // red
    this.currPath.fillColor = '#ed0505';
  }
  else if (clicked === 'blue'){
     // blue
    this.currPath.fillColor = '#0f57db';
  }
  else if (clicked === 'yellow'){
     // yellow
    this.currPath.fillColor = '#f6ff00';
  }
  else if (clicked === 'purple'){
     // purple
    this.currPath.fillColor = '#ff00d9';
  } 
  else if (clicked === 'green'){
     // green
    this.currPath.fillColor = '#1cd425';
  }
  // else{
  //   this.currPath.fillColor = '#424242'
  // }
  
 }
// this.currPath.fillColor = '#424242';

    this.currPath.add(e.point);
  };

  Sketch.prototype.onMouseDrag = function (e) {
    if (!this.isDrawing) return;

    if (!e.point.isInside(this.sketchingBounds)) {
      this.onMouseUp(e);
      return;
    }

    var step = e.delta.divide(2);
    step.angle += 10;

    var top = e.middlePoint.add(step);
    var bottom = e.middlePoint.subtract(step);

    this.currPath.add(top);
    this.currPath.insert(0, bottom);
    this.currPath.smooth(10);
  };

  Sketch.prototype.onMouseUp = function (e) {
    if (!this.isDrawing) return;

    this.isDrawing = false;

    if (e.point.isInside(this.sketchingBounds)) {
      this.currPath.add(e.point);
      this.currPath.closed = true;
    }

    this.group.addChild(this.currPath);
  };

  Sketch.prototype.setSketchingBounds = function (x, y, width, height) {
    this.sketchingBounds = new paper.Rectangle(x, y, width, height);
  };

  window.Sketch = Sketch;
})(window);

/* Set up the Pencil */

var pencil = (function () {
  var pencil,
    isDrawing,
    rangeX = 0,
    rangeY = 0,
    scale = 1.5,
    canvasW,
    canvasH,
    moveRotationRange = { x: 100, y: 30 };

  function init(_canvasW, _canvasH, onReady) {
    canvasW = _canvasW;
    canvasH = _canvasH;
    isDrawing = false;
    pencil = new THREE.Object3D();

    // Load the 3D model and its materials
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/356608/PENCIL.mtl',
      function (materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/356608/PENCIL.obj',
          function (object) {
            var scale = 1.5;
            object.rotation.x = toRad(90);
            object.scale.set(scale, scale, scale);
            pencil.add(object);
            scene.add(pencil);
          }
        );

        stopDrawing();
        onReady();
      }
    );
  }

  function startDrawing() {
    isDrawing = true;
    TweenLite.to(pencil.position, 0.2, { z: 0, ease: Expo.easeOut });
  }

  function stopDrawing() {
    isDrawing = false;
    TweenLite.to(pencil.position, 0.2, { z: 2, ease: Quad.easeInOut });
  }

  function move(x, y) {
    rangeX = x / wW - 0.5;
    rangeY = y / wH - 0.5;

    // Convert the current mouse position to a point in 3D space.  This involves 'unprojecting' the
    // 2D values into 3D space.  More info here:
    // https://barkofthebyte.azurewebsites.net/post/2014/05/05/three-js-projecting-mouse-clicks-to-a-3d-scene-how-to-do-it-and-how-it-works
    var mouse3D = new THREE.Vector3((x / wW) * 2 - 1, -(y / wH) * 2 + 1, 0.5);
    mouse3D.unproject(camera);
    var dir = mouse3D.sub(camera.position).normalize();
    dir.x *= wW / canvasW;
    dir.y *= wH / canvasH;
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));

    pencil.position.x = pos.x;
    pencil.position.y = pos.y;
    TweenLite.to(pencil.rotation, 0.2, {
      y: rangeX * toRad(moveRotationRange.x),
      x: rangeY * toRad(moveRotationRange.y),
      z: toRad(rangeY * 200),
    });
  }

  // Utility function for converting degrees to radians
  function toRad(deg) {
    return (Math.PI / 180) * deg;
  }

  return {
    init: init,
    startDrawing: startDrawing,
    stopDrawing: stopDrawing,
    move: move,
    isDrawing: function () {
      return isDrawing;
    },
  };
})();

// The main program.
// This bit brings all our parts together, the shadow, pencil and drawing mechanic
var wW,
  wH,
  pencilCanvas,
  pencilCanvasW = 1920,
  pencilCanvasH = 1080,
  sketchCanvas,
  scene,
  camera,
  renderer,
  sketch,
  sketchpad,
  introTl,
  pencilPos = { x: 0, y: 0 };

function init() {
  sketchpad = document.getElementById('sketchpad');

  // Pencil Renderer
  pencilCanvas = document.getElementById('pencil3D');
  pencilCanvas.setAttribute('width', pencilCanvasW + 'px');
  pencilCanvas.setAttribute('height', pencilCanvasH + 'px');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    pencilCanvasW / pencilCanvasH,
    0.1,
    1000
  );
  camera.position.z = 25;
  camera.lookAt(scene.position);
  renderer = new THREE.WebGLRenderer({
    canvas: pencilCanvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(pencilCanvasW, pencilCanvasH);

  // Light up the pencil, otherwise it would appear boring and flat
  var light1 = new THREE.AmbientLight(0x404040);
  light1.intensity = 6;
  scene.add(light1);

  var light2 = new THREE.SpotLight(0x404040);
  light2.intensity = 3;
  light2.position.set(-5, 15, 10);
  light2.target.position = new THREE.Vector3(0, 0, 5);
  scene.add(light2);

  var light3 = new THREE.SpotLight(0x404040);
  light3.intensity = 0.5;
  light3.position.set(5, -15, 10);
  light3.target.position = new THREE.Vector3(0, 0, 5);
  scene.add(light3);

  // Instantiate the sketchpad
  sketchCanvas = document.getElementById('sketch');
  paper.setup(sketchCanvas);
  sketch = new Sketch();
  pencil.init(pencilCanvasW, pencilCanvasH, onReady);

  onResize();

  // Some intro animation (the sketchpad expands once everything is loaded)
  introTl = new TimelineLite({
    paused: true,
    delay: 2,
    onComplete: function () {
      // Allow the user to interact with the mouse only after the intro animation has finished
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('resize', onResize);
    },
  });
  introTl.to('#intro', 0.3, { opacity: 0 });
  introTl.from('#sketchpad', 0.5, { scaleY: 0, ease: Expo.easeInOut });
  introTl.append(
    TweenMax.fromTo(
      pencilPos,
      0.7,
      { x: wW / 2, y: wH + 300 },
      { x: wW * 0.7, y: wH * 0.5, roundProps: 'x,y', ease: Expo.easeOut }
    )
  );

  render();
}

function onReady() {
  introTl.play();
}

function onResize() {
  // Make the sketchpad responsive
  wW = window.innerWidth;
  wH = window.innerHeight;

  var sketchpadW = wW - 100;
  var sketchpadH = wH - 100;

  sketchpad.style.width = sketchpadW + 'px';
  sketchpad.style.height = sketchpadH + 'px';

  // Make sure the user can't draw outside of the sketchpad bounds
  sketch.setSketchingBounds(50, 50, sketchpadW, sketchpadH);
  sketchCanvas.setAttribute('width', wW);
  sketchCanvas.setAttribute('height', wH);
  paper.view.viewSize = new paper.Size(wW, wH);
  paper.view.draw();

  pencilCanvas.style.left = wW / 2 - pencilCanvasW / 2 + 'px';
  pencilCanvas.style.top = wH / 2 - pencilCanvasH / 2 + 'px';
}

function onMove(e) {
  // When the pencil is moved but NOT drawing, make the movement animate at a slightly smoother rate
  var duration = pencil.isDrawing() ? 0.05 : 0.25;
  TweenLite.to(pencilPos, duration, { x: e.clientX, y: e.clientY });
}

function onMouseDown(e) {
  pencil.startDrawing();
}

function onMouseUp(e) {
  pencil.stopDrawing();
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  pencil.move(pencilPos.x, pencilPos.y);
  paper.view.draw();
}


window.onload = () => {
  const sketch = document.getElementById('sketch');
  const saveButton = document.getElementById('save');
  const loadInput = document.getElementById('load');

  new Drawing(sketch, saveButton, loadInput);
};

class Drawing {
  constructor(sketch, saveButton, loadInput) {
    this.isDrawing = false;

    sketch.addEventListener('mousedown', () => this.startDrawing());
    sketch.addEventListener('mousemove', (event) => this.draw(event));
    sketch.addEventListener('mouseup', () => this.stopDrawing());

    saveButton.addEventListener('click', () => this.save());
    loadInput.addEventListener('change', (event) => this.load(event));

    const rect = sketch.getBoundingClientRect();

    this.offsetLeft = rect.left;
    this.offsetTop = rect.top;

    this.sketch = sketch;
    this.context = this.sketch.getContext('2d');
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
    const data = this.sketch.toDataURL('image/png');
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
    const sketch = this.sketch;
    img.onload = function () {
      const context = sketch.getContext('2d');
      context.clearRect(0, 0, sketch.width, sketch.height);
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
}


init();
