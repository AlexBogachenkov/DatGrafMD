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
const table = document.getElementById("matrix");

// linijas zīmēšana
function drawLine(x0, y0, x1, y1, cnt) {
    let dx = Math.abs(x1 - x0);
    let sx = x0 < x1 ? 1 : -1;
    let dy = -Math.abs(y1 - y0);
    let sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    let e2;

    while (true) {
        array[y0][x0] = true;
        sides[cnt][1].push([x0, y0]);
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
    [25, 35], [35, 5], [42, 25],
    [56, 30], [35, 57],
    [15, 50], [5, 25]
];

const sides = [];

for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    sides.push([[x0, y0, x1, y1],[]]);
    drawLine(x0, y0, x1, y1, i);
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

// katras malas minimalas(zemakas, tapec isteniba maksimalas) un maksimalas y vertibas atrasana
sides.forEach(side => {
    if (side[0][1] > side[0][3]) {
        side.push(side[0][1]);
        side.push(side[0][3]);
    } else {
        side.push(side[0][3]);
        side.push(side[0][1]);
    }
})

function getSidesThatStartAtY(y) {
    return sides.filter(side => side[2] === y);
}

function getSidesThatEndsAtY(y) {
    return sides.filter(side => side[3] === y);
}

// daudzstūra tukšo (neaizpildīto) nogriežņu noteikšana un aizpildīšana

let activeSides = getSidesThatStartAtY(polygonBottomLine);
const intersectionsWithX = [];
for (let y = polygonBottomLine - 1; y > polygonTopLine; y--) {
    getSidesThatStartAtY(y).forEach(side => activeSides.push(side));
    const sidesToEnd = getSidesThatEndsAtY(y);
    sidesToEnd.forEach(side => {
        const index = activeSides.indexOf(side);
        if (index > -1) {
            activeSides.splice(index, 1);
        }
    })
    intersectionsWithX.push([]);
    for (let i = 0; i < activeSides.length; i++) {
        intersectionsWithX[intersectionsWithX.length-1].push([]);
        activeSides[i][1].filter(point => point[1] === y)
            .sort((a, b) => {
                if (a[0] < b[0]) {
                    return -1;
                }
                if (a[0] > b[0]) {
                    return 1;
                }
                return 0;
            })
            .forEach(point => {
                intersectionsWithX[intersectionsWithX.length-1][i].push(point);
            });
    }
}

// punktu kārtošana
intersectionsWithX.forEach(intersection => {
    intersection.sort((a, b) => {
        if (a[0][0] < b[0][0]) {
            return -1;
        }
        if (a[0][0] > b[0][0]) {
            return 1;
        }
        return 0;
    });
});

// matricas aizpildīšana
intersectionsWithX.forEach(intersection => {
    for (let i = 0; i < intersection.length; i += 2) {
        const x0 = intersection[i][0][0];
        const l = intersection[i + 1].length;
        const x1 = intersection[i + 1][l-1][0];
        const y = intersection[i][0][1]
        for (let x = x0; x < x1; x++) {
            array[y][x] = true;
        }
    }
})

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