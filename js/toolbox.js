export let canvasbgColorWidget, shapeColorWidget, shapefillColorWidget, textColorWidget, textbgColorWidget;

export function initToolbar(canvas) {
    let toolbox = document.getElementById("toolbox");
    toolbox.innerHTML =
    '<div style="font-size:12px; color:blue; text-align:center; padding-bottom:2px;"><b>New!</b> i) Background gradients ii) Char spacing, iii) A few pre-loaded google fonts</div>' + 
        '<div class="widget-group">'
        + '<span class="tool-item undo" title="Undo"><i class="bi-arrow-counterclockwise"></i></span><span class="tool-item redo" title="Redo"><i class="bi-arrow-clockwise"></i></span>'
        + '</div>'

        + '<div class="widget-group">'
        + '<span class="tool-item add-text" title="Add Text"><i class="bi bi-fonts"></i></span>'
        + '<input type="file" id="img-input" class="img-input"  accept="image/*"/><label for="img-input">'
        + '<span class="tool-item img-btn" title="Add Image"><i class="bi-image"></i></span></label>'
        + '<span class="tool-item shapes-btn" title="Add Shapes"><i class="bi-gem"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools">'
        + '<span class="tool-item">'
        + '<select name="font-family" class="font-family" id="font-family">'
        + '<option value="Arial", style="font-family: Arial;">Arial</option>'
        + '<option value="Courier New" style="font-family: Courier New;">Courier New</option>'
        + '<option value="Helvetica" style="font-family: Helvetica;">Helvetica</option>'
        + '<option value="Impact" style="font-family: Impact;">Impact</option>'
        + '<option value="Times New Roman" style="font-family: Times New Roman;" selected>Times New Roman</option>'
        + '<option value="Trebuchet MS" style="font-family: Trebuchet MS;">Trebuchet MS</option>'
        + '<option value="Verdana" style="font-family: Verdana;">Verdana</option>'
        + '</select></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools" style="padding-top:0;">'
        + `
            <div class="number-input" title="Font size">
                <button class="dec-fontsize" ></button>
                <input class="font-size" min="0" name="font-size" value="28" type="number">
                <button class="inc-fontsize"></button>
            </div>`
        + '</div>'
        
        + '<div class="widget-group entity-tools text-tools" style="padding-top:0;">'
        + `
            <div class="number-input" title="Char spacing">
                <button class="dec-charspace" ></button>
                <input class="charspace" min="-500" max="500" step="50" name="charspace" value="0" type="number">
                <button class="inc-charspace"></button>
            </div>`
        + '</div>'
        
        + '<div class="widget-group entity-tools text-tools">'
        + '<span class="tool-item bold-text"><i class="bi-type-bold"></i></span>'
        + '<span class="tool-item underline-text"><i class="bi-type-underline"></i></span>'
        + '<span class="tool-item italic-text"><i class="bi-type-italic"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools">'
        + '<span id="text-color-btn" class="tool-item" style="border-bottom:3px solid red; padding-bottom:0;"><i class="bi-fonts" title="Text Color"></i></span>'
        + '<span id="text-bgcolor-btn" class="tool-item" style="border-bottom:3px solid rgba(255, 0 , 0, 0.2); padding-bottom:0;" title="Text Background Color"><i class="bi-paint-bucket"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools">'
        + '<span class="tool-item left-align"><i class="bi-text-left"></i></span>'
        + '<span class="tool-item center-align"><i class="bi-text-center"></i></span>'
        + '<span class="tool-item right-align"><i class="bi-text-right"></i></span>'
        + '<span class="tool-item justify-align"><i class="bi-justify"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools shape-tools">'
        + '<span class="tool-item rect-btn" title="Add Rectangle"><i class="bi-square"></i></span>'
        + '<span class="tool-item circle-btn" title="Add Circle"><i class="bi-circle"></i></span>'
        + '<span class="tool-item hexagon-btn" title="Add Hexagon"><i class="bi-hexagon"></i></span>'
        + '<span class="tool-item triangle-btn" title="Add Triangle"><i class="bi-triangle"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools shape-tools" style="display: none;">'
        + '<span id="shape-color-btn" class="tool-item" style="border-bottom:3px solid white; padding-bottom:0;"><i class="bi-gem"></i></span>'
        + '<span id="shape-fillcolor-btn" class="tool-item" style="border-bottom:3px solid rgba(0, 0 , 255, 0.8); padding-bottom:0;"><i class="bi-paint-bucket"></i></span>'
        + '<span class="tool-item" title="Border width">'
        + '<select name="border-weight" class="border-weight">'
        + '<option value="0">0</option>'
        + '<option value="1" selected>1</option>'
        + '<option value="2">2</option>'
        + '<option value="4">4</option>'
        + '<option value="8">8</option>'
        + '</select>'
        + '</span>'
        + '<span class="tool-item" title="Border radius">'
        + '<select name="border-radius" class="border-radius" style="color:blue; display:none;">'
        + '<option value="0">0</option>'
        + '<option value="4">4</option>'
        + '<option value="8">8</option>'
        + '<option value="12">12</option>'
        + '<option value="16" selected>16</option>'
        + '<option value="32">32</option>'
        + '</select>'
        + '</span>'
        + '</div>'

        + '<div class="widget-group entity-tools image-tools" style="display: none;">'
        + '<div style="float:left;">'
        + '<input type="file" id="img-replace" class="img-replace" hidden accept="image/*"/><label for="img-replace">'
        + '<span class="tool-item img-replace-btn" title="Replace Image"><i class="bi-arrow-left-right"></i></span></label>'
        + '<span class="img-vert-flip-btn tool-item" title="Flip horizontal"><i class="fa-solid bi-arrows"></i></span>'
        + '<span class="img-horz-flip-btn tool-item" title="Flip vertical"><i class="bi-arrows-vertical"></i></span>'
        + '<span class="img-mask-btn tool-item" title="Add Mask"><i class="bi-mask"></i></span>'
        + '</div>'
        + '<div class="dropdown">'
        + '<div><span class="img-filters-btn tool-item" title="Change transparency">'
        + '<i class="bi-transparency dropbtn"></i></span></div>'
        + '<div class="filterDropdown dropdown-content" style="right: 0;">'
        + '<div class="slidecontainer">'
        + '<input type="range" min="0" max="100" value="100" class="transparency-slider">'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'

        + '<div class="widget-group change-layer-btns" style="display: none;">'
        + '<span class="pushbackward-btn tool-item" title="Push backward"><i class="bi-arrow-down"></i></span>'
        + '<span class="pullforward-btn tool-item" title="Pull forward"><i class="bi-arrow-up"></i></span>'
        + '<span class="sendback-btn tool-item" title="Send back"><i class="fa-solid bi-chevron-double-down"></i></span>'
        + '<span class="bringtofront-btn tool-item" title="Bring to front"><i class="bi-chevron-double-up"></i></span>'
        + '</div>'

        + '<div class="widget-group">'
        + '<span class="clone-btn tool-item" title="Copy"><i class="bi-copy"></i></span>'
        + '<span class="trash-btn tool-item"><i class="bi-trash"></i></span>'
        + '</div>'

    Alwan.setDefaults({ swatches: ['red', 'green', 'blue', 'cyan', 'magenta', 'black', 'white'] });
    canvasbgColorWidget = new Alwan('#canvas-bgcolor-btn', { preset: false, toggleSwatches: true });
    textColorWidget = new Alwan('#text-color-btn', { preset: false, toggleSwatches: true });
    textbgColorWidget = new Alwan('#text-bgcolor-btn', { preset: false });
    shapeColorWidget = new Alwan('#shape-color-btn', { preset: false, toggleSwatches: true });
    shapefillColorWidget = new Alwan('#shape-fillcolor-btn', { preset: false });
}

