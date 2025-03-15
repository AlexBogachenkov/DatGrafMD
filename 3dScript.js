// matricas masīva izveidosana
const fieldSize = 60;
const array = [];
for (let i = 0; i < fieldSize; i++) {
    const innerArray = [];
    for (let j = 0; j < fieldSize; j++) {
        innerArray.push(false);
    }
    array.push(innerArray);
}

// linijas zīmēšana
function drawLine(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let sx = x0 < x1 ? 1 : -1;
    let dy = -Math.abs(y1 - y0);
    let sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    let e2;

    while (true) {
        array[y0][x0] = true;
        if (x0 === x1 && y0 === y1) {
            break;
        }
        e2 = 2 * err;
        if (e2 >= dy) {
            err += dy;
            x0 += sx;
        }
        if (e2 <= dx) {
            err += dx;
            y0 += sy;
        }
    }
}

const points = [
    [25, 5], [45, 10],
    [55, 30], [35, 55],
    [15, 50], [5, 30]
];

for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    drawLine(x0, y0, x1, y1);
}

// matricas kolonnu numurēšana
const colNumTable = document.getElementById("colNumTable");
const colNumRow = document.createElement("tr");
for (let i = 0; i < fieldSize; i++) {
    const td = document.createElement("td");
    td.textContent = i;
    colNumRow.appendChild(td);
}
colNumTable.appendChild(colNumRow);

// matricas rindiņu numurēšana
const rowNumTable = document.getElementById("rowNumTable");
for (let i = 0; i < fieldSize; i++) {
    const rowNumRow = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = i;
    rowNumRow.appendChild(td);
    rowNumTable.appendChild(rowNumRow);
}

const table = document.getElementById("matrix");
drawMatrix();

// daudzstūra augšējās un apakšējās līnijas noteikšana
let polygonTopLine = points[0][1];
let polygonBottomLine = points[0][1];
points.forEach(point => {
    if (point[1] < polygonTopLine) {
        polygonTopLine = point[1];
    }
    if (point[1] > polygonBottomLine) {
        polygonBottomLine = point[1];
    }
})

// daudzstūra tukšo (neaizpildīto) nogriežņu noteikšana un aizpildīšana
for (let y = polygonTopLine; y <= polygonBottomLine; y++) {
    const intersectionsWithX = [];
    let isPreviousPointFilled = false;
    let hasSectionStarted = false;
    let sectionStart = -1;
    for (let x = 0; x < fieldSize; x++) {
        if (!array[y][x] && isPreviousPointFilled) {
            hasSectionStarted = true;
            sectionStart = x-1;
        }
        if (array[y][x] && !isPreviousPointFilled && hasSectionStarted) {
            intersectionsWithX.push(sectionStart, x);
            hasSectionStarted = false;
            sectionStart = -1;
        }
        if (array[y][x]) {
            isPreviousPointFilled = true;
        } else {
            isPreviousPointFilled = false;
        }
    }
    for (let i = 0; i < intersectionsWithX.length; i+=2) {
        for (let x = intersectionsWithX[i]; x <= intersectionsWithX[i+1]; x++) {
            array[y][x] = true;
        }
    }
}

drawMatrix();

// matricas zīmēšana
function drawMatrix() {
    let rowCount = table.rows.length;
    let tableHeaderRowCount = 1;
    for (let i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }

    array.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(value => {
            const td = document.createElement("td");
            td.style.backgroundColor = value ? "#a12e2e" : "#ffffff";
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}