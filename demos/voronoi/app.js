const points = [[100, 250], [200, 40], [360, 310]];
const scale = 1

let delaunay = []
let voronoi = []
let hull = []

let drawOptions = {
    hull: false,
    points: true,
    triangles: true,
    voronoi: true,
    circ: false
}

let htmlSelectors = {}

function setup() {
    let canvas = createCanvas(640, 480)
    canvas.parent('canvasContainer')

    htmlSelectors = {
        hull:       document.getElementById("hull"),
        points:     document.getElementById("points"),
        triangles:  document.getElementById("triangles"),
        voronoi:    document.getElementById("voronoi"),
        circ:       document.getElementById("circ")
    }

    generateDelaunay()
}

function addPoint(x, y) {
    points.push([x, y])
    generateDelaunay()
}

function generateDelaunay() {
    console.time('delaunay')
    delaunay = d3.Delaunay.from(points)
    voronoi = delaunay.voronoi([-960, -500, 960, 500]);
    hull = iterateHull(delaunay.hull, delaunay.hull.i, true)
    console.timeEnd('delaunay')
}

function iterateHull(hull, firstIndex, firstLoop = false, hullArray = []) {
    if (hull.i == firstIndex && !firstLoop) {
        return hullArray
    } else {
        hullArray.push(hull)
        return iterateHull(hull.next, firstIndex, false, hullArray)
    }
}

function getX(i) {
    return points[i][0] * scale
}
function getY(i) {
    return points[i][1] * scale
}

function draw() {
    clear();

    for (let s in htmlSelectors) {
        drawOptions[s] = htmlSelectors[s].checked
    }

    if (drawOptions.triangles) { drawTriangles() }
    if (drawOptions.points) { drawPoints() }
    if (drawOptions.hull) { drawHull() }
    if (drawOptions.voronoi) { drawPolygons() }
    if (drawOptions.circ) { drawCircumcenters() }
}

function drawTriangles() {
    const triangles = delaunay.triangles;
    setStyle(255, 0)

    for (var i = 0; i < triangles.length; i += 3) {
        var p0 = triangles[i];
        var p1 = triangles[i + 1];
        var p2 = triangles[i + 2];
        triangle(getX(p0), getY(p0), getX(p1), getY(p1), getX(p2), getY(p2));
    }
}

function drawPoints(){
    setStyle(0)
    for (let p = 0; p < points.length; p++) {
        ellipse(getX(p), getY(p), 10)
    }
}

function drawHull(){
    setStyle(null, color("red"))
    beginShape();
    for (let h of hull) {
        vertex(h.x, h.y)
    }
    endShape(CLOSE);
}

function drawCircumcenters() {
    const circ = voronoi.circumcenters;
    setStyle(color("blue"))
    for (var i = 0; i < circ.length; i += 2) {
        const x = circ[i]
        const y = circ[i + 1]
        ellipse(x, y, 6)
    }
}

function drawPolygons() {
    setStyle(null, color("green"))
    for (let poly of voronoi.cellPolygons()) {
        beginShape();
        for (let p of poly) {
            vertex(p[0], p[1]);
        }
        endShape(CLOSE);
    }
}

function mouseDragged() {
    if (!keyIsDown(SHIFT)) {
        for (let p = 0; p < points.length; p++) {
            let d = dist(mouseX, mouseY, getX(p), getY(p))

            if (d < 10) {
                points[p] = [mouseX, mouseY]
                generateDelaunay()
            }
        }
    }
}

function mouseClicked() {
    if (keyIsDown(SHIFT)) {
        addPoint(mouseX, mouseY)
    }
}

function setStyle(fillColor = null, strokeColor = null) {
    if (fillColor == null) {
        noFill();
    } else {
        fill(fillColor);
    }
    if (strokeColor == null) {
        noStroke();
    } else {
        stroke(strokeColor);
    }
}