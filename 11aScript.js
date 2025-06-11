const img = new Image();
img.src = "11a_image.jpg";

img.onload = () => {
    const canvasOriginal = document.getElementById("canvasOriginal");
    const ctxOriginal = canvasOriginal.getContext("2d");
    canvasOriginal.width = img.width;
    canvasOriginal.height = img.height;
    ctxOriginal.drawImage(img, 0, 0);
    const canvasThresholded = document.getElementById("canvasThresholded");
    const ctxThresholded = canvasThresholded.getContext("2d");
    canvasThresholded.width = img.width;
    canvasThresholded.height = img.height;
    ctxThresholded.drawImage(img, 0, 0);

    const imageData = ctxThresholded.getImageData(0, 0, canvasThresholded.width, canvasThresholded.height);
    const data = imageData.data;

    const histogramArr = new Array(256).fill(0);
    for (let i = 0; i < data.length; i += 4) {
        const grayShade = Math.round(0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2]);
        histogramArr[grayShade]++;
    }

    const leftPeak = histogramArr.indexOf(Math.max(...histogramArr.slice(0, 128)));
    const rightPeak = 128 + histogramArr.slice(128).indexOf(Math.max(...histogramArr.slice(128)));
    let min = Infinity;
    let threshold = 128;
    for (let i = leftPeak + 1; i < rightPeak; i++) {
        if (histogramArr[i] < min) {
            min = histogramArr[i];
            threshold = i;
        }
    }

    for (let i = 0; i < data.length; i += 4) {
        const grayShade = Math.round(0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2]);
        const value = (grayShade > threshold) ? 255 : 0;
        data[i] = value;
        data[i+1] = value;
        data[i+2] = value;
    }

    ctxThresholded.putImageData(imageData, 0, 0);
};