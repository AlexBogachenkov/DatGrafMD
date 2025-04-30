const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function convertWaveLengthToRGB(waveLength) {
    let R, G, B;
    if (waveLength >= 380 && waveLength < 440) {
        R = -(waveLength - 440) / (440 - 380);
        G = 0;
        B = 1;
    } else if (waveLength >= 440 && waveLength < 490) {
        R = 0;
        G = (waveLength - 440) / (490 - 440);
        B = 1;
    } else if (waveLength >= 490 && waveLength < 510) {
        R = 0;
        G = 1;
        B = -(waveLength - 510) / (510 - 490);
    } else if (waveLength >= 510 && waveLength < 580) {
        R = (waveLength - 510) / (580 - 510);
        G = 1;
        B = 0;
    } else if (waveLength >= 580 && waveLength < 645) {
        R = 1;
        G = -(waveLength - 645) / (645 - 580);
        B = 0;
    } else if (waveLength >= 645 && waveLength <= 750) {
        R = 1;
        G = 0;
        B = 0;
    } else {
        R = 0;
        G = 0;
        B = 0;
    }

    R = Math.round(R * 255);
    G = Math.round(G * 255);
    B = Math.round(B * 255);

    return `rgb(${R}, ${G}, ${B})`;
}

function drawRainbow() {
    const width = canvas.width;
    const height = canvas.height;
    for (let x = 0; x < width; x++) {
        const waveLength = 750 - (370 * x / width);
        const color = convertWaveLengthToRGB(waveLength);
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
    }
}

drawRainbow();