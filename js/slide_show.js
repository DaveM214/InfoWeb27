//Global vars

// width="480" height="854"
//Slide dimensions
var SLIDE_W = 720;
var SLIDE_H = 320;


var titles = ["Overview", "Types and Evolution", "Attacks"];
var slide_images = ["images_slideshow/img0.png","images_slideshow/img1.png","images_slideshow/img2.png"];

var slides = new Array();

var TICK = 5000;

var intid = 0;

var canvas = 0;

var context = 0;

var currentSlide = 0;

var pause = 0;

var pause_button = 0
var play_button = 0;

//Event Listeners
function onclick (e) {
    console.log("Click position: " + e.clientX + " " + e.clientY);
}

function pause_event() {
		console.log("lol");
		if( !pause )
		{
			clearInterval(intid);
			pause = 1;
			play_button.className = "unselected";
			pause_button.className ="selected";
			
		}		

}

 function play_event() {
		if( pause )
		{
			intid = setInterval(mainLoop,TICK);
			pause = 0;
			play_button.className = "selected";
			pause_button.className ="unselected";
		}
}

function select_thumbnail(thumbnail)
{
	//pause_event();

	setSlide(thumbnail.id);

	clearInterval(intid);
	intid = setInterval(nextSlide,TICK);
	
}


//Entities
var Slide = function (x, y, src,id) {
    this.x = x || 0;
    this.y = y || 0;

    this.image = new Image();
    this.image.src = src;

    this.thumbnail = document.createElement("img");
    this.thumbnail.src = src;
    this.thumbnail.className = "thumbnail";
    this.thumbnail.id = id;
    this.thumbnail.onclick = function () {
    	select_thumbnail(this);
    }

    this.update = function (delta) {
        this.x = this.x + 5 * delta;
    };

    this.draw = function (context) {
        context.drawImage(this.image, this.x, this.y,SLIDE_W,SLIDE_H);
    };
};


//Control Functions
function initialise()
{
	//pause_button = document.getElementById("pause_button");
	//play_button = document.getElementById("play_button");

	slideshow_div = document.getElementById("slideshow");
	canvas = document.getElementById("slideshow_canvas");
	context = canvas.getContext("2d");

	slideshow_div.style.width = ""+SLIDE_W + "px";
	//slideshow.style.height = ""+(SLIDE_H+SLIDE_H/2) + "px";
	canvas.width = SLIDE_W;
	canvas.height = SLIDE_H;


	thumbnails_div = document.getElementById("thumbnails");
	for(var i = 0; i < slide_images.length; i++)
	{
		slides.push(new Slide(0,0,slide_images[i],i));
		
	
		thumbnails_div.appendChild(slides[i].thumbnail);
	}
	slides[currentSlide].thumbnail.className = "selected_thumbnail";


	canvas.addEventListener("click", onclick);

	setInterval(increaseAlpha, 100);

	intid = setInterval(nextSlide,TICK);

	context.globalAlpha = 0.1;


	setSlide(0);


}


function draw() 
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	slides[currentSlide].draw(context);
}

function setSlide(slide_index)
{
	slides[currentSlide].thumbnail.className = "thumbnail";
	currentSlide = slide_index;
	slides[currentSlide].thumbnail.className = "selected_thumbnail";

	title_h3 = document.getElementById("slide_title");
	title_h3.innerHTML = titles[currentSlide];
	
	context.globalAlpha = 0.0;
}

function nextSlide () {


	setSlide((currentSlide+1)%slide_images.length);
	
}

function increaseAlpha(){
	draw();
	context.globalAlpha += 0.1;	
}