export function updateToolbarOnElementSelect(e, canvas) {
    if (e.selected[0].get('type') === 'textbox') {
        document.querySelectorAll('.entity-tools').forEach(function (el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.text-tools').forEach(function (el) {
            el.style.display = 'block';
        });
        document.getElementsByClassName("font-family")[0].value = canvas.getActiveObject().get('fontFamily');
        document.getElementsByClassName("font-size")[0].value = canvas.getActiveObject().get('fontSize');
        document.getElementById('text-color-btn').style.borderBottomColor = canvas.getActiveObject().get('stroke');
        document.getElementById('text-bgcolor-btn').style.borderBottomColor = canvas.getActiveObject().get('backgroundColor');
        textColorWidget.setColor(canvas.getActiveObject().get('stroke'));
        textbgColorWidget.setColor(canvas.getActiveObject().get('backgroundColor'));
    }
    else if (e.selected[0].get('type') === 'rect' || e.selected[0].get('type') === 'circle' || e.selected[0].get('type') === 'polygon') {
        document.querySelectorAll('.entity-tools').forEach(function (el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.shape-tools').forEach(function (el) {
            el.style.display = 'block';
        });
        document.getElementsByClassName("border-weight")[0].value = String(canvas.getActiveObject().get('strokeWidth'));
        document.getElementById('shape-color-btn').style.borderBottomColor = canvas.getActiveObject().get('stroke');
        document.getElementById('shape-fillcolor-btn').style.borderBottomColor = canvas.getActiveObject().get('fill');
        shapeColorWidget.setColor(canvas.getActiveObject().get('stroke'));
        shapefillColorWidget.setColor(canvas.getActiveObject().get('fill'));
        if (e.selected[0].get('type') === 'rect') {
            document.getElementsByClassName("border-radius")[0].style.display = 'inline-block';
            document.getElementsByClassName("border-radius")[0].value = String(canvas.getActiveObject().get('rx'));
        }
        else {
            document.getElementsByClassName("border-radius")[0].style.display = 'none';
        }
    }
    else if (e.selected[0].get('type') === 'image') {
        document.querySelectorAll('.entity-tools').forEach(function (el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.image-tools').forEach(function (el) {
            el.style.display = 'block';
        });
    }
    let trashBtn = document.getElementsByClassName("trash-btn")[0];
    trashBtn.parentNode.style.display = 'block';
    let changelayerBtn = document.getElementsByClassName("change-layer-btns")[0];
    changelayerBtn.style.display = 'block';

    initCommonBtns(canvas);
}

