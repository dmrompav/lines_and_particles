(function() {

	var canvas				= document.createElement('canvas'),
		ctx					= canvas.getContext('2d'),
		w, h, lengthOfSquare;

	window.addEventListener('resize', Resize, false);
	Resize();
	document.querySelector('body').appendChild(canvas);

	function Resize() {
		w	= canvas.width	= innerWidth;
		h	= canvas.height	= innerHeight;
		lengthOfSquare		= Math.sqrt(w * h);
	}
	
	//Drawing ===============================
	var particles = [],
		properties = {
			bgColor				: 'rgba(17, 17, 17, 1)',
			particleColor		: 'rgba(40, 255, 40, 1)',
			lineColor			: 'rgba(40, 255, 40,',
			particleRadius		: 3,
			particleCount		: 60,
			particleMaxVelocity	: 0.7,
			lineLength			: 0.2,
			lifeTime			: 6,
			tick				: 3,
			tickCount			: 0,

	}
	class Particle {
		constructor() {
			this.x = Math.random()*w;
			this.y = Math.random()*h;
			this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
			this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
			this.life = Math.random()*properties.lifeTime * 60
		}
		position() {
			((this.x + this.velocityX > w && this.velocityX > 0) || (this.x - this.velocityX < 0 && this.velocityX < 0))? this.velocityX *= -1 : this.velocityX;
			this.x += this.velocityX;
			((this.y + this.velocityY > h && this.velocityY > 0) || (this.y - this.velocityY < 0 && this.velocityY < 0))? this.velocityY *= -1 : this.velocityY;
			this.y += this.velocityY;
		}
		reDraw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle	= properties.particleColor;
			ctx.fill();
		}
		reCalculateLife() {
			if(this.life < 1) {
				this.x = Math.random()*w;
				this.y = Math.random()*h;
				this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
				this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
				this.life = Math.random()*properties.lifeTime * 60
			}
			this.life--;
		}
	}

	Init();

	function Init() {
		for(let i = 0; i < properties.particleCount; i++) {
			particles.push(new Particle);
		}
		Loop();
	}

	function Loop() {
		if (properties.tickCount === properties.tick) {
			console.log("a")
			ReDrawBackground();
			ReDrawParticles();
			DrawLines();
			properties.tickCount = 0;
		}
		properties.tickCount++
		requestAnimationFrame(Loop);
	}

	function ReDrawBackground() {
		ctx.fillStyle	= properties.bgColor;
		ctx.fillRect(0,0,w,h)
	}

	function ReDrawParticles() {
		for(let i in particles) {
			particles[i].reCalculateLife();
			particles[i].position();
			particles[i].reDraw();
		}
	}

	function DrawLines() {
		let x1, y1, x2, y2, length, opacity;
		for(let i in particles) {
			for(let j in particles) {
				x1 = particles[i].x
				y1 = particles[i].y
				x2 = particles[j].x
				y2 = particles[j].y
				length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2- y1, 2))
				if (length < (properties.lineLength * lengthOfSquare)) {
					opacity = 1 - (length/(properties.lineLength * lengthOfSquare))
					ctx.lineWidth = '0.5';
					ctx.strokeStyle = properties.lineColor + opacity + ")";
					ctx.beginPath();;
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.closePath();
					ctx.stroke();
				} 
			}
		}
	}
}())