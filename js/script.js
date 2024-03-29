(function () {
    var unit = 100
        , canvas, context, canvas2, context2, height, width, xAxis, yAxis, draw;
    /**
     * Init function.
     *
     * Initialize variables and begin the animation.
     */
    function init() {
        canvas = document.getElementById("canvas");
        canvas.width = 800;
        canvas.height = 300;
        context = canvas.getContext("2d");
        context.font = '18px sans-serif';
        context.strokeStyle = '#000';
        context.lineJoin = 'round';
        height = canvas.height;
        width = canvas.width;
        xAxis = Math.floor(height / 2);
        yAxis = Math.floor(width / 4);
        context.save();
        draw();
    }
    /**
     * Draw animation function.
     *
     * This function draws one frame of the animation, waits 20ms, and then calls
     * itself again.
     */
    draw = function () {
        // Clear the canvas
        context.clearRect(0, 0, width, height);
        // Draw the axes in their own path
        context.beginPath();
        drawAxes();
        context.stroke();
        // Set styles for animated graphics
        context.save();
        context.strokeStyle = '#00f';
        context.fillStyle = '#fff';
        context.lineWidth = 2;
        // Draw the sine curve at time draw.t.
        context.beginPath();
        drawSine(draw.t);
        drawCose(draw.t);
        context.stroke();
        // Restore original styles
        context.restore();
        // Draw the xAxis PI tick and the time
        context.fillText("½π", xAxis + 59 + 3 * unit, 18 + xAxis);
        // Update the time and draw again
        draw.seconds = draw.seconds - .007;
        draw.t = draw.seconds * Math.PI;
        setTimeout(draw, 35);
    };
    draw.seconds = 0;
    draw.t = 0;
    /**
     * Function to draw axes
     */
    function drawAxes() {
        // Draw X and Y axes
        context.moveTo(0, xAxis);
        context.lineTo(width, xAxis);
        context.moveTo(yAxis, 0);
        context.lineTo(yAxis, height);
        // Draw X axis tick at PI
        context.moveTo(yAxis + Math.PI * unit, xAxis + 5);
        context.lineTo(yAxis + Math.PI * unit, xAxis - 5);
    }
    /**
     * Function to draw sine
     *
     * The sine curve is drawn in 10px segments starting at the origin.
     */
    function drawSine(t) {
        // Set the initial x and y, starting at 0,0 and translating to the origin on
        // the canvas.
        var x = t;
        var y = Math.sin(x);
        context.moveTo(0, unit * y + xAxis);
        // Loop to draw segments
        for (i = 0; i <= width; i += 10) {
            x = t + (-yAxis + i) / unit;
            y = Math.sin(x);
            context.lineTo(i, unit * y + xAxis);
        }
    }

    function drawCose(t) {
        // Set the initial x and y, starting at 0,0 and translating to the origin on
        // the canvas.
        var x = t;
        var y = Math.cos(x);
        context.moveTo(0, unit * y + xAxis);
        // Loop to draw segments
        for (i = 0; i <= width; i += 10) {
            x = t + (-yAxis + i) / unit;
            y = Math.cos(x);
            context.lineTo(i, unit * y + xAxis);
        }
    }
    /*
     * Function to draw circle
     */
    init()
})();
