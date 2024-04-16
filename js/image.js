import { ldeDocument } from "./canvas-init.js";

export default function initImage(canvas) {
    // Add image
    document.getElementsByClassName("img-input")[0].addEventListener('change', function (event) {
        if (event.target.files.length > 0) {
            const imgFile = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(imgFile);

            reader.addEventListener('load', () => {
                //console.log(ldeDocument)
                let thisImage = document.createElement('img');
                thisImage.onload = () => {
                    let imgInstance = new fabric.Image(thisImage, {
                        originY: "center",
                        top: ldeDocument.height / 2,
                        originX: "center",
                        left: ldeDocument.width / 2
                    });
                    imgInstance.setControlsVisibility({
                        mt: false,
                        mb: false,
                        ml: false,
                        mr: false
                    });
                    canvas.add(imgInstance);
                    canvas.setActiveObject(imgInstance);
                    //canvas.centerObject(imgInstance);
                }

                thisImage.src = reader.result;
            });
        }
    })

    document.getElementsByClassName("img-replace")[0].addEventListener('change', function (event) {
        if (event.target.files.length > 0) {
            const imgFile = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(imgFile);

            reader.addEventListener('load', () => {
                let thisImage = document.createElement('img');
                thisImage.onload = () => {
                    let imgInstance = new fabric.Image(thisImage, {
                        originY: "center",
                        top: ldeDocument.height / 2,
                        originX: "center",
                        left: ldeDocument.width / 2
                    });
                    imgInstance.setControlsVisibility({
                        mt: false,
                        mb: false,
                        ml: false,
                        mr: false
                    });

                    let index = canvas.getObjects().indexOf(canvas.getActiveObject());
                    console.log(index)
                    canvas.remove(canvas.getActiveObject());
                    canvas.insertAt(imgInstance, index);
                    canvas.setActiveObject(imgInstance);
                    console.log(canvas.getObjects().indexOf(canvas.getActiveObject()))
                }

                thisImage.src = reader.result;
            });
        }
    })

    let flipVertical = document.getElementsByClassName("img-vert-flip-btn")[0];
    flipVertical.onclick = function () {
        let obj = canvas.getActiveObject();
        if (obj) {
            obj.set('flipX', !obj.flipX);
            canvas.renderAll();
        }
    }

    let flipHorizontal = document.getElementsByClassName("img-horz-flip-btn")[0];
    flipHorizontal.onclick = function () {
        let obj = canvas.getActiveObject();
        if (obj) {
            obj.set('flipY', !obj.flipY);
            canvas.renderAll();
        }
    }

    let imgMask = document.getElementsByClassName("img-mask-btn")[0];
    imgMask.onclick = function () {
        let obj = canvas.getActiveObject();
        var rect = obj.getBoundingRect();
        var zoomFactor = ldeDocument.width/canvas.width;
        if (obj && obj.get('type') === "image") {
            var widthFactor = 0.6;
            var width = rect.width*widthFactor*zoomFactor;
            var height = rect.height*widthFactor*zoomFactor;
            var left = (rect.left + rect.width*(1-widthFactor)/2)*zoomFactor;
            var top = (rect.top + rect.height*(1-widthFactor)/2)*zoomFactor;
            var path = 'M ' + left + ' ' + top +  ' L ' + (left+width) + ' ' + top + ' L ' 
            + (left+width) + ' ' + (top+height) +' L ' + left + ' ' + (top+height) + ' Z';

            var shell = new fabric.Path(path, {
                fill: '',
                stroke: 'blue',
                strokeWidth: 0,
                scaleX: 1,
                scaleY: 1,
                cornerSize: 12,
                transparentCorners: false,
                cornerStyle: 'circle',
                delete: false
            });
            var clipPath = new fabric.Path(path, {
                absolutePositioned: true,
                scaleX: 1,
                scaleY: 1
            });
            shell.setControlsVisibility({
                mtr: false
            });

            obj.set({
                clipPath: clipPath
            });

            shell.set({
                clippedObj: obj
            });

            shell.on('moving', ({ e, transform, pointer }) => {
                //  only because they are absolutePositioned
                clipPath.setPositionByOrigin(shell.getCenterPoint(), 'center', 'center');
                obj.set('dirty', true);
            });
            shell.on('rotating', () => {
                clipPath.set({ angle: shell.angle });
                obj.set('dirty', true);
            });
            shell.on('scaling', () => {
                clipPath.set({ left: shell.left, top: shell.top, scaleX: shell.scaleX, scaleY: shell.scaleY });
                obj.set('dirty', true);
            });

            canvas.add(shell);
        }
    }

    // transparency
    let transparencyScale = document.getElementsByClassName("transparency-slider")[0];
    transparencyScale.addEventListener("input", (event) => {
        let obj = canvas.getActiveObject();
        if (obj) {
            obj.set('opacity', event.target.value / 100);
            canvas.renderAll();
        }
    });

    // Not used as of now due to texture size limitations of Fabricjs
    document.querySelectorAll('.filter').forEach((option) => {
        console.log(option);
        option.onclick = function (e) {
            console.log(e.target.getAttribute("data-filter"))
            switch (e.target.getAttribute("data-filter")) {
                case 'Grayscale':
                    var sp = new fabric.Image.filters.Grayscale();
                    canvas.getActiveObject().filters.push(sp);
                    canvas.getActiveObject().applyFilters();
                    return;
                case 'Sepia':
                    var sp = new fabric.Image.filters.Sepia();
                    canvas.getActiveObject().filters.push(sp);
                    canvas.getActiveObject().applyFilters();
                    return;
            }
        }
    })
}