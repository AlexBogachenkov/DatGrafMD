const img = new Image();
img.src = "9a_image.jpg";

img.onload = function () {
    const canvasOriginal = document.getElementById("canvasOriginal");
    const ctxOriginal = canvasOriginal.getContext("2d");
    canvasOriginal.width = img.width;
    canvasOriginal.height = img.height;
    ctxOriginal.drawImage(img, 0, 0);
    const canvasContrast = document.getElementById("canvasContrast");
    const ctxContrast = canvasContrast.getContext("2d");
    canvasContrast.width = img.width;
    canvasContrast.height = img.height;
    ctxContrast.drawImage(img, 0, 0);

    const contrastCoefficient = 1.5;
    const imageData = ctxContrast.getImageData(0, 0, canvasContrast.width, canvasContrast.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
            let r = data[i + j] / 255;
            r = contrastCoefficient * (r - 0.5) + 0.5;
            r = Math.min(1, Math.max(0, r));
            data[i + j] = Math.round(r * 255);
        }
    }
    ctxContrast.putImageData(imageData, 0, 0);
};