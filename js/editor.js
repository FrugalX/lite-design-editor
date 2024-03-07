import initHeader from "./header.js"
import { initToolbar } from "./toolbox.js"
import initImage from "./image.js"
import initShapes from "./shapes.js"
import initText from "./text.js"
import addResizeDialog from "./resize-dialog.js"
import configCanvas, { ldeDocument } from "./canvas-init.js"

export default function editor(containerId, config, callback) {

    let container = document.getElementById(containerId);
    container.classList.add('editor');
    container.innerHTML = '<div id="header"></div>'
        + '<div class="toolboxContainer"><div id="toolbox"></div></div>'
        + '<div class="one-more-bar">'
        + '<div id="sizeDisplay" style="float:left; padding: 2px 4px; color: #666; font-size: 13px; background-color: #ddd;"></div>'
        + '<div id="resize-btn" style="float:left; padding: 2px 8px; color: #666; font-size: 15px; cursor: pointer;">Resize</div>'
        + '<div id="canvas-bgcolor-btn" style="float:left; padding: 2px 8px; color: #666; font-size: 15px; cursor: pointer;">Background</div>'
        + '<div id="template-btn" style="float:left; padding: 2px 8px; color: #666; font-size: 15px; cursor: pointer;" title ="To be done">Template</div>'
        + '<div class="sliderContainer" style="float:right;">'
        + '<span style="font-size:12px; margin-top:-4px;">5%</span>'
        + '<input type="range" min="5" max="100" value="100" class="slider" id="sliderRange" style="min-width:200px;">'
        + '<span style="font-size:12px; margin-top:-4px;">100%</span>'
        + '</div>'
        + '</div>'
        + '<div style="clear:both;"></div>'
        + '<div class="grid-container">'
        + '<div class="main-content_large">'
        + '<div class="canvasContainer"><div class="canvasWrapper"><canvas id="editorCanvas"></canvas></div></div>'
        + '</div>'
        + '<div class="sidebar_small">'
        + '<button class="collapse-button">X</button>'
        + '</div>'
        + '</div>';

    // https://codepen.io/DeolaJ/pen/xvjbKY
    const sidebar = document.querySelector('.sidebar_small');
    const mainContent = document.querySelector('.main-content_large');
    document.querySelector('button').onclick = function () {
        sidebar.classList.remove('sidebar');
        mainContent.classList.remove('main-content');
        sidebar.classList.add('sidebar_small');
        mainContent.classList.add('main-content_large')
    }
    document.querySelector('#canvas-bgcolor-btn').onclick = function () {
        sidebar.classList.add('sidebar');
        mainContent.classList.add('main-content');
        sidebar.classList.remove('sidebar_small');
        mainContent.classList.remove('main-content_large')
    }
    document.querySelector('#template-btn').onclick = function () {
        sidebar.classList.add('sidebar');
        mainContent.classList.add('main-content');
        sidebar.classList.remove('sidebar_small');
        mainContent.classList.remove('main-content_large')
    }

    initHeader(config);
    let canvas = new fabric.Canvas("editorCanvas", { preserveObjectStacking: true, backgroundColor: "#fff" });
    initToolbar(canvas);
    configCanvas(canvas, container, config, callback);
    initImage(canvas);
    initShapes(canvas);
    initText(canvas);
    addResizeDialog(canvas);
}