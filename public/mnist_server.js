const originalSize = 256;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 25;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';


let drawing = [[]]
let mouseIsDown = false;

canvas.addEventListener("mousemove", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if (mouseIsDown) {
        drawing[drawing.length - 1].push({x, y});
        draw();
    }
});

window.addEventListener("mousedown", () => {
    mouseIsDown = true;
});

window.addEventListener("mouseup", () => {
    if (drawing[drawing.length - 1].length > 0) {
        drawing.push([])
    }
    mouseIsDown = false;
})

function draw() {
    drawing.forEach(stroke => {
        if (stroke.length > 0) {
            drawPoints(ctx, stroke)
        }
    });
}

function clear() {
    drawing = [[]];
    ctx.clearRect(0, 0, 256, 256)
}

const button = document.getElementById('classify_button');
button.onclick = () => classify();

const button2 = document.getElementById('clear_button');
button2.onclick = () => clear(); 

const classification = document.getElementById('classification');

function classify() {
    const normalizedContext = normalize(ctx);
    let pixelArray = getGreyScalePixelArray(normalizedContext);

    pixelArray = Array.from(pixelArray);

    postJsonData('/mnist/server', { data: pixelArray })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            classification.innerHTML = `Classification: label= ${data.label}, probability= ${data.probability}`
        })
        .catch((error) => {
            console.error('Error:', error);
            classification.innerHTML = 'Error occured!'
        });;
}

function getPixelArray(ctx) {
    const height = ctx.canvas.height;
    const width = ctx.canvas.width;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    return pixels;
}

function getGreyScalePixelArray(ctx) {
    const pixels = getPixelArray(ctx);

    const greyScalePixels  = pixels.filter((_, i) => (i + 1) % 4 === 0);
    return greyScalePixels;
}

function getMinBoundBox(ctx) {
    const height = ctx.canvas.height;
    const width = ctx.canvas.width;

    const pixelArray = getGreyScalePixelArray(ctx);
    const pixelMatrix = chunkArray(pixelArray, width);

    let minY = Infinity;
    let minX = Infinity;
    let maxY = -Infinity;
    let maxX = -Infinity;


    for (let y = 0; y < height; y++) {
        for (let x = 0; x < height; x++) {
            const pixel = pixelMatrix[y][x];
            if (pixel > 0) {
                if (minX > x) {
                    minX = x;
                }
                if (minY > y) {
                    minY = y;
                }
                if (maxX < x) {
                    maxX = x;
                }
                if (maxY < y) {
                    maxY = y;
                }
            } 
        }
    } 

    return { minPoint: { x: minX, y: minY }, maxPoint: { x: maxX, y: maxY } };
}

function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    let index = 0;
    while (index < array.length) {
        chunkedArray.push(array.slice(index, chunkSize + index));
        index += chunkSize;
    }
    return chunkedArray;
} 

function getPixelMatrix(ctx) {
    const width = ctx.canvas.width;

    const pixelArray = getGreyScalePixelArray(ctx);
    const pixelMatrix = chunkArray(pixelArray, width);

    return pixelMatrix;
}

function normalize(ctx) {
    const boundBox = getMinBoundBox(ctx);

    const boundBoxHeight = boundBox.maxPoint.y - boundBox.minPoint.y;
    const boundBoxWidth = boundBox.maxPoint.x - boundBox.minPoint.x;

    x = boundBoxHeight > boundBoxWidth ? boundBoxHeight : boundBoxWidth;

    const normalizedCanvas = document.createElement("canvas");
    normalizedCanvas.width = 20;
    normalizedCanvas.height = 20;
    const context = normalizedCanvas.getContext("2d");

    context.drawImage(ctx.canvas, boundBox.minPoint.x, boundBox.minPoint.y, x, x, 0, 0, 20, 20)

    // document.getElementById('p').appendChild(normalizedCanvas);

    pm = getPixelMatrix(context);

    const centerOfMass = getCenterOfMass(pm);

    const normalizedCanvas2 = document.createElement("canvas");
    // normalizedCanvas2.style.background = 'red';
    normalizedCanvas2.width = 28;
    normalizedCanvas2.height = 28;
    const normalizedContext = normalizedCanvas2.getContext("2d");

    const halfSize = 28 / 2;

    normalizedContext.drawImage(normalizedCanvas, halfSize - centerOfMass.x, halfSize - centerOfMass.y);
    // document.getElementById('p').appendChild(normalizedCanvas2);
    return normalizedContext;
}

function getCenterOfMass(pixelMatrix) {
    let numPixels = 0;
    let sumX = 0;
    let sumY = 0;
    pixelMatrix.forEach((ys, y) => {
        ys.forEach((pixel, x) => {
            const weight = (pixel / 255)
            sumX += (x * weight);
            sumY += (y * weight);
            numPixels += weight;
        })
    })

    const x = sumX / numPixels;
    const y = sumY / numPixels;

    return { x, y };
}

function drawPoints(ctx, points) {
    // draw a basic circle instead
    if (points.length < 6) {
        const b = points[0];
        ctx.beginPath();
        ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0);
        ctx.closePath(); 
        ctx.fill();
        return
    }
    ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);
    // draw a bunch of quadratics, using the average of two points as the control point
    for (i = 1; i < points.length - 2; i++) {
        const c = (points[i].x + points[i + 1].x) / 2;
        const d = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)
    }
    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    ctx.stroke();
}




function postJsonData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

function main() {
    console.log("loaded", Date.now())
    //const button = document.getElementById("send");
    //button.onclick = () => sendData();
}

window.onload = main();
