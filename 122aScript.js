const img = new Image();
img.src = '122a_image.png';

let ctx;
let canvas;
img.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 356;
    canvas.height = 198;
    ctx.drawImage(img, 0, 0);
};

function execute() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const getPixel = (x, y) => {
        const i = (y * canvas.width + x) * 4;
        return data[i] < 128 && data[i + 1] < 128 && data[i + 2] < 128 && data[i + 3] > 0;
    };

    const setVisited = (x, y) => {
        const i = (y * canvas.width + x) * 4;
        data[i + 3] = 0;
    };

    const getNeighborPixels = (x, y) => {
        const neighborPixels = [];
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) {
                    continue;
                }
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < canvas.width && ny < canvas.height && getPixel(nx, ny)) {
                    neighborPixels.push({x: nx, y: ny});
                }
            }
        }
        return neighborPixels;
    };

    const findLines = () => {
        const lines = [];
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                if (!getPixel(x, y)) {
                    continue;
                }

                const neighborPixels = getNeighborPixels(x, y);
                if (neighborPixels.length <= 2) {
                    const line = [{x, y}];
                    setVisited(x, y);

                    let current = neighborPixels[0];
                    while (current) {
                        line.push(current);
                        setVisited(current.x, current.y);
                        const next = getNeighborPixels(current.x, current.y).filter(p => !line.some(q => q.x === p.x && q.y === p.y));
                        current = next.length === 1 ? next[0] : null;
                    }

                    if (neighborPixels.length === 2) {
                        current = neighborPixels[1];
                    } else {
                        current = undefined;
                    }

                    while (current) {
                        line.unshift(current);
                        setVisited(current.x, current.y);
                        const next = getNeighborPixels(current.x, current.y).filter(p => !line.some(q => q.x === p.x && q.y === p.y));
                        current = next.length === 1 ? next[0] : null;
                    }
                    lines.push(line);
                }
            }
        }
        return lines;
    };

    const lines = findLines();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const line of lines) {
        ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < line.length; i++) {
            const x = line[i].x;
            const y = line[i].y;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
}

