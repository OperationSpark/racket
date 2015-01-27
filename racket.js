/**
 * draw.js : Not optimally desgiend, but to assist in learning, a wrapper 
 * of the CreateJS Graphic API to reduce boiler-plate and that also supports
 * calculation of width and height properties on shapes.
 * 
 * For CreateJS Graphic API not wrapped by this version, use the Graphic API directly.
 * See: http://www.createjs.com/Docs/EaselJS/classes/Graphics.html
 *
 */
(function (window) {
    window.opspark = window.opspark || {};
    
    function sortNumbersAscending(a, b) { return a - b; }
    
    function sortNumbersDecending(a, b) { return b - a; }
    
    function randomIntBetween(min, max) { 
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
    var racket = {
        phusik: {
            addRandomVelocity: function (body, space, multiplierX, multiplierY) {
    			multiplierX = (multiplierX) ? multiplierX : .6;
    			multiplierY = (multiplierY) ? multiplierY : .5;
    			
    			var tx = randomIntBetween(0, space.width);
        		var ty = randomIntBetween(0, space.height);
    			var dx = Math.abs(tx - body.x);
                var dy = Math.abs(ty - body.y);
                var angle = Math.atan2(dy, dx);
                body.rotation = angle;
    
                var rotationalDirection = (Math.round(Math.random()) === 1) ? 1 : -1;
                body.rotationalVelocity = randomIntBetween(1, 3) * rotationalDirection;
                var forceX = Math.cos(angle) * (Math.random() * multiplierX);
                var forceY = Math.sin(angle) * (Math.random() * multiplierY);
    
                body.velocityX = (tx > body.x) ? forceX : -forceX;
                body.velocityY = (ty > body.y) ? forceY : -forceY;
    		},
    
    		updateDirectionalVelocity: function (body) {
    			body.x += body.velocityX;
    			body.y += body.velocityY;
    			body.rotation += body.rotationalVelocity;
    		}
        },
		
		num: {
		    randomIntBetween: randomIntBetween,
		    sortNumbersAscending: sortNumbersAscending,
		    sortNumbersDecending: sortNumbersDecending
		}
		
    };
    
	window.opspark.racket = racket;

}(window));