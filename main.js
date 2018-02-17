var canvas  = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}
var maxRadius = 50;
var minRadius = 5;

var colorArray = [
	'#5C4B51',
	'#8CBEB2',
	'#F2EBBF',
	'#F3B562',
	'#F06060'
]

window.addEventListener('mousemove', function(e){
	mouse.x = e.x;
	mouse.y = e.y;
});

window.addEventListener('resize', function(){
	canvas.width = innerWidth;
	canvas.height = innerHeight;	
	init();
});

function circle(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.fillColor = colorArray[Math.floor(Math.random()*colorArray.length)];

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2 , false);
		c.fillStyle = this.fillColor;
		c.fill();
	}

	this.update = function(){
		this.x +=this.dx;
		this.y +=this.dy;

		if(this.x>innerWidth - radius || this.x<0+radius){
			this.dx = -this.dx;
		} else if(this.y>innerHeight - radius || this.y<0+radius){
			this.dy = -this.dy
		}

		// interactivity
		if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50){
			if(this.radius<maxRadius){
				this.radius +=1;
			}
		}else if(this.radius>minRadius){
			this.radius -=1;
		}

		this.draw();
	}
}

var circleArray = [];
function init(){
	circleArray = [];

	for(var i=0; i<1000; i++){
		var x=Math.random()*(innerWidth-radius*2)+radius;
		var y=Math.random()*(innerHeight-radius*2)+radius;
		var dx=(Math.random()-0.5);
		var dy=(Math.random()-0.5);
		var radius=Math.random()*3+1;
		circleArray.push(new circle(x,y,dx,dy,radius));
	}
}

function animate(){
	c.clearRect(0,0,innerWidth,innerHeight);
	requestAnimationFrame(animate);

	for(var i=0; i<circleArray.length; i++){
		circleArray[i].update();
	}
}

animate();
init();
