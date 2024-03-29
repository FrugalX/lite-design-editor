
import { updateToolbarOnElementSelect, onElementDeselect, canvasbgColorWidget } from "./toolbox.js"

var fontList = [
    "Arial",
    "Courier New",
    "Helvetica",
    "Impact",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana"
];
const customFonts = ["Arimo", "Ballet", "Charm", "Great Vibes", "Lato", 
    "Merriweather", "Montserrat", "Open Sans", "Oswald", "Poppins", "Tangerine"];

export const ldeDocument = { width: 512, height: 512 };

export default function configCanvas(canvas, container, config, callback) {
    // Initialize fabricjs canvas
    if (config.image !== undefined) {
        ldeDocument.width = config.image.naturalWidth;
        ldeDocument.height = config.image.naturalHeight;
    }
    else {
        ldeDocument.width = config.width;
        ldeDocument.height = config.height;
    }
    canvas.setDimensions({ width: ldeDocument.width, height: ldeDocument.height });
    var sizeDisplay = document.getElementById("sizeDisplay");
    sizeDisplay.innerHTML = ldeDocument.width + ' x ' + ldeDocument.height;

    var sliderRange = document.getElementById("sliderRange");
    sliderRange.value = 100;
    sliderRange.oninput = function () {
        let zoomFactor = this.value / 100;
        canvas.setDimensions({ width: ldeDocument.width * zoomFactor, height: ldeDocument.height * zoomFactor });
        canvas.setZoom(zoomFactor);
    }

    initAligningGuidelines(canvas);
    canvas.on({
        'selection:updated': onElementSelect,
        'selection:created': onElementSelect,
        'selection:cleared': onElementDeselect
    });

    function onElementSelect(e) {
        updateToolbarOnElementSelect(e, canvas);
    }

    // Set background image
    if (config.image !== undefined) {
        let image = new fabric.Image(config.image, {
            left: 0,
            top: 0,
            angle: 0,
            opacity: 1
        });
        if (!(config.backgroundImage === undefined) && config.backgroundImage === false)
            canvas.add(image);
        else
            canvas.setBackgroundImage(image);
    }

    // dummy vertical and horizontal lines for snapping to the center guidelines
    var lineV = new fabric.Line([ldeDocument.width / 2, 0, ldeDocument.width / 2, ldeDocument.height], {
        strokeWidth: 0,
        stroke: 'white',
    });
    canvas.add(lineV);
    var lineR = new fabric.Line([ldeDocument.width - 1, 0, ldeDocument.width - 1, ldeDocument.height], {
        strokeWidth: 0,
        stroke: 'white',
    });
    canvas.add(lineR);
    var lineH = new fabric.Line([0, ldeDocument.height / 2, ldeDocument.width, ldeDocument.height / 2], {
        strokeWidth: 0,
        stroke: 'white',
    });
    canvas.add(lineH);
    var lineB = new fabric.Line([0, ldeDocument.height - 1, ldeDocument.width, ldeDocument.height - 1], {
        strokeWidth: 0,
        stroke: 'white',
    });
    canvas.add(lineB);

    canvas.historyInit();
    //canvas.offHistory();

    canvasbgColorWidget.on('change', (ev) => {
        canvas.backgroundColor = ev.hex;
        canvas.renderAll();
    })

    // Download
    let downloadBtn = document.getElementById("download-btn");
    downloadBtn.onclick = function () {
        let image = canvas.toDataURL("png");
        let link = document.createElement('a');
        link.download = 'download.png';
        link.href = image;
        link.click();
    }

    // Export
    let exportBtn = document.getElementById("export-btn");
    exportBtn.onclick = function () {
        let ldeDocument = canvas.toJSON(['selectable', 'width', 'height']);
        let data = JSON.stringify(ldeDocument);
        // Save the JSON string to a file
        var blob = new Blob([data], { type: 'application/json' });
        saveAs(blob, 'lde.json');
    }

    async function  loadFonts() {
        for (let run = 0; run < customFonts.length; run++) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = customFonts[run];
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '//fonts.googleapis.com/css?family=' + customFonts[run];
            link.media = 'all';
            head.appendChild(link);

            var font = new FontFaceObserver(customFonts[run]);
            try {
                let result = await font.load();
                console.log(customFonts[run], 'font loaded');
                let fontSelect = document.getElementById("font-family");
                let newOption = new Option(customFonts[run], customFonts[run]);
                newOption.style.color = "blue";
                newOption.style.fontFamily = customFonts[run];
                newOption.title = "Google Font";
                fontSelect.options[fontSelect.options.length] = newOption;
            } catch (err) {
                console.log(customFonts[run], 'font is not available');
            }
        }    
    }

    loadFonts();

    // load custom fonts based on imported fabric js file
    async function loadJsonFonts(json) {
        json.objects.forEach((obj) => {
            if (obj.type === 'textbox') {
                if (!fontList.includes(obj.fontFamily)) {
                    if (!customFonts.includes(obj.fontFamily))
                        customFonts.push(obj.fontFamily);
                }
                for (let i = 0; i < obj.styles.length; i++) {
                    if (!fontList.includes(obj.styles[i].style.fontFamily)) {
                        if (!customFonts.includes(obj.styles[i].style.fontFamily))
                            customFonts.push(obj.styles[i].style.fontFamily);
                    }
                }
            }
        });

        for (let run = 0; run < customFonts.length; run++) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = customFonts[run];
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '//fonts.googleapis.com/css?family=' + customFonts[run];
            link.media = 'all';
            head.appendChild(link);

            var font = new FontFaceObserver(customFonts[run]);
            try {
                let result = await font.load();
                console.log(customFonts[run], 'font loaded');
                let fontSelect = document.getElementById("font-family");
                fontSelect.options[0] = new Option(customFonts[run], customFonts[run]);
            } catch (err) {
                console.log(customFonts[run], 'font is not available');
            }
        }
    }

    // Import
    document.getElementById("jsonInput").addEventListener('change', function (event) {
        console.log('jsonInput entered')
        if (event.target.files.length > 0) {
            const jsonFile = event.target.files[0];
            const reader = new FileReader();
            reader.readAsText(jsonFile);

            reader.addEventListener('load', async (e) => {
                let fileContents = e.target.result;
                let json = JSON.parse(fileContents);
                canvas.clear();
                canvas.setDimensions({ width: json.width, height: json.height });
                ldeDocument.height = json.height;
                ldeDocument.width = json.width;
                var sizeDisplay = document.getElementById("sizeDisplay");
                sizeDisplay.innerHTML = ldeDocument.width + ' x ' + ldeDocument.height;

                var sliderRange = document.getElementById("sliderRange");
                sliderRange.value = 100;
                sliderRange.oninput = function () {
                    let zoomFactor = this.value / 100;
                    canvas.setDimensions({ width: ldeDocument.width * zoomFactor, height: ldeDocument.height * zoomFactor });
                    canvas.setZoom(zoomFactor);
                }
                await loadJsonFonts(json);
                canvas.loadFromJSON(json, function () {
                    canvas.renderAll();
                });
            });
        }
    })

    // Close editor
    let closeBtn = document.getElementById("close-btn");
    closeBtn.onclick = function () {
        let ldeDocument = canvas.toJSON(['selectable', 'width', 'height']);
        let jsonData = JSON.stringify(ldeDocument);
        let image = canvas.toDataURL("png");
        let returnData = { json: jsonData, image: image }
        container.innerHTML = "";
        callback(returnData);
    }
}