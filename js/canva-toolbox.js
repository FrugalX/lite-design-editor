export let canvasbgColorWidget, shapeColorWidget, shapefillColorWidget, textColorWidget, textbgColorWidget;

export function initToolbar() {
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
            el.classList.add('d-none');
        });
        document.querySelectorAll('.text-tools').forEach(function (el) {
            el.classList.remove('d-none');
        });
        document.getElementsByClassName("font-family")[0].value = canvas.getActiveObject().get('fontFamily');
        document.getElementsByClassName("font-size")[0].value = canvas.getActiveObject().get('fontSize');
        document.getElementById('text-color-btn').style.borderBottomColor = canvas.getActiveObject().get('stroke');
        document.getElementById('text-bgcolor-btn').style.borderBottomColor = canvas.getActiveObject().get('backgroundColor');
        textColorWidget.setColor(canvas.getActiveObject().get('stroke'));
        textbgColorWidget.setColor(canvas.getActiveObject().get('backgroundColor'));
    }
    else if (e.selected[0].get('type') === 'rect' || e.selected[0].get('type') === 'circle' ||
        e.selected[0].get('type') === 'polygon' || e.selected[0].get('type') === 'line') {
        document.querySelectorAll('.entity-tools').forEach(function (el) {
            el.classList.add('d-none');
        });
        document.querySelectorAll('.shape-tools').forEach(function (el) {
            el.classList.remove('d-none');
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
            el.classList.add('d-none');
        });
        document.querySelectorAll('.image-tools').forEach(function (el) {
            el.classList.remove('d-none');
        });
    }
    let trashBtn = document.getElementsByClassName("trash-btn")[0];
    trashBtn.parentNode.classList.remove('d-none');
    let changelayerBtn = document.getElementsByClassName("change-layer-btns")[0];
    changelayerBtn.classList.remove('d-none');

    initCommonBtns(canvas);
}

export function onElementDeselect(e) {
    document.querySelectorAll('.entity-tools').forEach(function (el) {
        el.classList.add('d-none');
    });
    let trashBtn = document.getElementsByClassName("trash-btn")[0];
    trashBtn.parentNode.classList.add('d-none');
    let changelayerBtn = document.getElementsByClassName("change-layer-btns")[0];
    changelayerBtn.classList.add('d-none');
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