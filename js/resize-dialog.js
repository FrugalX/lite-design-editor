
import { ldeDocument } from "./canvas-init.js";

const resizeDialog = `
<dialog id="resizeDialog">
    <form method="dialog">
        <p>
            <label>
                Width:
                <input id="width" type="number" />
            </label>
        </p>
        <p>
            <label>
                Height:
                <input id="height" type="number" />
            </label>
        </p>
        <div style="text-align: right;">
            <button value="cancel" formmethod="dialog">Cancel</button>
            <button id="confirmBtn" value="default">Confirm</button>
        </div>
    </form>
</dialog>
`;

export default function addResizeDialog(canvas) {
    document.body.insertAdjacentHTML('beforeend', resizeDialog);
    
    const showBtn = document.getElementById("resize-btn");
    const dialog = document.getElementById("resizeDialog");
    const confirmBtn = dialog.querySelector("#confirmBtn");
    const widthEl = dialog.querySelector("#width");
    const heightEl = dialog.querySelector("#height");
    const returnVal = { width: ldeDocument.width, height: ldeDocument.height }

    showBtn.addEventListener("click", () => {
        dialog.showModal();
        widthEl.value = ldeDocument.width;
        heightEl.value = ldeDocument.height;
    });

    widthEl.addEventListener("change", (e) => {
        returnVal["width"] = widthEl.value;
    });

    heightEl.addEventListener("change", (e) => {
        returnVal["height"] = heightEl.value;
    });

    confirmBtn.addEventListener("click", (e) => {
        ldeDocument.width = returnVal.width;
        ldeDocument.height = returnVal.height;
        canvas.setDimensions({ width: ldeDocument.width, height: ldeDocument.height });
        var sizeDisplay = document.getElementById("sizeDisplay");
        sizeDisplay.innerHTML = ldeDocument.width + ' x ' + ldeDocument.height;
        dialog.close();
    });
}