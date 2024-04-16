import initHeader from "./header.js"
import { initToolbar } from "./toolbox.js"
import initImage from "./image.js"
import initShapes from "./shapes.js"
import initText from "./text.js"
import addResizeDialog from "./resize-dialog.js"
import configCanvas, { renderFabricJson } from "./canvas-init.js"
import { bgGradients } from "./gradients.js"
import { templates } from "../templates/templates.js"
export default function editor(containerId, config, callback) {

    let container = document.getElementById(containerId);
    container.classList.add('editor');
    container.innerHTML =
        '<div id="header"></div>'
        +   `<div class="toolboxContainer">
                <!--div style="font-size:12px; color:blue; text-align:center; padding-bottom:2px;"><b>New!</b> UI updates</div-->
                <div class="toolbox toolbar-1"></div>
                <div class="toolbox toolbar-2" style="display: none;"></div>
            </div>`

        + '<div class="one-more-bar">'
        + '<div id="sizeDisplay" style="float:left; padding: 2px 4px; color: #666; font-size: 13px; background-color: #ddd;"></div>'
        + '<div id="resize-btn" style="float:left; padding: 2px 8px; color: #444; font-size: 14px; cursor: pointer;">Resize</div>'
        + `
        <div class="zoom-value-container">
        <div class="zoom-value">100%</div>
        </div>
        `        
        + '<div class="sliderContainer" style="float:right;">'       
        + '<input type="range" min="5" max="100" value="100" class="slider" id="sliderRange">'
        + '</div>'

        + '</div>'
        + '<div style="clear:both;"></div>'

        + '<div class="grid-container">'
        + '<div class="main-content_large">'
        + '<div class="canvasContainer">'
        + '<div class="canvasWrapper"><canvas id="editorCanvas"></canvas></div></div>'
        + '</div>'
        + '<div class="sidebar_small">'
        + '<div style="min-height:40px;" class="collapse-button-container"><button class="collapse-button">X</button></div>'
        + '<div id="sidebar-content"><div id="template-content"></div><div id="bg-content"></div></div>'
        + '</div>'

        + '</div>';

    // https://codepen.io/DeolaJ/pen/xvjbKY
    const sidebar = document.querySelector('.sidebar_small');
    const mainContent = document.querySelector('.main-content_large');
    document.querySelector('.collapse-button').onclick = function (e) {
        sidebar.classList.remove('sidebar');
        e.target.style.display = 'none';
        mainContent.classList.remove('main-content');
        sidebar.classList.add('sidebar_small');
        mainContent.classList.add('main-content_large');
    }


    initHeader(config);
    let canvas = new fabric.Canvas("editorCanvas", { preserveObjectStacking: true, backgroundColor: "#fff" });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.borderColor = 'blue';
    fabric.Object.prototype.cornerColor = 'white';
    fabric.Object.prototype.cornerStrokeColor = 'darkgray';
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.cornerSize = 10;
    initToolbar(canvas);
    configCanvas(canvas, container, config, callback);
    initImage(canvas);
    initShapes(canvas);
    initText(canvas);
    addResizeDialog(canvas);

    document.querySelector('#canvas-bgcolor-btn').onclick = function () {
        sidebar.classList.add('sidebar');
        document.querySelector('.collapse-button').style.display = 'block';
        mainContent.classList.add('main-content');
        sidebar.classList.remove('sidebar_small');
        mainContent.classList.remove('main-content_large');

        document.querySelector('#template-content').style.display = 'none';
        let bgContent = document.querySelector('#bg-content');
        bgContent.style.display = 'block';
        if (bgContent.childElementCount < 1) {
            for (let i = 0; i < bgGradients.length; i++) {
                let elemI = document.createElement('div');
                elemI.style.margin = '0.25rem';
                elemI.style.aspectRatio = '4 / 3';
                elemI.style.backgroundColor = '#eee';
                elemI.style.borderRadius = '3px';
                elemI.style.backgroundImage = bgGradients[i].css;
                elemI.setAttribute('data-gradient', i);
                let elemO = document.createElement('div');
                elemO.style.width = '50%';
                elemO.style.aspectRatio = '4 / 3';
                elemO.style.float = 'left';
                elemO.appendChild(elemI);
                bgContent.appendChild(elemO);

                elemI.onclick = function (e) {
                    let index = e.target.getAttribute('data-gradient');
                    const clone = structuredClone(bgGradients[index].fabric);
                    clone.coords.x1 = bgGradients[index].fabric.coords.x1 * canvas.width;
                    clone.coords.x2 = bgGradients[index].fabric.coords.x2 * canvas.width;
                    clone.coords.y1 = bgGradients[index].fabric.coords.y1 * canvas.height;
                    clone.coords.y2 = bgGradients[index].fabric.coords.y2 * canvas.height;
                    var grad = new fabric.Gradient(clone);
                    canvas.backgroundGradient = clone;
                    canvas.backgroundColor = grad.toLive(canvas.contextContainer);
                    canvas.renderAll();
                }
            }
        }
    }
    document.querySelector('.template-btn').onclick = function () {
        sidebar.classList.add('sidebar');
        document.querySelector('.collapse-button').style.display = 'block';
        mainContent.classList.add('main-content');
        sidebar.classList.remove('sidebar_small');
        mainContent.classList.remove('main-content_large');

        document.querySelector('#bg-content').style.display = 'none';
        let templateContent = document.querySelector('#template-content');
        templateContent.style.display = 'block';
        if (templateContent.childElementCount < 1) {
            for (let i = 0; i < templates.length; i++) {
                let elemI = document.createElement('img');
                elemI.style.borderRadius = '3px';
                elemI.style.width = '100%';
                elemI.src = templates[i].thumbnail;
                elemI.setAttribute('data-template', templates[i].template);
                let elemO = document.createElement('div');
                elemO.style.width = '100%';
                elemO.style.float = 'left';
                elemO.style.padding = '0.25rem';
                elemO.appendChild(elemI);
                templateContent.appendChild(elemO);

                elemI.onclick = async function (e) {
                    let template = e.target.getAttribute('data-template');
                    try {
                        const response = await fetch(template, {
                            headers: {
                                Accept: 'application/json',
                            },
                        });
                        const json = await response.json();
                        console.log(json);
                        renderFabricJson(canvas, json);
                    } catch (error) {
                        console.error('Error fetching json file:', error);
                    }
                }
            }
        }
    }
}