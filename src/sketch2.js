// video capture object
let capture;

// color we want to track
let r = 255;
let g = 255;
let b = 255;

let r1 = 255;
let g1 = 255;
let b1 = 255;

function setup() {
 

  pixelDensity(1);
  createCanvas(640, 480);
  background(30, 30, 30);

  // start up our web cam
  capture = createCapture({
    video: {
      mandatory: {
        minWidth: 640,
        minHeight: 480,
        maxWidth: 640,
        maxHeight: 480
      }
    }
  });
  capture.hide();
  noStroke();

}

function draw() {
  // expose the pixels in the incoming video stream
  capture.loadPixels();


  // if we have some pixels to work wtih them we should proceed
  if (capture.pixels.length > 0) {

    // set up variables to test for the best pixel
    let bestMatch = 1000;
    let bestLocation = -1;

    for (let i = 0; i < capture.pixels.length; i += 4) {
      // determine how close of a match this color is to our desired color
      let match = dist(r, g, b, capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
     // console.log(match);
      if (match < bestMatch) {
       // console.log(match);
        bestMatch = match;
        bestLocation = i;
      }
    }

    // draw the video
  //  image(capture, 0, 0);

    // now we know the best match!  draw a box around it
    let xPos = (bestLocation / 4) % 640;
    let yPos = (bestLocation / 4) / 640;
    fill(r1, g1, b1);
    ellipse(xPos, yPos, 25, 25);
   // rect(xPos, yPos, 25, 25);
  }
}


function changeRed(el) {
  // update the variable with the current value of this slider
  r1 = int( el.value );
}
function changeGreen(el) {
  // update the variable with the current value of this slider
  g1 = int( el.value );
}
function changeBlue(el) {
  // update the variable with the current value of this slider
  b1 = int( el.value );
}
