const scale = 10; // Scale factor for better visualization: 1 unit = 10 pixels
const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector('#rangeInput');
const rangeValueDiv = document.querySelector('#rangeValue');
const ctx = canvas.getContext("2d");

// The given Recaman sequence, scaled by the factor for visualization purposes
const sequence = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62,
    42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78, 38,
    79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29, 88, 28, 89, 27, 90, 26, 91
].map(item => item * scale);

/**
 * Draws a static number line on the canvas.
 * The number line spans the entire width of the canvas, centered vertically.
 * Ticks are drawn at every unit, with labels at every fifth unit.
 */
const drawNumberLine = () => {
    // Draw the main horizontal line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
    // Draw ticks and numbers along the line
    for (let i = 0; i <= canvas.width; i += scale) {
        ctx.beginPath();
        ctx.moveTo(i, canvas.height / 2 - 5);
        ctx.lineTo(i, canvas.height / 2 + 5);
        ctx.stroke();
        
        // Label every 5 units
        if (i % (scale * 5) === 0) {
            ctx.fillText(i / scale, i, canvas.height / 2 + 15);
        }
    }
};

/**
 * Draws the Recaman sequence arcs on the canvas up to the given limit.
 * The sequence is visualized using arcs that either open upward or downward alternately.
 * 
 * @param {number} limit - The index up to which the Recaman sequence is drawn.
 */
const drawRecaman = (limit) => {
    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw the number line
    drawNumberLine();
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    // Draw arcs for each step in the Recaman sequence
    for (let i = 1; i <= limit; i++) {
        const current = sequence[i - 1];
        const next = sequence[i];
        const radius = Math.abs(next - current) / 2;
        const centerX = (current + next) / 2;
        const centerY = canvas.height / 2;
        
        // Alternate the direction of the arcs
        if (i % 2 === 0) {
            ctx.arc(centerX, centerY, radius, 0, Math.PI, true); // Upward arc
        } else {
            ctx.arc(centerX, centerY, radius, 0, Math.PI, false); // Downward arc
        }
    }
    ctx.stroke();
};

/**
 * Handles the input change event for the range slider.
 * Updates the displayed value and redraws the Recaman sequence based on the slider value.
 * 
 * @param {number} value - The current value of the range slider.
 */
const onInputChangeHandler = (value) => {
    rangeValueDiv.innerText = value;
    drawRecaman(value);
};

// Event listener for the range slider input
rangeInput.addEventListener('input', e => onInputChangeHandler(e.target.value));

// Initial draw when the page loads
drawNumberLine();
drawRecaman(rangeInput.value);
