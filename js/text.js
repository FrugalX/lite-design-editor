import { textColorWidget, textbgColorWidget } from "./toolbox.js"
import { ldeDocument } from "./canvas-init.js";

export default function initText(canvas) {
    let addText = document.getElementsByClassName("add-text")[0];
    addText.onclick = function () {
        let text = new fabric.Textbox('Double click to edit text!', {
            fill: document.getElementById("text-color-btn").style.borderBottomColor,
            stroke: document.getElementById("text-color-btn").style.borderBottomColor,
            backgroundColor: document.getElementById("text-bgcolor-btn").style.borderBottomColor,
            textAlign: 'center',
            width: 200,
            lineHeight: 0.8,
            fontSize: 28,
            fontFamily: document.getElementsByClassName("font-family")[0].value,
            originX: "center",
            originY: "center",
            top: ldeDocument.height / 2,
            left: ldeDocument.width / 2,
            transparentCorners: false,
            cornerSize: 10
        });

        // Render the Text on Canvas
        canvas.add(text);
        canvas.setActiveObject(text);
    }

    // Change font family
    let fontType = document.getElementsByClassName("font-family")[0];
    fontType.onchange = function (e) {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('fontFamily', fontType.value);
            canvas.renderAll();
        }
    }

    // change text font size
    let fontSize = document.getElementsByClassName("font-size")[0];
    fontSize.onchange = function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('fontSize', fontSize.value);
            canvas.renderAll();
        }
    }
    let incFontSize = document.getElementsByClassName("inc-fontsize")[0];
    incFontSize.onclick = function () {
        let fontSize = document.getElementsByClassName("font-size")[0];
        fontSize.stepUp();
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('fontSize', fontSize.value);
            canvas.renderAll();
        }
    }
    let decFontSize = document.getElementsByClassName("dec-fontsize")[0];
    decFontSize.onclick = function () {
        let fontSize = document.getElementsByClassName("font-size")[0];
        fontSize.stepDown();
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('fontSize', fontSize.value);
            canvas.renderAll();
        }
    }

    // change text attributes
    let boldText = document.getElementsByClassName("bold-text")[0];
    boldText.onclick = function () {
        if (canvas.getActiveObject()) {
            if (canvas.getActiveObject().get('fontWeight') === 'normal')
                canvas.getActiveObject().set('fontWeight', 'bold');
            else
                canvas.getActiveObject().set('fontWeight', 'normal');
            canvas.renderAll();
        }
    }
    let ulText = document.getElementsByClassName("underline-text")[0];
    ulText.onclick = function () {
        if (canvas.getActiveObject()) {
            if (canvas.getActiveObject().get('underline') === true)
                canvas.getActiveObject().set('underline', false);
            else
                canvas.getActiveObject().set('underline', true);
            canvas.renderAll();
        }
    }
    let styleText = document.getElementsByClassName("italic-text")[0];
    styleText.onclick = function () {
        if (canvas.getActiveObject()) {
            if (canvas.getActiveObject().get('fontStyle') === 'italic')
                canvas.getActiveObject().set('fontStyle', 'normal');
            else
                canvas.getActiveObject().set('fontStyle', 'italic');
            canvas.renderAll();
        }
    }

    // Change text alignment
    let leftAlign = document.getElementsByClassName("left-align")[0];
    leftAlign.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('textAlign', 'left');
            canvas.renderAll();
        }
    }
    let centerAlign = document.getElementsByClassName("center-align")[0];
    centerAlign.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('textAlign', 'center');
            canvas.renderAll();
        }
    }
    let rightAlign = document.getElementsByClassName("right-align")[0];
    rightAlign.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('textAlign', 'right');
            canvas.renderAll();
        }
    }
    let justifyAlign = document.getElementsByClassName("justify-align")[0];
    justifyAlign.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set('textAlign', 'justify');
            canvas.renderAll();
        }
    }

    textColorWidget.on('change', (ev) => {
        document.getElementById("text-color-btn").style.borderBottomColor = ev.hex;
        if (canvas.getActiveObject() && canvas.getActiveObject().get('type') === "textbox") {
            canvas.getActiveObject().set('fill', ev.hex);
            canvas.getActiveObject().set('stroke', ev.hex);
            canvas.renderAll();
        }
    })

    textbgColorWidget.on('change', (ev) => {
        document.getElementById("text-bgcolor-btn").style.borderBottomColor = ev.hex;
        if (canvas.getActiveObject() && canvas.getActiveObject().get('type') === "textbox") {
            canvas.getActiveObject().set('backgroundColor', ev.hex);
            canvas.renderAll();
        }
    })
}