// require config
require.config({
  baseUrl: 'assets/js',
  paths: {
    zepto: 'zepto.min',
    raphael: 'raphael.min'
  },
  shim: {
    zepto: {
      exports: '$'
    }
  }
});

// require libs
define(['zepto', 'raphael'], function( $ ) {

	var screen = {
		width: function() {
			return window.innerWidth;
		},
		height: function() {
			return window.innerHeight;
		}
	};

	// document loaded
	$('body').removeClass('nojs');

	// cycle over all mail-links,
	// remove _, ( and )
	// and replace "at" with @
	$('.maillink').each(function() {
		var email = $(this).text();
		email = email.replace(/[_|(|)]/g, '').replace(/at/, '@');
		$(this).text(email).attr('href', 'mailto:'+email);
	});

	var triangleVectors = [
		"m 455,192.375 L395,212.375 L550,237.375 L455,192.375",
		"m 550,237 -145,15 -10,-40",
		"m 455,192 60,0 35,45",
		"m 515,192 75,40 -40,5 0,0 0,0",
		"m 550,237 40,-5 -5,15",
		"m 550,237 36,25 -36,-25 35,10 1,15 -36,-25",
		"m 550,237 40,55 -3,-30 -36,-25 36,25 -36,-25",
		"m 585,347 5,-55 -40,-55",
		"m 550,237 -5,85 40,25",
		"m 450,262 95,60 5,-85",
		"m 405,252 45,10 100,-25",
		"m 545,322 -95,-60 -80,40",
		"m 370,302 35,-50 45,10",
		"m 400,232 -65,40 60,-60",
		"m 335,272 35,30 30,-70",
		"m 380,277 24,-25 -5,-20",
		"m 370,302 35,-50 45,10",
	];

	function getRandomInt( min, max ) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	

	function Page() {
		this.paper = Raphael( 0, 0, screen.width(), screen.height() );

		this.triangles = this.paper.set();
		for (var i = triangleVectors.length - 1; i >= 0; i--) {
			this.triangles.push(
				this.paper.path( triangleVectors[i] ).attr({ fill: this.randomColour(), 'stroke-width':0, transform: 's14,14 t0,0' })
			);
		};
		
	}

	Page.prototype.randomColour = function() {
		return 'rgb(' + getRandomInt(20, 70) + ', ' + getRandomInt(0, 20) + ', ' + getRandomInt(80, 120) + ')';
	}
	var page = new( Page );

	
	setInterval(function(){
		page.triangles.forEach(function(e){
			if (Math.random() < .4 ) {
				var randScale = getRandomInt(7, 12),
					randRotation = getRandomInt(0,50);

				e.animate({fill: page.randomColour(), transform: 's'+randScale+','+randScale+', r'+randRotation }, 5000, '<>');
			}
		});
	},2000);

});
