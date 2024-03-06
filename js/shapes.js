import { shapeColorWidget, shapefillColorWidget } from "./toolbox.js"
import { ldeDocument } from "./canvas-init.js";

export default function initShapes(canvas) {
    let addShapes = document.getElementsByClassName("shapes-btn")[0];
    addShapes.onclick = function () {
        document.querySelectorAll('.entity-tools').forEach(function (el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.shape-tools').forEach(function (el) {
            el.style.display = 'block';
        });
    }

    let addRect = document.getElementsByClassName("rect-btn")[0];
    addRect.onclick = function () {
        let rect = new fabric.Rect({
            width: ldeDocument.width / 2,
            height: ldeDocument.height / 4,
            originX: "center",
            originY: "center",
            left: ldeDocument.width / 2,
            top: ldeDocument.height / 2,
            strokeWidth: 1,
            strokeUniform: true,
            fill: document.getElementById("shape-fillcolor-btn").style.borderBottomColor,
            stroke: document.getElementById("shape-color-btn").style.borderBottomColor,
            transparentCorners: false,
            cornerSize: 10
        });
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
            stroke: document.getElementById("shape-color-btn").style.borderBottomColor,
            transparentCorners: false,
            cornerSize: 10
        });
        canvas.add(circle);
        canvas.setActiveObject(circle);
    }

    shapeColorWidget.on('change', (ev) => {
        document.getElementById("shape-color-btn").style.borderBottomColor = ev.hex;
        if (canvas.getActiveObject() && (canvas.getActiveObject().get('type') === "rect" || canvas.getActiveObject().get('type') === "circle")) {
            canvas.getActiveObject().set('stroke', ev.hex);
            canvas.renderAll();
        }
    })

    shapefillColorWidget.on('change', (ev) => {
        document.getElementById("shape-fillcolor-btn").style.borderBottomColor = ev.hex;
        if (canvas.getActiveObject() && (canvas.getActiveObject().get('type') === "rect" || canvas.getActiveObject().get('type') === "circle")) {
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
}