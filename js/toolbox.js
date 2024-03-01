export let rectColorWidget, rectfillColorWidget, textColorWidget, textbgColorWidget;

export function initToolbar() {
    let toolbox = document.getElementById("toolbox");
    toolbox.innerHTML =
        '<div class="widget-group">'
        + '<span class="tool-item undo" title="Undo"><i class="fa-solid fa-undo"></i></span><span class="tool-item redo" title="Redo"><i class="fa-solid fa-redo"></i></span>'
        + '</div>'

        + '<div class="widget-group">'
        + '<span class="tool-item add-text" title="Add Text"><i class="fa-solid fa-t fa-lg"></i></span>'
        + '<input type="file" id="img-input" class="img-input"  accept="image/*"/><label for="img-input">'
        + '<span class="tool-item img-btn" title="Add Image"><i class="fa-solid fa-image fa-lg"></i></span></label>'
        + '<span class="tool-item rect-btn" title="Add Rectangle"><i class="fa-regular fa-square fa-lg"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools">'
        + '<span class="tool-item">'
        + '<select name="font-family" class="font-family" id="font-family">'
        + '<option value="Arial">Arial</option>'
        + '<option value="Courier New">Courier New</option>'
        + '<option value="Helvetica">Helvetica</option>'
        + '<option value="Impact">Impact</option>'
        + '<option value="Times New Roman" selected>Times New Roman</option>'
        + '<option value="Trebuchet MS">Trebuchet MS</option>'
        + '<option value="Verdana">Verdana</option>'
        + '</select></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools">'
        + '<span class="tool-item" title="Font Size">'
        + '<select name="font-size" class="font-size">'
        + '<option value="8">8</option>'
        + '<option value="12">12</option>'
        + '<option value="16">16</option>'
        + '<option value="20">20</option>'
        + '<option value="24">24</option>'
        + '<option value="28" selected>28</option>'
        + '<option value="32">32</option>'
        + '<option value="48">48</option>'
        + '<option value="64">64</option>'
        + '<option value="96">96</option>'
        + '<option value="128">128</option>'
        + '</select></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools">'
        + '<span class="tool-item bold-text"><i class="fa-solid fa-bold"></i></span>'
        + '<span class="tool-item underline-text"><i class="fa-solid fa-underline"></i></span>'
        + '<span class="tool-item italic-text"><i class="fa-solid fa-italic"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools">'
        + '<span id="text-color-btn" class="tool-item" style="border-bottom:3px solid blue; padding-bottom:0;"><i class="fa-solid fa-t" title="Text Color"></i></span>'
        + '<span id="text-bgcolor-btn" class="tool-item" style="border-bottom:3px solid rgba(0, 0 , 255, 0.2); padding-bottom:0;" title="Text Background Color"><i class="fa-solid fa-fill"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools text-tools">'
        + '<span class="tool-item left-align"><i class="fa-solid fa-align-left"></i></span>'
        + '<span class="tool-item center-align"><i class="fa-solid fa-align-center"></i></span>'
        + '<span class="tool-item right-align"><i class="fa-solid fa-align-right"></i></span>'
        + '<span class="tool-item justify-align"><i class="fa-solid fa-align-justify"></i></span>'
        + '</div>'

        + '<div class="widget-group entity-tools shape-tools">'
        + '<span id="rect-color-btn" class="tool-item" style="border-bottom:3px solid white; padding-bottom:0;"><i class="fa-regular fa-square"></i></span>'
        + '<span id="rect-fillcolor-btn" class="tool-item" style="border-bottom:3px solid rgba(0, 0 , 255, 0.5); padding-bottom:0;"><i class="fa-solid fa-fill"></i></span>'
        + '<span class="tool-item" title="Border width">'
        + '<select name="border-weight" class="border-weight">'
        + '<option value="0">0</option>'
        + '<option value="1" selected>1</option>'
        + '<option value="2">2</option>'
        + '<option value="4">4</option>'
        + '<option value="8">8</option>'
        + '</select>'
        + '</span>'
        + '</div>'

        + '<div class="widget-group entity-tools image-tools">'
        + '<div style="float:left;">'
        + '<input type="file" id="img-replace" class="img-replace" hidden accept="image/*"/><label for="img-replace">'
        + '<span class="tool-item img-replace-btn" title="Replace Image"><i class="fa-solid fa-exchange fa-lg"></i></span></label>'
        + '<span class="img-vert-flip-btn tool-item"><i class="fa-solid fa-left-right"></i></span>'
        + '<span class="img-horz-flip-btn tool-item"><i class="fa-solid fa-up-down"></i></span>'
        + '<!--span class="img-crop-btn tool-item"><i class="fa-solid fa-crop"></i></span-->'
        + '</div>'
        + '<div class="dropdown">'
        + '<div><span class="img-filters-btn tool-item">'
        + '<i class="fa-solid fa-chess-board dropbtn"></i></span></div>'
        + '<div class="filterDropdown dropdown-content" style="right: 0;">'
        + '<div class="slidecontainer">'
        + '<input type="range" min="0" max="100" value="100" class="transparency-slider">'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<!--div class="dropdown">'
        + '<div><span class="img-filters-btn tool-item"><i class="fa-solid fa-sliders dropbtn"></i></span></div>'
        + '<div class="filterDropdown dropdown-content">'
        + '<div class="filter" data-filter="Sepia">Sepia</div>'
        + '<div class="filter" data-filter="Grayscale">Gray</div>'
        + '</div>'
        + '</div-->'
        + '</div>'

        + '<div class="widget-group">'
        + '<span class="trash-btn tool-item"><i class="fa-solid fa-trash"></i></span>'
        + '</div>'

        textColorWidget = new Alwan('#text-color-btn', { preset: false, toggleSwatches: true });
        textbgColorWidget = new Alwan('#text-bgcolor-btn', { preset: false });
        rectColorWidget = new Alwan('#rect-color-btn', { preset: false, toggleSwatches: true });
        rectfillColorWidget = new Alwan('#rect-fillcolor-btn', { preset: false });
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
    else if (e.selected[0].get('type') === 'rect') {
        document.querySelectorAll('.entity-tools').forEach(function (el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.shape-tools').forEach(function (el) {
            el.style.display = 'block';
        });
        document.getElementsByClassName("border-weight")[0].value = String(canvas.getActiveObject().get('strokeWidth'));
        document.getElementById('rect-color-btn').style.borderBottomColor = canvas.getActiveObject().get('stroke');
        document.getElementById('rect-fillcolor-btn').style.borderBottomColor = canvas.getActiveObject().get('fill');
        rectColorWidget.setColor(canvas.getActiveObject().get('stroke'));
        rectfillColorWidget.setColor(canvas.getActiveObject().get('fill'));
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
}

export function onElementDeselect(e) {
    document.querySelectorAll('.entity-tools').forEach(function (el) {
        el.style.display = 'none';
    });
    let trashBtn = document.getElementsByClassName("trash-btn")[0];
    trashBtn.parentNode.style.display = 'none';
}