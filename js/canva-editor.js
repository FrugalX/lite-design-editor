import initHeader from "./canva-header.js"
import { initToolbar } from "./canva-toolbox.js"
//import initImage from "./image.js"
//import initShapes from "./shapes.js"
import initText from "./canva-text.js"
import addResizeDialog from "./resize-dialog.js"
import configCanvas, { renderFabricJson } from "./canva-canvas.js"
//import { bgGradients } from "./gradients.js"
//import { templates } from "../templates/templates.js"

export default function editor(config, callback) {
    initHeader(config);
    let canvas = new fabric.Canvas("editorCanvas", { preserveObjectStacking: true, backgroundColor: "#fff" });  
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.borderColor = 'blue';
    fabric.Object.prototype.cornerColor = 'white';
    fabric.Object.prototype.cornerStrokeColor = 'darkgray';
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.cornerSize = 10;
    initToolbar();
    configCanvas(canvas, config, callback);
    //initImage(canvas);
    //initShapes(canvas);
    initText(canvas);
    //addResizeDialog(canvas);

    document.querySelector('#canvas-bgcolor-btn').onclick = function () {
        /*
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
        */
    }

    document.querySelector('.template-btn').onclick = function () {
        /*
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
        */
    }
}