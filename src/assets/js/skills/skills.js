(() => {

    'use strict';

    var canvas  = document.getElementById("canvas");
    var ctx     = canvas.getContext("2d");
    var quart   = Math.PI / 2;
    var PI2     = Math.PI * 2;
    var percent = 0;

    ctx.lineWidth = 6;
    ctx.font = "20px verdana";

    var guages = [];
    guages.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: (canvas.width / 2) - (ctx.lineWidth / 2),
        start: 0,
        end: 100,
        color: "#222"
    });

//     guages.push({
//         x: 200,
//         y: 100,
//         radius: 40,
//         start: 0,
//         end: 90,
//         color: "green"
//     });
//     guages.push({
//         x: 50,
//         y: 225,
//         radius: 40,
//         start: 0,
//         end: 35,
//         color: "gold"
//     });
//     guages.push({
//         x: 200,
//         y: 225,
//         radius: 40,
//         start: 0,
//         end: 55,
//         color: "purple"
//     });

    function drawAll(percent) {

        // clear the canvas

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw all the guages

        for (var i = 0; i < guages.length; i++) {
            render(guages[i], percent);
        }

    }

    function render(guage, percent) {
        var pct = percent / 100;
        var extent = parseInt((guage.end - guage.start) * pct);
        var current = (guage.end - guage.start) / 100 * PI2 * pct - quart;
        ctx.beginPath();
        ctx.arc(guage.x, guage.y, guage.radius, -quart, current);
        ctx.strokeStyle = guage.color;
        ctx.stroke();
        ctx.fillStyle = guage.color;
        ctx.fillText(extent + '%', 50, 80);
    }


    function animate() {

        // if the animation is not 100% then request another frame

        if (percent < 100) {
            requestAnimationFrame(animate);
        }

        // redraw all guages with the current percent

        drawAll(percent);

        // increase percent for the next frame

        percent += 1;

    }

    animate();

})();