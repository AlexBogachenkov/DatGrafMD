const img = new Image();
img.src = "9a_image.jpg";

let canvas;
let ctx;
img.onload = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
};

function applyFilter(type) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const result = new Uint8ClampedArray(data.length);

    let maskArr;
    let factor = 1;
    if (type === "blur3") {
        maskArr = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ];
        factor = 9;
    } else if (type === "blur7") {
        maskArr = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        factor = 49;
    } else if (type === "sharpen3") {
        maskArr = [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0]
        ];
        factor = 1;
    } else if (type === "sharpen5") {
        maskArr = [
            [0, 0, -1, 0, 0],
            [0, -1, -2, -1, 0],
            [-1, -2, 18, -2, -1],
            [0, -1, -2, -1, 0],
            [0, 0, -1, 0, 0]
        ];
        factor = 2;
    }

    const offSet = Math.floor(maskArr.length / 2);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;
            for (let j = 0; j < maskArr.length; j++) {
                for (let i = 0; i < maskArr[0].length; i++) {
                    const xi = x + i - offSet;
                    const yj = y + j - offSet;

                    if (xi >= 0 && xi < width && yj >= 0 && yj < height) {
                        const index = (yj * width + xi) * 4;
                        const weight = maskArr[j][i];

                        r += data[index] * weight;
                        g += data[index + 1] * weight;
                        b += data[index + 2] * weight;
                    }
                }
            }

            const idx = (y * width + x) * 4;
            result[idx] = Math.min(255, Math.max(0, r / factor));
            result[idx + 1] = Math.min(255, Math.max(0, g / factor));
            result[idx + 2] = Math.min(255, Math.max(0, b / factor));
            result[idx + 3] = data[idx + 3];
        }
    }

    for (let i = 0; i < data.length; i++) {
        data[i] = result[i];
    }
    ctx.putImageData(imageData, 0, 0);
}