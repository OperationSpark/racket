(function (window) {
    window.opspark = window.opspark || {};
    
    function sortNumbersAscending(a, b) { return a - b; }
    
    function sortNumbersDecending(a, b) { return b - a; }
    
    function randomIntBetween(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    var racket = {
        physikz: {
            addRandomVelocity: function (body, area, multiplierX, multiplierY) {
                multiplierX = (multiplierX) ? multiplierX : .6;
                multiplierY = (multiplierY) ? multiplierY : .5;
                
                var tx = randomIntBetween(0, area.width);
                var ty = randomIntBetween(0, area.height);
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
            
            updatePosition: function (body) {
                body.x += body.velocityX;
                body.y += body.velocityY;
                body.rotation += body.rotationalVelocity;
            },
            
            updateRadialPositionInArea: function (body, area) {
                var radius = body.radius;
                var w  = area.width + radius * 2;
                var h = area.height + radius * 2;
                
                body.x = (body.x + radius + body.velocityX + w) % w - radius;
                body.y = (body.y + radius + body.velocityY + h) % h - radius;
                body.rotation += body.rotationalVelocity;
            },
            
            updateRadialPositionAndReboundInArea: function (body, area) {
                var radius = body.radius;
                var top:Number = 0;
                var left:Number = 0;
                var right:Number = area.width;
                var bottom:Number = area.height;
                
                body.x += body.velocityX;
                body.y += body.velocityY;
                body.rotation += body.rotationalVelocity;
                
                if (body.x + radius > right) {
                    body.x = right - radius;
                    body.velocityX *= -1;
                    
                } else if (body.x - radius < left) {
                    body.x = left + radius;
                    body.velocityX *= -1;
                }
                
                if (body.y + radius > bottom) {
                    body.y = bottom - radius;
                    body.velocityY *= -1;
                } else if (body.y - radius < top) {
                    body.y = top + radius;
                    body.velocityY *= -1;
                }
            }
        },
        
        makeBody: function (velocityX, velocityY, rotationalVelocity, density, integrity) {
            return {
                velocityX: velocityX || 0,
                velocityY: velocityY || 0,
                rotationalVelocity: rotationalVelocity || 0,
                density: density || 1,
                integrity: integrity || 1
            };
        },
        
        num: {
            randomIntBetween: randomIntBetween,
            sortNumbersAscending: sortNumbersAscending,
            sortNumbersDecending: sortNumbersDecending
        }
    };
    window.opspark.racket = racket;
}(window));