export function onElementDeselect(e) {
    document.querySelectorAll('.entity-tools').forEach(function (el) {
        el.style.display = 'none';
    });
    let trashBtn = document.getElementsByClassName("trash-btn")[0];
    trashBtn.parentNode.style.display = 'none';
    let changelayerBtn = document.getElementsByClassName("change-layer-btns")[0];
    changelayerBtn.style.display = 'none';
}

function initCommonBtns(canvas) {
    let undoBtn = document.getElementsByClassName("undo")[0];
    undoBtn.onclick = function () {
        canvas.undo();
    }

    let redoBtn = document.getElementsByClassName("redo")[0];
    redoBtn.onclick = function () {
        canvas.redo();
    }

    let pushbackwardBtn = document.getElementsByClassName("pushbackward-btn")[0];
    pushbackwardBtn.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.sendBackwards(canvas.getActiveObject());
            canvas.renderAll();
        }
    }

    let pullforwardBtn = document.getElementsByClassName("pullforward-btn")[0];
    pullforwardBtn.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.bringForward(canvas.getActiveObject());
            canvas.renderAll();
        }
    }

    let sendbackBtn = document.getElementsByClassName("sendback-btn")[0];
    sendbackBtn.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.sendToBack(canvas.getActiveObject());
            canvas.renderAll();
        }
    }

    let bringtofrontBtn = document.getElementsByClassName("bringtofront-btn")[0];
    bringtofrontBtn.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.bringToFront(canvas.getActiveObject());
            canvas.renderAll();
        }
    }

    let trashBtn = document.getElementsByClassName("trash-btn")[0];
    trashBtn.onclick = function () {
        if (canvas.getActiveObject()) {
            let obj = canvas.getActiveObject();
            if (obj && !obj.isEditing) {
                if (obj.get('clippedObj') !== undefined)
                    obj.get('clippedObj').set({ clipPath: '' });
                canvas.remove(obj);
            }
            canvas.renderAll();
        }
    }

    let cloneBtn = document.getElementsByClassName("clone-btn")[0];
    cloneBtn.onclick = function () {
        if (canvas.getActiveObject()) {
            let obj = canvas.getActiveObject();
            if (obj && !obj.isEditing) {
                obj.clone(function (clone) {
                    canvas.add(clone.set({
                        left: obj.left + 10,
                        top: obj.top + 10
                    }));
                });
            }
            canvas.renderAll();
        }
    }

    document.addEventListener('keyup', function (event) {
        let { key, ctrlKey } = event;

        if (key === "Delete") {
            let obj = canvas.getActiveObject();
            if (obj && !obj.isEditing) {
                if (obj.get('clippedObj') !== undefined)
                    obj.get('clippedObj').set({ clipPath: '' });
                canvas.remove(obj);
            }
        }

        if (!ctrlKey) {
            return
        }

        // Check pressed button is Z - Ctrl+Z.
        if (key === "z" || key === "Z") {
            canvas.undo()
        }

        // Check pressed button is Y - Ctrl+Y.
        if (key === "y" || key === "Y") {
            canvas.redo()
        }
    })
}