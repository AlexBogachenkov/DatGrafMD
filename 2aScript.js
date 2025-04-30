const originalCanvas = document.getElementById('original');
const processedCanvas = document.getElementById('processed');
const originalContext = originalCanvas.getContext('2d');
const processedContext = processedCanvas.getContext('2d');

const dimPx = 128;
let grayShadesPixels = [];

const img = new Image();
img.src = '2a_image.png';
img.onload = () => {
    originalContext.drawImage(img, 0, 0, dimPx, dimPx);
    const imgData = originalContext.getImageData(0, 0, dimPx, dimPx);
    for (let i = 0; i < dimPx; i++) {
        grayShadesPixels[i] = [];
        for (let j = 0; j < dimPx; j++) {
            const z = (i * dimPx + j) * 4;
            grayShadesPixels[i][j] = imgData.data[z];
        }
    }
};

function execDFT2D(input) {
    const result = [];
    for (let i = 0; i < dimPx; i++) {
        result[i] = [];
        for (let j = 0; j < dimPx; j++) {
            let re = 0, im = 0;
            for (let k = 0; k < dimPx; k++) {
                for (let l = 0; l < dimPx; l++) {
                    const angle = -2 * Math.PI * ((i * k + j * l) / dimPx);
                    const val = input[l][k];
                    re += val * Math.cos(angle);
                    im += val * Math.sin(angle);
                }
            }
            result[i][j] = { re, im };
        }
    }
    return result;
}

function execInvDFT2D(input) {
    const result = [];
    for (let i = 0; i < dimPx; i++) {
        result[i] = [];
        for (let j = 0; j < dimPx; j++) {
            let re = 0, im = 0;
            for (let k = 0; k < dimPx; k++) {
                for (let l = 0; l < dimPx; l++) {
                    const angle = 2 * Math.PI * ((k * i + l * j) / dimPx);
                    const freq = input[k][l];
                    re += freq.re * Math.cos(angle) - freq.im * Math.sin(angle);
                    im += freq.re * Math.sin(angle) + freq.im * Math.cos(angle);
                }
            }
            re /= dimPx * dimPx;
            result[i][j] = re;
        }
    }
    return result;
}

function drawGrayscale(ctx, data) {
    const imgData = ctx.createImageData(dimPx, dimPx);
    for (let i = 0; i < dimPx; i++) {
        for (let j = 0; j < dimPx; j++) {
            const val = Math.max(0, Math.min(255, data[j][i]));
            const k = (i * dimPx + j) * 4;
            imgData.data[k] = val;
            imgData.data[k + 1] = val;
            imgData.data[k + 2] = val;
            imgData.data[k + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

document.getElementById('execDFT').addEventListener('click', () => {
    const dftData = execDFT2D(grayShadesPixels);
    const restored = execInvDFT2D(dftData);
    drawGrayscale(processedContext, restored);
});