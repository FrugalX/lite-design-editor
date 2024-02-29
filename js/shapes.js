import { rectColorWidget, rectfillColorWidget } from "./toolbox.js"
import { ldeDocument } from "./canvas-utils.js";

export default function initRect(canvas) {
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
            fill: document.getElementById("rect-fillcolor-btn").style.borderBottomColor,
            stroke: document.getElementById("rect-color-btn").style.borderBottomColor,
            transparentCorners: false,
            cornerSize: 10
        });
        canvas.add(rect);
        canvas.setActiveObject(rect);
    }

    rectColorWidget.on('change', (ev) => {
        document.getElementById("rect-color-btn").style.borderBottomColor = ev.hex;
        if (canvas.getActiveObject() && canvas.getActiveObject().get('type') === "rect") {
            canvas.getActiveObject().set('stroke', ev.hex);
            canvas.renderAll();
        }
    })

    rectfillColorWidget.on('change', (ev) => {
        document.getElementById("rect-fillcolor-btn").style.borderBottomColor = ev.hex;
        if (canvas.getActiveObject() && canvas.getActiveObject().get('type') === "rect") {
            canvas.getActiveObject().set('fill', ev.hex);
            canvas.renderAll();
        }
    })

    // change text font size
    let strokeSize = document.getElementsByClassName("border-weight")[0];
    strokeSize.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('strokeWidth', parseInt(strokeSize.value));
            canvas.renderAll();
        }
    }
}