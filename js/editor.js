import initHeader from "./header.js"
import { initToolbar } from "./toolbox.js"
import initImage from "./image.js"
import initShapes from "./shapes.js"
import initText from "./text.js"
import configCanvas from "./canvas-init.js"

export default function editor(containerId, config, callback) {

    let container = document.getElementById(containerId);
    container.classList.add('editor');
    container.innerHTML = '<div id="header"></div>'
        + '<div class="toolboxContainer"><div id="toolbox"></div></div>'
        + '<div class="sliderContainer" style="text-align: left; margin-bottom:12px;">'
        + '<span style="font-size:12px; margin-top:-4px;">5%</span>'
        + '<input type="range" min="5" max="100" value="100" class="slider" id="sliderRange" style="min-width:200px;">'
        + '<span style="font-size:12px; margin-top:-4px;">100%</span>'
        + '</div>'
        + '<div class="canvasContainer"><div class="canvasWrapper"><canvas id="editorCanvas"></canvas></div></div>';

    initHeader(config);
    let canvas = new fabric.Canvas("editorCanvas", { preserveObjectStacking: true, backgroundColor: "#fff" });
    configCanvas(canvas, container, config, callback);
    initToolbar(canvas);
    initImage(canvas);
    initShapes(canvas);
    initText(canvas);
}