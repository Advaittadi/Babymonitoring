img = "";
objects = [];
status = "";
baby=''

function preload()
{
  baby = loadSound("alarm_tone.mp3")
}

function setup() {

  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = 'true';
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
  
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
    r= random(255)
    g=random(255)    
    b = random(255)
        objectDetector.detect(video, gotResult);
        for(i=0 ;i <objects.length ; i++)
        {fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label=='person')
          {
            baby.stop()
            document.getElementById("status").innerHTML = "Status : Baby Found";
          }
         else if(objects[i].label != 'person')
          {
            console.log('baby not found')
            document.getElementById("status").innerHTML = "Status : Baby Not Found";
            baby.play()
          }
          else if(objects.length == 0)
          {
            baby.play()
            document.getElementById('status').innerHTML = "Status : Baby Not Found"
          }
          
        }
      }
}