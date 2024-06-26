import { shapeColorWidget, shapefillColorWidget } from "./toolbox.js"
import { ldeDocument } from "./canvas-init.js";

let rectScaling = false;

export default function initShapes(canvas) {
    let addShapes = document.getElementsByClassName("shapes-btn")[0];
    addShapes.onclick = function () {
        document.querySelector('.toolbar-2').style.display = 'flex';
        document.querySelectorAll('.entity-tools').forEach(function (el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.shape-tools').forEach(function (el) {
            el.style.display = 'flex';
        });
    }

    let addRect = document.getElementsByClassName("rect-btn")[0];
    addRect.onclick = function () {
        let rect = new fabric.Rect({
            width: ldeDocument.width / 2,
            height: ldeDocument.height / 4,
            rx: 16,
            ry: 16,
            originX: "center",
            originY: "center",
            left: ldeDocument.width / 2,
            top: ldeDocument.height / 2,
            strokeWidth: 1,
            strokeUniform: true,
            fill: document.getElementById("shape-fillcolor-btn").style.borderBottomColor,
            stroke: document.getElementById("shape-color-btn").style.borderBottomColor
        });
        rect.on('scaling', function () {
            rectScaling = true;
        })
        rect.on('mouseup', function () {
            if (rectScaling === true) {
                rectScaling = false;
                this.set({
                    width: this.width * this.scaleX,
                    height: this.height * this.scaleY,
                    scaleX: 1,
                    scaleY: 1
                })
            }
        })

        canvas.add(rect);
        canvas.setActiveObject(rect);
    }

    let addCircle = document.getElementsByClassName("circle-btn")[0];
    addCircle.onclick = function () {
        let circle = new fabric.Circle({
            radius: ldeDocument.width / 8,
            originX: "center",
            originY: "center",
            left: ldeDocument.width / 2,
            top: ldeDocument.height / 2,
            strokeWidth: 1,
            strokeUniform: true,
            fill: document.getElementById("shape-fillcolor-btn").style.borderBottomColor,
            stroke: document.getElementById("shape-color-btn").style.borderBottomColor
        });
        canvas.add(circle);
        canvas.setActiveObject(circle);
    }

    // https://github.com/fabricjs/fabric.js/issues/2437
    const getPolygon = (size, radius, numVertexes) => {
        var interiorAngle = 360 / numVertexes;
        var rotationAdjustment = 0;
        if (numVertexes % 2 == 0) {
            rotationAdjustment = interiorAngle / 2;
        }

        var d = [];
        for (var i = 0; i < numVertexes; i++) {
            var coord = polarToCartesian(size, size, radius, i * interiorAngle + rotationAdjustment);
            d.push(coord)
        }
        return d
    }

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        // This function converts polar coordinates to cartesian coordinates
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    let addHexagon = document.getElementsByClassName("hexagon-btn")[0];
    addHexagon.onclick = function () {
        let hexagon = new fabric.Polygon(getPolygon(100, ldeDocument.width / 8, 6),
            {
                originX: "center",
                originY: "center",
                left: ldeDocument.width / 2,
                top: ldeDocument.height / 2,
                strokeLineJoin: 'bevil',
                fill: document.getElementById("shape-fillcolor-btn").style.borderBottomColor,
                stroke: document.getElementById("shape-color-btn").style.borderBottomColor
            });
        canvas.add(hexagon);
        canvas.setActiveObject(hexagon);
        canvas.renderAll();
    }

    let addTriangle = document.getElementsByClassName("triangle-btn")[0];
    addTriangle.onclick = function () {
        let triangle = new fabric.Polygon(getPolygon(100, ldeDocument.width / 8, 3),
            {
                originX: "center",
                originY: "center",
                left: ldeDocument.width / 2,
                top: ldeDocument.height / 2,
                strokeLineJoin: 'bevil',
                fill: document.getElementById("shape-fillcolor-btn").style.borderBottomColor,
                stroke: document.getElementById("shape-color-btn").style.borderBottomColor
            });
        canvas.add(triangle);
        canvas.setActiveObject(triangle);
        canvas.renderAll();
    }


    let addLine = document.getElementsByClassName("line-btn")[0];
    addLine.onclick = function () {
        let line = new fabric.Line([ldeDocument.width * 0.3, ldeDocument.height * 0.7, ldeDocument.width * 0.7, ldeDocument.height * 0.3],
            {
                originX: "center",
                originY: "center",
                strokeWidth: 1,
                fill: document.getElementById("shape-fillcolor-btn").style.borderBottomColor,
                stroke: document.getElementById("shape-color-btn").style.borderBottomColor
            });
        canvas.add(line);
        canvas.setActiveObject(line);
        canvas.renderAll();
    }

    let addHorzLine = document.getElementsByClassName("horz-line-btn")[0];
    addHorzLine.onclick = function () {
        let line = new fabric.Line([ldeDocument.width * 0.3, ldeDocument.height * 0.5, ldeDocument.width * 0.7, ldeDocument.height * 0.5],
            {
                originX: "center",
                originY: "center",
                strokeWidth: 1,
                fill: document.getElementById("shape-fillcolor-btn").style.borderBottomColor,
                stroke: document.getElementById("shape-color-btn").style.borderBottomColor
            });
        line.setControlsVisibility({
            bl: false,
            br: false,
            mb: false,
            mt: false,
            tl: false,
            tr: false,
            mtr: false
        });
        canvas.add(line);
        canvas.setActiveObject(line);
        canvas.renderAll();
    }

    let addVertLine = document.getElementsByClassName("vert-line-btn")[0];
    addVertLine.onclick = function () {
        let line = new fabric.Line([ldeDocument.width * 0.5, ldeDocument.height * 0.3, ldeDocument.width * 0.5, ldeDocument.height * 0.7],
            {
                originX: "center",
                originY: "center",
                strokeWidth: 1,
                fill: document.getElementById("shape-fillcolor-btn").style.borderBottomColor,
                stroke: document.getElementById("shape-color-btn").style.borderBottomColor
            });
        line.setControlsVisibility({
            bl: false,
            br: false,
            ml: false,
            mr: false,
            tl: false,
            tr: false,
            mtr: false
        });
        canvas.add(line);
        canvas.setActiveObject(line);
        canvas.renderAll();
    }

    shapeColorWidget.on('change', (ev) => {
        document.getElementById("shape-color-btn").style.borderBottomColor = ev.hex;
        if (canvas.getActiveObject() &&
            (
                canvas.getActiveObject().get('type') === "rect" ||
                canvas.getActiveObject().get('type') === "circle" ||
                canvas.getActiveObject().get('type') === "polygon" ||
                canvas.getActiveObject().get('type') === "line"
            )) {
            canvas.getActiveObject().set('stroke', ev.hex);
            canvas.renderAll();
        }
    })

    shapefillColorWidget.on('change', (ev) => {
        document.getElementById("shape-fillcolor-btn").style.borderBottomColor = ev.hex;
        if (canvas.getActiveObject() &&
            (
                canvas.getActiveObject().get('type') === "rect" ||
                canvas.getActiveObject().get('type') === "circle" ||
                canvas.getActiveObject().get('type') === "polygon" ||
                canvas.getActiveObject().get('type') === "line"
            )) {
            canvas.getActiveObject().set('fill', ev.hex);
            canvas.renderAll();
        }
    })

    // change shape stroke size
    let strokeSize = document.getElementsByClassName("border-weight")[0];
    strokeSize.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('strokeWidth', parseInt(strokeSize.value));
            canvas.renderAll();
        }
    }

    // change rect radius
    let shapeRadius = document.getElementsByClassName("border-radius")[0];
    shapeRadius.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('rx', parseInt(shapeRadius.value));
            canvas.getActiveObject().set('ry', parseInt(shapeRadius.value));
            canvas.renderAll();
        }
    }
}